'use client';

import { useActionState } from 'react';
import { EditSubscription } from '../subscriptions/actions';
import { Loader2, PlusCircle } from 'lucide-react';

export function EditSubscriptionForm({ subscription }: { subscription?: any }) {
  const [state, action, isPending] = useActionState(EditSubscription, null);

  return (
    <form action={action} className="...">
      <input type="hidden" name="id" value={subscription?.id} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="...">Service Name</label>
          <input
            required
            name="name"
            defaultValue={subscription?.name}
            placeholder="e.g. Netflix, ChatGPT"
            className="..."
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="cost" className="...">Monthly Cost ($)</label>
          <input
            required
            type="number"
            step="0.01"
            name="cost"
            defaultValue={subscription?.cost} 
            className="..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="cycle" className="...">Billing Cycle</label>
          <select 
            name="cycle" 
            defaultValue={subscription?.cycle || "monthly"}
            className="..."
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="nextRenewal" className="...">Next Renewal Date</label>
          <input
            required
            type="date"
            name="nextRenewal"
       
            defaultValue={subscription?.nextRenewal?.toISOString().split('T')[0]} 
            className="..."
          />
        </div>
      </div>
      
      {state?.error && (

        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-1">

          {state.error}

        </div>

      )}



      {state?.success && (

        <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg border border-green-100 animate-in fade-in slide-in-from-top-1">

          {state.success}

        </div>

      )}



      <button

        disabled={isPending}

        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"

      >

        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlusCircle className="w-5 h-5" />}

        Add Subscription

      </button>

    </form>
  );
}