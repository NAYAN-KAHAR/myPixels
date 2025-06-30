import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import authRoute from './Routes/authRoute.js';
import fileRoute from './Routes/fileRoute.js';
import mongoose from './config/db.js';
import verifyToken from './middleware/token.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';


const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://fantastic-souffle-ce28e8.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));



app.use(session({
    secret: 'your_secret_key', // Replace with a proper secret
    resave: false, // Don't force session to be saved back to store if not modified
    saveUninitialized: true, // Save sessions even if they are unmodified
    cookie: {
        httpOnly: true, // Make cookies HTTP only (cannot be accessed via JS)
        secure: false, // Use true only in production with HTTPS enabled
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));


app.use(express.json());
app.use(helmet())
app.use(cookieParser());

const port = 3000;

mongoose.connection.on('error', (err) => {
    console.log('Database conncetion failed', err)
})

mongoose.connection.on('open', () => {
    console.log('Database connected')
})


app.use('/api', authRoute);
app.use('/api/file', fileRoute)

app.listen(port, () => { console.log('server running on 3000 port') })
