import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {fromEvent, Observable, Subject} from "rxjs";
import {throttleTime} from "rxjs/operators";
import {NzMessageService} from "ng-zorro-antd";
import {NoteService} from "./note.service";
import {Res} from "../../../model/response";
import {Router} from "@angular/router";
import {LoginService} from "../../../login/login.service";
import {Note2Service} from "../note2/note2.service";

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.less']
})
export class NoteComponent implements OnInit, AfterViewInit, OnDestroy {
    keyEnter: Observable<any> = fromEvent(window, 'keyup.enter');

    @ViewChild('buttonEvent', {static: true}) buttonEvent: ElementRef;

    submitSubject: Subject<string> = new Subject();

    destroy$ = new Subject();

    fieldContent: string = '';

    size: string = 'small';

    done = [
        {
            name: 'Green2',
            expandable: true,
            level: 1,
        },
        {
            name: 'Green3',
            expandable: true,
            level: 1,
        },
        {
            name: 'Green4',
            expandable: true,
            level: 1,
        },
        {
            name: 'Green5',
            expandable: true,
            level: 1,
        }
    ];

    // 表单拖动事件
    drop(event: CdkDragDrop<string[]>) {
        console.log('-------+++++');
        if (event.previousContainer === event.container) {
            // 同一区域内 移动数据
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            // 不同区域内 移动数据
            transferArrayItem(event.previousContainer.data['_data'],
                event.container.data,
                event.previousIndex,
                event.currentIndex);

            // this.dataSource = new ArrayDataSource(event.previousContainer.data['_data']);

        }
    }

    constructor(private msgService: NzMessageService,
                private noteService: NoteService,
                private loginService: LoginService,
                private note2Service: Note2Service,
                private route: Router) {

    }


    ngOnInit(): void {
        this.onTreeDragEnd();

        // this.getUser();
    }

    // 移动
    dragStarted(item: any) {
        this.noteService.dragSubject.next(item)
    }

    onTreeDragEnd() {
        this.note2Service.transTreeDragEnd.subscribe(res => {
            this.done = this.done.filter(item => item.name !== res.name)
        })
    }

    getMenuList() {
        this.noteService.getMenus().subscribe(res => {
            console.log(res);
        })
    }

    getUser() {
        this.noteService.getUser().subscribe((res: any) => {
            if (res.code === 401) {
                // 游客
                this.getUuid();
            } else {
                // 登录用户
            }
        })
    }

    getUuid() {
        this.noteService.getUuid().subscribe((res: Res) => {
            // 设置uuid
            this.noteService.uuidSubject.next(res.data.uuid);

            // 获取菜单
            this.getMenuList();
        })
    }

    // 退出
    logout() {
        this.route.navigateByUrl('login');
        this.noteService.uuidSubject.next('');
        this.loginService.tokenSubject.next('');
    }


    submit() {
        this.submitSubject.next(this.fieldContent)
    }


    ngAfterViewInit() {
        // 确认事件
        this.submitSubject.pipe(
            throttleTime(500), // 防抖函数
        ).subscribe(res => {
            this.done = [...this.done, {
                'name': res,
                'expandable': true,
                'level': 1,
            }]
            this.msgService.success('添加成功')
        })
    }


    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }


    // shouldRender(node: ExampleFlatNode) {
    //   const parent = this.getParentNode(node);
    //   return !parent || parent.isExpanded;
    // }

    // // 树拖动时间
    // treeDrop(event: CdkDragDrop<string[]>) {
    //
    //   console.log('-------+++++ treeDrop');
    //
    //
    //   if (event.previousContainer === event.container) {
    //
    //     // 本区域位置交换
    //
    //
    //     moveItemInArray(event.container.data['_data'], event.previousIndex, event.currentIndex);
    //
    //     this.dataSource = new ArrayDataSource(event.container.data['_data']);
    //   } else {
    //     // 不同区域内 移动数据
    //     transferArrayItem(event.previousContainer.data,
    //       event.container.data['_data'],
    //       event.previousIndex,
    //       event.currentIndex);
    //
    //     this.dataSource = new ArrayDataSource(event.container.data['_data']);
    //   }
    //
    // }
    //
    // dragstart() {
    //   console.log('dragstart');
    // }
    //
    // treeDragStarted(event) {
    //   console.log('-------+++++ treeDragStarted');
    //   console.log(event);
    // }

    // treeControl = new FlatTreeControl<ExampleFlatNode>(
    //   node => node.level, node => node.expandable);
    //
    // dataSource = new ArrayDataSource(TREE_DATA);
    // hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
    //
    // getParentNode(node: ExampleFlatNode) {
    //   const nodeIndex = TREE_DATA.indexOf(node);
    //   for (let i = nodeIndex - 1; i >= 0; i--) {
    //     if (TREE_DATA[i].level === node.level - 1) {
    //       return TREE_DATA[i];
    //     }
    //   }
    //   return null;
    // }


}

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }
//
// const TREE_DATA: ExampleFlatNode[] = [
//   {
//     name: 'Fruit',
//     expandable: true,
//     level: 0,
//   }, {
//     name: 'Apple',
//     expandable: false,
//     level: 1,
//   }, {
//     name: 'Banana',
//     expandable: false,
//     level: 1,
//   }, {
//     name: 'Fruit loops',
//     expandable: false,
//     level: 1,
//   }, {
//     name: 'Vegetables',
//     expandable: true,
//     level: 0,
//   }, {
//     name: 'Green',
//     expandable: true,
//     level: 1,
//   }, {
//     name: '1',
//     expandable: false,
//     level: 2,
//   }, {
//     name: '2',
//     expandable: false,
//     level: 2,
//   }, {
//     name: '3',
//     expandable: false,
//     level: 2,
//   }, {
//     name: 'Orange',
//     expandable: true,
//     level: 1,
//   }, {
//     name: 'Pumpkins',
//     expandable: false,
//     level: 2,
//   }
// ];
//
// /** Flat node with expandable and level information */
// interface ExampleFlatNode {
//   expandable: boolean;
//   name: string;
//   level: number;
//   isExpanded?: boolean;
// }
//
//
// /** Flat node with expandable and level information */
// interface ExampleFlatNode {
//   expandable: boolean;
//   name: string;
//   level: number;
// }
//
