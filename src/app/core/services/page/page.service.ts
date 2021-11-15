import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  currentPage = new BehaviorSubject<number>(1);
  totalPages = new BehaviorSubject<number>(10);

  constructor() { }

  setCurrentPage(page: number): void {
    this.currentPage.next(page);
  }

  setTotalPages(page: number): void {
    this.totalPages.next(page);
    this.currentPage.next(1);
  }

  getCurrentPage(): BehaviorSubject<number> {
    return this.currentPage;
  }

  getTotalPages(): BehaviorSubject<number> {
    return this.totalPages;
  }
}
