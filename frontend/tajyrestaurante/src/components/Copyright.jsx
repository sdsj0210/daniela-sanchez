export const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer-copy">
      &copy; {currentYear} Tajy Restaurante <br />
      Todos los derechos reservados.
    </div>
  );
};
