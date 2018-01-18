import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Input, Button} from 'semantic-ui-react';
import axios from 'axios';
import * as d3 from 'd3';
import $ from 'jquery';

import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../actions';
import rootReducer from '../reducers/index.js';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      links: []
    }
  }

  componentWillMount = () => {
    axios.get('/api/db/explore')
    .then((res) => {
      console.log('res from explore: ', res.data)
      var nodes = res.data.nodes;
      var links = res.data.links
      this.setState({nodes, links}, this.generateChart)
    })
  }

  generateChart = () => {
    var that = this;
    d3.select('#canvas').selectAll('svg').remove();
    var width = $('#vizContainer').width();
    var height = width/1.5
    var svg = d3.select("#canvas").append("svg").attr("width", width).attr("height", height);
    var circleSize = (width/50)
    // *modesConfig[currMode].circleMultiple;
    var center = [width/2, height/2.35];

    var linkDistance = circleSize*9;
    var sim = d3.forceSimulation(this.state.nodes)
    .force("link", d3.forceLink(this.state.links)
      .id(d => d.title)
      .distance((d) => d.value > 0 ? linkDistance/(d.value) : linkDistance))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(center[0], center[1]))
    .force("gravity", d3.forceManyBody().strength(-200))
    .force('collision', d3.forceCollide()
      .radius(d=>circleSize*3)
      // .strength(d => 0.1)
    )
    .force("size", d3.forceManyBody([width, height]));
    // d3.forceCenter([width/2, height/2]);
    // d3.forceRadial(circleSize*5, width/2, height/2)
    // d3.forceCollide(circleSize*1.5)

    var link = svg.selectAll(".link").data(this.state.links).enter()
      .append("line")
      // .attr("class", (d) => `link ${d.source.title.replace(/\W+/g, " ")} ${d.target.title.replace(/\W+/g, " ")} ${d.target.type}`)
      .attr("stroke-width", (d) => d.value*3);
      // $('.link').toggle();
      $('.link').css('display', 'inline');

      link.on("click", (d) => {
        console.log('selected link', d);
      });

    var node = svg.selectAll(".node").data(this.state.nodes).enter()
    .append("g").attr("class", "node")
    .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
    );

      function dragstarted() {
      if (!d3.event.active) sim.alphaTarget(0.5).restart();
      d3.event.subject.fx = d3.event.subject.x;
      d3.event.subject.fy = d3.event.subject.y;
      }
      function dragged() {
      d3.event.subject.fx = d3.event.x;
      d3.event.subject.fy = d3.event.y;
      }
      function dragended() {
      if (!d3.event.active) sim.alphaTarget(0);
      d3.event.subject.fx = null;
      d3.event.subject.fy = null;
      }

      node.append("circle")
      .attr("r", (d) => circleSize)
      .attr("fill", (d) => colors[d.key])
      .attr("class", (d) => `node`)
      .style("stroke", (d) => 'black')
      .style("stroke-width", d => ['primary', 'secondary'].includes(d.type) ? 4 : 0);

      node.append('text')
      .text(d => d.title)
      .attr('class', d=> `title ${d.title}`)
      // .style('visibility', 'hidden');

      node.on('click', d => {
        var obj = {song: d}
        this.props.actions.selected(obj)
      });

      node.on('mouseover', d => {
        // $('.title').css('visibility', 'hidden');
        // $(`.${d.title}`).css('visibility', 'inline')
      })

  sim.on("tick", function() {

    link.attr("x1", d =>  d.source.x > width / 2 ? Math.min(d.source.x-30, width-(circleSize+30)) : Math.max(circleSize+25, d.source.x+25))
        .attr("y1", d =>  d.source.y > height / 2 ? Math.min(d.source.y-30, height-(circleSize+30)) : Math.max(circleSize+30, d.source.y+30))
        .attr("x2", d =>  d.target.x > width / 2 ? Math.min(d.target.x-30, width-(circleSize+30)) : Math.max(circleSize+25, d.target.x+25))
        .attr("y2", d => d.target.y > height / 2 ? Math.min(d.target.y-30, height-(circleSize+30)) : Math.max(circleSize+30, d.target.y+30))

    node.attr("transform", function(d) {
      var xcoord = d.x > width / 2 ? Math.min(d.x-30, width-(circleSize+30)) : Math.max(circleSize+25, d.x+25);
      var ycoord = d.y > height / 2 ? Math.min(d.y-30, height-(circleSize+30)) : Math.max(circleSize+30, d.y+30);
      return "translate(" + xcoord + "," + ycoord + ")"; });
    });
  }

  render() {
    return (
      <Grid fluid={true} id='vizContainer'>
        <Row id='canvas'>

        </Row>
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
)(Explore);
