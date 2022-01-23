import { Box, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { works } from '../../__mocks__/works';
import { convertToDateObject, dateSort } from '../../utils/config';

export const Weekly = (props) => {
  const theme = useTheme();

  const [hour, setHour] = useState([]);
  const [week, setWeek] = useState([]);
  const [data, setData] = useState({
    datasets: [
      {
        label: 'This year',
        data: [0, 0, 0, 0],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)'
      }
    ],
    labels: ['CW 1', 'CW 2', 'CW 3', 'CW 4']
  });

  useEffect(() => {
    let sortedWorks = works.sort(dateSort);
    let currentYear = convertToDateObject(sortedWorks[0].date).getFullYear();
    let currentWeek = convertToDateObject(sortedWorks[0].date).getWeek();
    let currentHours = sumOfWorkingHours(sortedWorks[0].workPackages);

    for (let i = 1; i < works.length; i++) {
      if (convertToDateObject(sortedWorks[i].date).getFullYear() === currentYear) {
        if (convertToDateObject(sortedWorks[i].date).getWeek() === currentWeek) {
          currentHours += sumOfWorkingHours(sortedWorks[i].workPackages);

          if (i === works.length - 1) {
            setHour(hour.push(currentHours));
            setWeek(week.push('CW ' + currentWeek));
          }
        } else {
          setHour(hour.push(currentHours));
          currentHours = sumOfWorkingHours(sortedWorks[i].workPackages);
          setWeek(week.push('CW ' + currentWeek));
          currentWeek = convertToDateObject(sortedWorks[i].date).getWeek();
        }
      }
    }

    setData({
      ...data,
      labels: week.reverse(),
      datasets: [
        {
          label: 'This year',
          data: hour.reverse(),
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)'
        }
      ]
    });
  }, []);

  const sumOfWorkingHours = (data) => {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
      sum += data[i].workingHours;
    }

    return sum;
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Card {...props}>
      <CardHeader title="Working Hours per Week for current Year"/>
      <Divider/>
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Line
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
