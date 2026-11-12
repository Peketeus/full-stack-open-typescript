import express from 'express';
import { bmiValue } from './bmiCalculator.ts';
import { calculate, type Operation } from './multiplier.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1)) ) {    
     return res.status(400).send({ error: 'Value1 must be a number'});  
  }
  if ( !value2 || isNaN(Number(value2)) ) {    
     return res.status(400).send({ error: 'Value2 must be a number'});  
  }
  if (op !== 'multiply' && op !== 'add' && op !== 'divide') {
    return res.status(400).send({ error: 'operation must be multiply, add, or divide' });
  }
  if (op === 'divide' && value2 === 0) {
    return res.status(400).send({ error: 'Cannot divide by zero!' });
  }

  const operation = op as Operation;
  const result = calculate(Number(value1), Number(value2), operation);
  return res.send({ result });
});

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
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

// ---------------------------------
// ExerciseCalculator
// ---------------------------------
app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // Validations...
  if (!target && !daily_exercises) {
    return res.status(400).send({ error: 'parameters missing'});
  }
  if (isNaN(Number(target)) || target < 0) {    
     return res.status(400).send({ error: 'malformatted parameters'});
  }

  const result = calculateExercises(daily_exercises as number[], Number(target));
  return res.json({ result });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});