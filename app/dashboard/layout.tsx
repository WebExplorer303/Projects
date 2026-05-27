import Link from "next/link";
import { ReactNode } from "react";
import { UserButton, SignOutButton } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (<>

    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <span className="font-semibold text-gray-700 dark:text-gray-300 tracking-tight align-middle">
              Profile
            </span>

            <div className="flex items-center gap-2 align-middle">
              <ClerkProvider>
                <UserButton userProfileMode="modal" />
              </ClerkProvider>
            </div>
          </div>

          <hr className="border-t border-gray-200 dark:border-gray-700 w-full my-1" />

          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">
              <Link href="/dashboard" className="hover:opacity-90 transition-opacity">
                MicroSaaS Tracker
              </Link>
            </h2>
          </div>
        </div>

<nav className="flex flex-col md:flex-row md:items-center md:justify-center gap-2">
  <button className="md:hidden p-2 bg-gray-100 rounded">Menu</button>
  <div className="hidden md:flex md:flex-row gap-2 md:gap-6">
    <Link href="/dashboard/subscriptions" className="...">Subscriptions</Link>
    <Link href="/dashboard/analytics" className="...">Analytics</Link>
  </div>
</nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  </>
  );
}