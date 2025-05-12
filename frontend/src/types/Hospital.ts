import { Default } from "./Default";

export type HospitalAlert = Default & {
  data: { reservation: string };
};

export type HospitalReservation = {
  reservation_id: number;
  hospital_name: string;
  reservation_date_time: string;
  purpose: string;
  status: "예약 완료" | "방문 완료";
};
