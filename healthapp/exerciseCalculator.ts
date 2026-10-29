// 1 poor
// 2 average
// 3 good
type Rating = 1 | 2 | 3;
type Explanation = 'try harder next time' | 'not bad, but not good either' | 'very good, keep it up'

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

const calculateExercises = (weekHours: number[], target: number): Summary => {
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
    }
}

const hours = [3, 0, 2, 4.5, 0, 3, 1];
console.log(calculateExercises(hours, 2));