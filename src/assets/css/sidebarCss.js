import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;
export const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },

  drawerPaper: {
    width: 200,
    paddingTop: '5%',
    overflow: 'none',
    height: '100%',
    borderColor: 'grey.500',
  },
  desktopDrawer: {
    top: 64,
    width: drawerWidth,
    height: 'calc(100% - 64px)',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  contentdata: {
    padding: theme.spacing(5),
    '&:hover': {
      border: '0.5px solid',
    },
  },
  content: {
    height: '70%',
    padding: theme.spacing(0, 5, 15, 5),
    '&:hover': {
      border: '0.5px solid',
    },
  },
  dividerSelect: {
    position: 'relative',
    border: 'none',
    height: '5px',
    width: '30%',
    backgroundColor: '#FBCE07',
  },
  dividerUnselect: {
    display: 'none',
  },
  paper: {
    minHeight: '100vh',
    width: '150px',
    maxheight: '100vh !important',
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  rootPaper: {
    position: 'fixed',
    topPadding: 64,
  },
  accsideImg: {
    padding: 30,
  },
  sideImg: {
    padding: 40,
  },
  sideBarContent: {
    fontFamily: 'Futura-Book',
    textAlign: 'Left',
    fontSize: '20px',
    lineHeight: '52px',
    letterSpacing: '-10',
    color: '#404040',
    paddingLeft: 10,
    backgroundColor: 'transparent',
  },
  sideBarHeading: {
    fontFamily: 'Futura-Book',
    textAlign: 'Left',
    fontSize: '20px',
    lineHeight: '52px',
    letterSpacing: '-10',
    color: '#404040',
    paddingLeft: 10,
    fontWeight: 'Bold',
  },
  item: {
    height: 50,
    '&$selected': {
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'transparent',
  },
}));
