const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const { cpf, cnpj } = require("cpf-cnpj-validator");

const truncate = require("./truncate");

describe("CONDOMINIUM", () => {
  let managerId = "";
  let generatedCpf = cpf.generate();
  let generatedCnpj = cnpj.generate();
  let condominiumId = "";

  beforeAll(async (done) => {
    await truncate(connection.models);
    let response = await request(app).post("/managers").send({
      name: "Rafael Leme",
      cpf: generatedCpf,
      email: "rafan@gmail.com",
      celphone: "5519998208013",
      password: "123456",
    });
    managerId = response.body.id;
    done();
  });

  afterAll(() => {
    connection.close();
  });

  it("should be able to create a new condominium", async () => {
    let response = await request(app)
      .post("/condominiums")
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
          uf: "SP",
        },
      });
    expect(response.ok).toBe(true);
    expect(response.body).toHaveProperty("id");
    expect(response.body.address).toHaveProperty("id");
    expect(response.body).toHaveProperty("ticket");

    condominiumId = response.body.id;
  });

  it("should not be able to create a condominium with existing cnpj", async () => {
    response = await request(app)
      .post("/condominiums")
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
          uf: "SP",
        },
      });

    expect(response.ok).toBe(false);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("cnpj already exists");
  });

  it("should not be able to create a condominium with existing address", async () => {
    response = await request(app)
      .post("/condominiums")
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
          uf: "SP",
        },
      });

    expect(response.ok).toBe(false);
    expect(response.body).toHaveProperty("error");
  });

  it("should be able to add a manager into a condominium", async () => {
    let response = await request(app).post("/managers").send({
      name: "Rafael Leme",
      cpf: cpf.generate(),
      email: "rafan20@gmail.com",
      celphone: "5519998208113",
      password: "123456",
    });

    newManagerId = response.body.id;

    response = await request(app)
      .post(`/condominiums/${condominiumId}/managers/${newManagerId}`)
      .set({ Authorization: "Bearer " + managerId })
      .send({
        name: "Bela Vista",
        cnpj: cnpj.generate(),
        address: {
          zipcode: "06600012",
          street: "Rua Carmine Gragnano",
          number: 664,
          neighborhood: "Centro",
          city: "Jandira",
          uf: "SP",
        },
      });

    expect(response.ok).toBe(true);
  });

  it("should not be able to add a manager into a condominium that you do not manage", async () => {
    let response = await request(app).post("/managers").send({
      name: "Rafael Leme",
      cpf: cpf.generate(),
      email: "rafan11@gmail.com",
      celphone: "5519998208113",
      password: "123456",
    });

    const newManagerId = response.body.id;

    response = await request(app)
      .post("/condominiums")
      .set({ Authorization: "Bearer " + newManagerId })
      .send({
        name: "Bela Vista",
        cnpj: cnpj.generate(),
        address: {
          zipcode: "06600013",
          street: "Rua Carmine",
          number: 667,
          neighborhood: "Centro",
          city: "Jandira",
          uf: "SP",
        },
      });

    const newCondominiumId = response.body.id;

    response = await request(app)
      .post(`/condominiums/${newCondominiumId}/managers/${newManagerId}`)
      .set({ Authorization: "Bearer " + managerId })
      .send({
        name: "Bela Vista",
        cnpj: cnpj.generate(),
        address: {
          zipcode: "06600014",
          street: "Rua Carmine Gragnano",
          number: 664,
          neighborhood: "Centro",
          city: "Jandira",
          uf: "SP",
        },
      });
    expect(response.ok).toBe(false);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("unauthorized to this condominium");
  });

  it("should not be able to add a manager into a condominium without being principal", async () => {
    let response = await request(app).post("/managers").send({
      name: "Rafael Leme",
      cpf: cpf.generate(),
      email: "rafan19@gmail.com",
      celphone: "5519998208113",
      password: "123456",
    });

    const newManagerId = response.body.id;

    response = await request(app)
      .post("/condominiums")
      .set({ Authorization: "Bearer " + newManagerId })
      .send({
        name: "Bela Vista",
        cnpj: cnpj.generate(),
        address: {
          zipcode: "06600021",
          street: "Rua Carmine",
          number: 667,
          neighborhood: "Centro",
          city: "Jandira",
          uf: "SP",
        },
      });

    const newCondominiumId = response.body.id;

    response = await request(app)
      .post(`/condominiums/${newCondominiumId}/managers/${newManagerId}`)
      .set({ Authorization: "Bearer " + managerId })
      .send({
        name: "Bela Vista",
        cnpj: cnpj.generate(),
        address: {
          zipcode: "06600029",
          street: "Rua Carmine Gragnano",
          number: 664,
          neighborhood: "Centro",
          city: "Jandira",
          uf: "SP",
        },
      });
    expect(response.ok).toBe(false);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("unauthorized to this condominium");
  });

  it("should be able to block a manager in a condominium", async () => {
    //cria manager 1
    let response = await request(app).post("/managers").send({
      name: "Rafael Leme",
      cpf: cpf.generate(),
      email: "rafa1234@gmail.com",
      celphone: "5519998208113",
      password: "123456",
    });

    const newManagerId = response.body.id;

    //manager 1 cria condominium 1
    response = await request(app)
      .post("/condominiums")
      .set({ Authorization: "Bearer " + newManagerId })
      .send({
        name: "Bela Vista",
        cnpj: cnpj.generate(),
        address: {
          zipcode: "06600029",
          street: "Rua Carmine",
          number: 667,
          neighborhood: "Centro",
          city: "Jandira",
          uf: "SP",
        },
      });
    const newCondominiumId = response.body.id;

    //manager 1 adiciona manager global ao condominio 1
    response = await request(app)
      .post(`/condominiums/${newCondominiumId}/managers/${managerId}`)
      .set({ Authorization: "Bearer " + newManagerId })
      .send();

    //manager 1 bloqueia manager global no condominio 1
    response = await request(app)
      .patch(`/condominiums/${newCondominiumId}/managers/${managerId}`)
      .set({ Authorization: "Bearer " + newManagerId })
      .send();

    expect(response.ok).toBe(true);
    expect(response.status).toBe(204);
  });
});
