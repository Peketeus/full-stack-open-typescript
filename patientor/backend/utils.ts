import { z } from 'zod';
import { Gender } from './types.ts';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});