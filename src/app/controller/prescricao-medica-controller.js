const Prescricao = require('../models/prescricao');
const Medicamento = require('../models/medicamentos');

exports.postPrescricao = async (req, res, next) => {
    try {

        const { 
            crmMedico, 
            estadoCrm, 
            cpfMedico, 
            nomeMedico, 
            cpfPaciente, 
            nomePaciente, 
            dataNascimentoPaciente, 
            medicamentos } = req.body;

        const prescricao = await Prescricao.create({
            crmMedico, 
            estadoCrm, 
            cpfMedico, 
            nomeMedico, 
            cpfPaciente, 
            nomePaciente, 
            dataNascimentoPaciente,
            user: req.userId});
        
        await Promise.all(medicamentos.map(async medicamento => {
            const prescricaoMedicamentos = new Medicamento({ ...medicamento, prescricao: prescricao._id });

            await prescricaoMedicamentos.save();

            prescricao.medicamentos.push(prescricaoMedicamentos);
        })); 
        await prescricao.save();

        return res.send({ prescricao });

    } catch (error) {
        return res.status(400).send({ error: 'Erro ao cadastrar as Prescrições' });
    }
};

exports.getPrescricao = async (req, res) => {

    try {
        const prescricoes = await Prescricao.find({ user: req.userId }).populate(['user', 'medicamentos']);

        return res.status(200).send({ prescricoes });
    } catch (error) {
        return res.status(400).send({ error: 'Erro ao buscar as Prescrições' });
    }
};