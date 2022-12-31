import * as React from 'react'
import { useAuth, useProducts } from '@billing-js/react-billing-js'
import { useEffect, useState } from 'react'
import config from '../config'

export default () => {
  const { signIn, signOut, loading: authLoading, user } = useAuth()
  const [error, setError] = useState('')

  const urlParams = new URLSearchParams(window.location.search)

  const signInUser = () => {
    const hmac = urlParams.get('token')
    const email = urlParams.get('email')

    if (!email || !hmac) return setError('Missing token or email in params')
    return signOut().then(() => signIn({ hmac, email }))
  }

  useEffect(() => {
    if (!user || user?.email !== urlParams.get('email')) {
      signInUser()
    }
  }, [user])

  const {
    loading: productLoading,
    products: [premiumPlan],
    pricingFilter: {
      currency: { selectedCurrency, availableCurrencies, setCurrency },
      recurrence: { selectedRecurrence, availableRecurrences, setRecurrence },
    },
  } = useProducts([config.stripe.products[0]], {
    modal: { maskClassName: 'bg-white opacity-75' },
    defaultCurrency: 'eur',
    normalizePriceOnRecurrence: 'monthly',
    defaultRecurrence: 'yearly',
    onPaymentSuccessful: () => (window.location.href = '/paymentSuccessful'),
    onPaymentError: () => alert('An error occurred. Please try again.'),
  })

  useEffect(() => {
    if (!productLoading && !authLoading) {
      console.log('loaded', premiumPlan.selectedPricing)
      premiumPlan.selectedPricing.onSelectPricing()
    }
  }, [productLoading, authLoading, premiumPlan])

  return (
    <div className='flex flex-row justify-between bg-white '>
      <div className='w-1/2'>
        {error && false && (
          <div className='m-5 max-w-xl divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white p-5  shadow-sm'>
            <div className='w-full flex-col text-center text-red-400'>
              <div> ⚠️ Error: {error} </div>
              <a
                className='text-red-600'
                href={`mailto:contact@merge.email?subject=EMAIL_MERGE_PAYMENT_BUG_REPORT&body=BUG: ${error}`}
                target='_blank'
              >
                Send bug report
              </a>
            </div>
          </div>
        )}

        {/**************************************************
         *                  UPGRADE
         *************************************************/}
        <div className='max-w-7xl bg-white'>
          <div className=' align-center flex flex-col'>
            <h1 className='mt-3 text-center text-3xl font-extrabold text-gray-900'>Premium features</h1>
            <p className='mt-2 text-center text-xl text-gray-500'>Find the perfect plan for you or your team</p>
          </div>
          <div className='mx-auto flex max-w-lg flex-col items-center justify-center rounded-xl bg-white px-6 text-center'>
            {/* SWITCH */}
            <div className='relative mt-4 mb-5 flex rounded-lg bg-gray-100 p-0.5'>
              {availableRecurrences.map(({ name }: { name: any }) => (
                <button
                  key={String(name)}
                  type='button'
                  onClick={() => setRecurrence(availableRecurrences.find((r: any) => r.name === name))}
                  className={`${
                    selectedRecurrence.name === name ? 'bg-white shadow-sm' : 'text-opacity-50 hover:text-opacity-75'
                  } whitespace-no-wrap focus:shadow-outline-none relative w-1/2 select-none rounded-md border-transparent py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out focus:z-10 focus:outline-none sm:w-auto sm:px-8`}
                >
                  {name} billing
                </button>
              ))}
            </div>
            {/* PRICE */}
            <div className=' flex items-center justify-center text-5xl font-extrabold text-gray-900'>
              <span className='flex items-start px-3 text-6xl leading-none tracking-tight text-gray-900 sm:text-6xl'>
                <span className='mt-2 mr-2 text-4xl font-medium'>{selectedCurrency.symbol}</span>
                <span className='font-extrabold'>
                  {premiumPlan.selectedPricing.priceInteger}
                  <span className='ml-1 text-2xl font-medium leading-8 text-gray-500'>
                    .{premiumPlan.selectedPricing.priceDecimal}
                  </span>
                </span>
              </span>
              <span className='leading-1 text-2xl font-medium text-gray-500'>/ month / user</span>
            </div>
            {/* DETAILS */}
            <div className='w-max flex-1 rounded-xl bg-white px-5  pb-2'>
              <ul className='mt-4 mb-2 space-y-5'>
                <Feature>Cancel anytime</Feature>
                <Feature>30-day money-back guarantee</Feature>
                <Feature>24/7 Support</Feature>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Feature = ({ children }: any) => (
  <li className='flex items-center justify-start'>
    <div className='flex-shrink-0'>
      <FeatureIcon />
    </div>
    <p className='ml-3 text-lg text-gray-700'>{children}</p>
  </li>
)
const FeatureIcon = () => (
  <svg
    className='h-5 w-5 text-green-400'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
    fill='currentColor'
    aria-hidden='true'
  >
    <path
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
      clipRule='evenodd'
    />
  </svg>
)
