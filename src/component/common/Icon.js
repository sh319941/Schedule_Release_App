import addIcon from '../../assets/images/gridTable/addIcon.png';
import editIcon from '../../assets/images/gridTable/editIcon.png';
import rejectIcon from '../../assets/images/gridTable/rejectIcon.png';
import cancelIcon from '../../assets/images/gridTable/cancelIcon.png';
import saveIcon from '../../assets/images/gridTable/tickIcon.png';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import React from 'react';

export function RejectIcon() {
  return (
    <div>
      <IconButton

        color="primary"
        variant="contained"
        style={{ textTransform: 'none' }}
        size="small"
      >
        <Icon> <img src={rejectIcon}  alt="Reject"/></Icon>
      </IconButton></div>)
}

export function CancelIcon() {
  return (
    <div >
      <IconButton

        color="primary"
        variant="contained"

        size="small"
      >
        <Icon> <img src={cancelIcon} alt="Cancel" /> </Icon>
      </IconButton>
    </div>)
}

export function AddIcon(props) {
  return (
    <div className="menuHeading">
      <IconButton
        color="primary"
        variant="contained"
        size="small"
      >
        <Icon> <img src={addIcon} alt="Add" style={{height:'90%'}} /> </Icon>
      </IconButton>
    Add New {props.title}</div>);
}

export function SaveIcon() {
  return (
    <div >
      <IconButton
        color="primary"
        variant="contained"

        size="small"
      >
        <Icon> <img src={saveIcon}  alt="Save"/> </Icon>
      </IconButton>
    </div>)
}

export function EditIcon() {
  return (
    <div >
      <IconButton
        color="primary"
        variant="contained"
        size="small"
      >
        <Icon> <img src={editIcon} alt="Edit"/> </Icon>
      </IconButton>
    </div>)
}
export function TotalUser(props) {
  return (
    <div style={{ fontFamily: "Futura-Heavy", fontSize: "20px", color: "#404040" }}> Total {props.title} : {props.total} </div>)
}