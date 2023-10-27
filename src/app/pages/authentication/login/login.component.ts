import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../../../app/_services';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AppSideLoginComponent {
  SingIn!: FormGroup
  loading = false;
  submitted = false;
  error = '';
  autentification =  false
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.userValue) { 
          this.router.navigate(['/dashboard']);
      }
  }

  ngOnInit() {
    this.SingIn = this.formBuilder.group(
      {
        xlogin: ['', Validators.required],
        xclave: ['', Validators.required],
      }
    );
  
  }

  get f(): { [key: string]: AbstractControl } {
    return this.SingIn.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log('holis')
    if (this.SingIn.invalid) {
      return;
    }
    this.error = '';
    this.loading = true;
    this.authenticationService.login(this.f['xlogin'].value, this.f['xclave'].value)
        .pipe(first())
        .subscribe({
            next: () => {
                // get return url from route parameters or default to '/'
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
                this.router.navigate([returnUrl]);
            },
            error: error => {
              console.error(error);
                this.error = error;
                this.loading = false;
                this.autentification = true
            }
        });

  }

  onReset(): void {
    this.submitted = false;
    this.SingIn.reset();
  }

  ShowModal(){
    this.autentification = false
  }


}
