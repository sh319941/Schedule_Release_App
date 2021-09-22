import React, { useState, forwardRef, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable, { MTableToolbar } from 'material-table';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TablePagination } from '@material-ui/core';
import activateIcon from '../../assets/images/sidebarImage/activate.png';
import deactivateIcon from '../../assets/images/sidebarImage/deactivate.png';
import { SaveIcon, RejectIcon, EditIcon, TotalUser, AddIcon, CancelIcon } from './Icon';
import { useStyles } from '../../assets/css/gridCss';
import { ExportCSV } from './exports';

function GridTable(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [icon, setIcon] = useState('');
  const { message } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const tableRef = useRef();
  const [userData, setUserData] = useState();
  const [total, setTotal] = useState(props.list.length > 0 && props.list.length);
  const { title } = props;
  const [btnName, setBtnName] = useState('');
  const [tableData, setTableData] = useState(props.list);
  const [stateChange, setStateChange] = useState(false);
  let style = '';
  if (title === 'Country') {
    style = '0px 60px';
  }
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddIcon {...props} title={title} ref={ref} />),
    Check: forwardRef((props, ref) => <SaveIcon {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <RejectIcon {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <CancelIcon {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const handleStatusChange = (rowData) => {
    const { userDetails } = props;

    if (userDetails && userDetails.emailAddress === rowData.emailAddress) {
      props.allowUserChangeStatus(rowData);
      setOpen(false);
    }
  };

  const handleEditChangeStatus = (rowData) => {
    const { userDetails, statusref: { current } = {} } = props;

    if (
      userDetails &&
      userDetails.emailAddress === rowData.emailAddress &&
      current &&
      current.value !== userDetails.active
    ) {
      props.allowUserChangeStatus(rowData);
      setOpen(false);
    }
  };

  const onmodalClick = (data) => {
    setOpen(false);
    if (data === 'Yes') {
      if (btnName === 'Deactivate') {
        props.addNewUser(userData, 'deactivate');
      }
      if (btnName === 'Yes') {
        props.addNewUser(userData, 'edit');
      }
      if (btnName === 'Activate') {
        props.addNewUser(userData, 'activate');
      }
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <CssBaseline />
            <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
              <Grid item>{icon}</Grid>
              <Grid item className="login-user-type">
                {type}
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.btnPadding}
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Button
                  fullWidth
                  className={classes.updatebtn}
                  onClick={(e) => onmodalClick('Yes')}
                  variant="contained"
                  width="80%"
                >
                  <div className="submit">{btnName}</div>
                </Button>
              </Grid>
              <Grid item>
                <Button fullWidth variant="contained" onClick={(e) => onmodalClick('No')} className={classes.cancelBtn}>
                  <div className="submit">Cancel</div>
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>

      <MaterialTable
        icons={tableIcons}
        tableRef={tableRef}
        onSearchChange={(event) => {
          setTotal(tableRef.current.dataManager.searchedData.length);
          setTableData(tableRef.current.dataManager.searchedData);
          setStateChange(true);
        }}
        title={<TotalUser total={total || (props.list && props.list.length)} title={props.message.title} />}
        columns={props.columns}
        components={{
          OverlayLoading: () => <div />,
          Toolbar: (props) => (
            <div style={{ fontFamily: 'Futura-Book', fontSize: '18px', color: '#404040' }}>
              <MTableToolbar {...props} />
            </div>
          ),

          // eslint-disable-next-line react/display-name
          Pagination: (pageProps) => (
            <>
              <td>
                <ExportCSV exportData={stateChange ? tableData : props.list} fileName={title} />
              </td>
              <TablePagination
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...pageProps}
              />
            </>
          ),
        }}
        data={props.list}
        actions={[
          (rowData) => {
            if (typeof rowData.active !== 'undefined') {
              return {
                icon: () => <SaveIcon />,
                tooltip: 'Activate',
                onClick: (event, rowData) => {
                  setUserData(rowData);
                  setOpen(true);
                  setIcon(<img src={activateIcon} alt="Activate" />);
                  setBtnName('Activate');
                  setType(message.activate);
                  handleStatusChange(rowData);
                },
                hidden: rowData.active === true,
              };
            }
            return null;
          },
          (rowData) => {
            if (typeof rowData.active !== 'undefined') {
              return {
                icon: () => <CancelIcon />,
                tooltip: 'Deactivate',
                onClick: (event, rowData) => {
                  setUserData(rowData);
                  setOpen(true);
                  setIcon(<img src={deactivateIcon} alt="Deactivate" />);
                  setBtnName('Deactivate');
                  setType(message.deactivate);
                  handleStatusChange(rowData);
                },
                hidden: rowData.active === false,
              };
            }
            return null;
          },
        ]}
        options={{
          headerStyle: {
            backgroundColor: '#F1F9FB',
            fontFamily: 'Futura-Medium',
            fontSize: '20px',
            color: '#404040',
            paddingTop: 5,
            paddingBottom: 5,
          },
          cellStyle: {
            paddingTop: '5px',
            paddingBottom: '5px',
            fontFamily: 'Futura-Book',
            fontSize: '18px',
            color: '#404040',
            wordBreak: 'break-all',
          },
          addRowPosition: 'first',
          actionsColumnIndex: -1,
          search: true,
          actionsCellStyle: { padding: style },
          debounceInterval: 2000,
          pageSize: 10,
          emptyRowsWhenPaging: false,
          pageSizeOptions: [10, 20, 50, 100],
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              const newUser = props.addNewUser(newData, 'add');
              newUser.then(function (result) {
                if (result === false) {
                  reject();
                } else {
                  setTimeout(() => {
                    setTotal(parseInt(total) + parseInt(1));
                    resolve();
                  }, 1000);
                }
              });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const editUser = props.addNewUser(newData, 'editValidate');
              editUser.then(function (result) {
                if (result === false) {
                  reject();
                } else {
                  setOpen(true);
                  setUserData(newData);
                  setIcon(<img src={props.updateIcon} alt="Update" />);
                  setBtnName('Yes');
                  setType(message.update);
                  handleEditChangeStatus(newData);
                  reject();
                }
              });
            }),
        }}
      />
    </>
  );
}

GridTable.propTypes = {
  columns: PropTypes.array,
  message: PropTypes.object,
  title: PropTypes.string,
  addNewUser: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  list: PropTypes.array,
  allowUserChangeStatus: PropTypes.func.isRequired,
  updateIcon: PropTypes.string,
  statusref: PropTypes.object,
};
export default GridTable;
