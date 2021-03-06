import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-pay-popup',
  templateUrl: './process-pay-popup.component.html',
  styleUrls: ['./process-pay-popup.component.scss']
})
export class ProcessPayPopupComponent implements OnInit {

  isBtnshow: boolean = false;
  messageSuccess: boolean = true;
  
  constructor() { }

  ngOnInit(): void {

    setTimeout(()=>{
      this.messageSuccess = false;
    }, 3000);

  }

  toggleBtnshow(){
    this.isBtnshow = ! this.isBtnshow;
  }

}
