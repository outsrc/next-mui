import {
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  withStyles
} from '@material-ui/core'
import * as React from 'react'

export interface EmailSubscription {
  email: string
  updated: number
}

export interface SubscriptionListProps {
  subscriptions: EmailSubscription[]
}

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  })
)(TableRow)

export const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align='right'>Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptions.map(row => (
            <StyledTableRow key={row.email}>
              <TableCell component='th' scope='row'>
                {row.email}
              </TableCell>
              <TableCell align='right'>{new Date(row.updated).toISOString()}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
