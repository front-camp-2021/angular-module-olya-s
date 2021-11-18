import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageService } from 'src/app/core/services/page/page.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  start = 1;
  viewPages = 9;
  currentPage = 1;
  totalPages = 10;
  pages = this.getPages();
  private destroy = new Subject<void>();

  constructor(
    private page: PageService
  ) { }

  ngOnInit(): void {
    this.page.getCurrentPage()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.currentPage = data);
    this.page.getTotalPages()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        this.totalPages = data;
        this.pages = this.getPages();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getPages(): any {
    let pages: { class: string, dataIndex: number, ngContent: string }[] = [];
    if (this.totalPages <= 1) {
      return [];
    }
    if (this.totalPages <= this.viewPages) {
      for (let i = 1; i <= this.totalPages; i++) {
        if (this.currentPage === i) {
          pages[i] = {
            class: 'pagination__item pagination__item_current',
            dataIndex: i,
            ngContent: ''
          };
        } else {
          pages[i] = {
            class: 'pagination__item',
            dataIndex: i,
            ngContent: 'button'
          };
        }
      }
      return pages.filter(page => page);
    }
    if (this.currentPage < this.start + 5) {
      for (let i = this.start; i < this.viewPages - 1; i++) {
        if (this.currentPage === i) {
          pages[i] = {
            class: 'pagination__item pagination__item_current',
            dataIndex: i,
            ngContent: ''
          };
        } else {
          pages[i] = {
            class: 'pagination__item',
            dataIndex: i,
            ngContent: 'button'
          }
        }
      }
      pages[this.start + 7] = {
        class: 'pagination__item',
        dataIndex: this.start + 7,
        ngContent: '...'
      };
      pages[this.viewPages] = {
        class: 'pagination__item',
        dataIndex: this.totalPages,
        ngContent: 'button'
      };
    } else if (this.currentPage > this.totalPages - 5) {
      for (let i = this.totalPages; i > this.totalPages - this.viewPages + 1; i--) {
        if (this.currentPage === i) {
          pages[i] = {
            class: 'pagination__item pagination__item_current',
            dataIndex: i,
            ngContent: ''
          };
        } else {
          pages[i] = {
            class: 'pagination__item',
            dataIndex: i,
            ngContent: 'button'
          };
        }
      }
      pages[this.totalPages - this.viewPages + 2] = {
        class: 'pagination__item',
        dataIndex: this.totalPages - this.viewPages + 2,
        ngContent: '...'
      };
      pages[this.start] = {
        class: 'pagination__item',
        dataIndex: this.start,
        ngContent: 'button'
      };
    } else {
      pages[this.start] = {
        class: 'pagination__item',
        dataIndex: this.start,
        ngContent: 'button'
      };
      pages[this.currentPage - 3] = {
        class: 'pagination__item',
        dataIndex: this.currentPage - 3,
        ngContent: '...'
      };
      for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
        if (this.currentPage === i) {
          pages[i] = {
            class: 'pagination__item pagination__item_current',
            dataIndex: i,
            ngContent: ''
          };
        } else {
          pages[i] = {
            class: 'pagination__item',
            dataIndex: i,
            ngContent: 'button'
          };
        }
      }
      pages[this.totalPages - 1] = {
        class: 'pagination__item',
        dataIndex: this.totalPages,
        ngContent: 'button'
      };
      pages[this.currentPage + 3] = {
        class: 'pagination__item',
        dataIndex: this.currentPage + 3,
        ngContent: '...'
      };
    }
    return pages.filter(page => page);
  }

  handlePointerDown(event: any): void {
    if (event.target.classList.contains('pagination__link')) {
      if (event.target.parentElement.dataset.element === 'prevPage') {
        this.currentPage--;
      } else if (event.target.parentElement.dataset.element === 'nextPage') {
        this.currentPage++;
      }
      if (event.target.className === 'pagination__link') {
        this.currentPage = +event.target.closest('li').dataset.index;
      }
    }
    this.page.setCurrentPage(this.currentPage);
    this.pages = this.getPages();
  }

}