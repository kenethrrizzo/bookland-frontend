import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api/api.service'

import { IBook, IUpdateBook } from '../../models/book.interface';
import { IResponse } from '../../models/response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import Swal from 'sweetalert2'

@Component({
	selector: 'app-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

	books: IBook[] = [];
	selectedBook: IBook = {} as IBook;

	bookForm!: FormGroup;

	bookCoverpage: any = null;

	constructor(private api: ApiService, private router: Router) {

	}

	ngOnInit(): void {
		this.bookForm = new FormGroup({
			name: new FormControl("", [Validators.required]),
			synopsis: new FormControl("", [Validators.required]),
			price: new FormControl(0, [Validators.required]),
			author: new FormControl("", [Validators.required]),
		});

		this.getAllBooks();
	}

	getAllBooks() {
		// Deprecated: actualizar metodo
		this.api.getAllBooks().subscribe(
			(data) => {
				this.books = data.result;
			},
			(err) => {
				console.error(err);
			})
	}

	cleanSelectedBook() {
		this.bookForm.reset();
	}

	selectBook(id: number) {
		this.api.getBookById(id).subscribe(
			(data) => {
				this.selectedBook = data.result;
				this.bookForm.patchValue({
					name: this.selectedBook.name,
					synopsis: this.selectedBook.synopsis,
					price: this.selectedBook.price,
					author: this.selectedBook.author,
				})
			},
			(err) => {
				console.error(err);
			}
		)
	}

	deleteBook(id: number) {
		this.api.deleteBook(id).subscribe(
			(_) => {
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: '¡Libro eliminado!',
					showConfirmButton: false,
					timer: 1500
				})
				this.getAllBooks();
			},
			(err) => {
				console.error(err);
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					title: '¡Ha ocurrido un error al eliminar el libro!',
					showConfirmButton: false,
					timer: 1500
				})
			}
		)
	}

	onFileChange(event: any) {
		if (event.target.files.length > 0) {
			this.bookCoverpage = event.target.files[0];
		}
	}

	createBook() {
		const formData = new FormData();

		formData.append("name", this.bookForm.get("name")?.value)
		formData.append("synopsis", this.bookForm.get("synopsis")?.value)
		formData.append("price", this.bookForm.get("price")?.value)
		formData.append("author", this.bookForm.get("author")?.value)

		if (this.bookCoverpage != null) {
			formData.append("coverpage", this.bookCoverpage);
		}

		this.api.createBook(formData).subscribe(
			(_) => {
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: '¡Libro creado!',
					showConfirmButton: false,
					timer: 1500
				})
				this.getAllBooks();
			},
			(err) => {
				console.error(err);
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					title: '¡Ha ocurrido un error!',
					showConfirmButton: false,
					timer: 1500
				});
			}
		)
	}

	updateBook(id: number) {
		const formData = new FormData();

		formData.append("name", this.bookForm.get("name")?.value)
		formData.append("synopsis", this.bookForm.get("synopsis")?.value)
		formData.append("price", this.bookForm.get("price")?.value)
		formData.append("author", this.bookForm.get("author")?.value)

		if (this.bookCoverpage != null) {
			formData.append("coverpage", this.bookCoverpage);
		}

		this.api.editBook(formData, id).subscribe(
			(data) => {
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: '¡Libro actualizado!',
					showConfirmButton: false,
					timer: 1500
				})
				this.getAllBooks();
			},
			(err) => {
				console.error(err);
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					title: '¡Ha ocurrido un error!',
					showConfirmButton: false,
					timer: 1500
				})
			}
		)
	}

}
