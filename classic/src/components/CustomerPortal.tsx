import React, { useEffect } from 'react'
import { CustomerProfile, Subscriptions, PaymentMethods, InvoicesHistory, useAuth } from '@billing-js/react-billing-js'
import { SwatchIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

export default () => {
  const user = {
    role: 'admin',
    status: 'active',
    plan: 'Enterprise',
    domain: 'google.com',
  }

  if (!user) {
    return (
      <div className='flex flex-col justify-center items-center h-screen bg-slate-50'>
        <div className='flex flex-col justify-center items-center h-screen bg-white'>
          <SwatchIcon />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-slate-50'>
      <div className='flex flex-col justify-center items-center w-full h-screen bg-slate-50'>
        <div className='flex items-center justify-center flex-col w-full bg-slate-50'>
          <CustomerProfile enableSubscriptionTransfer={true} />
          <Subscriptions />
          <PaymentMethods />
          <InvoicesHistory />

          {/* <a href='/teamPlanUpgrade' className='flex flex-row justify-items-center items-center text-sm'>
            <ArrowUpCircleIcon className='flex-shrink-0 w-6 h-6 mr-1 text-slate-900' />
            Upgrade for free to the new Team plan to manage the users on your plan
          </a> */}
        </div>
      </div>
    </div>
  )
}
