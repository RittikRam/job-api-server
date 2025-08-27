import React from 'react';
import { Briefcase, Plus, Database } from 'lucide-react';

const Header = ({ onCreateJob, onLoadSampleData, jobCount }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Briefcase className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Job Portal</h1>
              <p className="text-sm text-gray-600">
                {jobCount} {jobCount === 1 ? 'job' : 'jobs'} available
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onLoadSampleData}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Database size={18} />
              <span className="hidden sm:inline">Load Sample Data</span>
            </button>
            <button
              onClick={onCreateJob}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Create Job</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;