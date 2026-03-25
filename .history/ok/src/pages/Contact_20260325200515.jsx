import React, { useState } from 'react';

const JobApplicationForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    jobPreference: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  // WhatsApp target number
  const WHATSAPP_NUMBER = "8929123678";
  
  // Generic Job options
  const jobOptions = [
    { value: '', label: '-- Select Job Preference --' },
    { value: 'software-engineer', label: 'Software Engineer' },
    { value: 'senior-software-engineer', label: 'Senior Software Engineer' },
    { value: 'frontend-developer', label: 'Frontend Developer' },
    { value: 'backend-developer', label: 'Backend Developer' },
    { value: 'fullstack-developer', label: 'Full Stack Developer' },
    { value: 'web-developer', label: 'Web Developer' },
    { value: 'mobile-app-developer', label: 'Mobile App Developer' },
    { value: 'ui-ux-designer', label: 'UI/UX Designer' },
    { value: 'graphic-designer', label: 'Graphic Designer' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'project-manager', label: 'Project Manager' },
    { value: 'data-analyst', label: 'Data Analyst' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'devops-engineer', label: 'DevOps Engineer' },
    { value: 'qa-engineer', label: 'QA Engineer' },
    { value: 'technical-support', label: 'Technical Support' },
    { value: 'system-administrator', label: 'System Administrator' },
    { value: 'database-administrator', label: 'Database Administrator' },
    { value: 'network-engineer', label: 'Network Engineer' },
    { value: 'cybersecurity-analyst', label: 'Cybersecurity Analyst' },
    { value: 'cloud-engineer', label: 'Cloud Engineer' },
    { value: 'ai-ml-engineer', label: 'AI/ML Engineer' },
    { value: 'business-analyst', label: 'Business Analyst' },
    { value: 'marketing-manager', label: 'Marketing Manager' },
    { value: 'sales-manager', label: 'Sales Manager' },
    { value: 'hr-manager', label: 'HR Manager' },
    { value: 'content-writer', label: 'Content Writer' },
    { value: 'digital-marketer', label: 'Digital Marketer' },
    { value: 'seo-specialist', label: 'SEO Specialist' },
    { value: 'other', label: 'Other' }
  ];
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear status when user types
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };
  
  // Get job label from value
  const getJobLabel = (value) => {
    const job = jobOptions.find(j => j.value === value);
    return job ? job.label : value;
  };
  
  // Validate form
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setStatus({ type: 'error', message: '❌ Please enter your full name' });
      return false;
    }
    
    if (!formData.email.trim()) {
      setStatus({ type: 'error', message: '❌ Please enter your email address' });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: '❌ Please enter a valid email address' });
      return false;
    }
    
    if (!formData.phone.trim()) {
      setStatus({ type: 'error', message: '❌ Please enter your phone number' });
      return false;
    }
    
    const phoneRegex = /^[\d\s+\-()]{10,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setStatus({ type: 'error', message: '❌ Please enter a valid phone number (10-15 digits)' });
      return false;
    }
    
    if (!formData.jobPreference) {
      setStatus({ type: 'error', message: '❌ Please select your job preference' });
      return false;
    }
    
    return true;
  };
  
  // Handle form submission - Send via WhatsApp
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare WhatsApp message
      const currentDate = new Date().toLocaleString('en-IN', { 
        dateStyle: 'full',
        timeStyle: 'short'
      });
      
      const jobLabel = getJobLabel(formData.jobPreference);
      
      const message = `*📋 NEW JOB APPLICATION*\n\n` +
        `*👤 Name:* ${formData.fullName.trim()}\n` +
        `*📧 Email:* ${formData.email.trim()}\n` +
        `*📱 Phone:* ${formData.phone.trim()}\n` +
        `*💼 Job Preference:* ${jobLabel}\n` +
        `*💬 Message:* ${formData.message.trim() || 'No message provided'}\n\n` +
        `*📅 Applied on:* ${currentDate}\n\n` +
        `🔔 *Note:* Please find my resume attached separately in this WhatsApp chat.\n` +
        `Thank you for your consideration! 🙏`;
      
      // Encode message for WhatsApp
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      setStatus({ 
        type: 'success', 
        message: '✅ Application prepared! WhatsApp opened. Please attach your resume and send the message.' 
      });
      
     
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        jobPreference: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error:', error);
      setStatus({ type: 'error', message: '❌ Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      jobPreference: '',
      message: ''
    });
    setStatus({ type: '', message: '' });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg mb-4">
            <i className="fab fa-whatsapp text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Job Application Form
          </h1>
          <p className="text-gray-600">
            Fill your details and send application via WhatsApp
          </p>
        </div>
        
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <i className="fas fa-user text-indigo-500 mr-2"></i>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
              />
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <i className="fas fa-envelope text-indigo-500 mr-2"></i>
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
              />
            </div>
            
            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <i className="fas fa-phone-alt text-indigo-500 mr-2"></i>
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
              />
              <p className="text-xs text-gray-400 mt-1">Include country code (e.g., +91 for India)</p>
            </div>
            
            {/* Job Preference - Generic Jobs */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <i className="fas fa-briefcase text-indigo-500 mr-2"></i>
                Job Preference <span className="text-red-500">*</span>
              </label>
              <select
                name="jobPreference"
                value={formData.jobPreference}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none bg-gray-50 focus:bg-white cursor-pointer"
              >
                {jobOptions.map(option => (
                  <option key={option.value} value={option.value} disabled={option.value === ''}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Additional Message */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <i className="fas fa-comment-dots text-indigo-500 mr-2"></i>
                Additional Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your experience, skills, portfolio, or anything you'd like to share..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none resize-none bg-gray-50 focus:bg-white"
              ></textarea>
            </div>
            
            {/* Resume Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <i className="fas fa-info-circle text-blue-600 text-lg mt-0.5"></i>
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">📄 Resume Submission</p>
                <p>After clicking the button below, WhatsApp will open with your application details. 
                <strong className="block mt-1">Please manually attach your resume (PDF/DOC) in the WhatsApp chat before sending the message.</strong></p>
              </div>
            </div>
            
            {/* Status Message */}
            {status.message && (
              <div className={`p-4 rounded-lg flex items-start gap-3 ${
                status.type === 'error' 
                  ? 'bg-red-50 text-red-700 border-l-4 border-red-500' 
                  : 'bg-green-50 text-green-700 border-l-4 border-green-500'
              }`}>
                <i className={`fas ${status.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'} mt-0.5`}></i>
                <span>{status.message}</span>
              </div>
            )}
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-3 rounded-lg font-bold text-white text-lg transition-all shadow-md flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fab fa-whatsapp text-xl"></i>
                    Send Application via WhatsApp
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-undo-alt"></i>
                Clear Form
              </button>
            </div>
          </form>
      
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;