import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../dbConnect";
import { AdminMails } from "./admin_mails";
import { User } from "@/model/user";

const isProd = process.env.NODE_ENV === "production";
const getCookiesSettings = () => {
  const domain = process.env.AUTH_DOMAIN;
  return {
    sessionToken: {
      name: isProd
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProd,
        domain: isProd
          ? domain // Root domain for production
          : undefined,
      },
    },
  };
};

const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
  profile: async (profile) => {
    try {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        provider: "google",
      };
    } catch (error) {
      console.error("Google profile error:", error);
      throw new Error("Failed to process Google profile");
    }
  },
});

const handleGoogleSignIn = async (profile) => {
  await dbConnect();
  try {
    const { email, name, picture: image } = profile;

    // Check if user exists
    let user = await User.findOne({ email });

    // Determine role based on admin emails list
    const isAdmin = AdminMails.includes(email);
    const role = isAdmin ? "admin" : "user";

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        name,
        email,
        image,
        role,
      });
    } else {
      // Update existing user's info if needed
      user.name = name;
      user.image = image;
      user.role = role; // Update role in case email was added to admin list
      user.updatedAt = new Date();
      await user.save();
    }

    return user;
  } catch (err) {
    console.error("Error in handleGoogleSignIn:", err);
    throw err;
  }
};

export const authOptions = {
  providers: [googleProvider],
  secret: process.env.NEXTAUTH_SECRET,
  cookies: getCookiesSettings(),
  useSecureCookies: isProd,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Store user in database and get the complete user object with role
        const dbUser = await handleGoogleSignIn(profile);

        // Add the role to the user object that will be passed to JWT callback
        user.role = dbUser.role;
        user.id = dbUser._id.toString(); // Convert ObjectId to string

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
    async jwt({ token, user, account, profile, trigger, session }) {
      // If user just signed in (first time JWT is created)
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }

      // If session was updated (e.g., client-side update)
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;

        // Make sure we have all the required user properties
        session.user.name = session.user.name || token.name;
        session.user.email = session.user.email || token.email;
        session.user.image = session.user.image || token.picture;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};
