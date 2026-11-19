import patients from '../data/patients.ts';
import type { NewPatient, NonSensitivePatient, Patient } from '../types.ts';
import { randomUUID } from 'node:crypto'; // import { v1 as uuid } from 'uuid' did not work for some reason

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  }));
};

const findById = (id: string): Patient | undefined => {  
  const patient = patients.find(p => p.id === id);  
  return patient;
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: randomUUID(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  findById,
  addPatient
};