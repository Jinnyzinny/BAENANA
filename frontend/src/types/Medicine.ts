import { Default } from "./Default";

export type MedicineAlert = Default & {
  data: { medicine: string };
};

export type FullMedicine = Default & {
  data: Medicine[];
};

export type Medicine = {
  medication_id: number;
  name: string;
  start_date: string;
  end_date: string;
  time_taken: string[];
  memo: string;
};
