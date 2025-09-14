import { useState, useEffect } from "react";
import axios from "./utils/axiosInstance";
import AddJobForm from "./components/AddJobForm";
import { Briefcase, MapPin, FileText, Phone, Pencil, Trash2 } from "lucide-react";


const App = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [jobEdit, setJobIdEdit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/getJobs");
      setJobs(res.data.job);
    };
    fetchData();
  }, []);

  const addJob = async (data) => {
    try {
      const res = await axios.post("/addjob", { data });
      setJobs((prev) => [...prev, res.data.job]);
      setShowForm(false);
    } catch (err) {
      console.log("error in add job function : ", err);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`/deleteJob/${jobId}`);
      if (res.status === 200) {
        setJobs((prev) => prev.filter((job) => job._id !== jobId));
      }
    } catch (err) {
      console.log("error in delete job : ", err);
    }
  };

  const editJob = async (updatedJob) => {
    try {
      const res = await axios.put(`/updateJob/${updatedJob._id}`, updatedJob);
      if(res.status === 200){
        setJobs((prev) => prev.map((job) => job._id === updatedJob._id ? res.data.job : job))
      }
      setShowForm(false)
      console.log('res from edit job : ', res);
    } catch (err) {
      console.log('error in edit job function : ', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Navbar */}
      <div className="sticky top-0 bg-white/70 backdrop-blur-md shadow-sm rounded-xl p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 z-10">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
          <Briefcase className="text-blue-600" /> Job Tracker
        </h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <svg
              className="absolute left-3 top-2.5 text-gray-400"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Add Job Button */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transform transition"
          >
            + Add Job
          </button>
        </div>
      </div>

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
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 hover:shadow-xl transition flex flex-col justify-between relative"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Briefcase className="text-blue-600" size={20} />
                  {job.company}
                </h2>
                  <p className="text-gray-500 flex items-center gap-1">
                  <MapPin size={16} /> {job.cv}
                </p>
                <p className="text-gray-500 flex items-center gap-1">
                  <MapPin size={16} /> {job.location}
                </p>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Applied On:</span> {job.appliedOn}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-lg text-xs ${job.status === "Pending"
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
                    <span className="font-semibold">Work Type:</span> {job.workType}
                  </p>
                  <p className="flex items-center gap-1">
                    <FileText size={16} /> <span className="font-semibold">CV:</span>{" "}
                    {job.cv}
                  </p>
                  <p className="flex items-center gap-1">
                    <Phone size={16} /> <span className="font-semibold">Got Call:</span>{" "}
                    {job.gotCall}
                  </p>
                </div>
              </div>

              {/* Action Icons */}
              <div className="absolute top-4 right-4 flex flex-col gap-3">
                {/* Edit Icon */}
                <button className="text-yellow-500 hover:text-yellow-600 transition" onClick={() => {
                  setJobIdEdit(job._id),
                  setShowForm(true);
                }}>
                  <Pencil size={20} />
                </button>

                {/* Delete Icon */}
                <button
                  onClick={() => deleteJob(job._id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
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
            <div className="col-span-full flex justify-center items-center p-10 bg-white rounded-2xl shadow-md text-gray-500">
              No jobs found...
            </div>
          )}
      </div>

      {/* Add Job Form Modal */}
      {showForm && <AddJobForm onClose={() => setShowForm(false)} onAdd={addJob} onEdit={editJob} data={jobs.find(job => job._id === jobEdit)} />}
    </div>
  );
};

export default App;
