"use server"

import { revalidatePath } from "next/cache"
import { insertProductToDatabase } from "@/lib/db-actions"
import { auth } from "@clerk/nextjs/server"

export async function addSubscription(prevState: any, formData: FormData) {
    const { userId } = await auth();

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const payload = {
        name: (formData.get("name") as string)?.trim(),
        cost: parseFloat(formData.get("cost") as string) || 0,
        cycle: formData.get("cycle") as string,
        nextRenewal: formData.get("nextRenewal") as string,
        userId
    }

    if (!payload.name || !payload.nextRenewal) {
        return { error: "Missing required fields" };
    }

    try {
        await insertProductToDatabase(payload)
        revalidatePath("/dashboard/subscriptions")
        revalidatePath("/dashboard")
        return { success: "Subscription added successfully!" };
    } catch (error) {
        console.error("Failed to save:", error)
        return { error: "Database operation failed" };
    }
}