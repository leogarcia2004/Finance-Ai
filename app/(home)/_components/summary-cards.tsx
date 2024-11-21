
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from 'lucide-react'
import Summarycard from './summary-card'

interface SummaryCards {
    month: string;
    balance: number;
    depositsTotal: number;
    investmentsTotal: number;
    expensesTotal: number;
  }
  

const Summarycards = async ({month, balance, depositsTotal, investmentsTotal, expensesTotal}: SummaryCards) => {

    
  return (
    <div className="space-y-6">
        
        <Summarycard icon={<WalletIcon size={14} />} title='Saldo' amount={balance} size='large' /> 
        <div className='grid grid-cols-3 gap-6'>
            <Summarycard icon={<PiggyBankIcon size={16} />} title='Investido' amount={investmentsTotal} /> {/*  passo o icon dessa forma, pois ele é um ReactNode. */}
            <Summarycard icon={<TrendingUpIcon className='text-primary' size={16} />} title='Receita' amount={depositsTotal} />
            <Summarycard icon={<TrendingDownIcon size={16} className='text-red-500' />} title='Despesas' amount={expensesTotal} />        
                       
        </div>
    </div>
  )
}

export default Summarycards