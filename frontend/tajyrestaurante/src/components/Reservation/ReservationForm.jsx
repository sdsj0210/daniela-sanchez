import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { FormField } from "../FormField";
import { DateInput } from "../Inputs/DateInput";
import { TimeInput } from "../Inputs/TimeInput";
import { SuccessMessage } from "../SuccessMessage";

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

  if (!data.name.trim()) {
    errors.name = "Nombre obligatorio";
  }

  if (!data.email.includes("@")) {
    errors.email = "Email inválido";
  }

  if (!data.phone.trim()) {
    errors.phone = "Teléfono obligatorio";
  }

  if (!data.date) {
    errors.date = "Fecha obligatoria";
  }

  if (!data.hour) {
    errors.hour = "Hora obligatoria";
  }

  if (!data.guests || data.guests < 1 || data.guests > 10) {
    errors.guests = "Debe ser entre 1 y 10 personas";
  }

  if (!data.message.trim()) {
    errors.message = "Mensaje obligatorio";
  }

  setErrors(errors);

  return Object.keys(errors).length === 0;
};

export const ReservationForm = () => {
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [availability, setAvailability] = useState(null);

  const {
    formData,
    errors,
    success,
    handleChange,
    handleSubmit,
    handleReset,
  } = useForm(
    reservationInitial,
    validateReservation,

    async (data) => {
      setApiMessage("");
      setApiError("");
      setAvailability(null);

      try {
        const response = await fetch("/api/reservations.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        /*
         * La franja está llena o no tiene plazas suficientes.
         */
        if (response.status === 409) {
          setApiError(result.error || "No hay disponibilidad");
          setAvailability({
            disponibles: result.disponibles ?? 0,
          });

          throw new Error(result.error || "No hay disponibilidad");
        }

        /*
         * El backend ha rechazado algún dato.
         */
        if (response.status === 422) {
          const backendErrors = result.errors || {};

          const message =
            Object.values(backendErrors)[0] ||
            "Los datos introducidos no son válidos";

          setApiError(message);

          throw new Error(message);
        }

        /*
         * Cualquier otro error del servidor.
         */
        if (!response.ok) {
          const message =
            result.error || "No se pudo crear la reserva";

          setApiError(message);

          throw new Error(message);
        }

        /*
         * Reserva creada correctamente.
         */
        setApiMessage(result.message);
        setAvailability(result.aforo);

        console.log("Reserva creada:", result);
      } catch (error) {
        console.error("Error al crear la reserva:", error);

        /*
         * Si no hemos recibido un mensaje concreto del backend,
         * mostramos uno genérico.
         */
        if (!apiError) {
          setApiError(
            "No se pudo procesar la reserva. Inténtalo de nuevo.",
          );
        }

        throw error;
      }
    },
  );

  const handleGuestChange = (e) => {
    const value = e.target.value;

    if (
      value === "" ||
      (Number(value) >= 1 && Number(value) <= 10)
    ) {
      handleChange(e);
    }
  };

  const resetForm = () => {
    handleReset();
    setApiMessage("");
    setApiError("");
    setAvailability(null);
  };

  return (
    <main className="main-form">
      <h2>Reservá tu mesa</h2>

      {success && apiMessage && (
        <SuccessMessage
          message={`✨ ${apiMessage}`}
        />
      )}

      {success && availability && (
        <div className="reservation-status">
          <p>
            Aforo de esta franja:{" "}
            <strong>
              {availability.ocupadas}/{availability.capacidad}
            </strong>
          </p>

          <p>
            Quedan{" "}
            <strong>{availability.disponibles}</strong>{" "}
            plazas disponibles.
          </p>
        </div>
      )}

      {apiError && (
        <div className="reservation-error">
          <p>⚠️ {apiError}</p>

          {availability?.disponibles === 0 && (
            <p>
              Esta franja está completa. Selecciona otro horario.
            </p>
          )}
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

          <button
            type="button"
            className="btn-secondary"
            onClick={resetForm}
          >
            Limpiar
          </button>
        </div>
      </form>
    </main>
  );
};