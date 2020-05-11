import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNode,
  NzTreeNodeOptions
} from 'ng-zorro-antd';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'online-note';
  noteModal = false;

  nodes = [];
  baseNodeTitle = '';
  activatedNode: NzTreeNode;
  contextNote;
  addNodeModal = false;
  contextNode;
  copyNode;
  copyNote;
  copyMode;
  menuName = '';
  note = '';
  notes = [];
  editingNote = {content: '', id: ''};
  editingIndex;
  noteEditModal = false;

  @ViewChild('tree') nzTree: NzTreeComponent;
  nodeEditModal = false;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private nzContextMenuService: NzContextMenuService) {
  }


  // 初始化
  ngOnInit(): void {
    this.apiService.travelUser().subscribe(data => {
      this.apiService.uuid = '595e5228-f75a-43de-ba92-6bdedfbc4707';
      this.apiService.content().subscribe(res => {
        const nodes = res;
        console.log(nodes);
        this.nodes = nodes.map(node => {
          return {title: node.name, key: node.id, notes: []};
        });
      });
    });
  }


  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }


  // 打开目录
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

  // 选中节点
  activeNode(data: NzFormatEmitEvent): void {
    this.activatedNode = data.node;
    this.notes = [];
    this.apiService.getChildren({
      mid: data.node.key
    }).subscribe(data => {
      this.notes = data.items;
    });
    this.cdr.markForCheck();
  }


  // 添加目录
  addBaseNode() {

    this.addNodeModal = false;
    const uuid = uuidv4();
    if (this.contextNode) {
      this.contextNode.addChildren([
        {
          title: this.baseNodeTitle,
          key: uuid,
          notes: []
        }
      ]);
      this.apiService.addMenu({
        pid: this.contextNode.key,
        name: this.baseNodeTitle
      }).subscribe(data => {
        console.log(data);
      });
    } else {
      this.nodes = this.nodes.concat({
        title: this.baseNodeTitle,
        key: uuid,
        notes: []
      });
      this.apiService.addMenu({
        name: this.baseNodeTitle,
        orderid: 0,
        pid: 0
      }).subscribe(data => {
        const node = this.nzTree.getTreeNodeByKey(uuid);
        node.key = data.id;
        console.log(data);
      });
    }

  }

  // 右键单击出现菜单
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.nzContextMenuService.create($event, menu);
  }

  // 笔记菜单
  contextNoteMenu($event: MouseEvent, menu2: NzDropdownMenuComponent, note: any) {
    this.contextMenu($event, menu2);
    this.contextNote = note;
  }

  selectDropdown(): void {

  }


  // 拖拽放置
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }

  // 放置节点
  dropNode($event: NzFormatEmitEvent) {
    console.log('drop');
  }


  closeMenu(): void {
    this.nzContextMenuService.close();
  }


  // 关闭弹出框
  handleCancel(): void {
    this.noteModal = false;
    this.note = '';
    this.baseNodeTitle = '';
    this.addNodeModal = false;
    this.noteEditModal = false;
  }

  // 添加笔记
  addNote(): void {
    const uuid = uuidv4();
    this.notes = this.notes.concat([{
      content: this.note,
      id: uuid
    }]);
    // this.refreshNotes();
    this.noteModal = false;
    this.apiService.addChildItem({
      mid: this.contextNode.key,
      content: this.note
    }).subscribe(data => {
      const index = this.notes.findIndex(n => n.id === uuid);
      this.notes[index] = data;
      console.log(this.contextNode);
    });
    this.note = '';
  }

  // 显示目录弹出框
  showAddNodeModal() {
    this.addNodeModal = true;
    this.baseNodeTitle = '';
  }

  // 显示笔记弹出框
  showAddNoteModal() {
    this.noteModal = true;
    this.note = '';
  }

  // 刷新笔记
  refreshNotes() {
    this.notes = [...this.activatedNode.origin.notes];
  }

  // 显示节点菜单
  showNodeMenu($event: MouseEvent, menu: NzDropdownMenuComponent, node: NzTreeNode): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.nzContextMenuService.create($event, menu);
    this.contextNode = node;
  }

  // 复制
  copy(mode = 'node') {
    this.copyMode = mode;
    if (this.copyMode === 'node') {
      this.cacheCopyNode();
    } else if (this.copyMode === 'note') {
      this.cacheCopyNote(this.contextNote);
    }
  }

  // 缓存复制的目录
  cacheCopyNode() {
    const origin = this.contextNode.origin;
    this.copyNestNode(origin);
    this.copyNode = {...origin};
  }

  // 递归复制节点
  copyNestNode(node: NzTreeNodeOptions): void {
    node.key = uuidv4();
    node.selected = false;
    (node.children || []).forEach(child => {
      this.copyNestNode(child);
    });
  }

  // 缓存复制的笔记
  cacheCopyNote(note) {
    this.copyNote = note;
  }

  // 粘贴笔记
  pasteNote() {
    this.contextNode.origin.notes = this.contextNode.origin.notes.concat(this.copyNote);
    this.refreshNotes();
  }

  // 粘贴节点
  paste() {
    // 再更新一次key
    if (this.copyMode === 'node') {
      this.copyNestNode(this.copyNode);
      this.contextNode.addChildren([{...this.copyNode}]);
    } else if (this.copyMode === 'note') {
      this.pasteNote();
    }

  }

  // 删除节点
  removeNode(node: NzTreeNode) {
    node.remove();
    this.notes = this.activatedNode.getChildren();
  }

  // 编辑保存笔记
  saveNote() {
    this.activatedNode.origin.notes[this.editingIndex] = this.editingNote;
    this.noteEditModal = false;
    this.apiService.updateItem({
      itemid: this.editingNote.id,
      content: this.editingNote.content
    }).subscribe(data => {
      console.log(data);
    });
  }

  // 编辑选中笔记
  editNote(note: any, i: number) {
    this.editingNote = note;
    this.editingIndex = i;
    this.noteEditModal = true;
  }

  // 删除节点
  deleteNode(): void {
    const activeNode = this.nzTree.getTreeNodeByKey(this.contextNode.key);
    activeNode.remove();
    if (!activeNode.getParentNode()) {
      this.nodes = this.nodes.filter(node => node.key !== activeNode.key);
    }
    this.apiService.deleteMenu({mid: activeNode.key}).subscribe(data => {
      console.log(data);
    });
  }

  // 删除笔记
  deleteNote(note): void {
    this.notes = this.notes.filter(n => note.id !== n.id);
    this.apiService.deleteItem({
      itemid: note.id
    }).subscribe(data => {
      console.log(data);
    });
  }

  // 保存节点
  saveNode() {
    this.contextNode.title = this.menuName;
    this.nodeEditModal = false;
    this.apiService.updateMenu({
      mid: this.contextNode.key,
      name: this.menuName
    }).subscribe(data => {
      console.log(data);
    });
  }

  // 编辑节点
  editNode() {
    this.nodeEditModal = true;
  }
}
