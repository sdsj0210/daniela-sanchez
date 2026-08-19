export const Maps = () => {
  const address = "Calle Triana 50, Las Palmas de Gran Canaria";
  return (
    <div className="map-wrapper">
      <iframe
        title="Ubicación Tajy Restaurante"
        src="https://www.google.com/maps?q=Calle+Triana+50+Las+Palmas+de+Gran+Canaria&z=16&output=embed"
        className="map"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="map-info">
        <h3>📍 Tajy Restaurante</h3>
        <p>{address}</p>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Calle+Triana+50+Las+Palmas+de+Gran+Canaria"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Cómo llegar
        </a>
      </div>
    </div>
  );
};
