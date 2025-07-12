import express from 'express';
import { RegisterRoutes } from './route/routes';
import { setupSwagger } from './config/swagger';

const app = express();
const PORT = 3090;

app.use(express.json());

const apiRouter = express.Router();
RegisterRoutes(apiRouter);

app.use('/library', apiRouter);

setupSwagger(app);

app.listen(PORT, '0.0.0.0', () => {console.log(`API ONLINE: http://localhost:${PORT}/library`)});

// app.use((err, req, res, next) => {
//   if (err.name === 'ValidateError') {
//     console.error('ValidateError:', err.fields);
//     return res.status(422).json({
//       message: 'Validation Failed',
//       details: err.fields,
//     });
//   }
//   next(err);
// });


