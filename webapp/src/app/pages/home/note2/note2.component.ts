import {AfterViewInit, Component, ElementRef, Injectable, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {
    NzContextMenuService,
    NzDropdownMenuComponent, NzFormatBeforeDropEvent,
    NzFormatEmitEvent, NzMessageService,
    NzTreeComponent,
    NzTreeNode
} from "ng-zorro-antd";
import {fromEvent, Observable, of, zip} from "rxjs";
import {delay, filter, map, switchMap, take} from "rxjs/operators";
import {NoteService} from "../note/note.service";
import {Note2Service} from "./note2.service";


@Component({
    selector: 'app-note2',
    templateUrl: './note2.component.html',
    styleUrls: ['./note2.component.less'],
})
export class Note2Component implements OnInit, AfterViewInit {
    @ViewChild('treeDiv', {static: true}) treeDiv: ElementRef;
    @ViewChild('nzTree', {static: true}) nzTree: NzTreeComponent;

    ddd = 2323;

    editId: string;
    // activated node
    activatedNode?: NzTreeNode;
    nodes = [
        {
            title: 'parent 0',
            key: '100',
            author: 'NG ZORRO',
            expanded: true,
            children: [
                {title: 'leaf 0-0', key: '1000', author: 'NG ZORRO', isLeaf: true},
                {title: 'leaf 0-1', key: '1001', author: 'NG ZORRO', isLeaf: true}
            ]
        },
        {
            title: 'parent 1',
            key: '101',
            author: 'NG ZORRO',
            children: [
                {title: 'leaf 1-0', key: '1010', author: 'NG ZORRO', isLeaf: true},
                {title: 'leaf 1-1', key: '1011', author: 'NG ZORRO', isLeaf: true},
                {
                    title: 'leaf 1-2',
                    key: '1012',
                    author: 'NG ZORRO',
                    expanded: true,
                    children: [
                        {title: 'leaf 3-0', key: '1031', author: 'NG ZORRO', isLeaf: true},
                        {title: 'leaf 3-1', key: '1032', author: 'NG ZORRO', isLeaf: true}
                    ]
                }
            ]
        }
    ];

    openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
        // do something if u want
        if (data instanceof NzTreeNode) {
            data.isExpanded = !data.isExpanded;
        } else {
            const node = data.node;
            if (node) {
                node.isExpanded = !node.isExpanded;
            }
        }
    }

    activeNode(data: NzFormatEmitEvent): void {
        this.activatedNode = data.node!;
    }

    contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
        this.nzContextMenuService.create($event, menu);
    }

    selectDropdown(): void {
        // do something
    }

    constructor(private nzContextMenuService: NzContextMenuService,
                private msgService: NzMessageService,
                private el: ElementRef,
                private noteService: NoteService,
                private note2Service: Note2Service,
                private render2: Renderer2) {
    }

    ngOnInit() {
    }

    nzEvent(event: NzFormatEmitEvent): void {
        console.log(event);
    }

    startEdit(id: string): void {
        this.editId = id;
    }

    stopEdit(): void {
        this.editId = null;
    }

    // 新增文件夹
    addFile() {
        this.nodes = [...this.nodes, {title: '新增' + this.ddd, key: '' + this.ddd++, author: 'NG ZORRO', children: []},]
    }

    // 删除节点
    deleteNode(key) {
        if (this.nzTree.getTreeNodeByKey(key).level !== 0) {
            this.nzTree.getTreeNodeByKey(key).remove();
            this.msgService.success('清除成功')
        } else {
            this.msgService.warning('根节点暂无权限删除')
        }

    }

    // 数据二次检验
    beforeDrop(arg: NzFormatBeforeDropEvent): Observable<boolean> {
        // if insert node into another node, wait 1s
        if (arg.pos === 0) {
            return of(true).pipe(delay(1000));
        } else {
            return of(false);
        }
    }

    ngAfterViewInit() {
        const treeDivBox = this.treeDiv.nativeElement;
        this.noteService.dragSubject.pipe(
            switchMap(res => zip(of(res), fromEvent(treeDivBox, 'mouseup').pipe(
                filter((res: any) => {
                    return this.el.nativeElement.querySelector('.ant-tree .ant-tree-node-content-wrapper:hover');
                }),
            ))),
        ).subscribe((res) => {
            const key = this.el.nativeElement
                .querySelector('.ant-tree .ant-tree-node-content-wrapper:hover').children[0].id;

            // 移动文件
            this.nzTree.getTreeNodeByKey(key).addChildren([{
                title: res[0]['name'],
                key: this.ddd++,
                author: 'NG ZORRO',
                isLeaf: true
            },])

            this.note2Service.transTreeDragEnd.next(res[0]);
        })


        // // 监听外部数据移入
        // fromEvent(treeDivBox, 'mouseup').pipe(
        //     filter((res: MouseEvent, index) =>
        //         this.el.nativeElement.querySelector('.ant-tree .ant-tree-node-content-wrapper:hover')
        //     )
        // ).subscribe((res) => {
        //     try {
        //         // 叶子节点无法添加
        //         const key = this.el.nativeElement
        //             .querySelector('.ant-tree .ant-tree-node-content-wrapper:hover').children[0].id;
        //         this.nzTree.getTreeNodeByKey(key).addChildren([{
        //             title: 'leaf 0-' + this.ddd++,
        //             key: this.ddd++,
        //             author: 'NG ZORRO',
        //             isLeaf: true
        //         },])
        //     } catch (e) {
        //         console.log(e);
        //     }
        // })
    }

}




