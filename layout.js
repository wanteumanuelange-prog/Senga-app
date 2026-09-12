import "./globals.css";

export const metadata = {
  title: "Senga — Coaching & Development",
  description: "Application de réservation et de formations Senga",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
