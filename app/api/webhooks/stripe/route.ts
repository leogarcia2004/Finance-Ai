

import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST =  async (request: Request) => {
    if(!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.error();
    }
    const signature = request.headers.get("stripe-signature"); // Garantir que a requisição veio do stripe, para não ser um ataque.
    if (!signature) {
        return NextResponse.error();
    }
    const text = await request.text();
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-10-28.acacia",
    });

    const event = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
        );

    switch (event.type) {
        // A partir daqui o usuário já pagou a assinatura
        case "invoice.paid": {

          const {customer, subscription, subscription_details } = event.data.object
          const clerkUserId = subscription_details?.metadata?.clerk_user_id
          console.log(clerkUserId, customer)
          if (!clerkUserId) {
              return NextResponse.error();
          }
          await clerkClient.users.updateUser(clerkUserId, {
            privateMetadata: {
              stripeCustomerId: customer,
              stripeSubscriptionId: subscription,
            },
            publicMetadata: {
              subscriptionPlan: "premium",
            },
          });        
          break;
        }
        // Para quando eu quiser cancelar a assinatura
        case "customer.subscription.deleted": {
          // Remover plano premium do usuário
          const subscription = await stripe.subscriptions.retrieve(
            event.data.object.id, // Pegando os dados da subscription
          );
          const clerkUserId = subscription.metadata.clerk_user_id;
          if (!clerkUserId) {
            return NextResponse.error();
          }
          // Atualizar os dados do usuário no clerk
          await clerkClient().users.updateUser(clerkUserId, {
            privateMetadata: {
              stripeCustomerId: null,
              stripeSubscriptionId: null,
            },
            publicMetadata: {
              subscriptionPlan: null,
            },
          });
        }
    }
    return NextResponse.json({ received: true });
    
 }