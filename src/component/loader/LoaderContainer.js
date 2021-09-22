import { connect } from 'react-redux';

import loader from '../../redux/loader';
import LoaderComponent from './LoaderComponent';

const mapStateToProps = (state) => ({
  isLoader: state[loader.name].isLoader,
});

export default connect(mapStateToProps)(LoaderComponent);
