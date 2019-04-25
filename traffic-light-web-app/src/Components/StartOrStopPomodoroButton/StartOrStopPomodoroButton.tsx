import Button from '@material-ui/core/Button';
import React from 'react';
import Axios from "axios";

const startText = "Start";
const stopText = "Stop";
const url = "http://localhost:5000/api/startOrStopPomodoro";

interface IStartOrStopPomodoroButtonProps {
    isStarted: boolean;
}

interface IStartOrStopPomodoroButtonState {
    isStarted: boolean;
}

export default class StartOrStopPomodoroButton extends React.Component<IStartOrStopPomodoroButtonProps, IStartOrStopPomodoroButtonState> {

    constructor(props: IStartOrStopPomodoroButtonProps) {
      super(props);

      this.state = {isStarted: props.isStarted};

      this.startOrStopPomodoro = this.startOrStopPomodoro.bind(this);
    }

    async startOrStopPomodoro() {
        this.setState(state => ({ isStarted: !state.isStarted }));

        await Axios.get(url);
    }
  
    render() {
      return (
        <Button variant="contained" color="primary" onClick={this.startOrStopPomodoro}>
            {this.state.isStarted
                ? stopText
                : startText}
        </Button>
      );
    }
}