"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[892],{3136:function(e,r,s){s(2791);var n=s(1231),t=s(4414),i=s(4815),l=s(9982),a=s(5879),o=s(7335),c=s(4488),d=s(184);r.Z=function(e){var r=e.view,s=e.title,u=e.text,h=e.anchorText;return(0,d.jsxs)(n.K,{pt:20,sx:{alignItems:"center"},spacing:"xs",children:[(0,d.jsxs)(t.x,{children:[(0,d.jsxs)(i.D,{size:50,children:[s," to"]}),(0,d.jsx)(i.D,{size:35,weight:"normal",mt:"xs",children:"KeepTalking"}),(0,d.jsx)(l.x,{size:"lg",mt:"xl",children:u}),(0,d.jsxs)(l.x,{size:"lg",children:["You can"," ",(0,d.jsx)(a.e,{color:"red.9",href:"register"===r?"/login":"/register",children:h})]})]}),(0,d.jsx)(o.z,{smallerThan:"sm",styles:{display:"none"},children:(0,d.jsx)(c.E,{mt:"xl",src:"images/auth-ilustration.png",alt:"Girl chatting with her phone",fit:"contain",width:450,height:255,withPlaceholder:!0})})]})}},1892:function(e,r,s){s.r(r),s.d(r,{default:function(){return b}});var n=s(2791),t=s(4414),i=s(7335),l=s(5330),a=s(3136),o=s(1413),c=s(885),d=s(9982),u=s(1231),h=s(3304),x=s(847),g=s(5879),p=s(8296),f=s(7426),m=s(2178),j=s(3418),w=s(6975),v=s(3250),y=s(184),z=function(){var e=(0,n.useState)(!1),r=(0,c.Z)(e,2),s=r[0],i=r[1],l=(0,j.D)(w.ZP),a=(0,m.X)({key:"token"}),z=(0,c.Z)(a,2),b=(z[0],z[1]),k=(0,f.c)({initialValues:{email:"",password:""},validate:{email:function(e){return/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e)?null:"Invalid email"},password:function(e){return e.length>=6?null:"Password should include at least 6 characters"}}});return(0,y.jsx)(t.x,{sx:{width:369},children:(0,y.jsxs)("form",{onSubmit:k.onSubmit((function(e){return r=e,void l.mutate(r,{onSuccess:function(e){b(e.accessToken),location.href="/MainPage"},onError:function(){i(!0)}});var r})),children:[s&&(0,y.jsx)(d.x,{size:"md",color:"red",pb:"xs",children:"Your email or password is not correct"}),(0,y.jsxs)(u.K,{children:[(0,y.jsx)(h.o,{size:"lg",variant:"filled",styles:v.Bd,required:!0,placeholder:"Enter your email",value:k.values.email,onChange:function(e){i(!1),k.setFieldValue("email",e.currentTarget.value)},error:k.errors.email&&"Invalid email"}),(0,y.jsx)(x.W,{size:"lg",variant:"filled",styles:(0,o.Z)((0,o.Z)({},v.WU),v.Bd),required:!0,placeholder:"Enter your password",value:k.values.password,onChange:function(e){i(!1),k.setFieldValue("password",e.currentTarget.value)},error:k.errors.password&&"Password should include at least 6 characters"}),(0,y.jsx)(g.e,{color:"gray.5",size:"sm",sx:{textAlign:"right"},children:"Forgot password?"})]}),(0,y.jsx)(p.z,{mt:"xl",type:"submit",fullWidth:!0,loading:l.isLoading,color:"red.8",sx:{filter:"drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",height:50},children:"Login"})]})})},b=function(){return(0,y.jsx)(t.x,{px:"lg",pt:"12",pb:0,sx:{height:"100%"},children:(0,y.jsx)(i.z,{largerThan:"sm",styles:{gap:20},children:(0,y.jsxs)(l.Z,{p:20,align:"center",sx:{justifyContent:"space-around",height:"100%"},children:[(0,y.jsx)(a.Z,{view:"login",title:"Sign in",text:"If you don't have an account register",anchorText:"Register here!"}),(0,y.jsx)(z,{})]})})})}}}]);
//# sourceMappingURL=892.1e143c91.chunk.js.map