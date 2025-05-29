import { Default } from "./Default";

export type FullDaily = Default & {
  data: Daily;
};

export type Daily = {
  date: string;
  prediction: boolean;
  menstrual_cycle: {
    start_date: string;
    end_date: string;
  };
  menstrual_daily_log: {
    daily_id: number;
    bleeding_level: 0 | 1 | 2 | 3 | 4 | 5;
    pain_level: 0 | 1 | 2 | 3 | 4 | 5;
    symptom: string[];
  };
  hospital_reservation: {
    reservation_id: number;
    hospital_name: string;
    reservation_date: string;
    purpose: string;
  }[];
  medication: {
    medication_id: number;
    medication_name: string;
    start_date: string;
    end_date: string;
    injection_time: string[];
    memo: string;
  }[];
};
