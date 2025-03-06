import { app, server } from '../src/main';
import request from 'supertest';
import { createJWT, deleteAll, insertCategories, insertPosts, insertUsers } from './helpers/posts.helper';
import { jwtKey } from '../src/config/envs';

const api = request(app)

describe('Posts endpoint', function () {
  beforeAll(async () => {
    await deleteAll()
    await insertCategories()
    await insertUsers()
    await insertPosts()
  })
  it('Debería devolver los 10 primeros posts', async () => {
    const response = await api.get('/api/posts')
    expect(response.header['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.info.limit)
    expect(response.body.info.page)
  })

  it('Debería devoler los 5 primeros posts', async () => {
    const pagination = {
      limit: 5,
      page: 1
    }

    const response = await api.get(`/api/posts?limit=${pagination.limit}&&page=${pagination.page}`)
    expect(response.header['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.info.limit).toBe(pagination.limit)
    expect(response.body.info.page).toBe(pagination.page)
    expect(response.body.posts.length).toBe(5)
  })

  it('Debería devolver un posts con el id dado', async () => {
    const postId = 5
    const response = await api.get(`/api/posts/${postId}`)
    expect(response.header['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(postId)
  })

  it('Cuando se busca el id de un post inexistente, se genera un error', async () => {
    const postId = 456
    const response = await api.get(`/api/posts/${postId}`)
    expect(response.header['content-type']).toContain('application/json')
    expect(response.status).toBe(404)
  })

  it('Debería devolver los comentarios de un posts', async () => {
    const postId = 5
    const response = await api.get(`/api/posts/comments/${postId}`)
    expect(response.header['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
  })

  it('Cuando el usuario quiere registrar un post sin autenticación, debería devolver un error autenticación', async () => {
    const data = {
      title: 'Un título largo',
      content: 'Contenido de prueba original',
      categorieId: 1
    }

    const response = await api.post(`/api/posts`).send(data)
    expect(response.status).toBe(401)
    //expect(response.body.id).toBe(postId)
  })

  it('Debería validar la estructura correcta de un post', async () => {
    const data = {
      content: 'Contenido de prueba original',
      categorieId: 1
    }

    const response = await api.post(`/api/posts`).send(data)
    console.log('status desde testing', response.status)
    expect(response.status).toBe(400)
  })

  it('Cuando envía un post con una categoría inexistente, se marca error', async () => {
    const data = {
      title: 'Un título largo',
      content: 'Contenido de prueba original',
      categorieId: 67
    }
    const TOKEN = createJWT(jwtKey)
    const response = await api.post(`/api/posts`).send(data).set('Authorization', `Bearer ${TOKEN}`)
    expect(response.status).toBe(404)
  })

  it('Debería registrarse un post en la BD', async () => {
    const data = {
      title: 'Un título largo',
      content: 'Contenido de prueba original',
      categorieId: 1
    }
    const TOKEN = createJWT(jwtKey)
    const response = await api.post(`/api/posts`).send(data).set('Authorization', `Bearer ${TOKEN}`)
    expect(response.status).toBe(200)
  })
})

afterAll(() => {
  server.close()
})