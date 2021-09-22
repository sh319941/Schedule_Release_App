import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modaldrop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFFA7',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioLabel: {
    fontFamily: 'Futura-Medium',
    fontSize: 18,
    color: '#404040',
    opacity: 1,
  },
  paper: {
    '& .MuiPaper-root': {
      backgroundColor: 'transparent !important',
      boxShadow: 'none',
    },
  },
  paperselect: {
    '& .MuiPaper-rounded': {
      backgroundColor: '#F7F7F7  !important',
      boxShadow: 'none',
      '&:hover': {
        border: '0.5px solid',
      },
    },
  },
  paperdrop: {
    backgroundColor: '#F7F7F7',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  regionContent: {
    fontFamily: 'Futura-Book',
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 16,
    color: '#575757',
  },
  updatebtn: {
    backgroundColor: '#FBE069 ',
    color: '#404040',
    '&:hover': {
      backgroundColor: '#FBE069',
    },
    padding: '10%',
    textTransform: 'none',
  },
  btnSubmit: {
    backgroundColor: '#FBE069 ',
    color: '#404040',
    '&:hover': {
      backgroundColor: '#FBE069',
    },
    padding: '10px 30px 10px 30px',
    textTransform: 'none',
  },
  btnImg: {
    width: 20,
    height: 10,
  },
  cancelBtn: {
    textTransform: 'none',
    padding: '10%',
  },
  root: {
    paddingRight: 30,
  },
}));
