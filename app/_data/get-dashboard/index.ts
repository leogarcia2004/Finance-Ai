// Tudo o que eu preciso para montar minha dashboard, vai ser obtido nessa função abaixo. Esse arquivo vai pegar os dados da dashboard.

import { db } from "@/app/_lib/prisma"
import { TransactionType } from "@prisma/client"
import { TransactionPercentagePerType, TotalExpensePerCategory } from "./type"

export const getDashboard = async (month: string) => { // Essa função é executada no servidor, e ela faz toda a lógica de pegar os dados que eu preciso para usar na interface
    const where = {
        date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
        }
    }
    // Chamando o meu banco de dados
    const depositsTotal = Number(
        (await db.transaction.aggregate({
        _sum: { amount: true },
        where: {...where, type: "DEPOSIT" }, // Quero que o aggregate pegue as transações que tem o tipo 'DEPOSIT' e some o valor do campo 'amount', ou seja, some todos os amounts desses depósitos.
    }))?._sum?.amount 
    )
    const investmentsTotal = Number(
        (await db.transaction.aggregate({
        where: {...where, type: "INVESTIMENT" },
        _sum: { amount: true },
        }))?._sum?.amount
    )
    const expensesTotal = Number(
        (await db.transaction.aggregate({
        where: {...where, type: "EXPENSE" },
        _sum: { amount: true },
        }))?._sum?.amount
    )
    
    const balance = depositsTotal - investmentsTotal - expensesTotal
    
    const transactionsTotal = Number(
        (
          await db.transaction.aggregate({
            where,
            _sum: { amount: true },
          })
        )._sum.amount,
      );
      const typesPercentage: TransactionPercentagePerType = {
        [TransactionType.DEPOSIT]: Math.round(
          (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
        ),
        [TransactionType.EXPENSE]: Math.round(
          (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
        ),
        [TransactionType.INVESTIMENT]: Math.round(
          (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
        ),
      };
      const totalExpensePerCategory: TotalExpensePerCategory[] = ( // Aqui estou agrupando todas as minhas transações(despesas) por categoria, e somando tudo.
        await db.transaction.groupBy({
          by: ["category"],
          where: {
            ...where,
            type: TransactionType.EXPENSE,
          },
          _sum: {
            amount: true,
          },
        })
      ).map((category) => ({
        category: category.category,
        totalAmount: Number(category._sum.amount),
        percentageOfTotal: Math.round(
          (Number(category._sum.amount) / Number(expensesTotal)) * 100, // Aqui estou pegando a porcentagem de cada categoria em relação ao total de despesas, fazendo o calculo de cada categoria.
        ),
      }));
      const lastTransactions = await db.transaction.findMany({ // Nesse caso eu quero pegar as últimas 15 transações, e ordenar por data decrescente.
        where,
        orderBy: { date: "desc" },
        take: 15,
      });
      return {
        balance,
        depositsTotal,
        investmentsTotal,
        expensesTotal,
        typesPercentage,
        totalExpensePerCategory,
        lastTransactions,
      };

    
}