import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { SubscriptionList } from './SubscriptionList'
import { Container } from '@material-ui/core'

export default {
  title: 'Components/SubscriptionList',
  component: SubscriptionList,
  decorators: [
    Story => (
      <Container maxWidth='lg'>
        <Story />
      </Container>
    )
  ]
} as ComponentMeta<typeof SubscriptionList>

export const list = () => (
  <SubscriptionList
    subscriptions={[
      { email: 'johndoe@gmail.com', updated: 1628613368790 },
      { email: 'marydoe@gmail.com', updated: 1628613368790 },
      { email: 'carlos@yahoo.com', updated: 1628613368790 }
    ]}
  />
)
