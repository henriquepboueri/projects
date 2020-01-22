import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHostbindingHighlight]'
})
export class HostbindingHighlightDirective {
  @HostBinding('style.backgroundColor') backgroundColor : String;

  @HostListener('mouseenter')
  onMouseEnter(){
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.backgroundColor = 'transparent';
  }

  constructor() { }

}
