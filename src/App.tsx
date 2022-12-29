import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from '@billing-js/react-billing-js'
import tw from 'tailwind-styled-components'
import PaymentPage from './components/PaymentPage'
import PaymentSuccessful from './components/PaymentSuccessful'
import Error from './components/Error'

export default (): React.ReactElement => {
  const { loading } = useAuth()
  if (loading) return <div>loading...</div>
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PaymentPage />} />
          <Route path='/pay' element={<PaymentPage />} />
          <Route path='/paymentSuccessful' element={<PaymentSuccessful />} />
          <Route path='/error' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

const Container = tw.div`
  max-w-5xl
`
