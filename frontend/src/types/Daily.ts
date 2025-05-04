export type Daily = {
  date: string;
  start_date: string;
  end_date: string;
  bleeding_level: 0 | 1 | 2 | 3 | 4 | 5;
  pain_level: 0 | 1 | 2 | 3 | 4 | 5;
  symptom: number[];
  hospital_reservation: {
    reservation_date: string;
    purpose: string;
  };
  medication: {
    injection_time: string;
    memo: string;
  };
};
