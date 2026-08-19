import { useState, useEffect } from "react";

export const useForm = (initialValues, validate, onSubmit) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : initialValues;
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validate(formData, setErrors);
    if (!valid) return;
    await onSubmit(formData);
    setFormData(initialValues);
    setErrors({});
    setSuccess(true);
  };

  const handleReset = () => {
    setFormData(initialValues);
    setErrors({});
    setSuccess(false);
  };

  return { formData, errors, success, handleChange, handleSubmit, handleReset };
};
