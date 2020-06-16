const chai = require('chai');
const { expect } = require('chai');
const server = require('../src/server');
const chaiHttp = require('chai-http');
const Medico = require('../src/app/models/medico');
const should = chai.should();

chai.use(chaiHttp);

const medico = {
  cpf: "00000",
  email: "medico@zhealth.com",
  nome: "Ueslei Pedro",
  dataNascimento: null,
  crm: 12345,
  estadoCrm: "Distrito Federal",
  sexo: "Masculino",
  senha: "12345",
  confirmacaoSenha: "12345"
};

describe('Medico', function () {
  before(function (next) {
    Medico.remove({}, function (err) {
      next();
    });
  });

  it('deve registrar um médico', async () => {
    const res = await chai.request(server).post('/medico').send(medico);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('object');
    expect(res.body.user.cpf).to.be.equals('00000');
    res.body.should.have.property('token');
  });

  it('não deve registrar um médico existente', async () => {
    const res = await chai.request(server).post('/medico').send(medico);
    expect(res).to.have.status(400);
  });

  it('não deve registrar um médico com dados faltantes', async () => {
    const res = await chai.request(server).post('/medico').send({
      cpf: "00000",
      email: "medico@zhealth.com",
      nome: "Ueslei Pedro",
      dataNascimento: null,
      crm: 12345,
      estadoCrm: "Distrito Federal",
      sexo: "Masculino",
      senha: "12345"
    });

    expect(res).to.have.status(400);
  });

  it('deve realizar login', async () => {
    const res = await chai.request(server).post('/medico/autenticacao/:email').send({email: 'medico@zhealth.com', senha: '12345'});
    res.body.should.be.a('Object');
    res.body.should.have.property('user');
    res.body.should.have.property('token');
  });


});