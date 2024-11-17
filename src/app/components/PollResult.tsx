'use client'

import React, { useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';

type Param = {
    data: any
}

const PollResult: React.FC<Param> = ({ data }) => {

    console.log(data, 'data')

    return (
        <div className="flex flex-col w-full lg:w-[50%] rounded overflow-hidden shadow-lg bg-[#393E46] px-8 py-8">
            <PieChart
                animationDuration={500}
                animationEasing="ease-out"
                center={[50, 50]}
                data={[
                    { title: 'One', value: 10, color: '#E38627' },
                    { title: 'Two', value: 15, color: '#C13C37' },
                    { title: 'Three', value: 20, color: '#6A2135' },
                ]}
                labelPosition={50}
                lengthAngle={360}
                lineWidth={15}
                paddingAngle={0}
                radius={50}
                rounded
                startAngle={0}
                viewBoxSize={[100, 100]}
            />
        </div>
    )
}

export default PollResult