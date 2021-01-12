const { checkSchema } = require('express-validator'); 

module.exports = {
    editAction: checkSchema({
        token: {
            notEmpty: true
        },
        name: {
            optional:true,
            isLength:{
                options: {min: 3}
            },
            errorMessage: 'Nome deve ter pelo menos 3 caracteres'
        },
        email: {
            optional:true,
            isEmail: true,
            toLowerCase: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            optional:true,
            isLength:{
                options:{min: 8}
            }, 
            errorMessage: 'A senha deve conter pelo menos 8 caracteres'
        },
        state: {
            optional:true,
            notEmpty: true,
            errorMessage: 'Estado Não preenchido'
        }
    })
}