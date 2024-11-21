'use client'

import moment from 'moment';
import React, { useEffect, useState } from 'react'
import PieChart from '../components/PieChart';
import { chartColor } from '../lib/constant';
import ProgressBar from './ProgressBar';

type Param = {
    data: any
}

const PollResult: React.FC<Param> = ({ data }) => {

    const [result, setResult] = useState([]);
    const [totalVotes, setTotalVotes] = useState<number>(0)

    const loadResult = () => {
        let res = data.vote

        let totalVal = 0

        const response = res.map((val, i) => {
            const value = {
                title: val.name,
                value: val.count,
                color: chartColor[i]
            }
            totalVal += val.count
            return value
        })

        setResult(response)

        setTotalVotes(totalVal);

    }

    useEffect(() => {
        loadResult()
    }, []);

    return (
        <div className="flex flex-col w-full lg:max-w-[894px] rounded overflow-hidden shadow-lg bg-[#393E46] px-8 py-8">
            <div className='flex flex-col mb-8'>
                <span className="text-2xl font-bold">{data.poll.title}</span>
                <span className="text-xs">{moment(data.poll.created_at).startOf('day').fromNow()}</span>
            </div>
            <div className='flex flex-col w-full lg:flex-row justify-between'>
                <div className='flex flex-col w-full lg:w-3/4 pr-6'>
                    <ProgressBar data={result} totalVotes={totalVotes} />
                    <div className="w-full h-[0.1px] bg-gray-500 mt-4 mb-4"></div>
                    <span>Total Votes: {totalVotes}</span>
                </div>
                <div className='flex w-full lg:w-1/3 font-inter justify-center items-center '>
                    <PieChart data={result} totalVotes={totalVotes}/>
                </div>
            </div>
        </div>
    )
}

export default PollResult