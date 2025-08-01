import "./globals.css";
import Script from "next/script";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Mobile Store - Best Smartphones || Buy Online",
  description: "Shop the latest smartphones with great deals and fast delivery. Your one-stop online mobile store.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
      </head>
      <body cz-shortcut-listen="true">
        <ToastContainer position="bottom-right" theme="colored" />
        {children}
      </body>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></Script>
    </html>
  );
}
