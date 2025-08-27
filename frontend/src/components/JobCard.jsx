import React from 'react';
import { Edit, Trash2, MapPin, Clock, Code } from 'lucide-react';

const JobCard = ({ job, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {job.postProfile}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {job.postDesc}
          </p>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(job)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Job"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(job.postId)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Job"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <Clock size={16} className="mr-2" />
        <span>{job.reqExperience} years experience required</span>
      </div>
      
      <div className="flex items-start text-sm text-gray-500 mb-4">
        <Code size={16} className="mr-2 mt-0.5 flex-shrink-0" />
        <div className="flex flex-wrap gap-2">
          {job.postTechStack?.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
        Job ID: {job.postId}
      </div>
    </div>
  );
};

export default JobCard;