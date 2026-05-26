import SubscriptionDonut from "../analytics/chart";
import { prisma } from "../../../lib/prisma";
import DashboardPage from "../page";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserSubscriptions } from "@/lib/actions";

export default async function AnalyticsPage() {
        const {userId } = await auth();
    
        if (!userId) {
            redirect("/sign-in");
        }
const subscriptions = await getUserSubscriptions(userId);

    return (
        <>
            <DashboardPage />
            <div className="mt-8">
                <SubscriptionDonut data={subscriptions as any} />
            </div></>
    );
}
