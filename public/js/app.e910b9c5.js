(function(){var t={9224:function(t,e,s){"use strict";s(109);var o,i,a=s(4093),l=(s(7322),s(6631)),r=(s(110),s(8030)),n=(s(2443),s(9864)),c=(s(836),s(6811)),d=(s(5825),s(9858)),u=(s(3089),s(4398)),m=(s(7505),s(2594)),h=(s(3412),s(7740)),p=(s(3772),s(2778)),f=(s(2679),s(9054)),g=(s(5816),s(9387)),v=(s(7622),s(9538)),b=(s(8984),s(797)),_=(s(6720),s(334)),w=(s(1581),s(1648)),k=(s(2763),s(5094)),C=(s(159),s(9978)),x=(s(3429),s(953)),y=(s(323),s(1698)),S=(s(3446),s(4861)),$=(s(1e3),s(6338)),T=(s(7396),s(8253)),Z=(s(9905),s(5348)),D=(s(9491),s(6450)),L=(s(2121),s(4202)),P=(s(7133),s(4820)),I=(s(9031),s(6790)),E=(s(4399),s(5947)),B=(s(3938),s(6606)),O=(s(6743),s(8848)),q=(s(9571),s(4958)),V=(s(9692),s(8e3)),U=(s(4735),s(6471)),j=(s(5465),s(6940)),M=(s(6871),s(1765)),A=(s(391),s(9057)),H=(s(9385),s(166)),N=(s(4825),s(7165)),z=(s(6562),s(4159)),G=(s(700),s(5389)),R=(s(2912),s(4273)),F=(s(4346),s(4329)),W=(s(8778),s(5910)),J=(s(6735),s(4319)),Q=(s(6791),s(4269)),K=(s(4439),s(3462)),X=(s(8260),s(2488)),Y=(s(9061),s(2075)),tt=(s(7944),s(5650)),et=(s(4672),s(7590)),st=(s(7180),s(3262)),ot=(s(7152),s(7304)),it=(s(4774),s(4898)),at=(s(7840),s(6542)),lt=(s(6273),s(705)),rt=(s(5041),s(4814)),nt=(s(6386),s(5951)),ct=(s(8504),s(3414)),dt=(s(139),s(9294)),ut=(s(8867),s(2133)),mt=(s(2526),s(2201)),ht=(s(1325),s(3062)),pt=(s(2680),s(8889)),ft=(s(431),s(1745)),gt=(s(5061),s(1943)),vt=(s(1049),s(140)),bt=(s(1640),s(4734)),_t=s(7754),wt=s.n(_t),kt=s(6369),Ct=function(){var t=this,e=t._self._c;return e("div",{class:[t.$route.meta.isPC?"pcStyle_bg":"pcStyle_bg_none"],attrs:{id:"app"}},[t.$route.meta.isPC?["login"!=t.$route.name?e("div",{staticStyle:{width:"100%",height:"100vh",display:"flex","flex-direction":"column"}},[e("div",{class:[t.$route.meta.isPC?"pcStyle":""]},[e("leftNav",{staticStyle:{"flex-shrink":"0"}}),e("div",{staticClass:"flex_d_c",staticStyle:{flex:"1"}},[e("topNav"),e("keep-alive",[e("router-view",{staticStyle:{flex:"1",overflow:"hidden"}})],1)],1)],1)]):t._e(),"login"==t.$route.name?e("div",{staticClass:"loginPage"},[e("keep-alive",[e("router-view")],1)],1):t._e()]:[e("div",{staticStyle:{width:"375px",margin:"0 auto"}},[e("keep-alive",[e("router-view")],1)],1)]],2)},xt=[],yt=function(){var t=this;t._self._c;return t._m(0)},St=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"pcNav"},[e("div",{staticClass:"pcNavTab"},[e("div",{staticClass:"homePage"}),e("div",{staticClass:"right"},[e("div",{staticClass:"right_box"},[e("i",{staticClass:"iconfont icon-denglu"}),t._v(" 退出登录 ")])])])])}],$t={props:{msg:String}},Tt=$t,Zt=s(1001),Dt=(0,Zt.Z)(Tt,yt,St,!1,null,"d3618ba4",null),Lt=Dt.exports,Pt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"pccNav"},[t._m(0),e("div",{staticClass:"pccNavTab"},[e("el-row",{staticClass:"tac"},[e("el-col",[e("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":t.inds,"background-color":"#545c64","text-color":"#fff"}},[t._l(t.routearr,(function(s,o){return[s.meta.nav?e("el-menu-item",{key:o,attrs:{index:String(o)},on:{click:function(e){return t.tapMenu(e,s.name)}}},[e("span",{staticStyle:{"font-size":"1rem"},attrs:{slot:"title"},slot:"title"},[t._v(t._s(s.meta.title))])]):t._e()]}))],2)],1)],1)],1)])},It=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"logo"},[e("img",{attrs:{src:s(3348),alt:""}})])}],Et=(s(7658),{data(){return{routearr:[],inds:""}},mounted(){this.routearr=this.$router.options.routes;let t=this.routearr.filter((t=>"/"!=t.path&&"/login"!=t.path)),e="";this.routearr=t,this.routearr.forEach(((t,s)=>{t.name==this.$route.name&&0!=t.nav&&(e=s)})),"/"==this.$route.path&&(e=0),this.inds=String(e)},watch:{$route(t,e){let s;this.routearr.forEach(((e,o)=>{e.name==t.name&&(s=o)})),this.inds=String(s)}},methods:{tapMenu(t,e){this.$router.push({path:`/${e}`})},handleOpen(t,e){console.log(t,e)},handleClose(t,e){console.log(t,e)}}}),Bt=Et,Ot=(0,Zt.Z)(Bt,Pt,It,!1,null,"2d0cd6bb",null),qt=Ot.exports,Vt={data(){return{routeNow:""}},components:{topNav:Lt,leftNav:qt},mounted(){},watch:{$route(t,e){t.meta.title&&(document.title=t.meta.title),this.routeNow=t.name}},methods:{}},Ut=Vt,jt=(0,Zt.Z)(Ut,Ct,xt,!1,null,null,null),Mt=jt.exports,At=s(2631),Ht={},Nt=(0,Zt.Z)(Ht,o,i,!1,null,null,null),zt=(Nt.exports,function(){var t=this,e=t._self._c;return e("div",{staticClass:"pcHome"},[e("div",{staticClass:"viewBox"},[e("el-col",{attrs:{xs:4,sm:6,md:8,lg:9,xl:11}},[e("visitor",{attrs:{visitorData:t.visitorData}})],1),e("el-col",{attrs:{xs:4,sm:6,md:8,lg:9,xl:11}})],1)])}),Gt=[],Rt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"visitor"},[e("div",{staticClass:"title"},[t._v("最近访客")]),e("div",{staticClass:"list"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.visitorData}},[e("el-table-column",{attrs:{prop:"userId",label:"会员id",width:"120"}}),e("el-table-column",{attrs:{label:"姓名",width:"140"},scopedSlots:t._u([{key:"default",fn:function(s){return e("div",{staticClass:"userBox"},[e("img",{attrs:{src:s.row.memberUser.avatar,alt:""}}),e("span",[t._v(t._s(s.row.memberUser.user_name))])])}}])}),e("el-table-column",{attrs:{prop:"timestamp",label:"访问时间"}}),e("el-table-column",{attrs:{prop:"userAgent",label:"访问客户端"}})],1)],1)])},Ft=[],Wt={props:{visitorData:{type:Array,default:[]}},data(){return{}}},Jt=Wt,Qt=(0,Zt.Z)(Jt,Rt,Ft,!1,null,"0d3f262e",null),Kt=Qt.exports,Xt={data(){return{visitorData:[]}},components:{visitor:Kt},activated(){this.getData(),this.getVisitor()},methods:{tapurl(){console.log("dasdasd"),this.$router.replace("Login")},getData(){$http.post("checkLoginUser",{},"获取中").then((t=>{console.log(t)})).catch((t=>{console.log(t)}))},getVisitor(){$http.get("apitest/get_userAccess",{},"获取中").then((t=>{this.visitorData=t.data})).catch((t=>{console.log(t)}))}}},Yt=Xt,te=(0,Zt.Z)(Yt,zt,Gt,!1,null,"14a9c65f",null),ee=te.exports,se=function(){var t=this,e=t._self._c;return e("div",{staticClass:"loginPage"},[e("div",{staticClass:"login-container"},[t._m(0),e("div",{staticClass:"contenbox"},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:16}},[e("div",{staticClass:"grid-content"},[e("img",{attrs:{src:s(5917),alt:""}})])]),e("el-col",{attrs:{span:8}},[e("div",{staticClass:"bg-purple"},[e("div",{staticClass:"txt"},[t._v("登录后台")]),e("el-input",{staticStyle:{"margin-bottom":"15px"},attrs:{placeholder:"账号"},model:{value:t.user,callback:function(e){t.user=e},expression:"user"}},[e("i",{staticClass:"el-input__icon el-icon-user",attrs:{slot:"prefix"},slot:"prefix"})]),e("el-input",{attrs:{placeholder:"密码",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}},[e("i",{staticClass:"el-input__icon el-icon-more",attrs:{slot:"prefix"},slot:"prefix"})]),e("div",{staticClass:"btn",on:{click:t.loginMethod}},[t._v("登录")])],1)])],1)],1)])])},oe=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"login-container-con"},[e("div",{staticClass:"login-container-con_left"},[e("img",{attrs:{src:s(3348),alt:""}}),e("div",{staticClass:"span"},[t._v("乐善里后台")])])])}],ie={data(){return{user:"",password:""}},activated(){},methods:{loginMethod(){$http.post("login",{user_name:this.user,password:this.password},"获取中").then((t=>{1==t.result?(window.localStorage.setItem("refereesToken",t.data.token),this.$router.push("pcHome")):this.$message.success(t.msg)})).catch((t=>{console.log(t)}))}}},ae=ie,le=(0,Zt.Z)(ae,se,oe,!1,null,"5ffa1394",null),re=le.exports,ne=function(){var t=this,e=t._self._c;return e("div",{staticClass:"goodsBox"},[e("div",{staticClass:"btnAdd",on:{click:t.toAddGood}},[t._v("添加商品")]),e("div",{staticClass:"searchBox"},[e("div",{staticClass:"dline"},[e("el-input",{attrs:{placeholder:"请输入商品名称/商品ID"},model:{value:t.goodname,callback:function(e){t.goodname=e},expression:"goodname"}})],1),e("div",{staticClass:"btn"},[t._v("搜索")])]),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"cell-style":{"text-align":"center"},"header-cell-style":{"text-align":"center"}}},[e("el-table-column",{attrs:{prop:"id",label:"ID",width:"60"}}),e("el-table-column",{attrs:{prop:"title",label:"标题",width:"300"}}),e("el-table-column",{attrs:{prop:"goodimg",label:"封面",width:"300"},scopedSlots:t._u([{key:"default",fn:function(t){return[e("img",{staticClass:"imageS",attrs:{src:t.row.goodimg,alt:""}})]}}])}),e("el-table-column",{attrs:{prop:"course_price",label:"价格",width:"300"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("span",[t._v(t._s(s.row.course_price)+"元")])]}}])}),e("el-table-column",{attrs:{prop:"goodStatus",label:"商品类型",width:"300"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("span",[t._v(t._s(1==s.row.goodStatus?"普通商品":"预约商品"))])]}}])}),e("el-table-column",{attrs:{prop:"shelfStatus",label:"是否上架",width:"300"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("el-switch",{on:{change:function(e){return t.updateOne(s.row)}},model:{value:s.row.shelfStatus,callback:function(e){t.$set(s.row,"shelfStatus",e)},expression:"scope.row.shelfStatus"}})]}}])}),e("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("div",[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.handleClick(s.row)}}},[t._v("编辑")])],1),e("div",[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.delGood(s.row)}}},[t._v("删除商品")])],1),e("div",[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.handleClick(s.row,"read")}}},[t._v("查看商品")])],1)]}}])})],1)],1)},ce=[],de={data(){return{goodname:"",tableData:[],total:0}},activated(){this.getData()},methods:{delGood(t){$http.get("courseDelete",{goods_id:t.id},"获取中").then((t=>{this.$message.success(t.msg),this.getData()})).catch((t=>{console.log(t)}))},handleClick(t,e=""){console.log(t,e),e?this.$router.push({path:`/goodsEdit/${t.id}`,query:{tag:"look"}}):this.$router.push({path:`/goodsEdit/${t.id}`})},updateOne(t){console.log(t);let e={id:t.id,form:{shelfStatus:t.shelfStatus?1:2}};$http.post("courseList_updateOne",e,"获取中").then((t=>{this.$message.success(t.msg)})).catch((t=>{console.log(t)}))},toAddGood(){this.$router.replace({name:"goodsEdit"})},getData(){$http.post("courseList",{},"获取中").then((t=>{console.log(t.data),this.tableData=t.data.list,this.total=t.data.total})).catch((t=>{console.log(t)}))}}},ue=de,me=(0,Zt.Z)(ue,ne,ce,!1,null,"ef33d2b4",null),he=me.exports,pe=function(){var t=this,e=t._self._c;return e("div",{staticClass:"goodsEdit"},[e("div",{staticClass:"bgbox"},[e("div",{staticClass:"topHead"},[e("div",{staticClass:"title_l",on:{click:t.toBlack}},[e("i",{staticClass:"el-icon-arrow-left"}),t._v(" 返回列表 ")]),e("div",{staticClass:"title"},[t._v("添加商品")])]),e("div",{staticClass:"formBox"},[e("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px","label-position":"left"}},[e("el-form-item",{attrs:{label:"商品标题"}},[e("el-input",{staticStyle:{width:"300px"},attrs:{disabled:t.tag,placeholder:"请输入商品标题"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),e("el-form-item",{attrs:{label:"商品价格"}},[e("el-input",{staticStyle:{width:"300px"},attrs:{disabled:t.tag,placeholder:"请输入商品价格"},model:{value:t.form.course_price,callback:function(e){t.$set(t.form,"course_price",e)},expression:"form.course_price"}})],1),e("el-form-item",{attrs:{label:"商品是否上架"}},[e("el-switch",{attrs:{disabled:t.tag},model:{value:t.form.shelfStatus,callback:function(e){t.$set(t.form,"shelfStatus",e)},expression:"form.shelfStatus"}}),e("span",{staticClass:"shelfStatusTxt"},[t._v(t._s(t.form.shelfStatus?"上架":"下架"))])],1),e("el-form-item",{attrs:{label:"商品图片"}},[e("div",{staticClass:"flex"},[t.form.goodimg&&this.$route.params.id?e("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.form.goodimg,alt:""}}):t._e(),t.tag?t._e():e("el-upload",{attrs:{"show-file-list":!1,action:"http://localhost:3000/posts","list-type":"picture-card","on-success":t.handlePictureCardPreview,"on-remove":t.handleRemove}},[e("i",{staticClass:"el-icon-plus"})])],1)]),e("el-form-item",{attrs:{label:"商品类型"}},[e("el-radio-group",{model:{value:t.form.goodStatus,callback:function(e){t.$set(t.form,"goodStatus",e)},expression:"form.goodStatus"}},[e("el-radio",{attrs:{label:"1",disabled:t.tag}},[t._v("普通商品")]),e("el-radio",{attrs:{label:"2",disabled:t.tag}},[t._v("预约商品")])],1)],1),e("el-form-item",{attrs:{label:"商品库存"}},[e("el-input",{staticStyle:{width:"300px"},attrs:{disabled:t.tag,placeholder:"请输入商品库存"},model:{value:t.form.inventory,callback:function(e){t.$set(t.form,"inventory",e)},expression:"form.inventory"}})],1),e("el-form-item",{attrs:{label:"商品详情"}},[e("quillEditor",{attrs:{contenInfo:t.form.conten,disabled:t.tag},on:{quillBlur:t.quillBlur}})],1)],1)],1),"look"!=this.$route.query.tag?e("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v(t._s(this.$route.params.id?"编辑商品":"发布商品"))]):t._e()],1)])},fe=[],ge=function(){var t=this,e=t._self._c;return e("div",{staticClass:"quillEditor"},[e("el-upload",{staticStyle:{display:"none"},attrs:{action:"http://localhost:3000/posts","list-type":"picture-card","on-success":t.handlePictureCardPreview,"on-remove":t.handleRemove}},[e("i",{staticClass:"el-icon-plus quilleditor_img"})]),e("quill-editor",{ref:"myTextEditor",attrs:{options:t.editorOption},on:{change:t.onEditorChange},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)},ve=[],be=s(4237),_e=s.n(be),we=s(932);be.Quill.register("modules/imageDrop",we.c);var ke={components:{quillEditor:be.quillEditor},data(){return{content:"",editorOption:null}},methods:{onEditorChange({editor:t,html:e,text:s}){this.$emit("quillBlur",e)},handlePictureCardPreview(t){let e=this.$refs.myTextEditor.quill,s=e.getSelection().index;console.log(t),e.insertEmbed(s,"image",t.data),e.setSelection(s+1)},handleRemove(){}},created(){const t=[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["image","video"]];this.editorOption={theme:"snow",placeholder:"请输入正文",modules:{imageDrop:!0,toolbar:{container:t,handlers:{image:function(t){t?document.querySelector(".quilleditor_img").click():this.quill.format("image",!1)}}}}}}},Ce=ke,xe=(0,Zt.Z)(Ce,ge,ve,!1,null,"375c1ec8",null),ye=xe.exports,Se={data(){return{form:{title:"",course_price:"",conten:"",shelfStatus:!1,goodimg:"",inventory:"",goodStatus:"2",creatUser:1},dialogVisible:!1,tag:!1}},components:{quillEditor:ye},activated(){this.$route.params.id&&this.getData(),this.$route.query&&(this.tag="look"==this.$route.query.tag),console.log(this.$route.query)},methods:{getData(){$http.post("courseList",{id:this.$route.params.id},"获取中").then((t=>{console.log(t.data);let e=t.data.list[0];this.form.title=e.title,this.form.course_price=Number(e.course_price),this.form.conten=e.conten,this.form.shelfStatus=e.shelfStatus,this.form.goodimg=e.goodimg,this.form.inventory=e.inventory,this.form.goodStatus=e.goodStatus})).catch((t=>{console.log(t)}))},quillBlur(t){console.log(t),this.form.conten=t,console.log(this.form)},handlePictureCardPreview(t){this.form.goodimg=t.data,console.log(this.form.goodimg,"goodimg")},toBlack(){this.$router.push({name:"goods"})},onSubmit(){if(this.tag)return void this.$message.success("查看商品不可编辑");let t={form:this.form};this.$route.params.id&&(t.id=this.$route.params.id),$http.post(this.$route.params.id?"courseList_updateOne":"courseIndex",t,"获取中").then((t=>{this.visitorData=t.data,this.$message.success("成功"),this.$router.replace({name:"goods"})})).catch((t=>{console.log(t)}))},handleRemove(t){console.log(t)}}},$e=Se,Te=(0,Zt.Z)($e,pe,fe,!1,null,"341287b1",null),Ze=Te.exports,De=function(){var t=this,e=t._self._c;return e("div",{staticClass:"indexHome"},[e("div",{staticClass:"title_node"},[t._v("商品:")]),t._l(t.courseList,(function(s){return e("div",{key:s.id,staticClass:"list",on:{click:function(e){return t.toDetail(s.id)}}},[e("div",{staticClass:"list_img"},[s.goodimg?e("img",{attrs:{src:s.goodimg,alt:""}}):t._e()]),e("div",{staticClass:"list_r"},[e("div",{staticClass:"list_r_t"},[t._v(t._s(s.title))]),e("div",{staticClass:"list_price"},[t._v("￥"+t._s(s.course_price))]),e("div",{staticClass:"list_status"},[t._v(t._s(1==s.goodStatus?"自营":"预约商品"))])])])}))],2)},Le=[],Pe={data(){return{courseList:[]}},methods:{toDetail(t){this.$router.push({name:"goodDetail",params:{id:t}})},onClickLeft(){this.$route.go(-1)},getData(){$http.post("courseList",{},"获取中").then((t=>{this.courseList=t.data.list})).catch((t=>{console.log(t)}))}},activated(){this.getData()}},Ie=Pe,Ee=(0,Zt.Z)(Ie,De,Le,!1,null,"7bddc5e9",null),Be=Ee.exports,Oe=function(){var t=this,e=t._self._c;return e("div",{staticClass:"goodDetail"},[e("van-nav-bar",{attrs:{title:t.courseList.title?t.courseList.title:"详情","left-arrow":""},on:{"click-left":t.onClickLeft}}),e("div",{staticClass:"imgbox"},[e("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:3e3,"indicator-color":"white"}},[e("van-swipe-item",{staticStyle:{width:"375px"}},[e("img",{attrs:{src:t.courseList.goodimg,alt:""}})])],1)],1),e("div",{staticClass:"detailBox"},[e("div",{staticClass:"title"},[t._v(t._s(t.courseList.title))]),e("div",{staticClass:"price_invertory"},[e("div",{staticClass:"price"},[t._v("￥"+t._s(t.courseList.course_price))]),e("div",{staticClass:"inventory"},[t._v("名额："+t._s(t.courseList.inventory))])]),e("div",{staticClass:"btn"},[2==t.courseList.goodStatus?e("van-button",{attrs:{type:"primary",round:""},on:{click:t.signTap}},[t._v("预约到店")]):t._e(),1==t.courseList.goodStatus?e("van-button",{attrs:{type:"primary",round:""}},[t._v("联系商家")]):t._e()],1)]),e("div",{staticClass:"contenBox"},[e("div",{staticClass:"contenBox_title"},[t._v("商品详情")]),e("div",{attrs:{id:"contenBox_h"},domProps:{innerHTML:t._s(t.courseList.conten)}})]),e("van-popup",{style:{height:"45%"},attrs:{position:"bottom"},model:{value:t.showDateTime,callback:function(e){t.showDateTime=e},expression:"showDateTime"}},[e("van-datetime-picker",{attrs:{type:"date",title:"选择年月","min-date":t.minDate,"max-date":t.maxDate,formatter:t.formatter},on:{confirm:function(e){t.showDateTime=!1}},model:{value:t.currentDate,callback:function(e){t.currentDate=e},expression:"currentDate"}})],1)],1)},qe=[],Ve={data(){return{courseList:[],showDateTime:!1,minDate:new Date,maxDate:new Date(2025,10,1),currentDate:new Date}},activated(){this.getData(),document.title="详情"},methods:{formatter(t,e){return"year"===t?`${e}年`:"month"===t?`${e}月`:e},onClickLeft(){this.$router.go(-1)},signTap(){this.showDateTime=!0},getData(){$http.post("courseList",{id:this.$route.params.id},"获取中").then((t=>{this.courseList=t.data.list,console.log(this.courseList)})).catch((t=>{console.log(t)}))}}},Ue=Ve,je=(0,Zt.Z)(Ue,Oe,qe,!1,null,"d27b7080",null),Me=je.exports,Ae=function(){var t=this,e=t._self._c;return e("div",{staticClass:"goodsBox"},[e("div",{staticClass:"btnAdd",on:{click:t.toAddGood}},[t._v("添加家政人员")]),e("div",{staticClass:"searchBox"},[e("div",{staticClass:"dline"},[e("el-input",{attrs:{placeholder:"搜索家政人员昵称/员工ID"},model:{value:t.goodname,callback:function(e){t.goodname=e},expression:"goodname"}})],1),e("div",{staticClass:"btn"},[t._v("搜索")])]),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"cell-style":{"text-align":"center"},"header-cell-style":{"text-align":"center"}}},[e("el-table-column",{attrs:{prop:"hmuid",label:"员工ID",width:"80"}}),e("el-table-column",{attrs:{prop:"realname",label:"昵称",width:"100"}}),e("el-table-column",{attrs:{prop:"workTime",label:"价格/小时"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("div",{staticClass:"price"},[t._v(t._s(s.row.workTime.price)+"/元")]),e("div",{staticClass:"price"},[t._v("上班时间 "+t._s(s.row.workTime.workeStartTime)+"-"+t._s(s.row.workTime.workeEndTime))])]}}])}),e("el-table-column",{attrs:{prop:"avatar",label:"封面"},scopedSlots:t._u([{key:"default",fn:function(t){return[e("img",{staticClass:"imageS",attrs:{src:t.row.avatar,alt:""}})]}}])}),e("el-table-column",{attrs:{prop:"mobile",label:"联系电话",width:"150"}}),e("el-table-column",{attrs:{prop:"creatUid.user_name",label:"推荐人",width:"150"}}),e("el-table-column",{attrs:{prop:"clientShow",label:"平台是否显示",width:"200"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("el-switch",{on:{change:function(e){return t.updateOne(s.row)}},model:{value:s.row.clientShow,callback:function(e){t.$set(s.row,"clientShow",e)},expression:"scope.row.clientShow"}})]}}])}),e("el-table-column",{attrs:{fixed:"right",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("div",[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.handleClick(s.row)}}},[t._v("编辑资料")])],1),e("div",[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.delGood(s.row)}}},[t._v("删除")])],1),e("div",[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){return t.handleClick(s.row,"read")}}},[t._v("查看资料")])],1)]}}])})],1)],1)},He=[],Ne={data(){return{goodname:"",tableData:[],total:0}},activated(){this.getData()},methods:{delGood(t){$http.post("apitest/homeMakingDeleteUser",{hmuid:t.hmuid},"获取中").then((t=>{this.$message.success(t.msg),this.getData()})).catch((t=>{console.log(t)}))},handleClick(t,e=""){console.log(t,e),e?this.$router.push({path:`/homeworkEdit/${t.hmuid}`,query:{tag:"look"}}):this.$router.push({path:`/homeworkEdit/${t.hmuid}`})},updateOne(t){let e={hmuid:t.hmuid,clientShow:t.clientShow};$http.post("/apitest/updateWorkStatus",e,"获取中").then((t=>{this.$message.success(t.msg)})).catch((t=>{console.log(t)}))},toAddGood(){this.$router.replace({name:"homeworkEdit"})},getData(){$http.post("apitest/homeMaking_list",{},"获取中").then((t=>{console.log(t.data),this.tableData=t.data,this.total=t.data.length})).catch((t=>{console.log(t)}))}}},ze=Ne,Ge=(0,Zt.Z)(ze,Ae,He,!1,null,"3e55c640",null),Re=Ge.exports,Fe=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home"},[e("div",{staticClass:"list"},t._l(t.goodsinfo,(function(s,o){return e("div",{key:o,staticClass:"lis"},[e("img",{attrs:{src:s.goodimg,alt:""}}),e("div",{staticClass:"title"},[t._v(t._s(s.title))]),e("div",{staticClass:"price"},[t._v("￥"+t._s(s.course_price))])])})),0)])},We=[],Je={data(){return{goodsinfo:[]}},activated(){this.getData()},methods:{checkRouter(){return console.log(this.$route),"homeM"!=this.$route.name},onClickLeft(){},getData(){$http.post("courseList",{},"获取中").then((t=>{console.log(t.data),this.goodsinfo=t.data.list})).catch((t=>{console.log(t)}))}}},Qe=Je,Ke=(0,Zt.Z)(Qe,Fe,We,!1,null,"31751661",null),Xe=Ke.exports,Ye=function(){var t=this,e=t._self._c;return e("div",{staticClass:"goodsEdit"},[e("div",{staticClass:"bgbox"},[e("div",{staticClass:"topHead"},[e("div",{staticClass:"title_l",on:{click:t.toBlack}},[e("i",{staticClass:"el-icon-arrow-left"}),t._v(" 返回列表 ")]),e("div",{staticClass:"title"},[t._v("添加商品")])]),e("div",{staticClass:"formBox"},[e("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px","label-position":"left"}},[e("el-form-item",{attrs:{label:"家政人员名称"}},[e("el-input",{staticStyle:{width:"300px"},attrs:{disabled:t.tag,placeholder:"请输入家政人员名称"},model:{value:t.form.realname,callback:function(e){t.$set(t.form,"realname",e)},expression:"form.realname"}})],1),e("el-form-item",{attrs:{label:"平台是否显示"}},[e("el-switch",{attrs:{disabled:t.tag},model:{value:t.form.clientShow,callback:function(e){t.$set(t.form,"clientShow",e)},expression:"form.clientShow"}}),e("span",{staticClass:"shelfStatusTxt"},[t._v(t._s(t.form.clientShow?"上架":"下架"))])],1),e("el-form-item",{attrs:{label:"家政人员照片"}},[e("div",{staticClass:"flex"},[t.form.avatar?e("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.form.avatar,alt:""}}):t._e(),t.tag?t._e():e("el-upload",{attrs:{"show-file-list":!1,action:"http://localhost:3000/posts","list-type":"picture-card","on-success":t.handlePictureCardPreview,"on-remove":t.handleRemove}},[e("i",{staticClass:"el-icon-plus"})])],1)]),e("el-form-item",{attrs:{label:"联系电话"}},[e("el-input",{staticStyle:{width:"300px"},attrs:{disabled:t.tag,placeholder:"联系电话"},model:{value:t.form.mobile,callback:function(e){t.$set(t.form,"mobile",e)},expression:"form.mobile"}})],1),e("el-form-item",{attrs:{label:"工作时间"}},[e("div",[e("div",{staticClass:"addBtn"},[t._v(" 可预约工作时间段 ")]),e("div",{staticClass:"instreBox"},[e("div",{staticClass:"title"},[t._v("价格：")]),e("el-input",{model:{value:t.workTimeList.price,callback:function(e){t.$set(t.workTimeList,"price",e)},expression:"workTimeList.price"}}),t._v(" /小时 ")],1),e("div",{staticClass:"instreBox"},[e("span",[t._v("选择时间：")]),e("el-time-select",{attrs:{placeholder:"开始时间","picker-options":{start:"06:00",step:"00:15",end:"23:00"}},model:{value:t.workTimeList.workeStartTime,callback:function(e){t.$set(t.workTimeList,"workeStartTime",e)},expression:"workTimeList.workeStartTime"}}),t._v(" -- "),e("el-time-select",{attrs:{placeholder:"结束时间","picker-options":{start:"06:00",step:"00:15",end:"21:00",minTime:t.workTimeList.workeStartTime}},model:{value:t.workTimeList.workeEndTime,callback:function(e){t.$set(t.workTimeList,"workeEndTime",e)},expression:"workTimeList.workeEndTime"}})],1)])]),e("el-form-item",{attrs:{label:"绑定会员"}},[e("div",{staticClass:"addBox",on:{click:function(e){t.dialogTableVisible=!0}}},[t.form.bindUid?e("img",{attrs:{src:t.binduser.avatar,alt:""}}):e("i",{staticClass:"el-icon-plus"})]),t.form.bindUid?e("div",{staticClass:"mmda"},[t._v(t._s(t.binduser.user_name))]):t._e(),t.form.bindUid&&"look"!=this.$route.query.tag?e("div",{staticClass:"mmda rd",on:{click:t.cleanSelect}},[t._v("清除选择")]):t._e()])],1)],1),"look"!=this.$route.query.tag?e("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v(t._s(this.$route.params.id?"编辑商品":"发布商品"))]):t._e()],1),e("userSelectDialog",{attrs:{dialogTitle:"选择家政绑定会员"},on:{closeDialog:t.closeUserDialog,childSelect:t.childSelect},model:{value:t.dialogTableVisible,callback:function(e){t.dialogTableVisible=e},expression:"dialogTableVisible"}})],1)},ts=[],es=function(){var t=this,e=t._self._c;return e("div",{staticClass:"userSelectDialog"},[e("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogTableVisible},on:{close:t.closeDialog,"update:visible":function(e){t.dialogTableVisible=e}}},[e("div",{staticClass:"dialogBox"},[e("div",{staticClass:"top"},[e("el-input",{attrs:{placeholder:"请输入会员昵称"},model:{value:t.inputVal,callback:function(e){t.inputVal=e},expression:"inputVal"}}),e("el-button",{on:{click:t.toSearch}},[t._v("搜索")])],1),t._l(t.listData,(function(s,o){return e("div",{key:o,staticClass:"lis"},[e("div",{staticClass:"lis_left"},[e("img",{attrs:{src:s.avatar,alt:""}}),e("div",{staticClass:"name"},[t._v(t._s(s.user_name))]),e("div",[t._v("ID:"+t._s(s.id))])]),e("div",{staticClass:"lis_right",on:{click:function(e){return t.tapSelect(s)}}},[t._v("选择")])])}))],2)])],1)},ss=[],os={model:{prop:"dialogTableVisible",event:"onEmit"},props:{dialogTitle:{type:String,default:"标题"},dialogTableVisible:{type:Boolean,default:!1}},data(){return{inputVal:"",listData:[]}},methods:{tapSelect(t){this.$emit("childSelect",t),console.log(t._id)},closeDialog(){this.$emit("closeDialog",!1),this.listData=[],this.inputVal=""},toSearch(){$http.post("apitest/FindAdmin",{keyword:this.inputVal},"获取中").then((t=>{1==t.result&&(this.listData=t.data)})).catch((t=>{console.log(t)}))}}},is=os,as=(0,Zt.Z)(is,es,ss,!1,null,"fc03f5e6",null),ls=as.exports,rs={data(){return{form:{},dialogVisible:!1,tag:!1,workTimeList:{workeStartTime:"",workeEndTime:"",price:""},pickerOptions:{format:"HH:mm",start:"00:00",step:"00:15",end:"23:30"},dialogTableVisible:!1,binduser:[]}},activated(){this.$route.params.id&&this.getData(),this.$route.query&&(this.tag="look"==this.$route.query.tag)},methods:{cleanSelect(){this.binduser="",this.form.bindUid=""},childSelect(t){this.binduser=t,this.form.bindUid=t._id,this.dialogTableVisible=!1},closeUserDialog(){this.dialogTableVisible=!1},getData(){$http.post("apitest/homeMaking_list",{hmuid:this.$route.params.id},"获取中").then((t=>{let e=t.data;this.form=e,this.workTimeList=e.workTime,t.data.bindUid&&(console.log(t.data.bindUid),this.binduser=t.data.bindUid,this.form.bindUid=t.data.bindUid.id,console.log(this.binduser,this.form))})).catch((t=>{console.log(t)}))},quillBlur(t){console.log(t),this.form.conten=t,console.log(this.form)},handlePictureCardPreview(t){this.$set(this.form,"avatar",t.data),this.form.avatar=t.data},toBlack(){this.$router.push({name:"homework"})},async onSubmit(){if(this.tag)return void this.$message.error("查看商品不可编辑");if(!this.workTimeList.workeStartTime)return void this.$message.error("请选择开始时间");if(!this.workTimeList.workeEndTime)return void this.$message.error("请选择结束时间");if(!this.workTimeList.price)return void this.$message.error("请填写每小时价格");let t=await this.checkTime(this.workTimeList);if(!t)return;let e={};e=this.form,this.$route.params.id&&(e.hmuid=this.$route.params.id),e.workTime=this.workTimeList,console.log(e,this.form,t),$http.post(this.$route.params.id?"apitest/updateWorkStatus":"apitest/homeMakingAddUser",e,"获取中").then((t=>{this.visitorData=t.data,this.$message.success("成功"),this.$router.replace({name:"homework"})})).catch((t=>{console.log(t)}))},handleRemove(t){console.log(t)},checkTime(t){return new Promise(((e,s)=>{const o=new Date(`1970-01-01T${t.workeStartTime}`),i=new Date(`1970-01-01T${t.workeEndTime}`),a=i.getTime()-o.getTime(),l=a/36e5;l>=4?e(!0):(this.$message.error("设置每天工作时间不能小于4小时"),e(!1))}))}},components:{userSelectDialog:ls}},ns=rs,cs=(0,Zt.Z)(ns,Ye,ts,!1,null,"6558c726",null),ds=cs.exports,us=function(){var t=this,e=t._self._c;return e("div",{staticClass:"OrderPage"},[e("div",{staticClass:"searchBox"},[e("div",{staticClass:"searchInp"},[e("div",{staticClass:"txt"},[t._v("搜索关联商品")]),e("el-input",{attrs:{placeholder:"输入商品id"},model:{value:t.goodsId,callback:function(e){t.goodsId=e},expression:"goodsId"}})],1),e("div",{staticClass:"searchInp"},[e("div",{staticClass:"txt"},[t._v("搜索订单")]),e("el-input",{attrs:{placeholder:"输入商品id"},model:{value:t.orderId,callback:function(e){t.orderId=e},expression:"orderId"}})],1),e("div",{staticClass:"searchInp"},[e("div",{staticClass:"txt"},[t._v("会员")]),e("el-input",{attrs:{placeholder:"输入会员id"},model:{value:t.userId,callback:function(e){t.userId=e},expression:"userId"}})],1),e("div",{staticClass:"searchInp",staticStyle:{"max-width":"400px"}},[e("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}})],1),e("el-button",{attrs:{type:"primary"},on:{click:t.searchTap}},[t._v("搜索")])],1),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,"cell-style":{"text-align":"center"},"header-cell-style":{"text-align":"center"}}},[e("el-table-column",{attrs:{prop:"orderId",label:"订单id",width:"200"}}),e("el-table-column",{attrs:{prop:"avatar",label:"订单详情",width:"350"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("div",{staticClass:"goodBox"},[e("img",{staticClass:"imageS",attrs:{src:s.row.goodImg,alt:""}}),e("div",{staticClass:"goodBox_detail"},[e("span",[t._v(t._s(s.row.goodTitle))]),e("span",[t._v("ID:"+t._s(s.row.goodsId))]),e("span",[t._v(t._s("course"==s.row.orderType?"预约商品":"家政服务"))])])])]}}])}),e("el-table-column",{attrs:{prop:"orderSn",label:"订单流水号",width:"200"}}),e("el-table-column",{attrs:{prop:"create_time",label:"创建时间",width:"300"}}),e("el-table-column",{attrs:{prop:"course_price",label:"订单金额",width:"200"}}),e("el-table-column",{attrs:{prop:"status",label:"订单状态",width:"200"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("div",{staticClass:"statusBox"},[t._v(" "+t._s(0==s.row.status?"下单成功":"已完成")+" ")])]}}])}),e("el-table-column",{attrs:{prop:"numberId",label:"下单会员",width:"200"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("div",{staticClass:"userBox"},[e("span",[t._v("昵称："+t._s(s.row.numberId.user_name))]),e("span",[t._v("ID: "+t._s(s.row.numberId.id))]),e("span",[t._v("手机: "+t._s(s.row.numberId.mobile))])])]}}])})],1)],1)},ms=[],hs={data(){return{list:[],goodsId:"",value1:[new Date(2e3,10,10,10,10),new Date],userId:"",orderId:""}},activated(){this.getData()},methods:{searchTap(){let t={goodsId:this.goodsId,userId:this.userId,orderId:this.orderId,create_time:this.value1};console.log(t)},getData(){$http.post("orderCountList",{},"获取中").then((t=>{console.log(t),this.list=t.data})).catch((t=>{console.log(t)}))}}},ps=hs,fs=(0,Zt.Z)(ps,us,ms,!1,null,"2c08a638",null),gs=fs.exports,vs=[{path:"/homeM",component:Xe,name:"homeM",meta:{title:"首页",foot:!1,isPC:!1}},{path:"/homeworkEdit/:id?",name:"homeworkEdit",component:ds,meta:{title:"家政人员资料",isPC:!0,nav:!1}},{path:"/OrderPage",name:"OrderPage",component:gs,meta:{title:"订单",isPC:!0,nav:!0}}];kt["default"].use(At.Z);const bs=[{path:"/",name:"",component:ee,meta:{title:"首页",isPC:!0}},{path:"/pcHome",name:"pcHome",component:ee,meta:{title:"首页",isPC:!0,nav:!0}},{path:"/goods",name:"goods",component:he,meta:{title:"商品",isPC:!0,nav:!0}},{path:"/homework",name:"homework",component:Re,meta:{title:"家政业务",isPC:!0,nav:!0}},{path:"/goodsEdit/:id",name:"goodsEdit",component:Ze,meta:{title:"商品",isPC:!0,nav:!1}},{path:"/login",name:"login",component:re,meta:{title:"登录",isPC:!0}},{path:"/indexHome",name:"indexHome",component:Be,meta:{title:"首页",isPC:!1}},{path:"/goodDetail/:id",name:"goodDetail",component:Me,meta:{title:"详情",isPC:!1}}].concat(vs),_s=new At.Z({routes:bs});_s.afterEach(((t,e)=>{}));var ws=_s,ks=s(3822);kt["default"].use(ks.ZP);var Cs=new ks.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{}}),xs=s(6216),ys=s.n(xs);window.$http=ys(),kt["default"].config.productionTip=!1,kt["default"].use(_e()),kt["default"].use(wt()),kt["default"].use(a.Z).use(l.Z).use(r.Z).use(n.Z).use(c.Z).use(d.Z).use(u.Z).use(m.Z).use(h.Z).use(p.Z).use(f.Z).use(g.Z).use(v.Z).use(b.Z).use(_.Z).use(w.Z).use(k.Z).use(C.Z).use(x.Z).use(y.Z).use(S.Z).use($.Z).use(T.Z).use(Z.Z).use(D.Z).use(L.Z).use(P.Z).use(I.Z).use(E.Z).use(B.Z).use(O.Z).use(q.Z).use(V.Z).use(U.Z).use(j.Z).use(M.Z).use(A.Z).use(H.Z).use(N.Z).use(z.Z).use(G.Z).use(R.Z).use(F.Z).use(W.Z).use(J.Z).use(Q.Z).use(K.Z).use(X.Z).use(Y.Z).use(tt.Z).use(et.Z).use(st.Z).use(ot.Z).use(it.Z).use(at.Z).use(lt.Z).use(rt.Z).use(nt.Z).use(ct.Z).use(dt.Z).use(ut.Z).use(mt.Z).use(ht.Z).use(pt.Z).use(ft.Z).use(gt.Z).use(vt.Z).use(bt.Z),new kt["default"]({router:ws,store:Cs,render:t=>t(Mt)}).$mount("#app")},6216:function(t,e,s){s(7658),t.exports={get(t,e,s){let o=localStorage.getItem("refereesToken");if(!t)return void console.log("输入url为空");if(t="/"+t,t+="?min=pc",console.log(t),e){let s=[];Object.keys(e).forEach((t=>s.push(t+"="+e[t]))),t+="&"+s.join("&")}let i={"Content-Type":"application/json",Authorization:"Bearer "+o};return new Promise((function(e,s){fetch(t,{method:"GET",headers:i,credentials:"include"}).then((t=>{if(t.ok)return t.json();s({status:t.status})})).then((t=>("请登录"==t.msg&&0==t.result&&(console.log("dddddddddddddlogin",`${window.location.href}login`),window.location.href=`${window.location.href}login`),t))).then((t=>{console.log(t),e(t)})).catch((t=>{console.log(t,"网络请求，无响应！")}))}))},post(t,e,s,o,i){if(!t)return void console.log("输入url为空");let a=localStorage.getItem("refereesToken");t="/"+t,t+="?min=pc";let l={"Content-Type":"application/json",Authorization:"Bearer "+a};return new Promise(((s,o)=>{fetch(t,{method:"POST",headers:l,body:JSON.stringify(e),credentials:"include"}).then((t=>{if(t.ok)return t.json();o({status:t.status})})).then((t=>("请登录"!=t.msg&&"未登录"!=t.msg||0!=t.result||(window.location.href=`${window.location.protocol}/#/login`),t))).then((t=>{s(t)}))}))}}},5917:function(t,e,s){"use strict";t.exports=s.p+"img/bg.25d2f3fb.jpg"},3348:function(t,e,s){"use strict";t.exports=s.p+"img/logo.673008b9.jpeg"}},e={};function s(o){var i=e[o];if(void 0!==i)return i.exports;var a=e[o]={exports:{}};return t[o].call(a.exports,a,a.exports,s),a.exports}s.m=t,function(){var t=[];s.O=function(e,o,i,a){if(!o){var l=1/0;for(d=0;d<t.length;d++){o=t[d][0],i=t[d][1],a=t[d][2];for(var r=!0,n=0;n<o.length;n++)(!1&a||l>=a)&&Object.keys(s.O).every((function(t){return s.O[t](o[n])}))?o.splice(n--,1):(r=!1,a<l&&(l=a));if(r){t.splice(d--,1);var c=i();void 0!==c&&(e=c)}}return e}a=a||0;for(var d=t.length;d>0&&t[d-1][2]>a;d--)t[d]=t[d-1];t[d]=[o,i,a]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var o in e)s.o(e,o)&&!s.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){s.p="/"}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,o){var i,a,l=o[0],r=o[1],n=o[2],c=0;if(l.some((function(e){return 0!==t[e]}))){for(i in r)s.o(r,i)&&(s.m[i]=r[i]);if(n)var d=n(s)}for(e&&e(o);c<l.length;c++)a=l[c],s.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return s.O(d)},o=self["webpackChunkp"]=self["webpackChunkp"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=s.O(void 0,[998],(function(){return s(9224)}));o=s.O(o)})();
//# sourceMappingURL=app.e910b9c5.js.map