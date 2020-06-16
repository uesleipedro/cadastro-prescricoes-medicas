const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const PrescricaoSchema = new mongoose.Schema({

    crmMedico: {
        type: Number,
        require: true,
    },
    estadoCrm: {
        type: String,
        require: true,
    },
    cpfMedico: {
        type: String,
        require: true,
    },
    nomeMedico: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medico',
        require: true,
    },
    cpfPaciente: {
        type: String,
        require: true,
    },
    nomePaciente: {
        type: String,
        require: true,
    },
    dataNascimentoPaciente: {
        type: Date,
        require: false,
    },
    medicamentos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicamento',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }

});

const Prescricao = mongoose.model('Prescricao', PrescricaoSchema);

module.exports = Prescricao;

