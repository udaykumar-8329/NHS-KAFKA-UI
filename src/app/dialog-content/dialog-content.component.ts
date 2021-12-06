import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'ud-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<DialogContentComponent>) { }

  ngOnInit(): void {
  }

  sendResponse(response){
    this._bottomSheetRef.dismiss(response)
  }

}
