export type Date = {
  start_date: string;
  end_date: string;
};

export type Dday = {
  menstrual: Date;
  childbearing_period: string;
  ovulation_day: string;
  PMS: string;
};

export type Symtom = {
  date: string;
  bleeding_level: 0 | 1 | 2 | 3 | 4 | 5;
  pain_level: 0 | 1 | 2 | 3 | 4 | 5;
  symptoms: string[];
};

export type Period = Date & {
  cycle_id: number;
  detail: Symtom[];
};
