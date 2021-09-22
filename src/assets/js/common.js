import { makeStyles } from '@material-ui/core/styles';

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
export const useStyles = makeStyles((themecommon) => ({
  root: {
    height: '100vh',
  },
  container: {
    paddingTop: themecommon.spacing(4),
    paddingBottom: themecommon.spacing(4),
  },
  paper: {
    padding: themecommon.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      border: '1px solid grey',
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
    fontSize: '22px',
    lineHeight: '52px',
    letterSpacing: '-10',
    color: '#404040',
  },
  LoginHeading: {
    fontFamily: 'Futura-Medium',
    textAlign: 'center',
    fontSize: '20px',
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
    border: 'none',
    height: 5,
    backgroundColor: '#FBCE07',
    marginTop: -5,
  },
  dividerSubUnselect: {
    border: 'none',
    height: 5,
    backgroundColor: '#F5F6F9 ',
    marginTop: -5,
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    paddingLeft: 150,
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
  updatebtn: {
    width: 150,
    textTransform: 'none',
  },
  btnPadding: {
    paddingTop: '8%',
  },
  cancelBtn: {
    backgroundColor: '#FBE069 ',
    color: '#404040',
    '&:hover': {
      backgroundColor: '#FBE069',
    },
    width: 200,
    textTransform: 'none',
  },
  activeClass: { color: '#339D69', height: 5, marginTop: -5 },
  inActiveClass: { color: '#DD1D21', height: 5, marginTop: -5 },
  bulkClass: { color: '#DD1D21', height: 5, marginTop: -5 },
  customtooltip: { backgroundColor: 'white', textColor: '#DD1D21' },
}));
