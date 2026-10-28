interface Values {
    value1 : number;
    value2 : number;
}

const parseArguments = (args: string[]): Values => {
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const bmiCalculator = (height: number, mass: number) => {
    let bmi = mass / (height / 100) ** 2;

    if (bmi < 16.0) {
        console.log('Underweight (Severe thinness)');
    } else if (bmi < 17.0) {
        console.log('Underweight (Moderate thinness)');
    } else if (bmi < 18.5) {
        console.log('Underweight (Mild thinness)');
    } else if (bmi < 25.0) {
        console.log('Normal range');
    } else if (bmi < 30.0) {
        console.log('Overweight');
    } else if (bmi < 35.0) {
        console.log('Obese (Class I)');
    } else if (bmi < 40.0) {
        console.log('Obese (Class II)');
    } else {
        console.log('Obese (Class III)');
    }
}

try {
    const {value1, value2 } = parseArguments(process.argv);
    bmiCalculator(value1, value2);
}   catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}