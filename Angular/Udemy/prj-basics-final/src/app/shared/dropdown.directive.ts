import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  HostListener,
  HostBinding
} from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  /* isOpen: boolean = false;
  @Input() set appDropdown(condition: boolean) {
    if (!condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }*/
  @HostBinding("class.open") isOpen: boolean = false;

  @HostListener("click")
  onClick() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }

  /*
  //
  // To drop from clicking anywhere
  //
  
  import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}

  /*constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}*/
}
