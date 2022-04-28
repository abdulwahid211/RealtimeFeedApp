import * as React from 'react';
import { render } from 'react-dom';

interface AppProps{
  name:string
}

class App extends React.Component<AppProps> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      name: null
    };
  }
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
      </div>

    );
  }
}

render(<App name="Yaaaaah baby!"/>, document.getElementById("root"));