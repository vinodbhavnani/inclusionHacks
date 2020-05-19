import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        type="button"
        {...this.props}
      >
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired
};
