export type MedicineAlert = {
  medicine: string;
};

export type Medicine = {
  medication_id: number;
  name: string;
  start_date: string;
  end_date: string;
  time_taken: string[];
  memo: string;
};
