import React, { Component } from "react";
import TweenLite from "gsap";
import "gsap/src/minified/plugins/EndArrayPlugin.min.js";

const toFixed = 0;
class TitleValue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      transition: [0],
      date: ""
    };
  }

  componentWillMount() {
    this.setState({ date: this.props.date });
  }
  componentWillUnmount() {
    TweenLite.killTweensOf(this.state.transition);
  }

  componentDidMount() {
    this._updateNumValue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (typeof nextProps.value === "number") {
        this._updateNumValue(nextProps);
      }
    }
  }

  _updateNumValue(props) {
    if (this.props.autoAnimate) {
      if (typeof props.value === "number") {
        var newValue = parseFloat(props.value);
        TweenLite.to(this.state.transition, 2, {
          endArray: [newValue],
          onUpdate: this._updateValue
        });
      }
    } else {
      this._setValueFormat(props.value);
    }
  }

  _updateValue() {
    let newValue = this.state.transition[0];
    if (this.props.toFixed === 0) {
      newValue = parseInt(newValue);
    } else {
      newValue = Number(newValue.toFixed(this.props.toFixed));
    }
    this._setValueFormat(newValue);
  }

  _setValueFormat(value) {
    if (this.props.numberFormat && typeof value === "number") {
      if (this.props.length !== 0 && value.toString().length < this.props.length) {
        const num = this.props.length - this.props.value.toString().length;
        let str = "";
        for (let i = 0; i < num; i++) {
          str += "0";
        }
        value = str + value.toLocaleString();
      } else {
        value = value.toLocaleString();
      }
    }
    this.setState({ value: value });
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        {this.state.value}
      </div>
    );
  }
}

export default TitleValue;
