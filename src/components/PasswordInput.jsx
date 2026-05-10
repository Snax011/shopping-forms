import { useState } from "react";

export default function PasswordInput() {
  const [password, setPassword] = useState("");

  function handleChange(event) {
    console.log("Entering password...");
    setPassword(event.target.value);
  }

  return (
    <section className="panel" aria-labelledby="password-input-title">
      <h2 id="password-input-title">PasswordInput</h2>
      <p className="panel-description">
        Collects a password value and reports typing activity. Connected to App
        as the primary text entry component.
      </p>

      <label className="field-label" htmlFor="password-input">
        Password
      </label>
      <input
        id="password-input"
        className="password-input"
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Enter your password"
      />

      <p className="metric" aria-live="polite">
        Characters entered: {password.length}
      </p>
    </section>
  );
}