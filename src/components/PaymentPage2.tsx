import { Link } from 'react-router-dom'
import { useProducts, PaymentModal } from '@billing-js/react-billing-js'
import tw from 'tailwind-styled-components'
import { CheckIcon, PlusIcon } from '@heroicons/react/outline'
import config from '../config'

export default ({ user }: any) => {
  const {
    products: [PersonalProPlan, TeamPlan],
    pricingFilter: {
      currency: { selectedCurrency },
      recurrence: { selectedRecurrence, availableRecurrences, setRecurrence },
    },
  } = useProducts(config.stripe.products, {
    modal: {
      maskClassName: 'bg-white fixed inset-0 bg-opacity-75 transition-opacity backdrop-blur-sm',
      showPromotionCodeInput: true,
    },
    defaultCustomerName: user?.displayName ?? '',
    normalizePriceOnRecurrence: 'monthly',
    defaultCurrency: 'usd',
    defaultRecurrence: 'yearly',
    onPaymentSuccessful: () => {}, //history.push('/app/?welcome-to-premium'),
    onPaymentError: () => console.log(`Payment error`),
  })

  const renderFeature = (feature: any) => (
    <li key={feature.name} className='flex'>
      <CheckIcon className='flex-shrink-0 w-6 h-6 text-blue-500' aria-hidden='true' />
      <span className='ml-3 text-gray-900 text-base'>{feature.name}</span>
    </li>
  )

  const renderFreeTier = () => {
    return (
      <div className='relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col'>
        <div className='flex-1'>
          <h3 className='text-xl font-semibold text-gray-900'>Personal</h3>
          <p className='mt-4 flex items-baseline text-gray-900'>
            <span className='text-5xl font-extrabold tracking-tight'>Free</span>
          </p>
          <p className='mt-6 text-gray-500'>For organizing your daily life.</p>

          {/* Feature list */}
          <ul role='list' className='mt-6 space-y-6'>
            {[{ name: 'Unlimited tasks' }, { name: '5 shared lists' }, { name: 'Basic support' }].map(renderFeature)}
          </ul>
        </div>
      </div>
    )
  }

  const renderPremiumTier = (product: any) => {
    return (
      <div className='relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col'>
        <div className='flex-1 mb-6'>
          <h3 className='text-xl font-semibold text-gray-900'>{product.name}</h3>
          <p className='mt-4 flex items-baseline text-gray-900'>
            <span className='text-5xl font-extrabold tracking-tight'>
              <span className='mr-1'>{selectedCurrency.symbol}</span>
              {product.selectedPricing.priceInteger}
              {product.selectedPricing.priceDecimal !== 0 && (
                <span className='text-2xl leading-8 font-medium text-gray-500'>.{product.selectedPricing.priceDecimal}</span>
              )}
            </span>
            <span className='ml-1 text-xl font-semibold'>
              / {product.selectedPricing.pricingRecurrence} {product.teamPlan && '/ user'}
            </span>
          </p>
          <p className='mt-6 text-gray-500'>{product.description}</p>
          {/* Feature list */}
          <ul role='list' className='mt-6 space-y-6'>
            {product.features.map(renderFeature)}
          </ul>
          <Link to='/premium#shared-lists' className='flex mt-6'>
            <PlusIcon className='flex-shrink-0 w-6 h-6 p-0.5 text-blue-500' aria-hidden='true' />
            <span className='ml-3 text-blue-500 text-base font-semibold'>See all features</span>
          </Link>
        </div>

        <product.selectedPricing.paymentButton />
      </div>
    )
  }

  const renderRecurrenceSwitch = () => {
    // console.log(`selectedRecurrence`, selectedRecurrence)
    return (
      <RecurrenceSwitchWrapper>
        <RecurrenceSwitch>
          {availableRecurrences.map(({ name }) => (
            <RecurrenceSwitchButton
              key={String(name)}
              type='button'
              onClick={() => setRecurrence(availableRecurrences.find((r) => r.name === name))}
              $selected={selectedRecurrence.name === name}
            >
              {name} billing
            </RecurrenceSwitchButton>
          ))}
        </RecurrenceSwitch>
      </RecurrenceSwitchWrapper>
    )
  }

  return (
    <>
      <div className='max-w-7xl mx-auto pt-24 px-4 bg-white sm:px-6 lg:px-8'>
        <PaymentModal />
        <h2 className='text-3xl font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl'>
          Pricing plans for teams of all sizes
        </h2>
        <p className='mt-6 max-w-2xl text-xl text-gray-500'>
          {"Find the perfect plan for you or your team that's packed with all the "}
          <Link to='/premium#shared-lists'>Premium features</Link>
        </p>

        {renderRecurrenceSwitch()}

        {/* Tiers */}
        <div className='mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8'>
          {renderFreeTier()}
          {renderPremiumTier({
            ...PersonalProPlan,
            features: [
              { name: 'Unlimited shared lists', link: 'shared-lists' },
              { name: 'Unlimited boards', link: 'boards' },
              { name: 'Boards and lists customization', link: 'boards-and-lists-customization' },
              { name: 'Custom task labels', link: 'labels' },
            ],
          })}
          {renderPremiumTier({
            ...TeamPlan,
            teamPlan: true,
            features: [
              { name: 'Everything in Pro' },
              { name: 'Unlimited shared boards' },
              { name: 'Team billing' },
              { name: 'Priority support' },
            ],
          })}
        </div>
      </div>
    </>
  )
}

const RecurrenceSwitchWrapper = tw.div`
    flex
`
const RecurrenceSwitch = tw.div`
    relative
    self-center
    mt-6
    bg-gray-100
    rounded-lg
    p-0.5
    flex
    sm:mt-8
`

const RecurrenceSwitchButton = tw.button<{ $selected: boolean }>`
    relative
    capitalize
    
    border-gray-200
    rounded-md
    
    py-2
    px-4
    text-sm
    font-medium
    text-gray-900
    whitespace-nowrap

    focus:outline-none

    ${(p) => (p.$selected ? 'bg-white shadow-sm' : 'bg-transparent text-opacity-75')}
`
