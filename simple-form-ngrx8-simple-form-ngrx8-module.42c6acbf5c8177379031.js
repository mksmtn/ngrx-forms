(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{WHZV:function(t,e,n){"use strict";n.r(e),n.d(e,"SimpleFormNgrx8Module",function(){return O});var o=n("ofXK"),i=n("tyNb"),r=n("l7P3"),b=n("atpF"),a=n("quTh"),l=n("PCNd"),c=n("IzEk"),s=n("lJxs");const m=Object(r.o)("simpleFormNgrx8/SET_SUBMITTED_VALUE",Object(r.s)()),d=Object(b.A)("simpleFormNgrx8",{firstName:"",lastName:"",email:"",sex:"",favoriteColor:"",employed:!1,notes:""}),u=Object(r.p)({formState:d,submittedValue:void 0},Object(b.F)(),Object(r.r)(m,(t,{submittedValue:e})=>Object.assign(Object.assign({},t),{submittedValue:e})));function p(t,e){return u(t,e)}var f=n("fXoL"),g=n("zrVV"),S=n("AVnP");function x(t,e){if(1&t&&(f.Sb(0,"div"),f.zc(1," The form was submitted with the following value: "),f.Ob(2,"br"),f.Sb(3,"pre"),f.zc(4),f.ec(5,"json"),f.ec(6,"async"),f.Rb(),f.Rb()),2&t){const t=f.dc(2);f.Cb(4),f.Ac(f.fc(5,1,f.fc(6,3,t.submittedValue$)))}}function C(t,e){if(1&t){const t=f.Tb();f.Sb(0,"ngf-form-example",1),f.zc(1," This example shows a basic form without any extras using action creators and simple reducers as available in ngrx 8 and above. "),f.Ob(2,"br"),f.Ob(3,"br"),f.Sb(4,"form",2),f.Zb("submit",function(){return f.pc(t),f.dc().submit()}),f.Sb(5,"div"),f.Sb(6,"label"),f.zc(7,"First Name"),f.Rb(),f.Sb(8,"div"),f.Ob(9,"input",3),f.Rb(),f.Rb(),f.Sb(10,"div"),f.Sb(11,"label"),f.zc(12,"Last Name"),f.Rb(),f.Sb(13,"div"),f.Ob(14,"input",4),f.Rb(),f.Rb(),f.Sb(15,"div"),f.Sb(16,"label"),f.zc(17,"Email"),f.Rb(),f.Sb(18,"div"),f.Ob(19,"input",5),f.Rb(),f.Rb(),f.Sb(20,"div"),f.Sb(21,"label"),f.zc(22,"Sex"),f.Rb(),f.Sb(23,"div"),f.Sb(24,"label"),f.Ob(25,"input",6),f.zc(26," Male "),f.Rb(),f.Sb(27,"label"),f.Ob(28,"input",7),f.zc(29," Female "),f.Rb(),f.Rb(),f.Rb(),f.Sb(30,"div"),f.Sb(31,"label"),f.zc(32,"Favorite Color"),f.Rb(),f.Sb(33,"div"),f.Sb(34,"select",8),f.Ob(35,"option",9),f.Sb(36,"option",10),f.zc(37,"Red"),f.Rb(),f.Sb(38,"option",11),f.zc(39,"Green"),f.Rb(),f.Sb(40,"option",12),f.zc(41,"Blue"),f.Rb(),f.Rb(),f.Rb(),f.Rb(),f.Sb(42,"div"),f.Sb(43,"label"),f.zc(44,"Employed"),f.Rb(),f.Sb(45,"div"),f.Ob(46,"input",13),f.Rb(),f.Rb(),f.Sb(47,"div"),f.Sb(48,"label"),f.zc(49,"Notes"),f.Rb(),f.Sb(50,"div"),f.Sb(51,"textarea",8),f.zc(52,"        "),f.Rb(),f.Rb(),f.Rb(),f.Sb(53,"div",14),f.Ob(54,"div"),f.Sb(55,"div"),f.Sb(56,"button",15),f.zc(57," Submit "),f.Rb(),f.Sb(58,"button",16),f.Zb("click",function(){return f.pc(t),f.dc().reset()}),f.zc(59," Reset "),f.Rb(),f.Rb(),f.Rb(),f.Rb(),f.Ob(60,"br"),f.yc(61,x,7,5,"div",17),f.Rb()}if(2&t){const t=e.ngIf;f.ic("formState",t),f.Cb(4),f.ic("ngrxFormState",t),f.Cb(5),f.ic("ngrxFormControlState",t.controls.firstName),f.Cb(5),f.ic("ngrxFormControlState",t.controls.lastName),f.Cb(5),f.ic("ngrxFormControlState",t.controls.email),f.Cb(6),f.ic("ngrxFormControlState",t.controls.sex),f.Cb(3),f.ic("ngrxFormControlState",t.controls.sex),f.Cb(6),f.ic("ngrxFormControlState",t.controls.favoriteColor),f.Cb(12),f.ic("ngrxFormControlState",t.controls.employed),f.Cb(5),f.ic("ngrxFormControlState",t.controls.notes),f.Cb(7),f.ic("disabled",t.isPristine&&t.isUntouched&&t.isUnsubmitted),f.Cb(3),f.ic("ngIf",t.isSubmitted)}}let v=(()=>{class t{constructor(t){this.store=t,this.formState$=t.pipe(Object(r.t)(t=>t.simpleFormNgrx8.formState)),this.submittedValue$=t.pipe(Object(r.t)(t=>t.simpleFormNgrx8.submittedValue))}reset(){this.store.dispatch(new b.w(d.id,d.value)),this.store.dispatch(new b.u(d.id))}submit(){this.formState$.pipe(Object(c.a)(1),Object(s.a)(t=>m({submittedValue:t.value}))).subscribe(this.store)}}return t.\u0275fac=function(e){return new(e||t)(f.Nb(r.h))},t.\u0275cmp=f.Hb({type:t,selectors:[["ngf-simple-form-ngrx8"]],decls:2,vars:3,consts:[["exampleName","Simple Form (ngrx 8+)","githubLinkOverride","simple-form-ngrx8",3,"formState",4,"ngIf"],["exampleName","Simple Form (ngrx 8+)","githubLinkOverride","simple-form-ngrx8",3,"formState"],[3,"ngrxFormState","submit"],["type","text","placeholder","First Name",3,"ngrxFormControlState"],["type","text","placeholder","Last Name",3,"ngrxFormControlState"],["type","email","placeholder","Email",3,"ngrxFormControlState"],["type","radio","value","male",3,"ngrxFormControlState"],["type","radio","value","female",3,"ngrxFormControlState"],[3,"ngrxFormControlState"],["value",""],["value","ff0000"],["value","00ff00"],["value","0000ff"],["type","checkbox",3,"ngrxFormControlState"],[1,"buttons"],["type","submit"],["type","button",3,"disabled","click"],[4,"ngIf"]],template:function(t,e){1&t&&(f.yc(0,C,62,12,"ngf-form-example",0),f.ec(1,"async")),2&t&&f.ic("ngIf",f.fc(1,1,e.formState$))},directives:[o.l,g.a,b.h,b.r,b.e,S.a,b.g,b.m,b.q,b.n,b.p,b.f,b.d],pipes:[o.b,o.f],styles:[".page[_ngcontent-%COMP%], [_nghost-%COMP%]{flex:1;height:100%;display:flex;align-items:flex-start;background-color:#ddd;overflow:auto}form[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(.buttons){display:flex;padding:5px}form[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(.buttons) > label[_ngcontent-%COMP%]{width:110px;float:right;display:flex;justify-content:flex-end;margin-right:10px;font-weight:700;line-height:21px}form[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(.buttons) > div[_ngcontent-%COMP%]{flex:1}form[_ngcontent-%COMP%] > .buttons[_ngcontent-%COMP%]{display:flex;padding:5px}form[_ngcontent-%COMP%] > .buttons[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{width:110px;margin-right:10px}form[_ngcontent-%COMP%] > .buttons[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){flex:1}"],changeDetection:0}),t})(),O=(()=>{class t{}return t.\u0275mod=f.Lb({type:t}),t.\u0275inj=f.Kb({factory:function(e){return new(e||t)},imports:[[o.c,a.a,b.i,l.a,i.i.forChild([{path:"",component:v}]),r.j.forFeature("simpleFormNgrx8",p)]]}),t})()}}]);