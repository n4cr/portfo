/**
 * Created by nasir on 06/10/2017.
 */
import React from 'react';

const SPIN = '-\\|/'

export default class Loading extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      timer: null,
    };
  }

  componentDidMount() {
    let timer = setInterval(this.tick.bind(this), 100);
    this.setState({
        ...this.state,
      timer
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick() {
    this.setState({
        ...this.state,
      counter:this.state.counter < 3 ? this.state.counter + 1 : 0
    });
  }

  render() {
    return (
        <span>Loading {SPIN[this.state.counter]}</span>
    )

  }

}
