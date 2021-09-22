import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  updatebtn: {
    width: 150,
    textTransform: 'none',
  },

  bulkbtnPadding: {
    paddingTop: '4%',
  },
  cancelBtn: {
    backgroundColor: '#FBE069 ',
    color: '#404040',
    '&:hover': {
      backgroundColor: '#FBE069',
    },
    width: 250,
    textTransform: 'none',
  },
  submit: {
    fontFamily: 'Futura-Heavy',
    fontSize: 24,
    letterSpacing: '-0.24px',
    color: '#404040',
    padding: '1%',
  },
}));

export const cellStyle = {
  paddingTop: '1px',
  paddingBottom: '1px',
  fontFamily: 'Futura-Book',
  fontSize: '18px',
  color: '#404040',
  wordBreak: 'break-all',
};
export const borderStyle = {
  padding: 8,
  borderBottom: 5,
  borderColor: 'red',
  borderStyle: 'solid',
};
export const gridText = {
  marginRight: -25,
};
