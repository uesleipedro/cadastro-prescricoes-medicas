const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const Medico = require('../models/medico');

exports.postMedico = async (req, res, next) => {
    const { email, senha, confirmacaoSenha } = req.body;

    try {
        if (await Medico.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já existe' });

        if (await senha != confirmacaoSenha)
            return res.status(400).send({ error: 'Senha e confirmação de senha são diferentes' })

        const user = await Medico.create(req.body);

        user.senha = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id }),
        });

    } catch (error) {
        return res.status(400).send({ error: 'Erro ao cadastrar' });
    }
};

exports.autenticacaoMedico = async (req, res, next) => {
    const { email, senha } = req.body;

    const user = await Medico.findOne({ email }).select('+senha');
    try {
        if (!user)
            return res.status(400).send({ error: 'Usuário não encontrado' });

        if (!await bcrypt.compare(senha, user.senha))
            return res.status(400).send({ error: 'Usuário ou senha incorretos' });

        user.senha = undefined;
        res.send({
            user,
            token: generateToken({ id: user.id }),
        });
    } catch (error) {
        return res.status(400).send({ error: 'Erro na autenticação' });
    }
};

function generateToken(params = {}) {
    return jwt.sign({ params }, authConfig.secret, {
        expiresIn: 86400, //1 dia
    });
}