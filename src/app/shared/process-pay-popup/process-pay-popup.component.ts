import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-pay-popup',
  templateUrl: './process-pay-popup.component.html',
  styleUrls: ['./process-pay-popup.component.scss']
})
export class ProcessPayPopupComponent implements OnInit {

  isBtnshow: boolean = false ;
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleBtnshow(){
    this.isBtnshow = ! this.isBtnshow;
  }

}
