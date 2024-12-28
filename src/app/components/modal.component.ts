import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class Modal implements OnInit {
  url!: string;
  @Input() titulo!: string;
  constructor(
    private modalService: NgbModal,
  ) { }
  ngOnInit(): void {
  }
  navegar(value: any) {
    this.url = value
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  get modulo(): number {
    let ret: number = 0
    if (this.url) {
      switch (this.url) {
        case './../recovery': {
          ret = 2;
          break;
        }
        case './../register': {
          ret = 3;
          break;
        }
        case './../login': {
          ret = 1;
          break;
        }
        default: {
          ret = 0;
          break;
        }
      }
    }
    return ret;
  }
}
