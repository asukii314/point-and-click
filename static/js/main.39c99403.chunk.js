(this["webpackJsonproom-escape"]=this["webpackJsonproom-escape"]||[]).push([[0],{28:function(t,e,n){},38:function(t,e,n){},39:function(t,e,n){"use strict";n.r(e);var a=n(9),o=n.n(a),s=n(22),i=n.n(s),r=(n(28),n(16)),c=n(7),d=n(3),l=n(4),u=n(6),m=n(5),h=n(14),b=n(11),j=n(10),p=function(t){Object(u.a)(n,t);var e=Object(m.a)(n);function n(){var t;return Object(d.a)(this,n),(t=e.call(this)).dragStartHandler=function(e){t.setState(Object(c.a)(Object(c.a)({},t.state),{},{lastInvCoords:{x:e.target.attrs.x,y:e.target.attrs.y}}))},t.dragEndHandler=function(e,n){var a,o=t.refs[e.id].parent;t.refs[e.id].position(t.state.lastInvCoords),t.props.onDragEnd(null===(a=e.interactions)||void 0===a?void 0:a.filter((function(t){return"drag"===t.type})),n.evt.clientX,n.evt.clientY),o.draw()},t.renderInventorySlot=function(t,e){return Object(j.jsx)(h.e,{x:5+e%10*50,y:515+50*Math.floor(e/10),width:40,height:40,fill:"grey",shadowBlur:10,shadowOpacity:.4},e)},t.renderInventoryItem=function(e,n){return Object(j.jsx)(h.b,{ref:e.id,x:5+n%10*50,y:515+50*Math.floor(n/10),width:40,height:40,image:e.image,draggable:!0,onMouseDown:t.dragStartHandler,onDragEnd:t.dragEndHandler.bind(Object(b.a)(t),e),onClick:t.props.onClick.bind(Object(b.a)(t),e)},e.id)},t.state={lastInvCoords:{x:0,y:0}},t}return Object(l.a)(n,[{key:"render",value:function(){var t;return Object(j.jsxs)(h.c,{className:"inventoryLayer",children:[Object(j.jsx)(h.e,{x:0,y:510,width:500,height:50*Math.ceil(this.props.maxInventorySlots/10),fill:"dimgray",shadowBlur:10}),Object(r.a)(Array(parseInt(this.props.maxInventorySlots)).keys()).map(this.renderInventorySlot),null===(t=this.props.items)||void 0===t?void 0:t.map(this.renderInventoryItem)]})}}]),n}(a.Component),v=n(24),f=n.n(v),O=n(37),g=function(t){Object(u.a)(n,t);var e=Object(m.a)(n);function n(){var t;return Object(d.a)(this,n),(t=e.call(this))._clickHandler=function(e,n){t.props.onClick(t.state.items[e]),t.setState((function(t){return Object(c.a)(Object(c.a)({},t),{},{dotX:n.evt.pageX,dotY:n.evt.pageY})}))},t._hoverHandler=function(e){t.setState((function(t){return Object(c.a)(Object(c.a)({},t),{},{hoveredItem:e})}))},t._hoverEndHandler=function(e,n){t.setState((function(t){return Object(c.a)(Object(c.a)({},t),{},{hoveredItem:null})}))},t._mouseUpHandler=function(e,n){t.props.onMouseUp(e,n.evt.clientX,n.evt.clientY),t.setState(Object(c.a)(Object(c.a)({},t.state),{},{dotX:n.evt.clientX,dotY:n.evt.clientY}))},t.renderClickableItem=function(e){var n=t.state.items[e];if(n)return Object(j.jsx)(h.d,{points:n.position.points,x:n.position.offsetX,y:n.position.offsetY,opacity:t.state.hoveredItem===e?.2:0,fill:"orange",closed:!0,onClick:t._clickHandler.bind(Object(b.a)(t),e),onMouseover:t._hoverHandler.bind(Object(b.a)(t),e),onMouseleave:t._hoverEndHandler.bind(Object(b.a)(t),e),onMouseUp:t._mouseUpHandler.bind(Object(b.a)(t),e)},e)},t.state={dotX:-10,dotY:-10,hoveredItem:null,image:null,items:{}},t}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=this;O(this.props.config).then((function(t){return t.text()})).then((function(e){t.setState((function(t){return Object(c.a)(Object(c.a)({},t),{},{items:f.a.parse(e)})}))}));var e=new window.Image;e.src="images/".concat(this.props.bgImage),e.onload=function(){t.setState(Object(c.a)(Object(c.a)({},t.state),{},{image:e}))}}},{key:"render",value:function(){return this.state?Object(j.jsxs)(h.c,{className:"imgLayer",children:[Object(j.jsx)(h.b,{x:0,y:0,width:500,height:500,image:this.state.image}),Object(j.jsx)(h.a,{x:this.state.dotX,y:this.state.dotY,radius:"4",fill:"red"}),Object.keys(this.state.items).map(this.renderClickableItem)]}):null}}]),n}(a.Component),y=n.p+"static/media/room1.6f5deb7b.yaml",I=n.p+"static/media/room2.298ea5d0.yaml",x=(n(38),function(t){Object(u.a)(n,t);var e=Object(m.a)(n);function n(){var t;return Object(d.a)(this,n),(t=e.call(this))._handleLostItems=function(e){var n,a=null===(n=e.itemsLost)||void 0===n?void 0:n[0];if(!a)return!1;var o=t.state.inventoryItems.filter((function(t){return t.id!=a.id}));return t.setState(Object(c.a)(Object(c.a)({},t.state),{},{text:e.text,inventoryItems:o,usedItems:[].concat(Object(r.a)(t.state.usedItems),[a])})),!0},t._handleHiddenItems=function(e){var n,a=null===(n=e.itemsGained)||void 0===n?void 0:n[0];if(a&&!t.playerHasLooted(a)){var o=new window.Image;return o.src="images/".concat(a.id,".png"),o.onload=function(){t.setState(Object(c.a)(Object(c.a)({},t.state),{},{text:e.text,inventoryItems:[].concat(Object(r.a)(t.state.inventoryItems),[Object(c.a)(Object(c.a)({},a),{},{image:o})])}))},!0}return!1},t._handleRoomTransitions=function(e){var n=e.newRoom;return!!n&&(t.setState(Object(c.a)(Object(c.a)({},t.state),{},{text:e.text,room:n})),!0)},t.itemClickHandler=function(e){var n,a=!1;null===(n=e.interactions)||void 0===n||n.forEach((function(e){"click"===e.type&&(a=a||t._handleHiddenItems(e)||t._handleLostItems(e)||t._handleRoomTransitions(e))})),a||t.setState(Object(c.a)(Object(c.a)({},t.state),{},{text:e.description}))},t.logLastMouseUp=function(e,n,a){t.setState(Object(c.a)(Object(c.a)({},t.state),{},{lastMouseUp:{itemId:e,x:n,y:a}}))},t.itemDragHandler=function(e,n,a){var o=!1;null===e||void 0===e||e.forEach((function(e){e.target===t.state.lastMouseUp.itemId&&n===t.state.lastMouseUp.x&&a===t.state.lastMouseUp.y&&(t.setState(Object(c.a)(Object(c.a)({},t.state),{},{text:e.text})),o=!0,t._handleHiddenItems(e),t._handleLostItems(e))})),o||t.setState(Object(c.a)(Object(c.a)({},t.state),{},{text:"Nothing happens."}))},t.state={maxInventorySlots:10,inventoryItems:[],usedItems:[],text:"",lastMouseUp:{itemId:null,x:0,y:0},room:"room1"},t.configMap={room1:y,room2:I},t}return Object(l.a)(n,[{key:"playerHasLooted",value:function(t){return this.state.inventoryItems.map((function(t){return t.id})).includes(t.id)||this.state.usedItems.map((function(t){return t.id})).includes(t.id)}},{key:"render",value:function(){return Object(j.jsxs)("div",{className:"App",children:[Object(j.jsxs)(h.f,{className:"canvas",width:"500",height:"1000",children:[Object(j.jsx)(g,{config:this.configMap[this.state.room],bgImage:"".concat(this.state.room,".png"),onClick:this.itemClickHandler,onMouseUp:this.logLastMouseUp},this.state.room),Object(j.jsx)(p,{items:this.state.inventoryItems,maxInventorySlots:this.state.maxInventorySlots,onClick:this.itemClickHandler,onDragEnd:this.itemDragHandler})]}),Object(j.jsx)("header",{className:"App-header",children:this.state.text})]})}}]),n}(a.Component)),S=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,41)).then((function(e){var n=e.getCLS,a=e.getFID,o=e.getFCP,s=e.getLCP,i=e.getTTFB;n(t),a(t),o(t),s(t),i(t)}))};i.a.render(Object(j.jsx)(o.a.StrictMode,{children:Object(j.jsx)(x,{})}),document.getElementById("root")),S()}},[[39,1,2]]]);
//# sourceMappingURL=main.39c99403.chunk.js.map