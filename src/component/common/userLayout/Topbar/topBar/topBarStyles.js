import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  content: {
    fontFamily: 'Futura-Medium',
    textAlign: 'center',
    fontSize: '24px',
    lineHeight: '52px',
    letterSpacing: '-10',
    color: '#404040',
  },
  contentHeading: {
    fontFamily: 'Futura-Medium',
    textAlign: 'center',
    fontSize: '20px',
    lineHeight: '52px',
    letterSpacing: '-10',
    color: '#404040',
  },
}));
