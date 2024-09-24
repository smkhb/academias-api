import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-erros'

describe('Register', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe4@gmail.com',
      password: 'password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user pssword upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

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

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@gmail.com'
    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: 'password',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
