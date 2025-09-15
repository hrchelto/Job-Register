export interface JobApplication {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  javaExperience: string;
  graduationYear: string;
  currentLocation: string;
  preferredLocation: string;
  noticePeriod: string;
  previousCompany: string;
  relevantSkills: string;
  additionalComments: string;
  willingToRelocate: boolean;
  resumeUrl?: string;
  appliedAt?: string;
  status?: 'pending' | 'selected' | 'rejected';
  reviewedAt?: string;
  reviewNotes?: string;
}