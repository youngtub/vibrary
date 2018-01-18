import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Input, Button} from 'semantic-ui-react';
import axios from 'axios';

import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../actions';
import rootReducer from '../reducers/index.js';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [],
      songs: [],
      q:'',
      match: []
    }

  }

  componentWillMount() {
    axios.get('/api/db/allSongs')
    .then((allSongs) => {
      var songs = allSongs.data;
      this.setState({library:songs, songs})
    })
  };

  componentWillReceiveProps() {
    setTimeout(() => {console.log('props in browse', this.props)}, 500)
  }

  handleChange = (e) => {
    let q = e.target.value;
    var filtered = this.state.library.filter(song => {
      var flag = false;
      if (song.title.toLowerCase().includes(q)) flag = true;
      song.artists.forEach(art => {
        if(art.toLowerCase().includes(q)) flag = true
      })
      return flag
    })
    this.setState({q, songs: filtered})
  };

  selectSong = (selected) => {
    var params = {title: selected.title};
    axios.get('/api/db/similarVibe', {params})
    .then((res) => {
      console.log('res from sim: ', res.data);
      var match = res.data;
      this.setState({match}, () => {this.props.actions.selected({song: selected})})
    })
  }

  render() {
    return (
      <Grid fluid={true}>
        <br/>
        <Col md={6}>
          <Row>
            <h3 className='center'>Library</h3>
            <Input value={this.state.q} onChange={this.handleChange} placeholder='search' />
          </Row>
          <br/><br/>
          <Row>
            {this.state.songs.map((song, i) => (
              <Row>
                <Button onClick={()=>this.selectSong(song)} style={songDisplay}>
                  {song.title + ' - ' + song.vocals.join(', ') + ' (prod. ' + song.producers.join(', ') + ')'}
                </Button>
                <br/><br/>
              </Row>
            ))}
            <br/>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <h3 className='center'>Vibe Match</h3>
          </Row>
          <br/>

          {this.props.selected.song ? (
            <Row>

              <h3 className='center'>
                {this.props.selected.song.title + ' - ' + this.props.selected.song.vocals.join(', ') + ' (prod. ' + this.props.selected.song.producers.join(', ') + ')'}
              </h3>
            <Row>
              {this.state.match.map((song, i) => (
                <Row>
                <Button style={songDisplay}>
                  {song.title + ' - ' + song.vocals.join(', ') + ' (prod. ' + song.producers.join(', ') + ')' + ' - ' + song.percDev + '%'}
                </Button>
                <br/><br/>
                </Row>
              ))}
            </Row>

            </Row>
          ) : ''}

        </Col>
      </Grid>
    )
  }
};

const colors = {
  0: '#135996',
  1: '#7a0791',
  2: '#a00808',
  3: '#a00874',
  4: '#8c5748',
  5: '#221896',
  6: '#9e6717',
  7: '#b76b1f',
  8: '#370577',
  9: '#9b8317',
  10: '#0a5427',
  11: '#77130e'
}

const songDisplay = {
  marginLeft: '2%'
}

const mapStateToProps = (state) => ({
  test: state.TEST,
  selected: state.selected
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
