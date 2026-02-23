import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import { requestLogger } from './middlewares/loggerMiddleware.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Use absolute path for static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.get('/', (req, res) => {
  res.json({ message: 'WFH Job Platform API' });
});

app.use('/api', routes);

app.use(errorHandler);

export default app;
