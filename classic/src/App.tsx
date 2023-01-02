import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from '@billing-js/react-billing-js'
import Success from './components/Success'
import Error from './components/Error'
import PaymentPage1 from './components/PaymentPage1'
import PaymentPage2 from './components/PaymentPage2'
import PaymentPage from './components/PaymentPage'
import PaymentPage3 from './components/PaymentPage3'

export default (): React.ReactElement => {
  const { loading } = useAuth()
  if (loading) return <div>loading...</div>
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PaymentPage3 />} />
        <Route path='/pay' element={<PaymentPage1 />} />
        <Route path='/pay2' element={<PaymentPage2 />} />
        <Route path='/paymentSuccessful' element={<Success />} />
        <Route path='/error' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}