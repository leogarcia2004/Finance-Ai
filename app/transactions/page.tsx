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
  const {userId} = await auth(); 
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId, 
    },
    orderBy: {
      date: "desc",
    },
  });
  const userCanAddTransaction = await canUserAddTransaction(); 
  return (

    <>
      <NavBar />
      <div className="h-[750px] space-y-6 p-6 overflow-hidden flex flex-col">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction}/>
        </div>
        <ScrollArea className="h-full">
          <DataTable columns={transactionColumns} data={JSON.parse(JSON.stringify(transactions))} />
        </ScrollArea>       
      </div>
    </>
  );
};

export default TransactionsPage;
