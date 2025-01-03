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

export const showState = trigger('showState', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(300, style({
      opacity: 1
    }))
  ]),
  transition(':leave', [
    style({
      opacity: 1
    }),
    animate(300, style({
      opacity: 0
    }))
  ])
]);

export const checkedState = trigger('checkedState', [
  transition('* => checked', [
    animate('400ms ease-out', style({
      transform: 'scale(0.4)'
    })),
  ])
]);
