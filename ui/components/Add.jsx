import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Input, Button} from 'semantic-ui-react';
import axios from 'axios';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      sugs: []
    }
  }

  handleChange = (e) => {
    let q = e.target.value;
    this.setState({q})
    var params = {q}
    axios.get('/api/autocomplete', {params})
    .then((res) => {
      console.log('res in front: ', res.data);
      var sugs = res.data.data.autocomplete;
      if (!sugs || sugs === null) sugs = []
      this.setState({sugs})
    })
  };

  selectSong = (song) => {
    let id = song.id;
    var params = {id}
    axios.get('/api/songLookup', {params})
    .then((res) => {
      console.log('song data: ', res.data)
      var newSong = res.data.data.song;
      var body = {
        song: newSong,
        artists: song.artists
      }
      axios.post('/api/db/newSong', body)
      .then((resp) => {
        console.log('resp from new song: ', resp.data)
      })
    })
  }

  render() {
    return (
      <Grid fluid={true}>
        <Input value={this.state.q} onChange={this.handleChange} placeholder='search' />
        <br/><br/>
        {this.state.sugs.length > 0 ? (
          this.state.sugs.map((item, i) => (
            <Row>
              <Col md={8}>
                {item.title} ({item.attr})
                <br/>
                {item.attr !== 'artist' ? item.artists.join(',') : ''}
              </Col>
              <Col md={4}>
                <Button icon='plus square outline' onClick={()=>this.selectSong(item)} />
              </Col>
              <br/><br/><br/>
            </Row>
        )
      )):''}
      </Grid>
    )
  }
};

export default Add
