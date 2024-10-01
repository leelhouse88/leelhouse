"use client";

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function GraphChart() {
    // Sample data for the Bar chart
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
            {
                label: 'Sales',
                data: [15, 59, 80, 81, 56, 55, 40,80,96,60,90,50],
                backgroundColor: '#005ca8',
            },
        ],
    };

    // Optional: Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 12,
                    padding: 15,
                },
            },
            title: {
                display: true,
                text: 'Monthly Sales',
                font: {
                    size: 16,
                },
            },
        },
    };

    return (
        <div className=" w-full py-4">
            <div className="bg-white shadow-md rounded-lg p-4 w-full">
                <Bar data={data} options={options} height={250} />
            </div>
        </div>
    );
}
