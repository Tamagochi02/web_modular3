import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient

export function exclude<T, Key extends keyof T>(
    t: T,
    keys: Key[]
): Omit<T, Key> {
    for (let key of keys) {
        delete t[key]
    }
    return t
}

if (process.env.NODE_ENV == 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

