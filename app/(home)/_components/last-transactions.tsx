

import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import { formatCurrency } from "@/app/_utils/currency";
import { Transaction, TransactionType } from "@prisma/client";
import Link from 'next/link';
import Image from "next/image";

interface LastTransactionsProps {
    lastTransactions: Transaction[];
  }

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
    const getAmountColor = (transaction: Transaction) => { // Função para pegar a cor do texto do valor da transação
        if (transaction.type === TransactionType.EXPENSE) { // Se a transação for do tipo 'EXPENSE', eu vou retornar a cor 'text-red-500'
          return "text-red-500";
        }
        if (transaction.type === TransactionType.DEPOSIT) { // Se a transação for do tipo 'DEPOSIT', eu vou retornar a cor 'text-primary'
          return "text-primary";
        }
        return "text-white";
      };
      const getAmountPrefix = (transaction: Transaction) => { // Função para pegar o prefixo do valor da transação
        if (transaction.type === TransactionType.DEPOSIT) { // Se a transação for do tipo 'DEPOSIT', eu vou retornar o sinal de '+'
          return "+";
        }
        return "-";
      };

  return (
    <ScrollArea className="rounded-md border h-[780px]">
        <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        {/*Sempre aplicar o 'asChild' nesse tipo de situação*/}
        <Button variant="outline" className="rounded-full font-bold" asChild> 
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
      {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-3 text-white">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                  height={20}
                  width={20}
                  alt="PIX"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  )
}

export default LastTransactions