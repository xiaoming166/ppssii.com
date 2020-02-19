const Tree = {
    template: '' +
        '<div>' +
        '<el-tree :data="data" node-key="id" :default-expand-all="defaultExpandAll"  :expand-on-click-node="expandOnClickNode" :check-on-click-node="checkOnClickNode" @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd" @node-drop="handleDrop" :draggable="draggable"  :highlight-current="highlightCurrent" :auto-expand-parent="autoExpandParent" :show-checkbox="showCheckbox" :check-strictly="checkStrictly" :accordion="accordion" :indent="indent"> </el-tree></div>',
    data: function () {
        return {
            draggable: true,//是否开启拖拽节点功能
            indent: 16,//相邻级节点间的水平缩进，单位为像素
            accordion: false,//是否每次只打开一个同级树节点展开
            checkStrictly: false,//显示复选框时，是否严格遵守父子不互相关联
            showCheckbox: false,//是否显示复选框
            autoExpandParent: true,//展开子节点的时候是否自动展开父节点
            checkOnClickNode: true,//是否在点击节点的时候选中节点
            expandOnClickNode: false,//是否在点击节点的时候展开或者收缩节点
            defaultExpandAll: false,//是否默认展开所有节点
            highlightCurrent: true,//是否高亮当前选中节点
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2',
                    children: [{
                        id: 11,
                        label: '三级 3-2-1'
                    }, {
                        id: 12,
                        label: '三级 3-2-2'
                    }, {
                        id: 13,
                        label: '三级 3-2-3'
                    }]
                }]
            }]
        }
    },
    methods: {
        handleDragStart(node, ev) {
            console.log('drag start', node);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
            console.log('tree drag enter: ', dropNode.label);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
            console.log('tree drag leave: ', dropNode.label);
        },
        handleDragOver(draggingNode, dropNode, ev) {
            console.log('tree drag over: ', dropNode.label);
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
            console.log('tree drag end: ', dropNode && dropNode.label, dropType);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            console.log('tree drop: ', dropNode.label, dropType);
        },

    }
}