import Image from 'next/image';
import React from 'react'
import avatar from '../../../public/images/avatar.png';
import moment from 'moment';

type Param = {
  name: string;
  comment: string;
  date: Date | undefined;
}

const CommentList = ({ name, comment, date }: Param) => {
  return (
    <div className="flex flex-row w-full space-x-4">
      <Image
        src={avatar}
        width={36}
        height={36}
        alt="Picture of the author"
        className='h-max rounded-full'
      />
      <div className='flex flex-col'>
        <p className='text-sm'>{name}</p>
        <p className='text-sm text-gray-400'>{comment}</p>
        <div className='flex flex-row text-xs text-gray-400 mt-2'>
          <p>{moment(date).startOf('day').fromNow()}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentList