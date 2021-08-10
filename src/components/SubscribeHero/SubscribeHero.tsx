import * as React from 'react'
import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

export interface SubscribeHeroProps {
  onSubmit: (email: string) => void
  isSubscribing?: boolean
  hasError?: boolean
}

export const SubscribeHero: React.FC<SubscribeHeroProps> = ({
  onSubmit,
  isSubscribing,
  hasError
}) => {
  const [email, setEmail] = React.useState('')

  return (
    <Box py={3}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant='h2'>My SaaS App</Typography>
          <Typography variant='subtitle1'>This is the subtitle</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box display='flex' flexDirection='column' position='relative'>
            {isSubscribing && (
              <Box
                position='absolute'
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={1}
                style={{ backgroundColor: 'white', opacity: 0.5 }}
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                <CircularProgress />
              </Box>
            )}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  error={hasError}
                  onChange={ev => setEmail(ev.target.value)}
                  size='small'
                  fullWidth
                  variant='outlined'
                  label='Your Email'
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={() => onSubmit(email)}
                  fullWidth
                  variant='contained'
                  color='primary'
                  endIcon={<MailOutlineIcon />}
                >
                  Subscribe for updates
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
