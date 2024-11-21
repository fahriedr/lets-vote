import React from 'react';

// Define the data type
interface PollData {
    title: string;
    value: number;
    color: string;
}

// Props type for the component
interface ProgressBarProps {
    data: PollData[];
    totalVotes: number; // Total votes to calculate percentages
}

const ProgressBar: React.FC<ProgressBarProps> = ({ data, totalVotes }) => {
    return (
        <div className="w-full mx-auto">
            {data.map((item, index) => (
                <div key={index} className="mb-4">
                    {/* Title */}
                    <div className="flex flex-row justify-between mb-1 font-bold text-gray-100">
                        <span>
                            <span className='capitalize'>{item.title} </span> 
                            ({item.value} votes)
                        </span>
                        <span>{(item.value / totalVotes) * 100}%({item.value} Votes)</span>
                    </div>
                    {/* Progress bar */}
                    <div className="bg-gray-800 rounded-lg h-4 overflow-hidden">
                        <div
                            className="h-full rounded-lg transition-all ease-linear"
                            style={{
                                width: `${(item.value / totalVotes) * 100}%`,
                                backgroundColor: item.color,
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>

    );
};

export default ProgressBar;
