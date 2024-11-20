
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import Summarycards from "./_components/summary-cards";
import TimeSelect from "./_components/time-selects";
import { isMatch } from "date-fns";

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
  
  return (
    <>
      <NavBar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <Summarycards month={month} />
      </div>
    </>
  );
};

export default Home;
