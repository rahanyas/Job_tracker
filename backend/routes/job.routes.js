import express from 'express';
import { addJobToDb, deleteJobFromDb, getJobFromDb, updateJob } from '../controller/job.controller.js';

const router = express.Router();

router.post('/addjob', addJobToDb);
router.get('/getJobs', getJobFromDb);
router.delete('/deleteJob/:id', deleteJobFromDb);
router.put('/updateJob/:id', updateJob)

export default router;