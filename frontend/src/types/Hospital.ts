import { Default } from "./Default";

export type HospitalAlert = Default & {
  data: { reservation: string };
};

export type FullHospitalReservation = Default & {
  data: HospitalReservation[];
};

export type HospitalReservation = {
  reservation_id: number;
  hospital_name: string;
  reservation_date_time: string;
  purpose: string;
  status: string;
};
