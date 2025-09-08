import { useState } from "react";




const AddJobForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    company: "",
    location: "",
    appliedOn: "",
    gotCall:"",
    status: "Pending",
    workType: "Remote",
    cv: "",
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Applied On */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Applied On
            </label>
            <input
              type="date"
              name="appliedOn"
              value={formData.appliedOn}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>Pending</option>
              <option>Interview</option>
              <option>Accepted</option>
              <option>Rejected</option>
            </select>
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Work Type
            </label>
            <select
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
          </div>

          {/* CV */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Applied CV
            </label>
            <input
              type="text"
              name="cv"
              value={formData.cv}
              onChange={handleChange}
              placeholder="cv_file.pdf"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
            
            {/* got call */}
           <div>
            <label className="block text-sm font-medium text-gray-700">
              got call
            </label>
            <input
              type="text"
              name="gotCall"
              value={formData.gotCall}
              onChange={handleChange}
              placeholder=""
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobForm;
