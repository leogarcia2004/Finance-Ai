"use server";

// chamar uma função e essa função vai ter acesso ao meu banco de dados, e essa função precisa ser executada no servidor. Para isso vou utilizar uma server action, que é uma função executada pro lado do servidor, e posso chamar elas de client components. Pode ser uma rota http

// Toda função que eu colcoar aqui, vai ser executada no servidor, e eu posso chamar ela de qualquer lugar do meu código, e ela vai ter acesso ao banco de dados

import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: string;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  // params são os dados do meu formulário
  // Prisma.TransactionCreateInput da todos os campos necessários para reiazar a criação de uma transação.

  upsertTransactionSchema.parse(params); // validando os dados do formulário
  // Preciso pegar o id do usuário para associar a transação a ele.
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const transaction = await db.transaction.upsert({    
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params?.id ?? "", // Se o id existir, eu atualizo, se não, eu crio
    },
  });
  revalidatePath("/transactions");

  return transaction;
};

// Uma server action precisa ter seus parâmetros validados, pois ela é uma rota http. E ela precisa ser protegida se exgir autenticação.
