import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup

  submitted = false

  constructor(
    public auth: AuthService,
    private router: Router
  ) {

  }


  submit() {
    if (this.form.invalid) {
      return;
    }//если значение не валидно просто выходим из формы
    this.submitted = true  // при нажатии на кнопку привязываем true

    const user = {  //передаем данные пользователя
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true  //время жизни токена
    }
    this.auth.login(user).subscribe(res=>{
      this.form.reset  //сбрасываем форму
      this.router.navigate(['/admin', 'dashboard']) //роутинг на главную
      this.submitted = false
    }, () => {
      this.submitted = false
      }

    )

  }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

}
