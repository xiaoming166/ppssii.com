import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlService} from '../common/service/url.service';
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient,
              private urlService: UrlService) {
  }

  login(user: User): Observable<any> {
    const url = this.urlService.getUrl('/admin/login');
    return this.http.post(url, user)
  }


}
