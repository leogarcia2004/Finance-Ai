
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import Summarycards from "./_components/summary-cards";
import TimeSelect from "./_components/time-selects";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";

interface HomeProps {
  searchParams: {
    month: string;
  };
}


const Home = async ({searchParams: {month}}: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM"); // Se não tiver um mês fornecido, ou um mês que não está no formato MM, eu vou redirecionar para a página do mês padrão.
  if (monthIsInvalid) { // Se o mês não for válido, eu vou redirecionar para a página do mês padrão.
    redirect(`?month=${new Date().getMonth() + 1}`);
  }
  
  const dashboard = await getDashboard(month); /// Pegando os dados da dashboard, e passando como parâmetro para os componentes abaixo.
  return (
    <>
      <NavBar />
      <div className="p-6 space-y-6 ">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr] gap-6">
          <div className="flex flex-col gap-6">
            <Summarycards month={month} {...dashboard}/> {/* Passando o mês e todos os dados da dashboard para o componente Summarycards */}
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
                <TransactionsPieChart {...dashboard} />
                <ExpensesPerCategory
                  expensesPerCategory={dashboard.totalExpensePerCategory}
                />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} /> {/* Passando as últimas transações para o componente LastTransactions */}
        </div>
      </div>
    </>
  );
};

export default Home;
