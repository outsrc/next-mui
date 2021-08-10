import * as React from 'react'
import { NextPage } from 'next'
import { Container } from '@material-ui/core'
import { SubscribeHero } from 'components/SubscribeHero/SubscribeHero'
import { secureLoader, useAPIPost } from 'lib/api'
import useSWR from 'swr'
import { SubscriptionList, EmailSubscription } from 'components/SubscriptionList'

const URL = '/api/subscriptions'

const IndexPage: NextPage = () => {
  const subscribe = useAPIPost<void, { email: string }>(URL)
  const { data, revalidate } = useSWR<EmailSubscription[]>(URL, secureLoader())

  React.useEffect(() => {
    if (subscribe.posted) {
      revalidate()
      subscribe.reset()
    }
  }, [subscribe.posted])

  return (
    <Container maxWidth='lg'>
      <SubscribeHero onSubmit={email => subscribe.post({ email })} hasError={!!subscribe.error} />

      <SubscriptionList subscriptions={data || []} />
    </Container>
  )
}

export default IndexPage
