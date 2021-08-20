import { isValidEmail } from 'lib/email'
import { withMongo } from 'lib/mongodb'
import { Db } from 'mongodb'
import { nanoid } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

interface User {
  id: string
  email: string
  created: string
  updated: string
}

export default nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const registrations = await withMongo(async (db: Db) => {
      const collection = db.collection<User>('registrations')
      return await collection.find().toArray()
    })
    return res.json(registrations)
  })
  .post(async (req, res) => {
    if (!isValidEmail(req.body.email)) {
      return res.status(400).json({ error: 'invalid-email' })
    }

    await withMongo(async (db: Db) => {
      const collection = db.collection<User>('registrations')
      await collection.insertOne({
        id: nanoid(),
        email: req.body.email,
        created: new Date().toISOString(),
        updated: new Date().toISOString()
      })
    })

    return res.status(204).end()
  })
