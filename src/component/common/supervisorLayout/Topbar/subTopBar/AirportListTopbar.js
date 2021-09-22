import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { useStyles} from '../../../../../assets/js/common';
import { useLocation, Link } from 'react-router-dom';


const AirportListTopbar = (props) => {

    const classes = useStyles();
    const location = useLocation();
    const path = location.pathname;
    var airportSelect = classes.dividerSubUnSelect;
    if (path === "/Airports") {
         airportSelect = <Divider className={classes.dividerSubSelect} />;

    }
    var countrySelect = classes.dividerSubUnSelect;
    if (path === "/Country") {
         countrySelect = <Divider className={classes.dividerSubSelect} />;

    }
    return (

        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
           
                <Link to="/Airports" style={{ textDecoration: 'none' }}>
                    <Grid item className={classes.contentHeading}>
                        Airport
                        {airportSelect ||  <Divider/>}
                    </Grid>
                </Link>
                <Grid item> <Divider/></Grid>
                <Link to="/Country" style={{ textDecoration: 'none' }}>
                    <Grid item className={classes.contentHeading} >
                        Country
                        {countrySelect||  <Divider/>}
                    </Grid>
                </Link>
               
        </Grid>

    )
}


export default AirportListTopbar;