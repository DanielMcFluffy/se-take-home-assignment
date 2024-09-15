import { AfterViewInit, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { SearchService } from '../../services/base/search.service';
import { FormsModule, NgModel } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements AfterViewInit  {
  
  searchService = inject(SearchService);
  destroyRef = inject(DestroyRef);
  searchInput = viewChild.required<NgModel>('searchInput');

  ngAfterViewInit(): void {
    this.searchInput().valueChanges?.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(x => this.searchService.search(x));
  }
}
