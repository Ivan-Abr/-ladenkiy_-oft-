import React, {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';
import {useParams} from "react-router-dom";
import {IAnswer, IOrg} from "../../models";
import OrgService from "../../services/OrgService";
import axios from "axios";

interface Params{
  [orgId:string]:string;}

export function RadarChart(){
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const {orgId} =useParams<Params>()
  const [org, setOrg] = useState<IOrg>();
  const [ans, setAns] = useState<IAnswer[]>([])

  useEffect(() => {
    OrgService.getOrgById(Number(orgId)).then((response)=>{
      setOrg(response.data);});}, [orgId]);

  useEffect(() => {
      axios.get("http://localhost:8080/dm/v1/answer/all/org/"+orgId).then((response)=>{
        setAns(response.data)
        console.log(response.data)
      })
  }, [orgId]);


  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Уничтожаем предыдущий график, если он существует
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['Организационная\nкультура', 'Кадры', 'Процессы', 'Продукты', 'Инфраструктура\nи инструменты'],
            datasets: [
              {
                label: 'Итоговый результат',
                data: [10, 20, 30, 40, 50],
                backgroundColor: 'rgba(70, 255, 70, 0.2)',
                borderColor: 'rgb(70, 180, 132)',
                pointBackgroundColor: 'rgb(70, 180, 132)',
              },
              {
                label: 'Желаемый результат',
                data: [35, 35, 35, 35, 35],
                backgroundColor: 'rgba(255, 255, 0, 0.5)',
                borderColor: 'rgb(220, 220, 132)',
                pointBackgroundColor: 'rgb(220, 220, 132)',
              },
            ],
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Уничтожаем график при размонтировании компонента
      }
    };
  }, []);

  return (<div>
    {org != null?(<div>
            <h4>{org?.orgName}</h4>
        <h6>{org?.orgAnnot}</h6>
      <p>{org?.orgContacts}</p></div>
    ):(<div><p>No data</p></div>)}

      {ans.map(answer=>{
        return <p>{answer.factor}</p>
      })}


    <h5>Результат тестирования</h5>
    <div id = "radarChart">
    <canvas ref={chartRef} />
    </div></div>);
}


