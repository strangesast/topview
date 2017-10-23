import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  @ViewChild('map') private map: MapComponent;

  constructor() { }

  ngOnInit() {
    this.map.selected.subscribe(selected => {
      console.log('selected', selected)
    });
  }

}
