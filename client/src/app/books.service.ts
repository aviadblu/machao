import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class BooksService {

  constructor(private http: Http) {
  }

  getBooks() {
    return this.http.get('/api/books')
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateBook(data) {
    let self = this;
    return new Promise((resolve, reject) => {
        if(!data.id) {
          return reject('No id in updated row!');
        }

        self.http.put(`/api/books/${data.id}`, data)
          .subscribe((res) => {
            resolve(self.extractData(res));
          }, reject);
    });
  }

  deleteBook(id) {
    let self = this;
    return new Promise((resolve, reject) => {
      if(!id) {
        return reject('No id!');
      }

      self.http.delete(`/api/books/${id}`)
        .subscribe((res) => {
          resolve(res);
        }, reject);
    });
  }

  getCategories() {
    return this.http.get('/api/categories')
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
