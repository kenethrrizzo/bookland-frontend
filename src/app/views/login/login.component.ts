import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { ILogin } from '../../models/login.interface';
import { IResponse } from '../../models/response.interface';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm = new FormGroup({
		email: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required)
	});

	constructor(private api: ApiService, private router: Router) { }

	errStatus: boolean = false;
	errMsg: any = "";

	ngOnInit(): void {
		this.checkLocalStorage();
	}

	checkLocalStorage() {
		if (localStorage.getItem("token")) {
			this.router.navigate(["books"]);
		}
	}

	onLogin(form: ILogin) {
		this.api.loginByEmail(form).subscribe({
			next: (data: IResponse) => {
				localStorage.setItem("token", data.result.accessToken);
				this.router.navigate(["books"]);
			},
			error: (err: HttpErrorResponse) => {
				console.error(err);
				this.errStatus = true;
				this.errMsg = err.error.result.error;
				this.loginForm.reset();
			}
		})
	}

}
