import { Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[editCell]'
})
export class EditCellDirective implements OnChanges {

  @HostBinding('value') public value: String;
  @Input() public editCell: string;
  public newValue: string;

  constructor(public el: ElementRef, public render: Renderer2) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('change called');
    if (changes.editCell) {
      console.log('editcell', changes.editCell.currentValue);
      console.log('editcell old', changes.editCell.previousValue);
      this.newValue = changes.editCell.currentValue;
    }
  }

  @HostListener('blur', ['$event'])
  updateUser() {
    if (this.editCell) {
      this.editCell = this.el.nativeElement.innerHtml;
      console.log('editcell focus', this.editCell);
    }
  }

}
