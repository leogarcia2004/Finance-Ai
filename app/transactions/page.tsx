import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns/index";
import AddTransactionButton from "../_components/add-transaction-button";
import NavBar from "@/app/_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

const TransactionsPage = async () => {
  const {userId} = await auth(); // Pegar o id do usuário logado
  if (!userId) { // Se não tiver usuário logado, redirecionar para a página de login
    redirect("/login");
  }
  // Pegar as transações do usuário logado.
  // Acessar as transações do meu banco de dados. Para isso vou precisar usar o prisma também.
  const transactions = await db.transaction.findMany({
    // Com isso, eu pego todas as transações que estão na tabela
    where: {
      userId, // Filtrar as transações pelo id do usuário logado, ou seja, irá mostrar apenas as transações do usuário logado.
    },
  });
  const userCanAddTransaction = await canUserAddTransaction(); // Verificar se o usuário pode adicionar transações
  return (

    <>
      <NavBar />
      <div className="space-y-6 p-6 overflow-hidden">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction}/>
        </div>
        <ScrollArea>
          <DataTable columns={transactionColumns} data={JSON.parse(JSON.stringify(transactions))} />
        </ScrollArea>       
      </div>
    </>
  );
};

export default TransactionsPage;
