export interface Patient {
  id: number;
  signUpDate: string;
  name: string;
  email: string;
  phone: string;
  lastSeen: string;
  location: string;
  device: "iOS" | "Android";
  status: "Verified" | "Pending";
}

export interface StatCard {
  title: string;
  value: number;
  change: number;
  icon: string;
  color: string;
}

export interface ChartData {
  month: string;
  consultations?: number;
  prescriptions?: number;
  doctors?: number;
  patients?: number;
}

// API response types
export interface LoginResponse {
  data: {
    user: unknown;
    token: string;
    token_type: string;
  };
  message: string;
  status: number;
}

export interface DashboardStatsResponse {
  data: {
    patients: {
      total_patients: number;
      patients_this_week: number;
      patients_last_week: number;
      patients_percentage_since_last_week: number;
      positive: boolean;
    };
    doctors: {
      total_doctors: number;
      doctors_this_week: number;
      doctors_last_week: number;
      doctors_percentage_since_last_week: number;
      positive: boolean;
    };
    pending_reviews: {
      total_pending_reviews: number;
      pending_reviews_this_week: number;
      pending_reviews_last_week: number;
      pending_reviews_percentage_since_last_week: number;
      positive: boolean;
    };
    consultations: {
      total_consultations: number;
      consultations_this_week: number;
      consultations_last_week: number;
      consultations_percentage_since_last_week: number;
      positive: boolean;
    };
    prescriptions: {
      total_prescriptions: number;
      prescriptions_this_week: number;
      prescriptions_last_week: number;
      prescriptions_percentage_since_last_week: number;
      positive: boolean;
    };
    total_consultations: number;
    active_doctors_vs_patients: {
      categories: string[];
      series: Array<{ name: string; data: number[] }>;
    };
    consultationOverTime: Array<{ month: string; count: number }>;
    prescriptionVolumeTrend: Array<{ month: string; count: number }>;
    top_specialities_in_demand: Array<{ speciality: string; count: number }>;
  };
  message: string;
  status: number;
}

export interface PatientsIndexResponse {
  data: {
    current_page: number;
    data: Array<{
      id: number;
      user_id: number;
      first_name: string | null;
      middle_name: string | null;
      last_name: string | null;
      gender: string | null;
      phone: string | null;
      patient_id: string;
      email: string | null;
      parent_id: string;
      relationship: string | null;
      dob: string | null;
      marital_status: string | null;
      address1: string | null;
      address2: string | null;
      state: string | null;
      lga: string | null;
      attended_to: number;
      primary_account: number;
      created_at: string;
      status: string;
      last_seen: string | null;
      user: {
        id: number;
        first_name: string | null;
        last_name: string | null;
        email: string | null;
        dob: string | null;
        phone: string | null;
        state: string | null;
        lga: string | null;
        address1: string | null;
        address2: string | null;
        is_new_user: number;
        email_verified_at: string | null;
        phone_verified_at: string | null;
        image: string | null;
        agreed_to_terms: number;
        oauth_platform: string | null;
        is_biometric_enabled: number;
        biometric_token: string | null;
        device_type: string | null;
        device_token: string | null;
        app_version: string | null;
        os_version: string | null;
        active_patient_id: number | null;
        devices: Array<{ id: number; platform: string | null }> | [];
      };
    }>;
    per_page: number;
    total: number;
  };
  message: string;
  status: number;
}
