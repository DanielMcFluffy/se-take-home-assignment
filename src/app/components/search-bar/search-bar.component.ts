import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormsModule, NgModel } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements AfterViewInit  {
  
  searchService = inject(SearchService);
  searchInput = viewChild.required<NgModel>('searchInput');

  ngAfterViewInit(): void {
    this.searchInput().valueChanges?.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(x => this.searchService.search(x));
  }



}
