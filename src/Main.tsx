import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./Components/CSS/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
