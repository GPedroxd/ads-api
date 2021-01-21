const { checkSchema } = require('express-validator');

module.exports = {
    add: checkSchema({
        token: {
            notEmpty: true
        },
        category: {
            notEmpty: true,
            errorMessage: 'Categoria não encontrada!'
        },
        title: {
            isLength:{
                options:{
                    min: 10
                }
            },
            errorMessage: 'O titulo deve ter pelo menos 10 caracters!'
        },
        price: {
            notEmpty: true,
            isFloat:true,
            errorMessage: 'Preço não enviado e/ou invalido!'
        },
        priceNegotiable: {
            notEmpty: true,
            isBoolean: true,
            errorMessage: 'Opção invalida'
        },
        description : {
            isLength:{
                options:{
                    min: 20
                }
            },
            errorMessage: 'A descrição dever ter pelo menos 20 caracteres'
        },
        state :{
            notEmpty: true,
            errorMessage: 'Estado não encontrado!'
        }
    }),
    getItem : checkSchema({
        idAd: {
            notEmpty: true,
            errorMessage: 'anuncio não encontrado'
        }
    }),
    edit: checkSchema({
        _id: {
            notEmpty: true,
            errorMessage: 'anuncio não encontrado'
        },
        title:{
            optional: true,
            isLength:{
                options:{
                    min: 10
                }
            },
            errorMessage: 'O titulo deve ter pelo menos 10 caracters!'
        },
        price: {
            optional: true,
            notEmpty: true,
            isFloat:true,
            errorMessage: 'Preço não enviado e/ou invalido!'
        },
        priceNegotiable:{
            optional: true,
            isBoolean: true,
            errorMessage: 'Opção invalida'
        },
        description:{
            optional: true,
            isLength:{
                options: {
                    min: 20
                }
            },
            errorMessage: 'A descrição dever ter pelo menos 20 caracteres'
        }
    })
}