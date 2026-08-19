import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateInput = ({ value, onChange, error, min }) => {
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 1 && day !== 2;
  };

  return (
    <div className="field">
      <label htmlFor="date">Fecha:</label>

      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={(date) =>
          onChange({
            target: {
              id: "date",
              value: date.toISOString().split("T")[0],
            },
          })
        }
        filterDate={isWeekday}
        minDate={min ? new Date(min) : new Date()}
        dateFormat="dd/MM/yyyy"
        placeholderText="Selecciona una fecha"
        id="date"
        className={`input ${error ? "error" : ""}`}
      />

      {error && <span className="error-text">{error}</span>}
    </div>
  );
};
