import { useState } from "react";
import AddJobForm from "./components/AddJobForm";
import { useEffect } from "react";
import axios from "./utils/axiosInstance";

const App = () => {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
     const fetchData = async () => {
       const res = await axios.get('/getJobs');
       console.log('data from fetchdata : ', res.data);
       setJobs(res.data.job)
     };
     fetchData()
  },[])

    const addJob = async (data) => {
     try {
        const res = await axios.post('/addjob', {data});
        setJobs((prev) => [...prev, res.data.job]);
        setShowForm(false)
        console.log('response from server : ', res)
     } catch (err) {
        console.log('error in add job function : ', err)
     }
    };

    const deleteJob = async (jobId) => {
       try {
        const res = await axios.delete(`/deleteJob/${jobId}`);
        if(res.status === 200){
          setJobs((prev) => prev.filter((job) => job._id !== jobId));
        }
       } catch (err) {
        console.log('error in delete job : ', err)
       }
    };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Job Tracker Main Page
        </h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
          />

          {/* Add job button */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Job
          </button>
        </div>
      </div>

      {/* Job Cards Grid */}
{/* Job Cards Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {jobs
    .filter((job) => {
      const query = search.toLowerCase();
      return (
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.status.toLowerCase().includes(query) ||
        job.workType.toLowerCase().includes(query)
      );
    })
    .map((job) => (
      <div
        key={job._id}
        className="bg-white rounded-2xl shadow p-5 border border-gray-200 hover:shadow-lg transition flex flex-col justify-between"
      >
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {job.company}
          </h2>
          <p className="text-gray-500">{job.location}</p>

          <div className="mt-4 space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Applied On:</span>{" "}
              {job.appliedOn}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-lg text-xs ${
                  job.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : job.status === "Interview"
                    ? "bg-blue-100 text-blue-700"
                    : job.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {job.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Work Type:</span>{" "}
              {job.workType}
            </p>
            <p>
              <span className="font-semibold">Applied CV:</span> {job.cv}
            </p>
            <p>
              <span className="font-semibold">got call:</span> {job.gotCall}
            </p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => deleteJob(job._id)}
          className="mt-4 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    ))}

  {jobs.filter((job) => {
    const query = search.toLowerCase();
    return (
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.status.toLowerCase().includes(query) ||
      job.workType.toLowerCase().includes(query)
    );
  }).length === 0 && (
    <p className="text-gray-500">No jobs found...</p>
  )}
</div>


      {/* Add Job Form Modal */}
      {showForm && (
        <AddJobForm onClose={() => setShowForm(false)} onAdd={addJob} />
      )}
    </div>
  );
};

export default App;
