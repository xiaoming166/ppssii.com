import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../common/service/url.service";
import {Api} from "../../../api/api";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NoteService {

    // uuid主体

    uuidSubject: Subject<string> = new Subject();

    // drag主体
    dragSubject: Subject<any> = new Subject<any>();



    constructor(private http: HttpClient,
                private url: UrlService) {
    }


    // 获取菜单列表
    getMenus() {
        const url = this.url.getUrl(Api.menuList)
        return this.http.post(url, {}, {reportProgress: true})
    }

    // 获取菜单列表
    getUser() {
        const url = this.url.getUrl(Api.me)
        return this.http.post(url, {})
    }

    // 获取Uuid
    getUuid() {
        const url = this.url.getUrl(Api.makeUuid)
        return this.http.post(url, {})
    }

}
