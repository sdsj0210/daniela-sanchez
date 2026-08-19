export const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  ...props
}) => (
  <div className="field">
    <label htmlFor={id}>{label}:</label>
    {type === "textarea" ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        className={error ? "error" : ""}
        autoComplete={autoComplete}
        {...props}
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={"input " + (error ? "error" : "")}
        autoComplete={autoComplete}
        {...props}
      />
    )}
    {error && <span className="error-text">{error}</span>}
  </div>
);
