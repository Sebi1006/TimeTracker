import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const projects = [
  {
    id: uuid(),
    name: 'Dropbox',
    imageUrl: '/static/images/projects/project_1.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Medium Corporation',
    imageUrl: '/static/images/projects/project_2.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: '/static/images/projects/project_3.png',
    updatedAt: subHours(Date.now(), 3)
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: '/static/images/projects/project_4.png',
    updatedAt: subHours(Date.now(), 5)
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/projects/project_5.png',
    updatedAt: subHours(Date.now(), 9)
  }
];

export const LatestProjects = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${projects.length} in total`}
      title="Latest Projects"
    />
    <Divider/>
    <List>
      {projects.map((project, i) => (
        <ListItem
          divider={i < projects.length - 1}
          key={project.id}
        >
          <ListItemAvatar>
            <img
              alt={project.name}
              src={project.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={project.name}
            secondary={`Updated ${formatDistanceToNow(project.updatedAt)}`}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon/>
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider/>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon/>}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);
