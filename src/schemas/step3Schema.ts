import { z } from "zod";

export const step3Schema = z.object({
  services: z.array(z.string()).min(1, "Select at least one service"),
  pricingModel: z.enum(["subscription", "one-time", "pay-per-use"], {
    message: "Pricing model is required",
  }),
  currency: z.string().min(1, "Currency is required"),
  declaration: z.boolean().refine((val) => val === true, {
    message: "You must agree to the declaration",
  }),
  additionalNotes: z.string().optional(),
  finalDoc: z.string().nullable(),
});

export type Step3Data = z.infer<typeof step3Schema>;

export const step3InitialData: Step3Data = {
  services: [],
  pricingModel: "subscription",
  currency: "USD",
  declaration: false,
  additionalNotes: "",
  finalDoc: null,
};
