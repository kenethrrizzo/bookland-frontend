import { Injectable } from '@angular/core';

import { ILogin, IRegister } from '../../models/login.interface';
import { IResponse } from '../../models/response.interface';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUpdateBook } from 'src/app/models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:8080/" 

  constructor(private http: HttpClient) { }

  /* USERS */

  loginByEmail(form: ILogin): Observable<IResponse> {
    let address = this.url + "users/login";
    return this.http.post<IResponse>(address, form);
  }

  registerUser(form: IRegister): Observable<IResponse> {
    let address = this.url + "users/register";
    return this.http.post<IResponse>(address, form);
  }

  /* BOOKS */

  getAllBooks(): Observable<IResponse> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + localStorage.getItem("token"))
    }

    let address = this.url + "books/get";
    return this.http.get<IResponse>(address, header);
  }

  getBookById(id: number): Observable<IResponse> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + localStorage.getItem("token"))
    }

    let address = this.url + "books/get/" + id;
    return this.http.get<IResponse>(address, header);
  }

  editBook(form: FormData, id: number): Observable<IResponse> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + localStorage.getItem("token"))
    }

    let address = this.url + "books/update/" + id;
    return this.http.put<IResponse>(address, form, header);
  }

  deleteBook(id: number): Observable<IResponse> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + localStorage.getItem("token"))
    }

    let address = this.url + "books/delete/" + id;
    return this.http.delete<IResponse>(address, header);
  }

  createBook(form: FormData): Observable<IResponse> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + localStorage.getItem("token"))
    }

    let address = this.url + "books/register";
    return this.http.post<IResponse>(address, form, header);
  }

}
