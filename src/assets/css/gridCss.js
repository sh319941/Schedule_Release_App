import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFFA7',
  },
  paper: {
    backgroundColor: '#F7F7F7',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  updatebtn: {
    width: 150,
    textTransform: 'none',
  },
  content: {
    fontFamily: 'Futura-Book',
    textAlign: 'Left',
    fontSize: '20px',
    lineHeight: '52px',
    letterSpacing: '-10',
    color: '#404040',
    paddingLeft: 10,
    backgroundColor: 'transparent',
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
    width: 150,
    textTransform: 'none',
  },
  modalBtnPadding: {
    paddingTop: '4%',
  },
}));
