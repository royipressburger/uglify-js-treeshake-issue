/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'ramda/es/sortBy';
import reverse from 'ramda/es/reverse';
import reduce from 'ramda/es/reduce';
import values from 'ramda/es/values';
import keys from 'ramda/es/keys';
import sort from 'ramda/es/sort';
import map from 'ramda/es/map';
import prop from 'ramda/es/prop';
import { withFauxDOM } from 'react-faux-dom';
import { scaleSqrt, scaleLinear } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { pack, hierarchy } from 'd3-hierarchy';
import { interpolateRgb } from 'd3-interpolate';
import 'd3-transition';

// For the component to work properly pass array of objects, each one of them as a uniqe id.
// Its is important not to change the minValue and maxValue.
// Pass them to the component once and do not change them. It can cause to render issues they change
class Bubbles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      legend: [],
      top: 0,
      left: 0,
      content: {},
    };
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.draw();
    }
  }

  // Temporary until we add the untils function
  getColorRange() {
    return scaleLinear()
      .domain([this.props.minValue, (this.props.maxValue - this.props.minValue) / 2, this.props.maxValue])
      .interpolate(interpolateRgb)

      // hard coded untill desginer will answer
      .range(['#4AA8FF', '#3680C5', '#21598D']);
  }

  sortData(data) {
    return reverse(sortBy(prop(this.props.valueFieldName))(data));
  }

  draw() {
    const sortedData = this.sortData(this.props.data);
    const dataSet = { children: sortedData };
    const colorRange = this.getColorRange();
    const nodes = hierarchy(dataSet).sum(d => d[this.props.valueFieldName]);
    const bubbleSizeScale = scaleSqrt()
      .domain([
        this.props.minValue,
        this.props.maxValue,
      ])
      .range([this.props.minRaduis, this.props.maxRaduis]);

    const bubbles = pack()
      .size([this.props.width, this.props.height])
      .radius(d => bubbleSizeScale(d.value))
      .padding(this.props.bubblePadding);

    // Faux Dom
    const svg = d3Select('svg')
      .attr('viewBox', `0 0 ${this.props.width} ${this.props.height}`)
      .attr('width', this.props.width)
      .attr('height', this.props.height)
      .attr('class', 'bubble');

    const self = this;
    const node = svg.selectAll('.node')
      // Render the data acourding to the node id and value
      .data(bubbles(nodes).descendants(), d => `${d.data.id}-${d.data[this.props.valueFieldName]}`);

    const bubbleContainer = node
      .enter()
      .filter(d => !d.children)
      .append('g')
      .style('cursor', 'pointer')
      .attr('class', 'node')
      .attr('id', d => `a${d.data.id}`)
      .attr('transform', d => `translate(${d.x},${d.y})`);


    bubbleContainer
      .append('circle')
      .enter();

    svg.selectAll('circle')
      .style('fill', d => colorRange(d.data[this.props.valueFieldName]))
      .attr('r', 1);

    bubbleContainer
      .append('text')
      .attr('dy', '7px')
      .attr('class', 'bubble-text-title')
      .style('text-anchor', 'middle')
      .style('opacity', 0)
      .text(d => d.data[this.props.textFieldName]);

    node.exit().remove();

    svg.selectAll('.node')
      .transition()
      .duration(500)
      .attr('transform', d => `translate(${d.x},${d.y})`);

    svg.selectAll('circle')
      .transition()
      .duration(200)
      .attr('r', d => d.r);

    // Wait for bubbles to render then show the text
    setTimeout(() => {
      d3Select(this.graph)
        .selectAll('.bubble-text-title')
        .each(d3WrapText)
        .style('opacity', 1);
    }, 250);

    this.props.animateFauxDOM(1000);

  }

  render() {
    return (
      <div className="bubbles" ref={r => this.graph = r}>
        <svg>
        </svg>
      </div>
    );
  }
}

Bubbles.propTypes = {
  data: PropTypes.array.isRequired,
  maxValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  animateFauxDOM: PropTypes.func.isRequired,
  connectFauxDOM: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  bubbles: PropTypes.any, // Faux element
  valueFieldName: PropTypes.string,
  textFieldName: PropTypes.string,
  categoryFieldName: PropTypes.string,
  maxRaduis: PropTypes.number,
  minRaduis: PropTypes.number,
  bubblePadding: PropTypes.number,
  legend: PropTypes.bool,
};

Bubbles.defaultProps = {
  width: 800,
  height: 500,
  bubbles: '',
  valueFieldName: 'value',
  textFieldName: 'text',
  categoryFieldName: 'category',
  maxRaduis: 85,
  minRaduis: 35,
  bubblePadding: 5,
  legend: false,
};

/**
Cut d3 text to '...'
usage:
d3.select('something')
  .append('text')
  .text('some long text')
  .each(d3WrapText)
*/
function d3WrapText() {
  const self = d3Select(this);
  const { width } = self.node().parentNode.children[0].getBBox();
  if (width === 0) return;

  const padding = 8;
  let textLength = self.node().getComputedTextLength();
  let text = self.text();

  while (textLength > (width - 2 * padding) && text.length > 0) {
    text = text.slice(0, -1);
    self.text(`${text}...`);
    textLength = self.node().getComputedTextLength();
  }
}

export default withFauxDOM(Bubbles);
