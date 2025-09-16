import type { Metadata } from "next";
import { ToastContainer } from 'react-toastify';

import "@repo/ui/globals.css"

export const metadata: Metadata = {
  title: "Liven - Transcrição de video",
  description: "Transcreva seu video",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
          {children}
          <ToastContainer autoClose={ 3000 }/>
      </body>
    </html>
  );
}
