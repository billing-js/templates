import * as React from 'react'
import { useProducts, PaymentModal } from '@billing-js/react-billing-js'
import config from '../config'
import { CheckIcon } from '@heroicons/react/24/outline'

const mockData = {
  description: 'Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis.',
  features: [
    'Pariatur quod similique',
    'Sapiente libero doloribus modi nostrum',
    'Vel ipsa esse repudiandae excepturi',
    'Itaque cupiditate adipisci quibusdam',
    'Sapiente libero doloribus modi nostrum',
  ],
}

export default () => {
  const activeStripeProducts = config.stripe.products.filter((product: any) => product)
  const multiplePriceRecurrences = activeStripeProducts.length > 1
  const {
    products,
    pricingFilter: {
      currency: { selectedCurrency },
      recurrence: { selectedRecurrence, availableRecurrences, setRecurrence },
    },
  } = useProducts(activeStripeProducts, {
    modal: {
      maskClassName: 'bg-white fixed inset-0 bg-opacity-75 transition-opacity backdrop-blur-sm',
      showPromotionCodeInput: true,
    },
    defaultCustomerName: 'userName',
    normalizePriceOnRecurrence: multiplePriceRecurrences ? 'monthly' : undefined,
    defaultCurrency: 'usd',
    defaultRecurrence: 'yearly',
    onPaymentSuccessful: () => {}, //history.push('/app/?welcome-to-premium'),
    onPaymentError: () => console.log(`Payment error`),
  })

  return (
    <div className='bg-gray-900'>
      <div className='relative overflow-hidden pt-12 pb-96 lg:pt-20'>
        <div>
          <img
            className='absolute bottom-0 left-1/2 w-[1440px] max-w-none -translate-x-1/2'
            src='https://tailwindui.com/img/component-images/grid-blur-purple-on-black.jpg'
          />
        </div>
        <div className='relative mx-auto max-w-7xl px-6 text-center lg:px-8'>
          <div className='mx-auto max-w-2xl lg:max-w-4xl'>
            <h2 className='text-lg font-semibold leading-8 text-indigo-400'>Pricing</h2>
            <p className='mt-2 text-4xl font-bold tracking-tight text-white'>
              The right price for you, <br className='hidden sm:inline lg:hidden' />
              whoever you are
            </p>
            <p className='mt-6 text-lg leading-8 text-white/60'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos odit doloribus molestiae
              voluptatum.
            </p>
          </div>
        </div>
      </div>
      <div className='flow-root bg-white pb-28 lg:pb-40'>
        <div className='relative -mt-80'>
          {/* SWITCH */}
          {multiplePriceRecurrences && (
            <div className='mx-auto flex max-w-lg flex-col items-center justify-center rounded-xl mb-16 text-center'>
              <div className='relative flex rounded-lg bg-gray-100 p-0.5'>
                {availableRecurrences.map(({ name }) => (
                  <button
                    key={String(name)}
                    type='button'
                    onClick={() => setRecurrence(availableRecurrences.find((r: any) => r.name === name))}
                    className={`${
                      selectedRecurrence.name === name ? 'bg-white shadow-sm' : 'text-opacity-50 hover:text-opacity-75'
                    } whitespace-no-wrap focus:shadow-outline-none relative w-1/2 select-none rounded-md border-transparent py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out focus:z-10 focus:outline-none sm:w-auto sm:px-8 px-6`}
                  >
                    {name} billing
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* PRICES */}
          <div className='relative z-10 mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2 lg:gap-8'>
              {products.map((product: any, index) => (
                <div key={index} className='flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-black/10'>
                  <div className='p-8 sm:p-10'>
                    <h3 className='text-lg font-semibold leading-8 tracking-tight text-indigo-600 capitalize' id={product.id}>
                      {product.name}
                    </h3>
                    <div className='mt-4 flex items-baseline text-5xl font-bold tracking-tight text-gray-900'>
                      {selectedCurrency.symbol}
                      {product.selectedPricing.priceInteger}
                      <span className='text-lg font-semibold leading-8 tracking-normal text-gray-500'>
                        / {multiplePriceRecurrences ? 'month' : selectedRecurrence.interval}
                      </span>
                    </div>
                    <p className='mt-6 text-base leading-7 text-gray-600 capitalize'>
                      {product.description || mockData.description}
                    </p>
                  </div>
                  <div className='flex flex-1 flex-col p-2'>
                    <div className='flex flex-1 flex-col justify-between rounded-2xl bg-gray-50 p-6 sm:p-8'>
                      <ul role='list' className='space-y-6 pb-6'>
                        {mockData.features.map((feature, index) => (
                          <li key={index} className='flex items-start'>
                            <div className='flex-shrink-0'>
                              <CheckIcon className='h-6 w-6 text-indigo-600' aria-hidden='true' />
                            </div>
                            <p className='ml-3 text-sm leading-6 text-gray-600'>{feature}</p>
                          </li>
                        ))}
                      </ul>
                      <product.selectedPricing.paymentButton />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
