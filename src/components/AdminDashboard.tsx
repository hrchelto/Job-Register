import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  LogOut, 
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  Phone,
  User,
  FileText,
  MessageSquare
} from 'lucide-react';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { JobApplication } from '../types/application';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailType, setEmailType] = useState<'selected' | 'rejected'>('selected');
  const [customMessage, setCustomMessage] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const q = query(collection(db, 'job_applications'), orderBy('appliedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const apps: JobApplication[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        apps.push({
          id: doc.id,
          ...data,
          appliedAt: data.appliedAt?.toDate?.()?.toISOString() || data.appliedAt
        } as JobApplication);
      });
      
      setApplications(apps);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: 'selected' | 'rejected', notes?: string) => {
    try {
      const docRef = doc(db, 'job_applications', applicationId);
      await updateDoc(docRef, {
        status,
        reviewedAt: new Date().toISOString(),
        reviewNotes: notes || ''
      });
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status, reviewedAt: new Date().toISOString(), reviewNotes: notes }
            : app
        )
      );
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleStatusChange = (application: JobApplication, status: 'selected' | 'rejected') => {
    setSelectedApplication(application);
    setEmailType(status);
    setCustomMessage(status === 'selected' ? 
      'Congratulations! We are pleased to inform you that you have been selected for the Junior Java Developer position at Haryak Technologies. We will contact you soon with further details.' :
      'Thank you for your interest in the Junior Java Developer position at Haryak Technologies. After careful consideration, we have decided to move forward with other candidates. We appreciate the time you took to apply and wish you the best in your job search.'
    );
    setShowEmailModal(true);
  };

  const sendEmail = async () => {
    if (!selectedApplication) return;
    
    setSendingEmail(true);
    
    // Simulate email sending (in real implementation, you'd call your email service)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update application status
    await updateApplicationStatus(
      selectedApplication.id!,
      emailType,
      customMessage
    );
    
    setSendingEmail(false);
    setShowEmailModal(false);
    setSelectedApplication(null);
    setCustomMessage('');
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'selected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4" />
            Selected
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage job applications</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => !app.status || app.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Selected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'selected').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Job Applications</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{application.name}</div>
                        <div className="text-sm text-gray-500">{application.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.currentLocation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.javaExperience}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(application.appliedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(application.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      {(!application.status || application.status === 'pending') && (
                        <>
                          <button
                            onClick={() => handleStatusChange(application, 'selected')}
                            className="text-green-600 hover:text-green-900 inline-flex items-center gap-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Select
                          </button>
                          <button
                            onClick={() => handleStatusChange(application, 'rejected')}
                            className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && !showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Application Details</h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-blue-700">Full Name</label>
                      <p className="text-gray-900">{selectedApplication.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-700">Email</label>
                      <p className="text-gray-900">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-700">Mobile</label>
                      <p className="text-gray-900">{selectedApplication.mobile}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-700">Graduation Year</label>
                      <p className="text-gray-900">{selectedApplication.graduationYear}</p>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Professional Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-green-700">Java Experience</label>
                      <p className="text-gray-900">{selectedApplication.javaExperience}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-green-700">Previous Company</label>
                      <p className="text-gray-900">{selectedApplication.previousCompany || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-green-700">Notice Period</label>
                      <p className="text-gray-900">{selectedApplication.noticePeriod || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-purple-700">Current Location</label>
                      <p className="text-gray-900">{selectedApplication.currentLocation}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-purple-700">Preferred Location</label>
                      <p className="text-gray-900">{selectedApplication.preferredLocation || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-purple-700">Willing to Relocate</label>
                      <p className="text-gray-900">{selectedApplication.willingToRelocate ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>

                {/* Application Status */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-orange-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Application Status
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-orange-700">Applied Date</label>
                      <p className="text-gray-900">{formatDate(selectedApplication.appliedAt)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-orange-700">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedApplication.status)}</div>
                    </div>
                    {selectedApplication.reviewedAt && (
                      <div>
                        <label className="text-sm font-medium text-orange-700">Reviewed Date</label>
                        <p className="text-gray-900">{formatDate(selectedApplication.reviewedAt)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills and Comments */}
              <div className="mt-6 space-y-4">
                {selectedApplication.relevantSkills && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Relevant Skills
                    </h4>
                    <p className="text-gray-700">{selectedApplication.relevantSkills}</p>
                  </div>
                )}
                
                {selectedApplication.additionalComments && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Additional Comments
                    </h4>
                    <p className="text-gray-700">{selectedApplication.additionalComments}</p>
                  </div>
                )}

                {selectedApplication.reviewNotes && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-yellow-900 mb-2">Review Notes</h4>
                    <p className="text-gray-700">{selectedApplication.reviewNotes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {(!selectedApplication.status || selectedApplication.status === 'pending') && (
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleStatusChange(selectedApplication, 'selected')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Select Candidate
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedApplication, 'rejected')}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject Candidate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Send {emailType === 'selected' ? 'Selection' : 'Rejection'} Email
              </h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>To:</strong> {selectedApplication.name} ({selectedApplication.email})
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Subject:</strong> Application Status Update - Junior Java Developer Position
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Message
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Enter your custom message..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={sendEmail}
                  disabled={sendingEmail || !customMessage.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingEmail ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Send Email
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};