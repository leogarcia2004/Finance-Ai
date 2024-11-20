
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from 'lucide-react'
import Summarycard from './summary-card'
import { db } from '@/app/_lib/prisma'

interface SummaryCards {
    month: string;
    balance: number;
    depositsTotal: number;
    investmentsTotal: number;
    expensesTotal: number;
  }
  

const Summarycards = async ({month}: SummaryCards) => {
    const where = {
        date: {
            gte: new Date(`2024-${month}-01`),
            lt: new Date(`2024-${month}-31`),
        }
    }
    // Chamando o meu banco de dados
    const depositsTotal = Number(
        (await db.transaction.aggregate({
        where: {...where, type: "DEPOSIT" },
        _sum: { amount: true },
    }))?._sum?.amount // Quero que o aggregate pegue as transações que tem o tipo 'DEPOSIT' e some o valor do campo 'amount', ou seja, some todos os amounts desses depósitos.
    )
    const investimentsTotal = Number(
        (await db.transaction.aggregate({
        where: {...where, type: "INVESTIMENT" },
        _sum: { amount: true },
    }))?._sum?.amount
    )
    const expesensTotal = Number(
        (await db.transaction.aggregate({
        where: {...where, type: "EXPENSE" },
        _sum: { amount: true },
    }))?._sum?.amount
    )

    const balance = depositsTotal - investimentsTotal - expesensTotal
  return (
    <div className="space-y-6">
        
        <Summarycard icon={<WalletIcon size={14} />} title='Saldo' amount={balance} size='large' /> 
        <div className='grid grid-cols-3 gap-6'>
            <Summarycard icon={<PiggyBankIcon size={16} />} title='Investido' amount={investimentsTotal} /> {/*  passo o icon dessa forma, pois ele é um ReactNode. */}
            <Summarycard icon={<TrendingUpIcon className='text-primary' size={16} />} title='Receita' amount={depositsTotal} />
            <Summarycard icon={<TrendingDownIcon size={16} className='text-red-500' />} title='Despesas' amount={expesensTotal} />        
                       
        </div>
    </div>
  )
}

export default Summarycards