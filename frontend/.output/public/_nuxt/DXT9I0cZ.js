import{At as e,B as t,Dt as n,H as r,I as i,O as a,R as o,V as s,X as c,Z as l,_ as u,d,f,l as p,r as m,u as h,v as g,z as _}from"./Ca5TY7vb.js";import{t as v}from"./CRHlWn3X.js";import{t as y}from"./cO8iUN-n.js";import{F as b,H as x,J as S,Rt as C,U as w,_ as T,ct as E,kt as D,o as O,ot as k}from"#entry";import{t as A}from"./BAPwTHkl.js";import{t as j}from"./BnSyHpKn.js";import{t as M}from"./CujpVRyB.js";import{t as N}from"./nFz5vn1U.js";import{t as P}from"./Bqeo7u7y.js";var F=O.extend({name:`menu`,style:`
    .p-menu {
        background: dt('menu.background');
        color: dt('menu.color');
        border: 1px solid dt('menu.border.color');
        border-radius: dt('menu.border.radius');
        min-width: 12.5rem;
    }

    .p-menu-list {
        margin: 0;
        padding: dt('menu.list.padding');
        outline: 0 none;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: dt('menu.list.gap');
    }

    .p-menu-item-content {
        transition:
            background dt('menu.transition.duration'),
            color dt('menu.transition.duration');
        border-radius: dt('menu.item.border.radius');
        color: dt('menu.item.color');
        overflow: hidden;
    }

    .p-menu-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('menu.item.padding');
        gap: dt('menu.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-menu-item-label {
        line-height: 1;
    }

    .p-menu-item-icon {
        color: dt('menu.item.icon.color');
    }

    .p-menu-item.p-focus .p-menu-item-content {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item.p-focus .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-overlay {
        box-shadow: dt('menu.shadow');
    }

    .p-menu-submenu-label {
        background: dt('menu.submenu.label.background');
        padding: dt('menu.submenu.label.padding');
        color: dt('menu.submenu.label.color');
        font-weight: dt('menu.submenu.label.font.weight');
    }

    .p-menu-separator {
        border-block-start: 1px solid dt('menu.separator.border.color');
    }
`,classes:{root:function(e){return[`p-menu p-component`,{"p-menu-overlay":e.props.popup}]},start:`p-menu-start`,list:`p-menu-list`,submenuLabel:`p-menu-submenu-label`,separator:`p-menu-separator`,end:`p-menu-end`,item:function(e){var t=e.instance;return[`p-menu-item`,{"p-focus":t.id===t.focusedOptionId,"p-disabled":t.disabled()}]},itemContent:`p-menu-item-content`,itemLink:`p-menu-item-link`,itemIcon:`p-menu-item-icon`,itemLabel:`p-menu-item-label`}}),I={name:`BaseMenu`,extends:A,props:{popup:{type:Boolean,default:!1},model:{type:Array,default:null},appendTo:{type:[String,Object],default:`body`},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:F,provide:function(){return{$pcMenu:this,$parentInstance:this}}},L={name:`Menuitem`,hostName:`Menu`,extends:A,inheritAttrs:!1,emits:[`item-click`,`item-mousemove`],props:{item:null,templates:null,id:null,focusedOptionId:null,index:null},methods:{getItemProp:function(e,t){return e&&e.item?D(e.item[t]):void 0},getPTOptions:function(e){return this.ptm(e,{context:{item:this.item,index:this.index,focused:this.isItemFocused(),disabled:this.disabled()}})},isItemFocused:function(){return this.focusedOptionId===this.id},onItemClick:function(e){var t=this.getItemProp(this.item,`command`);t&&t({originalEvent:e,item:this.item.item}),this.$emit(`item-click`,{originalEvent:e,item:this.item,id:this.id})},onItemMouseMove:function(e){this.$emit(`item-mousemove`,{originalEvent:e,item:this.item,id:this.id})},visible:function(){return typeof this.item.visible==`function`?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled==`function`?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label==`function`?this.item.label():this.item.label},getMenuItemProps:function(e){return{action:a({class:this.cx(`itemLink`),tabindex:`-1`},this.getPTOptions(`itemLink`)),icon:a({class:[this.cx(`itemIcon`),e.icon]},this.getPTOptions(`itemIcon`)),label:a({class:this.cx(`itemLabel`)},this.getPTOptions(`itemLabel`))}}},computed:{dataP:function(){return v({focus:this.isItemFocused(),disabled:this.disabled()})}},directives:{ripple:j}},R=[`id`,`aria-label`,`aria-disabled`,`data-p-focused`,`data-p-disabled`,`data-p`],z=[`data-p`],B=[`href`,`target`],V=[`data-p`],H=[`data-p`];function U(t,o,c,u,m,g){var _=s(`ripple`);return g.visible()?(i(),f(`li`,a({key:0,id:c.id,class:[t.cx(`item`),c.item.class],role:`menuitem`,style:c.item.style,"aria-label":g.label(),"aria-disabled":g.disabled(),"data-p-focused":g.isItemFocused(),"data-p-disabled":g.disabled()||!1,"data-p":g.dataP},g.getPTOptions(`item`)),[p(`div`,a({class:t.cx(`itemContent`),onClick:o[0]||=function(e){return g.onItemClick(e)},onMousemove:o[1]||=function(e){return g.onItemMouseMove(e)},"data-p":g.dataP},g.getPTOptions(`itemContent`)),[c.templates.item?c.templates.item?(i(),h(r(c.templates.item),{key:1,item:c.item,label:g.label(),props:g.getMenuItemProps(c.item)},null,8,[`item`,`label`,`props`])):d(``,!0):l((i(),f(`a`,a({key:0,href:c.item.url,class:t.cx(`itemLink`),target:c.item.target,tabindex:`-1`},g.getPTOptions(`itemLink`)),[c.templates.itemicon?(i(),h(r(c.templates.itemicon),{key:0,item:c.item,class:n(t.cx(`itemIcon`))},null,8,[`item`,`class`])):c.item.icon?(i(),f(`span`,a({key:1,class:[t.cx(`itemIcon`),c.item.icon],"data-p":g.dataP},g.getPTOptions(`itemIcon`)),null,16,V)):d(``,!0),p(`span`,a({class:t.cx(`itemLabel`),"data-p":g.dataP},g.getPTOptions(`itemLabel`)),e(g.label()),17,H)],16,B)),[[_]])],16,z)],16,R)):d(``,!0)}L.render=U;function W(e){return J(e)||q(e)||K(e)||G()}function G(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function K(e,t){if(e){if(typeof e==`string`)return Y(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Y(e,t):void 0}}function q(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function J(e){if(Array.isArray(e))return Y(e)}function Y(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var X={name:`Menu`,extends:I,inheritAttrs:!1,emits:[`show`,`hide`,`focus`,`blur`],data:function(){return{overlayVisible:!1,focused:!1,focusedOptionIndex:-1,selectedOptionIndex:-1}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,list:null,mounted:function(){this.popup||(this.bindResizeListener(),this.bindOutsideClickListener())},beforeUnmount:function(){this.unbindResizeListener(),this.unbindOutsideClickListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.target=null,this.container&&this.autoZIndex&&y.clear(this.container),this.container=null},methods:{itemClick:function(e){var t=e.item;this.disabled(t)||(t.command&&t.command(e),this.overlayVisible&&this.hide(),!this.popup&&this.focusedOptionIndex!==e.id&&(this.focusedOptionIndex=e.id))},itemMouseMove:function(e){this.focused&&(this.focusedOptionIndex=e.id)},onListFocus:function(e){this.focused=!0,!this.popup&&this.changeFocusedOptionIndex(0),this.$emit(`focus`,e)},onListBlur:function(e){this.focused=!1,this.focusedOptionIndex=-1,this.$emit(`blur`,e)},onListKeyDown:function(e){switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Space`:this.onSpaceKey(e);break;case`Escape`:this.popup&&(S(this.target),this.hide());case`Tab`:this.overlayVisible&&this.hide()}},onArrowDownKey:function(e){var t=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t),e.preventDefault()},onArrowUpKey:function(e){if(e.altKey&&this.popup)S(this.target),this.hide(),e.preventDefault();else{var t=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t),e.preventDefault()}},onHomeKey:function(e){this.changeFocusedOptionIndex(0),e.preventDefault()},onEndKey:function(e){this.changeFocusedOptionIndex(x(this.container,`li[data-pc-section="item"][data-p-disabled="false"]`).length-1),e.preventDefault()},onEnterKey:function(e){var t=E(this.list,`li[id="${`${this.focusedOptionIndex}`}"]`),n=t&&E(t,`a[data-pc-section="itemlink"]`);this.popup&&S(this.target),n?n.click():t&&t.click(),e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},findNextOptionIndex:function(e){var t=W(x(this.container,`li[data-pc-section="item"][data-p-disabled="false"]`)).findIndex(function(t){return t.id===e});return t>-1?t+1:0},findPrevOptionIndex:function(e){var t=W(x(this.container,`li[data-pc-section="item"][data-p-disabled="false"]`)).findIndex(function(t){return t.id===e});return t>-1?t-1:0},changeFocusedOptionIndex:function(e){var t=x(this.container,`li[data-pc-section="item"][data-p-disabled="false"]`),n=e>=t.length?t.length-1:e<0?0:e;n>-1&&(this.focusedOptionIndex=t[n].getAttribute(`id`))},toggle:function(e,t){this.overlayVisible?this.hide():this.show(e,t)},show:function(e,t){this.overlayVisible=!0,this.target=t??e.currentTarget},hide:function(){this.overlayVisible=!1,this.target=null},onEnter:function(e){b(e,{position:`absolute`,top:`0`}),this.alignOverlay(),this.bindOutsideClickListener(),this.bindResizeListener(),this.bindScrollListener(),this.autoZIndex&&y.set(`menu`,e,this.baseZIndex+this.$primevue.config.zIndex.menu),this.popup&&S(this.list),this.$emit(`show`)},onLeave:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindScrollListener(),this.$emit(`hide`)},onAfterLeave:function(e){this.autoZIndex&&y.clear(e)},alignOverlay:function(){T(this.container,this.target),k(this.target)>k(this.container)&&(this.container.style.minWidth=k(this.target)+`px`)},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var n=e.container&&!e.container.contains(t.target),r=!e.target||e.target!==t.target&&!e.target.contains(t.target);e.overlayVisible&&n&&r?e.hide():!e.popup&&n&&r&&(e.focusedOptionIndex=-1)},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new M(this.target,function(){e.overlayVisible&&e.hide()}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!w()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},visible:function(e){return typeof e.visible==`function`?e.visible():e.visible!==!1},disabled:function(e){return typeof e.disabled==`function`?e.disabled():e.disabled},label:function(e){return typeof e.label==`function`?e.label():e.label},onOverlayClick:function(e){N.emit(`overlay-click`,{originalEvent:e,target:this.target})},containerRef:function(e){this.container=e},listRef:function(e){this.list=e}},computed:{focusedOptionId:function(){return this.focusedOptionIndex===-1?null:this.focusedOptionIndex},dataP:function(){return v({popup:this.popup})}},components:{PVMenuitem:L,Portal:P}},Z=[`id`,`data-p`],Q=[`id`,`tabindex`,`aria-activedescendant`,`aria-label`,`aria-labelledby`],$=[`id`];function ee(n,r,s,l,v,y){var b=t(`PVMenuitem`),x=t(`Portal`);return i(),h(x,{appendTo:n.appendTo,disabled:!n.popup},{default:c(function(){return[g(C,a({name:`p-anchored-overlay`,onEnter:y.onEnter,onLeave:y.onLeave,onAfterLeave:y.onAfterLeave},n.ptm(`transition`)),{default:c(function(){return[!n.popup||v.overlayVisible?(i(),f(`div`,a({key:0,ref:y.containerRef,id:n.$id,class:n.cx(`root`),onClick:r[3]||=function(){return y.onOverlayClick&&y.onOverlayClick.apply(y,arguments)},"data-p":y.dataP},n.ptmi(`root`)),[n.$slots.start?(i(),f(`div`,a({key:0,class:n.cx(`start`)},n.ptm(`start`)),[_(n.$slots,`start`)],16)):d(``,!0),p(`ul`,a({ref:y.listRef,id:n.$id+`_list`,class:n.cx(`list`),role:`menu`,tabindex:n.tabindex,"aria-activedescendant":v.focused?y.focusedOptionId:void 0,"aria-label":n.ariaLabel,"aria-labelledby":n.ariaLabelledby,onFocus:r[0]||=function(){return y.onListFocus&&y.onListFocus.apply(y,arguments)},onBlur:r[1]||=function(){return y.onListBlur&&y.onListBlur.apply(y,arguments)},onKeydown:r[2]||=function(){return y.onListKeyDown&&y.onListKeyDown.apply(y,arguments)}},n.ptm(`list`)),[(i(!0),f(m,null,o(n.model,function(t,r){return i(),f(m,{key:y.label(t)+r.toString()},[t.items&&y.visible(t)&&!t.separator?(i(),f(m,{key:0},[t.items?(i(),f(`li`,a({key:0,id:n.$id+`_`+r,class:[n.cx(`submenuLabel`),t.class],role:`none`},{ref_for:!0},n.ptm(`submenuLabel`)),[_(n.$slots,n.$slots.submenulabel?`submenulabel`:`submenuheader`,{item:t},function(){return[u(e(y.label(t)),1)]})],16,$)):d(``,!0),(i(!0),f(m,null,o(t.items,function(e,o){return i(),f(m,{key:e.label+r+`_`+o},[y.visible(e)&&!e.separator?(i(),h(b,{key:0,id:n.$id+`_`+r+`_`+o,item:e,templates:n.$slots,focusedOptionId:y.focusedOptionId,unstyled:n.unstyled,onItemClick:y.itemClick,onItemMousemove:y.itemMouseMove,pt:n.pt},null,8,[`id`,`item`,`templates`,`focusedOptionId`,`unstyled`,`onItemClick`,`onItemMousemove`,`pt`])):y.visible(e)&&e.separator?(i(),f(`li`,a({key:`separator`+r+o,class:[n.cx(`separator`),t.class],style:e.style,role:`separator`},{ref_for:!0},n.ptm(`separator`)),null,16)):d(``,!0)],64)}),128))],64)):y.visible(t)&&t.separator?(i(),f(`li`,a({key:`separator`+r.toString(),class:[n.cx(`separator`),t.class],style:t.style,role:`separator`},{ref_for:!0},n.ptm(`separator`)),null,16)):(i(),h(b,{key:y.label(t)+r.toString(),id:n.$id+`_`+r,item:t,index:r,templates:n.$slots,focusedOptionId:y.focusedOptionId,unstyled:n.unstyled,onItemClick:y.itemClick,onItemMousemove:y.itemMouseMove,pt:n.pt},null,8,[`id`,`item`,`index`,`templates`,`focusedOptionId`,`unstyled`,`onItemClick`,`onItemMousemove`,`pt`]))],64)}),128))],16,Q),n.$slots.end?(i(),f(`div`,a({key:1,class:n.cx(`end`)},n.ptm(`end`)),[_(n.$slots,`end`)],16)):d(``,!0)],16,Z)):d(``,!0)]}),_:3},16,[`onEnter`,`onLeave`,`onAfterLeave`])]}),_:3},8,[`appendTo`,`disabled`])}X.render=ee;export{X as default};