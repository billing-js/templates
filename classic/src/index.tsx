import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BillingProvider, BillingErrorType } from '@billing-js/react-billing-js'
import config from './config'
import App from './App'
import CustomerPortal from './components/CustomerPortal'

const rootElement: any = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <BillingProvider
      stripeAccount={config.stripe.accountId}
      liveMode={true}
      options={{
        termsAndConditionsUrl: '/terms',
        productPageUrl: '/pricing',
        customerPortalUrl: '/subscription',
      }}
      signInCustomer={() => console.log('⏩ signInCustomer')}
      signOutCustomer={() => window.open('/signOut', '_self')}
      onError={(error: any) => {
        console.error(error)
        if (error.type === BillingErrorType.customer_not_found || error.type === BillingErrorType.stripe_account_not_found)
          return window.open('/signOut', '_self')
      }}
    >
      <CustomerPortal />
      {/* <App /> */}
    </BillingProvider>
  </StrictMode>
)
