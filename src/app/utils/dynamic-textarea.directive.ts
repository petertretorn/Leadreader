import { Directive, Input, HostBinding } from '@angular/core';
import { ElementRef } from "@angular/core";
import { Renderer2 } from "@angular/core";
import { HostListener } from "@angular/core";

@Directive({
  selector: "[lrDynamicTextarea]"
})
export class DynamicTextareaDirective {

  @HostListener("keyup")
  keyup() {
    this.resizeElement()
  }

  @HostBinding('style.height') height: string

  @Input('lrDynamicTextarea') isFocus

  constructor(public elementRef: ElementRef, public renderer: Renderer2) {
    setTimeout( _ => { 
      this.resizeElement()
      if (this.isFocus) this.elementRef.nativeElement.focus()
    }, 1)
  }

  resizeElement() {
    this.renderer.setStyle(this.elementRef.nativeElement, "overflow", "hidden")
    this.renderer.setStyle(this.elementRef.nativeElement, "height", "0px")

    const newHeight = this.elementRef.nativeElement.scrollHeight - 15 + "px"
    this.renderer.setStyle(this.elementRef.nativeElement, "height", newHeight)
    // this.height = newHeight
  }
}
