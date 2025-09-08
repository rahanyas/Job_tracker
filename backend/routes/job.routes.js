import express from 'express';
import { addJobToDb, deleteJobFromDb, getJobFromDb } from '../controller/job.controller.js';

const router = express.Router();

router.post('/addjob', addJobToDb);
router.get('/getJobs', getJobFromDb);
router.delete('/deleteJob/:id', deleteJobFromDb);

export default router;