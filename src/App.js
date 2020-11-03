import React from 'react';
import logo from './logo.svg';
import './App.css';

async function fetchData() {
  const response = await fetch('http://localhost:8080/photos_public');

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const photos = await response.json();
  return photos;
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {photos: []};
  }



  componentDidMount(){
    fetchData().then(photos => {
      console.log(photos);
      if(photos && photos.items){
        const list = photos.items.map((item, index) =>

          <li key={index}>{item.title}
            <img src={item.media.m} alt={item.title}></img>
          </li>
        );
        this.setState({
          photos: list
        });
      }
    });
  }

  componentWillUnmount() {
  }
  render() {
    return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React {this.state.tes}
        </a>
        <ul>{this.state.photos}</ul>
      </header>
    </div>
  }
}
export default App;
