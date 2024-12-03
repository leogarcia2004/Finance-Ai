"use server";

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

  upsertTransactionSchema.parse(params); 
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const transaction = await db.transaction.upsert({    
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params?.id ?? "", 
    },
  });
  revalidatePath("/transactions");

  return transaction;
};