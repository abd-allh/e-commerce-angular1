import{d as F,f as w,g as V,h as N,i as A}from"./chunk-XKB2QSQJ.js";import{k as R}from"./chunk-RXHZLUK3.js";import{$ as g,$b as r,Bb as L,Gb as i,Hb as t,Ib as a,Mb as E,Ob as f,Pb as c,Sb as k,Tb as M,Ua as I,Ya as m,Za as x,ac as D,bc as h,dd as T,ia as y,ja as C,jd as j,nb as b,ra as p,rb as P,sa as u,sb as O,vb as S}from"./chunk-ONLTLD5A.js";var z=()=>[T,F];function U(o,n){o&1&&(i(0,"section",0)(1,"div",1),a(2,"p-skeleton",2)(3,"p-skeleton",3),t(),a(4,"p-skeleton",4),i(5,"div",5)(6,"div",6),a(7,"p-skeleton",7),t(),i(8,"div",8)(9,"div",9)(10,"h3"),a(11,"p-skeleton",10),t(),i(12,"p"),a(13,"p-skeleton",11),t(),a(14,"p-skeleton",12),t(),i(15,"div")(16,"button",13),r(17,"-"),t(),i(18,"span"),r(19," ... "),t(),i(20,"button",13),r(21,"+"),t()()()(),i(22,"div",5)(23,"div",6),a(24,"p-skeleton",7),t(),i(25,"div",8)(26,"div",9)(27,"h3"),a(28,"p-skeleton",10),t(),i(29,"p"),a(30,"p-skeleton",11),t(),a(31,"p-skeleton",12),t(),i(32,"div")(33,"button",13),r(34,"-"),t(),i(35,"span"),r(36," ... "),t(),i(37,"button",13),r(38,"+"),t()()()(),i(39,"button",14),r(40," Online Payment "),a(41,"img",15),t()())}function W(o,n){if(o&1){let e=E();i(0,"div")(1,"div",5)(2,"div",6)(3,"div",21),a(4,"img",22),t()(),i(5,"div",8)(6,"div",9)(7,"h3",23),r(8),t(),i(9,"p",24),r(10),t(),i(11,"button",25),f("click",function(){let s=p(e).$implicit,d=c(2);return u(d.removeProductFromCart(s.product._id))}),a(12,"i",26),r(13," Remove "),t()(),i(14,"div")(15,"button",27),f("click",function(){let s=p(e).$implicit,d=c(2);return u(d.updateCount(s.product._id,s.count-1))}),r(16," -"),t(),i(17,"span"),r(18),t(),i(19,"button",27),f("click",function(){let s=p(e).$implicit,d=c(2);return u(d.updateCount(s.product._id,s.count+1))}),r(20," + "),t()()()()()}if(o&2){let e=n.$implicit;m(4),k("title",e.title),k("alt",e.title),S("src",e.product.imageCover,I),m(4),D(e.product.title),m(2),h("Price: ",e.price,""),m(8),h(" ",e.count," ")}}function Y(o,n){if(o&1){let e=E();i(0,"section",0)(1,"div",1)(2,"h1",16),r(3,"Shop Cart"),t(),i(4,"button",17),f("click",function(){p(e);let s=c();return u(s.clearCart())}),r(5," Clear Cart "),t()(),i(6,"p",18),r(7),t(),b(8,W,21,6,"div",19),i(9,"button",20),r(10," Online Payment "),a(11,"img",15),t()()}if(o&2){let e=c();m(7),h("Total Price: ",e.cart.totalCartPrice,""),m(),S("ngForOf",e.cart.products),m(),M("routerLink","/payment/",e.cartId,"")}}function q(o,n){o&1&&(i(0,"div",28)(1,"h1"),r(2,"Your Cart Is Empty"),t()())}var _=class o{constructor(n,e){this._cartService=n;this._authService=e}isLoading=!1;cart=[];cartId="";ngOnInit(){this.isLoading=!0,this._cartService.getCart().subscribe({next:n=>{this.isLoading=!1,console.log("getCart ",n),this.cart=n.data,this.cartId=n.cartId,console.log("cartId ",this.cartId)},error:n=>{this.isLoading=!1,console.log(n.error.message,"Err: ",n)}})}updateCount(n,e){e&&(this.isLoading=!0,this._cartService.updateCart(n,e).subscribe({next:l=>{this.isLoading=!1,console.log(l),this.cart=l.data},error:l=>{this.isLoading=!1,console.log(l.error.message,"Err: ",l)}}))}removeProductFromCart(n){this.isLoading=!0,this._cartService.removeProductFromCart(n).subscribe({next:e=>{this._authService.totalNumOfCartItems.next(e.numOfCartItems),this.isLoading=!1,console.log(e),this.cart=e.data},error:e=>{this.isLoading=!1,console.log(e.error.message,"Err: ",e)}})}clearCart(){window.confirm("Are you sure you want to clear the cart?")&&(this.isLoading=!0,this._cartService.clearCart().subscribe({next:e=>{this._authService.totalNumOfCartItems.next(e.numOfCartItems),this.isLoading=!1,console.log(e),this.cart=e.data},error:e=>{this.isLoading=!1,console.log(e.error.message,"Err: ",e)}}))}static \u0275fac=function(e){return new(e||o)(x(V),x(R))};static \u0275cmp=y({type:o,selectors:[["app-cart"]],decls:5,vars:2,consts:[[1,"w-75","mx-auto","rounded","shadow","bg-main-light","p-3","mb-3"],[1,"d-flex","justify-content-between","align-items-center"],["width","10rem","height","3rem","styleClass","mb-2 darker-skeleton"],["width","5rem","height","2rem","styleClass","redish-skeleton"],["width","7rem","height","1rem","styleClass","mb-2"],[1,"row","border-bottom","py-2"],[1,"col-md-1"],["width","5rem","height","7rem","styleClass",""],[1,"col-md-11","d-flex","justify-content-between","align-items-center"],[1,"flex-direction-column"],["width","7rem","height","1rem","styleClass","my-2 darker-skeleton"],["width","4rem","height","1rem","styleClass","mb-2"],["width","5rem","height","1rem","styleClass","mb-2 redish-skeleton"],[1,"btn","btn-sm","border-success","blur"],["tabindex","0",1,"main-btn","mt-3","blur"],["src","ProjectAssets/visa-rounded.svg","alt","visa logo"],[1,"h2"],[1,"btn","btn-sm","btn-outline-danger",3,"click"],[1,"text-main"],[4,"ngFor","ngForOf"],["tabindex","0",1,"main-btn","mt-3",3,"routerLink"],[1,"image"],[3,"src","title","alt"],[1,"h6"],[1,"text-main","small","mb-0"],[1,"btn","m-0","p-0","text-main","text-danger",3,"click"],[1,"fas","fa-trash-can"],[1,"btn","btn-sm","border-success",3,"click"],[1,"page-container","d-flex","justify-content-center","align-items-center"]],template:function(e,l){e&1&&(b(0,U,42,0,"section",0)(1,Y,12,4)(2,q,3,0),P(3,1,z,null,2)),e&2&&(L(l.isLoading?0:-1),m(3),O(l.cart.totalCartPrice))},dependencies:[N],styles:["section[_ngcontent-%COMP%]{background-color:var(--secondary-color);font-weight:lighter}h1[_ngcontent-%COMP%]{font-weight:400}.main-btn[_ngcontent-%COMP%]{padding:5px 10px;border-radius:5px;border:none;background-color:var(--main-color);color:#fff}.image[_ngcontent-%COMP%]{width:100%;height:100%}.image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:auto;width:100%;height:100%;object-fit:cover}"]})};var B=[{path:"",component:_}],v=class o{static \u0275fac=function(e){return new(e||o)};static \u0275mod=C({type:o});static \u0275inj=g({imports:[w.forChild(B),w]})};var $=class o{static \u0275fac=function(e){return new(e||o)};static \u0275mod=C({type:o});static \u0275inj=g({imports:[j,v,A]})};export{$ as CartModule};