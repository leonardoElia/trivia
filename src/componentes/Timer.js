import React from 'react';

const ONE_SECOND = 1000;
// const thirty = 30;

class Timer extends React.Component {
  state = {
    timer: 30,
    // waitTimer: true,
  };

  // handleFiveTime = () => {
  //   this.setState({
  //     waitTimer: true,
  //   });
  //   const FIVE = 5000;
  //   setTimeout(() => {
  //     this.setState({
  //       waitTimer: false,
  //     });
  //   }, FIVE);
  // };

  componentDidMount() {
    // setInterval(() => {
    //   this.setState((prev) => ({
    //     timer: prev.timer === 0 ? thirty
    //       : prev.timer - 1,
    //   }));
    // }, ONE_SECOND);
    this.handleTime();
  }

  // shouldComponentUpdate(_nextProps, nextState) {
  //   const { timer } = nextState;
  //   return (timer !== 0);
  // }

  componentWillUnmount(props, state) {
    if (state.timer === 0) {
      this.handleTime();
    }
  }

  handleTime = () => {
    setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer - 1,
      }));
    }, ONE_SECOND);
  };

  render() {
    const { timer } = this.state;
    return (
      <h2>
        { timer }
      </h2>
    );
  }
}

export default Timer;
