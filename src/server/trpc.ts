import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things like the database, session information, etc
 * in your procedures.
 */
export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  // For simplicity, we are not passing `prisma` or `session` here
  // You can add `prisma` client or `getSession` from `next-auth` here
  // const session = await getSession({ req: opts.req });
  return {
    req: opts.req,
    resHeaders: opts.resHeaders,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, and where you define your
 * createContext and error formatter. (See the tRPC docs for more)
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & MIDDLEWARE
 *
 * This is where you can define a router and middlewares for your tRPC API.
 *
 * You can use the `router` and `middleware` helpers to create them.
 */
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure; 