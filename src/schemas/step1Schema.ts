import { z } from "zod";

export const step1Schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyType: z.string().min(1, "Company type is required"),
  registrationNumber: z.string().optional(),
  establishedDate: z.string().optional(),
  employeeCount: z.number().nullable().optional(),
  contactName: z.string().min(1, "Contact person name is required"),
  contactEmail: z.string().min(1, "Email is required"),
  contactPhone: z.string().min(6, "Phone number must be at least 6 digits"),
  companyLogo: z.string().nullable(),
});

export type Step1Data = z.infer<typeof step1Schema>;

export const step1InitialData: Step1Data = {
  companyName: "",
  companyType: "",
  registrationNumber: "",
  establishedDate: "",
  employeeCount: null,
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  companyLogo: null,
};
