import React, { Component } from 'react';

export default class InputNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.getInitValue(props),
    };
  }
  isControlled = (props) => {
    return 'value' in (props || this.props);
  }
  getInitValue = (props) => {
    return this.isControlled(props) ? props.value : props.defaultValue;
  }
  getCurrentValue = () => {
    return this.isControlled() ? this.props.value : this.state.value;
  }
  handleChange = (e) => {
    const { onChange } = this.props;
    if (this.isControlled()) {
      if (onChange) {
        onChange(e);
      }
    } else {
      this.setState({ value: e.target.value });
      if (onChange) {
        onChange(e);
      }
    }
  }
  render() {
    return (
      <input {...this.props} onChange={this.handleChange} value={this.getCurrentValue()} />
    );
  }
}
