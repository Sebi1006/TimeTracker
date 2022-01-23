import { v4 as uuid } from 'uuid';

export const projects = [
  {
    id: uuid(),
    title: 'Dropbox',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    createdAt: '11/9/2008',
    members: ['', '', '', '', '']
  },
  {
    id: uuid(),
    title: 'Medium Corporation',
    description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    createdAt: '15/8/2012',
    members: ['', '', '']
  },
  {
    id: uuid(),
    title: 'Slack',
    description: 'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    createdAt: '14/8/2013',
    members: ['', '', '', '', '', '', '', '']
  },
  {
    id: uuid(),
    title: 'Lyft',
    description: 'Lyft is an on-demand transportation company based in San Francisco, California.',
    createdAt: '9/6/2012',
    members: ['', '']
  },
  {
    id: uuid(),
    title: 'GitHub',
    description: 'GitHub is a web-based hosting service for version control of code using Git.',
    createdAt: '10/4/2008',
    members: ['', '', '', '', '', '', '', '', '', '']
  },
  {
    id: uuid(),
    title: 'Squarespace',
    description: 'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
    createdAt: '1/1/2004',
    members: ['', '', '', '', '', '']
  }
];
