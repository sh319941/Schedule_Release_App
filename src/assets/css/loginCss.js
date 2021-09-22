import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },

  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  globleIcon: {
    marginRight: theme.spacing(-3),
    paddingTop: 5,
  },
  divideLine: {
    width: '20%',
    float: 'right',
  },

  userType: {
    backgroundColor: '#009EB4',
    '&:hover': {
      color: '#FFFFFF !important',
      backgroundColor: '#009EB4 ',
    },
  },
  submit: {
    backgroundColor: '#FBE069 ',
    color: '#404040',
    padding: theme.spacing(1, 15, 1, 15),
    margin: theme.spacing(2, 0, 2),
    '&:hover': {
      backgroundColor: '#FBE069',
    },
  },
}));
