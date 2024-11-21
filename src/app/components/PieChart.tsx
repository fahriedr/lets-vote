import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import { chartColor } from '../lib/constant';

// Define the data type
interface PollData {
    title: string;
    value: number;
    color: string;
}

// Props type for the component
interface PieChartProps {
    data: PollData[];
    totalVotes: number; // Total votes to calculate percentages
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<PieChartProps> = ({ data, totalVotes }) => {

    console.log(data, 'data');

    const labels = data.map((val, i) => val.title)
    const colors = data.map((val, i) => chartColor[i])
    const votes = data.map((val, i) => val.value)


    const data2 = {
        labels: labels,
        datasets: [
          {
            label: '# of Votes',
            data: votes,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      }

    const options = {
        plugins: {
            tooltip: {
                enabled: true, // Show tooltips on hover
                callbacks: {
                    label: (tooltipItem: any) => {
                        const label = tooltipItem.label || "";
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
            legend: {
                display: false, // Hides the legend
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <div className="flex justify-center items-center w-[280px] h-[280px]">
            <Pie 
                data={data2} 
                options={options}
            />
        </div>

    );
};

export default PieChart;
