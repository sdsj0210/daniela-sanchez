export const ReservationInfo = ({ data }) => {
  return (
    <div className="info">
      <h1>Para reservas de más de 10 personas llámanos: </h1>
      <a href={`tel:${data.phone}`} className="phone">
        {data.phone}
      </a>
    </div>
  );
};
