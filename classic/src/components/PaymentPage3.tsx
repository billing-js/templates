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
      <div className='mt-16 bg-white pb-12 lg:mt-20 lg:pb-20'>
        <div className='relative z-0'>
          <div className='absolute inset-0 h-5/6 bg-gray-900 lg:h-2/3' />
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className={`relative lg:grid lg:grid-cols-${products.length}`}>
              {products.map((product: any, index) => {
                const highlightedProduct = Math.round(products.length / 2)
                console.log('🛑 highlightedProduct:', highlightedProduct)
                console.log('🛑 Math.abs(highlightedProduct - index):', Math.abs(index - highlightedProduct))
                return (
                  <div
                    key={index}
                    className={`mx-auto max-w-md 
                    lg:max-w-lg
                    lg:col-start-${index} 
                    lg:col-end-${index} 
                    lg:row-start-${1 + Math.abs(index - highlightedProduct)} 
                    lg:row-end-${4 - Math.abs(index - highlightedProduct)} 
                    lg:mx-0`}
                  >
                    <div className='flex -mb-8 -translate-y-1/2 justify-center'>
                      <span className='inline-flex rounded-full bg-indigo-600 px-4 py-1 text-base font-semibold text-white'>
                        Most popular
                      </span>
                    </div>
                    <div
                      className={`flex h-full flex-col overflow-hidden rounded-lg shadow-lg lg:rounded-lg ${
                        index === highlightedProduct ? 'border-2 border-indigo-600' : ''
                      } `}
                    >
                      <div className='flex flex-1 flex-col'>
                        <div className='bg-white px-6 py-10'>
                          <div>
                            <h3 className='text-center text-2xl font-medium text-gray-900' id='tier-hobby'>
                              {product.name}
                            </h3>
                            <p className='text-center mt-6 text-base leading-7 text-gray-600 capitalize'>
                              {product.description || mockData.description}
                            </p>
                            <div className='mt-4 flex items-center justify-center'>
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
                            <div className='rounded-lg shadow-md'>
                              <a
                                href='#'
                                className='block w-full rounded-lg border border-transparent bg-white px-6 py-3 text-center text-base font-medium text-indigo-600 hover:bg-gray-50'
                                aria-describedby='tier-hobby'
                              >
                                Start your trial
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* <div className='mx-auto mt-10 max-w-lg lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4 lg:mx-0 lg:mt-0 lg:max-w-none'>
                <div className='relative z-10 rounded-lg shadow-xl'>
                  <div
                    className='pointer-events-none absolute inset-0 rounded-lg border-2 border-indigo-600'
                    aria-hidden='true'
                  />
                 
                  <div className='rounded-t-lg bg-white px-6 pt-12 pb-10'>
                    <div>
                      <h3 className='text-center text-3xl font-semibold tracking-tight text-gray-900 sm:-mx-6' id='tier-growth'>
                        Growth
                      </h3>
                      <div className='mt-4 flex items-center justify-center'>
                        <span className='flex items-start px-3 text-6xl tracking-tight text-gray-900 sm:text-6xl'>
                          <span className='mt-2 mr-2 text-4xl font-medium tracking-tight'>$</span>
                          <span className='font-bold'>149</span>
                        </span>
                        <span className='text-2xl font-medium text-gray-500'>/month</span>
                      </div>
                    </div>
                  </div>
                  <div className='rounded-b-lg border-t-2 border-gray-100 bg-gray-50 px-6 pt-10 pb-8 sm:px-10 sm:py-10'>
                    <ul role='list' className='space-y-4'>
                      {['xxx'].map((feature) => (
                        <li key={feature} className='flex items-start'>
                          <div className='flex-shrink-0'>
                            <CheckIcon className='h-6 w-6 flex-shrink-0 text-green-500' aria-hidden='true' />
                          </div>
                          <p className='ml-3 text-base font-medium text-gray-500'>{feature}</p>
                        </li>
                      ))}
                    </ul>
                    <div className='mt-10'>
                      <div className='rounded-lg shadow-md'>
                        <a
                          href='#'
                          className='block w-full rounded-lg border border-transparent bg-indigo-600 px-6 py-4 text-center text-xl font-medium leading-6 text-white hover:bg-indigo-700'
                          aria-describedby='tier-growth'
                        >
                          Start your trial
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mx-auto mt-10 max-w-md lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3 lg:m-0 lg:max-w-none'>
                <div className='flex h-full flex-col overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-r-lg'>
                  <div className='flex flex-1 flex-col'>
                    <div className='bg-white px-6 py-10'>
                      <div>
                        <h3 className='text-center text-2xl font-medium text-gray-900' id='tier-scale'>
                          Scale
                        </h3>
                        <div className='mt-4 flex items-center justify-center'>
                          <span className='flex items-start px-3 text-6xl tracking-tight text-gray-900'>
                            <span className='mt-2 mr-2 text-4xl font-medium tracking-tight'>$</span>
                            <span className='font-bold'>349</span>
                          </span>
                          <span className='text-xl font-medium text-gray-500'>/month</span>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-1 flex-col justify-between border-t-2 border-gray-100 bg-gray-50 p-6 sm:p-10 lg:p-6 xl:p-10'>
                      <ul role='list' className='space-y-4'>
                        {['ssxx'].map((feature) => (
                          <li key={feature} className='flex items-start'>
                            <div className='flex-shrink-0'>
                              <CheckIcon className='h-6 w-6 flex-shrink-0 text-green-500' aria-hidden='true' />
                            </div>
                            <p className='ml-3 text-base font-medium text-gray-500'>{feature}</p>
                          </li>
                        ))}
                      </ul>
                      <div className='mt-8'>
                        <div className='rounded-lg shadow-md'>
                          <a
                            href='#'
                            className='block w-full rounded-lg border border-transparent bg-white px-6 py-3 text-center text-base font-medium text-indigo-600 hover:bg-gray-50'
                            aria-describedby='tier-scale'
                          >
                            Start your trial
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
