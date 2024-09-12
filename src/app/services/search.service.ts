import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  searchTerm = signal<string>('');
  searchTerm$ = toObservable(this.searchTerm).pipe(shareReplay(1));

  search(term: string) {
    this.searchTerm.set(term);
  }

}
