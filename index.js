const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const passport = require("passport");
const initializePassport = require("./passportConfig");
const session = require("express-session");
const path = require("path");
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const home = require('./routes/home')
const auth = require('./routes/auth')
const register = require('./routes/register')
const login = require('./routes/login')
const { pool } = require("./database/dbConfig");



const PORT = process.env.PORT || 3005;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3005';
const API_URL = process.env.API_URL ;
// app.get('/', (req,res) => {
//     res.send('Hello World');
// })

initializePassport(passport);

app.use(helmet({
    contentSecurityPolicy: NODE_ENV === 'production' ? undefined : false
}));
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
const corsOptions = {
  origin: NODE_ENV === 'production'
     ? [FRONTEND_URL]
     :['http://localhost:3000', 'http://localhost:3005'],
  credentials: NODE_ENV !== 'production' ,
  methods: ['GET','POST','PUT','DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']  
};
app.use(cors(corsOptions));
// app.options('/*', cors(corsOptions));

// app.use(cors({
//     origin: '*',
//     methods: ['GET','POST','PUT','DELETE','OPTIONS'],
//     allwedHeaders: ['Content-Type', 'Authorization']
// }));
// app.options('*', cors());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'));

app.use(passport.initialize());
app.use(passport.session());




const swaggerOptions = {
      swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Jamii Hospital API',
      version: '1.0.0',
      description: 'Jamii Hospital API documentation',
      contact: {
        name: 'API Support',
        email: 'jamiiHospital@examplegmail.com'
      }
    },
    servers: [
        {
        url: `${API_URL}`,
        description: `${NODE_ENV} server`
        }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
},
apis: ['./routes/*.js'],
}
if ( NODE_ENV !== 'production' || process.env.ENABLE_SWAGGER === 'true') {
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  swaggerOptions: {
    persistAuthorization:true,
  }
}));
}

// // Make flash messages available to all views
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });



app.use('/', home);
app.use('/api/auth', auth);
app.use('/api/register',register);
app.use('/api/login',login);


app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: NODE_ENV 
    });
});

app.use( (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    const errorResponse = NODE_ENV === 'production'
          ? {error: 'Something went wrong!'}
          : {error: err.message, stack: err.stack};

          res.status(err.status || 500).json(errorResponse);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received.Shutting dow gracefully.');
  process.exit(0);
})


app.listen(PORT, () => {
    console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
    if(NODE_ENV !== 'production') {
      console.log(`API Documentation: ${API_URL}/api-docs`);
    }
})

// module.exports = app;