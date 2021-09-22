/* eslint-disable */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from '@material-ui/core/Snackbar';
import { validateEmail } from '../../assets/js/common';
import GridTable from '../common/GridTable';
import Alert from '../common/Utilities/Alert';
import {alphaNumeric} from '../common/Utilities/AlphaNumeric';
import update from '../../assets/images/sidebarImage/update.png';
import { Trans } from 'react-i18next';
import constants from '../../constants'
import { useStyles } from '../../assets/js/common';
import { getToken } from '../../utils';

let editrole = "";
const UserList=(props)=> {
  const classes = useStyles();
  const deactiveMsg = "Are you sure you want to deactivate this user?";
  const activeMsg = "Are you sure you want to activate this user?";
  const updatMsg = "Are you sure you want to make changes to this user?";
  const msg = { "activate": activeMsg, "deactivate": deactiveMsg, "update": updatMsg, "title": "Users" }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const token = getToken();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [serverity, setServerity] = useState()
  const nameref = useRef();
  const emailAddressref = useRef();
  const roleref = useRef();
  const statusref = useRef();
  const siteref = useRef();
  const { sites, users, roles,userInfo,actions} = props ;
  const {insertUsers, updateUsers, getUsers} =actions;
  const validate = (check, method) => {

    if (check.firstName === '') {
      nameref.current.focus();
      setError("Please enter Name.");
      setOpen(true)
      setServerity("error")
      return false;
    }
    if (check.emailAddress === '' && method === 'add') {
      emailAddressref.current.focus();
      setError("Please enter your Email Address.");
      setOpen(true);
      setServerity("error")
      return false;
    }
    const email = validateEmail(check.emailAddress);
    if (email === false && method === 'add') {
      emailAddressref.current.focus();
      setError("Please enter valid Email Address.");
      setOpen(true);
      setServerity("error")
      return false;
    }
    if (check.role === '') {
      roleref.current.focus();
      setError("Please select Role")
      setOpen(true);
      setServerity("error")
      return false;
    }
    if (check.site === '' && check.role === 'Supervisor') {
    
      siteref.current.focus();
      setError("Please select Site.")
      setOpen(true);
      setServerity("error")
      return false;
    }
    if (check.site !== '' && check.role === 'Supervisor' && method === 'edit') {
      const siteCheckList = sites.find(val => val.siteName === check.site)
      if (siteCheckList === undefined) {
        siteref.current.focus();
        setError("Please select Site.")
        setOpen(true);
        setServerity("error")
        return false;
      }
    }
    if (email === true && check.role !== '') {
      const split = check.emailAddress.split("@");
      if (split[1] !== 'shell.com' && check.role !== 'Supervisor') {
        siteref.current.focus();
        setError("Please enter a valid Shell email address for Business Owner or Administrator role.")
        setOpen(true);
        setServerity("error")
        return false;
      }
    }
    return true;
  }


  const addNewUser = async (param, method) => {
    let msg = '';
    let reponse = '';
    if (method === 'add') {
      const addData = {};
      addData["createdBy"] = userInfo.userId;
      addData['firstName'] = nameref.current.value;
      addData['emailAddress'] = emailAddressref.current.value;
      addData['role'] = roleref.current.value;
      addData['site'] = siteref.current.value;
      const rsvalidate = await validate(addData, 'add');
      if (rsvalidate === false) {
        return false;
      }
      if (addData['role']) {
        const roledata = roles.find(val => val.roleName === addData['role'])
        addData['roleId'] = roledata['roleId'];
      }
      if (addData['role'] !== 'Supervisor') {
        addData['siteId'] = 0;
      } else {
        const sitedata = sites.find(val => val.siteName === addData['site'])
        addData['siteId'] = sitedata['siteId'];
      }
      addData['active'] = statusref.current.value;
      delete addData['role'];
      delete addData['site'];
      reponse = await insertUsers(token, addData); 
      msg = "User created successfully";
    } else if (method === 'edit' || method === 'editValidate') {
      const editdata = {};
      editdata['userId'] = param['userId'];
      editdata['modifiedBy'] = userInfo.userId;
      editdata['firstName'] = nameref.current.value;
      editdata['emailAddress'] = param['emailAddress'];
      editdata['role'] = roleref.current.value;
      editdata['site'] = siteref.current.value;
      editdata['active'] = document.getElementsByName("active").value;
      const rsvalidateEdit = await validate(editdata, 'edit');
      if (rsvalidateEdit === false) {
        return false;
      }
      if(method !== 'editValidate')
      {
      if (editdata['role']) {
        const roledata = roles.find(val => val.roleName === editdata['role'])
        editdata['roleId'] = roledata['roleId'];
      }
      if (editdata['role'] !== 'Supervisor') {
        editdata['siteId'] = 0;
      } else {
        const sitedata = sites.find(val => val.siteName === editdata['site'])
        editdata['siteId'] = sitedata['siteId'];
      }
      editdata['active'] = statusref.current.value;
      delete editdata['role'];
      delete editdata['site']; 
      reponse = await updateUsers(token, editdata);
      msg = "User details updated successfully";
    }
    } else if (method === 'deactivate') {
      const activateUser={}
      if (userInfo != null) {
        param.modifiedBy = userInfo.userId;
      }
      Object.assign(activateUser, param);
      activateUser['active'] = false;
      reponse = await updateUsers(token, activateUser)
      msg = "User deactivated successfully";
    } else if (method === 'activate') {
      const deactivateUser={}
      if (userInfo != null) {
        param.modifiedBy = userInfo.userId;
      }
      Object.assign(deactivateUser, param);
      deactivateUser['active'] = true;
      reponse = await updateUsers(token, deactivateUser)
      msg = "User activated successfully";
    }
    if (reponse.status === 204) {
      setError(msg);
      setOpen(true)
      setServerity("success")
      getUsers(token)
      return true;
    } else if (reponse.status === 400 ) {
      return false;
    }
    return true;
  }
  const allowUserChangeStatus = (rowData) => {
    setError(constants.RoleModifyMessage)
    setOpen(true);
    setServerity("error")
    return false
  }
  var currentRole = ""
  const [columns, setColumns] = useState([
    {
      title: <Trans i18nKey="UserList['name']">Name</Trans>, field: 'firstName', width: "70%",
      editComponent: props => {
        return <TextField id="firstName"  autoComplete="off" onKeyPress={(e) => alphaNumeric(e)} inputRef={nameref} inputProps={{ maxLength: 30, pattern: "[a-z]{1,15}" }} defaultValue={props.value ? props.value : ""} />
      }
    },

    {
      title: <Trans i18nKey="UserList['Email']">Email Address</Trans>, field: 'emailAddress', width: "100%", editable: 'onAdd', editComponent: props => {
        return <TextField id="emailAddress" 
         autoComplete="off" 
         inputRef={emailAddressref} defaultValue={props.value ? props.value : ""} />
      }
    },
    {
      title: <Trans i18nKey="UserList['Role']">Role</Trans>, width: "70%", field: 'role.roleName', editComponent: props => {
        editrole = props.value;
        return <Autocomplete
          id="role"
          options={roles.map((option) => option.roleName)}
          defaultValue={props.value}
          onChange={(event, newValue) => {
            if (newValue !== '' && newValue !== null) {
              if (newValue !== 'Supervisor') {
                document.querySelector(constants.UserHideRoleClass).style = 'display: none'
              } else {
                document.querySelector(constants.UserHideRoleClass).style = ''
              }
              var roledata = roles.find(val => val.roleName === newValue)
              currentRole = roledata['roleName'];
            }
          }}
          renderInput={(params) => {
            return <TextField id="roleId" inputRef={roleref} value={props.value} {...params} />
          }
          }
        />
      }
    },
    {
      title: <Trans i18nKey="UserList['Site Name']">Site Name</Trans>, width: "100%", field: 'site.siteName', editComponent: props => {

        const selectedSite = props.value;
        return <Autocomplete         
          options={sites.map((option) => option.siteName)}
          id="site"
          defaultValue={selectedSite}
          fullWidth
          
          renderInput={(params) => {
            if ((editrole === 'Business Owner' || editrole === 'Administrator') && currentRole !== 'Supervisor') {
              if (document.querySelector(constants.UserHideRoleClass) != null) {
                document.querySelector(constants.UserHideRoleClass).style = 'display: none';
              }
            }
            return <TextField inputRef={siteref} {...params} />
          }}
        />
      }
    },

    {
      title: <Trans i18nKey="UserList['Status']">Status</Trans>, width: "10%", field: 'active', editComponent: props => {
        var active = props.value;
        if (props.value === undefined) {
          active = true;
        }
        return (
          <Select
            labelId="status-select-label"
            id="status"
            name="active"

            defaultValue={active}
            fullWidth
            className="Select"
            inputRef={statusref}
          >
            <MenuItem className="Select" key="1" value={true} >Active</MenuItem>
            <MenuItem className="Select" key="2" value={false}>Inactive</MenuItem>
          </Select>
        )
      }, render: (rowData) =>
      rowData.active === true ? (
        <p className={classes.activeClass}>Active</p>
      ) : (
        <p className={classes.inActiveClass}>Inactive</p>
      ),
    
    },
  ]);
  return (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={serverity}>
          {error}
        </Alert>
      </Snackbar>
      <GridTable 
        columns={columns} 
        addNewUser={addNewUser} 
        list={users} error={error} 
        title="User" 
        message={msg} 
        updateIcon={update}
        allowUserChangeStatus={allowUserChangeStatus}
        userDetails={userInfo}
        statusref={statusref}
        />
    </div>
  );
}

UserList.propTypes = {
  actions: PropTypes.object,
  roles: PropTypes.array,
  sites: PropTypes.array,
  userInfo: PropTypes.object.isRequired
}

export default UserList;


