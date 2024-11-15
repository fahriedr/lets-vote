"use client"

import React, { useState } from "react"
import RadioButton from "./RadioButton"
import moment from "moment"
import { useRouter } from 'next/navigation'
import CheckboxCard from "./CheckBox"
import FingerprintJS from '@fingerprintjs/fingerprintjs'

interface Param {
  data: any;
}

const PollDetail: React.FC<Param> = ({ data }) => {
  const fpPromise = FingerprintJS.load()
  const [options, setOptions] = useState<string[]>([])
  const [name, setName] = useState<string>('')
  const router = useRouter()


  const handleVoteSubmit = async () => {

    const fp = await fpPromise
    const key = await fp.get()

    const body = {
      poll_unique_id: data.unique_id,
      options: options,
      name: name,
      browser_key: key.visitorId
    }

    const res = await fetch(`/api/poll/vote`, {
      method: 'POST',
      body: JSON.stringify(body)
    })

    const result = await res.json()

    console.log(result);
  }

  const handleSelectOption = async (newValue: string) => {
    if (data.multiple_choice) {
      if (options.includes(newValue)) {
        const opts = options.filter((val) => val !== newValue)
        setOptions(opts)
      } else {
        const newOptions = [...options, newValue]
        setOptions(newOptions)
      }
    } else {
      const val = [newValue]
      setOptions(val)
    }
  }

  const isSelected = (val: string) : boolean => {
    return options.includes(val)
  }

  return (
    <div className="flex flex-col w-full lg:w-[50%] rounded overflow-hidden shadow-lg bg-[#393E46] px-8 py-8">
      <span className="text-2xl font-bold">{data.title}</span>
      <span className="text-xs">{moment(data.created_at).startOf('day').fromNow()}</span>

      <span className="mt-6 mb-4">Make a vote:</span>
      <div className="space-y-2">
        {data.multiple_choice ?
          <>
            {data.options.map((val, i) => (
              <CheckboxCard
                key={i}
                title={val.value}
                value={val.uuid}
                isChecked={isSelected(val.uuid)}
                onChange={ handleSelectOption}
              />
            ))}
          </>
          :
          <>
            {data.options.map((val, i) => (
              <RadioButton
                key={i}
                label={val.value}
                value={val.uuid}
                isSelected={isSelected(val.uuid)}
                onChange={(e) => handleSelectOption(val.uuid)}
              />
            ))}
          </>
        }
      </div>
      {
        data.require_voter_name
        ?
        <div className="flex mt-6 flex-col w-full">
          <label className="tracking-wider text-sm mb-1 block font-bold text-white"> 
            Name
          </label>
          <input
            value={name}
            type="text"
            placeholder="Type here..."
            className="w-max p-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        :
        <></>
      }
      <div className="flex flex-row space-x-4 ">
        <button onClick={handleVoteSubmit} className="flex items-center bg-blue-500 w-max px-8 py-2 rounded-md mt-6 font-bold hover:bg-blue-700">
          Vote
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="ml-2 size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
        <button type="button" onClick={() => router.push(`/${data.unique_id}/result`)} className="flex items-center bg-[#393E46] border-[#a6a7a8] border-solid border-2 w-max px-8 py-2 rounded-md mt-6 font-bold hover:bg-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-2 size-5">
            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
          </svg>
          Show Result
        </button>
      </div>
    </div>
  );
};

export default PollDetail;
