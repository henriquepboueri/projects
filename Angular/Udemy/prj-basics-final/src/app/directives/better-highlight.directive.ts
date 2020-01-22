import { Directive, Renderer2, OnInit, HostBinding, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective{

  constructor(private elementRef:  ElementRef,
    private renderer: Renderer2) { }

    @HostListener('mouseenter')
    onMouseEnter(){
      this.renderer.setStyle(this.elementRef.nativeElement,
        'background-color', 'blue');
   }
   
   @HostListener('mouseleave')
   onMouseLeave(){
     this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
   }

}
