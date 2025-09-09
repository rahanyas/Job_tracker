import jobModal from "../model/job.modal.js";

export const addJobToDb = async (req, res) => {
  try {
    const { data } = req.body;
    console.log('data got from the client : ', data);
    const newData = await jobModal.create({
      appliedOn: data.appliedOn,
      company: data.company,
      location: data.location,
      gotCall: data.gotCall,
      status: data.status,
      workType: data.workType,
      cv: data.cv
    })
    return res.status(200).json({ msg: 'new job created', job: newData })

  } catch (err) {
    console.log('error occureed in add job to db', err);
    return res.status(500).json('internal server error');
  }
};

export const getJobFromDb = async (req, res) => {
  try {
    const jobs = await jobModal.find({}).sort({ createdAt: -1 });
    if (jobs.length === 0) {
      console.log('no jobs in the db');
      return res.status(404).json('no jobs');
    };
    return res.status(200).json({ msg: 'jobs found', job: jobs })
  } catch (err) {
    console.log('error in get job from db : ', err)
  }
};

export const deleteJobFromDb = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const deleteJob = await jobModal.findByIdAndDelete(id);
    return res.status(200).json({ msg: 'job is removed' })
  } catch (err) {
    console.log('error in delete job from', err);
    return res.status(500).json('internal server error', err)
  }
};

export const updateJob = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    console.log(id);
    const job = await jobModal.findByIdAndUpdate(id, updatedData, {
      new: true
    });
    if(!job){
      return res.status(404).json('job not found')
    };

    return res.status(200).json({job})

  } catch (err) {
    console.log('error in update job : ', err);
    return res.status(500).json('Internal Server Error')
  }
}