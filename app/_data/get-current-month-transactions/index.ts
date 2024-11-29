
import { startOfMonth, endOfMonth } from 'date-fns';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/app/_lib/prisma';

export const getCurrentMonthTransactions = async () => {

    const { userId } = await auth(); // Pegando o id do usuário
    if (!userId) {
        throw new Error('Unauthorized');
    }
    return db.transaction.count({
        where: {
          userId,
          createdAt: {
            gte: startOfMonth(new Date()),
            lt: endOfMonth(new Date()),
          },
        },
       }); // Pegando as transações do usuário
};