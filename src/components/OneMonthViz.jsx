import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import { shadesOfGrey } from '../utilities/helpers';

function OneDayViz({ currentPage, pageIndex }) {
  const data = useRef(null);
  // console.log(currentPage);

  useEffect(() => {
    data.current = currentPage.map(month => {
      return {
        name: new Date(month[0][0].date).toLocaleString('default', {
          month: 'long',
        }),
        children: [
          {
            name: 'Week1',
            children: month.map(day => {
              return {
                name: new Date(day[0].date).toLocaleString('default', {
                  weekday: 'short',
                }),
                children: day.map(emos => ({
                  name: emos.emotion.name,
                  value: emos.intensity * 1000,
                  color: emos.color,
                })),
              };
            }),
          },
        ],
      };
    });
    console.log(data.current[0]);
    genGraph(data.current[0]);
  }, [currentPage, pageIndex, data]);

  const verticalSpacing = 1;

  const genGraph = data => {
    const width = 932;
    const height = 1.6 * width;

    const pack = data =>
      d3.pack().size([width, height]).padding(3)(
        d3
          .hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value)
      );

    const color = d3
      .scaleLinear()
      .domain([0, 5])
      .range(['hsl(240,80%,80%)', 'hsl(300,30%,40%)'])
      .interpolate(d3.interpolateHcl);

    const root = pack(data);
    let focus = root;
    let view;

    d3.select('svg').remove();
    d3.select('svg').remove();

    const svg = d3
      .select('#svg')
      .append('svg')
      .attr('viewBox', `-${width / 2} -${height / 2.1} ${width} ${height}`)
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
      .attr('fill', d => (d.children ? color(d.depth) : d.data.color))
      .attr('pointer-events', d => (!d.children ? 'none' : null))
      .attr('stroke', d => (d.children ? 'none' : 'var(--color1)'))
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
        d =>
          `translate(${(d.x - v[0]) * k * 1},${
            (d.y - v[1]) * k * verticalSpacing
          })`
      );
      node.attr(
        'transform',
        d =>
          `translate(${(d.x - v[0]) * k * 1},${
            (d.y - v[1]) * k * verticalSpacing
          })`
      );
      node.attr('r', d => d.r * k * 1);
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

  return <>{data && <div id='svg'></div>}</>;
}

export default OneDayViz;
