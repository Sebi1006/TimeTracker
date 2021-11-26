import { v4 as uuid } from 'uuid';

export const works = [
  {
    id: uuid(),
    date: '22/11/2021',
    workPackages: [
      {
        project: 'Dropbox',
        workingHours: 6,
        tag: 'Software Development',
        description: 'Work hard'
      }
    ]
  },
  {
    id: uuid(),
    date: '23/11/2021',
    workPackages: [
      {
        project: 'Medium Corporation',
        workingHours: 3.5,
        tag: 'Testing',
        description: 'Play hard'
      },
      {
        project: 'Slack',
        workingHours: 4.5,
        tag: 'Software Development',
        description: 'Work hard, play hard'
      }
    ]
  },
  {
    id: uuid(),
    date: '24/11/2021',
    workPackages: [
      {
        project: 'Lyft',
        workingHours: 2,
        tag: 'Administration',
        description: 'Work hard'
      },
      {
        project: 'GitHub',
        workingHours: 3,
        tag: 'Software Development',
        description: 'Play hard'
      },
      {
        project: 'Squarespace',
        workingHours: 3,
        tag: 'Software Development',
        description: 'Work hard, play hard'
      }
    ]
  }
];
