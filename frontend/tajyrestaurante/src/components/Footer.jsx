import { Link } from "react-router-dom";
import { socialLinks, schedule } from "../data/restauranteData";

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-about">
        <h4>Tajy</h4>
        <p>
          Raíces fuertes, sabores profundos. Un lugar donde la tradición
          paraguaya y la creatividad cubana se encuentran.
        </p>
      </div>

      <div className="footer-social">
        <h4>Síguenos</h4>
        <div className="social-icons">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={social.icon} alt={social.name} />
            </a>
          ))}
        </div>
      </div>

      <div className="footer-hours">
        <h4>Horarios</h4>
        <ul>
          {schedule.map((item) => (
            <li key={item.day}>
              <span>{item.day}:</span> {item.hours}
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-links">
        <Link to="/politica-privacidad">Política de Privacidad</Link>
        <Link to="/politica-cookies">Política de Cookies</Link>
        <Link to="/aviso-legal">Aviso Legal</Link>
      </div>
    </footer>
  );
};
