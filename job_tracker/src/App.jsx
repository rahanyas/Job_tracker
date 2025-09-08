import { useState } from "react";
import AddJobForm from "./components/AddJobForm";

const App = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Google",
      location: "Bangalore, India",
      appliedOn: "2025-09-01",
      status: "Pending",
      workType: "Remote",
      cv: "rahanyas_cv.pdf",
    },
    {
      id: 2,
      company: "Microsoft",
      location: "Hyderabad, India",
      appliedOn: "2025-08-25",
      status: "Interview",
      workType: "Hybrid",
      cv: "rahanyas_resume.pdf",
    },
    {
      id: 3,
      company: "Amazon",
      location: "Chennai, India",
      appliedOn: "2025-07-15",
      status: "Rejected",
      workType: "On-site",
      cv: "rahanyas_job.pdf",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.status.toLowerCase().includes(search.toLowerCase())
  );

  const addJob = (job) => {
    setJobs([{ ...job, id: Date.now() }, ...jobs]);
    setShowForm(false);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
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
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteJob(job.id)}
                className="mt-4 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
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
