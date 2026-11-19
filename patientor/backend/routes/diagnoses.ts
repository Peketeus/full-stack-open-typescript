import express from 'express';
import diagnosisService from '../services/diagnosisService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('getting diagnoses from diagnosisService');
  res.json(diagnosisService.getDiagnoses());
});

export default router;