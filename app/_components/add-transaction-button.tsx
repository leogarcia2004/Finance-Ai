"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

// Composition Pattern - Composição de componentes. um padrão de ir construindo meu componente apartir de subcomponentes.
const AddTransactionButton = ({userCanAddTransaction}: AddTransactionButtonProps) => {
  // O botão Vai controlar o estado de abertura que vai ser passado como prop para <UpsertTransactionDialog />.
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
            className="rounded-full font-bold"
            onClick={() => setDialogIsOpen(true)}
            disabled={!userCanAddTransaction}
            >
            Adicionar transação
            <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction && "Você atingiu o limite de transações para esse mês. Atualize seu plano para adicionar transações ilimitadas."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
