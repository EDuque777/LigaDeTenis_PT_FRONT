// export const metadata = {
//   title: 'Tennis League',
//   description: 'Get ready to live the passion of tennis!',
// }

// export default function RootLayout({ children }) {
//  return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }


"use client"
import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.baseURL = "https://ligadetenisptback-dev-mjcc.4.us-1.fl0.io/";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </Provider>
  );
}