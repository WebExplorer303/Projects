import { prisma } from "./prisma";

export async function getUserSubscriptions(userId: string) {
    return await prisma.product.findMany({
        where: {
            userId: userId 
        }
    });
}