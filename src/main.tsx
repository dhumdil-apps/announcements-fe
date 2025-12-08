import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Render the app
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <h1 className="text-3xl font-bold text-blue-500">Announcements</h1>
    </StrictMode>,
  );
}
