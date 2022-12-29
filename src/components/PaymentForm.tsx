import * as React from 'react'
import { PaymentField, PromotionCode, PaymentSummary } from '@billing-js/react-billing-js'
import tw from 'tailwind-styled-components'

export default ({ activeSubscription }: { activeSubscription?: boolean }) => {
  return (
    <Container>
      <PaymentSummary />

      {/* <PromotionCodeWrapper>
        <PromotionCode
          disabled={false}
          onPromotionCode={(promotionCode) => {}}
        />
      </PromotionCodeWrapper> */}

      <PaymentField />
    </Container>
  )
}

const Container = tw.div`
    p-4
    overflow-scroll
`
const PaymentSuccessfulWrapper = tw.div`
    p-4
`
const PromotionCodeWrapper = tw.div`
    text-sm
    my-2
    inline-flex
    items-center
    justify-between
    w-full
`
