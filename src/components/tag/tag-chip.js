import { Chip } from '@mui/material';

export const TagChip = ({ tag, ...rest }) => (
  <Chip
    sx={{
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      fontSize: '16px',
      backgroundColor: 'white'
    }}
    variant="outlined"
    label={tag.name}
    {...rest}
  />
);
