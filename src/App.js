import React from 'react';
import './App.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

async function fetchData(tags) {
  let api_server = "https://young-waters-17562.herokuapp.com/";
  // let api_server = "http://localhost:8080/";
  const response = await fetch(api_server+'photos_public?tags='+tags);

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
    this.state = {photos: [], title: "Photos", tags: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handlePhotos(){
    fetchData(this.state.tags).then(photos => {
      if(photos && photos.items){
        this.setState({
          photos: photos.items,
          title: photos.title
        });
      }
    });
  }

  componentDidMount(){
    this.handlePhotos();
    this.timerID = setInterval(
      () => this.handlePhotos(),
      10000
    );
  }

  handleChange(event) {
    this.setState({tags: event.target.value});
  }

  handleSearch(event){
    this.handlePhotos();
    event.preventDefault();
  }

  componentWillUnmount() {
    this.setState({
      photos: [],
      title: "",
      tags: ""
    });
    clearInterval(this.timerID);
  }
  

  render() {
    return <div className="App-header">
    <Container maxWidth="sm">
  
      <GridList cellHeight={180}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <Typography variant="h4" component="h1" gutterBottom>
          {this.state.title}
          </Typography>
          <form onSubmit={this.handleSearch}>
            <TextField id="tags" value={this.state.tags} onChange={this.handleChange} label="Search image by tags" variant="outlined"/>        
          </form>
        </GridListTile>
        {this.state.photos.map((tile, index) => (
          <GridListTile key={index}>
            <img src={tile.media.m} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
        
            />
          </GridListTile>
        ))}
      </GridList>
      </Container>
    </div>
       
  }
}

export default App;
