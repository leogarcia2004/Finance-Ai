import { PrismaClient } from '@prisma/client'

declare global {
    // eslint-disable-next-line no-var
    var Cachedprisma: PrismaClient;
}

let prisma: PrismaClient
if(process.env.NODE_ENV === 'production') { 
    prisma = new PrismaClient() 
} else {
    if (!global.Cachedprisma) { 
        global.Cachedprisma = new PrismaClient()
    }
    prisma = global.Cachedprisma
}


export const db = prisma