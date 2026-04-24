import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'jobconnect-api' }));

// Feature routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found', path: req.path }));

// Central error handler (must be last)
app.use(errorHandler);

export default app;
