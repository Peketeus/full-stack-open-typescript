import express from 'express';
import { bmiValue } from './bmiCalculator.ts';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

// ------------------------
// BMI
//-------------------------
app.get('/bmi', (req, res) => {
  const heightParam = req.query.height;
  const weightParam = req.query.weight;

  if (
      typeof heightParam !== 'string' || typeof weightParam !== 'string' ||
      heightParam.trim() === '' || weightParam.trim() === ''
  ) 
  {
    return res.status(400).json({ error: 'malformatted parameters' });
  };

  const height = Number(heightParam);
  const weight = Number(weightParam);

  if (
    !Number.isFinite(height) || !Number.isFinite(weight) ||
    height <= 0 || weight <= 0
  ) 
  {
    return res.status(400).json({ error: 'malformatted parameters' });
  };

  return res.json({
    weight,
    height,
    bmi: bmiValue(height, weight)
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});