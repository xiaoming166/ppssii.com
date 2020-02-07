var host="wss://144.202.114.146:8282"; //websocket连接地址
var ws=new WebSocket(host);  //创建websocket对象
var token=null;     //凭据


var arr,reg = new RegExp("sB7M_2132_auth=(.*?);");

if (arr = document.cookie.match(reg)) {

    token= unescape(arr[1]);
} else {
    token= null;
}
console.log(token);
//alert(token);
//token="web_token_xxx";
if (token==null) {
 console.log("未登陆")
}else {

    console.log("已登陆")
}

ws.onopen = function()
{
    // Web Socket 已连接上，使用 send() 方法发送数据
    //ws.send("发送数据");

};

ws.onmessage = function (evt)
{
    var received_msg = JSON.parse(evt.data);

    console.log(received_msg);
    switch (received_msg.type) {
        case 'ping':
            var msg=new Object();
            msg.type="pong";
            var msg=JSON.stringify(msg);
            ws.send(msg);
            break;
        case 'needToken':
            var msg=new Object();
            msg.type="myToken";
            msg.device="web";
            msg.token=token;
            console.log("json格式："+JSON.stringify(msg));
            ws.send(JSON.stringify(msg));
            break;
        case 'joined':
            console.log('凭据验证成功');
            break;
        case 'token_illegal':
            console.log('凭据非法');
            break;
        case 'uid_empty':
            alert('未找到token对应的用户信息，请退出后重新登陆');
            console.log('未找到token对应的用户信息，请退出后重新登陆');
            break;
        case 'addItem':
            console.log("web端收到同步数据(添加子节点)："+received_msg.data.id);
            // web端用getChildNodes方法重新更新子节点数据
            Tree.getChildNodes();
            break;
        case 'setItem':
            console.log("web端收到同步数据(编辑子节点)："+received_msg.data.id);
            Tree.getChildNodes();
            break;
        case 'setMenu':
            console.log("web端收到同步数据(编辑父节点)："+received_msg.data.id);
            Tree.getMenuTree();
            break;
        case 'deleteItem':
            console.log("web端收到同步数据(删除子节点)："+received_msg.itemid);
            Tree.getChildNodes();
            break;
        case 'addMenu':
            console.log("web端收到同步数据(添加父节点)："+received_msg.data.id);
            Tree.getMenuTree();
            break;
        case 'deleteMenu':
            console.log("web端收到同步数据(删除父节点)："+received_msg.data.id);
            Tree.getMenuTree();
            break;
        case 'catalog':
            console.log("web端收到同步数据(拖拽任意一个节点（包括父节点或子节点）到另一个任意节点（包括父节点或子节点）)："+received_msg.itemid);
            Tree.getMenuTree();
            break;
        case 'setItemOrders':
            console.log("web端收到同步数据(当拖拽子节点后，获得当前列表子节点新的排序)："+received_msg.orders);
            Tree.getChildNodes();
            break;
        case 'setMidOrders':
            console.log("web端收到同步数据(当拖拽父节点后，获得当前列表父节点新的排序)："+received_msg.orders);
            Tree.getMenuTree();
            break;

        default:
            break;
    }


};

ws.onclose = function()
{
    // 关闭 websocket
    console.log("websocket连接已关闭...");
};



//广播数据方法
function ws_addItem(json) {
    //添加子节点成功后websocket广播同步数据
    var msg=new Object();
    msg.type="addItem";
    msg.device="web";
    msg.data=json.data;
    var msg=JSON.stringify(msg);
    ws.send(msg);
}

function ws_setItem(json) {
    //编辑子节点成功后websocket广播同步数据
    var msg=new Object();
    msg.type="setItem";
    msg.device="web";
    msg.data=json.data;
    var msg=JSON.stringify(msg);
    ws.send(msg);
}

function ws_setMenu(json) {
    //编辑父节点成功后websocket广播同步数据
    var msg=new Object();
    msg.type="setMenu";
    msg.device="web";
    msg.data=json.data;
    var msg=JSON.stringify(msg);
    ws.send(msg);

}

function ws_deleteItem(_uid,id) {
    //子节点删除成功后websocket广播同步数据
    var msg=new Object();
    msg.type="deleteItem";
    msg.device="web";
    msg.uid=_uid;
    msg.itemid=id;
    var msg=JSON.stringify(msg);
    ws.send(msg);
}

function ws_addMenu(json) {
    //添加父节点成功后websocket广播同步数据
    var msg=new Object();
    msg.type="addMenu";
    msg.device="web";
    msg.data=json.data;
    var msg=JSON.stringify(msg);
    ws.send(msg);

}

function ws_deleteMenu(_uid,id) {
    //添加子节点成功后websocket广播同步数据
    var msg=new Object();
    msg.type="deleteMenu";
    msg.device="web";
    msg.uid=_uid;
    msg.mid=id;
    var msg=JSON.stringify(msg);
    ws.send(msg);

}

function ws_catalog(uid,mid,itemid,is_catalog,drag_file) {
    //拖拽任意一个节点（包括父节点或子节点）到另一个任意节点（包括父节点或子节点）成功后websocket广播同步数据
    var msg=new Object();
    msg.type="catalog";
    msg.device="web";
    msg.uid=_uid;
    msg.mid=id;
    msg.itemid=itemid;
    msg.is_catalog=is_catalog;
    msg.drag_file=drag_file;
    var msg=JSON.stringify(msg);
    ws.send(msg);
}

function ws_setItemOrders(orders) {
    //拖拽任意一个节点（包括父节点或子节点）到另一个任意节点（包括父节点或子节点）成功后websocket广播同步数据
    var msg=new Object();
    msg.type="setItemOrders";
    msg.device="web";
    msg.orders=orders;

    var msg=JSON.stringify(msg);
    ws.send(msg);
}

function ws_setMidOrders(orders) {
    //当拖拽父节点后，获得当前列表父节点新的排序成功后websocket广播同步数据
    var msg=new Object();
    msg.type="setMidOrders";
    msg.device="web";
    msg.orders=orders;

    var msg=JSON.stringify(msg);
    ws.send(msg);
}