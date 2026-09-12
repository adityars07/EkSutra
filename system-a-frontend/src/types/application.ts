export interface ApplicationFormInput {
  applicantName: string;
  citizenId: string;
  dateOfBirth: string;
  schemeCode: string;
  consentGiven: boolean;
}

export interface ApplicationRecord {
  id?: string;
  applicationId: string;
  citizenId: string;
  applicantName: string;
  fname?: string;
  lname?: string;
  dob?: string;
  schemeCode: string;
  consentGiven: boolean;
  status: 'RECEIVED' | 'ELIGIBILITY_VERIFIED' | string;
  crossSystemVerification: 'NOT_INITIATED' | 'COMPLETED' | string;
  overallEligibility?: boolean | null;
  correlationId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SchemeOption {
  code: string;
  name: string;
  department: string;
  benefit: string;
  category: string;
}
