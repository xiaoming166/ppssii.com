const Index = {
    template: '<div class="g-container-box">' +
        '<!-- 左侧盒子 -->' +
        '<div class="g-left-box">' +
        '<!-- 操作按钮 -->' +
        '<ul class="g-tool-box">' +
        '<div id="addlog">' +
        '<a href="member.php?mod=register">' +
        '<div class="btn">register</div>' +
        '</a>' +
        '<a href="member.php?mod=logging&amp;action=login">' +
        '<div class="btn">log in </div>' +
        '</a>' +
        '</div>' +
        '<div style="clear: both;"></div>' +
        '<label><input type="radio" name="menu" value="1">add folder</label><br>            ' +
        '<label><input type="radio" name="menu" checked="true" value="2">add note</label>' +
        '</ul>' +
        '<div id="bodyTree" class="g-body-tree ztree">' +
        '<router-view name="tree"></router-view>' +
        '<div id="rubbishTree" class="g-rubbish-tree ztree"></div>' +
        '</div>' +
        '</div>' +
        '<!-- 右侧盒子 -->' +
        '<div class="g-right-box">' +
        '<div id="childTree" class="g-child-tree ztree">' +
        '<router-view name="note"></router-view>' +
        '</div>' +
        '<div class="g-input-box">' +
        '<input id="txtNodeName" type="text" class="txt-input">' +
        '<button class="btn-add">add note</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
}