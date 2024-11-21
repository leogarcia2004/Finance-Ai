

export const formatCurrency = (value: number) => { // Função para formatar o valor da moeda
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
};