const config = require('./lib/config/config.js');

const express = require('express');
const app = express();

const AuthorizationRouter = require('./auth/routes');
const UsersRouter = require('./users/routes');

swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Authentication API documentation",
        version: "0.1.0",
        description:
          "This is a auth API application made with Express and documented with Swagger",
      },
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
    },
    apis: ["./auth/routes.js"],
  };

  const specs = swaggerJsdoc(options);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
    })
  );

AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});