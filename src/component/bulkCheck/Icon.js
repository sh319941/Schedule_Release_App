import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { ListItemIcon, Tooltip, withStyles, Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import addIcon from '../../assets/images/gridTable/addIcon.png';
import editIcon from '../../assets/images/gridTable/editIcon.png';
import rejectIcon from '../../assets/images/gridTable/rejectIcon.png';
import cancelIcon from '../../assets/images/gridTable/cancelIcon.png';
import saveIcon from '../../assets/images/gridTable/tickIcon.png';
import exclamation from '../../assets/images/gridTable/exclamation-30px.png';
import { cellStyle, gridText } from './BulkGridCss';

export function RejectIcon() {
  return (
    <div>
      <IconButton color="primary" variant="contained" style={{ textTransform: 'none' }} size="small">
        <Icon>
          {' '}
          <img src={rejectIcon} alt="Reject" />
        </Icon>
      </IconButton>
    </div>
  );
}

export function CancelIcon() {
  return (
    <div>
      <IconButton color="primary" variant="contained" size="small">
        <Icon>
          {' '}
          <img src={cancelIcon} alt="Cancel" />{' '}
        </Icon>
      </IconButton>
    </div>
  );
}

export function AddIcon(props) {
  const { title } = props;
  return (
    <div className="menuHeading">
      <IconButton color="primary" variant="contained" size="small">
        <Icon>
          {' '}
          <img src={addIcon} alt="Add" style={{ height: '90%' }} />{' '}
        </Icon>
      </IconButton>
      Add New {title}
    </div>
  );
}

export function SaveIcon() {
  return (
    <div>
      <IconButton color="primary" variant="contained" size="small">
        <Icon>
          {' '}
          <img src={saveIcon} alt="Save" />{' '}
        </Icon>
      </IconButton>
    </div>
  );
}

export function EditIcon() {
  return (
    <div>
      <IconButton color="primary" variant="contained" size="small">
        <Icon>
          {' '}
          <img src={editIcon} alt="Edit" />{' '}
        </Icon>
      </IconButton>
    </div>
  );
}
export function TotalUser(props) {
  return (
    <div style={{ fontFamily: 'Futura-Heavy', fontSize: '20px', color: '#404040' }}>
      {' '}
      Total {props.title} : {props.total}{' '}
    </div>
  );
}
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 16,
    color: '#DD1D21',
  },
  arrow: {
    color: 'white',
  },
}))(Tooltip);
export function ListValidate(text, validationMessage) {
  return (
    <LightTooltip color="red" className="gridFieldVali" title={validationMessage} placement="right-end">
      <ListItem>
        <ListItemText primary={<Typography style={cellStyle}>{text}</Typography>} style={{ marginLeft: -7 }} />
        <ListItemIcon style={gridText}>
          <img src={exclamation} alt="Invalid" />
        </ListItemIcon>
      </ListItem>
    </LightTooltip>
  );
}
