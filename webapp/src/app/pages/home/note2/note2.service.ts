import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class Note2Service {

    // 表拖动到树结构拖动完成
    transTreeDragEnd: Subject<any> = new Subject<any>();

    constructor() {
    }
}
