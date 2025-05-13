// 추후 변경되는 대로 재작성 필요
export type Daily = {
  date: string;
  start_date: string;
  end_date: string;
  bleeding_level: 0 | 1 | 2 | 3 | 4 | 5;
  pain_level: 0 | 1 | 2 | 3 | 4 | 5;
  symptom: number[];
  hospital_reservation: {
    hospital_name: string;
    reservation_date: string;
    purpose: string;
  };
  medication: {
    name: string;
    start_date: string;
    end_date: string;
    injection_time: string[];
    memo: string;
  };
};
