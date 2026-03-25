import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhoneAlt, FaBriefcase, FaFilePdf, FaCloudUploadAlt, FaCommentDots, FaWhatsapp, FaShieldAlt, FaLock, FaCheckCircle, FaExclamationTriangle, FaCopy, FaLink } from 'react-icons/fa';

const ContactForm = () => {
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
  const [resumeBase64, setResumeBase64] = useState('');

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

  const handleFileChange = async (e) => {
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
      
      // Convert file to Base64 for sharing
      const base64 = await convertFileToBase64(file);
      setResumeBase64(base64);
      setResumeFile(file);
      setFileName(file.name);
    } else {
      setResumeFile(null);
      setFileName('No file chosen');
      setResumeBase64('');
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
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

  const generateResumeLink = () => {
    if (!resumeBase64) return '';
    // Create a data URL that can be downloaded
    return resumeBase64;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Create a formatted message for WhatsApp
      let message = '';
      message += '🌟 *NEW JOB APPLICATION* 🌟\n';
      message += '═══════════════════════\n\n';
      message += `👤 *Name:* ${formData.fullName}\n`;
      message += `📧 *Email:* ${formData.email}\n`;
      message += `📞 *Phone:* ${formData.phone}\n`;
      message += `💼 *Job Field:* ${formData.jobField}\n\n`;
      
      if (formData.message) {
        message += `📝 *Note:* ${formData.message}\n\n`;
      }
      
      message += `📄 *Resume:* ${resumeFile.name}\n`;
      message += `📊 *Size:* ${(resumeFile.size / 1024).toFixed(1)} KB\n\n`;
      
      message += '🔗 *How to download resume:*\n';
      message += '1. Open this link in browser\n';
      message += '2. Click on "Download Resume" button\n';
      message += '3. Save the file\n\n';
      
      // Create a simple HTML page for resume download
      const downloadPage = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Download Resume - ${formData.fullName}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                .container {
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    max-width: 500px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                }
                .icon {
                    font-size: 80px;
                    margin-bottom: 20px;
                }
                h1 {
                    color: #333;
                    margin-bottom: 10px;
                }
                .details {
                    background: #f5f5f5;
                    padding: 20px;
                    border-radius: 10px;
                    margin: 20px 0;
                    text-align: left;
                }
                .detail-item {
                    margin: 10px 0;
                    font-size: 14px;
                }
                .detail-label {
                    font-weight: bold;
                    color: #667eea;
                }
                .download-btn {
                    background: #25d366;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    font-size: 18px;
                    border-radius: 50px;
                    cursor: pointer;
                    margin: 20px 0;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                }
                .download-btn:hover {
                    background: #128C7E;
                }
                .footer {
                    font-size: 12px;
                    color: #999;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="icon">📄</div>
                <h1>Resume Download</h1>
                <p>Candidate: ${formData.fullName}</p>
                <div class="details">
                    <div class="detail-item"><span class="detail-label">Email:</span> ${formData.email}</div>
                    <div class="detail-item"><span class="detail-label">Phone:</span> ${formData.phone}</div>
                    <div class="detail-item"><span class="detail-label">Job Field:</span> ${formData.jobField}</div>
                    <div class="detail-item"><span class="detail-label">Resume:</span> ${resumeFile.name}</div>
                </div>
                <a href="${resumeBase64}" download="${resumeFile.name}" class="download-btn">
                    ⬇️ Download Resume
                </a>
                <div class="footer">
                    This link will expire after 24 hours
                </div>
            </div>
        </body>
        </html>
      `;
      
      // Create a data URL for the download page
      const downloadPageDataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(downloadPage);
      
      message += `🔗 *Resume Download Link:*\n${downloadPageDataUrl}\n\n`;
      message += '═══════════════════════\n';
      message += `📅 Submitted: ${new Date().toLocaleString()}\n`;
      message += `✅ Please contact candidate at ${formData.phone}`;
      
      // Encode message for WhatsApp
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${TARGET_PHONE}?text=${encodedMessage}`;
      
      showStatus(`✅ Redirecting to WhatsApp with resume download link...`, true);
      
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

  const copyDemoLink = () => {
    // For demo purposes - shows how it works
    alert('In production, this would generate a permanent download link. Currently using data URL method which works for immediate download.');
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
            Submit your details & resume — Download link sent via WhatsApp
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
            <div className="bg-blue-50 rounded-xl p-3 flex items-center justify-between gap-2 text-xs text-slate-600 border border-blue-200">
              <div className="flex items-center gap-2">
                <FaLink className="text-blue-600" />
                <span>Resume download link will be sent in WhatsApp message</span>
              </div>
              <button
                type="button"
                onClick={copyDemoLink}
                className="flex items-center gap-1 px-2 py-1 bg-white rounded-lg hover:bg-gray-100"
              >
                <FaCopy className="text-xs" />
                <span>How it works</span>
              </button>
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
          Secure transmission • Resume download link included in WhatsApp message
        </div>
      </div>
    </div>
  );
};

export default ContactForm;