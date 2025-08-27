import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';

const JobForm = ({ job, onSubmit, onClose, isEditing = false }) => {
  const [formData, setFormData] = useState({
    postId: '',
    postProfile: '',
    postDesc: '',
    reqExperience: '',
    postTechStack: ['']
  });

  useEffect(() => {
    if (job) {
      setFormData({
        postId: job.postId || '',
        postProfile: job.postProfile || '',
        postDesc: job.postDesc || '',
        reqExperience: job.reqExperience || '',
        postTechStack: job.postTechStack?.length ? job.postTechStack : ['']
      });
    }
  }, [job]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechStackChange = (index, value) => {
    const newTechStack = [...formData.postTechStack];
    newTechStack[index] = value;
    setFormData(prev => ({
      ...prev,
      postTechStack: newTechStack
    }));
  };

  const addTechStack = () => {
    setFormData(prev => ({
      ...prev,
      postTechStack: [...prev.postTechStack, '']
    }));
  };

  const removeTechStack = (index) => {
    if (formData.postTechStack.length > 1) {
      const newTechStack = formData.postTechStack.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        postTechStack: newTechStack
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty tech stack items
    const filteredTechStack = formData.postTechStack.filter(tech => tech.trim() !== '');
    
    const submitData = {
      ...formData,
      postId: parseInt(formData.postId),
      reqExperience: parseInt(formData.reqExperience),
      postTechStack: filteredTechStack
    };
    
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            {isEditing ? 'Edit Job' : 'Create New Job'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job ID *
              </label>
              <input
                type="number"
                name="postId"
                value={formData.postId}
                onChange={handleInputChange}
                required
                disabled={isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Enter job ID"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Experience (years) *
              </label>
              <input
                type="number"
                name="reqExperience"
                value={formData.reqExperience}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Years of experience"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              name="postProfile"
              value={formData.postProfile}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Senior Java Developer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              name="postDesc"
              value={formData.postDesc}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Describe the job responsibilities and requirements..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tech Stack *
            </label>
            <div className="space-y-3">
              {formData.postTechStack.map((tech, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechStackChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                  {formData.postTechStack.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTechStack(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTechStack}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus size={16} />
                <span>Add Technology</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Update Job' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;