import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(
  request: FastifyRequest,
  reply: FastifyReply<any>,
) {
  try {
    await request.jwtVerify()
  } catch (error) {
    reply.status(401).send({
      message: 'Unauthorized',
    })
  }
}
