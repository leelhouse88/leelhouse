import React from 'react'

export default function Loading() {
    return (
        <>


            <div className="flex flex-row gap-2 h-96 justify-center items-center">
                <div className="w-6 h-6 rounded-full bg-2 animate-bounce"></div>
                <div className="w-6 h-6 rounded-full bg-2 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-6 h-6 rounded-full bg-2 animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </>
    )
}
