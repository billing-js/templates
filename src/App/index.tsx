import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { CustomerPortal, useAuth } from '@billing-js/react-billing-js'
import tw from 'tailwind-styled-components'

import PaymentPage from './PaymentPage'
import Account from './Account'
import PaymentSuccessful from './PaymentSuccessful'
import Error from './Error'

const Main = (): React.ReactElement => {
  const { loading } = useAuth()

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <Container>
      <Switch>
        <Route exact path="/account" component={Account} />
        <Route exact path="/pay" component={PaymentPage} />
        <Route exact path="/paymentSuccessful" component={PaymentSuccessful} />
        <Route exact path="/error" component={Error} />
        <Redirect to="/error" />
      </Switch>
    </Container>
  )
}

export default Main

const Container = tw.div`
  max-w-5xl
`
