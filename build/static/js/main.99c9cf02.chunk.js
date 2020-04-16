(this["webpackJsonpmatrix-app"]=this["webpackJsonpmatrix-app"]||[]).push([[0],{17:function(e,t,a){e.exports=a(32)},22:function(e,t,a){},23:function(e,t,a){},24:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),l=a(8),c=a.n(l),o=(a(22),a(9)),s=a(4),i=a(5),u=a(7),d=a(6),m=(a(23),a(24),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(s.a)(this,a);for(var r=arguments.length,n=new Array(r),l=0;l<r;l++)n[l]=arguments[l];return(e=t.call.apply(t,[this].concat(n))).state={name:"",title:"",value:""},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.setState({name:this.props.name,title:this.props.title})}},{key:"render",value:function(){var e=this.state,t=e.name,a=e.title,r=e.value;return n.a.createElement("div",{className:"c-form-group"},n.a.createElement("label",{className:"c-form-group__title",htmlFor:t},a),n.a.createElement("input",{type:"text",className:"c-form-group__field",id:t,name:t,value:r,onChange:this.props.onChange}))}}],[{key:"getDerivedStateFromProps",value:function(e){return{name:e.name,title:e.title,value:e.value}}}]),a}(r.Component)),v=a(1),h=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(s.a)(this,a);for(var r=arguments.length,n=new Array(r),l=0;l<r;l++)n[l]=arguments[l];return(e=t.call.apply(t,[this].concat(n))).state={columns:null,rows:null,spread:null,id:1,error:null},e.handleChange=function(t){e.setState(Object(o.a)({},t.target.id,t.target.value))},e.handleSubmit=function(t){t.preventDefault(),e.setState({id:e.state.id+1}),e.props.generateTable(e.state)},e}return Object(i.a)(a,[{key:"render",value:function(){return n.a.createElement("form",{className:"c-intake",onSubmit:this.handleSubmit},n.a.createElement("div",{className:"c-intake__title"},"Table parameters"),n.a.createElement("div",{className:"c-intake__box"},n.a.createElement("div",{className:"c-intake__col"},n.a.createElement(m,{name:"rows",title:"M (rows, max 15)",onChange:this.handleChange})),n.a.createElement("div",{className:"c-intake__col"},n.a.createElement(m,{name:"columns",title:"N (cols, max 15)",onChange:this.handleChange})),n.a.createElement("div",{className:"c-intake__col"},n.a.createElement(m,{name:"spread",title:"X (spread)",onChange:this.handleChange}))),this.state.error&&n.a.createElement("div",{className:"c-intake__error"},this.state.error),n.a.createElement("div",{className:"c-intake__btn-box"},n.a.createElement("button",{type:"submit",className:"c-btn c-intake__btn"},"Generate")))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{error:e.error}}}]),a}(r.Component),p=Object(v.b)((function(e){return{error:e.tableReducer.error}}),(function(e){return{generateTable:function(t){return e(function(e){return function(t){if(isNaN(e.columns)||!e.columns||isNaN(e.rows)||!e.rows||isNaN(e.spread)){t({type:"GENERATE_TABLE_ERROR",error:"Input values must be integers"})}else if(e.columns<=15&&e.rows<=15)t({type:"GENERATE_TABLE",payload:e});else{t({type:"GENERATE_TABLE_ERROR",error:"Cols and rows must be not more than 15"})}}}(t))}}}))(h),b=a(2),f=(a(31),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(s.a)(this,a);for(var r=arguments.length,n=new Array(r),l=0;l<r;l++)n[l]=arguments[l];return(e=t.call.apply(t,[this].concat(n))).handleSumHover=function(t){var a=t.currentTarget.parentElement.getAttribute("data-row");t.persist();var r={table:e.props.table,rowNum:a,eventType:t.type};e.props.hoverSum(r)},e.handleCellClick=function(t){var a=t.currentTarget.getAttribute("id"),r=t.currentTarget.parentElement.getAttribute("data-row");e.props.cellClick(a,r)},e.handleRemoveClick=function(t){var a=t.currentTarget.closest("[data-row]").getAttribute("data-row"),r=e.getIndex(a,e.props.table);e.props.removeClick(r)},e.handleCreateClick=function(){e.props.createClick()},e.handleCellHover=function(t){if("mouseenter"===t.type)for(var a=e.props,r=a.table,n=a.spread,l=t.currentTarget.getAttribute("id"),c=e.searchCell(l,r,"id").amount,o=e.getAllCellsValues(r),s=e.findClosestValues(c,n,o),i=s?s.length:0,u=0;u<i;u++){var d=e.searchCell(s[u],r,"amount").id;document.getElementById("".concat(d)).classList.add("c-table__cell--highlight")}else{var m=document.querySelectorAll(".c-table__cell--highlight");[].forEach.call(m,(function(e){e.classList.remove("c-table__cell--highlight")}))}},e}return Object(i.a)(a,[{key:"renderCells",value:function(e){for(var t=[],a=0,r=0;r<e.cells.length;r++)a+=e.cells[r].amount;for(var l=0;l<e.cells.length;l++){var c=Math.round(e.cells[l].amount/a*100),o={height:c+"%"};t[l]=n.a.createElement("div",{key:l,id:e.cells[l].id,className:"c-table__cell",onClick:this.handleCellClick,onMouseEnter:this.handleCellHover,onMouseLeave:this.handleCellHover},n.a.createElement("div",{className:"c-table__cell-val"},n.a.createElement("div",{className:"c-table__val-default"},e.cells[l].amount),n.a.createElement("div",{className:"c-table__val-aux"},c,"%")),n.a.createElement("div",{className:"c-table__bg",style:o}))}return t.push(n.a.createElement("div",{key:t.length+1,onMouseEnter:this.handleSumHover,onMouseLeave:this.handleSumHover,className:"c-table__cell c-table__cell--aux"},n.a.createElement("div",{className:"c-table__cell-val"},a),n.a.createElement("button",{className:"c-table__btn-remove",onClick:this.handleRemoveClick}))),t}},{key:"renderRows",value:function(){for(var e=[],t=this.props.table,a=0;a<t.length;a++){var r=t[a].id;e[a]=n.a.createElement("div",{key:a,"data-row":r,className:"c-table__row"+(t[a].sumIsHovered?"":" c-table__row--hide")},this.renderCells(t[a],a))}return e}},{key:"renderFooter",value:function(){for(var e=this.props.table,t=e[0].cells.map((function(t,a){return e.map((function(e){return e.cells[a]}))})),a=[],r=0;r<t.length;r++){var l=0;t[r].map((function(e){l+=e.amount}));var c=Math.round(l/t[r].length);a.push(c)}return n.a.createElement("div",{className:"c-table__row c-table__row--aux"},this.renderFooterCells(a))}},{key:"renderFooterCells",value:function(e){for(var t=[],a=0;a<e.length;a++)t[a]=n.a.createElement("div",{key:a,className:"c-table__cell c-table__cell--aux"},e[a]);return t}},{key:"getIndex",value:function(e,t){for(var a=0;a<t.length;a++){if(t[a].id.toString()===e)return a}return-1}},{key:"searchCell",value:function(e,t,a){if(!t)return null;for(var r=t[0].cells.length,n=0;n<t.length;n++)for(var l=0;l<r;l++)if(t[n].cells[l][a]===e)return t[n].cells[l]}},{key:"getAllCellsValues",value:function(e){for(var t=e[0].cells.length,a=[],r=0;r<e.length;r++)for(var n=0;n<t;n++)a.push(e[r].cells[n].amount);return a}},{key:"compareNumbers",value:function(e,t){return e>t?1:e===t?0:e<t?-1:void 0}},{key:"findClosestValues",value:function(e,t,a){for(var r=Object(b.a)(a.sort(this.compareNumbers)),n=[this.findClosestOne(e,r).closest],l=0;l<t;l++){var c=this.findClosestOne(e,r);r=c.array,n.push(c.closest)}return n}},{key:"findClosestOne",value:function(e,t){var a=t.reduce((function(t,a){return Math.abs(a-e)<Math.abs(t-e)?a:t})),r=t.indexOf(a),n=t.splice(r,1)[0];return{array:t,closest:n}}},{key:"render",value:function(){return n.a.createElement(n.a.Fragment,null,this.props.table.length?n.a.createElement("div",{className:"c-table"},n.a.createElement("div",{className:"c-table__in"},this.renderRows(),this.renderFooter()),n.a.createElement("button",{className:"c-table__btn-add",onClick:this.handleCreateClick})):"")}}]),a}(r.Component)),E=Object(v.b)((function(e){return{table:e.tableReducer.table,id:e.tableReducer.id,spread:e.tableReducer.spread}}),(function(e){return{hoverSum:function(t){return e(function(e){return function(t){t({type:"HOVER_SUM",payload:e})}}(t))},cellClick:function(t,a){return e(function(e,t){return function(a){a({type:"CELL_CLICK",cellId:e,rowNum:t})}}(t,a))},removeClick:function(t){return e(function(e){return function(t){t({type:"REMOVE_CLICK",rowIndex:e})}}(t))},createClick:function(){return e((function(e){e({type:"CREATE_CLICK"})}))}}}))(f);var _=Object(v.b)((function(e){return{table:e.tableReducer.table}}))((function(e){var t=e.table;return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"w-inner"},n.a.createElement("div",{className:"c-header"},n.a.createElement("div",{className:"w-center"},n.a.createElement("div",{className:"c-header__in"},n.a.createElement("div",{className:"c-header__logo"},"MatrixApp")))),n.a.createElement("div",{className:"w-center"},n.a.createElement("div",{className:"w-content"},n.a.createElement(p,null),t&&t.length&&n.a.createElement(E,null)))))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var g=a(13),C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GENERATE_TABLE":var a=t.payload,r=a.columns,n=a.rows,l=a.spread,c=a.id;if(e.id!==c){for(var o=[],s=0;s<n;s++){for(var i=[],u=0;u<r;u++){var d=Math.floor(100+900*Math.random()),m={id:""+s+u,amount:d};i.push(m)}var v={id:s,cells:i,sumIsHovered:!1};o.push(v)}return Object(g.a)({},e,{error:null,table:o,id:c,spread:l})}return;case"GENERATE_TABLE_ERROR":return Object(g.a)({},e,{error:t.error});case"HOVER_SUM":var h=t.payload,p=h.table,f=h.rowNum,E=h.eventType,_=e.id,C=e.spread,y=Object(b.a)(p);return y[f]&&(y[f].sumIsHovered="mouseenter"===E),{table:y,id:_,spread:C};case"CELL_CLICK":var N=t.cellId,k=t.rowNum,w=e.id,O=e.spread,R=Object(b.a)(e.table);return R[k].cells.map((function(e){e.id===N&&e.amount++})),{table:R,id:w,spread:O};case"REMOVE_CLICK":var j=t.rowIndex,A=e.id,T=e.spread,I=Object(b.a)(e.table);j>=0&&I.splice(j,1);for(var L=0;L<I.length;L++)I[L].id=L;return{table:I,id:A,spread:T};case"CREATE_CLICK":for(var M=e.id,x=e.spread,S=Object(b.a)(e.table).slice(-1),H=S[0].id,F=S[0].cells.length,B=H+1,V=Object(b.a)(e.table),G=[],K=0;K<F;K++){var D=Math.floor(100+900*Math.random()),J={id:""+B+K,amount:D};G.push(J)}var P={id:B,cells:G,sumIsHovered:!1};return V.push(P),{table:V,id:M,spread:x};default:return e}},y=a(3),N=Object(y.c)({tableReducer:C}),k=a(16),w=Object(y.d)(N,Object(y.a)(k.a));c.a.render(n.a.createElement(v.a,{store:w},n.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.99c9cf02.chunk.js.map