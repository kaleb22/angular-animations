import { animate, state, style, transition, trigger } from "@angular/animations";

export const focusState = trigger('focusState', [
  state('default', style({
    border: '2px solid #B2B6FF'
  })),
  state('focused', style({
    border: '4px solid #B2B6FF',
    filter: 'brightness(92%)'
  })),
  transition('default => focused', [
    animate('200ms ease-out', style({
      transform: 'scale(1.02)'
    }))
  ])
]);
