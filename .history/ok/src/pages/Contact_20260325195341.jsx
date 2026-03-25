<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Job Application Form | Submit via WhatsApp</title>
    <!-- Tailwind CSS v3 + Font Awesome Icons -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Custom config to extend Tailwind (optional) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- React & ReactDOM from CDN -->
    <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
    <!-- Babel for JSX -->
    <script src="https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"></script>
    <style>
        /* Custom focus styles and smooth transitions */
        input, select, textarea, button {
            transition: all 0.2s ease;
        }
        /* Hide default file input styling but keep functional */
        .file-input-label:hover {
            background-color: #eef2ff;
            border-color: #3b82f6;
        }
        /* Custom scrollbar for better UX */
        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 8px;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 8px;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-slate-50 to-indigo-50 font-sans antialiased">
    <div id="root" class="min-h-screen flex items-center justify-center p-4 md:p-6"></div>

    <script type="text/babel">
        // Main App Component
        const { useState, useRef } = React;

        // WhatsApp target number (with country code, no plus for URL encoding, but we use + for readability)
        const TARGET_PHONE = "9911577652";
        const FULL_WHATSAPP_NUMBER = `+91${TARGET_PHONE}`; // India code +91

        const JobApplicationForm = () => {
            // Form fields state
            const [formData, setFormData] = useState({
                fullName: '',
                email: '',
                phone: '',
                jobPreference: '',
                additionalMessage: ''
            });
            
            // Resume file state
            const [resumeFile, setResumeFile] = useState(null);
            const [fileName, setFileName] = useState('');
            const [isSubmitting, setIsSubmitting] = useState(false);
            const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
            
            // File input ref for reset/trigger
            const fileInputRef = useRef(null);
            
            // Job options list
            const jobOptions = [
                { value: '', label: 'Select job preference' },
                { value: 'frontend-developer', label: 'Frontend Developer (React/Angular)' },
                { value: 'backend-developer', label: 'Backend Developer (Node.js/Python)' },
                { value: 'fullstack-engineer', label: 'Full Stack Engineer' },
                { value: 'ui-ux-designer', label: 'UI/UX Designer' },
                { value: 'devops-engineer', label: 'DevOps Engineer' },
                { value: 'data-analyst', label: 'Data Analyst' },
                { value: 'mobile-developer', label: 'Mobile Developer (React Native/Flutter)' },
                { value: 'other', label: 'Other / General Application' }
            ];
            
            // Handle text inputs
            const handleInputChange = (e) => {
                const { name, value } = e.target;
                setFormData(prev => ({ ...prev, [name]: value }));
                // Clear any old status when user starts typing
                if (submitStatus.message) setSubmitStatus({ type: '', message: '' });
            };
            
            // Handle file selection
            const handleFileChange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    // Validate file size (max 5MB) and type (PDF/DOC/DOCX/TXT/Image optional but resume usually PDF)
                    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png'];
                    const maxSize = 5 * 1024 * 1024; // 5MB
                    
                    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|txt|jpg|jpeg|png)$/i)) {
                        setSubmitStatus({ type: 'error', message: '❌ Please upload a valid resume file (PDF, DOC, DOCX, TXT, JPG, PNG). Max 5MB.' });
                        setResumeFile(null);
                        setFileName('');
                        e.target.value = '';
                        return;
                    }
                    
                    if (file.size > maxSize) {
                        setSubmitStatus({ type: 'error', message: '❌ File size exceeds 5MB. Please compress or choose a smaller file.' });
                        setResumeFile(null);
                        setFileName('');
                        e.target.value = '';
                        return;
                    }
                    
                    setResumeFile(file);
                    setFileName(file.name);
                    setSubmitStatus({ type: '', message: '' });
                } else {
                    setResumeFile(null);
                    setFileName('');
                }
            };
            
            // Helper: Format job preference to readable text
            const getJobLabel = (value) => {
                const option = jobOptions.find(opt => opt.value === value);
                return option ? option.label : value || 'Not specified';
            };
            
            // Build WhatsApp message with all details + resume as link (base64 or we instruct to send manually? 
            // But requirement: "all detail send on whatsapp 9911577652 and resume bhi upload karna".
            // Since WhatsApp API cannot directly send file attachments from web without user interaction,
            // we will generate a formatted message including all details, and also provide a downloadable link for the uploaded resume (data URL)
            // so that the recruiter can view it. Alternative: we open WhatsApp with pre-filled text and also attach instructions to send resume manually.
            // To fully comply: user will click on the WhatsApp link, and the message includes a note that resume is attached separately via a temporary link OR we use a clever method:
            // We generate a data URL of the resume file, and include that link in the WhatsApp message (though long). Better: we create a short lived blob URL and include it in the message.
            // Since the recruiter receives the message on WhatsApp, they can click the link and download the resume. That satisfies "resume upload and send".
            const generateWhatsAppMessage = async () => {
                // Basic validation before generating message
                if (!formData.fullName.trim()) return "❌ Name is required.";
                if (!formData.email.trim()) return "❌ Email is required.";
                if (!formData.phone.trim()) return "❌ Phone number is required.";
                if (!formData.jobPreference) return "❌ Please select a job preference.";
                
                let resumeLink = "No file uploaded";
                // If resume file exists, create a temporary blob URL (valid while page open)
                if (resumeFile) {
                    try {
                        // Create object URL for the file so that the recruiter can download it
                        const blobUrl = URL.createObjectURL(resumeFile);
                        resumeLink = blobUrl;
                        // Note: the URL will be valid only if the receiver clicks it while the sender's session is active? 
                        // Actually, the link is a blob:// URL which only works on the same browser instance. Better to use a placeholder and encourage user to send manually?
                        // To truly deliver resume: We'll instruct the applicant to also manually attach the resume after clicking WhatsApp link.
                        // However requirement says: "jab aap whatsapp pa jay do aapna resume bhi upload kalna and all detail send on whatsapp".
                        // So we can combine: generate the text message with all details + a note: "Resume file name: [filename]. Please find attached in this WhatsApp chat."
                        // But since the resume is not automatically attached, I'll implement a mechanism: 
                        // Provide a direct WhatsApp link with message and then applicant can upload resume manually in WhatsApp chat.
                        // But we also show that file is selected, and they can send as a document in WhatsApp manually.
                        // Alternative robust: Instead of blob link, we include a note to upload resume after opening chat. 
                        // But to make it user friendly, we also show a "copy details & open WhatsApp" style. I'll add a better flow:
                        // I'll generate message with all info and mention that resume file is ready — user can manually attach it in WhatsApp.
                        // And additionally we provide a direct download link for their own reference.
                        // But final requirement: send all details + resume on WhatsApp. Since web WhatsApp cannot auto-send files without user action, we instruct to attach file.
                        // This meets functional expectation in real-world scenario.
                        return `📄 *Resume Info*: File "${resumeFile.name}" (${(resumeFile.size / 1024).toFixed(2)} KB). Please manually attach this resume file in WhatsApp after opening this chat.`;
                    } catch(e) {
                        resumeLink = "Could not generate link";
                    }
                }
                return resumeLink;
            };
            
            // Main submit handler: Build WhatsApp URL and open it with formatted details.
            const handleSubmit = async (e) => {
                e.preventDefault();
                
                // Clear previous status
                setSubmitStatus({ type: '', message: '' });
                
                // Validate all required fields
                if (!formData.fullName.trim()) {
                    setSubmitStatus({ type: 'error', message: 'Please enter your full name.' });
                    return;
                }
                if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
                    setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' });
                    return;
                }
                if (!formData.phone.trim() || !/^[\d\s+\-()]{8,20}$/.test(formData.phone.replace(/\s/g, ''))) {
                    setSubmitStatus({ type: 'error', message: 'Please enter a valid phone number (digits only, min 8 digits).' });
                    return;
                }
                if (!formData.jobPreference) {
                    setSubmitStatus({ type: 'error', message: 'Please select a job preference.' });
                    return;
                }
                if (!resumeFile) {
                    setSubmitStatus({ type: 'error', message: 'Please upload your resume (PDF/DOC/DOCX/TXT/Image).' });
                    return;
                }
                
                setIsSubmitting(true);
                
                try {
                    // Prepare detailed message with all info
                    const jobLabel = getJobLabel(formData.jobPreference);
                    const currentDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
                    
                    let message = `*📋 NEW JOB APPLICATION* 🧑‍💼\n\n`;
                    message += `*Name:* ${formData.fullName.trim()}\n`;
                    message += `*Email:* ${formData.email.trim()}\n`;
                    message += `*Phone:* ${formData.phone.trim()}\n`;
                    message += `*Job Preference:* ${jobLabel}\n`;
                    message += `*Additional Message:* ${formData.additionalMessage.trim() || '—'}\n`;
                    message += `*Resume File:* ${resumeFile.name} (${(resumeFile.size / 1024).toFixed(2)} KB)\n`;
                    message += `*Application Date:* ${currentDate}\n\n`;
                    message += `🔔 *Action Required:* Please find the applicant's resume attached separately in this chat. Applicant has prepared the file. Kindly download/check. Thank you!`;
                    
                    // Encode message for WhatsApp (URL encoding)
                    const encodedMessage = encodeURIComponent(message);
                    const whatsappUrl = `https://wa.me/${TARGET_PHONE}?text=${encodedMessage}`;
                    
                    // Open WhatsApp in new tab (or redirect)
                    window.open(whatsappUrl, '_blank');
                    
                    // Also, optionally create a data URL of resume to give user option to manually attach? But user now can upload resume after chat opens
                    // Show success message
                    setSubmitStatus({ 
                        type: 'success', 
                        message: `✅ Form details prepared! WhatsApp chat opened with recruiter. Please manually attach your resume "${resumeFile.name}" in the WhatsApp chat to complete the application.` 
                    });
                    
                    // Optional: reset form? but keep data for user convenience, but not mandatory. We'll keep form filled.
                    // However we can optionally show that resume remains selected. No auto clear.
                } catch (error) {
                    console.error(error);
                    setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
                } finally {
                    setIsSubmitting(false);
                }
            };
            
            // Reset file input programmatically if needed
            const clearFile = () => {
                setResumeFile(null);
                setFileName('');
                if (fileInputRef.current) fileInputRef.current.value = '';
                setSubmitStatus({ type: '', message: '' });
            };
            
            return (
                <div className="max-w-3xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-5 md:px-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                            <i className="fab fa-whatsapp text-green-400 text-2xl"></i>
                            Job Application Form
                        </h1>
                        <p className="text-indigo-100 text-sm mt-1">Fill your details, upload resume & send via WhatsApp</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        {/* Full Name */}
                        <div className="space-y-1">
                            <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                                <i className="fas fa-user text-indigo-500 mr-2"></i>Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="e.g. Rahul Sharma"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition bg-gray-50 focus:bg-white"
                                required
                            />
                        </div>
                        
                        {/* Email */}
                        <div className="space-y-1">
                            <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                                <i className="fas fa-envelope text-indigo-500 mr-2"></i>Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition bg-gray-50 focus:bg-white"
                                required
                            />
                        </div>
                        
                        {/* Phone Number */}
                        <div className="space-y-1">
                            <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                                <i className="fas fa-phone-alt text-indigo-500 mr-2"></i>Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+91 9876543210"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition bg-gray-50 focus:bg-white"
                                required
                            />
                            <p className="text-xs text-gray-400 mt-1">Include country code for best reach</p>
                        </div>
                        
                        {/* Job Preference Dropdown */}
                        <div className="space-y-1">
                            <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                                <i className="fas fa-briefcase text-indigo-500 mr-2"></i>Job Preference <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="jobPreference"
                                value={formData.jobPreference}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none bg-gray-50 focus:bg-white cursor-pointer"
                                required
                            >
                                {jobOptions.map(opt => (
                                    <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Additional Message */}
                        <div className="space-y-1">
                            <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                                <i className="fas fa-comment-dots text-indigo-500 mr-2"></i>Additional Message (Optional)
                            </label>
                            <textarea
                                name="additionalMessage"
                                rows="3"
                                value={formData.additionalMessage}
                                onChange={handleInputChange}
                                placeholder="Tell us about your experience, portfolio, or anything you'd like to share..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none resize-none bg-gray-50 focus:bg-white"
                            ></textarea>
                        </div>
                        
                        {/* Resume Upload */}
                        <div className="space-y-2">
                            <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                                <i className="fas fa-file-alt text-indigo-500 mr-2"></i>Upload Resume <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                                <label className={`flex-1 cursor-pointer bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-3 px-4 text-center transition hover:border-indigo-400 hover:bg-indigo-50 ${resumeFile ? 'bg-green-50 border-green-300' : ''}`}>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                                        className="hidden"
                                    />
                                    <div className="flex items-center justify-center gap-2 text-gray-600">
                                        <i className={`fas ${resumeFile ? 'fa-check-circle text-green-600' : 'fa-cloud-upload-alt text-indigo-500'}`}></i>
                                        <span className="font-medium">
                                            {resumeFile ? `Selected: ${fileName}` : 'Choose file (PDF, DOC, DOCX, JPG, PNG up to 5MB)'}
                                        </span>
                                    </div>
                                </label>
                                {resumeFile && (
                                    <button
                                        type="button"
                                        onClick={clearFile}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium bg-red-50 px-3 py-2 rounded-lg transition"
                                    >
                                        <i className="fas fa-trash-alt mr-1"></i> Remove
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-gray-400">Max 5MB. Accepted formats: PDF, Word, Images, TXT.</p>
                        </div>
                        
                        {/* Status Message */}
                        {submitStatus.message && (
                            <div className={`p-3 rounded-xl flex items-start gap-2 text-sm ${submitStatus.type === 'error' ? 'bg-red-50 text-red-700 border-l-4 border-red-500' : 'bg-green-50 text-green-700 border-l-4 border-green-500'}`}>
                                <i className={`fas ${submitStatus.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'} mt-0.5`}></i>
                                <span>{submitStatus.message}</span>
                            </div>
                        )}
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3.5 rounded-xl font-bold text-white text-lg transition-all shadow-md flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-lg transform hover:-translate-y-0.5'}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Processing...
                                </>
                            ) : (
                                <>
                                    <i className="fab fa-whatsapp text-xl"></i> Send Application via WhatsApp
                                </>
                            )}
                        </button>
                        
                        <div className="text-center text-xs text-gray-400 border-t pt-4 mt-2">
                            <i className="fas fa-shield-alt mr-1"></i> Your details will be shared with recruiter on WhatsApp +91 {TARGET_PHONE}. Resume will be manually attached after opening chat.
                        </div>
                    </form>
                    
                    {/* Optional info footer */}
                    <div className="bg-indigo-50 px-6 py-3 text-xs text-indigo-800 flex justify-between flex-wrap gap-2">
                        <span><i className="fas fa-check-circle mr-1"></i> All fields marked * are required</span>
                        <span><i className="fas fa-file-upload mr-1"></i> Resume required for submission</span>
                    </div>
                </div>
            );
        };
        
        // Render the app
        ReactDOM.createRoot(document.getElementById('root')).render(<JobApplicationForm />);
    </script>
</body>
</html>