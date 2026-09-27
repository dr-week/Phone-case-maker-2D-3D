import{H as e,I as t,O as n,R as r,d as i,f as a,l as o,r as s,u as c}from"./Ca5TY7vb.js";import{t as l}from"./CRHlWn3X.js";import{L as u,Nt as d,P as f,ft as p,g as m,o as h,ot as g,z as _}from"#entry";import{t as v}from"./BAPwTHkl.js";import{r as y}from"./CujpVRyB.js";var b=h.extend({name:`splitter`,style:`
    .p-splitter {
        display: flex;
        flex-wrap: nowrap;
        border: 1px solid dt('splitter.border.color');
        background: dt('splitter.background');
        border-radius: dt('border.radius.md');
        color: dt('splitter.color');
    }

    .p-splitter-vertical {
        flex-direction: column;
    }

    .p-splitter-gutter {
        flex-grow: 0;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        background: dt('splitter.gutter.background');
    }

    .p-splitter-gutter-handle {
        border-radius: dt('splitter.handle.border.radius');
        background: dt('splitter.handle.background');
        transition:
            outline-color dt('splitter.transition.duration'),
            box-shadow dt('splitter.transition.duration');
        outline-color: transparent;
    }

    .p-splitter-gutter-handle:focus-visible {
        box-shadow: dt('splitter.handle.focus.ring.shadow');
        outline: dt('splitter.handle.focus.ring.width') dt('splitter.handle.focus.ring.style') dt('splitter.handle.focus.ring.color');
        outline-offset: dt('splitter.handle.focus.ring.offset');
    }

    .p-splitter-horizontal.p-splitter-resizing {
        cursor: col-resize;
        user-select: none;
    }

    .p-splitter-vertical.p-splitter-resizing {
        cursor: row-resize;
        user-select: none;
    }

    .p-splitter-horizontal > .p-splitter-gutter > .p-splitter-gutter-handle {
        height: dt('splitter.handle.size');
        width: 100%;
    }

    .p-splitter-vertical > .p-splitter-gutter > .p-splitter-gutter-handle {
        width: dt('splitter.handle.size');
        height: 100%;
    }

    .p-splitter-horizontal > .p-splitter-gutter {
        cursor: col-resize;
    }

    .p-splitter-vertical > .p-splitter-gutter {
        cursor: row-resize;
    }

    .p-splitterpanel {
        flex-grow: 1;
        overflow: hidden;
    }

    .p-splitterpanel-nested {
        display: flex;
    }

    .p-splitterpanel .p-splitter {
        flex-grow: 1;
        min-width: 0;
        min-height: 0;
        border: 0 none;
    }
`,classes:{root:function(e){return[`p-splitter p-component`,`p-splitter-`+e.props.layout]},gutter:`p-splitter-gutter`,gutterHandle:`p-splitter-gutter-handle`}}),x={name:`BaseSplitter`,extends:v,props:{layout:{type:String,default:`horizontal`},gutterSize:{type:Number,default:4},stateKey:{type:String,default:null},stateStorage:{type:String,default:`session`},step:{type:Number,default:5}},style:b,provide:function(){return{$pcSplitter:this,$parentInstance:this}}};function S(e){"@babel/helpers - typeof";return S=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},S(e)}function C(e,t,n){return(t=w(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function w(e){var t=T(e,`string`);return S(t)==`symbol`?t:t+``}function T(e,t){if(S(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(S(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function E(e){return A(e)||k(e)||O(e)||D()}function D(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function O(e,t){if(e){if(typeof e==`string`)return j(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(e,t):void 0}}function k(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function A(e){if(Array.isArray(e))return j(e)}function j(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var M={name:`Splitter`,extends:x,inheritAttrs:!1,emits:[`resizestart`,`resizeend`,`resize`],dragging:!1,mouseMoveListener:null,mouseUpListener:null,touchMoveListener:null,touchEndListener:null,size:null,gutterElement:null,startPos:null,prevPanelElement:null,nextPanelElement:null,nextPanelSize:null,prevPanelSize:null,panelSizes:null,prevPanelIndex:null,timer:null,data:function(){return{prevSize:null}},mounted:function(){this.initializePanels()},beforeUnmount:function(){this.clear(),this.unbindMouseListeners()},methods:{isSplitterPanel:function(e){return e.type.name===`SplitterPanel`},initializePanels:function(){var e=this;if(this.panels&&this.panels.length){var t=!1;if(this.isStateful()&&(t=this.restoreState()),!t){var n=E(this.$el.children).filter(function(e){return e.getAttribute(`data-pc-name`)===`splitterpanel`}),r=[];this.panels.map(function(t,i){var a=(t.props&&d(t.props.size)?t.props.size:null)??100/e.panels.length;r[i]=a,n[i].style.flexBasis=`calc(`+a+`% - `+(e.panels.length-1)*e.gutterSize+`px)`}),this.panelSizes=r,this.prevSize=parseFloat(r[0]).toFixed(4)}}},onResizeStart:function(e,t,n){this.gutterElement=e.currentTarget||e.target.parentElement,this.size=this.horizontal?f(this.$el):u(this.$el),n||(this.dragging=!0,this.startPos=this.layout===`horizontal`?e.pageX||e.changedTouches[0].pageX:e.pageY||e.changedTouches[0].pageY),this.prevPanelElement=this.gutterElement.previousElementSibling,this.nextPanelElement=this.gutterElement.nextElementSibling,n?(this.prevPanelSize=this.horizontal?g(this.prevPanelElement,!0):m(this.prevPanelElement,!0),this.nextPanelSize=this.horizontal?g(this.nextPanelElement,!0):m(this.nextPanelElement,!0)):(this.prevPanelSize=100*(this.horizontal?g(this.prevPanelElement,!0):m(this.prevPanelElement,!0))/this.size,this.nextPanelSize=100*(this.horizontal?g(this.nextPanelElement,!0):m(this.nextPanelElement,!0))/this.size),this.prevPanelIndex=t,this.$emit(`resizestart`,{originalEvent:e,sizes:this.panelSizes}),this.$refs.gutter[t].setAttribute(`data-p-gutter-resizing`,!0),this.$el.setAttribute(`data-p-resizing`,!0)},onResize:function(e,t,n){var r,i,a;n?this.horizontal?(i=100*(this.prevPanelSize+t)/this.size,a=100*(this.nextPanelSize-t)/this.size):(i=100*(this.prevPanelSize-t)/this.size,a=100*(this.nextPanelSize+t)/this.size):(r=this.horizontal?_(this.$el)?(this.startPos-e.pageX)*100/this.size:(e.pageX-this.startPos)*100/this.size:(e.pageY-this.startPos)*100/this.size,i=this.prevPanelSize+r,a=this.nextPanelSize-r),this.validateResize(i,a)||(i=Math.min(Math.max(this.prevPanelMinSize,i),100-this.nextPanelMinSize),a=Math.min(Math.max(this.nextPanelMinSize,a),100-this.prevPanelMinSize)),this.prevPanelElement.style.flexBasis=`calc(`+i+`% - `+(this.panels.length-1)*this.gutterSize+`px)`,this.nextPanelElement.style.flexBasis=`calc(`+a+`% - `+(this.panels.length-1)*this.gutterSize+`px)`,this.panelSizes[this.prevPanelIndex]=i,this.panelSizes[this.prevPanelIndex+1]=a,this.prevSize=parseFloat(i).toFixed(4),this.$emit(`resize`,{originalEvent:e,sizes:this.panelSizes})},onResizeEnd:function(e){this.isStateful()&&this.saveState(),this.$emit(`resizeend`,{originalEvent:e,sizes:this.panelSizes}),this.$refs.gutter.forEach(function(e){return e.setAttribute(`data-p-gutter-resizing`,!1)}),this.$el.setAttribute(`data-p-resizing`,!1),this.clear()},repeat:function(e,t,n){this.onResizeStart(e,t,!0),this.onResize(e,n,!0)},setTimer:function(e,t,n){var r=this;this.timer||=setInterval(function(){r.repeat(e,t,n)},40)},clearTimer:function(){this.timer&&=(clearInterval(this.timer),null)},onGutterKeyUp:function(){this.clearTimer(),this.onResizeEnd()},onGutterKeyDown:function(e,t){switch(e.code){case`ArrowLeft`:this.layout===`horizontal`&&this.setTimer(e,t,this.step*-1),e.preventDefault();break;case`ArrowRight`:this.layout===`horizontal`&&this.setTimer(e,t,this.step),e.preventDefault();break;case`ArrowDown`:this.layout===`vertical`&&this.setTimer(e,t,this.step*-1),e.preventDefault();break;case`ArrowUp`:this.layout===`vertical`&&this.setTimer(e,t,this.step),e.preventDefault()}},onGutterMouseDown:function(e,t){this.onResizeStart(e,t),this.bindMouseListeners()},onGutterTouchStart:function(e,t){this.onResizeStart(e,t),this.bindTouchListeners(),e.preventDefault()},onGutterTouchMove:function(e){this.onResize(e),e.preventDefault()},onGutterTouchEnd:function(e){this.onResizeEnd(e),this.unbindTouchListeners(),e.preventDefault()},bindMouseListeners:function(){var e=this;this.mouseMoveListener||(this.mouseMoveListener=function(t){return e.onResize(t)},document.addEventListener(`mousemove`,this.mouseMoveListener)),this.mouseUpListener||(this.mouseUpListener=function(t){e.onResizeEnd(t),e.unbindMouseListeners()},document.addEventListener(`mouseup`,this.mouseUpListener))},bindTouchListeners:function(){var e=this;this.touchMoveListener||(this.touchMoveListener=function(t){return e.onResize(t.changedTouches[0])},document.addEventListener(`touchmove`,this.touchMoveListener)),this.touchEndListener||(this.touchEndListener=function(t){e.resizeEnd(t),e.unbindTouchListeners()},document.addEventListener(`touchend`,this.touchEndListener))},validateResize:function(e,t){return!(e>100||e<0||t>100||t<0||this.prevPanelMinSize>e||this.nextPanelMinSize>t)},unbindMouseListeners:function(){this.mouseMoveListener&&=(document.removeEventListener(`mousemove`,this.mouseMoveListener),null),this.mouseUpListener&&=(document.removeEventListener(`mouseup`,this.mouseUpListener),null)},unbindTouchListeners:function(){this.touchMoveListener&&=(document.removeEventListener(`touchmove`,this.touchMoveListener),null),this.touchEndListener&&=(document.removeEventListener(`touchend`,this.touchEndListener),null)},clear:function(){this.dragging=!1,this.size=null,this.startPos=null,this.prevPanelElement=null,this.nextPanelElement=null,this.prevPanelSize=null,this.nextPanelSize=null,this.gutterElement=null,this.prevPanelIndex=null},isStateful:function(){return this.stateKey!=null},getStorage:function(){switch(this.stateStorage){case`local`:return window.localStorage;case`session`:return window.sessionStorage;default:throw Error(this.stateStorage+` is not a valid value for the state storage, supported values are "local" and "session".`)}},saveState:function(){p(this.panelSizes)&&this.getStorage().setItem(this.stateKey,JSON.stringify(this.panelSizes))},restoreState:function(){var e=this,t=this.getStorage().getItem(this.stateKey);return t?(this.panelSizes=JSON.parse(t),E(this.$el.children).filter(function(e){return e.getAttribute(`data-pc-name`)===`splitterpanel`}).forEach(function(t,n){t.style.flexBasis=`calc(`+e.panelSizes[n]+`% - `+(e.panels.length-1)*e.gutterSize+`px)`}),!0):!1},resetState:function(){this.initializePanels()}},computed:{panels:function(){var e=this,t=[];return this.$slots.default().forEach(function(n){e.isSplitterPanel(n)?t.push(n):n.children instanceof Array&&n.children.forEach(function(n){e.isSplitterPanel(n)&&t.push(n)})}),t},gutterStyle:function(){return this.horizontal?{width:this.gutterSize+`px`}:{height:this.gutterSize+`px`}},horizontal:function(){return this.layout===`horizontal`},getPTOptions:function(){return{context:{nested:this.$parentInstance?.nestedState}}},prevPanelMinSize:function(){var e=y(this.panels[this.prevPanelIndex],`minSize`);return this.panels[this.prevPanelIndex].props&&e?e:0},nextPanelMinSize:function(){var e=y(this.panels[this.prevPanelIndex+1],`minSize`);return this.panels[this.prevPanelIndex+1].props&&e?e:0},dataP:function(){return l(C(C({},this.layout,this.layout),`nested`,this.$parentInstance?.nestedState!=null))}}},N=[`data-p`],P=[`onMousedown`,`onTouchstart`,`onTouchmove`,`onTouchend`,`data-p`],F=[`aria-orientation`,`aria-valuenow`,`onKeydown`,`data-p`];function I(l,u,d,f,p,m){return t(),a(`div`,n({class:l.cx(`root`),"data-p-resizing":!1,"data-p":m.dataP},l.ptmi(`root`,m.getPTOptions)),[(t(!0),a(s,null,r(m.panels,function(r,d){return t(),a(s,{key:d},[(t(),c(e(r),{tabindex:`-1`})),d===m.panels.length-1?i(``,!0):(t(),a(`div`,n({key:0,ref_for:!0,ref:`gutter`,class:l.cx(`gutter`),role:`separator`,tabindex:`-1`,onMousedown:function(e){return m.onGutterMouseDown(e,d)},onTouchstart:function(e){return m.onGutterTouchStart(e,d)},onTouchmove:function(e){return m.onGutterTouchMove(e,d)},onTouchend:function(e){return m.onGutterTouchEnd(e,d)},"data-p-gutter-resizing":!1,"data-p":m.dataP},{ref_for:!0},l.ptm(`gutter`)),[o(`div`,n({class:l.cx(`gutterHandle`),tabindex:`0`,style:[m.gutterStyle],"aria-orientation":l.layout,"aria-valuenow":p.prevSize,onKeyup:u[0]||=function(){return m.onGutterKeyUp&&m.onGutterKeyUp.apply(m,arguments)},onKeydown:function(e){return m.onGutterKeyDown(e,d)},"data-p":m.dataP},{ref_for:!0},l.ptm(`gutterHandle`)),null,16,F)],16,P))],64)}),128))],16,N)}M.render=I;export{M as default};