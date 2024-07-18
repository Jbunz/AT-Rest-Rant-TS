import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import placesRouter from './controllers/places';
import usersRouter from './controllers/users';
import authRouter from './controllers/authentication';

dotenv.config();

const app = express();

// Express Settings
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to handle cookies and other credentials
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Controllers & Routes
app.use('/places', placesRouter);
app.use('/users', usersRouter);
app.use('/authentication', authRouter);

// Listen for Connections
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
