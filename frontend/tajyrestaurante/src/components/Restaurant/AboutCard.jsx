export const AboutCard = ({ title, children, variant }) => {
  return (
    <div className={`card ${variant || ""}`}>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};
