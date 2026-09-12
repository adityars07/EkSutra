export interface ApplicationFormInput {
  applicationId?: string;
  beneficiaryId: string;
  fname: string;
  lname: string;
  dob: string;
  schemeCode: string;
  consentGiven: boolean;

  // Backward compatibility fields
  citizenId?: string;
  applicantName?: string;
  dateOfBirth?: string;
}

export interface ApplicationRecord {
  id?: string;
  applicationId: string;
  beneficiaryId?: string;
  citizenId?: string;
  applicantName?: string;
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
