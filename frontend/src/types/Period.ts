import { Default } from "./Default";

export type FullDate = Default & {
  data: Date;
};

export type Date = {
  end_date: string;
  start_date: string;
};

export type FullDday = Default & {
  data: Dday;
};

export type Dday = {
  childbearing_period: string;
  ovulation_day: string;
  pms: string;
  predicted_menstrual: Date;
  recorded_menstrual: Date;
};

export type Symptom = {
  date: string;
  bleeding_level: 0 | 1 | 2 | 3 | 4 | 5;
  pain_level: 0 | 1 | 2 | 3 | 4 | 5;
  symptoms: string[];
};

export type Period = Date & {
  cycle_id: number;
  detail: Symptom[];
};

export type FullPeriod = Default & {
  data: Period[];
};
