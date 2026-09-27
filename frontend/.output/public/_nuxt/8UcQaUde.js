import{At as e,B as t,Dt as n,H as r,I as i,O as a,R as o,V as s,X as c,Z as l,d as u,f as d,l as f,r as p,u as m,v as h}from"./Ca5TY7vb.js";import{t as g}from"./cO8iUN-n.js";import{F as _,J as v,Nt as y,Ot as b,Q as x,Rt as S,U as C,b as w,ct as T,gt as E,ht as D,kt as O,lt as k,o as A,w as j}from"#entry";import{t as M}from"./BAPwTHkl.js";import{t as N}from"./BnSyHpKn.js";import{t as P}from"./Bqeo7u7y.js";import{t as F}from"./Wn9AgR_U.js";var I=A.extend({name:`contextmenu`,style:`
    .p-contextmenu {
        background: dt('contextmenu.background');
        color: dt('contextmenu.color');
        border: 1px solid dt('contextmenu.border.color');
        border-radius: dt('contextmenu.border.radius');
        box-shadow: dt('contextmenu.shadow');
        min-width: 12.5rem;
    }

    .p-contextmenu-root-list,
    .p-contextmenu-submenu {
        margin: 0;
        padding: dt('contextmenu.list.padding');
        list-style: none;
        outline: 0 none;
        display: flex;
        flex-direction: column;
        gap: dt('contextmenu.list.gap');
    }

    .p-contextmenu-submenu {
        position: absolute;
        display: flex;
        flex-direction: column;
        min-width: 100%;
        z-index: 1;
        background: dt('contextmenu.background');
        color: dt('contextmenu.color');
        border: 1px solid dt('contextmenu.border.color');
        border-radius: dt('contextmenu.border.radius');
        box-shadow: dt('contextmenu.shadow');
    }

    .p-contextmenu-item {
        position: relative;
    }

    .p-contextmenu-item-content {
        transition:
            background dt('contextmenu.transition.duration'),
            color dt('contextmenu.transition.duration');
        border-radius: dt('contextmenu.item.border.radius');
        color: dt('contextmenu.item.color');
    }

    .p-contextmenu-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('contextmenu.item.padding');
        gap: dt('contextmenu.item.gap');
        user-select: none;
    }

    .p-contextmenu-item-label {
        line-height: 1;
    }

    .p-contextmenu-item-icon {
        color: dt('contextmenu.item.icon.color');
    }

    .p-contextmenu-submenu-icon {
        color: dt('contextmenu.submenu.icon.color');
        margin-left: auto;
        font-size: dt('contextmenu.submenu.icon.size');
        width: dt('contextmenu.submenu.icon.size');
        height: dt('contextmenu.submenu.icon.size');
    }

    .p-contextmenu-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-contextmenu-item.p-focus > .p-contextmenu-item-content {
        color: dt('contextmenu.item.focus.color');
        background: dt('contextmenu.item.focus.background');
    }

    .p-contextmenu-item.p-focus > .p-contextmenu-item-content .p-contextmenu-item-icon {
        color: dt('contextmenu.item.icon.focus.color');
    }

    .p-contextmenu-item.p-focus > .p-contextmenu-item-content .p-contextmenu-submenu-icon {
        color: dt('contextmenu.submenu.icon.focus.color');
    }

    .p-contextmenu-item:not(.p-disabled) > .p-contextmenu-item-content:hover {
        color: dt('contextmenu.item.focus.color');
        background: dt('contextmenu.item.focus.background');
    }

    .p-contextmenu-item:not(.p-disabled) > .p-contextmenu-item-content:hover .p-contextmenu-item-icon {
        color: dt('contextmenu.item.icon.focus.color');
    }

    .p-contextmenu-item:not(.p-disabled) > .p-contextmenu-item-content:hover .p-contextmenu-submenu-icon {
        color: dt('contextmenu.submenu.icon.focus.color');
    }

    .p-contextmenu-item-active > .p-contextmenu-item-content {
        color: dt('contextmenu.item.active.color');
        background: dt('contextmenu.item.active.background');
    }

    .p-contextmenu-item-active > .p-contextmenu-item-content .p-contextmenu-item-icon {
        color: dt('contextmenu.item.icon.active.color');
    }

    .p-contextmenu-item-active > .p-contextmenu-item-content .p-contextmenu-submenu-icon {
        color: dt('contextmenu.submenu.icon.active.color');
    }

    .p-contextmenu-separator {
        border-block-start: 1px solid dt('contextmenu.separator.border.color');
    }

    .p-contextmenu-mobile .p-contextmenu-submenu {
        position: static;
        box-shadow: none;
        border: 0 none;
        padding-inline-start: dt('tieredmenu.submenu.mobile.indent');
        padding-inline-end: 0;
    }

    .p-contextmenu-mobile .p-contextmenu-submenu-icon {
        transition: transform 0.2s;
        transform: rotate(90deg);
    }

    .p-contextmenu-mobile .p-contextmenu-item-active > .p-contextmenu-item-content .p-contextmenu-submenu-icon {
        transform: rotate(-90deg);
    }
`,classes:{root:function(e){return[`p-contextmenu p-component`,{"p-contextmenu-mobile":e.instance.queryMatches}]},rootList:`p-contextmenu-root-list`,item:function(e){var t=e.instance,n=e.processedItem;return[`p-contextmenu-item`,{"p-contextmenu-item-active":t.isItemActive(n),"p-focus":t.isItemFocused(n),"p-disabled":t.isItemDisabled(n)}]},itemContent:`p-contextmenu-item-content`,itemLink:`p-contextmenu-item-link`,itemIcon:`p-contextmenu-item-icon`,itemLabel:`p-contextmenu-item-label`,submenuIcon:`p-contextmenu-submenu-icon`,submenu:`p-contextmenu-submenu`,separator:`p-contextmenu-separator`}}),L={name:`BaseContextMenu`,extends:M,props:{model:{type:Array,default:null},appendTo:{type:[String,Object],default:`body`},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},global:{type:Boolean,default:!1},breakpoint:{type:String,default:`960px`},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:I,provide:function(){return{$pcContextMenu:this,$parentInstance:this}}},R={name:`ContextMenuSub`,hostName:`ContextMenu`,extends:M,emits:[`item-click`,`item-mouseenter`,`item-mousemove`],props:{items:{type:Array,default:null},menuId:{type:String,default:null},focusedItemId:{type:String,default:null},root:{type:Boolean,default:!1},visible:{type:Boolean,default:!1},level:{type:Number,default:0},templates:{type:Object,default:null},activeItemPath:{type:Object,default:null},tabindex:{type:Number,default:0}},methods:{getItemId:function(e){return`${this.menuId}_${e.key}`},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,n){return e&&e.item?O(e.item[t],n):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},getItemLabelId:function(e){return`${this.menuId}_${e.key}_label`},getPTOptions:function(e,t,n){return this.ptm(e,{context:{item:t.item,active:this.isItemActive(t),focused:this.isItemFocused(t),disabled:this.isItemDisabled(t),index:n}})},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return y(e.items)},onItemClick:function(e,t){this.getItemProp(t,`command`,{originalEvent:e,item:t.item}),this.$emit(`item-click`,{originalEvent:e,processedItem:t,isFocus:!0})},onItemMouseEnter:function(e,t){this.$emit(`item-mouseenter`,{originalEvent:e,processedItem:t})},onItemMouseMove:function(e,t){this.$emit(`item-mousemove`,{originalEvent:e,processedItem:t,isFocus:!0})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,`separator`)}).length},getAriaPosInset:function(e){var t=this;return e-this.items.slice(0,e).filter(function(e){return t.isItemVisible(e)&&t.getItemProp(e,`separator`)}).length+1},onEnter:function(){k(this.$refs.container,this.level)},getMenuItemProps:function(e,t){return{action:a({class:this.cx(`itemLink`),tabindex:-1},this.getPTOptions(`itemLink`,e,t)),icon:a({class:[this.cx(`itemIcon`),this.getItemProp(e,`icon`)]},this.getPTOptions(`itemIcon`,e,t)),label:a({class:this.cx(`itemLabel`)},this.getPTOptions(`itemLabel`,e,t)),submenuicon:a({class:this.cx(`submenuIcon`)},this.getPTOptions(`submenuicon`,e,t))}}},components:{AngleRightIcon:F},directives:{ripple:N}},z=[`tabindex`],B=[`id`,`aria-label`,`aria-disabled`,`aria-expanded`,`aria-haspopup`,`aria-level`,`aria-setsize`,`aria-posinset`,`data-p-active`,`data-p-focused`,`data-p-disabled`],V=[`onClick`,`onMouseenter`,`onMousemove`],H=[`href`,`target`],U=[`id`],W=[`id`];function G(h,g,_,v,y,b){var x=t(`AngleRightIcon`),C=t(`ContextMenuSub`,!0),w=s(`ripple`);return i(),m(S,a({name:`p-anchored-overlay`,onEnter:b.onEnter},h.ptm(`menu.transition`)),{default:c(function(){return[_.root||_.visible?(i(),d(`ul`,a({key:0,ref:`container`,tabindex:_.tabindex},h.ptm(`rootList`)),[(i(!0),d(p,null,o(_.items,function(t,o){return i(),d(p,{key:b.getItemKey(t)},[b.isItemVisible(t)&&!b.getItemProp(t,`separator`)?(i(),d(`li`,a({key:0,id:b.getItemId(t),style:b.getItemProp(t,`style`),class:[h.cx(`item`,{processedItem:t}),b.getItemProp(t,`class`)],role:`menuitem`,"aria-label":b.getItemLabel(t),"aria-disabled":b.isItemDisabled(t)||void 0,"aria-expanded":b.isItemGroup(t)?b.isItemActive(t):void 0,"aria-haspopup":b.isItemGroup(t)&&!b.getItemProp(t,`to`)?`menu`:void 0,"aria-level":_.level+1,"aria-setsize":b.getAriaSetSize(),"aria-posinset":b.getAriaPosInset(o)},{ref_for:!0},b.getPTOptions(`item`,t,o),{"data-p-active":b.isItemActive(t),"data-p-focused":b.isItemFocused(t),"data-p-disabled":b.isItemDisabled(t)}),[f(`div`,a({class:h.cx(`itemContent`),onClick:function(e){return b.onItemClick(e,t)},onMouseenter:function(e){return b.onItemMouseEnter(e,t)},onMousemove:function(e){return b.onItemMouseMove(e,t)}},{ref_for:!0},b.getPTOptions(`itemContent`,t,o)),[_.templates.item?(i(),m(r(_.templates.item),{key:1,item:t.item,hasSubmenu:b.getItemProp(t,`items`),label:b.getItemLabel(t),props:b.getMenuItemProps(t,o)},null,8,[`item`,`hasSubmenu`,`label`,`props`])):l((i(),d(`a`,a({key:0,href:b.getItemProp(t,`url`),class:h.cx(`itemLink`),target:b.getItemProp(t,`target`),tabindex:`-1`},{ref_for:!0},b.getPTOptions(`itemLink`,t,o)),[_.templates.itemicon?(i(),m(r(_.templates.itemicon),{key:0,item:t.item,class:n(h.cx(`itemIcon`))},null,8,[`item`,`class`])):b.getItemProp(t,`icon`)?(i(),d(`span`,a({key:1,class:[h.cx(`itemIcon`),b.getItemProp(t,`icon`)]},{ref_for:!0},b.getPTOptions(`itemIcon`,t,o)),null,16)):u(``,!0),f(`span`,a({id:b.getItemLabelId(t),class:h.cx(`itemLabel`)},{ref_for:!0},b.getPTOptions(`itemLabel`,t,o)),e(b.getItemLabel(t)),17,U),b.getItemProp(t,`items`)?(i(),d(p,{key:2},[_.templates.submenuicon?(i(),m(r(_.templates.submenuicon),{key:0,active:b.isItemActive(t),class:n(h.cx(`submenuIcon`))},null,8,[`active`,`class`])):(i(),m(x,a({key:1,class:h.cx(`submenuIcon`)},{ref_for:!0},b.getPTOptions(`submenuicon`,t,o)),null,16,[`class`]))],64)):u(``,!0)],16,H)),[[w]])],16,V),b.isItemVisible(t)&&b.isItemGroup(t)?(i(),m(C,a({key:0,id:b.getItemId(t)+`_list`,role:`menu`,class:h.cx(`submenu`),menuId:_.menuId,focusedItemId:_.focusedItemId,items:t.items,templates:_.templates,activeItemPath:_.activeItemPath,level:_.level+1,visible:b.isItemActive(t)&&b.isItemGroup(t),pt:h.pt,unstyled:h.unstyled,onItemClick:g[0]||=function(e){return h.$emit(`item-click`,e)},onItemMouseenter:g[1]||=function(e){return h.$emit(`item-mouseenter`,e)},onItemMousemove:g[2]||=function(e){return h.$emit(`item-mousemove`,e)},"aria-labelledby":b.getItemLabelId(t)},{ref_for:!0},h.ptm(`submenu`)),null,16,[`id`,`class`,`menuId`,`focusedItemId`,`items`,`templates`,`activeItemPath`,`level`,`visible`,`pt`,`unstyled`,`aria-labelledby`])):u(``,!0)],16,B)):u(``,!0),b.isItemVisible(t)&&b.getItemProp(t,`separator`)?(i(),d(`li`,a({key:1,id:b.getItemId(t),style:b.getItemProp(t,`style`),class:[h.cx(`separator`),b.getItemProp(t,`class`)],role:`separator`},{ref_for:!0},h.ptm(`separator`)),null,16,W)):u(``,!0)],64)}),128))],16,z)):u(``,!0)]}),_:1},16,[`onEnter`])}R.render=G;var K={name:`ContextMenu`,extends:L,inheritAttrs:!1,emits:[`focus`,`blur`,`show`,`hide`,`before-show`,`before-hide`],target:null,outsideClickListener:null,resizeListener:null,documentContextMenuListener:null,matchMediaListener:null,pageX:null,pageY:null,container:null,list:null,data:function(){return{focused:!1,focusedItemInfo:{index:-1,level:0,parentKey:``},activeItemPath:[],visible:!1,submenuVisible:!1,query:null,queryMatches:!1}},watch:{activeItemPath:function(e){y(e)?(this.bindOutsideClickListener(),this.bindResizeListener()):this.visible||(this.unbindOutsideClickListener(),this.unbindResizeListener())}},mounted:function(){this.bindMatchMediaListener(),this.global&&this.bindDocumentContextMenuListener()},beforeUnmount:function(){this.unbindResizeListener(),this.unbindOutsideClickListener(),this.unbindDocumentContextMenuListener(),this.unbindMatchMediaListener(),this.container&&this.autoZIndex&&g.clear(this.container),this.target=null,this.container=null},methods:{getItemProp:function(e,t){return e?O(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemGroup:function(e){return y(this.getItemProp(e,`items`))},isItemSeparator:function(e){return this.getItemProp(e,`separator`)},getProccessedItemLabel:function(e){return e?this.getItemLabel(e.item):void 0},isProccessedItemGroup:function(e){return e&&y(e.items)},toggle:function(e){this.visible?this.hide():this.show(e)},show:function(e){this.$emit(`before-show`),this.activeItemPath=[],this.focusedItemInfo={index:-1,level:0,parentKey:``},v(this.list),this.pageX=e.pageX,this.pageY=e.pageY,this.visible?this.position():this.visible=!0,e.stopPropagation(),e.preventDefault()},hide:function(){this.$emit(`before-hide`),this.visible=!1,this.activeItemPath=[],this.focusedItemInfo={index:-1,level:0,parentKey:``}},onFocus:function(e){this.focused=!0,this.focusedItemInfo=this.focusedItemInfo.index===-1?{index:-1,level:0,parentKey:``}:this.focusedItemInfo,this.$emit(`focus`,e)},onBlur:function(e){this.focused=!1,this.focusedItemInfo={index:-1,level:0,parentKey:``},this.searchValue=``,this.$emit(`blur`,e)},onKeyDown:function(e){var t=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`ArrowRight`:this.onArrowRightKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Space`:this.onSpaceKey(e);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`PageDown`:case`PageUp`:case`Backspace`:case`ShiftLeft`:case`ShiftRight`:break;default:!t&&D(e.key)&&this.searchItems(e,e.key)}},onItemChange:function(e,t){var n=e.processedItem,r=e.isFocus;if(!b(n)){var i=n.index,a=n.key,o=n.level,s=n.parentKey,c=n.items,l=y(c),u=this.activeItemPath.filter(function(e){return e.parentKey!==s&&e.parentKey!==a});l&&(u.push(n),this.submenuVisible=!0),this.focusedItemInfo={index:i,level:o,parentKey:s},r&&v(this.list),!(t===`hover`&&this.queryMatches)&&(this.activeItemPath=u)}},onItemClick:function(e){var t=e.processedItem,n=this.isProccessedItemGroup(t);if(this.isSelected(t)){var r=t.index,i=t.key,a=t.level,o=t.parentKey;this.activeItemPath=this.activeItemPath.filter(function(e){return i!==e.key&&i.startsWith(e.key)}),this.focusedItemInfo={index:r,level:a,parentKey:o},v(this.list)}else n?this.onItemChange(e):this.hide()},onItemMouseEnter:function(e){this.onItemChange(e,`hover`)},onItemMouseMove:function(e){this.focused&&this.changeFocusedItemIndex(e,e.processedItem.index)},onArrowDownKey:function(e){var t=this.focusedItemInfo.index===-1?this.findFirstFocusedItemIndex():this.findNextItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,t),e.preventDefault()},onArrowUpKey:function(e){if(e.altKey){if(this.focusedItemInfo.index!==-1){var t=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(t)&&this.onItemChange({originalEvent:e,processedItem:t})}this.popup&&this.hide(),e.preventDefault()}else{var n=this.focusedItemInfo.index===-1?this.findLastFocusedItemIndex():this.findPrevItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,n),e.preventDefault()}},onArrowLeftKey:function(e){var t=this,n=this.visibleItems[this.focusedItemInfo.index],r=this.activeItemPath.find(function(e){return e.key===n.parentKey});b(n.parent)||(this.focusedItemInfo={index:-1,parentKey:r?r.parentKey:``},this.searchValue=``,this.onArrowDownKey(e)),this.activeItemPath=this.activeItemPath.filter(function(e){return e.parentKey!==t.focusedItemInfo.parentKey}),e.preventDefault()},onArrowRightKey:function(e){var t=this.visibleItems[this.focusedItemInfo.index];this.isProccessedItemGroup(t)&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,parentKey:t.key},this.searchValue=``,this.onArrowDownKey(e)),e.preventDefault()},onHomeKey:function(e){this.changeFocusedItemIndex(e,this.findFirstItemIndex()),e.preventDefault()},onEndKey:function(e){this.changeFocusedItemIndex(e,this.findLastItemIndex()),e.preventDefault()},onEnterKey:function(e){if(this.focusedItemInfo.index!==-1){var t=T(this.list,`li[id="${`${this.focusedItemIdx}`}"]`),n=t&&T(t,`[data-pc-section="itemlink"]`);n?n.click():t&&t.click();var r=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(r)&&(this.focusedItemInfo.index=this.findFirstFocusedItemIndex())}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onEscapeKey:function(e){this.hide(),!this.popup&&(this.focusedItemInfo.index=this.findFirstFocusedItemIndex()),e.preventDefault()},onTabKey:function(e){if(this.focusedItemInfo.index!==-1){var t=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(t)&&this.onItemChange({originalEvent:e,processedItem:t})}this.hide()},onEnter:function(e){_(e,{position:`absolute`}),this.position(),this.autoZIndex&&g.set(`menu`,e,this.baseZIndex+this.$primevue.config.zIndex.menu)},onAfterEnter:function(){this.bindOutsideClickListener(),this.bindResizeListener(),this.$emit(`show`),v(this.list)},onLeave:function(){this.$emit(`hide`),this.container=null},onAfterLeave:function(e){this.autoZIndex&&g.clear(e),this.unbindOutsideClickListener(),this.unbindResizeListener()},position:function(){var e=this.pageX+1,t=this.pageY+1,n=this.container.offsetParent?this.container.offsetWidth:j(this.container),r=this.container.offsetParent?this.container.offsetHeight:w(this.container),i=x(),a=window.scrollY||document.documentElement.scrollTop||document.body.scrollTop||0,o=window.scrollX||document.documentElement.scrollLeft||document.body.scrollLeft||0;e+n-o>i.width&&(e-=n),t+r-a>i.height&&(t-=r),e<o&&(e=o),t<a&&(t=a),this.container.style.left=e+`px`,this.container.style.top=t+`px`},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var n=e.container&&!e.container.contains(t.target),r=!e.visible||!e.target||e.target!==t.target&&!e.target.contains(t.target);n&&r&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.visible&&!C()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},bindDocumentContextMenuListener:function(){var e=this;this.documentContextMenuListener||(this.documentContextMenuListener=function(t){t.button===2&&e.show(t)},document.addEventListener(`contextmenu`,this.documentContextMenuListener))},unbindDocumentContextMenuListener:function(){this.documentContextMenuListener&&=(document.removeEventListener(`contextmenu`,this.documentContextMenuListener),null)},bindMatchMediaListener:function(){var e=this;if(!this.matchMediaListener){var t=matchMedia(`(max-width: ${this.breakpoint})`);this.query=t,this.queryMatches=t.matches,this.matchMediaListener=function(){e.queryMatches=t.matches},this.query.addEventListener(`change`,this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&=(this.query.removeEventListener(`change`,this.matchMediaListener),null)},isItemMatched:function(e){return this.isValidItem(e)&&this.getProccessedItemLabel(e)?.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase())},isValidItem:function(e){return!!e&&!this.isItemDisabled(e.item)&&!this.isItemSeparator(e.item)&&this.isItemVisible(e.item)},isValidSelectedItem:function(e){return this.isValidItem(e)&&this.isSelected(e)},isSelected:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},findFirstItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidItem(t)})},findLastItemIndex:function(){var e=this;return E(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItemIndex:function(e){var t=this,n=e<this.visibleItems.length-1?this.visibleItems.slice(e+1).findIndex(function(e){return t.isValidItem(e)}):-1;return n>-1?n+e+1:e},findPrevItemIndex:function(e){var t=this,n=e>0?E(this.visibleItems.slice(0,e),function(e){return t.isValidItem(e)}):-1;return n>-1?n:e},findSelectedItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidSelectedItem(t)})},findFirstFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findFirstItemIndex():e},findLastFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findLastItemIndex():e},searchItems:function(e,t){var n=this;this.searchValue=(this.searchValue||``)+t;var r=-1,i=!1;return this.focusedItemInfo.index===-1?r=this.visibleItems.findIndex(function(e){return n.isItemMatched(e)}):(r=this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function(e){return n.isItemMatched(e)}),r=r===-1?this.visibleItems.slice(0,this.focusedItemInfo.index).findIndex(function(e){return n.isItemMatched(e)}):r+this.focusedItemInfo.index),r!==-1&&(i=!0),r===-1&&this.focusedItemInfo.index===-1&&(r=this.findFirstFocusedItemIndex()),r!==-1&&this.changeFocusedItemIndex(e,r),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){n.searchValue=``,n.searchTimeout=null},500),i},changeFocusedItemIndex:function(e,t){this.focusedItemInfo.index!==t&&(this.focusedItemInfo.index=t,this.scrollInView())},scrollInView:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1,t=e===-1?this.focusedItemIdx:`${this.$id}_${e}`,n=T(this.list,`li[id="${t}"]`);n&&n.scrollIntoView&&n.scrollIntoView({block:`nearest`,inline:`start`})},createProcessedItems:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:``,a=[];return e&&e.forEach(function(e,o){var s=(i===``?``:i+`_`)+o,c={item:e,index:o,level:n,key:s,parent:r,parentKey:i};c.items=t.createProcessedItems(e.items,n+1,c,s),a.push(c)}),a},containerRef:function(e){this.container=e},listRef:function(e){this.list=e?e.$el:void 0}},computed:{processedItems:function(){return this.createProcessedItems(this.model||[])},visibleItems:function(){var e=this,t=this.activeItemPath.find(function(t){return t.key===e.focusedItemInfo.parentKey});return t?t.items:this.processedItems},focusedItemIdx:function(){return this.focusedItemInfo.index===-1?null:`${this.$id}${y(this.focusedItemInfo.parentKey)?`_`+this.focusedItemInfo.parentKey:``}_${this.focusedItemInfo.index}`}},components:{ContextMenuSub:R,Portal:P}};function q(e,r,o,s,l,f){var p=t(`ContextMenuSub`),g=t(`Portal`);return i(),m(g,{appendTo:e.appendTo},{default:c(function(){return[h(S,a({name:`p-anchored-overlay`,onEnter:f.onEnter,onAfterEnter:f.onAfterEnter,onLeave:f.onLeave,onAfterLeave:f.onAfterLeave},e.ptm(`transition`)),{default:c(function(){return[l.visible?(i(),d(`div`,a({key:0,ref:f.containerRef,class:e.cx(`root`)},e.ptmi(`root`)),[h(p,{ref:f.listRef,id:e.$id+`_list`,class:n(e.cx(`rootList`)),role:`menubar`,root:!0,tabindex:e.tabindex,"aria-orientation":`vertical`,"aria-activedescendant":l.focused?f.focusedItemIdx:void 0,menuId:e.$id,focusedItemId:l.focused?f.focusedItemIdx:void 0,items:f.processedItems,templates:e.$slots,activeItemPath:l.activeItemPath,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,level:0,visible:l.submenuVisible,pt:e.pt,unstyled:e.unstyled,onFocus:f.onFocus,onBlur:f.onBlur,onKeydown:f.onKeyDown,onItemClick:f.onItemClick,onItemMouseenter:f.onItemMouseEnter,onItemMousemove:f.onItemMouseMove},null,8,[`id`,`class`,`tabindex`,`aria-activedescendant`,`menuId`,`focusedItemId`,`items`,`templates`,`activeItemPath`,`aria-labelledby`,`aria-label`,`visible`,`pt`,`unstyled`,`onFocus`,`onBlur`,`onKeydown`,`onItemClick`,`onItemMouseenter`,`onItemMousemove`])],16)):u(``,!0)]}),_:1},16,[`onEnter`,`onAfterEnter`,`onLeave`,`onAfterLeave`])]}),_:1},8,[`appendTo`])}K.render=q;export{K as default};