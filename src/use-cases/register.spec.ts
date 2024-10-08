import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-erros'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase
describe('Register', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe4@gmail.com',
      password: 'password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user pssword upon registration', async () => {
    const { user } = await sut.execute({
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
    const email = 'johndoe@gmail.com'
    await sut.execute({
      name: 'John Doe',
      email,
      password: 'password',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
