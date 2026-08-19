import { useForm } from "../../hooks/useForm";
import { FormField } from "../FormField";
import { DateInput } from "../Inputs/DateInput";
import { TimeInput } from "../Inputs/TimeInput";
import emailjs from "@emailjs/browser";
import { SuccessMessage } from "../SuccessMessage";
import { useCart } from "../../context/CartContext";

const today = new Date().toISOString().split("T")[0];

const reservationInitial = {
  name: "",
  email: "",
  phone: "",
  date: "",
  hour: "",
  guests: "",
  message: "",
};

const validateReservation = (data, setErrors) => {
  const errors = {};

  if (!data.name.trim()) errors.name = "Nombre obligatorio";
  if (!data.email.includes("@")) errors.email = "Email inválido";
  if (!data.phone.trim()) errors.phone = "Teléfono obligatorio";
  if (!data.date) errors.date = "Fecha obligatoria";
  if (!data.hour) errors.hour = "Hora obligatoria";

  if (data.hour) {
    const [h] = data.hour.split(":").map(Number);
    if (h < 13 || h > 23) {
      errors.hour = "Horario disponible de 13:00 a 23:00";
    }
  }

  if (!data.guests || data.guests < 1 || data.guests > 10)
    errors.guests = "Debe ser entre 1 y 10 personas";

  if (!data.message.trim()) errors.message = "Mensaje obligatorio";

  setErrors(errors);
  return Object.keys(errors).length === 0;
};

export const ReservationForm = () => {
  const { cartItems, clearCart } = useCart();

  const { formData, errors, success, handleChange, handleSubmit, handleReset } =
    useForm(
      reservationInitial,
      validateReservation,

      async (data) => {
        try {
          const total = cartItems
            .reduce(
              (acc, item) => acc + parseFloat(item.price.replace("€", "")),
              0,
            )
            .toFixed(2);
          await emailjs.send(
            "service_t8t9n8w",
            "template_wae7hw1",
            {
              ...data,
              cart: cartItems
                .map((item) => `${item.name} - ${item.price}`)
                .join("<br/>"),
              total: total + "€",
            },
            "Cqs446_kXWoRk8w7k",
          );
          clearCart();
          console.log("Carrito enviado:", cartItems);
        } catch (error) {
          console.error("Error al enviar la reserva:", error);
        }
      },
    );

  const handleGuestChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 1 && Number(value) <= 10)) {
      handleChange(e);
    }
  };

  return (
    <main className="main-form">
      <h2>Reservá tu mesa</h2>

      {success && (
        <SuccessMessage message="✨ ¡Tu reserva fue enviada! Te confirmaremos pronto." />
      )}

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>🛒 Tu pedido</h3>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-summary-item">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form" noValidate>
        <fieldset>
          <legend>Datos de la Reserva</legend>

          <FormField
            id="name"
            label="Nombre"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            autoComplete="given-name"
          />

          <FormField
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />

          <FormField
            id="phone"
            label="Teléfono"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            autoComplete="tel"
          />

          <DateInput
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
            min={today}
            id="date"
          />

          <TimeInput
            value={formData.hour}
            onChange={handleChange}
            error={errors.hour}
            id="hour"
          />

          <FormField
            id="guests"
            label="Personas"
            type="number"
            value={formData.guests}
            onChange={handleGuestChange}
            error={errors.guests}
            min="1"
            max="10"
          />

          <FormField
            id="message"
            label="Comentarios"
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            autoComplete="off"
          />
        </fieldset>

        <div className="buttons">
          <button type="submit" className="btn-primary">
            Reservar
          </button>
          <button type="button" className="btn-secondary" onClick={handleReset}>
            Limpiar
          </button>
        </div>
      </form>
    </main>
  );
};
