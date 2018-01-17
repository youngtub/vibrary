import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Input, Button} from 'semantic-ui-react';
import axios from 'axios';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [],
      q:'',
      selected: {},
      match: []
    }

  }

  componentWillMount() {
    axios.get('/api/db/allSongs')
    .then((allSongs) => {
      this.setState({library:allSongs.data})
    })
  }

  handleChange = (e) => {
    let q = e.target.value;
    this.setState({q})
  };

  selectSong = (selected) => {
    var params = {title: selected.title};
    axios.get('/api/db/similarVibe', {params})
    .then((res) => {
      console.log('res from sim: ', res.data);
      var match = res.data;
      this.setState({selected, match})
    })
  }

  render() {
    return (
      <Grid fluid={true}>
        <br/>
        <Col md={6}>
          <Row>
            <h3>All Songs:</h3>
            <Input value={this.state.q} onChange={this.handleChange} placeholder='search' />
          </Row>
          <br/><br/>
          <Row>
            {this.state.library.map((song, i) => (
              <Row>
                <Button onClick={()=>this.selectSong(song)} style={songDisplay}>
                  {song.title + ' - ' + song.artists.join(', ')}
                </Button>
                <br/><br/>
              </Row>
            ))}
            <br/>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            Vibe Match
          </Row>
          <br/>

          {this.state.match.length > 0 ? (
            <Row>

              <h3>
                {this.state.selected.title + ' - ' + this.state.selected.artists.join(',')}
              </h3>
            <Row>
              {this.state.match.map((song, i) => (
                <p style={songDisplay}>
                  {song.title + ' - ' + song.artists.join(',') + '(' + song.percDev + '%)'}
                </p>
              ))}
            </Row>

            </Row>
          ) : ''}

        </Col>
      </Grid>
    )
  }
};

const songDisplay = {
  marginLeft: '2%'
}

export default Browse
