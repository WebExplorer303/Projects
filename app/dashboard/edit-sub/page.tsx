import EditSubscriptionForm  from "./edit-subscription-form";
import { prisma } from "@/lib/prisma";

export default async function EditSubscriptionPage({ params }: { params: { id: string } }) {
      const subscription = await prisma.product.findUnique({
    where: { id: params.id }
  });
    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Update Subscription</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">Enter the details below.</p>
            <EditSubscriptionForm subscription={subscription} />
        </div>
    );
}

