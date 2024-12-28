import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-change-pass-form',
  templateUrl: './change-pass-modal.component.html'
})
export class ChangePassFormulario implements OnInit {
  @Input() titulo!: string;
  constructor(
    private modalService: NgbModal,
  ) { }
  ngOnInit(): void {
  }
  closeModal() {
    this.modalService.dismissAll();
  }
}
