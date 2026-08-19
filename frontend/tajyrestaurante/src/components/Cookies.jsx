import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Cookies = () => {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setVisible(false);
  };

  const savePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-box">
      <h3>Configuración de privacidad</h3>

      <p>
        En Tajy utilizamos cookies para mejorar tu experiencia. Puedes aceptar
        todas, rechazarlas o gestionar tus preferencias.
      </p>

      <div className="cookie-actions">
        {!showSettings ? (
          <>
            <button className="btn-cookie" onClick={acceptCookies}>
              Aceptar todas
            </button>

            <button className="btn-cookie" onClick={rejectCookies}>
              Rechazar
            </button>

            <button
              className="btn-cookie"
              onClick={() => setShowSettings(true)}
            >
              Gestionar preferencias
            </button>
          </>
        ) : (
          <>
            <div className="cookie-settings">
              <label>
                <input type="checkbox" disabled checked />
                Cookies necesarias (siempre activas)
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      analytics: e.target.checked,
                    })
                  }
                />
                Cookies analíticas
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      marketing: e.target.checked,
                    })
                  }
                />
                Cookies de marketing
              </label>
            </div>

            <div className="cookie-actions">
              <button className="btn-cookie" onClick={savePreferences}>
                Guardar preferencias
              </button>

              <button
                className="btn-cookie"
                onClick={() => setShowSettings(false)}
              >
                Volver
              </button>
            </div>
          </>
        )}
      </div>

      <div className="cookie-footer">
        <Link to="/politica-cookies">Política de Cookies</Link>
      </div>
    </div>
  );
};
