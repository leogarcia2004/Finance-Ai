"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select"
import { useRouter, useSearchParams } from "next/navigation";

const MONTH_OPTIONS = [
    { value: "01", label: 'January' },
    { value: "02", label: 'February' },
    { value: "03", label: 'March' },
    { value: "04", label: 'April' },
    { value: "05", label: 'May' },
    { value: "06", label: 'June' },
    { value: "07", label: 'July' },
    { value: "08", label: 'August' },
    { value: "09", label: 'September' },
    { value: "10", label: 'October' },
    { value: "11", label: 'November' },
    { value: "12", label: 'December' },
]


const TimeSelect = () => {
    // Preciso pegar o mês para usá-lo para eu chamar o meu banco de dados.
  // Colocando o mês na minha url para que eu consig usar esse mês na hora de eu chamar o meu banco.
  const { push } = useRouter(); // Esse push é para eu poder mudar a url, que vai me direcionar para outra página.
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const handleMonthChange = (month: string) => {
    push(`/?month=${month}`); // Aqui eu estou mudando a url para que eu possa pegar o mês que eu selecionei.
  };
  return (
    <Select
        onValueChange={(value) => handleMonthChange(value)}
        defaultValue={month ?? ""}
    >
        <SelectTrigger className="w-[150px] rounded-full">
            <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
            {MONTH_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
            ))}
        </SelectContent>
        
    </Select>

  )
}

export default TimeSelect