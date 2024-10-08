import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-erros'
import { makeRegisteruseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(
  request: FastifyRequest,
  reply: FastifyReply<any>,
) {
  const registerUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerUserSchema.parse(request.body)

  try {
    const registerUseCase = makeRegisteruseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err // TODO: improve error handling
  }

  return reply.status(201).send()
}
