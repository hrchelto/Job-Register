import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { JobApplication } from '../types/application';

export const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<JobApplication, 'id' | 'appliedAt'>>({
    name: '',
    email: '',
    mobile: '',
    javaExperience: '',
    graduationYear: '',
    currentLocation: '',
    preferredLocation: '',
    noticePeriod: '',
    previousCompany: '',
    relevantSkills: '',
    additionalComments: '',
    willingToRelocate: false
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      await addDoc(collection(db, 'job_applications'), {
        ...formData,
        appliedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      });

      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        javaExperience: '',
        graduationYear: '',
        currentLocation: '',
        preferredLocation: '',
        noticePeriod: '',
        previousCompany: '',
        relevantSkills: '',
        additionalComments: '',
        willingToRelocate: false
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in the Junior Java Developer position. We'll review your application 
            and get back to you soon.
          </p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Apply for this Position</h3>
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="+91 9876543210"
            />
          </div>

          <div>
            <label htmlFor="javaExperience" className="block text-sm font-medium text-gray-700 mb-2">
              Java Experience *
            </label>
            <select
              id="javaExperience"
              name="javaExperience"
              required
              value={formData.javaExperience}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select experience level</option>
              <option value="0-6months">0-6 months</option>
              <option value="6months-1year">6 months - 1 year</option>
              <option value="1-2years">1-2 years</option>
              <option value="2-3years">2-3 years</option>
              <option value="3+years">3+ years</option>
            </select>
          </div>

          <div>
            <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
              Graduation Year *
            </label>
            <input
              type="number"
              id="graduationYear"
              name="graduationYear"
              required
              min="2015"
              max="2025"
              value={formData.graduationYear}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="2023"
            />
          </div>

          <div>
            <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700 mb-2">
              Current Location *
            </label>
            <input
              type="text"
              id="currentLocation"
              name="currentLocation"
              required
              value={formData.currentLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="City, State"
            />
          </div>

          <div>
            <label htmlFor="preferredLocation" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Work Location
            </label>
            <input
              type="text"
              id="preferredLocation"
              name="preferredLocation"
              value={formData.preferredLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Remote/City, State"
            />
          </div>

          <div>
            <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-700 mb-2">
              Notice Period
            </label>
            <select
              id="noticePeriod"
              name="noticePeriod"
              value={formData.noticePeriod}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select notice period</option>
              <option value="immediate">Immediate</option>
              <option value="15days">15 days</option>
              <option value="30days">30 days</option>
              <option value="60days">60 days</option>
              <option value="90days">90 days</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="previousCompany" className="block text-sm font-medium text-gray-700 mb-2">
            Previous Company (if any)
          </label>
          <input
            type="text"
            id="previousCompany"
            name="previousCompany"
            value={formData.previousCompany}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Company name or 'Fresher'"
          />
        </div>

        <div>
          <label htmlFor="relevantSkills" className="block text-sm font-medium text-gray-700 mb-2">
            Relevant Skills & Technologies
          </label>
          <textarea
            id="relevantSkills"
            name="relevantSkills"
            rows={3}
            value={formData.relevantSkills}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            placeholder="Java, Spring Boot, MySQL, etc."
          />
        </div>

        <div>
          <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Comments
          </label>
          <textarea
            id="additionalComments"
            name="additionalComments"
            rows={4}
            value={formData.additionalComments}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            placeholder="Tell us more about yourself, your projects, or anything else you'd like us to know..."
          />
        </div>

        <div className="border-t pt-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-red-900 mb-2">Relocation Requirement</h4>
            <p className="text-red-800 text-sm mb-3">
              This position is based in <strong>Chilakaluripet, Andhra Pradesh</strong>. 
              You must be willing to relocate to this location for employment.
            </p>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="willingToRelocate"
                checked={formData.willingToRelocate}
                onChange={(e) => setFormData(prev => ({ ...prev, willingToRelocate: e.target.checked }))}
                className="mt-1 w-4 h-4 text-red-600 border-red-300 rounded focus:ring-red-500"
                required
              />
              <span className="text-sm text-red-900">
                <strong>I confirm that I am willing to relocate to Chilakaluripet, Andhra Pradesh for this position. *</strong>
              </span>
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={submitStatus === 'submitting' || !formData.willingToRelocate}
            className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitStatus === 'submitting' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};