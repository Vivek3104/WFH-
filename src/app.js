import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { requestLogger } from './middlewares/loggerMiddleware.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({ message: 'WFH Job Platform API' });
});

app.use('/api', routes);

app.use(errorHandler);

export default app;
