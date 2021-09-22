import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

class NestedMenuItem extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    parentMenuOpen: PropTypes.bool.isRequired,
    rightIcon: PropTypes.object,
    highlightColor: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      subMenuOpen: false,
    };
    this.rightIcon = this.props.rightIcon ? this.props.rightIcon : '';
    this.highlightColor = this.props.highlightColor ? this.props.highlightColor : '#eeeeee';
  }

  render() {
    return (
      <div
        onMouseEnter={(e) => {
          e.stopPropagation();
          this.setState({ subMenuOpen: true });
          this.refs.subMenuItem.style.backgroundColor = this.highlightColor;
        }}
        onMouseLeave={(e) => {
          this.setState({ subMenuOpen: false });
          this.refs.subMenuItem.style.backgroundColor = 'white';
        }}
        onClick={(e) => {
          e.stopPropagation();
          this.setState({ subMenuOpen: !this.state.subMenuOpen });
        }}
      >
        <MenuItem ref="subMenuItem">
          {this.props.label}
          {this.rightIcon}
        </MenuItem>
        <Menu
          style={{ pointerEvents: 'none' }}
          anchorEl={this.refs.subMenuItem}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={this.state.subMenuOpen && this.props.parentMenuOpen}
          onClose={() => {
            this.setState({ subMenuOpen: false });
          }}
        >
          <div style={{ pointerEvents: 'auto', width: 330 }}>{this.props.children}</div>
        </Menu>
      </div>
    );
  }
}

export default NestedMenuItem;
