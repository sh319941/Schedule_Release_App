import { makeStyles } from '@material-ui/core/styles';
import constants from '../../constants';

export const useStyles = makeStyles((theme) => ({
  contentHeading: {
    fontFamily: 'Futura-Medium',
    textAlign: 'center',
    fontSize: '26px',
    lineHeight: '38px',
    letterSpacing: '-10',
    color: '#404040',
    wordWrap: 'break-word',
    textAlign: 'center',
    textTransform: 'uppercase,
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
}));
