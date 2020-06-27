import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'blue';
  }

  @Input('appHighlight') hightlightColor: string;
  @Input() defaultColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.hightlight(this.hightlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hightlight(this.defaultColor || 'green');
  }

  private hightlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
