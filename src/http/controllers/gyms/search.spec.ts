import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAuthenticateUser } from '@/utils/create-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a gyms by title', async () => {
    const { token } = await createAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia do Zé',
        description: 'A melhor academia do Brasil',
        phone: '123456789',
        latitude: -23.563099,
        longitude: -46.656571,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia do Fulano',
        description: 'A segunda melhor academia do Brasil',
        phone: '123456789',
        latitude: -23.563099,
        longitude: -46.656571,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Fulano',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Academia do Fulano',
      }),
    ])
  })
})
