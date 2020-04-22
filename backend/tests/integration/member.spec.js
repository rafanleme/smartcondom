const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database')
const { cpf } = require('cpf-cnpj-validator')

const truncate = require('./truncate')

describe('MEMBER', () => {
  let generatedCpf = cpf.generate()
  beforeAll(async (done) => {
    await truncate(connection.models)
    done()
  })

  afterAll(() => {
    connection.close()
  })

  it('should be able to create a new member', async () => {
    let response = await request(app)
      .post('/members')
      .send({
        name: "Rafael Leme",
        cpf: generatedCpf,
        email: "rafanleme@gmail.com",
        celular: "5519998208013",
        password: "123456"
      })
    expect(response.ok).toBe(true)
    expect(response.body).toHaveProperty('id');
  })

  it('should not be able to create a member with existing cpf', async () => {
    response = await request(app)
      .post('/members')
      .send({
        name: "Rafael Leme",
        cpf: generatedCpf,
        email: "rafanleme@gmail.com",
        celular: "5519998208013",
        password: "123456"
      })

    expect(response.ok).toBe(false)
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toEqual('cpf already exists')
  })

  it('should not be able to create a member with existing email', async () => {
    response = await request(app)
      .post('/members')
      .send({
        name: "Rafael Leme",
        cpf: cpf.generate(),
        email: "rafanleme@gmail.com",
        celular: "5519998208013",
        password: "123456"
      })

    expect(response.ok).toBe(false)
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toEqual('email already exists')
  })
})