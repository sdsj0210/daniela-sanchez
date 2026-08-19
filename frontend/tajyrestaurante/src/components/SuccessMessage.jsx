import { useEffect, useRef } from "react";

export const SuccessMessage = ({ message, onShow }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (onShow) onShow();
  }, [onShow]);

  return (
    <div ref={ref} className="success">
      {message}
    </div>
  );
};
