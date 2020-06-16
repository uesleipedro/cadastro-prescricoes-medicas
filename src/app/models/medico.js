const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const MedicoSchema = new mongoose.Schema({

    cpf: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    nome: {
        type: String,
        require: true,
    },
    dataNascimento: {
        type: Date,
        require: false,
    },
    crm: {
        type: Number,
        require: true,
    },
    estadoCrm: {
        type: String,
        require: true,
    },
    sexo: {
        type: String,
        require: true,
    },
    senha: {
        type: String,
        require: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

});

MedicoSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const Medico = mongoose.model('Medico', MedicoSchema);

module.exports = Medico;

