const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const { cpf, cnpj } = require("cpf-cnpj-validator");

const truncate = require("./truncate");

describe("LIVING", () => {
  let generatedCpf = cpf.generate();
  beforeAll(async (done) => {
    await truncate(connection.models);
    done();
  });

  afterAll(() => {
    connection.close();
  });

  it("should be able to add a new member into a condominium and aprove", async () => {
    let response = await request(app).post("/managers").send({
      name: "Rafael Leme",
      cpf: generatedCpf,
      email: "rafanleme@gmail.com",
      cellphone: "5519998208013",
      password: "123456",
    });

    const managerId = response.body.id;

    response = await request(app)
      .post("/condominiums")
      .set({ Authorization: "Bearer " + managerId })
      .send({
        name: "Bela Vista",
        cnpj: cnpj.generate(),
        address: {
          zipcode: "06600099",
          street: "Rua Carmine Gragnano",
          number: 664,
          neighborhood: "Centro",
          city: "Jandira",
          uf: "SP",
        },
      });

    const condominiumTicket = response.body.ticket;
    const condominiumId = response.body.id;

    response = await request(app).post("/members").send({
      name: "Rafael Leme",
      cpf: cpf.generate(),
      email: "rafanleme99@gmail.com",
      cellphone: "5519998208013",
      password: "123456",
    });

    const memberId = response.body.id;

    response = await request(app)
      .post(`/condominiums/${condominiumTicket}/members`)
      .set({ Authorization: "Bearer " + memberId })
      .send({
        apartment_block: "4",
        apartment_number: "44",
      });

    expect(response.ok).toBe(true);
    expect(response.status).toBe(204);

    response = await request(app)
      .patch(`/condominiums/${condominiumId}/members/${memberId}`)
      .set({ Authorization: "Bearer " + managerId })
      .send({
        aproved: true,
      });

    expect(response.ok).toBe(true);
    expect(response.status).toBe(204);
  });
});
