import { Outlet, useNavigate } from "react-router-dom";

export const LegalLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-wrapper">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <Outlet />
    </div>
  );
};
