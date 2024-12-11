"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import avatar from '../../../public/images/avatar.png';
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Param {
    unique_id: string
}

const CommentForm = ({ unique_id }: Param) => {

    const [fingerprint, setFingerprint] = useState<string | null>(null)
    const [buttonLoading, setButtonLoading] = useState(false);
    const [name, setName] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    const handleNameOnChange = (e) => setName(e.target.value)
    const handleCommentOnChange = (e) => setComment(e.target.value)

    const sendComment = async () => {

        setButtonLoading(true)

        const data = {
            poll_unique_id: unique_id,
            name: name,
            text: comment,
            browser_key: fingerprint
        }

        const res = await fetch(`/api/poll/comment/create`, {
            method: 'POST',
            body: JSON.stringify(data)
        })

        const result = await res.json()

        if (result.error) {
            toast.error('Sorry, something went wrong!')
            return false
        }

        setButtonLoading(false)

        if (!result.success) {
            toast.error(result.message)
            return false

        } else {
            setName('')
            setComment('')
            toast.success(result.message)
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fpPromise = FingerprintJS.load();
            fpPromise
                .then(fp => fp.get())
                .then(result => {
                    setFingerprint(result.visitorId);
                })
                .catch(error => {
                    console.error('Error getting fingerprint:', error);
                });
        }
    }, []);

    return (
        <div className="flex flex-row w-full space-x-4">
            <Image
                src={avatar}
                width={36}
                height={36}
                alt="Picture of the author"
                className='h-max rounded-full'
            />
            <div className='flex flex-col w-full space-y-3'>
                <input
                    value={name}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleNameOnChange}
                />
                <textarea 
                    className='w-full p-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"' 
                    placeholder='Add a comment...' 
                    cols={5} 
                    rows={3} 
                    value={comment}
                    onChange={handleCommentOnChange}/>
                <button
                    onClick={sendComment} 
                    disabled={buttonLoading} 
                    className="flex w-max justify-center end-0 py-2 px-3 bg-blue-500 text-gray-200 rounded-md hover:bg-gray-600 transition font-semibold text-sm">
                    {
                        buttonLoading ?
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                            </>
                            :
                            <>
                                Add Comment
                            </>
                    }
                </button>
            </div>
        </div>
    )
}

export default CommentForm