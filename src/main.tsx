import ReactDOM from "react-dom/client";
import App from "./routers";
import "./styles/index.css";
import { ThemeProvider } from "./utils/contexts/theme-provider";
import { TokenProvider } from "./utils/contexts/token";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </TokenProvider>
);
