import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function Whatsapp2() {

    const phoneNumber = '9828988333';
    const message = 'Hello, I would like to inquire about your services.';


    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <>

            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <div className=' border gap-x-3 font-medium w-40 flex items-center justify-center px-3 py-2 rounded-md border-green-600'>
                    <Image src="/image/whatsapp.webp" alt='WhatsApp' width={25} height={25} />
                    WhastApp
                </div>
            </Link>

        </>
    );
}
