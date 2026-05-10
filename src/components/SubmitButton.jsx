import { useState } from "react";

export default function SubmitButton() {
  const [hoverState, setHoverState] = useState("Awaiting pointer movement");

  function handleEnter() {
    console.log("Mouse Entering");
    setHoverState("Mouse entered the submit button");
  }

  function handleLeave() {
    console.log("Mouse Exiting");
    setHoverState("Mouse exited the submit button");
  }

  return (
    <section className="panel" aria-labelledby="submit-button-title">
      <h2 id="submit-button-title">SubmitButton</h2>
      <p className="panel-description">
        Exposes hover entry and exit events for the submit control. Connected to
        App as the button interaction component.
      </p>

      <button
        className="submit-button"
        type="button"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        Submit Password
      </button>

      <p className="status-line" aria-live="polite">
        {hoverState}
      </p>
    </section>
  );
}