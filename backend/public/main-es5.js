function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./$$_lazy_route_resource lazy recursive":
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function $$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./src/app/api.service.ts":
  /*!********************************!*\
    !*** ./src/app/api.service.ts ***!
    \********************************/

  /*! exports provided: ApiService */

  /***/
  function srcAppApiServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ApiService", function () {
      return ApiService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/_@angular_core@9.1.7@@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/_@angular_common@9.1.7@@angular/common/__ivy_ngcc__/fesm2015/http.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/_rxjs@6.5.5@rxjs/_esm2015/operators/index.js");

    var ApiService = /*#__PURE__*/function () {
      function ApiService(http) {
        _classCallCheck(this, ApiService);

        this.http = http;
        this.uuid = '';
      }

      _createClass(ApiService, [{
        key: "travelUser",
        value: function travelUser() {
          var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'xiao_hu_li';
          return this.http.post("http://ppssii.com/api/auth/makeUuid", {}).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res.data;
          }));
        }
      }, {
        key: "content",
        value: function content() {
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json',
            uuid: this.uuid
          });
          return this.http.post('http://ppssii.com/api/menu/list', {}, {
            headers: headers
          }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res.data;
          }));
        }
      }, {
        key: "addMenu",
        value: function addMenu(menu) {
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json',
            uuid: this.uuid
          });
          return this.http.post('http://ppssii.com/api/menu/addMenu', menu, {
            headers: headers
          }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res.data;
          }));
        }
      }, {
        key: "addChildItem",
        value: function addChildItem(menu) {
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json',
            uuid: this.uuid
          });
          return this.http.post('http://ppssii.com/api/menu/addItem', menu, {
            headers: headers
          }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res.data;
          }));
        }
      }, {
        key: "getChildren",
        value: function getChildren(menu) {
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json',
            uuid: this.uuid
          });
          return this.http.post('http://ppssii.com/api/menu/menuItem', menu, {
            headers: headers
          }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res.data;
          }));
        }
      }, {
        key: "deleteMenu",
        value: function deleteMenu(menu) {
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json',
            uuid: this.uuid
          });
          return this.http.post('http://ppssii.com/api/menu/delMenu', menu, {
            headers: headers
          }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res.data;
          }));
        }
      }, {
        key: "deleteItem",
        value: function deleteItem(menu) {
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json',
            uuid: this.uuid
          });
          return this.http.post('http://ppssii.com/api/menu/delItem', menu, {
            headers: headers
          }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res.data;
          }));
        }
      }, {
        key: "updateItem",
        value: function updateItem(menu) {
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json',
            uuid: this.uuid
          });
          return this.http.post('http://ppssii.com/api/menu/updateItem', menu, {
            headers: headers
          }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res.data;
          }));
        }
      }, {
        key: "updateMenu",
        value: function updateMenu(menu) {
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json',
            uuid: this.uuid
          });
          return this.http.post('http://ppssii.com/api/menu/updateMenu', menu, {
            headers: headers
          }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res.data;
          }));
        }
      }]);

      return ApiService;
    }();

    ApiService.ɵfac = function ApiService_Factory(t) {
      return new (t || ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));
    };

    ApiService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: ApiService,
      factory: ApiService.ɵfac,
      providedIn: 'root'
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ApiService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
          providedIn: 'root'
        }]
      }], function () {
        return [{
          type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/app-routing.module.ts":
  /*!***************************************!*\
    !*** ./src/app/app-routing.module.ts ***!
    \***************************************/

  /*! exports provided: AppRoutingModule */

  /***/
  function srcAppAppRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/_@angular_core@9.1.7@@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/_@angular_router@9.1.7@@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var routes = [];

    var AppRoutingModule = function AppRoutingModule() {
      _classCallCheck(this, AppRoutingModule);
    };

    AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: AppRoutingModule
    });
    AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function AppRoutingModule_Factory(t) {
        return new (t || AppRoutingModule)();
      },
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/_@angular_core@9.1.7@@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ng-zorro-antd */
    "./node_modules/_ng-zorro-antd@9.1.2@ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd.js");
    /* harmony import */


    var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/cdk/drag-drop */
    "./node_modules/_@angular_cdk@9.2.3@@angular/cdk/__ivy_ngcc__/fesm2015/drag-drop.js");
    /* harmony import */


    var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! uuid */
    "./node_modules/_uuid@8.0.0@uuid/dist/esm-browser/index.js");
    /* harmony import */


    var _api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./api.service */
    "./src/app/api.service.ts");
    /* harmony import */


    var ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ng-zorro-antd/menu */
    "./node_modules/_ng-zorro-antd@9.1.2@ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-menu.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/_@angular_common@9.1.7@@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/_@angular_forms@9.1.7@@angular/forms/__ivy_ngcc__/fesm2015/forms.js");

    var _c0 = ["tree"];

    function AppComponent_nz_empty_12_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "nz-empty");
      }
    }

    function AppComponent_ng_template_15_span_1_Template(rf, ctx) {
      if (rf & 1) {
        var _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 30);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("contextmenu", function AppComponent_ng_template_15_span_1_Template_span_contextmenu_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);

          var node_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;

          var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](18);

          return ctx_r13.showNodeMenu($event, _r5, node_r10);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "i", 31);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_ng_template_15_span_1_Template_i_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);

          var node_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;

          var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r16.openFolder(node_r10);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 32);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var node_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzType", node_r10.isExpanded ? "folder-open" : "folder");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](node_r10.title);
      }
    }

    function AppComponent_ng_template_15_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AppComponent_ng_template_15_span_1_Template, 4, 2, "span", 29);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var node_r10 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !node_r10.isLeaf);
      }
    }

    function AppComponent_nz_list_35_nz_list_item_1_Template(rf, ctx) {
      if (rf & 1) {
        var _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nz-list-item", 35);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("contextmenu", function AppComponent_nz_list_35_nz_list_item_1_Template_nz_list_item_contextmenu_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23);

          var note_r20 = ctx.$implicit;

          var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](38);

          return ctx_r22.contextNoteMenu($event, _r8, note_r20);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ul", 36);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "li");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 13);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_nz_list_35_nz_list_item_1_Template_a_click_4_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23);

          var note_r20 = ctx.$implicit;
          var i_r21 = ctx.index;

          var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          return ctx_r24.editNote(note_r20, i_r21);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "\u7F16\u8F91");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 13);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_nz_list_35_nz_list_item_1_Template_a_click_7_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23);

          var note_r20 = ctx.$implicit;

          var ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          return ctx_r25.deleteNote(note_r20);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "\u5220\u9664");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var note_r20 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", note_r20.content, " ");
      }
    }

    function AppComponent_nz_list_35_Template(rf, ctx) {
      if (rf & 1) {
        var _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nz-list", 33);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("contextmenu", function AppComponent_nz_list_35_Template_nz_list_contextmenu_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r27);

          var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](45);

          return ctx_r26.contextMenu($event, _r9);
        })("cdkDropListDropped", function AppComponent_nz_list_35_Template_nz_list_cdkDropListDropped_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r27);

          var ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r28.drop($event);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AppComponent_nz_list_35_nz_list_item_1_Template, 9, 1, "nz-list-item", 34);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("nzHeader", "\u6587\u4EF6\u5939-", ctx_r6.activatedNode == null ? null : ctx_r6.activatedNode.title, "");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r6.notes);
      }
    }

    function AppComponent_nz_empty_36_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "nz-empty");
      }
    }

    var _c1 = function _c1() {
      return ["x"];
    };

    var AppComponent = /*#__PURE__*/function () {
      function AppComponent(apiService, cdr, nzContextMenuService) {
        _classCallCheck(this, AppComponent);

        this.apiService = apiService;
        this.cdr = cdr;
        this.nzContextMenuService = nzContextMenuService;
        this.title = 'online-note';
        this.noteModal = false;
        this.nodes = [];
        this.baseNodeTitle = '';
        this.addNodeModal = false;
        this.menuName = '';
        this.note = '';
        this.notes = [];
        this.editingNote = {
          content: '',
          id: ''
        };
        this.noteEditModal = false;
        this.nodeEditModal = false;
      } // 初始化


      _createClass(AppComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this = this;

          this.apiService.travelUser().subscribe(function (data) {
            _this.apiService.uuid = '595e5228-f75a-43de-ba92-6bdedfbc4707';

            _this.apiService.content().subscribe(function (res) {
              var nodes = res;
              console.log(nodes);
              _this.nodes = nodes.map(function (node) {
                return {
                  title: node.name,
                  key: node.id,
                  notes: []
                };
              });
            });
          });
        }
      }, {
        key: "nzEvent",
        value: function nzEvent(event) {
          console.log(event);
        } // 打开目录

      }, {
        key: "openFolder",
        value: function openFolder(data) {
          // do something if u want
          if (data instanceof ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzTreeNode"]) {
            data.isExpanded = !data.isExpanded;
          } else {
            var node = data.node;

            if (node) {
              node.isExpanded = !node.isExpanded;
            }
          }
        } // 选中节点

      }, {
        key: "activeNode",
        value: function activeNode(data) {
          var _this2 = this;

          this.activatedNode = data.node;
          this.notes = [];
          this.apiService.getChildren({
            mid: data.node.key
          }).subscribe(function (data) {
            _this2.notes = data.items;
          });
          this.cdr.markForCheck();
        } // 添加目录

      }, {
        key: "addBaseNode",
        value: function addBaseNode() {
          var _this3 = this;

          this.addNodeModal = false;
          var uuid = Object(uuid__WEBPACK_IMPORTED_MODULE_3__["v4"])();

          if (this.contextNode) {
            this.contextNode.addChildren([{
              title: this.baseNodeTitle,
              key: uuid,
              notes: []
            }]);
            this.apiService.addMenu({
              pid: this.contextNode.key,
              name: this.baseNodeTitle
            }).subscribe(function (data) {
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
            }).subscribe(function (data) {
              var node = _this3.nzTree.getTreeNodeByKey(uuid);

              node.key = data.id;
              console.log(data);
            });
          }
        } // 右键单击出现菜单

      }, {
        key: "contextMenu",
        value: function contextMenu($event, menu) {
          $event.preventDefault();
          $event.stopPropagation();
          this.nzContextMenuService.create($event, menu);
        } // 笔记菜单

      }, {
        key: "contextNoteMenu",
        value: function contextNoteMenu($event, menu2, note) {
          this.contextMenu($event, menu2);
          this.contextNote = note;
        }
      }, {
        key: "selectDropdown",
        value: function selectDropdown() {} // 拖拽放置

      }, {
        key: "drop",
        value: function drop(event) {
          Object(_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["moveItemInArray"])(this.notes, event.previousIndex, event.currentIndex);
        } // 放置节点

      }, {
        key: "dropNode",
        value: function dropNode($event) {
          console.log('drop');
        }
      }, {
        key: "closeMenu",
        value: function closeMenu() {
          this.nzContextMenuService.close();
        } // 关闭弹出框

      }, {
        key: "handleCancel",
        value: function handleCancel() {
          this.noteModal = false;
          this.note = '';
          this.baseNodeTitle = '';
          this.addNodeModal = false;
          this.noteEditModal = false;
        } // 添加笔记

      }, {
        key: "addNote",
        value: function addNote() {
          var _this4 = this;

          var uuid = Object(uuid__WEBPACK_IMPORTED_MODULE_3__["v4"])();
          this.notes = this.notes.concat([{
            content: this.note,
            id: uuid
          }]); // this.refreshNotes();

          this.noteModal = false;
          this.apiService.addChildItem({
            mid: this.contextNode.key,
            content: this.note
          }).subscribe(function (data) {
            var index = _this4.notes.findIndex(function (n) {
              return n.id === uuid;
            });

            _this4.notes[index] = data;
            console.log(_this4.contextNode);
          });
          this.note = '';
        } // 显示目录弹出框

      }, {
        key: "showAddNodeModal",
        value: function showAddNodeModal() {
          this.addNodeModal = true;
          this.baseNodeTitle = '';
        } // 显示笔记弹出框

      }, {
        key: "showAddNoteModal",
        value: function showAddNoteModal() {
          this.noteModal = true;
          this.note = '';
        } // 刷新笔记

      }, {
        key: "refreshNotes",
        value: function refreshNotes() {
          this.notes = _toConsumableArray(this.activatedNode.origin.notes);
        } // 显示节点菜单

      }, {
        key: "showNodeMenu",
        value: function showNodeMenu($event, menu, node) {
          $event.preventDefault();
          $event.stopPropagation();
          this.nzContextMenuService.create($event, menu);
          this.contextNode = node;
        } // 复制

      }, {
        key: "copy",
        value: function copy() {
          var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'node';
          this.copyMode = mode;

          if (this.copyMode === 'node') {
            this.cacheCopyNode();
          } else if (this.copyMode === 'note') {
            this.cacheCopyNote(this.contextNote);
          }
        } // 缓存复制的目录

      }, {
        key: "cacheCopyNode",
        value: function cacheCopyNode() {
          var origin = this.contextNode.origin;
          this.copyNestNode(origin);
          this.copyNode = Object.assign({}, origin);
        } // 递归复制节点

      }, {
        key: "copyNestNode",
        value: function copyNestNode(node) {
          var _this5 = this;

          node.key = Object(uuid__WEBPACK_IMPORTED_MODULE_3__["v4"])();
          node.selected = false;
          (node.children || []).forEach(function (child) {
            _this5.copyNestNode(child);
          });
        } // 缓存复制的笔记

      }, {
        key: "cacheCopyNote",
        value: function cacheCopyNote(note) {
          this.copyNote = note;
        } // 粘贴笔记

      }, {
        key: "pasteNote",
        value: function pasteNote() {
          this.contextNode.origin.notes = this.contextNode.origin.notes.concat(this.copyNote);
          this.refreshNotes();
        } // 粘贴节点

      }, {
        key: "paste",
        value: function paste() {
          // 再更新一次key
          if (this.copyMode === 'node') {
            this.copyNestNode(this.copyNode);
            this.contextNode.addChildren([Object.assign({}, this.copyNode)]);
          } else if (this.copyMode === 'note') {
            this.pasteNote();
          }
        } // 删除节点

      }, {
        key: "removeNode",
        value: function removeNode(node) {
          node.remove();
          this.notes = this.activatedNode.getChildren();
        } // 编辑保存笔记

      }, {
        key: "saveNote",
        value: function saveNote() {
          this.activatedNode.origin.notes[this.editingIndex] = this.editingNote;
          this.noteEditModal = false;
          this.apiService.updateItem({
            itemid: this.editingNote.id,
            content: this.editingNote.content
          }).subscribe(function (data) {
            console.log(data);
          });
        } // 编辑选中笔记

      }, {
        key: "editNote",
        value: function editNote(note, i) {
          this.editingNote = note;
          this.editingIndex = i;
          this.noteEditModal = true;
        } // 删除节点

      }, {
        key: "deleteNode",
        value: function deleteNode() {
          var activeNode = this.nzTree.getTreeNodeByKey(this.contextNode.key);
          activeNode.remove();

          if (!activeNode.getParentNode()) {
            this.nodes = this.nodes.filter(function (node) {
              return node.key !== activeNode.key;
            });
          }

          this.apiService.deleteMenu({
            mid: activeNode.key
          }).subscribe(function (data) {
            console.log(data);
          });
        } // 删除笔记

      }, {
        key: "deleteNote",
        value: function deleteNote(note) {
          this.notes = this.notes.filter(function (n) {
            return note.id !== n.id;
          });
          this.apiService.deleteItem({
            itemid: note.id
          }).subscribe(function (data) {
            console.log(data);
          });
        } // 保存节点

      }, {
        key: "saveNode",
        value: function saveNode() {
          this.contextNode.title = this.menuName;
          this.nodeEditModal = false;
          this.apiService.updateMenu({
            mid: this.contextNode.key,
            name: this.menuName
          }).subscribe(function (data) {
            console.log(data);
          });
        } // 编辑节点

      }, {
        key: "editNode",
        value: function editNode() {
          this.nodeEditModal = true;
        }
      }]);

      return AppComponent;
    }();

    AppComponent.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzContextMenuService"]));
    };

    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      viewQuery: function AppComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        }

        if (rf & 2) {
          var _t;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.nzTree = _t.first);
        }
      },
      decls: 69,
      vars: 20,
      consts: [[2, "width", "1444px", "margin", "0px auto"], [2, "background", "white"], ["nzTheme", "light", 3, "nzWidth"], [1, "node-card", 3, "contextmenu"], ["addMenu", "nzDropdownMenu"], ["nz-menu", "", 2, "width", "200px"], ["nz-menu-item", "", 3, "click"], [4, "ngIf"], ["nzBlockNode", "", "nzDraggable", "", 3, "nzData", "nzSelectedKeys", "nzTreeTemplate", "nzClick", "nzOnDrop", "nzDblClick"], ["tree", ""], ["nzTreeTemplate", ""], ["menu", "nzDropdownMenu"], ["nz-menu-item", ""], [3, "click"], [1, "node-card"], ["nzSize", "small", "cdkDropList", "", "nzBordered", "", "nzFooter", "", 3, "nzHeader", "contextmenu", "cdkDropListDropped", 4, "ngIf"], ["menu2", "nzDropdownMenu"], ["nz-menu", ""], ["nz-menu-item", "", "nzDisabled", ""], ["menu3", "nzDropdownMenu"], ["nzTitle", "\u6DFB\u52A0\u7B14\u8BB0", 3, "nzVisible", "nzVisibleChange", "nzOnCancel", "nzOnOk"], [3, "nzSpan"], ["nz-input", "", "placeholder", "\u8F93\u5165\u7B14\u8BB0", "nzAutosize", "", 3, "ngModel", "ngModelChange"], ["nzTitle", "\u7F16\u8F91\u7B14\u8BB0", 3, "nzVisible", "nzVisibleChange", "nzOnCancel", "nzOnOk"], ["nzTitle", "\u65B0\u5EFA\u6587\u4EF6\u5939", 3, "nzVisible", "nzVisibleChange", "nzOnCancel", "nzOnOk"], ["nzPrefixIcon", "snippets"], ["type", "text", "nz-input", "", "placeholder", "\u6587\u4EF6\u540D\u79F0", 3, "ngModel", "ngModelChange"], ["nzTitle", "\u7F16\u8F91\u83DC\u5355", 3, "nzVisible", "nzVisibleChange", "nzOnCancel", "nzOnOk"], [1, "custom-node"], [3, "contextmenu", 4, "ngIf"], [3, "contextmenu"], ["nz-icon", "", 3, "nzType", "click"], [1, "folder-name"], ["nzSize", "small", "cdkDropList", "", "nzBordered", "", "nzFooter", "", 3, "nzHeader", "contextmenu", "cdkDropListDropped"], ["class", "example-box", "cdkDrag", "", 3, "contextmenu", 4, "ngFor", "ngForOf"], ["cdkDrag", "", 1, "example-box", 3, "contextmenu"], [1, "ant-list-item-action"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          var _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nz-layout");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "nz-header", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "\u5728\u7EBF\u8BB0\u4E8B\u672C");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "nz-layout");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "nz-sider", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "nz-card", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("contextmenu", function AppComponent_Template_nz_card_contextmenu_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r29);

            var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);

            return ctx.contextMenu($event, _r0);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "nz-dropdown-menu", null, 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "ul", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "li", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_li_click_10_listener() {
            return ctx.addNodeModal = true;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "\u65B0\u5EFA\u6587\u4EF6\u5939");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, AppComponent_nz_empty_12_Template, 1, 0, "nz-empty", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "nz-tree", 8, 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("nzClick", function AppComponent_Template_nz_tree_nzClick_13_listener($event) {
            return ctx.activeNode($event);
          })("nzOnDrop", function AppComponent_Template_nz_tree_nzOnDrop_13_listener($event) {
            return ctx.dropNode($event);
          })("nzDblClick", function AppComponent_Template_nz_tree_nzDblClick_13_listener($event) {
            return ctx.openFolder($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, AppComponent_ng_template_15_Template, 2, 1, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "nz-dropdown-menu", null, 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "ul", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "li", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_li_click_20_listener() {
            return ctx.showAddNodeModal();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "\u65B0\u5EFA\u6587\u4EF6\u5939");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "li", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_li_click_22_listener() {
            return ctx.showAddNoteModal();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "\u65B0\u5EFA\u7B14\u8BB0");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "li", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_25_listener() {
            return ctx.editNode();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "\u7F16\u8F91");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "li", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_li_click_27_listener() {
            return ctx.copy("node");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "\u590D\u5236");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "li", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_li_click_29_listener() {
            return ctx.paste();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "\u7C98\u8D34");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "li", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_li_click_31_listener() {
            return ctx.deleteNode();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "\u5220\u9664");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "nz-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "nz-card", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](35, AppComponent_nz_list_35_Template, 2, 2, "nz-list", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](36, AppComponent_nz_empty_36_Template, 1, 0, "nz-empty", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "nz-dropdown-menu", null, 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "ul", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "li", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_li_click_40_listener() {
            return ctx.copy("note");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "\u590D\u5236");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "li", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "\u5220\u9664");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "nz-dropdown-menu", null, 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "ul", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "li", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "\u65B0\u5EFA");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "li", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "\u7C98\u8D34");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "nz-modal", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("nzVisibleChange", function AppComponent_Template_nz_modal_nzVisibleChange_51_listener($event) {
            return ctx.noteModal = $event;
          })("nzOnCancel", function AppComponent_Template_nz_modal_nzOnCancel_51_listener() {
            return ctx.handleCancel();
          })("nzOnOk", function AppComponent_Template_nz_modal_nzOnOk_51_listener() {
            return ctx.addNote();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "nz-form-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "nz-form-control", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "textarea", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_textarea_ngModelChange_54_listener($event) {
            return ctx.note = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "nz-modal", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("nzVisibleChange", function AppComponent_Template_nz_modal_nzVisibleChange_55_listener($event) {
            return ctx.noteEditModal = $event;
          })("nzOnCancel", function AppComponent_Template_nz_modal_nzOnCancel_55_listener() {
            return ctx.handleCancel();
          })("nzOnOk", function AppComponent_Template_nz_modal_nzOnOk_55_listener() {
            return ctx.saveNote();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "nz-form-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "nz-form-control", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "textarea", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_textarea_ngModelChange_58_listener($event) {
            return ctx.editingNote.content = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "nz-modal", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("nzVisibleChange", function AppComponent_Template_nz_modal_nzVisibleChange_59_listener($event) {
            return ctx.addNodeModal = $event;
          })("nzOnCancel", function AppComponent_Template_nz_modal_nzOnCancel_59_listener() {
            return ctx.handleCancel();
          })("nzOnOk", function AppComponent_Template_nz_modal_nzOnOk_59_listener() {
            return ctx.addBaseNode();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "nz-form-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "nz-form-control", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "nz-input-group", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "input", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_63_listener($event) {
            return ctx.baseNodeTitle = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "nz-modal", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("nzVisibleChange", function AppComponent_Template_nz_modal_nzVisibleChange_64_listener($event) {
            return ctx.nodeEditModal = $event;
          })("nzOnCancel", function AppComponent_Template_nz_modal_nzOnCancel_64_listener() {
            return ctx.handleCancel();
          })("nzOnOk", function AppComponent_Template_nz_modal_nzOnOk_64_listener() {
            return ctx.saveNode();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "nz-form-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "nz-form-control", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "nz-input-group", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "input", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_68_listener($event) {
            return ctx.menuName = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzWidth", 400);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.nodes.length === 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzData", ctx.nodes)("nzSelectedKeys", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](19, _c1))("nzTreeTemplate", _r3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.activatedNode);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.activatedNode);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzVisible", ctx.noteModal);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSpan", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.note);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzVisible", ctx.noteEditModal);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSpan", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.editingNote.content);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzVisible", ctx.addNodeModal);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSpan", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.baseNodeTitle);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzVisible", ctx.nodeEditModal);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSpan", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.menuName);
        }
      },
      directives: [ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzLayoutComponent"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzHeaderComponent"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzSiderComponent"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzCardComponent"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzDropdownMenuComponent"], ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_5__["NzMenuDirective"], ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_5__["NzMenuItemDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzTreeComponent"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzContentComponent"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzModalComponent"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzRowDirective"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzColDirective"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzInputDirective"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzAutosizeDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzInputGroupComponent"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzEmptyComponent"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzIconDirective"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzListComponent"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["CdkDropList"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzListItemComponent"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["CdkDrag"]],
      styles: [".example-list[_ngcontent-%COMP%] {\n  width: 500px;\n  max-width: 100%;\n  min-height: 800px;\n  display: block;\n  background: white;\n  border-radius: 4px;\n  overflow: hidden;\n}\n\n.node-card[_ngcontent-%COMP%] {\n  min-height: 800px;\n}\n\n.example-box[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.87);\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  box-sizing: border-box;\n  cursor: move;\n  background: white;\n  font-size: 14px;\n}\n\n.cdk-drag-preview[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  border-radius: 4px;\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n\n.cdk-drag-placeholder[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n\n.cdk-drag-animating[_ngcontent-%COMP%] {\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n\n.example-box[_ngcontent-%COMP%]:last-child {\n  border: none;\n}\n\n.example-list.cdk-drop-list-dragging[_ngcontent-%COMP%]   .example-box[_ngcontent-%COMP%]:not(.cdk-drag-placeholder) {\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvSjpcXHB1YmxpYy9zcmNcXGFwcFxcYXBwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQ0NGOztBREVBO0VBQ0UsaUJBQUE7QUNDRjs7QURFQTtFQUdFLDBCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQ0RGOztBRElBO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLHFIQUFBO0FDREY7O0FETUE7RUFDRSxVQUFBO0FDSEY7O0FETUE7RUFDRSxzREFBQTtBQ0hGOztBRE1BO0VBQ0UsWUFBQTtBQ0hGOztBRE1BO0VBQ0Usc0RBQUE7QUNIRiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLWxpc3Qge1xuICB3aWR0aDogNTAwcHg7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogODAwcHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4ubm9kZS1jYXJkIHtcbiAgbWluLWhlaWdodDogODAwcHg7XG59XG5cbi5leGFtcGxlLWJveCB7XG4gIC8vcGFkZGluZzogMjBweCAxMHB4O1xuICAvL2JvcmRlci1ib3R0b206IHNvbGlkIDFweCAjY2NjO1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg3KTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBjdXJzb3I6IG1vdmU7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5jZGstZHJhZy1wcmV2aWV3IHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3gtc2hhZG93OiAwIDVweCA1cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuMiksXG4gIDAgOHB4IDEwcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xNCksXG4gIDAgM3B4IDE0cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XG59XG5cbi5jZGstZHJhZy1wbGFjZWhvbGRlciB7XG4gIG9wYWNpdHk6IDA7XG59XG5cbi5jZGstZHJhZy1hbmltYXRpbmcge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XG59XG5cbi5leGFtcGxlLWJveDpsYXN0LWNoaWxkIHtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4uZXhhbXBsZS1saXN0LmNkay1kcm9wLWxpc3QtZHJhZ2dpbmcgLmV4YW1wbGUtYm94Om5vdCguY2RrLWRyYWctcGxhY2Vob2xkZXIpIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDI1MG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xufVxuIiwiLmV4YW1wbGUtbGlzdCB7XG4gIHdpZHRoOiA1MDBweDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiA4MDBweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5ub2RlLWNhcmQge1xuICBtaW4taGVpZ2h0OiA4MDBweDtcbn1cblxuLmV4YW1wbGUtYm94IHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44Nyk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgY3Vyc29yOiBtb3ZlO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uY2RrLWRyYWctcHJldmlldyB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm94LXNoYWRvdzogMCA1cHggNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDhweCAxMHB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwIDNweCAxNHB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xufVxuXG4uY2RrLWRyYWctcGxhY2Vob2xkZXIge1xuICBvcGFjaXR5OiAwO1xufVxuXG4uY2RrLWRyYWctYW5pbWF0aW5nIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDI1MG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xufVxuXG4uZXhhbXBsZS1ib3g6bGFzdC1jaGlsZCB7XG4gIGJvcmRlcjogbm9uZTtcbn1cblxuLmV4YW1wbGUtbGlzdC5jZGstZHJvcC1saXN0LWRyYWdnaW5nIC5leGFtcGxlLWJveDpub3QoLmNkay1kcmFnLXBsYWNlaG9sZGVyKSB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcbn0iXX0= */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-root',
          templateUrl: './app.component.html',
          styleUrls: ['./app.component.scss']
        }]
      }], function () {
        return [{
          type: _api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]
        }, {
          type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_1__["NzContextMenuService"]
        }];
      }, {
        nzTree: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
          args: ['tree']
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: AppModule */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/_@angular_platform-browser@9.1.7@@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/_@angular_core@9.1.7@@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app-routing.module */
    "./src/app/app-routing.module.ts");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/_@angular_forms@9.1.7@@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/_@angular_common@9.1.7@@angular/common/__ivy_ngcc__/fesm2015/http.js");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/_@angular_platform-browser@9.1.7@@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
    /* harmony import */


    var ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ng-zorro-antd/i18n */
    "./node_modules/_ng-zorro-antd@9.1.2@ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-i18n.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/_@angular_common@9.1.7@@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _angular_common_locales_zh__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/common/locales/zh */
    "./node_modules/_@angular_common@9.1.7@@angular/common/locales/zh.js");
    /* harmony import */


    var _angular_common_locales_zh__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_zh__WEBPACK_IMPORTED_MODULE_9__);
    /* harmony import */


    var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ng-zorro-antd */
    "./node_modules/_ng-zorro-antd@9.1.2@ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd.js");
    /* harmony import */


    var _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @ant-design/icons-angular/icons */
    "./node_modules/_@ant-design_icons-angular@9.0.1@@ant-design/icons-angular/__ivy_ngcc__/fesm2015/ant-design-icons-angular-icons.js");
    /* harmony import */


    var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @angular/cdk/drag-drop */
    "./node_modules/_@angular_cdk@9.2.3@@angular/cdk/__ivy_ngcc__/fesm2015/drag-drop.js");

    var icons = [_ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_11__["AccountBookFill"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_11__["SnippetsOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_11__["FileOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_11__["FolderOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_11__["FolderOpenOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_11__["AlertOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_11__["AlertFill"]];
    Object(_angular_common__WEBPACK_IMPORTED_MODULE_8__["registerLocaleData"])(_angular_common_locales_zh__WEBPACK_IMPORTED_MODULE_9___default.a);

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      factory: function AppModule_Factory(t) {
        return new (t || AppModule)();
      },
      providers: [{
        provide: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_7__["NZ_I18N"],
        useValue: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_7__["zh_CN"]
      }],
      imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_12__["DragDropModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzTreeModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzGridModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzDropDownModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzIconModule"].forRoot(icons), ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzCardModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzLayoutModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzModalModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzEmptyModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzInputModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzListModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_12__["DragDropModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzTreeModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzGridModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzDropDownModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzIconModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzCardModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzLayoutModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzModalModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzEmptyModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzInputModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzListModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_12__["DragDropModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzTreeModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzGridModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzDropDownModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzIconModule"].forRoot(icons), ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzCardModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzLayoutModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzModalModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzEmptyModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzInputModule"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_10__["NzListModule"]],
          providers: [{
            provide: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_7__["NZ_I18N"],
            useValue: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_7__["zh_CN"]
          }],
          bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    }); // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.


    var environment = {
      production: false
    };
    /*
     * For easier debugging in development mode, you can import the following file
     * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
     *
     * This import should be commented out in production mode because it will have a negative impact
     * on performance if an error is thrown.
     */
    // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/_@angular_core@9.1.7@@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/_@angular_platform-browser@9.1.7@@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }

    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
      return console.error(err);
    });
    /***/

  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! J:\public\src\main.ts */
    "./src/main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map