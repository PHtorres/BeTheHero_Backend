const express = require('express');
const SessionController = require('./controllers/SessionController');
const OngsController = require('./controllers/OngsController');
const IncidentController = require('./controllers/IncidentController');
const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngsController.ObterOngs);
routes.post('/ongs', OngsController.CadastarOng);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.get('/incidents/ong', IncidentController.getIncidentByOng);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;