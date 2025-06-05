import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  template: `
    <div class="relative px-6 py-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <div class="flex justify-between items-center">
            <p class="text-sm dark:text-white">{{title}}</p>
            <div class="flex items-center gap-2">
              @if(data.direction === 'up') {
                <img src="assets/icons/arrow-up.svg" alt="Trending up" />
                <span class="text-success">+{{data.trend}}</span>
              } @else {
                <img src="assets/icons/arrow-down.svg" alt="Trending up" />
                <span class="text-danger">-{{data.trend}}</span>
              }
            </div>
        </div>
        <h5 class="py-2 text-md font-semibold text-primary dark:text-white">
          {{data.total}}
        </h5>
        <p class="text-xs relative mb-0 font-normal text-gray-500 dark:text-gray-400">
          {{subtitle}}
        </p>
    </div>
  `,
  styles: ``
})
export class CardComponent {
  @Input() title!: string
  @Input() subtitle!: string
  @Input() data!: { total: string; trend: string; direction: string }
}
