import { useAuth, CustomerPortal } from '@billing-js/react-billing-js'
import React, { useEffect, useState } from 'react'

export default () => {
  const { signIn, loading, user } = useAuth()
  const [error, setError] = useState('')

  const urlParams = new URLSearchParams(window.location.search)

  const signInUser = () => {
    const hmac = urlParams.get('token')
    const email = urlParams.get('email')

    if (!email || !hmac) return setError('Missing token or email in params')
    signIn({ hmac, email })
  }

  useEffect(() => {
    console.log(`user`, user)
    if (!user || (urlParams.get('email') && user?.email !== urlParams.get('email'))) {
      signInUser()
    }
  }, [user])

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Error: {error} </div>
  }

  return <CustomerPortal />
}
