
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns/index";
import AddTransactionButton from "../_components/add-transaction-button";

const TransactionsPage = async () => {
  // Pegar as transações do usuário logado.
  // Acessar as transações do meu banco de dados. Para isso vou precisar usar o prisma também.
  const transactions = await db.transaction.findMany({
    // Com isso, eu pego todas as transações que estão na tabela
  });
  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
