import { state, style, trigger } from "@angular/animations";

export const focusState = trigger('focusState', [
  state('default', style({
    border: '2px solid #B2B6FF'
  })),
  state('focused', style({
    border: '4px solid #B2B6FF',
    filter: 'brightness(92%)'
  })),
]);
