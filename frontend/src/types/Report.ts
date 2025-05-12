import { Date } from "./Period";

export type PeriodAlert = {
  menstrual_is_normal: boolean;
  message: string;
};

export type RecentPeriodInfo = {
  average_cycle: number;
  average_period: number;
  is_cycle_normal: boolean;
  is_period_normal: boolean;
};

export type OvulationInfo = {
  date: string;
  value: number;
};

export type Ovulation = {
  normal: 1 | 2 | 3;
  spike: OvulationInfo[];
  personal_data: OvulationInfo[];
};

export type PeriodInfo = Date & {
  period: number;
};

export type RecentPeriod = {
  average_cycle: number;
  max_cycle: number;
  cycle_record: PeriodInfo[];
};

export type MedicineInfo = {
  name: string;
};

export type RecentMedicine = {
  today_medicine: MedicineInfo[];
  medicine_record: MedicineInfo[];
};

export type Report = {
  menstrual: {
    bleeding_level: string;
    anomal: boolean;
    symptom: string;
  };
  stress: {
    stress: string;
    anomal: boolean;
  };
};
