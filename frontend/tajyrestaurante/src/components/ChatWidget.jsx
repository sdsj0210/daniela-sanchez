import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (messages.length === 0) {
      const data = JSON.parse(localStorage.getItem("chat"));
      if (data && data.length > 0) {
        setMessages(data);
      } else {
        console.log(
          "No hay mensajes previos, mostrando mensaje de bienvenida...",
        );
        const timer = setTimeout(() => {
          const welcome = {
            texto: "👋 ¡Hola! Bienvenido a TAJY. ¿En qué puedo ayudarte?",
            autor: "bot",
          };
          setMessages([welcome]);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } else {
      localStorage.setItem("chat", JSON.stringify(messages));
    }
  }, [messages]);

  const enviar = () => {
    if (!input.trim()) return;

    const texto = input.toLowerCase();

    const mensajeUsuario = {
      texto: input,
      autor: "user",
    };

    setMessages((prev) => [...prev, mensajeUsuario]);

    let respuesta = "";

    if (texto.includes("hola")) {
      respuesta = "👋 ¡Hola! ¿Quieres ver el menú o hacer una reserva?";
    } else if (texto.includes("menu")) {
      respuesta = "📋 Puedes ver nuestro menú en la sección 'Menú'";
    } else if (texto.includes("reserva")) {
      respuesta = "📅 Puedes hacer una reserva en la sección 'Reservas'";
    } else {
      respuesta =
        "🤔 No entendí eso, pero puedo ayudarte con el menú o reservas.";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { texto: respuesta, autor: "bot" }]);
    }, 1000);

    setInput("");
  };
  return (
    <div className="chat-container">
      <button className="chat-button" onClick={() => setOpen(!open)}>
        💬
      </button>

      {open && (
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <p key={i} className={m.autor === "bot" ? "msg-bot" : "msg-user"}>
                {m.texto}
              </p>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
            />
            <button onClick={enviar}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};
