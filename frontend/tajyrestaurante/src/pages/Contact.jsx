import { Maps } from "../components/Maps";
import { ContactForm } from "../components/Contact/ContactForm";
import { ContactInfo } from "../components/Contact/ContactInfo";
import { contactData } from "../data/contactData";

export const Contact = () => {
  return (
    <div className="contact page-container">
      <h2 className="title">Comunícate con nosotros</h2>
      <div className="double-grid">
        <ContactForm />
        <ContactInfo data={contactData} />
      </div>
      <Maps />
    </div>
  );
};
