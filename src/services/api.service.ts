import axios from "axios";

class ApiService {
  private baseURL = "/mocks";

  // Helper method to simulate network delay
  private async simulateDelay<T>(data: T, delay: number = 500): Promise<T> {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return data;
  }

  // Generic get method with delay
  async get(endpoint: string, delay: number = 500) {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`);
      return await this.simulateDelay(response.data, delay);
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Get company types
  async getCompanyTypes(delay: number = 500) {
    const data = await this.get("/companyTypes.json", delay);
    return data.companyTypes;
  }

  // Get countries
  async getCountries(delay: number = 500) {
    const data = await this.get("/countries.json", delay);
    return data.countries;
  }

  // Get states based on country
  async getStates(countryCode: string, delay: number = 500) {
    const data = await this.get("/states.json", delay);
    return data[countryCode] || [];
  }

  // Get currencies
  async getCurrencies(delay: number = 500) {
    const data = await this.get("/currencies.json", delay);
    return data.currencies;
  }

  // Get services
  async getServices(delay: number = 500) {
    const data = await this.get("/services.json", delay);
    return data.services;
  }

  // Get pricing models
  async getPricingModels(delay: number = 500) {
    const data = await this.get("/pricingModels.json", delay);
    return data.pricingModels;
  }

  // Submit form
  async submitForm(formData: any, delay: number = 1500) {
    await this.simulateDelay(null, delay);
    return {
      success: true,
      message: "Form submitted successfully",
      data: formData,
      submissionId: `SUB_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "pending_review",
    };
  }
}

export const apiService = new ApiService();
