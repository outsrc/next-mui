import { isValidEmail } from 'lib/email'

describe('isValidEmail', () => {
  it('valid email', () => {
    expect(isValidEmail('johndoe@gmail.com')).toBe(true)
  })

  it('invalid email', () => {
    expect(isValidEmail('johndoegmail.com')).toBe(false)
  })
})
