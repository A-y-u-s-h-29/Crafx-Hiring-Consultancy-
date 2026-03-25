import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhoneAlt, FaBriefcase, FaWhatsapp, FaShieldAlt, FaLock, FaCheckCircle, FaExclamationTriangle, FaCopy, FaMobileAlt } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    jobField: ''
  });
  
  const [status, setStatus] = useState({ show: false, message: '', isSuccess: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showManualLink, setShowManualLink] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

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

  const showStatus = (message, isSuccess = true) => {
    setStatus({ show: true, message, isSuccess });
    setTimeout(() => {
      setStatus({ show: false, message: '', isSuccess: true });
    }, 6000);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      showStatus('❌ Please enter your full name.', false);
      return false;
    }
    
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      showStatus('❌ Valid email address is required.', false);
      return false;
    }
    
    if (!formData.phone.trim()) {
      showStatus('❌ Phone number is required.', false);
      return false;
    }
    
    const cleanPhone = formData.phone.replace(/[^\d+]/g, '');
    if (!cleanPhone.match(/^\+?[0-9]{7,15}$/)) {
      showStatus('❌ Please enter a valid phone number (digits only, optional +).', false);
      return false;
    }
    
    if (!formData.jobField) {
      showStatus('❌ Please select a job field.', false);
      return false;
    }
    
    return true;
  };

  const generateWhatsAppMessage = () => {
    let message = '';
    message += '🌟 *NEW JOB APPLICATION* 🌟\n';
    message += '═══════════════════════\n\n';
    message += `👤 *Name:* ${formData.fullName}\n`;
    message += `📧 *Email:* ${formData.email}\n`;
    message += `📞 *Phone:* ${formData.phone}\n`;
    message += `💼 *Job Field:* ${formData.jobField}\n\n`;
    message += '📄 *RESUME REQUIRED*\n';
    message += '━━━━━━━━━━━━━━━━━━━━━\n';
    message += '⚠️ Please upload your resume/CV on WhatsApp\n';
    message += '📎 Send your resume file (PDF/DOC/DOCX format)\n';
    message += '💡 Max size: 5MB\n\n';
    message += '═══════════════════════\n';
    message += `📅 Submitted: ${new Date().toLocaleString('en-IN')}\n`;
    message += `✅ Please send resume at ${formData.phone}`;
    
    return message;
  };

  const openWhatsApp = (url) => {
    const newWindow = window.open(url, '_blank');
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      setShowManualLink(true);
      showStatus('⚠️ Popup blocked! Please click the manual link below.', false);
    } else {
      showStatus('✅ Opening WhatsApp... Send your resume there!', true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const message = generateWhatsAppMessage();
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${TARGET_PHONE}?text=${encodedMessage}`;
      const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${TARGET_PHONE}&text=${encodedMessage}`;
      
      setGeneratedLink(whatsappUrl);
      
      // Check if mobile or desktop
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Mobile users - directly open WhatsApp
        window.location.href = whatsappUrl;
        showStatus('✅ Opening WhatsApp... Please send your resume there!', true);
      } else {
        // Desktop users - show options
        const userChoice = window.confirm(
          `How would you like to proceed?\n\n` +
          `✅ "OK" - Open WhatsApp Web\n` +
          `❌ "Cancel" - Copy link to use on mobile\n\n` +
          `After opening, please send your resume file.`
        );
        
        if (userChoice) {
          openWhatsApp(whatsappWebUrl);
        } else {
          await navigator.clipboard.writeText(whatsappUrl);
          setShowManualLink(true);
          showStatus('✅ Link copied! Open WhatsApp on your phone and paste the link.', true);
        }
      }
      
    } catch (error) {
      console.error('Error:', error);
      showStatus('❌ Something went wrong. Please try again.', false);
      setShowManualLink(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showStatus('✅ Link copied to clipboard!', true);
    } catch (err) {
      showStatus('❌ Failed to copy. Please select and copy manually.', false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8 md:px-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-3">
            <FaWhatsapp className="text-white text-3xl" />
            Career Connect
          </h1>
          <p className="text-green-100 mt-2 text-sm md:text-base">
            Submit your details — Resume to be shared on WhatsApp
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaUser className="text-green-600" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaEnvelope className="text-green-600" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaPhoneAlt className="text-green-600" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                required
              />
            </div>

            {/* Job Field Dropdown */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaBriefcase className="text-green-600" />
                Job Preference *
              </label>
              <select
                name="jobField"
                value={formData.jobField}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all appearance-none bg-white"
                required
              >
                {jobOptions.map((option, idx) => (
                  <option key={idx} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 text-xl">📄</div>
                <div>
                  <p className="text-sm font-semibold text-blue-900">Resume Upload</p>
                  <p className="text-xs text-blue-700 mt-1">
                    After submitting, you'll be redirected to WhatsApp. Please upload your resume there (PDF/DOC/DOCX format, max 5MB).
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaWhatsapp className="text-xl" />
              {isSubmitting ? 'Processing...' : 'Continue to WhatsApp'}
            </button>

            {/* Manual Link Section */}
            {showManualLink && generatedLink && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
                <div className="flex items-center gap-2 text-yellow-800 mb-2">
                  <FaMobileAlt />
                  <span className="font-semibold">Manual WhatsApp Link</span>
                </div>
                <p className="text-xs text-yellow-700 mb-2">
                  Copy this link and paste in your mobile browser to open WhatsApp:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 px-3 py-2 text-xs bg-white border border-yellow-300 rounded-lg"
                  />
                  <button
                    onClick={() => copyToClipboard(generatedLink)}
                    className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center gap-1"
                  >
                    <FaCopy />
                    Copy
                  </button>
                </div>
                <p className="text-xs text-yellow-600 mt-2">
                  💡 After opening WhatsApp, please send your resume file (PDF/DOC/DOCX)
                </p>
              </div>
            )}

            {/* Info Note */}
            <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-center gap-2 text-xs text-slate-600 border border-slate-200">
              <FaShieldAlt className="text-green-600" />
              <span>Your details will be sent to <strong>{DISPLAY_PHONE}</strong> • Resume to be uploaded on WhatsApp</span>
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
          Secure • Submit details • Share resume on WhatsApp
        </div>
      </div>
    </div>
  );
};

export default ContactForm;