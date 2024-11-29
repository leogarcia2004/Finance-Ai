import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";

export const canUserAddTransaction = async () => {
  const { userId } = await auth(); // Pegando os dados do usuário
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan === "premium") { // Verificando se o usuário tem o plano premium. Se for premium, ele pode adicionar quantas transações ele quiser.
    return true;
  }
  const currentMonthTransactions = await getCurrentMonthTransactions();
  if (currentMonthTransactions >= 10) { // Se o usuário não tiver o plano premium, significa que ele tem o plano básico, então ele só pode adicionar até 10 transações por mês.
    return false;
  }
  return true;
};