import React, { useState, forwardRef, useRef } from 'react';
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
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { handleSubmit } from './BulkCheckConverter';
import Alert from '../common/Utilities/Alert';
import { useStyles } from './BulkGridCss';
import { SaveIcon, RejectIcon, EditIcon, TotalUser, CancelIcon } from './Icon';

const BulKGrid = (props) => {
  const { title, list, columns } = props;

  const tableRef = useRef();
  const classes = useStyles();
  const [data, setData] = useState(list);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [serverity, setServerity] = useState();
  let style = '';
  if (title === 'Country') {
    style = '0px 60px';
  }
  const tableIcons = {
    Add: forwardRef((props, ref) => ''),
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onCheck = async () => {
    const converted = handleSubmit(tableRef.current.dataManager.data);
    setData(converted.optdata);

    if (!converted.checkValue) {
      setError('Please enter mandatory fields with valid values');
      setOpen(true);
      setServerity('error');
    } else {
      props.submit(data);
    }
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={serverity}>
          {error}
        </Alert>
      </Snackbar>
      <MaterialTable
        icons={tableIcons}
        tableRef={tableRef}
        title={<TotalUser total={data && data.length} title="Record" />}
        columns={columns}
        data={data}
        options={{
          headerStyle: {
            backgroundColor: '#F1F9FB',
            fontFamily: 'Futura-Medium',
            fontSize: '20px',
            color: '#404040',
            padding: 4,
          },
          cellStyle: {
            fontFamily: 'Futura-Book',
            fontSize: '18px',
            color: '#404040',
            wordBreak: 'break-all',
            paddingTop: '1px',
            paddingBottom: '1px',
          },
          pageSize: 20,
          emptyRowsWhenPaging: false,
          pageSizeOptions: [20, 50, 100, 200],
          addRowPosition: 'first',
          actionsColumnIndex: -1,
          search: true,
          actionsCellStyle: { padding: style },
          debounceInterval: 2000,
        }}
        components={{
          Toolbar: (propsTool) => (
            <div style={{ fontFamily: 'Futura-Book', fontSize: '18px', color: '#404040' }}>
              <MTableToolbar {...propsTool} />
            </div>
          ),
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const edit = props.addNewUser(newData, 'add');
              edit.then(function (result) {
                if (result === false) {
                  reject();
                } else {
                  setTimeout(() => {
                    setData((prevState) => {
                      const dataCopy = [...prevState];
                      const index = dataCopy.indexOf(oldData);
                      dataCopy[index] = newData;
                      return dataCopy;
                    });
                    resolve();
                  }, 1000);
                }
              });
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />

      <Grid container className="float" direction="row" justify="flex-end" alignItems="flex-end" spacing={2}>
        <Grid item>
          <Button fullWidth variant="contained" onClick={(e) => props.onCancel()} className={classes.updatebtn}>
            <div className="submit">Cancel</div>
          </Button>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            className={(classes.submit, classes.cancelBtn)}
            onClick={() => onCheck()}
            variant="contained"
          >
            <div className={classes.submit}>Run Check</div>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

BulKGrid.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array,
  submit: PropTypes.func,
  addNewUser: PropTypes.func,
  columns: PropTypes.array,
};

const mapStateToProps = (state) => state.userInfo;
export default connect(mapStateToProps)(BulKGrid);
