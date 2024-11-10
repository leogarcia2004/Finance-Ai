// Esse arquivo vai me ajudar a falar com o meu banco de dados dentro do servers componets.
import { PrismaClient } from '@prisma/client'


declare global {
    // eslint-disable-next-line no-var
    var Cachedprisma: PrismaClient;
}

// Vou fazer uma lógica para nunca instanciar mais de um prismaClient ao mesmo tempo. Assim consigo trabalhar com o prisma em desenvolvimento de forma correta.
let prisma: PrismaClient
if(process.env.NODE_ENV === 'production') { // Se não estiver em produção..
    prisma = new PrismaClient() // Abrindo conexão com o banco de dados. Não posso abrir várias conexões, quando to em modo de desenvolvimento.
    // Vou usar o PrismaCliente para falar com o meu banco de dados.
} else {
    if (!global.Cachedprisma) { 
        global.Cachedprisma = new PrismaClient()
    }
    prisma = global.Cachedprisma
}


export const db = prisma