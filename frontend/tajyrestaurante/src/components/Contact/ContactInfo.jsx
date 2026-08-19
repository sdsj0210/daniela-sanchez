export const ContactInfo = ({ data }) => {
  return (
    <div className="info">
      <h4>{data.name}</h4>
      <p>Nos encantaría atenderte {data.schedule}</p>
      <h4>Puedes encotrarnos en: </h4>
      <p>{data.address}</p>
      <h4>Llamanos para más rapida atención al: </h4>
      <p className="phone">{data.phone}</p>
      <h4>O, aún mejor, ¡ven a visitarnos!</h4>
    </div>
  );
};
