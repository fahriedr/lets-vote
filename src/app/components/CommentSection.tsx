"use client"

import React from 'react'
import { IComment } from '../schemas/pollSchema';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

type Param = {
  data: Array<IComment>;
  allow_comment: boolean;
  unique_id: string;
}

interface Comment {

}

const CommentSection = ({ data = [], allow_comment, unique_id }: Param) => {
  return (
    <div className="flex flex-col w-full lg:max-w-[894px] rounded overflow-hidden shadow-lg bg-[#393E46]">
      <div className='flex flex-row items-center border-gray-500 border-solid border-b py-6 px-6 space-x-2'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
          <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
        </svg>

        <span>Comments</span>
      </div>
      <div className='flex px-6 py-6'>
        {allow_comment ?
          <div className='flex flex-col w-full'>
            {
              data.length > 0 ?
                <div className='flex flex-col space-y-6'>
                  {
                    data.map((val: IComment, i: number) => {
                      return (
                        <CommentList key={i} name={val.name} comment={val.text} date={val.created_at} />
                      )
                    })
                  }
                </div>
                :
                <></>
            }
            <div className="w-full h-[0.1px] px-0 bg-gray-500 mt-4 mb-4"></div>
            <CommentForm unique_id={unique_id} />
          </div>
          :
          <>
            <span>Comments are disabled.</span>
          </>}
      </div>
    </div>
  )
}

export default CommentSection