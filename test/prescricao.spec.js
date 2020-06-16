const chai = require('chai');
const { expect } = require('chai');
const server = require('../src/server');
const chaiHttp = require('chai-http');
const Prescricao = require('../src/app/models/prescricao');
const Medicamento = require('../src/app/models/medicamentos');
const should = chai.should();

chai.use(chaiHttp);

const prescricao = {
    crmMedico: 321,
    estadoCrm: "Goiás",
    cpfMedico: "999",
    nomeMedico: "Murray Rothbard",
    cpfPaciente: "555",
    nomePaciente: "Ludwig von Mises",
    dataNascimentoPaciente: null,
    medicamentos: [
        {
            descricao: "Hidroxicloroquina",
            quantidade: 1,
            dosagem: 1,
            frequenciaUso: "Diário"
        },
        {
            descricao: "dipirona",
            quantidade: 1,
            dosagem: 1,
            frequenciaUso: "Diário"
        }
    ]

};

describe('Prescricao', function () {
    before(function (next) {
        Prescricao.remove({}, function (err) {
        });
        Medicamento.remove({}, function (err) {
            next();
        });
    });

    it('deve registrar uma prescricao', async () => {
        const user = await chai.request(server).post('/medico/autenticacao/:email').send({ email: 'medico@zhealth.com', senha: '12345' });

        const res = await chai.request(server).post('/prescricao').set({ "Authorization": `Bearer ${user.body.token}` }).send(prescricao);
        expect(res).to.have.status(200);
    });

    it('deve consultar prescricoes medicas', async () => {
        const user = await chai.request(server).post('/medico/autenticacao/:email').send({ email: 'medico@zhealth.com', senha: '12345' });
        
        const res = await chai.request(server).get('/prescricao').set({ "Authorization": `Bearer ${user.body.token}` })
        res.body.should.be.a('Object');
    });

    /// APENAS QUEM CADASTROU PODE LER
    it('um médico só pode ver a própria prescrição cadastrada', async () => {
        const medico = {
            cpf: "00000",
            email: "medico2@zhealth.com",
            nome: "Rangel Silva",
            dataNascimento: null,
            crm: 12345,
            estadoCrm: "Distrito Federal",
            sexo: "Masculino",
            senha: "12345",
            confirmacaoSenha: "12345"
          };

        const user = await chai.request(server).post('/medico').send(medico);

        const res = await chai.request(server).get('/prescricao').set({ "Authorization": `Bearer ${user.body.token}` });
        
        expect(res.body.prescricoes.length).to.equals(0);   
        
    });
});