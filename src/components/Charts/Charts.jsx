import React,{useEffect, useState} from 'react';
import { fetchDailyData } from '../../api'; 
import {Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css'

const Charts = ({data: { confirmed, deaths, recovered }, country}) => {

    const [dailyData, setDailyData] = useState([])

    useEffect(() =>{
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
        }
    
    fetchAPI();
            
    },[dailyData])

    const linechart = 
        dailyData.length ?
        (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({confirmed}) => confirmed ),
                        label: 'Infected',
                        borderColor : '#3333ff' ,
                        backgroundColor: 'rgba(0,0,255,0.5)',
                        fill: true,
                    },{
                        data: dailyData.map(({deaths}) => deaths ),
                        label: 'Deaths',
                        borderColor : 'red' ,
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true,
                    }]
                }}
            />
        ):null
    
    const barChart = 
                confirmed?
                <Bar
                    data={{
                        labels: ['Infected','Deaths', 'Recovered'],
                        datasets: [{
                            label: 'People',
                            backgroundColor:[
                               ' rgba(0,0,255,0.5)',
                                'rgba(255,0,0,0.5)',
                                'rgba(0,255,0,0.5)'
                            ],
                            data:[confirmed.value,deaths.value,recovered.value]
                        }]
                    }}
                    options={{
                        legend: { display:false },
                        title:{ display:true , text:`Current Situation of COVID-19 in ${country}`}
                        }}
                    />
                    :null
                        
    return (
        <div className={styles.container}>
            { country?barChart:linechart}
        </div>
    )
}

export default Charts;