import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";


// CLIENT key loaded from mobile QR scan, pass this into the SDK if available
const urlString = window.location.href
const url = new URL(urlString)
const clientSideID = url.searchParams.get("clientsideid")

if (clientSideID){
   window.localStorage.setItem('CLIENTKEY', clientSideID)
}

if (window.localStorage.getItem('CLIENTKEY') == null) {
  const CLIENTKEY = prompt("Please enter your clientSideID");
  window.localStorage.setItem('CLIENTKEY', CLIENTKEY);
}

function loadLocalStorage(){
  const CLIENTKEY = window.localStorage.getItem('CLIENTKEY')
  return CLIENTKEY
}

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: loadLocalStorage(),
    user: {
      key: "5de6fc8b62da8a3d7fc41402624f2319",
      email: "brian@launchdarkly.com",
      custom: {
        "device_type": "ios",
        "location": "CA",
        "tier": "gold"
      },
      "privateAttributeNames": ["email", "key"]
    },
  });

  ReactDOM.render(
    <LDProvider>
      <App />
    </LDProvider>,
    document.getElementById("root")
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
