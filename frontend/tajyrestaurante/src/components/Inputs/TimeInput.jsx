export const TimeInput = ({ value, onChange, error }) => {
  const generateHours = () => {
    const hours = [];

    for (let h = 13; h <= 23; h++) {
      hours.push(`${h.toString().padStart(2, "0")}:00`);

      if (h !== 23) {
        hours.push(`${h.toString().padStart(2, "0")}:30`);
      }
    }

    return hours;
  };

  const options = generateHours();

  return (
    <div className="field">
      <label htmlFor="hour">Hora:</label>

      <select
        id="hour"
        value={value}
        onChange={(e) =>
          onChange({
            target: {
              id: "hour",
              value: e.target.value,
            },
          })
        }
        className={`input ${error ? "error" : ""} ${
          !value ? "placeholder" : ""
        }`}
      >
        <option disabled value="">
          Selecciona una hora
        </option>

        {options.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>

      {error && <span className="error-text">{error}</span>}
    </div>
  );
};
