import React from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const ChartComponent = ({chartData=[], currencySymbol,days}) => {
    const dates=[]
    const prices=[]
    for (let index = 0; index < chartData.length; index++) {
        if(days=== "24h") dates.push(new Date(chartData[index][0]).toLocaleTimeString());
        else dates.push(new Date(chartData[index][0]).toLocaleDateString());
        prices.push(chartData[index][1]);
        
    }
    console.log(dates);
    console.log(prices);
  return (
    <div>
        <Line
        options={{
            responsive:true,
        }}
        data={{
            labels:dates,
            datasets:[{
                label:`Price in ${currencySymbol}`,
                data:prices,
                borderColor:"rgb(255,99,132)",
                backgroundColor:"rgba(255,99,132,0.5)",
            }]
        }}
        />
    </div>
  )
}

export default ChartComponent
