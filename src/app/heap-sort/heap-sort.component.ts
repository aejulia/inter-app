import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

class Event {
  constructor(public name: string, public timestamp: Date) {}
}

@Component({
  selector: 'app-heap-sort',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './heap-sort.component.html',
  styleUrl: './heap-sort.component.scss'
})
export class HeapSortComponent implements OnInit {
  events: Event[] = [];
  sortedEvents: Event[] = [];
  newEventName: string = '';
  newEventTimestamp: string = '';

  ngOnInit() {
    this.heapSort();
  }

  maxHeapify(arr: Event[], n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left].timestamp > arr[largest].timestamp) {
      largest = left;
    }

    if (right < n && arr[right].timestamp > arr[largest].timestamp) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      this.maxHeapify(arr, n, largest);
    }
  }

  buildMaxHeap(arr: Event[]): void {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.maxHeapify(arr, n, i);
    }
  }

  heapSort(): void {
    const n = this.events.length;
    const sortedEvents = [...this.events];
    this.buildMaxHeap(sortedEvents);
    for (let i = n - 1; i > 0; i--) {
      [sortedEvents[i], sortedEvents[0]] = [sortedEvents[0], sortedEvents[i]];
      this.maxHeapify(sortedEvents, i, 0);
    }
    this.sortedEvents = sortedEvents;
  }

  addEvent(): void {
    
    const eventNameInput = document.getElementById('eventName') as HTMLInputElement;
    const eventTimestampInput = document.getElementById('eventTimestamp') as HTMLInputElement;
  
    if (eventNameInput && eventTimestampInput) {
      const timestampValue = eventTimestampInput.value;
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
      if (!dateRegex.test(timestampValue)) {
        alert('Por favor, insira a data no formato válido (aaaa-mm-dd).');
        return;
      }
  
      const newEvent = new Event(eventNameInput.value, new Date(timestampValue + 'T00:00:00'));
      this.events.push(newEvent);
  
      eventNameInput.value = '';
      eventTimestampInput.value = '';
      this.heapSort();
    }
  }

  formatTimestamp(timestamp: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return timestamp.toLocaleDateString('pt-BR', options);
  }
}

