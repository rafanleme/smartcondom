const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database')
const { cpf, cnpj } = require('cpf-cnpj-validator')

const truncate = require('./truncate')

describe('CONDOMINIUM', () => {
  let managerId = ''
  let generatedCpf = cpf.generate()
  let generatedCnpj = cnpj.generate()
  beforeAll(async (done) => {
    await truncate(connection.models)
    let response = await request(app)
      .post('/managers')
      .send({
        name: "Rafael Leme",
        cpf: generatedCpf,
        email: "rafanleme@gmail.com",
        celular: "19998208013"
      })
    managerId = response.body.id
    console.log(managerId)
    done()
  })

  afterAll(() => {
    connection.close()
  })

  it('should be able to create a new condominium', async () => {
    let response = await request(app)
      .post('/condominiums')
      .set({ Authorization: "Bearer " + managerId })
      .send({
        name: "Bela Vista",
        cnpj: generatedCnpj,
        address: {
          zipcode: "06600010",
          street: "Rua Carmine Gragnano",
          number: 664,
          neighborhood: "Centro",
          city: "Jandira",
          uf: "SP"
        }
      })
    expect(response.ok).toBe(true)
    expect(response.body).toHaveProperty('id');
    expect(response.body.address).toHaveProperty('id');
  })

  it('should not be able to create a condominium with existing cnpj', async () => {
    response = await request(app)
      .post('/condominiums')
      .set({ Authorization: "Bearer " + managerId })
      .send({
        name: "Bela Vista",
        cnpj: generatedCnpj,
        address: {
          zipcode: "06600010",
          street: "Rua Carmine Gragnano",
          number: 664,
          neighborhood: "Centro",
          city: "Jandira",
          uf: "SP"
        }
      })

    expect(response.ok).toBe(false)
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toEqual('cnpj already exists')
  })

  it('should not be able to create a condominium with existing address', async () => {
    response = await request(app)
      .post('/condominiums')
      .set({ Authorization: "Bearer " + managerId })
      .send({
        name: "Bela Vista",
        cnpj: cnpj.generate(),
        address: {
          zipcode: "06600010",
          street: "Rua Carmine Gragnano",
          number: 664,
          neighborhood: "Centro",
          city: "Jandira",
          uf: "SP"
        }
      })

    expect(response.ok).toBe(false)
    expect(response.body).toHaveProperty('error');
  })

})