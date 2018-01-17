import React from 'react';
//redux
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import * as ChangeActions from '../actions';
import rootReducer from '../reducers/index.js';
//router
import { Route, Switch, withRouter } from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';

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
      </Grid>
    )
  }
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
