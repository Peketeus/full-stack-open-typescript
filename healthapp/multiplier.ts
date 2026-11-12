// Does not need to be in this folder, but this makes following the tasks easier
// At first this was just for multiplications, but now this supports add and divide aswell
import { pathToFileURL } from 'node:url';

interface Values {
  value1: number;
  value2: number;
  operation: Operation
}

export type Operation = 'multiply' | 'add' | 'divide';

const isOperation = (value: string): value is Operation =>
  value === 'multiply' || value === 'add' || value === 'divide';

const parseArguments = (args: string[]): Values => {
  if (args.length !== 5) {
    throw new Error('Needs: <value1>, <value2>, <multiply|add|divide>');
  }

  const value1 = Number(args[2]);
  const value2 = Number(args[3]);
  const operation = args[4];

  if (!Number.isFinite(value1) || !Number.isFinite(value2)) {
    throw new Error('Provided values were not numbers!');
  }
  if (!isOperation(operation)) {
    throw new Error('Operation must be multiply, add, or divide.');
  }

  return { value1, value2, operation };
};

export const calculate = (a: number, b: number, operation: Operation) => {
  switch (operation) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error('Cannot divide by zero');
      return a / b;
  }
};

// Reads only from direct run
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const { value1, value2, operation } = parseArguments(process.argv);
    console.log(calculate(value1, value2, operation));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}