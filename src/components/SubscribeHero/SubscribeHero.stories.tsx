import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { SubscribeHero } from './SubscribeHero'
import { action } from '@storybook/addon-actions'
import { Container } from '@material-ui/core'

export default {
  title: 'Components/SubscribeHero',
  component: SubscribeHero,
  decorators: [
    Story => (
      <Container maxWidth='lg'>
        <Story />
      </Container>
    )
  ]
} as ComponentMeta<typeof SubscribeHero>

export const emailInput = () => <SubscribeHero onSubmit={action('onSubmit')} />

export const subscribing = () => <SubscribeHero onSubmit={action('onSubmit')} isSubscribing />

export const withError = () => <SubscribeHero onSubmit={action('onSubmit')} hasError />
