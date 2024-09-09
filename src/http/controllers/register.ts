import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-erros'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerUserSchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send() // TODO: improve error handling
  }

  return reply.status(201).send()
}
