const express = require('express');
const PORT = process.env.PORT || 3005;
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const passport = require("passport");
const initializePassport = require("./passportConfig");
const session = require("express-session");

const home = require('./routes/home')
const auth = require('./routes/auth')
const register = require('./routes/register')
const login = require('./routes/login')



const swaggerOptions = {
      swaggerDefinition: {
    myapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
        {
        url: 'http://localhost:3000',
        }
    ],
},
apis: ['./routes/*.js'],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// app.get('/', (req,res) => {
//     res.send('Hello World');
// })

initializePassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
   session({
        secret: process.env.SECRET_KEY,

         resave: false,

         saveUninitialized: true,
         cookie: {
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax'
         },
         
   })
)
app.use(passport.initialize());
app.use(passport.session());

app.use('/', home);
app.use('/api/auth', auth);
app.use('/api/register',register);
app.use('/api/login',login);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// module.exports = app;