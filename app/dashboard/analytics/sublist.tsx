"use client";

import { useState } from "react";

export default function SubscriptionList({ subscriptions }: { subscriptions: any[] }) {
  const [filter, setFilter] = useState("all");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredSubs = subscriptions.filter((sub) => {

    const dateString = typeof sub.nextRenewal === "string" ? sub.nextRenewal.split("T")[0] : sub.nextRenewal;
    const renewalDate = new Date(`${dateString}T00:00:00`);
    
    if (filter === "upcoming") return renewalDate >= today;
    if (filter === "overdue") return renewalDate < today;
    return true; 
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setFilter("all")} 
          className={`px-3 py-1 text-sm rounded transition-colors ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter("upcoming")} 
          className={`px-3 py-1 text-sm rounded transition-colors ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
        >
          Upcoming
        </button>
        <button 
          onClick={() => setFilter("overdue")} 
          className={`px-3 py-1 text-sm rounded transition-colors ${filter === 'overdue' ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
        >
          Overdue
        </button>
      </div>

      <div className="grid gap-3">
        {filteredSubs.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No subscriptions found.</p>
        ) : (
          filteredSubs.map((sub) => {
       
            const dateString = typeof sub.nextRenewal === "string" ? sub.nextRenewal.split("T")[0] : sub.nextRenewal;
            const localizedDate = new Date(`${dateString}T00:00:00`);

            return (
              <div key={sub.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{sub.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Renews: {localizedDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </p>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">${Number(sub.cost).toFixed(2)}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}