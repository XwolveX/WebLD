import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Client-side-only validation, mirroring the original static form (no
   backend) — see the form-note copy for the same caveat shown to users. */
export function useContactForm() {
  const [invalidFields, setInvalidFields] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const nextInvalid = {};
    let valid = true;

    form.querySelectorAll('[required]').forEach((field) => {
      let fieldValid = field.value.trim().length > 0;
      if (field.type === 'email' && fieldValid) {
        fieldValid = EMAIL_RE.test(field.value.trim());
      }
      if (!fieldValid) {
        nextInvalid[field.name] = true;
        valid = false;
      }
    });

    setInvalidFields(nextInvalid);
    setSubmitted(valid);
  };

  return { invalidFields, submitted, handleSubmit };
}
