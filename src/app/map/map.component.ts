import { ElementRef, ViewChild, Output, Component, OnInit, OnDestroy } from '@angular/core';
import { MapdataService } from '../mapdata.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import * as d3 from 'd3';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('map_container') private mapContainer: ElementRef;
  private initSub: Subscription;
  @Output() public selected: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private mds: MapdataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(({ mapdata }) => {
      return this.init(mapdata);
    });
  }

  ngOnDestroy() {
    this.uninit()
  }

  init(assets) {
    let self = this;
    function clicked(d) {
      self.selected.next(d);
      if (active.node() === this) return reset();
      active.classed("active", false);
      active = d3.select(this).classed("active", true);
    
      let bounds = path.bounds(d),
          dx = bounds[1][0] - bounds[0][0],
          dy = bounds[1][1] - bounds[0][1],
          x = (bounds[0][0] + bounds[1][0]) / 2,
          y = (bounds[0][1] + bounds[1][1]) / 2,
          scale = Math.max(1, Math.min(20, 0.9 / Math.max(dx / width, dy / height))),
          translate = [width / 2 - scale * x, height / 2 - scale * y];
    
      svg.transition()
          .duration(750)
          // .call(zoom.translate(translate).scale(scale).event); // not in d3 v4
          .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) ); // updated for d3 v4
    }
    
    function reset() {
      active.classed("active", false);
      active = d3.select(null);
    
      svg.transition()
          .duration(750)
          // .call( zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1) ); // not in d3 v4
          .call( zoom.transform, d3.zoomIdentity ); // updated for d3 v4
    }
    
    function zoomed() {
      g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
      // g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); // not in d3 v4
      g.attr("transform", d3.event.transform); // updated for d3 v4
    }
    
    // If the drag behavior prevents the default click,
    // also stop propagation so we don’t click-to-zoom.
    function stopped() {
      if (d3.event.defaultPrevented) d3.event.stopPropagation();
    }
    let width = 960,
        height = 500,
        active = d3.select(null);

    let svg = d3.select(this.mapContainer.nativeElement);
    svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .on("click", reset);
    let g = svg.append('g');

    let buildings = assets['buildings'];
    for (let feature of buildings.features) {
      feature.type = 'Feature';
    }
    let xb = [-77.644, -77.579];
    let xs = (xb[1]+xb[0])/2;
    let yb = [43.111, 43.161];
    let ys = (yb[1]+yb[0])/2;

    let projection = d3.geoAlbers() // updated for d3 v4
      .rotate([-xs, 0])
      .center([0, ys])
      .parallels([ys-1, ys+1])
      .scale((1 << 21) / (2*Math.PI))
      //.rotate([0, 0, 0.01])
      .translate([width / 2, height / 2])
    
    let zoom = d3.zoom()
      .scaleExtent([1, 2000])
      .on("zoom", zoomed);
    
    let path = d3.geoPath() // updated for d3 v4
      .projection(projection);
    
    svg.attr("width", width)
      .attr("height", height)
      .on("click", stopped, true);
 
    g.selectAll("path")
        .data(buildings.features)
      .enter().append("path")
        .attr("d", path)
        .attr("class", "feature")
        .on("click", clicked);
  
    g.append("path")
        .datum(buildings.features)
        .attr("class", "mesh")
        .attr("d", path);

    svg.call(zoom);

  }

  uninit() {
    let element = this.mapContainer.nativeElement;
  }

}
