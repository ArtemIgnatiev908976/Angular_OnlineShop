import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(User) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User)
      .pipe(
        tap(this.setToken)  //при входе вызываем метод для сохранения
      )
  }


  //логика по создания токена который хранится локально
  private setToken(response) { //принимает ответ с сервера
    if (response) { //если ответ приходит отрабатываем
      //время истечения токена (текущее время + +время жизни токена * 1000мсек)
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000)
      //заносим дату в localstorage
      localStorage.setItem('fb-token-exp', expData.toString())
      //храним токен
      localStorage.setItem('fb-token', response.idToken)
    } else { //если нет то чистим
      localStorage.clear()
    }

  }

//получение токена
  get token() {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date > expDate) {
      this.logout()
      return null
    }

    return localStorage.getItem('fb-token')
  }

  logout(){
    this.setToken(null) //сразу чистим localstorage
  }

  isAuthenicated(){
    //если в токене есть какая то информация и он не пустое значение  !!- преобразуем в булиан и возращать значение true
    return !!this.token
  }


}
