import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegister } from 'src/app/models/login.interface';
import { IResponse } from 'src/app/models/response.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm!: FormGroup;

	errStatus: boolean = false;
	errMsg: any = "";

	constructor(private api: ApiService, private router: Router) { }

	ngOnInit(): void {
		this.registerForm = new FormGroup({
			name: new FormControl("", Validators.required),
			surname: new FormControl("", Validators.required),
			username: new FormControl("", Validators.required),
			email: new FormControl("", Validators.required),
			password: new FormControl("", Validators.required)
		});
	}

	onRegister(form: IRegister) {
		this.api.registerUser(form).subscribe({
			next: (data: IResponse) => {
				localStorage.setItem("token", data.result.accessToken);
				this.router.navigate(["books"]);
			},
			error: (err: HttpErrorResponse) => {
				console.error(err);
				this.errStatus = true;
				this.errMsg = err.error.result.error;
				this.registerForm.reset();
			}
		})
	}

}
