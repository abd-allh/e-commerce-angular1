import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appSuperBtn]',
})
export class SuperBtnDirective {
  private eleRef = inject(ElementRef<HTMLElement>);
  permission: string[] = [];
  constructor() {
    console.log('Directive initialized');
  }

  private role = localStorage.getItem('userRole');
  // private role: string = '';

  @Input()
  set appSuperBtn(permission: string) {
    // debugger;
    this.permission = permission.split(',');
    if (!this.role?.includes(this.permission[0]))
      this.eleRef.nativeElement?.remove();
  }
}
