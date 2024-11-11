"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
  } from "./ui/dialog";
import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Input } from "./ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "./ui/form";
import { MoneyInput } from "./money-input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../_components/ui/select"
import { TRANSACTION_CATEGORY_OPTIONS, TRANSACTION_PAYMENT_METHOD_OPTIONS, TRANSACTION_TYPE_OPTIONS } from "../_constants/transactions";
import DatePicker from "./ui/date-picker";


// DialogTrigger é um componente que vai ser responsável por abrir o meu modal(dialog).
// DialogContent é o conteúdo do meu modal(dialog).

// Método de validação de formulário com zod. é uma forma padrão de validação de formulário essa abaixo.
const formSchema = z.object({
    
    name: z.string().trim().min(1, { // Usando o trim() para não contar os espaços em branco.
        message: "Nome é obrigatório"
    }),  
    amount: z.string().trim().min(1,{
        message: "Valor é obrigatório"
    }),
    type: z.nativeEnum(TransactionType, {
        required_error: "O Tipo é obrigatório"
    }), // O meu tipo tem que ser um dos valores do meu enum TransactionType.
    category: z.nativeEnum(TransactionCategory, {
        required_error: "A categora é obrigatória"
    }), // A minha cateogria tem que ser um dos valores do meu enum TransactionType.
    paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
        required_error: "O método de pagamento é obrigatório"
    }), // O meu método de pagamento tem que ser um dos valores do meu enum TransactionType.
    date: z.date({
        message: "Data é obrigatória"
    }),
})

type FormSchema = z.infer<typeof formSchema>

// Composition Pattern - Composição de componentes. um padrão de ir construindo meu componente apartir de subcomponentes.
const AddTransactionButton = () => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            amount: "",
            type: TransactionType.EXPENSE, // O valor default(padrão) do meu tipo é despesa.
            category: TransactionCategory.OTHER,
            paymentMethod: TransactionPaymentMethod.CASH,
            date: new Date()
        }
    })

    // Função que vai ser chamada quando o formulário for enviado.
    const onSubmit = (data: FormSchema) => {}

  return (
    <Dialog onOpenChange={(open) => {
        if (!open) { // Se o modal for fechado, eu quero resetar o meu formulário.
            form.reset()
        }
    }}> 
        <DialogTrigger asChild className="rounded-full font-bold">
            <Button className="rounded-full font-bold">
                Adicionar transação
                <ArrowDownUpIcon />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Adicionar transação</DialogTitle>  
                <DialogDescription>
                    Insira as informações abaixo
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                         <FormLabel>Nome</FormLabel>
                         <FormControl>
                            <Input placeholder="Digite o nome..." {...field} />
                         </FormControl>
                         <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                         <FormLabel>Valor</FormLabel>
                         <FormControl>
                            <MoneyInput placeholder="Digite o valor..." {...field} />
                         </FormControl>
                         <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {
                                TRANSACTION_TYPE_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                                ))                                
                            }
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione a categoria..." />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {
                                TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                                ))                                
                            }
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Método de pagamento</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um método de pagamento" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {
                                TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                                ))                                
                            }
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Data</FormLabel>
                        <DatePicker value={field.value} onChange={field.onChange} />

                        <FormMessage />
                        </FormItem>
                    )}
                    />
                             
                <DialogFooter>
                    <DialogClose asChild> {/* asChild é uma propriedade que eu posso passar para o meu componente para que ele seja renderizado como um filho do componente pai, dessa forma não aparece como dois botões no html da minha página */}
                    <Button type="button" variant="outline">Cancelar</Button>
                    </DialogClose> 
                    <Button type="submit">Adicionar</Button>
                </DialogFooter>
                </form>
            </Form >
        </DialogContent>
    </Dialog>   
  )
}

export default AddTransactionButton