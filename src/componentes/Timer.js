import React from 'react';
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
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer - 1,
      }));
    }, ONE_SECOND);
  }

  // shouldComponentUpdate(_nextProps, nextState) {
  //   const { timer } = nextState;
  //   return (timer !== 0);
  // }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.timer === 1) {
      clearInterval(this.intervalID);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    console.log('Timer Desmontado');
  }

  // handleTime = () => {
  //   setInterval(() => {
  //     this.setState((prev) => ({
  //       timer: prev.timer - 1,
  //     }));
  //   }, ONE_SECOND);
  // };

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
