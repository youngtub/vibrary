import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Input, Button} from 'semantic-ui-react';
import axios from 'axios';
import Player from 'react-player';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillReceiveProps() {
    setTimeout(()=>{console.log('props in panel: ', this.props)}, 500)
  }

  render() {
    return (
      <Grid fluid={true}>
        <div style={playerContainer}>
          <Player url={this.props.selected.song ? 'https://www.youtube.com/watch?v=' + this.props.selected.song.yid : 'https://www.youtube.com/watch?v=XhlZqtpB5Us'} style={playerStyle}/>
        </div>
      </Grid>
    )
  }
};

const playerContainer = {
  width: '50%',
  height: '50%'
}

const playerStyle = {
  height: '50%',
  width: '50%'
}

export default Panel
