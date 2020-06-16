const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const MedicamentoSchema = new mongoose.Schema({

    descricao: {
        type: String,
        require: true,
    },
    quantidade: {
        type: Number,
        require: true,
    },
    dosagem: {
        type: Number,
        require: true,
    },
    frequenciaUso: {
        type: String,
        require: true,
    },
    prescricao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescricao',
        require: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medico',
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

});

const Medicamento = mongoose.model('Medicamento', MedicamentoSchema);

module.exports = Medicamento;

