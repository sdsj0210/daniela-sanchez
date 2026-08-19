import { ReservationForm } from "../components/Reservation/ReservationForm";
import { Maps } from "../components/Maps";
import { ReservationInfo } from "../components/Reservation/ReservationInfo";
import { contactData } from "../data/contactData";

export const Reservation = () => {
  return (
    <div className="reservation page-container">
      <h2 className="title">Haz tu reserva</h2>
      <div className="double-grid">
        <ReservationForm />
        <ReservationInfo data={contactData} />
      </div>
      <Maps />
    </div>
  );
};
