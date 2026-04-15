import { z } from "zod";

export const step2Schema = z.object({
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().optional(),
  zipCode: z.string().min(1, "ZIP / PIN code is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  ifscCode: z.string().optional(),
  bankProof: z.string().nullable(),
});

export type Step2Data = z.infer<typeof step2Schema>;

export const step2InitialData: Step2Data = {
  address: "",
  country: "",
  state: "",
  zipCode: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  bankProof: null,
};
