import React, { Component } from "react";
import dashbroad from "./assets/dashbroad.png";
import dashbroadCircle from "./assets/dashbroadCircle.png";
import btn from "./assets/dashbroadArrow.png";
import NumberFormat from "./NumberFormat";
import "./App.css";

class DashBoardCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oragin: -35
    };
  }

  static getDerivedStateFromProps(props) {
    const max = props.value[0];
    const cur = props.value[1];
    return {
      oragin: parseInt((cur / max) * 180, 10) - 218
    };
  }

  componentDidMount() {
    const max = this.props.value[0];
    const cur = this.props.value[1];
    if (cur === 0) {
      this.setState({
        oragin: -35
      });
    } else {
      this.setState({
        oragin: parseInt((cur / max) * 180, 10) - 218
      });
    }
  }

  render() {
    return (
      <div style={this.props.style}>
        <img src={dashbroad} className="dashbroad" alt="" />
        <div className="InnerRing" style={{ transform: `rotate(${this.state.oragin}deg)` }}>
          <img src={btn} className="btn" alt="" />
        </div>
        <img src={dashbroadCircle} alt="" className="dashbroadCircle" />

        <NumberFormat className="numberFormat" value={this.props.value[1]} />
      </div>
    );
  }
}

export default DashBoardCharts;
