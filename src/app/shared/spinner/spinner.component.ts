import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner-service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loaderStatus = false;
  constructor(private spinnerService : SpinnerService, private cdf : ChangeDetectorRef) { 


  }

  ngOnInit(): void {
    this.init();
  }
  init(){
    this.spinnerService.getSpinnerObserver().subscribe(status=>{
      // console.log(" Status #############", status);
      this.loaderStatus = (status === 'start');
      this.cdf.detectChanges();
    })
  }
}
