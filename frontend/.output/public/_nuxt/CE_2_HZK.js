import{B as e,I as t,O as n,X as r,d as i,f as a,l as o,v as s}from"./Ca5TY7vb.js";import{t as c}from"./cO8iUN-n.js";import{B as l,Rt as u,S as d,U as f,_ as p,j as m,o as h}from"#entry";import{t as g}from"./CujpVRyB.js";import{t as _}from"./BJOLUJb4.js";import{t as v}from"./nFz5vn1U.js";import{t as y}from"./Bqeo7u7y.js";var b=h.extend({name:`colorpicker`,style:`
    .p-colorpicker {
        display: inline-block;
        position: relative;
    }

    .p-colorpicker-dragging {
        cursor: pointer;
    }

    .p-colorpicker-preview {
        width: dt('colorpicker.preview.width');
        height: dt('colorpicker.preview.height');
        padding: 0;
        border: 0 none;
        border-radius: dt('colorpicker.preview.border.radius');
        transition:
            background dt('colorpicker.transition.duration'),
            color dt('colorpicker.transition.duration'),
            border-color dt('colorpicker.transition.duration'),
            outline-color dt('colorpicker.transition.duration'),
            box-shadow dt('colorpicker.transition.duration');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-colorpicker-preview:enabled:focus-visible {
        border-color: dt('colorpicker.preview.focus.border.color');
        box-shadow: dt('colorpicker.preview.focus.ring.shadow');
        outline: dt('colorpicker.preview.focus.ring.width') dt('colorpicker.preview.focus.ring.style') dt('colorpicker.preview.focus.ring.color');
        outline-offset: dt('colorpicker.preview.focus.ring.offset');
    }

    .p-colorpicker-panel {
        background: dt('colorpicker.panel.background');
        border: 1px solid dt('colorpicker.panel.border.color');
        border-radius: dt('colorpicker.panel.border.radius');
        box-shadow: dt('colorpicker.panel.shadow');
        width: 193px;
        height: 166px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .p-colorpicker-panel-inline {
        box-shadow: none;
        position: static;
    }

    .p-colorpicker-content {
        position: relative;
    }

    .p-colorpicker-color-selector {
        width: 150px;
        height: 150px;
        inset-block-start: 8px;
        inset-inline-start: 8px;
        position: absolute;
    }

    .p-colorpicker-color-background {
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    }

    .p-colorpicker-color-handle {
        position: absolute;
        inset-block-start: 0px;
        inset-inline-start: 150px;
        border-radius: 100%;
        width: 10px;
        height: 10px;
        border-width: 1px;
        border-style: solid;
        margin: -5px 0 0 -5px;
        cursor: pointer;
        opacity: 0.85;
        border-color: dt('colorpicker.handle.color');
    }

    .p-colorpicker-hue {
        width: 17px;
        height: 150px;
        inset-block-start: 8px;
        inset-inline-start: 167px;
        position: absolute;
        opacity: 0.85;
        background: linear-gradient(0deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red);
    }

    .p-colorpicker-hue-handle {
        position: absolute;
        inset-block-start: 150px;
        inset-inline-start: 0px;
        width: 21px;
        margin-inline-start: -2px;
        margin-block-start: -5px;
        height: 10px;
        border-width: 2px;
        border-style: solid;
        opacity: 0.85;
        cursor: pointer;
        border-color: dt('colorpicker.handle.color');
    }
`,classes:{root:`p-colorpicker p-component`,preview:function(e){return[`p-colorpicker-preview`,{"p-disabled":e.props.disabled}]},panel:function(e){var t=e.instance,n=e.props;return[`p-colorpicker-panel`,{"p-colorpicker-panel-inline":n.inline,"p-disabled":n.disabled,"p-invalid":t.$invalid}]},colorSelector:`p-colorpicker-color-selector`,colorBackground:`p-colorpicker-color-background`,colorHandle:`p-colorpicker-color-handle`,hue:`p-colorpicker-hue`,hueHandle:`p-colorpicker-hue-handle`}}),x={name:`ColorPicker`,extends:{name:`BaseColorPicker`,extends:_,props:{defaultColor:{type:null,default:`ff0000`},inline:{type:Boolean,default:!1},format:{type:String,default:`hex`},tabindex:{type:String,default:null},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},appendTo:{type:[String,Object],default:`body`},inputId:{type:String,default:null},panelClass:null,overlayClass:null},style:b,provide:function(){return{$pcColorPicker:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`change`,`show`,`hide`],data:function(){return{overlayVisible:!1}},hsbValue:null,localHue:null,outsideClickListener:null,documentMouseMoveListener:null,documentMouseUpListener:null,scrollHandler:null,resizeListener:null,hueDragging:null,colorDragging:null,selfUpdate:null,picker:null,colorSelector:null,colorHandle:null,hueView:null,hueHandle:null,watch:{modelValue:{immediate:!0,handler:function(e){this.hsbValue=this.toHSB(e),this.selfUpdate?this.selfUpdate=!1:this.updateUI()}}},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindDragListeners(),this.unbindResizeListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.picker&&this.autoZIndex&&c.clear(this.picker),this.clearRefs()},mounted:function(){this.updateUI()},methods:{pickColor:function(e){var t=this.colorSelector.getBoundingClientRect(),n=t.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),r=t.left+document.body.scrollLeft,i=Math.floor(100*Math.max(0,Math.min(150,(e.pageX||e.changedTouches[0].pageX)-r))/150),a=Math.floor(100*(150-Math.max(0,Math.min(150,(e.pageY||e.changedTouches[0].pageY)-n)))/150);this.hsbValue=this.validateHSB({h:this.localHue,s:i,b:a}),this.selfUpdate=!0,this.updateColorHandle(),this.updateInput(),this.updateModel(e)},pickHue:function(e){var t=this.hueView.getBoundingClientRect().top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0);this.localHue=Math.floor(360*(150-Math.max(0,Math.min(150,(e.pageY||e.changedTouches[0].pageY)-t)))/150),this.hsbValue=this.validateHSB({h:this.localHue,s:this.hsbValue.s,b:this.hsbValue.b}),this.selfUpdate=!0,this.updateColorSelector(),this.updateHue(),this.updateModel(e),this.updateInput()},updateModel:function(e){var t=this.d_value;switch(this.format){case`hex`:t=this.HSBtoHEX(this.hsbValue);break;case`rgb`:t=this.HSBtoRGB(this.hsbValue);break;case`hsb`:t=this.hsbValue}this.writeValue(t,e),this.$emit(`change`,{event:e,value:t})},updateColorSelector:function(){if(this.colorSelector){var e=this.validateHSB({h:this.hsbValue.h,s:100,b:100});this.colorSelector.style.backgroundColor=`#`+this.HSBtoHEX(e)}},updateColorHandle:function(){this.colorHandle&&(this.colorHandle.style.left=Math.floor(150*this.hsbValue.s/100)+`px`,this.colorHandle.style.top=Math.floor(150*(100-this.hsbValue.b)/100)+`px`)},updateHue:function(){this.hueHandle&&(this.hueHandle.style.top=Math.floor(150-150*this.hsbValue.h/360)+`px`)},updateInput:function(){this.$refs.input&&(this.$refs.input.style.backgroundColor=`#`+this.HSBtoHEX(this.hsbValue))},updateUI:function(){this.updateHue(),this.updateColorHandle(),this.updateInput(),this.updateColorSelector()},validateHSB:function(e){return{h:Math.min(360,Math.max(0,e.h)),s:Math.min(100,Math.max(0,e.s)),b:Math.min(100,Math.max(0,e.b))}},validateRGB:function(e){return{r:Math.min(255,Math.max(0,e.r)),g:Math.min(255,Math.max(0,e.g)),b:Math.min(255,Math.max(0,e.b))}},validateHEX:function(e){var t=6-e.length;if(t>0){for(var n=[],r=0;r<t;r++)n.push(`0`);n.push(e),e=n.join(``)}return e},HEXtoRGB:function(e){var t=parseInt(e.indexOf(`#`)>-1?e.substring(1):e,16);return{r:t>>16,g:(t&65280)>>8,b:t&255}},HEXtoHSB:function(e){return this.RGBtoHSB(this.HEXtoRGB(e))},RGBtoHSB:function(e){var t={h:0,s:0,b:0},n=Math.min(e.r,e.g,e.b),r=Math.max(e.r,e.g,e.b),i=r-n;return t.b=r,t.s=r===0?0:255*i/r,t.h=t.s===0?-1:e.r===r?(e.g-e.b)/i:e.g===r?2+(e.b-e.r)/i:4+(e.r-e.g)/i,t.h*=60,t.h<0&&(t.h+=360),t.s*=100/255,t.b*=100/255,t},HSBtoRGB:function(e){var t={r:null,g:null,b:null},n=Math.round(e.h),r=Math.round(e.s*255/100),i=Math.round(e.b*255/100);if(r===0)t={r:i,g:i,b:i};else{var a=i,o=(255-r)*i/255,s=(a-o)*(n%60)/60;n===360&&(n=0),n<60?(t.r=a,t.b=o,t.g=o+s):n<120?(t.g=a,t.b=o,t.r=a-s):n<180?(t.g=a,t.r=o,t.b=o+s):n<240?(t.b=a,t.r=o,t.g=a-s):n<300?(t.b=a,t.g=o,t.r=o+s):n<360?(t.r=a,t.g=o,t.b=a-s):(t.r=0,t.g=0,t.b=0)}return{r:Math.round(t.r),g:Math.round(t.g),b:Math.round(t.b)}},RGBtoHEX:function(e){var t=[e.r.toString(16),e.g.toString(16),e.b.toString(16)];for(var n in t)t[n].length===1&&(t[n]=`0`+t[n]);return t.join(``)},HSBtoHEX:function(e){return this.RGBtoHEX(this.HSBtoRGB(e))},toHSB:function(e){var t;if(e)switch(this.format){case`hex`:t=this.HEXtoHSB(e);break;case`rgb`:t=this.RGBtoHSB(e);break;case`hsb`:t=e}else t=this.HEXtoHSB(this.defaultColor);return t.s===0||t.b===0?t.h=this.localHue:this.localHue=t.h,t},onOverlayEnter:function(e){this.updateUI(),this.alignOverlay(),this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&c.set(`overlay`,e,this.baseZIndex+this.$primevue.config.zIndex.overlay),this.$attrSelector&&e.setAttribute(this.$attrSelector,``),this.$emit(`show`)},onOverlayLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.clearRefs(),this.$emit(`hide`)},onOverlayAfterLeave:function(e){this.autoZIndex&&c.clear(e)},alignOverlay:function(){this.appendTo===`self`?d(this.picker,this.$refs.input):p(this.picker,this.$refs.input)},onInputClick:function(){this.disabled||(this.overlayVisible=!this.overlayVisible)},onInputKeydown:function(e){switch(e.code){case`Space`:this.overlayVisible=!this.overlayVisible,e.preventDefault();break;case`Escape`:case`Tab`:this.overlayVisible=!1}},onInputBlur:function(e){var t,n;(t=(n=this.formField).onBlur)==null||t.call(n)},onColorMousedown:function(e){this.disabled||(this.bindDragListeners(),this.onColorDragStart(e))},onColorDragStart:function(e){this.disabled||(this.colorDragging=!0,this.pickColor(e),this.$el.setAttribute(`p-colorpicker-dragging`,`true`),!this.isUnstyled&&l(this.$el,`p-colorpicker-dragging`),e.preventDefault())},onDrag:function(e){this.colorDragging&&(this.pickColor(e),e.preventDefault()),this.hueDragging&&(this.pickHue(e),e.preventDefault())},onDragEnd:function(){this.colorDragging=!1,this.hueDragging=!1,this.$el.setAttribute(`p-colorpicker-dragging`,`false`),!this.isUnstyled&&m(this.$el,`p-colorpicker-dragging`),this.unbindDragListeners()},onHueMousedown:function(e){this.disabled||(this.bindDragListeners(),this.onHueDragStart(e))},onHueDragStart:function(e){this.disabled||(this.hueDragging=!0,this.pickHue(e),!this.isUnstyled&&l(this.$el,`p-colorpicker-dragging`),e.preventDefault())},isInputClicked:function(e){return this.$refs.input&&this.$refs.input.isSameNode(e.target)},bindDragListeners:function(){this.bindDocumentMouseMoveListener(),this.bindDocumentMouseUpListener()},unbindDragListeners:function(){this.unbindDocumentMouseMoveListener(),this.unbindDocumentMouseUpListener()},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){e.overlayVisible&&e.picker&&!e.picker.contains(t.target)&&!e.isInputClicked(t)&&(e.overlayVisible=!1)},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new g(this.$refs.container,function(){e.overlayVisible&&=!1}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!f()&&(e.overlayVisible=!1)},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},bindDocumentMouseMoveListener:function(){this.documentMouseMoveListener||(this.documentMouseMoveListener=this.onDrag.bind(this),document.addEventListener(`mousemove`,this.documentMouseMoveListener))},unbindDocumentMouseMoveListener:function(){this.documentMouseMoveListener&&=(document.removeEventListener(`mousemove`,this.documentMouseMoveListener),null)},bindDocumentMouseUpListener:function(){this.documentMouseUpListener||(this.documentMouseUpListener=this.onDragEnd.bind(this),document.addEventListener(`mouseup`,this.documentMouseUpListener))},unbindDocumentMouseUpListener:function(){this.documentMouseUpListener&&=(document.removeEventListener(`mouseup`,this.documentMouseUpListener),null)},pickerRef:function(e){this.picker=e},colorSelectorRef:function(e){this.colorSelector=e},colorHandleRef:function(e){this.colorHandle=e},hueViewRef:function(e){this.hueView=e},hueHandleRef:function(e){this.hueHandle=e},clearRefs:function(){this.picker=null,this.colorSelector=null,this.colorHandle=null,this.hueView=null,this.hueHandle=null},onOverlayClick:function(e){v.emit(`overlay-click`,{originalEvent:e,target:this.$el})}},components:{Portal:y}};function S(e){"@babel/helpers - typeof";return S=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},S(e)}function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?C(Object(n),!0).forEach(function(t){T(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function T(e,t,n){return(t=E(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function E(e){var t=D(e,`string`);return S(t)==`symbol`?t:t+``}function D(e,t){if(S(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(S(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var O=[`id`,`tabindex`,`disabled`];function k(c,l,d,f,p,m){var h=e(`Portal`);return t(),a(`div`,n({ref:`container`,class:c.cx(`root`)},c.ptmi(`root`)),[c.inline?i(``,!0):(t(),a(`input`,n({key:0,ref:`input`,id:c.inputId,type:`text`,class:c.cx(`preview`),readonly:``,tabindex:c.tabindex,disabled:c.disabled,onClick:l[0]||=function(){return m.onInputClick&&m.onInputClick.apply(m,arguments)},onKeydown:l[1]||=function(){return m.onInputKeydown&&m.onInputKeydown.apply(m,arguments)},onBlur:l[2]||=function(){return m.onInputBlur&&m.onInputBlur.apply(m,arguments)}},c.ptm(`preview`)),null,16,O)),s(h,{appendTo:c.appendTo,disabled:c.inline},{default:r(function(){return[s(u,n({name:`p-anchored-overlay`,onEnter:m.onOverlayEnter,onLeave:m.onOverlayLeave,onAfterLeave:m.onOverlayAfterLeave},c.ptm(`transition`)),{default:r(function(){return[c.inline||p.overlayVisible?(t(),a(`div`,n({key:0,ref:m.pickerRef,class:[c.cx(`panel`),c.panelClass,c.overlayClass],onClick:l[11]||=function(){return m.onOverlayClick&&m.onOverlayClick.apply(m,arguments)}},w(w({},c.ptm(`panel`)),c.ptm(`overlay`))),[o(`div`,n({class:c.cx(`content`)},c.ptm(`content`)),[o(`div`,n({ref:m.colorSelectorRef,class:c.cx(`colorSelector`),onMousedown:l[3]||=function(e){return m.onColorMousedown(e)},onTouchstart:l[4]||=function(e){return m.onColorDragStart(e)},onTouchmove:l[5]||=function(e){return m.onDrag(e)},onTouchend:l[6]||=function(e){return m.onDragEnd()}},c.ptm(`colorSelector`)),[o(`div`,n({class:c.cx(`colorBackground`)},c.ptm(`colorBackground`)),[o(`div`,n({ref:m.colorHandleRef,class:c.cx(`colorHandle`)},c.ptm(`colorHandle`)),null,16)],16)],16),o(`div`,n({ref:m.hueViewRef,class:c.cx(`hue`),onMousedown:l[7]||=function(e){return m.onHueMousedown(e)},onTouchstart:l[8]||=function(e){return m.onHueDragStart(e)},onTouchmove:l[9]||=function(e){return m.onDrag(e)},onTouchend:l[10]||=function(e){return m.onDragEnd()}},c.ptm(`hue`)),[o(`div`,n({ref:m.hueHandleRef,class:c.cx(`hueHandle`)},c.ptm(`hueHandle`)),null,16)],16)],16)],16)):i(``,!0)]}),_:1},16,[`onEnter`,`onLeave`,`onAfterLeave`])]}),_:1},8,[`appendTo`,`disabled`])],16)}x.render=k;export{x as default};