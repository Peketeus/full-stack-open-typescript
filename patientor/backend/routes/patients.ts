import patientsService from '../services/patientsService.ts';
import { NewPatientSchema } from '../utils.ts';
import express, { type Request, type Response, type NextFunction } from 'express';
import type { NewPatient } from '../types.ts';
import { z } from 'zod';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res) => {
  console.log('Getting patients from patientsService');
  res.json(patientsService.getPatients());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<NewPatient>) => {
  console.log('Adding new patient');
  const addedPatient = patientsService.addPatient(req.body);
  res.status(200).json(addedPatient);
});

router.use(errorMiddleware);

export default router;