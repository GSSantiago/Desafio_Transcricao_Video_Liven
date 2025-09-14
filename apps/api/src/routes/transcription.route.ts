import { Router } from 'express';
import * as transcriptionController from '../controllers/transcription.controller';

const router = Router();

router.get('/', transcriptionController.getAllTranscriptions);

router.get('/:id', transcriptionController.getTranscriptionById);

router.get('/user/:userId', transcriptionController.getTranscriptionsByUserId);

router.post('/', transcriptionController.createTranscription);

router.delete('/:id', transcriptionController.deleteTranscription);

export default router;
