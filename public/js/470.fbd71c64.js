"use strict";(self["webpackChunkp"]=self["webpackChunkp"]||[]).push([[470],{2470:function(t,e,i){i.r(e),i.d(e,{default:function(){return f}});var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"goodsEdit"},[e("div",{staticClass:"bgbox"},[e("div",{staticClass:"topHead"},[e("div",{staticClass:"title_l",on:{click:t.toBlack}},[e("i",{staticClass:"el-icon-arrow-left"}),t._v(" 返回列表 ")])]),e("div",{staticClass:"formBox"},[e("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px","label-position":"left"}},[e("el-form-item",{attrs:{label:"服务名称"}},[e("el-input",{staticStyle:{width:"300px"},attrs:{disabled:t.tag,placeholder:"请输入服务名称"},model:{value:t.form.makingName,callback:function(e){t.$set(t.form,"makingName",e)},expression:"form.makingName"}})],1),e("el-form-item",{attrs:{label:"平台是否显示"}},[e("el-switch",{attrs:{disabled:t.tag},model:{value:t.form.clientShow,callback:function(e){t.$set(t.form,"clientShow",e)},expression:"form.clientShow"}}),e("span",{staticClass:"shelfStatusTxt"},[t._v(t._s(t.form.clientShow?"上架":"下架"))])],1),e("el-form-item",{attrs:{label:"家政图"}},[e("div",{staticClass:"flex"},[t.form.img?e("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.form.img,alt:""}}):t._e(),t.tag?t._e():e("el-upload",{attrs:{"show-file-list":!1,action:"http://localhost:3000/posts","list-type":"picture-card","on-success":t.handlePictureCardPreview,"on-remove":t.handleRemove}},[e("i",{staticClass:"el-icon-plus"})])],1)]),e("el-form-item",{attrs:{label:"联系电话"}},[e("el-input",{staticStyle:{width:"300px"},attrs:{disabled:t.tag,placeholder:"联系电话"},model:{value:t.form.mobile,callback:function(e){t.$set(t.form,"mobile",e)},expression:"form.mobile"}})],1),e("el-form-item",{attrs:{label:"工作时间"}},[e("div",[e("div",{staticClass:"addBtn"},[t._v(" 可预约工作时间段 ")]),e("div",{staticClass:"instreBox"},[e("div",{staticClass:"title"},[t._v("价格：")]),e("el-input",{staticStyle:{width:"100px"},model:{value:t.workTimeList.price,callback:function(e){t.$set(t.workTimeList,"price",e)},expression:"workTimeList.price"}}),t._v(" 元/小时 ")],1),e("div",{staticClass:"instreBox"},[e("span",[t._v("选择时间：")]),e("el-time-select",{staticStyle:{width:"100px"},attrs:{placeholder:"开始时间","picker-options":{start:"06:00",step:"01:00",end:"23:00"}},model:{value:t.workTimeList.workeStartTime,callback:function(e){t.$set(t.workTimeList,"workeStartTime",e)},expression:"workTimeList.workeStartTime"}}),t._v(" -- "),e("el-time-select",{staticStyle:{width:"100px"},attrs:{placeholder:"结束时间","picker-options":{start:"06:00",step:"01:00",end:"21:00",minTime:t.workTimeList.workeStartTime}},model:{value:t.workTimeList.workeEndTime,callback:function(e){t.$set(t.workTimeList,"workeEndTime",e)},expression:"workTimeList.workeEndTime"}})],1)])]),e("el-form-item",{attrs:{label:"参与员工"}},[e("div",{staticClass:"flex-box"},[t.form.participants&&t.form.participants.length>0?t._l(t.form.participants,(function(i,s){return e("div",{key:s},[e("div",{staticClass:"addBox"},[e("img",{attrs:{src:i.avatar,alt:""}})]),e("div",{staticClass:"mmda"},[t._v(" "+t._s(i.user_name)+" ")]),e("div",{staticClass:"mmda rd",on:{click:t.cleanSelect}},[t._v("清除选择")])])})):t._e(),"look"!=this.$route.query.tag?e("div",[e("div",{staticClass:"addBox",on:{click:function(e){t.dialogTableVisible=!0}}},[e("i",{staticClass:"el-icon-plus"})]),t.form.participants?e("div",{staticClass:"mmda"},[t._v(" "+t._s(t.form.participants.user_name)+" ")]):t._e()]):t._e()],2)])],1)],1),"look"!=this.$route.query.tag?e("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v(t._s(this.$route.params.id?"编辑商品":"发布商品"))]):t._e()],1),e("userSelectDialog",{attrs:{dialogTitle:"选择家政绑定会员"},on:{closeDialog:t.closeUserDialog,childSelect:t.childSelect},model:{value:t.dialogTableVisible,callback:function(e){t.dialogTableVisible=e},expression:"dialogTableVisible"}})],1)},a=[],l=(i(4114),function(){var t=this,e=t._self._c;return e("div",{staticClass:"userSelectDialog"},[e("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogTableVisible},on:{close:t.closeDialog,"update:visible":function(e){t.dialogTableVisible=e}}},[e("div",{staticClass:"dialogBox"},[e("div",{staticClass:"top"},[e("el-input",{attrs:{placeholder:"请输入会员昵称"},model:{value:t.inputVal,callback:function(e){t.inputVal=e},expression:"inputVal"}}),e("el-button",{on:{click:t.toSearch}},[t._v("搜索")])],1),t._l(t.listData,(function(i,s){return e("div",{key:s,staticClass:"lis"},[e("div",{staticClass:"lis_left"},[e("img",{attrs:{src:i.avatar,alt:""}}),e("div",{staticClass:"name"},[t._v(t._s(i.user_name))]),e("div",[t._v("ID:"+t._s(i.id))])]),e("div",{staticClass:"lis_right",on:{click:function(e){return t.tapSelect(i)}}},[t._v("选择")])])}))],2)])],1)}),o=[],r={model:{prop:"dialogTableVisible",event:"onEmit"},props:{dialogTitle:{type:String,default:"标题"},dialogTableVisible:{type:Boolean,default:!1}},data(){return{inputVal:"",listData:[]}},methods:{tapSelect(t){this.$emit("childSelect",t),console.log(t._id)},closeDialog(){this.$emit("closeDialog",!1),this.listData=[],this.inputVal=""},toSearch(){$http.post("apitest/FindAdmin",{keyword:this.inputVal},"获取中").then((t=>{1==t.result&&(this.listData=t.data)})).catch((t=>{console.log(t)}))}}},c=r,n=i(845),m=(0,n.A)(c,l,o,!1,null,"fc03f5e6",null),d=m.exports,p={data(){return{form:{},dialogVisible:!1,tag:!1,workTimeList:{workeStartTime:"",workeEndTime:"",price:""},pickerOptions:{format:"HH:mm",start:"00:00",step:"00:15",end:"23:30"},dialogTableVisible:!1,binduser:[]}},activated(){this.$route.params.id&&this.getData(),this.$route.query&&(this.tag="look"==this.$route.query.tag)},methods:{cleanSelect(){this.binduser="",this.form.participants=""},childSelect(t){this.form.participants=this.form.participants.concat(t);let e=this.form.participants,i=e.filter(((t,i,s)=>{var a=[];return e.forEach(((t,e)=>{a.push(t.id)})),a.indexOf(t.id)===i}));this.form.participants=i,this.dialogTableVisible=!1},closeUserDialog(){this.dialogTableVisible=!1},getData(){$http.post("apitest/homeMaking_list",{hmuid:this.$route.params.id},"获取中").then((t=>{let e=t.data.data[0];this.form=e,this.workTimeList=e.work})).catch((t=>{console.log(t)}))},quillBlur(t){console.log(t),this.form.conten=t,console.log(this.form)},handlePictureCardPreview(t){this.$set(this.form,"img",t.data),this.form.avatar=t.data},toBlack(){this.$router.push({name:"homework"})},async onSubmit(){if(this.tag)return void this.$message.error("查看商品不可编辑");if(!this.workTimeList.workeStartTime)return void this.$message.error("请选择开始时间");if(!this.workTimeList.workeEndTime)return void this.$message.error("请选择结束时间");if(!this.workTimeList.price)return void this.$message.error("请填写每小时价格");let t=await this.checkTime(this.workTimeList);if(!t)return;let e={};e=this.form,this.$route.params.id&&(e.hmuid=this.$route.params.id),e.workTime=this.workTimeList,console.log(e,t),$http.post(this.$route.params.id?"apitest/updateWorkStatus":"apitest/homeMakingAddUser",e,"获取中").then((t=>{t.result?(this.visitorData=t.data,this.$message.success("成功"),this.$router.replace({name:"homework"})):this.$message.error(t.msg)})).catch((t=>{console.log(t)}))},handleRemove(t){console.log(t)},checkTime(t){return new Promise(((e,i)=>{const s=new Date(`1970-01-01T${t.workeStartTime}`),a=new Date(`1970-01-01T${t.workeEndTime}`),l=a.getTime()-s.getTime(),o=l/36e5;o>=4?e(!0):(this.$message.error("设置每天工作时间不能小于4小时"),e(!1))}))}},components:{userSelectDialog:d}},h=p,u=(0,n.A)(h,s,a,!1,null,"18295843",null),f=u.exports}}]);
//# sourceMappingURL=470.fbd71c64.js.map