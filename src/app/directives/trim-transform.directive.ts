import type { Subscription } from "rxjs";
import { Directive, OnDestroy, OnInit } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[formControl][trim-transform]'
})
export class TrimTransformDirective implements OnInit, OnDestroy {
  private _valueSub: Subscription
  constructor(private readonly ngControl: NgControl) {}

  ngOnInit(): void {
    this._valueSub = this.ngControl.control.valueChanges.subscribe(
      value => {
        const newVal = this.transform(value);
        this.ngControl.control.setValue(newVal, { emitEvent: false });
      }
    );
  }

  ngOnDestroy(): void {
    this._valueSub.unsubscribe()
  }

  transform(value: string) {
    return value.trim()
  }
}
