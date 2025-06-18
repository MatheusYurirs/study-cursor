import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { stripe } from '@/lib/stripe';

export const stripeRouter = createTRPCRouter({
  createStripeCustomerSubscriptionPaymentCheckout: publicProcedure
    .input(z.object({
      priceId: z.string(),
      userId: z.string(),
      userEmail: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      const { priceId, userId, userEmail } = input;

      try {
        const session = await stripe.checkout.sessions.create({
          mode: 'subscription',
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          metadata: {
            userId: userId,
          },
          customer_email: userEmail,
        });

        return { url: session.url };
      } catch (error) {
        console.error("[STRIPE_CHECKOUT_ERROR]", error);
        throw new Error("Failed to create Stripe checkout session.");
      }
    }),
}); 