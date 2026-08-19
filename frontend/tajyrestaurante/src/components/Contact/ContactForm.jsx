import { useForm } from "../../hooks/useForm";
import { FormField } from "../FormField";
import { SuccessMessage } from "../SuccessMessage";
import emailjs from "@emailjs/browser";

const contactInitial = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const validateContact = (data, setErrors) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Nombre obligatorio";
  if (!data.lastName.trim()) errors.lastName = "Apellido obligatorio";
  if (!data.email.includes("@")) errors.email = "Email inválido";
  if (!data.phone.trim()) errors.phone = "Teléfono obligatorio";
  if (!data.message.trim()) errors.message = "Mensaje obligatorio";
  setErrors(errors);
  return Object.keys(errors).length === 0;
};

export const ContactForm = () => {
  const { formData, errors, success, handleChange, handleSubmit, handleReset } =
    useForm(contactInitial, validateContact, async (data) => {
      await emailjs.send(
        "service_t8t9n8w",
        "template_n7ww70j",
        data,
        "Cqs446_kXWoRk8w7k",
      );
    });

  return (
    <main className="main-form">
      <h2>Dejanos un mensaje</h2>
      {success && (
        <SuccessMessage message="✨ ¡Gracias por contactar con Tajy! Te responderemos pronto." />
      )}
      <form onSubmit={handleSubmit} className="form" noValidate>
        <fieldset>
          <legend>Tus Datos</legend>
          <FormField
            id="name"
            label="Nombre"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            autoComplete="given-name"
          />
          <FormField
            id="lastName"
            label="Apellido"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            autoComplete="family-name"
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
          <FormField
            id="message"
            label="Mensaje"
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            autoComplete="off"
          />
        </fieldset>
        <div className="buttons">
          <button type="submit" className="btn-primary">
            Enviar
          </button>
          <button type="button" className="btn-secondary" onClick={handleReset}>
            Limpiar
          </button>
        </div>
      </form>
    </main>
  );
};
