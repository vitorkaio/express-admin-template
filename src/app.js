require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import mongoose from 'mongoose'
import PerfisRoutes from './routes/perfis/perfil.routes'
import UserRoutes from './routes/user/user.routes'
import AuthRoutes from './routes/auth/auth.routes'

const app = express()

// middleware para log.
app.use(morgan('dev'))

app.use(session({
  'secret': '343ji43j4n3jn4jk3n',
  resave: false,
  saveUninitialized: true,
}))

// app.use(bodyParser.urlencoded({ extended: false }));  for <form>
app.use(bodyParser.json())

// Set cors
app.use(cors())

// Connect mongoose
mongoose.connect(`${process.env.APP_DB_HOST}:${process.env.APP_DB_PORT}/${process.env.APP_DB_NAME}`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(_ => console.log('mongoconnect')).catch(err => {console.log(err)})


const close = () => {
  mongoose.connection.close()
}

// Routes
app.use('/auth', AuthRoutes)
app.use('/perfis', PerfisRoutes)
app.use('/users', UserRoutes)

// middleware para erros.
app.use((req, res, next) => {
  const error = new Error('Not Found!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message
  })
});

// middleware para erros.
// const erros: Fails = new Fails()
// app.use(erros.errorsStatus)

const port = process.env.APP_PORT
app.listen(port, () => {
  console.log('App listening on port ' + port)
})