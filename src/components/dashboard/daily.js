import { Box, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { works } from '../../__mocks__/works';
import { convertToDateObject, dateSort } from '../../utils/config';

export const Daily = (props) => {
  const theme = useTheme();

  const [work, setWork] = useState([]);
  const [date, setDate] = useState([]);
  const [hour, setHour] = useState([]);
  const [data, setData] = useState({
    datasets: [
      {
        label: 'This week',
        data: [0, 0, 0, 0, 0],
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        borderRadius: 5
      }
    ],
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  });

  useEffect(() => {
    setWork(work.push(works.sort(dateSort)[0]));
    let currentWeek = convertToDateObject(works.sort(dateSort)[0].date).getWeek();

    for (let i = 1; i < 5; i++) {
      if (convertToDateObject(works.sort(dateSort)[i].date).getWeek() === currentWeek) {
        setWork(work.push(works.sort(dateSort)[i]));
      }
    }

    let sortedWorks = work.sort(reverseDateSort);

    for (let i = 0; i < sortedWorks.length; i++) {
      setDate(date.push(sortedWorks[i].date));
      setHour(hour.push(sumOfWorkingHours(sortedWorks[i].workPackages)));
    }

    setData({
      ...data,
      labels: date,
      datasets: [
        {
          label: 'This week',
          data: hour,
          backgroundColor: '#3F51B5',
          barPercentage: 0.5,
          borderRadius: 5
        }
      ]
    });
  }, []);

  const reverseDateSort = (a, b) => {
    let x = convertToDateObject(a.date);
    let y = convertToDateObject(b.date);

    return x.getTime() - y.getTime();
  };

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
      <CardHeader title="Working Hours per Day for current Week"/>
      <Divider/>
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
