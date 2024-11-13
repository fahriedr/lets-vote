"use client"

import React from 'react'
import { Tooltip } from 'react-tooltip';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  TelegramShareButton,
  EmailShareButton,

  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
} from 'react-share'

type Param = {
  url: string;
}

const ShareCard = ({url}: Param) => {



  return (
    <div className="flex flex-col w-full lg:w-[50%] rounded overflow-hidden shadow-lg bg-[#393E46]">
      <div className='flex flex-row items-center border-gray-500 border-solid border-b py-6 px-6 space-x-2'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
        </svg>
        <span>Share</span>
      </div>
      <div className='flex flex-col items-center px-6 py-6 '>
        <div className='flex flex-col w-full lg:w-1/2 space-y-2'>
          <span>Share the link</span>
          <div className="w-full">
            <div className="relative">
              <label htmlFor='share-url' className="sr-only">Label</label>
              <input id="share-url" type="text" className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={url} disabled readOnly />
              <button data-tooltip-id="share-url-tooltip-click" data-tooltip-delay-hide={2000} onClick={() => {navigator.clipboard.writeText(url)}} data-copy-to-clipboard-target="share-url" data-tooltip-target="tooltip-copy-share-url" className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center">
                <span id="default-icon">
                  <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                  </svg>
                </span>
                <span id="success-icon" className="hidden inline-flex items-center">
                  <svg className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                  </svg>
                </span>
              </button>
              <Tooltip
                id="share-url-tooltip-click"
                content="Successfully Copied!"
                events={['click']}
              />
              <div id="tooltip-copy-share-url" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                <span id="default-tooltip-message">Copy to clipboard</span>
                <span id="success-tooltip-message" className="hidden">Copied!</span>
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
          <div className='flex flex-row space-x-3'>
            <FacebookShareButton url={url}>
              <FacebookIcon size={32} round={true} bgStyle={{ color: '#374151'}}/>
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <TwitterIcon size={32} round={true}/>
            </TwitterShareButton>
            <EmailShareButton url={url}>
              <EmailIcon size={32} round={true}/>
            </EmailShareButton>
            <RedditShareButton url={url}>
              <RedditIcon size={32} round={true}/>
            </RedditShareButton>
            <TelegramShareButton url={url}>
              <TelegramIcon size={32} round={true}/>
            </TelegramShareButton>
            <WhatsappShareButton url={url}>
              <WhatsappIcon size={32} round={true}/>
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareCard