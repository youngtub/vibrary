import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Input, Button} from 'semantic-ui-react';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Grid fluid={true} className='center'>
        <Row>
          <h2 className='center'>Welcome to the Vibrary!</h2>
          <h3>An extensive catalog of songs, analyzed through instrumentals/production/'Vibe'</h3>
        </Row>
        <br/><br/><br/>
        <Row>
          <img src='https://drive.google.com/uc?id=1bEsmi0UXdfDE0awAY5O0u6U1bB3v0lZK' />
        </Row>
        <hr/>
        <Row className='landingText'>
          Feel free to <a href='/browse'>Browse</a> our library, <a href='/explore'>Explore</a> connections between songs, and test out our 'Vibe Match' engine.
        </Row>
        <br/>
        <Row className='landingText'>
          To contribute, please go to <a href='/add'>Add</a> and add as many songs as you like!
        </Row>
      </Grid>
    )
  }
};

export default Landing
