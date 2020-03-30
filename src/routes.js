const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const SessionController = require('./controllers/SessionController');
const OngsController = require('./controllers/OngsController');
const IncidentController = require('./controllers/IncidentController');
const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngsController.ObterOngs);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngsController.CadastarOng);

routes.post('/incidents', IncidentController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index);

routes.get('/incidents/ong', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentController.getIncidentByOng);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentController.delete);

module.exports = routes;