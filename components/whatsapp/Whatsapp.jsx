import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function Whatsapp({width,height}) {
   
    const phoneNumber = '9828988333';
    const message = 'Hello, I would like to inquire about your services.'; 

 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <>
        
                <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Image src="/image/whatsapp.webp" alt='WhatsApp' width={width} height={height} />
                </Link>
          
        </>
    );
}
