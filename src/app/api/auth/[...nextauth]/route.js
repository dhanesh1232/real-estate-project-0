import { authOptions } from "@/lib/server/oAuth";
import NextAuth from "next-auth";

// Handle the main NextAuth requests
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
