import * as d3 from 'd3';
import { useEffect } from 'react';
import { useEmoStates } from '../hooks/useEmoStates';

function OneDayViz() {
  const { emoStates, loadEmoStates } = useEmoStates();

  const shadesOfGrey = [
    '#191919',
    '#323232',
    '#4B4B4B',
    '#646464',
    '#7D7D7D',
    '#969696',
    '#AFAFAF',
    '#C8C8C8',
    '#E1E1E1',
    '#FAFAFA',
  ];

  useEffect(() => {
    !emoStates.length && loadEmoStates();
    genGraph();
  }, []);

  // console.log(emoStates);

  const genGraph = () => {
    const color = d3
      .scaleLinear()
      .domain([0, 5])
      .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
      .interpolate(d3.interpolateHcl);

    const data = {
      // name: 'flare',
      // children: [
      //   {
      // name: 'analytics',
      // children: [
      //   {
      name: 'cluster',
      children: [
        { name: 'Abhorrence', value: 10000, color: shadesOfGrey[0] },
        { name: 'Loathing', value: 2000, color: shadesOfGrey[5] },
        { name: 'Sorrow', value: 5000, color: shadesOfGrey[3] },
        { name: 'Ecstacy', value: 9000, color: shadesOfGrey[9] },
        { name: 'Wonder', value: 4000, color: shadesOfGrey[6] },
        { name: 'Grief', value: 3000, color: shadesOfGrey[2] },
        { name: 'Excitement', value: 7000, color: shadesOfGrey[8] },
        { name: 'loom', value: 5000, color: shadesOfGrey[5] },
        { name: 'doom', value: 8000, color: shadesOfGrey[7] },
        { name: 'Sorrow', value: 7000, color: shadesOfGrey[3] },
        { name: 'Loathing', value: 1000, color: shadesOfGrey[5] },
        { name: 'Wonder', value: 3000, color: shadesOfGrey[6] },
        { name: 'Grief', value: 3000, color: shadesOfGrey[2] },
        { name: 'Ecstacy', value: 5000, color: shadesOfGrey[9] },
        { name: 'Abhorrence', value: 8000, color: shadesOfGrey[0] },
        { name: 'loom', value: 10000, color: shadesOfGrey[5] },
        { name: 'Excitement', value: 2000, color: shadesOfGrey[8] },
        { name: 'goom', value: 7000, color: shadesOfGrey[5] },
        //   ],
        // },
        // {
        //   name: 'graph',
        //   children: [
        //     { name: 'BetweennessCentrality', value: 3534 },
        //     { name: 'LinkDistance', value: 5731 },
        //     { name: 'MaxFlowMinCut', value: 7840 },
        //     { name: 'ShortestPaths', value: 5914 },
        //     { name: 'SpanningTree', value: 3416 },
        //   ],
        // },
        // {
        //   name: 'optimization',
        //   children: [{ name: 'AspectRatioBanker', value: 7074 }],
        // },
      ],
      //   },
      // ],
    };

    const width = 932;
    const height = 1.8 * width;

    const pack = data =>
      d3.pack().size([width, height]).padding(3)(
        d3
          .hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value)
      );

    const root = pack(data);
    let focus = root;
    let view;

    d3.select('svg').remove();

    const svg = d3
      .select('#svg')
      .append('svg')
      .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
      // .attr(
      //   'viewBox',
      //   `-${width / 2.55} -${height / 2.1} ${width * 0.85} ${height}`
      // )
      .style('display', 'block')
      .style('margin', '0 -14px')
      .style('background', 'transparent')
      .style('cursor', 'pointer')
      .on('click', event => zoom(event, root));

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(root.descendants().slice(1))
      .join('circle')
      .attr('fill', d => d.data.color)
      .attr('pointer-events', d => (!d.children ? 'none' : null))
      // .attr('stroke', 'var(--color1)')
      .attr('stroke', 'var(--bw-shade1)')
      .attr('stroke-width', 25)
      .on('mouseover', function () {
        d3.select(this).attr('stroke', '#000');
      })
      .on('mouseout', function () {
        d3.select(this).attr('stroke', null);
      })
      .on(
        'click',
        (event, d) => focus !== d && (zoom(event, d), event.stopPropagation())
      );

    const node2 = svg
      .append('g')
      .selectAll('circle')
      .data(root.descendants().slice(1))
      .join('circle')
      .attr('fill', d => d.data.color)
      .attr('pointer-events', d => (!d.children ? 'none' : null))
      .attr('stroke', 'var(--color1)')
      // .attr('stroke', 'var(--bw-shade1)')
      .attr('stroke-width', 10)
      .on('mouseover', function () {
        d3.select(this).attr('stroke', '#000');
      })
      .on('mouseout', function () {
        d3.select(this).attr('stroke', null);
      })
      .on(
        'click',
        (event, d) => focus !== d && (zoom(event, d), event.stopPropagation())
      );

    const label = svg
      .append('g')
      .style('font', '32px sans-serif')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .attr('stroke-width', 0)
      .selectAll('text')
      .data(root.descendants())
      .join('text')
      .style('fill-opacity', d => (d.parent === root ? 1 : 0))
      .style('display', d => (d.parent === root ? 'inline' : 'none'))
      .attr('stroke', d =>
        shadesOfGrey.slice(0, 5).includes(d.data.color) ? 'white' : 'black'
      )
      .attr('fill', d =>
        shadesOfGrey.slice(0, 5).includes(d.data.color) ? 'white' : 'black'
      )
      .text(d => d.data.name);

    zoomTo([root.x, root.y, root.r * 2]);

    function zoomTo(v) {
      const k = width / v[2];

      view = v;

      label.attr(
        'transform',
        d => `translate(${(d.x - v[0]) * k * 1},${(d.y - v[1]) * k * 1.8})`
      );
      node.attr(
        'transform',
        d => `translate(${(d.x - v[0]) * k * 1},${(d.y - v[1]) * k * 1.8})`
      );
      node.attr('r', d => d.r * k * 1);

      node2.attr(
        'transform',
        d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k * 1.8})`
      );
      node2.attr('r', d => d.r * k * 0.89);
    }

    function zoom(event, d) {
      const focus0 = focus;

      focus = d;

      const transition = svg
        .transition()
        .duration(event.altKey ? 7500 : 750)
        .tween('zoom', d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

      label
        .filter(function (d) {
          return d.parent === focus || this.style.display === 'inline';
        })
        .transition(transition)
        .style('fill-opacity', d => (d.parent === focus ? 1 : 0))
        .on('start', function (d) {
          if (d.parent === focus) this.style.display = 'inline';
        })
        .on('end', function (d) {
          if (d.parent !== focus) this.style.display = 'none';
        });
    }

    return svg.node();
  };

  return <div id='svg'></div>;
}

export default OneDayViz;
