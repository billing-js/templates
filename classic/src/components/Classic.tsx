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
      {/* HEADER */}
      <div className='px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20'>
        <div className='text-center'>
          <h2 className='text-xl font-semibold leading-6 text-gray-300'>Pricing</h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'>
            The right price for you, whoever you are
          </p>
          <p className='mx-auto mt-3 max-w-4xl text-xl text-gray-300 sm:mt-5 sm:text-2xl'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos odit doloribus molestiae
            voluptatum.
          </p>
        </div>
      </div>

      {/* SWITCH */}
      {multiplePriceRecurrences && (
        <div className='mx-auto mt-12 flex max-w-lg flex-col items-center justify-center rounded-xl text-center'>
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
      <div className='mt-16 bg-white lg:mt-20 lg:pb-20 relative z-0 pb-16'>
        <div className='absolute inset-0 h-5/6 bg-gray-900 h-full lg:h-2/3 ' />
        <div className='flex justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className={`relative lg:grid lg:grid-cols-${products.length} gap-x-0`}>
            {products.map((product: any, index) => {
              const mostPopular = index === Math.floor(products.length / 2)
              const popularityIndex = Math.abs(index - Math.floor(products.length / 2))
              return (
                <div
                  key={index}
                  className={`mx-auto 
                  max-w-md 
                  lg:mx-0 
                  rounded-lg 
                  mb-12 
                  mx-${6 * popularityIndex} 
                  lg:my-${6 * popularityIndex} 
                  z-${50 - 10 * popularityIndex} 
                  shadow-${mostPopular ? '2xl' : 'lg'}`}
                >
                  {mostPopular && (
                    <div className='flex -mb-8 -translate-y-1/2 justify-center'>
                      <span className='inline-flex rounded-full bg-indigo-600 px-4 py-1 text-base font-semibold text-white'>
                        Most popular
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex 
                    h-full 
                    flex-col 
                    overflow-hidden 
                    rounded-lg 
                    lg:rounded-lg 
                    ${mostPopular && 'ring ring-indigo-600'}`}
                  >
                    <div className={`flex flex-1 flex-col justify-center bg-white px-6 py-6`}>
                      <div>
                        <h3 className='text-center text-2xl font-medium text-gray-900' id='tier-hobby'>
                          {product.name}
                        </h3>
                        <p className='text-center mt-6 text-base leading-7 text-gray-600 capitalize'>
                          {product.description || mockData.description}
                        </p>
                        <div className='mt-6 flex items-center justify-center'>
                          <span className='flex items-start px-3 text-6xl tracking-tight text-gray-900'>
                            <span className='mt-2 mr-2 text-4xl font-medium tracking-tight'>{selectedCurrency.symbol}</span>
                            <span className='font-bold'>{product.selectedPricing.priceInteger}</span>
                          </span>
                          <span className='text-xl font-medium text-gray-500'>
                            / {multiplePriceRecurrences ? 'month' : selectedRecurrence.interval}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-1 flex-col justify-between border-t-2 border-gray-100 bg-gray-50 p-6 sm:p-10 lg:p-6 xl:p-10'>
                      <ul role='list' className='space-y-4'>
                        {mockData.features.map((feature, index) => (
                          <li key={index} className='flex items-start'>
                            <div className='flex-shrink-0'>
                              <CheckIcon className='h-6 w-6 flex-shrink-0 text-green-500' aria-hidden='true' />
                            </div>
                            <p className='ml-3 text-base font-medium text-gray-500'>{feature}</p>
                          </li>
                        ))}
                      </ul>
                      <div className='mt-8'>
                        <product.selectedPricing.paymentButton />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
