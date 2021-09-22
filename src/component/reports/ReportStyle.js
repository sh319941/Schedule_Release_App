import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    paddingLeft: 160,
  },
  paper: {
    minWidth: '100%',
    padding: theme.spacing(4),
    display: 'flex',
    backgroundColor: '#FFF',
    flexDirection: 'column',
    '& .MuiFormLabel-asterisk': {
      color: 'red',
    },
  },
  msgContent: {
    color: '#404040',
    fontSize: 20,
    fontFamily: 'Futura-Medium',
    paddingRight: 30,
  },
}));
