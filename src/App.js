import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

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
    <main className="MuiContainer-root">
       
        <div>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Flickr Test
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              
              {this.state.title}
            </Typography>
            <center>
              <form onSubmit={this.handleSearch}>
                <TextField id="tags" value={this.state.tags} onChange={this.handleChange} label="Search image by tags" variant="outlined"/>        
              </form>
            </center>
          </Container>
        </div>
        <Container className="cardGrid" maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {this.state.photos.map((tile, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card className="card">
                  <CardMedia
                    component="img"
                    className="cardMedia"
                    image={tile.media.m}
                    title={tile.title}
                  />
                  <CardContent className="cardContent">
                    <Typography gutterBottom variant="h5" component="h2">
                      {tile.title}
                    </Typography>
                    <Typography>
                      by {tile.author}
                    </Typography>
                    <Typography>
                      <a href={tile.link} target="_blank" rel="noreferrer">View</a>
                    </Typography>
                  </CardContent>
                  
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

    </div>
       
  }
}

export default App;
