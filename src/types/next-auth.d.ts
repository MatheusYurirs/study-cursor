import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    emailVerified: Date | null;
    name?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
  }
}

declare module "@prisma/client" {
  interface User {
    emailVerified: Date | null;
    email: string;
    id: string;
  }
} 