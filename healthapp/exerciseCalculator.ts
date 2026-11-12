import { pathToFileURL } from 'node:url';

type Rating = 1 | 2 | 3;
type Explanation = 'try harder next time' | 'not bad, but not good either' | 'very good, keep it up';

// result object
interface Summary {
  periodLength: number;
  trainingDays : number;
  success : boolean;
  rating : Rating;
  description : Explanation;
  targetValue : number;
  averageTime : number;
}

interface Exercice {
  targetHours : number;
  hours : number[];
}

const parseExercice = (args: string[]): Exercice => {
  const targetHours = Number(args[2]);

  if (Number.isNaN(targetHours)) {
    throw new Error('Provided values were not numbers!');
  }

  const hours: number[] = [];

  args.slice(3).forEach(arg => {
    if (!isNaN(Number(arg))) {
      hours.push(Number(arg));
    } else {
      throw new Error('Provided values were not numbers!');
    }
    });
    return { targetHours, hours};
};

export const calculateExercises = (weekHours: number[], target: number): Summary => {
  const periodLength = weekHours.length;
  let trainingDays = 0;
  let sum = 0;
  let rating: Rating;
  let description: Explanation;
  let success = false;

  weekHours.forEach(day => {
    if (day > 0) {
      trainingDays += 1;
    }
      sum += day;
  });

  const averageTime = sum / weekHours.length;

  if (averageTime < target / 2) {
    rating = 1;
    description = 'try harder next time';
  }
  else if (averageTime < target) {
    rating = 2;
    description = 'not bad, but not good either';
  }
  else {
    rating = 3;
    description = 'very good, keep it up';
    success = true;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    description,
    targetValue: target,
    averageTime
  };
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const {targetHours, hours} = parseExercice(process.argv);
    console.log(calculateExercises(hours, targetHours));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}