import { createTRPCRouter, publicProcedure } from "../trpc";
import { stripeRouter } from "./stripe";

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => {
    return "ok";
  }),
  stripe: stripeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter; 