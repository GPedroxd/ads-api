const { checkSchema } = require('express-validator'); 

module.exports = {
    signup: checkSchema({
        name: {
            isLength:{
                options: {min: 3}
            },
            errorMessage: 'Nome deve ter pelo menos 3 caracteres'
        },
        email: {
            isEmail: true,
            toLowerCase: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength:{
                options:{min: 8}
            }, 
            errorMessage: 'A senha deve conter pelo menos 8 caracteres'
        },
        state: {
            notEmpty: true,
            errorMessage: 'Estado Não preenchido'
        }
    }),
    signin: checkSchema({
        email: {
            isEmail: true,
            toLowerCase: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength:{
                options:{min: 8}
            }, 
            errorMessage: 'A senha deve conter pelo menos 8 caracteres'
        }
    })

}