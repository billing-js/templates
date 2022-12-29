import * as React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { CustomerPortal, useAuth } from '@billing-js/react-billing-js'
import tw from 'tailwind-styled-components'
import PaymentPage from './components/PaymentPage'
import Account from './components/Account'
import PaymentSuccessful from './components/PaymentSuccessful'
import Error from './components/Error'

const Main = (): React.ReactElement => {
  const { loading } = useAuth()

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PaymentPage />} />
          <Route path='/account' element={<Account />} />
          <Route path='/pay' element={<PaymentPage />} />
          <Route path='/paymentSuccessful' element={<PaymentSuccessful />} />
          <Route path='/error' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default Main

const Container = tw.div`
  max-w-5xl
`
