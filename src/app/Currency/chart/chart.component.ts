import { 
  Component, ViewChild, Input, OnChanges, SimpleChanges 
  } from '@angular/core';
import { HighChartService } from './chart.service';

@Component({
  selector: 'highchart-temp',
  providers: [HighChartService],
  template: `<div #host></div>`
})
export class HighChartComponent implements OnChanges {
  @Input() config: any;
  @ViewChild('host', { static: true }) host: any;
  
  constructor(public chartSrv: HighChartService) {}

  ngOnInit(){
    console.log("chart config @@", this.config )

  }
  ngOnChanges(changes: SimpleChanges) {
    const { config } = changes;
    if(config.currentValue) {
      this.chartSrv.redraw(this.host.nativeElement, config.currentValue);
    }
  }
}