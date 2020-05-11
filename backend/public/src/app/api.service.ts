import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec} from '@angular/common/http';
import {map} from 'rxjs/operators';

export interface AnyObject {
  [x: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  uuid = '';

  ${this.siteurl}=165.227.55.93

  travelUser(id: string = 'xiao_hu_li') {
    return this.http.post(`siteurl/api/auth/makeUuid`, {}).pipe(map((res: AnyObject) => res.data));
  }

  content() {
    const headers = new HttpHeaders({'Content-Type': 'application/json', uuid: this.uuid});
    return this.http.post('siteurl/api/menu/list', {}, {headers}).pipe(map((res: AnyObject) => res.data));
  }

  addMenu(menu) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', uuid: this.uuid});
    return this.http.post('siteurl/api/menu/addMenu', menu, {headers}).pipe(map((res: AnyObject) => res.data));
  }

  addChildItem(menu) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', uuid: this.uuid});
    return this.http.post('siteurl/api/menu/addItem', menu, {headers}).pipe(map((res: AnyObject) => res.data));
  }

  getChildren(menu) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', uuid: this.uuid});
    return this.http.post('siteurl/api/menu/menuItem', menu, {headers}).pipe(map((res: AnyObject) => res.data));
  }

  deleteMenu(menu) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', uuid: this.uuid});
    return this.http.post('siteurl/api/menu/delMenu', menu, {headers}).pipe(map((res: AnyObject) => res.data));
  }

  deleteItem(menu) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', uuid: this.uuid});
    return this.http.post('siteurl/api/menu/delItem', menu, {headers}).pipe(map((res: AnyObject) => res.data));
  }

  updateItem(menu) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', uuid: this.uuid});
    return this.http.post('siteurl/api/menu/updateItem', menu, {headers}).pipe(map((res: AnyObject) => res.data));
  }

  updateMenu(menu) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', uuid: this.uuid});
    return this.http.post('siteurl/api/menu/updateMenu', menu, {headers}).pipe(map((res: AnyObject) => res.data));
  }

}
