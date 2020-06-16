# Definição

A aplicação consiste em uma API para cadastro de prescrições médicas. 
Possui as funcionalidades de cadastro de médicos, autenticação de médicos, cadastro de prescrições - sendo que há a possibilidade de cadastrar vários medicamentos com seus complementos - e listagem das prescrições.
As prescrições só podem ser visualizadas pelo médico que as cadastraram. Por esse motivo, há um controle de login, sendo possível realizar esse cadastro apenas com um token - JWT - válido.
Para se obter o token, é necessário efetuar o cadastro e login. 

## Tecnologias utilizadas

- Nodejs;
- Express;
- Mongoose;
- Bcrypt;
- JWT;
- Nodemon;
- Mocha; 
- chai;
- chai-http;
- MongoDB;
- Docker.


## Como Utilizar

- Com o Node.js devidamente instalado, execute o seguinte comando na raiz do projeto para que as dependências sejam instaladas:

```shell
npm install
```

- O banco de dados MongoDB deve estar instalado e rodando localmente. Uma maneira simples de fazer isso com Docker, é executando o seguinte comando:

```
docker run --name mongo-container -p 27017:27017 -d mongo
```

Para rodar a aplicação, basta executar:

```
npm start
```


## Explicação geral de uso

Após o projeto estar rodando, estará disponível na porta 3000. É necessário, primeiramente, efetuar o cadastro do médico, só então será possível efetuar a autenticação e obter o token.
Em posse do token, é necessário coloca-lo no Header da requisição - como Authorization - para que seja possível efetuar o cadastro e listagem das prescrições, como no seguinte exemplo:
```
Authorization Bearer token-fornecido
```

## Rotas

| Rota                   | Requisição | Função                                 | Body                                                                                                                                                                       | Auteticação por Token? |
| ---------------------- | ---- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| /medico                 | POST | Cadastro de médico                           | cpf(String), email(String), nome(String), dataNascimento(date), crm(Number), estadoCrm(String), sexo(String), senha(string), confirmacaoSenha(String)                                                                                                                                             | Não         |
| /medico/autenticacao/:email               | POST  | Efetua o login do médico          | email(String), senha(String)                                                                                                                                                                        | Sim          |
| /prescricao | POST  | Cadastra prescrições médicas      | crmMedico(Number), estadoCrm(String), cpfMedico(String), nomeMedico(String), cpfPaciente(String), nomePaciente(String), dataNascimentoPaciente(Date), medicamentos(Object)  { descricao(String), quantidade(Number), dosagem(Number), frequencia(String) }                                                                                                                                                                        | Sim          |
| /prescricao             | GET  | retorna todas as prescrições do médico que a cadastrou             | none                                                                                                                                                                       | Sim          |


### Insomnia

Na raiz do projeto existe um arquivo com nome 'insomnia.json'. É possível importar esse aquivo para o software Insomnia e realizar os testes manualmente. 
*Importante: não esquecer te adicionar o token, após o cadastro do médico, para realizar o cadastro e listagem das prescrições, caso contrário retornará erro de token*


## Cobertura de Testes

O teste cobre as seguintes funcionalidades:

- Cadastro de médicos - POST;
- Autenticação de médicos - POST;
- Cadastro de prescições médicas - POST;
- Listagem de prescrições médicas emitidas por um médico - médicos podem visualizar apenas as prescrições cadastradas por si próprios - GET;

Com o banco de dados rodando devidamente, execute o seguinte comando para rodar os testes:
```
npm test
```

*Importante: o banco, nesse momento, deve ser exclusivamente para teste, pois apagará os dados até então armazenados na collection referentes ao sistema*
