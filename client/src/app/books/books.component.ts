import {Component, OnInit} from '@angular/core';
import {BooksService} from '../books.service';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  errorMessage: string;
  mode = 'Observable';
  tableSpec = {
    api: {
      getData: this.getBooks.bind(this),
      update: this.updateBook.bind(this),
      delete: this.deleteBook.bind(this)
    },
    columns: [
      {
        name: 'id',
        displayName: '#',
        cantEdit: true
      },
      {
        name: 'cover_url',
        displayName: 'Cover',
        type: 'image',
        imageHeight: 40,
        imageWidth: 40
      },
      {
        name: 'name',
        displayName: 'Name'
      },
      {
        name: 'author',
        displayName: 'Author'
      },
      {
        name: 'category_name',
        displayName: 'Category',
        type: 'combo',
        comboSource: this.getCategories.bind(this)
      }
    ]
  };

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    return this.booksService.getBooks();
  }

  updateBook(data) {
    return this.booksService.updateBook(data);
  }

  deleteBook(id) {
    return this.booksService.deleteBook(id);
  }

  getCategories() {
    return this.booksService.getCategories();
  }

}
