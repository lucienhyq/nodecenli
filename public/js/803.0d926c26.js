"use strict";(self["webpackChunkp"]=self["webpackChunkp"]||[]).push([[803],{2803:function(t,e,a){a.r(e),a.d(e,{default:function(){return c}});var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"OrderPage"},[e("div",{staticClass:"searchBox"},[e("div",{staticClass:"searchInp"},[e("div",{staticClass:"txt"},[t._v("搜索关联商品")]),e("el-input",{attrs:{placeholder:"输入商品id"},model:{value:t.goodsId,callback:function(e){t.goodsId=e},expression:"goodsId"}})],1),e("div",{staticClass:"searchInp"},[e("div",{staticClass:"txt"},[t._v("搜索订单")]),e("el-input",{attrs:{placeholder:"输入商品id"},model:{value:t.orderId,callback:function(e){t.orderId=e},expression:"orderId"}})],1),e("div",{staticClass:"searchInp"},[e("div",{staticClass:"txt"},[t._v("会员")]),e("el-input",{attrs:{placeholder:"输入会员id"},model:{value:t.userId,callback:function(e){t.userId=e},expression:"userId"}})],1),e("div",{staticClass:"searchInp",staticStyle:{"max-width":"400px"}},[e("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}})],1),e("el-button",{attrs:{type:"primary"},on:{click:t.searchTap}},[t._v("搜索")])],1),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,"cell-style":{"text-align":"center"},"header-cell-style":{"text-align":"center"}}},[e("el-table-column",{attrs:{prop:"orderId",label:"订单id",width:"200"}}),e("el-table-column",{attrs:{prop:"avatar",label:"订单详情",width:"350"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"goodBox"},[e("img",{staticClass:"imageS",attrs:{src:a.row.goodImg,alt:""}}),e("div",{staticClass:"goodBox_detail"},[e("span",[t._v(t._s(a.row.goodTitle))]),e("span",[t._v("ID:"+t._s(a.row.goodsId))]),e("span",[t._v(t._s("course"==a.row.orderType?"预约商品":"家政服务"))])])])]}}])}),e("el-table-column",{attrs:{prop:"orderSn",label:"订单流水号",width:"200"}}),e("el-table-column",{attrs:{prop:"create_time",label:"创建时间",width:"300"}}),e("el-table-column",{attrs:{prop:"course_price",label:"订单金额",width:"200"}}),e("el-table-column",{attrs:{prop:"status",label:"订单状态",width:"200"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"statusBox"},[t._v(" "+t._s(0==a.row.status?"下单成功":"已完成")+" ")])]}}])}),e("el-table-column",{attrs:{prop:"numberId",label:"下单会员",width:"200"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"userBox"},[e("span",[t._v("昵称："+t._s(a.row.numberId.user_name))]),e("span",[t._v("ID: "+t._s(a.row.numberId.id))]),e("span",[t._v("手机: "+t._s(a.row.numberId.mobile))])])]}}])})],1)],1)},l=[],r={data(){return{list:[],goodsId:"",value1:[new Date(2e3,10,10,10,10),new Date],userId:"",orderId:""}},activated(){this.getData()},methods:{searchTap(){let t={goodsId:this.goodsId,userId:this.userId,orderId:this.orderId,create_time:this.value1};console.log(t)},getData(){$http.post("orderCountList",{},"获取中").then((t=>{console.log(t),this.list=t.data})).catch((t=>{console.log(t)}))}}},o=r,d=a(845),i=(0,d.A)(o,s,l,!1,null,"2c08a638",null),c=i.exports}}]);
//# sourceMappingURL=803.0d926c26.js.map