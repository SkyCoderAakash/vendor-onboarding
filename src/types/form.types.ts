export interface Step1Data {
  companyName: string;
  companyType: string;
  registrationNumber: string;
  establishedDate: string;
  employeeCount: number | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyLogo: string | null;
}

export interface Step2Data {
  address: string;
  country: string;
  state: string;
  zipCode: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  bankProof: string | null;
}

export interface Step3Data {
  services: string[];
  pricingModel: string;
  currency: string;
  declaration: boolean;
  additionalNotes: string;
  finalDoc: string | null;
}

export interface FormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
}
