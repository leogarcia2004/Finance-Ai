import {

    TransactionType,
  } from "@prisma/client";

  // A categoria está sendo renderizada com o nome do enum, então preciso converter esse nome para português. E para isso posso criar um mapa que mapeia o nome do enum para o nome em português. 
  export const TRANSACTION_CATEGORY_LABELS = {
    EDUCATION: "Educação",
    ENTERTAINMENT: "Entretenimento",
    FOOD: "Alimentação",
    HEALTH: "Saúde",
    HOUSING: "Moradia",
    OTHER: "Outros",
    SALARY: "Salário",
    TRANSPORTATION: "Transporte",
    UTILITY: "Utilidades",
  };
  
  export const TRANSACTION_PAYMENT_METHOD_LABELS = {
    BANK_TRANSFER: "Transferência Bancária",
    BANK_SLIP: "Boleto Bancário",
    CASH: "Dinheiro",
    CREDIT_CARD: "Cartão de Crédito",
    DEBIT_CARD: "Cartão de Débito",
    OTHER: "Outros",
    PIX: "Pix",
  };
  
  export const TRANSACTION_TYPE_OPTIONS = [
    {
      value: TransactionType.EXPENSE,
      label: "Despesa",
    },
    {
      value: TransactionType.DEPOSIT,
      label: "Depósito",
    },
    {
      value: TransactionType.INVESTIMENT,
      label: "Investimento",
    },
  ];