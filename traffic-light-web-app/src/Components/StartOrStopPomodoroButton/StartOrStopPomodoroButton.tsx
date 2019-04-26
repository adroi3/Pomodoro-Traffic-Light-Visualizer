import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import Axios from "axios";

const startText = "Start";
const stopText = "Stop";
const url = "http://localhost:5000/api/startOrStopPomodoro";
const greenTheme = createMuiTheme({
  palette: {
    primary: green,
  },

});
const redTheme = createMuiTheme({
  palette: {
    primary: red,
  },

});
const buttonStyle = {
  width: 100,
};

interface IStartOrStopPomodoroButtonProps {
  isStarted: boolean;
}

interface IStartOrStopPomodoroButtonState {
  isStarted: boolean;
}

export default class StartOrStopPomodoroButton extends React.Component<IStartOrStopPomodoroButtonProps, IStartOrStopPomodoroButtonState> {

  constructor(props: IStartOrStopPomodoroButtonProps) {
    super(props);

    this.state = { isStarted: props.isStarted };

    this.startOrStopPomodoro = this.startOrStopPomodoro.bind(this);
  }

  async startOrStopPomodoro() {
    this.setState(state => ({ isStarted: !state.isStarted }));

    await Axios.get(url);
  }

  render() {
    return (
      <MuiThemeProvider theme={this.state.isStarted
        ? redTheme
        : greenTheme}>
        <Button style={buttonStyle} color="primary" variant="contained" onClick={this.startOrStopPomodoro}>
          {this.state.isStarted
            ? stopText
            : startText}
        </Button>
      </MuiThemeProvider>
    );
  }
}