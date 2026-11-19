import express from 'express';
import cors from 'cors';

import diagnosisRouter from './routes/diagnoses.ts';
import patientsRouter from './routes/patients.ts';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('http get api/ping');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});