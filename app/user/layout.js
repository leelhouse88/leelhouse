import { Barlow } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

const roboto = Barlow({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: "Trusted Online Property Find | GharDekho.Com",
  description: "Trusted Online Property Dundo | GharDekho.Com",
};

export default function UserLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="min-h-screen flex flex-col bg-gray-100">
         
          <div className="fixed w-full z-10">
            <Navbar />
          </div>
          
          <div className="flex flex-1 pt-16"> 
            
            <div className="fixed z-10 bottom-0 top-0 md:top-16  bg-2"> 
              <Sidebar />
            </div>

          
            <div className="flex-1 md:ml-60 px-6 py-1">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
