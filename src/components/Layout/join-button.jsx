"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

export function Join() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="flex items-center justify-between space-x-3 px-2">
      {!session ? (
        <Button variant="primary" className="w-full md:w-auto" asChild>
          <Link href="/auth/signin">Join</Link>
        </Button>
      ) : (
        <>
          {session.user.role === "admin" && (
            <Button
              variant="primary"
              size="sm"
              className="w-full md:w-auto"
              asChild
            >
              <Link href="/admin" target="_blank">
                Admin
              </Link>
            </Button>
          )}
          <ProfileHandle className="hidden md:block" />
        </>
      )}
    </div>
  );
}

export function ProfileHandle({ className, align = "end" }) {
  const { data: session } = useSession();
  if (!session) {
    return null;
  }
  return (
    <DropdownMenu className={className}>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 rounded-full cursor-pointer">
          <AvatarImage src={session.user.image} alt={session.user.name} />
          <AvatarFallback className="rounded-lg">
            {session.user.name[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align={align}>
        <DropdownMenuGroup>
          <DropdownMenuItem>{session?.user?.name}</DropdownMenuItem>
          <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>
          {session.user.role === "admin" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin" target="_blank">
                  Admin
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />

          <Button
            variant="destructive"
            onClick={() => signOut()}
            className="w-full inline-flex items-center gap-2 cursor-pointer"
          >
            <LogOut /> SignOut
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
