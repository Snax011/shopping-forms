export default function DarkModeToggle({ darkMode, onToggle }) {
  const buttonText = darkMode ? "Toggle Light Mode" : "Toggle Dark Mode";

  return (
    <button type="button" className="mode-toggle-btn" onClick={onToggle}>
      {buttonText}
    </button>
  );
}