(this["webpackJsonproom-escape"]=this["webpackJsonproom-escape"]||[]).push([[0],{32:function(t,e,n){},44:function(t,e,n){},45:function(t,e,n){"use strict";n.r(e);var a=n(8),o=n.n(a),i=n(22),s=n.n(i),c=(n(32),n(19)),r=n(15),l=n(7),d=n(3),u=n(4),m=n(6),f=n(5),h=n(14),b=n(24),j=n.n(b),v=n(28),g=(n(42),n(11)),O=n(10),p=function(t){Object(m.a)(n,t);var e=Object(f.a)(n);function n(){var t;return Object(d.a)(this,n),(t=e.call(this)).dragStartHandler=function(e){t.setState(Object(l.a)(Object(l.a)({},t.state),{},{lastInvCoords:{x:e.target.attrs.x,y:e.target.attrs.y}}))},t.dragEndHandler=function(e,n){var a=t.refs[e.id].parent;t.refs[e.id].position(t.state.lastInvCoords),t.props.onDragEnd(e.interactions,n.evt.clientX,n.evt.clientY),a.draw()},t.renderInventorySlot=function(t,e){return Object(O.jsx)(h.e,{x:5+e%10*50,y:515+50*Math.floor(e/10),width:40,height:40,fill:"grey",shadowBlur:10,shadowOpacity:.4},e)},t.renderInventoryItem=function(e,n){return Object(O.jsx)(h.b,{ref:e.id,x:5+n%10*50,y:515+50*Math.floor(n/10),width:40,height:40,image:e.image,draggable:!0,onMouseDown:t.dragStartHandler,onDragEnd:t.dragEndHandler.bind(Object(g.a)(t),e),onClick:t.props.onClick.bind(Object(g.a)(t),e)},e.id)},t.state={lastInvCoords:{x:0,y:0}},t}return Object(u.a)(n,[{key:"render",value:function(){var t;return Object(O.jsxs)(h.c,{className:"inventoryLayer",children:[Object(O.jsx)(h.e,{x:0,y:510,width:500,height:50*Math.ceil(this.props.maxInventorySlots/10),fill:"dimgray",shadowBlur:10}),Object(r.a)(Array(parseInt(this.props.maxInventorySlots)).keys()).map(this.renderInventorySlot),null===(t=this.props.items)||void 0===t?void 0:t.map(this.renderInventoryItem)]})}}]),n}(a.Component),I=n(26),y=function(t){Object(m.a)(n,t);var e=Object(f.a)(n);function n(){var t;return Object(d.a)(this,n),(t=e.call(this))._clickHandler=function(e,n){t.props.onClick(t.state.items[e]),t.setState((function(t){return Object(l.a)(Object(l.a)({},t),{},{dotX:n.evt.pageX,dotY:n.evt.pageY})}))},t._hoverHandler=function(e){t.setState((function(t){return Object(l.a)(Object(l.a)({},t),{},{hoveredItem:e})}))},t._hoverEndHandler=function(e,n){t.setState((function(t){return Object(l.a)(Object(l.a)({},t),{},{hoveredItem:null})}))},t._mouseUpHandler=function(e,n){t.props.onMouseUp(e,n.evt.clientX,n.evt.clientY),t.setState(Object(l.a)(Object(l.a)({},t.state),{},{dotX:n.evt.clientX,dotY:n.evt.clientY}))},t.renderClickableItem=function(e){var n=t.state.items[e];if(n)return Object(O.jsx)(h.d,{points:n.position.points,x:n.position.offsetX,y:n.position.offsetY,opacity:t.state.hoveredItem===e?.2:0,fill:"orange",closed:!0,onClick:t._clickHandler.bind(Object(g.a)(t),e),onMouseover:t._hoverHandler.bind(Object(g.a)(t),e),onMouseleave:t._hoverEndHandler.bind(Object(g.a)(t),e),onMouseUp:t._mouseUpHandler.bind(Object(g.a)(t),e)},e)},t.state={dotX:-10,dotY:-10,hoveredItem:null,image:null,items:{}},t}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var t=this;I(this.props.config).then((function(t){return t.text()})).then((function(e){t.setState((function(t){return Object(l.a)(Object(l.a)({},t),{},{items:j.a.parse(e)})}))}));var e=new window.Image;e.src="images/".concat(this.props.bgImage),e.onload=function(){t.setState(Object(l.a)(Object(l.a)({},t.state),{},{image:e}))}}},{key:"render",value:function(){return this.state?Object(O.jsxs)(h.c,{className:"imgLayer",children:[Object(O.jsx)(h.b,{x:0,y:0,width:500,height:500,image:this.state.image}),Object(O.jsx)(h.a,{x:this.state.dotX,y:this.state.dotY,radius:"4",fill:"red"}),Object.keys(this.state.items).map(this.renderClickableItem)]}):null}}]),n}(a.Component),x=(n(44),n.p+"static/media/room1.ad859456.yaml"),k=n.p+"static/media/room2.c6fee66f.yaml",S=n.p+"static/media/items.1f0219ed.yaml",_=n(26),w=function(t){Object(m.a)(n,t);var e=Object(f.a)(n);function n(){var t;return Object(d.a)(this,n),(t=e.call(this))._handleLostItems=function(e){var n,a=null===(n=e.itemsLost)||void 0===n?void 0:n[0];if(!a)return!1;var o=t.state.inventoryItems.filter((function(t){return t.id!==a}));return t.setState(Object(l.a)(Object(l.a)({},t.state),{},{inventoryItems:o,usedItemIds:[].concat(Object(r.a)(t.state.usedItemIds),[a])})),!0},t._handleHiddenItems=function(e){if(!e.itemsGained)return!1;var n,a=!1,o=Object(c.a)(e.itemsGained);try{for(o.s();!(n=o.n()).done;){var i=n.value;!t.playerHasLooted(i)&&t.state.itemInfo[i]&&function(){a=!0;var e=t.state.itemInfo[i],n=new window.Image;n.src="images/".concat(e.id,".png"),n.onload=function(){t.setState(Object(l.a)(Object(l.a)({},t.state),{},{inventoryItems:[].concat(Object(r.a)(t.state.inventoryItems),[Object(l.a)(Object(l.a)({},e),{},{image:n})])}))}}()}}catch(s){o.e(s)}finally{o.f()}return a},t._handleRoomTransitions=function(e){var n=e.newRoom;return!!n&&(t.setState(Object(l.a)(Object(l.a)({},t.state),{},{room:n})),!0)},t._handleFlagsSet=function(e){var n,a=null===(n=e.flagsSet)||void 0===n?void 0:n.filter((function(e){return!t.state.flags.includes(e)}));return(null===a||void 0===a?void 0:a.length)>0&&(t.setState(Object(l.a)(Object(l.a)({},t.state),{},{flags:[].concat(Object(r.a)(t.state.flags),Object(r.a)(a))})),!0)},t._handleLocks=function(e){if(e.code){var n,a=e.unlocks.map((function(t){return"".concat(t,"_unlocked")})),o=Object(c.a)(a);try{for(o.s();!(n=o.n()).done;){var i=n.value;if(t.state.flags.includes(i))return}}catch(s){o.e(s)}finally{o.f()}t.setState(Object(l.a)(Object(l.a)({},t.state),{},{activeLock:{code:e.code,onUnlock:function(){t.setState(Object(l.a)(Object(l.a)({},t.state),{},{flags:[].concat(Object(r.a)(t.state.flags),Object(r.a)(a))}))}}}))}},t._getValidInteractions=function(e,n){var a;return null===e||void 0===e||null===(a=e.filter((function(t){return t.type===n})))||void 0===a?void 0:a.filter((function(e){return!e.requiredFlags||0===e.requiredFlags.filter((function(e){return!t.state.flags.includes(e)})).length}))},t._getImagePreviewUrl=function(t){var e="images/".concat(t,".png"),n=new Image;return n.src=e,0===n.width?"":e},t._clearOldSettings=function(){console.log("CLEAR"),t.setState(Object(l.a)(Object(l.a)({},t.state),{},{imagePreviewUrl:"",activeLock:{code:"",onUnlock:function(){}}}))},t.itemClickHandler=function(e){var n;t._clearOldSettings();var a=!1;null===(n=t._getValidInteractions(e.interactions,"click"))||void 0===n||n.forEach((function(e){a=!0,t.setState(Object(l.a)(Object(l.a)({},t.state),{},{text:e.text})),t._handleHiddenItems(e),t._handleLostItems(e),t._handleFlagsSet(e),t._handleRoomTransitions(e),t._handleLocks(e)})),a||t.setState(Object(l.a)(Object(l.a)({},t.state),{},{text:e.description,imagePreviewUrl:t._getImagePreviewUrl(e.id)}))},t.logLastMouseUp=function(e,n,a){t.setState(Object(l.a)(Object(l.a)({},t.state),{},{lastMouseUp:{itemId:e,x:n,y:a}}))},t.itemDragHandler=function(e,n,a){var o;t._clearOldSettings();var i=!1;null===(o=t._getValidInteractions(e,"drag"))||void 0===o||o.forEach((function(e){e.target===t.state.lastMouseUp.itemId&&n===t.state.lastMouseUp.x&&a===t.state.lastMouseUp.y&&(t.setState(Object(l.a)(Object(l.a)({},t.state),{},{text:e.text})),i=!0,t._handleHiddenItems(e),t._handleLostItems(e),t._handleFlagsSet(e))})),i||t.setState(Object(l.a)(Object(l.a)({},t.state),{},{text:"Nothing happens."}))},t.state={maxInventorySlots:10,inventoryItems:[],usedItemIds:[],itemInfo:{},text:"",lastMouseUp:{itemId:null,x:0,y:0},room:"room1",flags:[],imagePreviewUrl:"",activeLock:{code:"",onUnlock:function(){}}},t.configMap={room1:x,room2:k},t}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var t=this;_(S).then((function(t){return t.text()})).then((function(e){t.setState((function(t){return Object(l.a)(Object(l.a)({},t),{},{itemInfo:j.a.parse(e)})}))}))}},{key:"playerHasLooted",value:function(t){return this.state.inventoryItems.map((function(t){return t.id})).includes(t)||this.state.usedItemIds.includes(t)}},{key:"render",value:function(){return Object(O.jsxs)("div",{className:"App",children:[Object(O.jsxs)(h.f,{className:"canvas",width:"500",height:"1000",children:[Object(O.jsx)(y,{config:this.configMap[this.state.room],bgImage:"".concat(this.state.room,".png"),onClick:this.itemClickHandler,onMouseUp:this.logLastMouseUp},this.state.room),Object(O.jsx)(p,{items:this.state.inventoryItems,maxInventorySlots:this.state.maxInventorySlots,onClick:this.itemClickHandler,onDragEnd:this.itemDragHandler})]}),Object(O.jsxs)("header",{className:"App-header",style:{display:"flex",flexDirection:"column"},children:[this.state.text,Object(O.jsx)("img",{src:this.state.imagePreviewUrl,style:{width:"70%",marginTop:"20px"}}),Object(O.jsx)("div",{style:{color:"black",display:this.state.activeLock.code?"block":"none"},children:Object(O.jsx)(v.a,{combination:"".concat(this.state.activeLock.code),onMatch:this.state.activeLock.onUnlock,openText:"Unlocked!"})})]})]})}}]),n}(a.Component),U=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,47)).then((function(e){var n=e.getCLS,a=e.getFID,o=e.getFCP,i=e.getLCP,s=e.getTTFB;n(t),a(t),o(t),i(t),s(t)}))};s.a.render(Object(O.jsx)(o.a.StrictMode,{children:Object(O.jsx)(w,{})}),document.getElementById("root")),U()}},[[45,1,2]]]);
//# sourceMappingURL=main.4e86bef9.chunk.js.map