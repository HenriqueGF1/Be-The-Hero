const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
// const { Joi } = require('./database/connection');

const OngController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController.js');
const ProfileController = require('./controller/ProfileController.js');
const SessionController = require('./controller/SessionController.js');
const { join } = require('./database/connection');

const routes = express.Router();

routes.post("/session", SessionController.create);

routes.get("/ongs", OngController.index);
// routes.post("/ongs", OngController.create);

routes.post("/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsApp: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().length(2).required(),
    })
}), OngController.create);

routes.get("/profile", ProfileController.index);

// routes.get("/profile", celebrate({
//     [Segments.HEADERS]: Joi.object({
//         Authorization: Joi.string().required(),
//     }).unknown()
// }), ProfileController.index);

routes.get("/incidents", IncidentController.index);

// routes.get("/incidents", celebrate({
//     [Segments.QUERY]: Joi.object().keys({
//         page: Joi.number().integer(),
//     })
// }), IncidentController.index);

routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

// routes.delete("/incidents/:id", celebrate({
//     [Segments.PARAMS]: Joi.object().keys({
//         id: Joi.number().integer().required(),
//     })
// }), IncidentController.delete);


module.exports = routes;