
import "./globals.css";

export const metadata = {
  title: "Mirza Ubaid Beg | Developer & Designer",
  description:
    "Portfolio of Mirza Ubaid Beg — creative development, design and interactive digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
