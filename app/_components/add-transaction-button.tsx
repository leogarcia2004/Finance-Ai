"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";

// Composition Pattern - Composição de componentes. um padrão de ir construindo meu componente apartir de subcomponentes.
const AddTransactionButton = () => {
  // O botão Vai controlar o estado de abertura que vai ser passado como prop para <UpsertTransactionDialog />.
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar transação
        <ArrowDownUpIcon />
      </Button>
      <UpsertTransactionDialog
        form={form}
        isOpen={dialogIsOpen}
        onClose={() => setDialogIsOpen(false)}
      />
    </>
  );
};

export default AddTransactionButton;
