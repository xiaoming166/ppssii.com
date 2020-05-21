import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {UrlService} from '../common/service/url.service';
import {User} from "../model/user";
import {Api} from "../api/api";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    // token主体

    tokenSubject: Subject<string> = new Subject();

    constructor(private http: HttpClient,
                private urlService: UrlService) {
    }

    login(user: User): Observable<any> {
        const url = this.urlService.getUrl(Api.login);
        return this.http.post(url, user)
    }


}
