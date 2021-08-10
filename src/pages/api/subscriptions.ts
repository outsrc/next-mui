import { isValidEmail } from 'lib/email'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

// THIS IS IN MEMORY STATE
// will reset on every app restart
const subs = []

export default nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    return res.json(subs)
  })
  .post(async (req, res) => {
    if (!isValidEmail(req.body.email)) {
      return res.status(400).json({ error: 'invalid-email' })
    }

    subs.push({ email: req.body.email, updated: Date.now() })
    return res.status(204).end()
  })
