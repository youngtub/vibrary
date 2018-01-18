import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Input, Button} from 'semantic-ui-react';
import axios from 'axios';
import Player from 'react-player';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: false,
      loop: true
    }
  }

  componentWillReceiveProps() {
    setTimeout(()=>{console.log('props in panel: ', this.props)}, 500)
  }

  toggleAutoplay = () => {
    this.setState({autoplay: !this.state.autoplay})
  }

  toggleLoop = () => {
    this.setState({loop:!this.state.loop})
  }

  checkProgress = (prog) => {
    console.log('in check prog')
    var current = prog.playedSeconds;
    var cutoff; this.props.selected.song ? cutoff = this.props.selected.song.cutoff : cutoff=10;
    var currFloor = Math.floor(current);
    var songFloor = Math.floor(cutoff);
    console.log('current: ', currFloor)
    if(currFloor === songFloor && this.state.loop) this.player.seekTo(0)
  }

  ref = (player) => {
   this.player = player
 }

  render() {
    return (
      <Grid fluid={true}>
        <div style={playerContainer}>
          <Player url={this.props.selected.song ? 'https://www.youtube.com/watch?v=' + this.props.selected.song.yid : 'https://www.youtube.com/watch?v=XhlZqtpB5Us'} style={playerStyle}
            onProgress={this.checkProgress} progressFrequency={400}
            onReady={()=>console.log('Ready')}
            ref={this.ref} controls={true} playing={this.state.autoplay}
            />
            <Button toggle active={this.state.autoplay} onClick={this.toggleAutoplay}>
              Autoplay
            </Button>
            <Button toggle active={this.state.loop} onClick={this.toggleLoop}>
              Loop
            </Button>
        </div>
        <h3>
          {this.props.selected.song ? (
            this.props.selected.song.producers.join(', ') + ' - ' + this.props.selected.song.title + ' (' + this.props.selected.song.vocals.join(', ') + ')'
        ) : 'Frank Dukes, Murda Beatz - Built My Legacy (Kodak Black, Offset)'}
      </h3>

      </Grid>
    )
  }
};

const playerContainer = {
  // width: '5vw',
  // height: '5vh'
}

const playerStyle = {
  width: '20vw',
  height: '30vh'
}

export default Panel
