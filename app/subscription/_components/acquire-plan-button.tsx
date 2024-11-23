"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "@/app/subscription/_actions/creat-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

// Qualquer variável que tem next_public de inicio no novo, é acessível por client components.
const AcquirePlanButton = () => {

  // Chamar a server action que eu criei em _actions/create-stripe-checkout.tsx, para criar uma sessão de checkout.
  const handleAcquirePlanClick = async () => {
    // Criando o chekcout
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not found");
    };
    // Carregando o stripe
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (!stripe) {
      throw new Error("Stripe not found");
    };
    // Redirecionando o usuário pro checkout
    await stripe.redirectToCheckout({ sessionId });
  };
  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir plano
    </Button>
  );
};

export default AcquirePlanButton;