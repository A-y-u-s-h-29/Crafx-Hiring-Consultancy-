import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhoneAlt, FaBriefcase, FaFilePdf, FaCloudUploadAlt, FaCommentDots, FaWhatsapp, FaShieldAlt, FaLock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    jobField: '',
    message: ''
  });
  
  const [resumeFile, setResumeFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [status, setStatus] = useState({ show: false, message: '', isSuccess: true });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const TARGET_PHONE = '919911577652';
  const DISPLAY_PHONE = '+91 9911577652';

  const jobOptions = [
    { value: '', label: '— Select your domain —', disabled: true },
    { value: 'Software Development / IT', label: '💻 Software Development / IT' },
    { value: 'Marketing & Sales', label: '📢 Marketing & Sales' },
    { value: 'Finance & Accounting', label: '💰 Finance & Accounting' },
    { value: 'Human Resources', label: '👥 Human Resources' },
    { value: 'Design & Creative', label: '🎨 Design & Creative' },
    { value: 'Customer Support', label: '📞 Customer Support' },
    { value: 'Operations', label: '⚙️ Operations' },
    { value: 'Other', label: '✨ Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 5) {
        showStatus('File size exceeds 5MB. Please select a smaller file.', false);
        return;
      }
      
      const ext = file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'doc', 'docx', 'txt'].includes(ext)) {
        showStatus('Only PDF, DOC, DOCX, or TXT files are allowed.', false);
        return;
      }
      
      setResumeFile(file);
      setFileName(file.name);
    } else {
      setResumeFile(null);
      setFileName('No file chosen');
    }
  };

  const showStatus = (message, isSuccess = true) => {
    setStatus({ show: true, message, isSuccess });
    setTimeout(() => {
      setStatus({ show: false, message: '', isSuccess: true });
    }, 6000);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      showStatus('Please enter your full name.', false);
      return false;
    }
    
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      showStatus('Valid email address is required.', false);
      return false;
    }
    
    if (!formData.phone.trim()) {
      showStatus('Phone number is required.', false);
      return false;
    }
    
    const cleanPhone = formData.phone.replace(/[^\d+]/g, '');
    if (!cleanPhone.match(/^\+?[0-9]{7,15}$/)) {
      showStatus('Please enter a valid phone number (digits only, optional +).', false);
      return false;
    }
    
    if (!formData.jobField) {
      showStatus('Please select a job field.', false);
      return false;
    }
    
    if (!resumeFile) {
      showStatus('Please upload your resume (PDF/DOC/DOCX).', false);
      return false;
    }
    
    return true;
  };

  const formatWhatsAppMessage = () => {
    // Create a clean message with proper line breaks
    let message = '';
    message += '🌟 *NEW JOB APPLICATION* 🌟\n';
    message += '────────────────\n';
    message += `*👤 Name:* ${formData.fullName}\n`;
    message += `*📧 Email:* ${formData.email}\n`;
    message += `*📞 Phone:* ${formData.phone}\n`;
    message += `*💼 Job Field:* ${formData.jobField}\n`;
    
    if (formData.message) {
      message += `*📝 Note:* ${formData.message}\n`;
    }
    
    message += `*📄 Resume:* ${resumeFile.name} (${(resumeFile.size / 1024).toFixed(1)} KB)\n`;
    
    // Create a temporary download link
    const resumeLink = URL.createObjectURL(resumeFile);
    message += `*🔗 Download Resume:* ${resumeLink}\n`;
    message += `_⚠️ Link valid for 2 minutes. Please download immediately._\n`;
    
    message += '────────────────\n';
    message += `📅 Submitted via Career Connect Portal\n`;
    message += `🔔 Please contact candidate at ${formData.phone}`;
    
    // Store the link for cleanup
    setTimeout(() => {
      URL.revokeObjectURL(resumeLink);
    }, 120000);
    
    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Format the message with proper line breaks
      const rawMessage = formatWhatsAppMessage();
      
      // Encode for WhatsApp URL - preserve line breaks as \n
      const encodedMessage = encodeURIComponent(rawMessage);
      const whatsappUrl = `https://wa.me/${TARGET_PHONE}?text=${encodedMessage}`;
      
      showStatus(`Redirecting to WhatsApp... Your details & resume link will be sent to ${DISPLAY_PHONE}`, true);
      
      // Open WhatsApp after a short delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 800);
      
    } catch (error) {
      console.error('Error:', error);
      showStatus('Something went wrong. Please try again.', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-8 md:px-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-3">
            <FaWhatsapp className="text-green-400" />
            Career Connect
          </h1>
          <p className="text-slate-300 mt-2 text-sm md:text-base">
            Submit your details & resume — instantly delivered via WhatsApp
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaUser className="text-slate-600" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-700 focus:ring-2 focus:ring-slate-200 outline-none transition-all"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaEnvelope className="text-slate-600" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-700 focus:ring-2 focus:ring-slate-200 outline-none transition-all"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaPhoneAlt className="text-slate-600" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 9876543210 / 9876543210"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-700 focus:ring-2 focus:ring-slate-200 outline-none transition-all"
                required
              />
            </div>

            {/* Job Field Dropdown */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaBriefcase className="text-slate-600" />
                Job Field *
              </label>
              <select
                name="jobField"
                value={formData.jobField}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-700 focus:ring-2 focus:ring-slate-200 outline-none transition-all appearance-none bg-white"
                required
              >
                {jobOptions.map((option, idx) => (
                  <option key={idx} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Resume Upload */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaFilePdf className="text-slate-600" />
                Upload Resume (PDF / DOC / DOCX) *
              </label>
              <div className="relative">
                <label className="flex items-center justify-center gap-3 w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all">
                  <FaCloudUploadAlt className="text-slate-600" />
                  <span className="text-slate-600 font-medium">Click to browse or drag file</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-slate-500 mt-1">{fileName}</p>
              <p className="text-xs text-slate-400">Max 5MB (PDF, Word, or text)</p>
            </div>

            {/* Optional Message */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaCommentDots className="text-slate-600" />
                Short Note (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="3"
                placeholder="Any additional info about your experience..."
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-700 focus:ring-2 focus:ring-slate-200 outline-none transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaWhatsapp className="text-xl" />
              {isSubmitting ? 'Sending...' : 'Send details on WhatsApp'}
            </button>

            {/* Info Note */}
            <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-center gap-2 text-xs text-slate-600 border border-slate-200">
              <FaShieldAlt className="text-green-600" />
              <span>Your info & resume will be forwarded to <strong>{DISPLAY_PHONE}</strong> via WhatsApp message</span>
            </div>
          </form>

          {/* Status Message */}
          {status.show && (
            <div className={`mt-5 p-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium ${
              status.isSuccess ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'
            }`}>
              {status.isSuccess ? <FaCheckCircle /> : <FaExclamationTriangle />}
              <span>{status.message}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 text-center py-3 text-xs text-slate-500 border-t border-slate-200">
          <FaLock className="inline mr-1" />
          Secure transmission • Data sent only to authorized recruiter
        </div>
      </div>
    </div>
  );
};

export default Contact;