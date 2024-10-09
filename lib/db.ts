import { PrismaClient } from "@prisma/client";

declare global {
    var prisma : PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient();


// this code is just preventing devloper to make to many copies of prisma cleint as in dev mode hot reload will create a new copy of client everytime
// globalThis is not affected from hot reload
if(process.env.NODE_ENV !== "production") globalThis.prisma = db
