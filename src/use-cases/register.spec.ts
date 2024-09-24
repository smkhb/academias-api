import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register', () => {
  it('should hash user pssword upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findbyEmail() {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe4@gmail.com',
      password: 'password',
    })

    const isPasswordCorrectluHashed = await compare(
      'password',
      user.password_hash,
    )

    expect(isPasswordCorrectluHashed).toBe(true)
  })
})
