import React from 'react';
import './App.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
    this.state = {photos: [], title: "Photos"};
  }



  componentDidMount(){
    fetchData().then(photos => {
      console.log(photos);
      if(photos && photos.items){
        this.setState({
          photos: photos.items,
          title: photos.title
        });
      }
    });

  }

  componentWillUnmount() {
  }
  
  render() {
    return <div className="App-header">
    <Container maxWidth="sm">
  
      <GridList cellHeight={180}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <Typography variant="h4" component="h1" gutterBottom>
          {this.state.title}
          </Typography>        
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
