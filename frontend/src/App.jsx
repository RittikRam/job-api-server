import React, { useState, useEffect } from 'react';
import { jobAPI } from './services/api';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import JobCard from './components/JobCard';
import JobForm from './components/JobForm';
import LoadingSpinner from './components/LoadingSpinner';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch all jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobAPI.getAllJobs();
      setJobs(response.data);
      setIsSearching(false);
    } catch (err) {
      setError('Failed to fetch jobs. Please check your connection and authentication.');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobAPI.searchJobs(keyword);
      setJobs(response.data);
      setIsSearching(true);
      showNotification(`Found ${response.data.length} jobs matching "${keyword}"`, 'info');
    } catch (err) {
      setError('Failed to search jobs. Please try again.');
      console.error('Error searching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    fetchJobs();
  };

  const handleCreateJob = async (jobData) => {
    try {
      await jobAPI.createJob(jobData);
      setShowJobForm(false);
      fetchJobs();
      showNotification('Job created successfully!', 'success');
    } catch (err) {
      setError('Failed to create job. Please check the job ID is unique.');
      console.error('Error creating job:', err);
    }
  };

  const handleUpdateJob = async (jobData) => {
    try {
      await jobAPI.updateJob(jobData);
      setEditingJob(null);
      fetchJobs();
      showNotification('Job updated successfully!', 'success');
    } catch (err) {
      setError('Failed to update job. Please try again.');
      console.error('Error updating job:', err);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobAPI.deleteJob(jobId);
        fetchJobs();
        showNotification('Job deleted successfully!', 'success');
      } catch (err) {
        setError('Failed to delete job. Please try again.');
        console.error('Error deleting job:', err);
      }
    }
  };

  const handleLoadSampleData = async () => {
    try {
      setLoading(true);
      await jobAPI.loadSampleData();
      fetchJobs();
      showNotification('Sample data loaded successfully!', 'success');
    } catch (err) {
      setError('Failed to load sample data. Please try again.');
      console.error('Error loading sample data:', err);
    }
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const NotificationComponent = ({ notification, onClose }) => {
    if (!notification) return null;

    const icons = {
      success: <CheckCircle className="text-green-600" size={20} />,
      error: <AlertCircle className="text-red-600" size={20} />,
      info: <Info className="text-blue-600" size={20} />
    };

    const bgColors = {
      success: 'bg-green-50 border-green-200',
      error: 'bg-red-50 border-red-200',
      info: 'bg-blue-50 border-blue-200'
    };

    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColors[notification.type]} shadow-lg max-w-sm`}>
        <div className="flex items-center space-x-3">
          {icons[notification.type]}
          <p className="text-sm font-medium text-gray-900">{notification.message}</p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCreateJob={() => setShowJobForm(true)}
        onLoadSampleData={handleLoadSampleData}
        jobCount={jobs.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onClear={handleClearSearch}
            isSearching={isSearching}
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="text-red-600" size={20} />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="large" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isSearching ? 'No jobs found' : 'No jobs available'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isSearching 
                ? 'Try adjusting your search terms or clear the search to see all jobs.'
                : 'Get started by creating a new job or loading sample data.'
              }
            </p>
            {!isSearching && (
              <div className="space-x-4">
                <button
                  onClick={() => setShowJobForm(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create First Job
                </button>
                <button
                  onClick={handleLoadSampleData}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Load Sample Data
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.postId}
                job={job}
                onEdit={setEditingJob}
                onDelete={handleDeleteJob}
              />
            ))}
          </div>
        )}
      </main>

      {showJobForm && (
        <JobForm
          onSubmit={handleCreateJob}
          onClose={() => setShowJobForm(false)}
        />
      )}

      {editingJob && (
        <JobForm
          job={editingJob}
          onSubmit={handleUpdateJob}
          onClose={() => setEditingJob(null)}
          isEditing={true}
        />
      )}

      <NotificationComponent
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </div>
  );
}

export default App;