import { makeStyles } from '@material-ui/core/styles';
import constants from '../../constants';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    minWidth: '100vw',
  },
  asterisk: {
    '& .MuiFormLabel-asterisk': {
      color: 'red',
    },
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  input: {
    display: 'none',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  fixedHeight: {
    height: 120,
    width: 300,
  },
  fixedAirHeight: {
    height: 120,
    width: 400,
  },
  contentHeading: {
    fontFamily: 'Futura-Medium',
    textAlign: 'center',
    fontSize: '26px',
    lineHeight: '52px',
    letterSpacing: '-10',
    color: '#404040',
  },
  msgDeclineContent: {
    fontFamily: constants.FuturaBook,
    textAlign: 'center',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '-10',
    color: '#DD1D21',
  },
  msgContent: {
    fontFamily: constants.FuturaBook,
    textAlign: 'center',
    fontSize: '20px',
    lineHeight: '22px',
    letterSpacing: '-10',
    color: '#404040',
  },
  dropdownContent: {
    fontFamily: constants.FuturaBook,
    textAlign: 'center',
    fontSize: '26px',
    lineHeight: '52px',
    letterSpacing: '-10',
    color: '#404040',
  },
  dividerSelect: {
    position: 'relative',
    border: 'none',
    height: '5px',
    width: '30%',
    backgroundColor: '#FBCE07',
  },
  dividerUnselect: {
    position: 'relative',
    border: 'none',
    height: '5px',
    width: '30%',
    backgroundColor: 'white',
  },

  dividerSubSelect: {
    position: 'relative',
    border: 'none',
    height: '5px',
    backgroundColor: '#FBCE07',
  },
  dividerSubUnselect: {
    position: 'relative',
    border: 'none',
    height: '5px',
    backgroundColor: 'white',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    paddingLeft: 160,
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  updatebtn: {
    width: 150,
    textTransform: 'none',
  },
  fileBtn: {
    width: 250,
    textTransform: 'none',
  },
  btnPadding: {
    paddingTop: '2%',
  },

  cancelBtn: {
    backgroundColor: '#FBE069 ',
    color: '#404040',
    '&:hover': {
      backgroundColor: '#FBE069',
    },
    width: 150,
    textTransform: 'none',
  },
  bordercls: {
    color: 'red',
  },
  typography: {
    paddingBottom: 2,
  },
  rootLabel: {
    '& .MuiFormLabel-root': {
      color: 'red',
    },
  },
}));

export const styleData = {
  whiteSpace: 'pre-line',
  fontFamily: 'Futura-Book',
  textAlign: 'center',
  fontSize: '18px',
  lineHeight: '22px',
  letterSpacing: '-10',
};
