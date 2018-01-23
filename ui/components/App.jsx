import React from 'react';
//redux
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../actions';
import rootReducer from '../reducers/index.js';
//router
import { Route, Switch, withRouter } from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import {Button} from 'semantic-ui-react';

import Add from './Add.jsx';
import Browse from './Browse.jsx';
import Panel from './Panel.jsx';
import Explore from './Explore.jsx';
import Landing from './Landing.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: ''
    }
  }

  componentWillReceiveProps(){
    // console.log('props', this.props)
  }

  render() {
    return (
      <Grid fluid={true}>
        <Row id='header'>
          <Row>
          <Col md={9}>
            <a href='/'>
              <h1 id='banner'>Vibrary</h1>
            </a>
          </Col>
          <Col md={3} style={navStyle}>
            <br/>
            <Button href='/add'>Add</Button>
            <Button href='/browse'>Browse</Button>
            <Button href='/explore'>Explore</Button>
          </Col>
          </Row>
          <br/><br/>
        </Row>
        <hr/>
        <Row id='main'>
          <Col md={9} sm={9} xs={9}>
            <Switch>
              <Route exact path = '/' component={Landing} />
              <Route exact path = '/add' component={Add}/>
              <Route exact path = '/browse' component={Browse} />
              <Route exact path = '/explore' component={Explore} />
            </Switch>
          </Col>
          <Col md={3} sm={3} xs={3}>
            <Panel selected={this.props.selected} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

const navStyle = {
  float: 'right',
  padding: '10px'
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
)(App);
