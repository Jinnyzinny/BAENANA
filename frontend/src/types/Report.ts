import { Default } from "./Default";
import { Date } from "./Period";

export type PeriodAlert = {
  menstrual_is_normal: boolean;
  message: string;
};

export type FullPeriodAlert = Default & {
  data: PeriodAlert;
};

export type RecentPeriodInfo = {
  cycle: number;
  period: number;
  is_cycle_normal: boolean;
  is_period_normal: boolean;
};

export type FullRecentPeriodInfo = Default & {
  data: RecentPeriodInfo;
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

export type FullOvulation = Default & {
  data: Ovulation;
};

export type PeriodInfo = Date & {
  period: number;
  cycle: number;
};

export type RecentPeriod = {
  average_cycle: number;
  max_cycle: number;
  cycle_record: PeriodInfo[];
};

export type FullRecentPeriod = Default & {
  data: RecentPeriod;
};

export type MedicineInfo = {
  name: string;
};

export type RecentMedicine = {
  today_medicine: MedicineInfo[];
  medicine_record: MedicineInfo[];
};

export type FullRecentMedicine = Default & {
  data: RecentMedicine;
};

export type Report = {
  menstrual: {
    bleeding_level: string;
    normal: boolean;
    symptom: string;
  };
  stress: {
    stress: string;
    normal: boolean;
  };
};

export type FullReport = Default & {
  data: Report;
};
