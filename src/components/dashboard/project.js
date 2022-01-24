import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { getProjectHours } from '../../utils/config';

export const Project = (props) => {
  const theme = useTheme();

  const colorPool = [
    '#0000ff', '#ff0000', '#ffff00', '#00ff00',
    '#ff80ed', '#ffa500', '#666666', '#ff00ff',
    '#660066', '#8b0000', '#00ffff', '#ff7373',
    '#ffd700', '#008000', '#101010', '#ffc3a0',
    '#c0d6e4', '#8a2be2', '#420420', '#dddddd'
  ];

  const [hour, setHour] = useState([]);
  const [project, setProject] = useState([]);
  const [data, setData] = useState({
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: colorPool.slice(0, 3),
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Project 1', 'Project 2', 'Project 3']
  });

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('USER_INFORMATION')).subModel === 'free') {
      setData({
        ...data,
        labels: ['Dropbox', 'Medium Corporation', 'Slack', 'Lyft', 'GitHub', 'Squarespace'],
        datasets: [
          {
            data: [49, 25.5, 27.5, 31, 36, 29],
            backgroundColor: colorPool.slice(0, 6),
            borderWidth: 8,
            borderColor: '#FFFFFF',
            hoverBorderColor: '#FFFFFF'
          }
        ]
      });
    } else {
      getProjectHours()
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            setProject(project.push(response[i].id));
            setHour(hour.push(response[i].hours));
          }
        })
        .then(() => {
          setData({
            ...data,
            labels: project,
            datasets: [
              {
                data: hour,
                backgroundColor: colorPool.slice(0, project.length),
                borderWidth: 8,
                borderColor: '#FFFFFF',
                hoverBorderColor: '#FFFFFF'
              }
            ]
          });
        });
    }
  }, []);

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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
    }
  };

  return (
    <Card {...props}>
      <CardHeader title="Project Analysis"/>
      <Divider/>
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
