import { Roboto } from 'next/font/google'
 

import "./globals.css";

import { AuthProvider } from "./Providers";
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

// export const metadata = {
//   title: "Trusted Online Property Find | GharDekho.Com",
//   description: "Trusted Online Property Dundo | GharDekho.Com",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>

        <AuthProvider>

          {children}
        </AuthProvider>
         

      </body>
    </html>
  );
}
