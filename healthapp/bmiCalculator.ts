import { pathToFileURL } from 'node:url';

const parseArguments = (args: string[]): { height: number; weight: number } => {
    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (!Number.isFinite(height) || !Number.isFinite(weight) || height <= 0 || weight <= 0) {
        throw new Error('Numbers must be positive values');
    }

    return { height, weight };
};

export const bmiValue = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 16) return 'Underweight (Severe thinness)';
  if (bmi < 17) return 'Underweight (Moderate thinness)';
  if (bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight';
  if (bmi < 35) return 'Obese (Class I)';
  if (bmi < 40) return 'Obese (Class II)';
  return 'Obese (Class III)';
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    try {
        const { height, weight } = parseArguments(process.argv);
        console.log(bmiValue(height, weight));
    }   catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    }
}