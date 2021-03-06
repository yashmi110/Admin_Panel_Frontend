import { AbstractControl, ValidationErrors } from '@angular/forms';
import { EmployeeLoginService } from './employee-login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Validation from './Validation';
import { UserDetails } from '../user-detail/user-detail.component';
import { UserDetailService } from '../user-detail/user-detail.service';



@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss'],
  providers: [EmployeeLoginComponent]
})
export class EmployeeLoginComponent implements OnInit {

  formLogin!: FormGroup;
  login!: Login;

  formRegister!: FormGroup;
  register!: Register;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  confirmpassword = new FormControl('', [Validators.required])
  // username: any;



  getErrorMessage() {
    if (this.email.hasError('required') || this.password.hasError('required') || this.confirmpassword.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private formBuilder: FormBuilder, private employeeloginservice: EmployeeLoginService, private toastr: ToastrService, private userdetailservice: UserDetailService) {

  }

  dataSource:  UserDetails[] = []

  ngOnInit(): void {
    this.login = new Login();
    this.createLoginForm();

    this.register = new Register();
    this.createRegisterForm();
    this.loadData();

  }
  loadData() {
    this.userdetailservice.getAllUsers().subscribe(  (data: [UserDetails]) => {
   
      this.dataSource = data
     },
      (   error: any) => {
  
      console.log(error)
     })
  }
   // throw new Error('Method not implemented.');
  

  get f(): { [key: string]: AbstractControl } {
    return this.formRegister.controls;
  }

  createLoginForm() {
   
      this.formLogin = this.formBuilder.group({
        username: new FormControl(this.login.username, [Validators.required]),
        password: new FormControl(this.login.password, [Validators.required])
      });
    
  }

  createRegisterForm() {


    this.formRegister = this.formBuilder.group({
      username: new FormControl(this.register.username, [Validators.required]),
      email: new FormControl(this.register.email, [Validators.required,Validators.email]),
      password: new FormControl(this.register.password, [Validators.required]),
      confirmpassword: new FormControl(this.register.confirmpassword, [Validators.required])
    },
    {
      validators: [Validation.match('password', 'confirmpassword')]
    }
    );
  }

  loginBtnTap() {

    if (this.formLogin.valid) {
      const value = this.formLogin.value;

      // this.employeeloginservice.loginEmployee(value).subscribe((data: LoginEmployee) => {
      //   console.log(data.token)
      //   this.toastr.success('Logging successfull', 'Success');
      // });

      this.employeeloginservice.loginEmployee(value).subscribe(
        (data: LoginEmployee) => {
          console.log(data.token)
          localStorage.setItem('token', data.token);
          this.loadData();
          this.toastr.success('Logging successfull', 'Success');
         
        },
        error => {

          this.toastr.error('Invalid User Creditatioal', 'fail');
        }
      );


    }
    else{
      this.toastr.error('Please fill the form', 'fail');
    }
  }


  registerBtnTap() {
    this.username.markAsTouched()
    this.email.markAsTouched()
    this.password.markAsTouched()
    this.confirmpassword.markAsTouched()


    if (this.formRegister.valid) {
      const value = this.formRegister.value;
     // this.toastr.success('Logging successfull', 'Success');
      this.employeeloginservice.registerEmployee(value).subscribe(
        success=>{
          this.loadData();
          this.toastr.success('Registration successfull', 'Success');
        },
        error=>{
          this.toastr.error('Please reenter', 'fail');
        }

      );

    } else {
      this.toastr.error('Please fill the form', 'fail');
    }
  }

}



export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value === confirmPassword?.value ? null : { notmatched: true };
};

export class Login {
  username: string = "";
  password: string = "";

}

export class LoginEmployee {
  token: string = '';
}

export class Register {
  username: string = "";
  email: string = "";
  password: string = "";
  confirmpassword: string = "";
}
