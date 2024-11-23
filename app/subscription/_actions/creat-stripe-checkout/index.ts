"use server";
// Arquivo de criação do checkout, e isso precisa ser criado no servidor, pois preciso usar dados sensíveis.
import { auth } from "@clerk/nextjs/server";
import  Stripe  from "stripe";

export const createStripeCheckout = async () => {
  // Verifiar se o usuário está logado
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  if(!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  // Criação da sessão de checkout
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription", // O mode tem que ser subscription para criar uma sessão de checkout de assinatura.
    success_url: `http://localhost:3000`, // url que for mandar o usuário quando ocheckout for finalizado com sucesso.
    cancel_url: `http://localhost:3000`,  // url que for mandar o usuário quando o checkout for cancelado.
    subscription_data: {
      metadata: {
        clerkUserId: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  });

  return {sessionId: session.id};
  // Redirecionar o usuário pro checkout
}
