// app/layout.js
import "../sass/global.scss";

export const metadata = {
 title: "IST 363 Spotify",
 description:
  "A web application that showcases Top 10 lists, powered by WordPress and the Spotify API.",
};

export default function RootLayout({ children }) {
 return (
  <html lang="en">
   <body>{children}</body>
  </html>
 );
}