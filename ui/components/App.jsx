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

  handleChange = (e) => {
    this.setState({
      val: e.target.value
    }, () => {
      console.log('val in state', this.state.val)
      this.props.actions.test(this.state)
    })
  }

  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col md={9}>
            <h2>Vibrary</h2>
          </Col>
          <Col md={3} style={navStyle}>
            <Button href='/add'>Add</Button>
            <Button href='/browse'>Browse</Button>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Switch>
            <Route exact path = '/add' component={Add}/>
            <Route exact path = '/browse' component={Browse} />
          </Switch>
        </Row>
      </Grid>
    )
  }
}

const navStyle = {
  float: 'right'
}

const mapStateToProps = (state) => ({
  test: state.TEST,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
