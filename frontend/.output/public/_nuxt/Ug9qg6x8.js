import{At as e,B as t,C as n,Dt as r,H as i,I as a,O as o,Ot as s,R as c,V as l,Z as u,d,f,kt as p,l as m,r as h,u as g,v as _,z as v}from"./Ca5TY7vb.js";import{t as y}from"./cO8iUN-n.js";import{J as b,Nt as x,Ot as S,U as C,ct as w,gt as T,ht as E,kt as D,o as O}from"#entry";import{t as k}from"./BAPwTHkl.js";import{t as A}from"./BnSyHpKn.js";import{t as j}from"./Wn9AgR_U.js";import{t as M}from"./BKJPl1I7.js";import{t as N}from"./ClkZMcUw.js";var P=O.extend({name:`megamenu`,style:`
    .p-megamenu {
        position: relative;
        display: flex;
        align-items: center;
        background: dt('megamenu.background');
        border: 1px solid dt('megamenu.border.color');
        border-radius: dt('megamenu.border.radius');
        color: dt('megamenu.color');
        gap: dt('megamenu.gap');
    }

    .p-megamenu-start,
    .p-megamenu-end {
        display: flex;
        align-items: center;
    }

    .p-megamenu-root-list {
        margin: 0;
        padding: 0;
        list-style: none;
        outline: 0 none;
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: dt('megamenu.gap');
    }

    .p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content {
        border-radius: dt('megamenu.base.item.border.radius');
    }

    .p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content > .p-megamenu-item-link {
        padding: dt('megamenu.base.item.padding');
    }

    .p-megamenu-item-content {
        transition:
            background dt('megamenu.transition.duration'),
            color dt('megamenu.transition.duration');
        border-radius: dt('megamenu.item.border.radius');
        color: dt('megamenu.item.color');
    }

    .p-megamenu-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('megamenu.item.padding');
        gap: dt('megamenu.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-megamenu-item-label {
        line-height: 1;
    }

    .p-megamenu-item-icon {
        color: dt('megamenu.item.icon.color');
    }

    .p-megamenu-submenu-icon {
        color: dt('megamenu.submenu.icon.color');
        font-size: dt('megamenu.submenu.icon.size');
        width: dt('megamenu.submenu.icon.size');
        height: dt('megamenu.submenu.icon.size');
    }

    .p-megamenu-item.p-focus > .p-megamenu-item-content {
        color: dt('megamenu.item.focus.color');
        background: dt('megamenu.item.focus.background');
    }

    .p-megamenu-item.p-focus > .p-megamenu-item-content .p-megamenu-item-icon {
        color: dt('megamenu.item.icon.focus.color');
    }

    .p-megamenu-item.p-focus > .p-megamenu-item-content .p-megamenu-submenu-icon {
        color: dt('megamenu.submenu.icon.focus.color');
    }

    .p-megamenu-item:not(.p-disabled) > .p-megamenu-item-content:hover {
        color: dt('megamenu.item.focus.color');
        background: dt('megamenu.item.focus.background');
    }

    .p-megamenu-item:not(.p-disabled) > .p-megamenu-item-content:hover .p-megamenu-item-icon {
        color: dt('megamenu.item.icon.focus.color');
    }

    .p-megamenu-item:not(.p-disabled) > .p-megamenu-item-content:hover .p-megamenu-submenu-icon {
        color: dt('megamenu.submenu.icon.focus.color');
    }

    .p-megamenu-item-active > .p-megamenu-item-content {
        color: dt('megamenu.item.active.color');
        background: dt('megamenu.item.active.background');
    }

    .p-megamenu-item-active > .p-megamenu-item-content .p-megamenu-item-icon {
        color: dt('megamenu.item.icon.active.color');
    }

    .p-megamenu-item-active > .p-megamenu-item-content .p-megamenu-submenu-icon {
        color: dt('megamenu.submenu.icon.active.color');
    }

    .p-megamenu-overlay {
        display: none;
        position: absolute;
        width: auto;
        z-index: 1;
        left: 0;
        min-width: 100%;
        padding: dt('megamenu.overlay.padding');
        background: dt('megamenu.overlay.background');
        color: dt('megamenu.overlay.color');
        border: 1px solid dt('megamenu.overlay.border.color');
        border-radius: dt('megamenu.overlay.border.radius');
        box-shadow: dt('megamenu.overlay.shadow');
    }

    .p-megamenu-overlay:dir(rtl) {
        left: auto;
        right: 0;
    }

    .p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-overlay {
        display: block;
    }

    .p-megamenu-submenu {
        margin: 0;
        list-style: none;
        padding: dt('megamenu.submenu.padding');
        min-width: 12.5rem;
        display: flex;
        flex-direction: column;
        gap: dt('megamenu.submenu.gap');
    }

    .p-megamenu-submenu-label {
        padding: dt('megamenu.submenu.label.padding');
        color: dt('megamenu.submenu.label.color');
        font-weight: dt('megamenu.submenu.label.font.weight');
        background: dt('megamenu.submenu.label.background');
    }

    .p-megamenu-separator {
        border-block-start: 1px solid dt('megamenu.separator.border.color');
    }

    .p-megamenu-horizontal {
        align-items: center;
        padding: dt('megamenu.horizontal.orientation.padding');
    }

    .p-megamenu-horizontal .p-megamenu-root-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: dt('megamenu.horizontal.orientation.gap');
    }

    .p-megamenu-horizontal .p-megamenu-end {
        margin-left: auto;
        align-self: center;
    }

    .p-megamenu-horizontal .p-megamenu-end:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-megamenu-vertical {
        display: inline-flex;
        min-width: 12.5rem;
        flex-direction: column;
        align-items: stretch;
        padding: dt('megamenu.vertical.orientation.padding');
    }

    .p-megamenu-vertical .p-megamenu-root-list {
        align-items: stretch;
        flex-direction: column;
        gap: dt('megamenu.vertical.orientation.gap');
    }

    .p-megamenu-vertical .p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-overlay {
        left: 100%;
        top: 0;
    }

    .p-megamenu-vertical .p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-overlay:dir(rtl) {
        left: auto;
        right: 100%;
    }

    .p-megamenu-vertical .p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content .p-megamenu-submenu-icon {
        margin-left: auto;
    }

    .p-megamenu-vertical .p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content .p-megamenu-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
        transform: rotate(180deg);
    }

    .p-megamenu-grid {
        display: flex;
    }

    .p-megamenu-col-2,
    .p-megamenu-col-3,
    .p-megamenu-col-4,
    .p-megamenu-col-6,
    .p-megamenu-col-12 {
        flex: 0 0 auto;
        padding: dt('megamenu.overlay.gap');
    }

    .p-megamenu-col-2 {
        width: 16.6667%;
    }

    .p-megamenu-col-3 {
        width: 25%;
    }

    .p-megamenu-col-4 {
        width: 33.3333%;
    }

    .p-megamenu-col-6 {
        width: 50%;
    }

    .p-megamenu-col-12 {
        width: 100%;
    }

    .p-megamenu-button {
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: dt('megamenu.mobile.button.size');
        height: dt('megamenu.mobile.button.size');
        position: relative;
        color: dt('megamenu.mobile.button.color');
        border: 0 none;
        background: transparent;
        border-radius: dt('megamenu.mobile.button.border.radius');
        transition:
            background dt('megamenu.transition.duration'),
            color dt('megamenu.transition.duration'),
            outline-color dt('megamenu.transition.duration'),
            box-shadow dt('megamenu.transition.duration');
        outline-color: transparent;
    }

    .p-megamenu-button:hover {
        color: dt('megamenu.mobile.button.hover.color');
        background: dt('megamenu.mobile.button.hover.background');
    }

    .p-megamenu-button:focus-visible {
        box-shadow: dt('megamenu.mobile.button.focus.ring.shadow');
        outline: dt('megamenu.mobile.button.focus.ring.width') dt('megamenu.mobile.button.focus.ring.style') dt('megamenu.mobile.button.focus.ring.color');
        outline-offset: dt('megamenu.mobile.button.focus.ring.offset');
    }

    .p-megamenu-mobile {
        display: flex;
    }

    .p-megamenu-mobile .p-megamenu-button {
        display: flex;
    }

    .p-megamenu-mobile .p-megamenu-root-list {
        position: absolute;
        display: none;
        flex-direction: column;
        top: 100%;
        left: 0;
        z-index: 1;
        width: 100%;
        padding: dt('megamenu.submenu.padding');
        gap: dt('megamenu.submenu.gap');
        background: dt('megamenu.overlay.background');
        border: 1px solid dt('megamenu.overlay.border.color');
        box-shadow: dt('megamenu.overlay.shadow');
    }

    .p-megamenu-mobile .p-megamenu-root-list:dir(rtl) {
        left: auto;
        right: 0;
    }

    .p-megamenu-mobile-active .p-megamenu-root-list {
        display: block;
    }

    .p-megamenu-mobile .p-megamenu-root-list .p-megamenu-item {
        width: 100%;
        position: static;
    }

    .p-megamenu-mobile .p-megamenu-overlay {
        position: static;
        border: 0 none;
        border-radius: 0;
        box-shadow: none;
    }

    .p-megamenu-mobile .p-megamenu-grid {
        flex-wrap: wrap;
        overflow: auto;
        max-height: 90%;
    }

    .p-megamenu-mobile .p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content .p-megamenu-submenu-icon {
        margin-left: auto;
        transition: transform 0.2s;
    }

    .p-megamenu-mobile .p-megamenu-root-list > .p-megamenu-item > .p-megamenu-item-content .p-megamenu-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-megamenu-mobile .p-megamenu-root-list > .p-megamenu-item-active > .p-megamenu-item-content .p-megamenu-submenu-icon {
        transform: rotate(-180deg);
    }
`,classes:{root:function(e){var t=e.instance;return[`p-megamenu p-component`,{"p-megamenu-mobile":t.queryMatches,"p-megamenu-mobile-active":t.mobileActive,"p-megamenu-horizontal":t.horizontal,"p-megamenu-vertical":t.vertical}]},start:`p-megamenu-start`,button:`p-megamenu-button`,rootList:`p-megamenu-root-list`,submenuLabel:function(e){var t=e.instance,n=e.processedItem;return[`p-megamenu-submenu-label`,{"p-disabled":t.isItemDisabled(n)}]},item:function(e){var t=e.instance,n=e.processedItem;return[`p-megamenu-item`,{"p-megamenu-item-active":t.isItemActive(n),"p-focus":t.isItemFocused(n),"p-disabled":t.isItemDisabled(n)}]},itemContent:`p-megamenu-item-content`,itemLink:`p-megamenu-item-link`,itemIcon:`p-megamenu-item-icon`,itemLabel:`p-megamenu-item-label`,submenuIcon:`p-megamenu-submenu-icon`,overlay:`p-megamenu-overlay`,grid:`p-megamenu-grid`,column:function(e){var t=e.instance,n=e.processedItem,r=t.isItemGroup(n)?n.items.length:0,i;if(t.$parentInstance.queryMatches)i=`p-megamenu-col-12`;else switch(r){case 2:i=`p-megamenu-col-6`;break;case 3:i=`p-megamenu-col-4`;break;case 4:i=`p-megamenu-col-3`;break;case 6:i=`p-megamenu-col-2`;break;default:i=`p-megamenu-col-12`}return i},submenu:`p-megamenu-submenu`,separator:`p-megamenu-separator`,end:`p-megamenu-end`},inlineStyles:{rootList:function(e){return{"max-height":e.props.scrollHeight,overflow:`auto`}}}}),F={name:`BaseMegaMenu`,extends:k,props:{model:{type:Array,default:null},orientation:{type:String,default:`horizontal`},breakpoint:{type:String,default:`960px`},disabled:{type:Boolean,default:!1},tabindex:{type:Number,default:0},scrollHeight:{type:String,default:`20rem`},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:P,provide:function(){return{$pcMegaMenu:this,$parentInstance:this}}},I={name:`MegaMenuSub`,hostName:`MegaMenu`,extends:k,emits:[`item-click`,`item-mouseenter`],props:{menuId:{type:String,default:null},focusedItemId:{type:String,default:null},horizontal:{type:Boolean,default:!1},submenu:{type:Object,default:null},mobileActive:{type:Boolean,default:!1},items:{type:Array,default:null},level:{type:Number,default:0},templates:{type:Object,default:null},activeItem:{type:Object,default:null},tabindex:{type:Number,default:0}},methods:{getSubListId:function(e){return`${this.getItemId(e)}_list`},getSubListKey:function(e){return this.getSubListId(e)},getItemId:function(e){return`${this.menuId}_${e.key}`},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,n){return e&&e.item?D(e.item[t],n):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},getPTOptions:function(e,t,n){return this.ptm(n,{context:{item:e.item,index:t,active:this.isItemActive(e),focused:this.isItemFocused(e),disabled:this.isItemDisabled(e)}})},isItemActive:function(e){return x(this.activeItem)?this.activeItem.key===e.key:!1},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return x(e.items)},onItemClick:function(e,t){this.getItemProp(t,`command`,{originalEvent:e,item:t.item}),this.$emit(`item-click`,{originalEvent:e,processedItem:t,isFocus:!0})},onItemMouseEnter:function(e,t){this.$emit(`item-mouseenter`,{originalEvent:e,processedItem:t})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,`separator`)}).length},getAriaPosInset:function(e){var t=this;return e-this.items.slice(0,e).filter(function(e){return t.isItemVisible(e)&&t.getItemProp(e,`separator`)}).length+1},getMenuItemProps:function(e,t){return{action:o({class:this.cx(`itemLink`),tabindex:-1},this.getPTOptions(e,t,`itemLink`)),icon:o({class:[this.cx(`itemIcon`),this.getItemProp(e,`icon`)]},this.getPTOptions(e,t,`itemIcon`)),label:o({class:this.cx(`label`)},this.getPTOptions(e,t,`label`)),submenuicon:o({class:this.cx(`submenuIcon`)},this.getPTOptions(e,t,`submenuIcon`))}}},components:{AngleRightIcon:j,AngleDownIcon:M},directives:{ripple:A}},L=[`tabindex`],R=[`id`,`aria-label`,`aria-disabled`,`aria-expanded`,`aria-haspopup`,`aria-level`,`aria-setsize`,`aria-posinset`,`data-p-active`,`data-p-focused`,`data-p-disabled`],z=[`onClick`,`onMouseenter`],B=[`href`,`target`],V=[`id`];function H(n,s,_,v,y,b){var x=t(`MegaMenuSub`,!0),S=l(`ripple`);return a(),f(`ul`,o({class:_.level===0?n.cx(`rootList`):n.cx(`submenu`),tabindex:_.tabindex},_.level===0?n.ptm(`rootList`):n.ptm(`submenu`)),[_.submenu?(a(),f(`li`,o({key:0,class:[n.cx(`submenuLabel`,{submenu:_.submenu}),b.getItemProp(_.submenu,`class`)],style:b.getItemProp(_.submenu,`style`),role:`presentation`},n.ptm(`submenuLabel`)),e(b.getItemLabel(_.submenu)),17)):d(``,!0),(a(!0),f(h,null,c(_.items,function(t,l){return a(),f(h,{key:b.getItemKey(t)},[b.isItemVisible(t)&&!b.getItemProp(t,`separator`)?(a(),f(`li`,o({key:0,id:b.getItemId(t),style:b.getItemProp(t,`style`),class:[n.cx(`item`,{processedItem:t}),b.getItemProp(t,`class`)],role:`menuitem`,"aria-label":b.getItemLabel(t),"aria-disabled":b.isItemDisabled(t)||void 0,"aria-expanded":b.isItemGroup(t)?b.isItemActive(t):void 0,"aria-haspopup":b.isItemGroup(t)&&!b.getItemProp(t,`to`)?`menu`:void 0,"aria-level":_.level+1,"aria-setsize":b.getAriaSetSize(),"aria-posinset":b.getAriaPosInset(l)},{ref_for:!0},b.getPTOptions(t,l,`item`),{"data-p-active":b.isItemActive(t),"data-p-focused":b.isItemFocused(t),"data-p-disabled":b.isItemDisabled(t)}),[m(`div`,o({class:n.cx(`itemContent`),onClick:function(e){return b.onItemClick(e,t)},onMouseenter:function(e){return b.onItemMouseEnter(e,t)}},{ref_for:!0},b.getPTOptions(t,l,`itemContent`)),[_.templates.item?(a(),g(i(_.templates.item),{key:1,item:t.item,hasSubmenu:b.isItemGroup(t),label:b.getItemLabel(t),props:b.getMenuItemProps(t,l)},null,8,[`item`,`hasSubmenu`,`label`,`props`])):u((a(),f(`a`,o({key:0,href:b.getItemProp(t,`url`),class:n.cx(`itemLink`),target:b.getItemProp(t,`target`),tabindex:`-1`},{ref_for:!0},b.getPTOptions(t,l,`itemLink`)),[_.templates.itemicon?(a(),g(i(_.templates.itemicon),{key:0,item:t.item,class:r(n.cx(`itemIcon`))},null,8,[`item`,`class`])):b.getItemProp(t,`icon`)?(a(),f(`span`,o({key:1,class:[n.cx(`itemIcon`),b.getItemProp(t,`icon`)]},{ref_for:!0},b.getPTOptions(t,l,`itemIcon`)),null,16)):d(``,!0),m(`span`,o({class:n.cx(`itemLabel`)},{ref_for:!0},b.getPTOptions(t,l,`itemLabel`)),e(b.getItemLabel(t)),17),b.isItemGroup(t)?(a(),f(h,{key:2},[_.templates.submenuicon?(a(),g(i(_.templates.submenuicon),o({key:0,active:b.isItemActive(t),class:n.cx(`submenuIcon`)},{ref_for:!0},b.getPTOptions(t,l,`submenuIcon`)),null,16,[`active`,`class`])):(a(),g(i(_.horizontal||_.mobileActive?`AngleDownIcon`:`AngleRightIcon`),o({key:1,class:n.cx(`submenuIcon`)},{ref_for:!0},b.getPTOptions(t,l,`submenuIcon`)),null,16,[`class`]))],64)):d(``,!0)],16,B)),[[S]])],16,z),b.isItemVisible(t)&&b.isItemGroup(t)?(a(),f(`div`,o({key:0,class:n.cx(`overlay`)},{ref_for:!0},n.ptm(`overlay`)),[m(`div`,o({class:n.cx(`grid`)},{ref_for:!0},n.ptm(`grid`)),[(a(!0),f(h,null,c(t.items,function(e){return a(),f(`div`,o({key:b.getItemKey(e),class:n.cx(`column`,{processedItem:t})},{ref_for:!0},n.ptm(`column`)),[(a(!0),f(h,null,c(e,function(e){return a(),g(x,{key:b.getSubListKey(e),id:b.getSubListId(e),style:p(n.sx(`submenu`,!0,{processedItem:t})),role:`menu`,menuId:_.menuId,focusedItemId:_.focusedItemId,submenu:e,items:e.items,templates:_.templates,level:_.level+1,mobileActive:_.mobileActive,pt:n.pt,unstyled:n.unstyled,onItemClick:s[0]||=function(e){return n.$emit(`item-click`,e)},onItemMouseenter:s[1]||=function(e){return n.$emit(`item-mouseenter`,e)}},null,8,[`id`,`style`,`menuId`,`focusedItemId`,`submenu`,`items`,`templates`,`level`,`mobileActive`,`pt`,`unstyled`])}),128))],16)}),128))],16)],16)):d(``,!0)],16,R)):d(``,!0),b.isItemVisible(t)&&b.getItemProp(t,`separator`)?(a(),f(`li`,o({key:1,id:b.getItemId(t),class:[n.cx(`separator`),b.getItemProp(t,`class`)],style:b.getItemProp(t,`style`),role:`separator`},{ref_for:!0},n.ptm(`separator`)),null,16,V)):d(``,!0)],64)}),128))],16,L)}I.render=H;var U={name:`MegaMenu`,extends:F,inheritAttrs:!1,emits:[`focus`,`blur`],outsideClickListener:null,resizeListener:null,matchMediaListener:null,container:null,menubar:null,searchTimeout:null,searchValue:null,data:function(){return{mobileActive:!1,focused:!1,focusedItemInfo:{index:-1,key:``,parentKey:``},activeItem:null,dirty:!1,query:null,queryMatches:!1}},watch:{activeItem:function(e){x(e)?(this.bindOutsideClickListener(),this.bindResizeListener()):(this.unbindOutsideClickListener(),this.unbindResizeListener())}},mounted:function(){this.bindMatchMediaListener()},beforeUnmount:function(){this.mobileActive=!1,this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindMatchMediaListener()},methods:{getItemProp:function(e,t){return e?D(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemGroup:function(e){return x(this.getItemProp(e,`items`))},isItemSeparator:function(e){return this.getItemProp(e,`separator`)},getProccessedItemLabel:function(e){return e?this.getItemLabel(e.item):void 0},isProccessedItemGroup:function(e){return e&&x(e.items)},toggle:function(e){var t=this;this.mobileActive?(this.mobileActive=!1,y.clear(this.menubar),this.hide()):(this.mobileActive=!0,y.set(`menu`,this.menubar,this.$primevue.config.zIndex.menu),setTimeout(function(){t.show()},1)),this.bindOutsideClickListener(),e.preventDefault()},show:function(){this.focusedItemInfo={index:this.findFirstFocusedItemIndex(),level:0,parentKey:``},b(this.menubar)},hide:function(e,t){var n=this;this.mobileActive&&(this.mobileActive=!1,setTimeout(function(){b(n.$refs.menubutton,{preventScroll:!0})},1)),this.activeItem=null,this.focusedItemInfo={index:-1,key:``,parentKey:``},t&&b(this.menubar),this.dirty=!1},onFocus:function(e){if(this.focused=!0,this.focusedItemInfo.index===-1){var t=this.findFirstFocusedItemIndex(),n=this.findVisibleItem(t);this.focusedItemInfo={index:t,key:n.key,parentKey:n.parentKey}}this.$emit(`focus`,e)},onBlur:function(e){this.focused=!1,this.focusedItemInfo={index:-1,key:``,parentKey:``},this.searchValue=``,this.dirty=!1,this.$emit(`blur`,e)},onKeyDown:function(e){if(this.disabled){e.preventDefault();return}var t=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`ArrowRight`:this.onArrowRightKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Space`:this.onSpaceKey(e);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`PageDown`:case`PageUp`:case`Backspace`:case`ShiftLeft`:case`ShiftRight`:break;default:!t&&E(e.key)&&this.searchItems(e,e.key)}},onItemChange:function(e){var t=e.processedItem,n=e.isFocus;if(!S(t)){var r=t.index,i=t.key,a=t.parentKey,o=t.items,s=x(o);s&&(this.activeItem=t),this.focusedItemInfo={index:r,key:i,parentKey:a},s&&(this.dirty=!0),n&&b(this.menubar)}},onItemClick:function(e){var t=e.originalEvent,n=e.processedItem,r=this.isProccessedItemGroup(n),i=S(n.parent);if(this.isSelected(n)){var a=n.index,o=n.key,s=n.parentKey;this.activeItem=null,this.focusedItemInfo={index:a,key:o,parentKey:s},this.dirty=!i,this.mobileActive||b(this.menubar,{preventScroll:!0})}else r?this.onItemChange(e):this.hide(t)},onItemMouseEnter:function(e){!this.mobileActive&&this.dirty&&this.onItemChange(e)},menuButtonClick:function(e){this.toggle(e)},menuButtonKeydown:function(e){(e.code===`Enter`||e.code===`NumpadEnter`||e.code===`Space`)&&this.menuButtonClick(e)},onArrowDownKey:function(e){if(this.horizontal){if(x(this.activeItem)&&this.activeItem.key===this.focusedItemInfo.key)this.focusedItemInfo={index:-1,key:``,parentKey:this.activeItem.key};else{var t=this.findVisibleItem(this.focusedItemInfo.index);this.isProccessedItemGroup(t)&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,key:t.key,parentKey:t.parentKey},this.searchValue=``)}}var n=this.focusedItemInfo.index===-1?this.findFirstFocusedItemIndex():this.findNextItemIndex(this.focusedItemInfo.index);this.changeFocusedItemInfo(e,n),e.preventDefault()},onArrowUpKey:function(e){if(e.altKey&&this.horizontal){if(this.focusedItemInfo.index!==-1){var t=this.findVisibleItem(this.focusedItemInfo.index);!this.isProccessedItemGroup(t)&&x(this.activeItem)&&(this.focusedItemInfo.index===0?(this.focusedItemInfo={index:this.activeItem.index,key:this.activeItem.key,parentKey:this.activeItem.parentKey},this.activeItem=null):this.changeFocusedItemInfo(e,this.findFirstItemIndex()))}e.preventDefault()}else{var n=this.focusedItemInfo.index===-1?this.findLastFocusedItemIndex():this.findPrevItemIndex(this.focusedItemInfo.index);this.changeFocusedItemInfo(e,n),e.preventDefault()}},onArrowLeftKey:function(e){var t=this.findVisibleItem(this.focusedItemInfo.index);if(this.isProccessedItemGroup(t)){if(this.horizontal){var n=this.focusedItemInfo.index===-1?this.findLastFocusedItemIndex():this.findPrevItemIndex(this.focusedItemInfo.index);this.changeFocusedItemInfo(e,n)}}else{this.vertical&&x(this.activeItem)&&t.columnIndex===0&&(this.focusedItemInfo={index:this.activeItem.index,key:this.activeItem.key,parentKey:this.activeItem.parentKey},this.activeItem=null);var r=t.columnIndex-1,i=this.visibleItems.findIndex(function(e){return e.columnIndex===r});i!==-1&&this.changeFocusedItemInfo(e,i)}e.preventDefault()},onArrowRightKey:function(e){var t=this.findVisibleItem(this.focusedItemInfo.index);if(this.isProccessedItemGroup(t)){if(this.vertical){if(x(this.activeItem)&&this.activeItem.key===t.key)this.focusedItemInfo={index:-1,key:``,parentKey:this.activeItem.key};else{var n=this.findVisibleItem(this.focusedItemInfo.index);this.isProccessedItemGroup(n)&&(this.onItemChange({originalEvent:e,processedItem:n}),this.focusedItemInfo={index:-1,key:n.key,parentKey:n.parentKey},this.searchValue=``)}}var r=this.focusedItemInfo.index===-1?this.findFirstFocusedItemIndex():this.findNextItemIndex(this.focusedItemInfo.index);this.changeFocusedItemInfo(e,r)}else{var i=t.columnIndex+1,a=this.visibleItems.findIndex(function(e){return e.columnIndex===i});a!==-1&&this.changeFocusedItemInfo(e,a)}e.preventDefault()},onHomeKey:function(e){this.changeFocusedItemInfo(e,this.findFirstItemIndex()),e.preventDefault()},onEndKey:function(e){this.changeFocusedItemInfo(e,this.findLastItemIndex()),e.preventDefault()},onEnterKey:function(e){if(this.focusedItemInfo.index!==-1){var t=w(this.menubar,`li[id="${`${this.focusedItemId}`}"]`),n=t&&w(t,`a[data-pc-section="itemlink"]`);n?n.click():t&&t.click();var r=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(r)&&this.changeFocusedItemInfo(e,this.findFirstFocusedItemIndex())}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onEscapeKey:function(e){x(this.activeItem)&&(this.focusedItemInfo={index:this.activeItem.index,key:this.activeItem.key},this.activeItem=null),e.preventDefault()},onTabKey:function(e){if(this.focusedItemInfo.index!==-1){var t=this.findVisibleItem(this.focusedItemInfo.index);!this.isProccessedItemGroup(t)&&this.onItemChange({originalEvent:e,processedItem:t})}this.hide()},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var n=e.container&&!e.container.contains(t.target),r=!e.target||e.target!==t.target&&!e.target.contains(t.target);n&&r&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(t){C()||e.hide(t,!0),e.mobileActive=!1},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},bindMatchMediaListener:function(){var e=this;if(!this.matchMediaListener){var t=matchMedia(`(max-width: ${this.breakpoint})`);this.query=t,this.queryMatches=t.matches,this.matchMediaListener=function(){e.queryMatches=t.matches,e.mobileActive=!1},this.query.addEventListener(`change`,this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&=(this.query.removeEventListener(`change`,this.matchMediaListener),null)},isItemMatched:function(e){return this.isValidItem(e)&&this.getProccessedItemLabel(e)?.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase())},isValidItem:function(e){return!!e&&!this.isItemDisabled(e.item)&&!this.isItemSeparator(e.item)&&this.isItemVisible(e.item)},isValidSelectedItem:function(e){return this.isValidItem(e)&&this.isSelected(e)},isSelected:function(e){return x(this.activeItem)?this.activeItem.key===e.key:!1},findFirstItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidItem(t)})},findLastItemIndex:function(){var e=this;return T(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItemIndex:function(e){var t=this,n=e<this.visibleItems.length-1?this.visibleItems.slice(e+1).findIndex(function(e){return t.isValidItem(e)}):-1;return n>-1?n+e+1:e},findPrevItemIndex:function(e){var t=this,n=e>0?T(this.visibleItems.slice(0,e),function(e){return t.isValidItem(e)}):-1;return n>-1?n:e},findSelectedItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidSelectedItem(t)})},findFirstFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findFirstItemIndex():e},findLastFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findLastItemIndex():e},findVisibleItem:function(e){return x(this.visibleItems)?this.visibleItems[e]:null},searchItems:function(e,t){var n=this;this.searchValue=(this.searchValue||``)+t;var r=-1,i=!1;return this.focusedItemInfo.index===-1?r=this.visibleItems.findIndex(function(e){return n.isItemMatched(e)}):(r=this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function(e){return n.isItemMatched(e)}),r=r===-1?this.visibleItems.slice(0,this.focusedItemInfo.index).findIndex(function(e){return n.isItemMatched(e)}):r+this.focusedItemInfo.index),r!==-1&&(i=!0),r===-1&&this.focusedItemInfo.index===-1&&(r=this.findFirstFocusedItemIndex()),r!==-1&&this.changeFocusedItemInfo(e,r),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){n.searchValue=``,n.searchTimeout=null},500),i},changeFocusedItemInfo:function(e,t){var n=this.findVisibleItem(t);this.focusedItemInfo.index=t,this.focusedItemInfo.key=x(n)?n.key:``,this.scrollInView()},scrollInView:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1,t=e===-1?this.focusedItemId:`${this.$id}_${e}`,n=t===null&&this.queryMatches?this.$refs.menubutton:w(this.menubar,`li[id="${t}"]`);n&&n.scrollIntoView&&n.scrollIntoView({block:`nearest`,inline:`nearest`,behavior:`smooth`})},createProcessedItems:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:``,a=arguments.length>4?arguments[4]:void 0,o=[];return e&&e.forEach(function(e,s){var c=(i===``?``:i+`_`)+(a===void 0?``:a+`_`)+s,l={item:e,index:s,level:n,key:c,parent:r,parentKey:i,columnIndex:a===void 0?r.columnIndex===void 0?s:r.columnIndex:a};l.items=n===0&&e.items&&e.items.length>0?e.items.map(function(e,r){return t.createProcessedItems(e,n+1,l,c,r)}):t.createProcessedItems(e.items,n+1,l,c),o.push(l)}),o},containerRef:function(e){this.container=e},menubarRef:function(e){this.menubar=e?e.$el:void 0}},computed:{processedItems:function(){return this.createProcessedItems(this.model||[])},visibleItems:function(){var e=x(this.activeItem)?this.activeItem:null;return e&&e.key===this.focusedItemInfo.parentKey?e.items.reduce(function(e,t){return t.forEach(function(t){t.items.forEach(function(t){e.push(t)})}),e},[]):this.processedItems},horizontal:function(){return this.orientation===`horizontal`},vertical:function(){return this.orientation===`vertical`},focusedItemId:function(){return x(this.focusedItemInfo.key)?`${this.$id}_${this.focusedItemInfo.key}`:null}},components:{MegaMenuSub:I,BarsIcon:N}},W=[`id`],G=[`aria-haspopup`,`aria-expanded`,`aria-controls`,`aria-label`];function K(e,i,c,l,u,m){var h=t(`BarsIcon`),g=t(`MegaMenuSub`);return a(),f(`div`,o({ref:m.containerRef,id:e.$id,class:e.cx(`root`)},e.ptmi(`root`)),[e.$slots.start?(a(),f(`div`,o({key:0,class:e.cx(`start`)},e.ptm(`start`)),[v(e.$slots,`start`)],16)):d(``,!0),v(e.$slots,e.$slots.button?`button`:`menubutton`,{id:e.$id,class:r(e.cx(`button`)),toggleCallback:function(e){return m.menuButtonClick(e)}},function(){return[e.model&&e.model.length>0?(a(),f(`a`,o({key:0,ref:`menubutton`,role:`button`,tabindex:`0`,class:e.cx(`button`),"aria-haspopup":!!(e.model.length&&e.model.length>0),"aria-expanded":u.mobileActive,"aria-controls":e.$id,"aria-label":e.$primevue.config.locale.aria?.navigation,onClick:i[0]||=function(e){return m.menuButtonClick(e)},onKeydown:i[1]||=function(e){return m.menuButtonKeydown(e)}},e.ptm(`button`)),[v(e.$slots,e.$slots.buttonicon?`buttonicon`:`menubuttonicon`,{},function(){return[_(h,s(n(e.ptm(`buttonIcon`))),null,16)]})],16,G)):d(``,!0)]}),_(g,{ref:m.menubarRef,id:e.$id+`_list`,tabindex:e.disabled?-1:e.tabindex,role:`menubar`,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"aria-disabled":e.disabled||void 0,"aria-orientation":e.orientation,"aria-activedescendant":u.focused?m.focusedItemId:void 0,menuId:e.$id,focusedItemId:u.focused?m.focusedItemId:void 0,items:m.processedItems,horizontal:m.horizontal,templates:e.$slots,activeItem:u.activeItem,mobileActive:u.mobileActive,level:0,style:p(e.sx(`rootList`)),pt:e.pt,unstyled:e.unstyled,onFocus:m.onFocus,onBlur:m.onBlur,onKeydown:m.onKeyDown,onItemClick:m.onItemClick,onItemMouseenter:m.onItemMouseEnter},null,8,[`id`,`tabindex`,`aria-label`,`aria-labelledby`,`aria-disabled`,`aria-orientation`,`aria-activedescendant`,`menuId`,`focusedItemId`,`items`,`horizontal`,`templates`,`activeItem`,`mobileActive`,`style`,`pt`,`unstyled`,`onFocus`,`onBlur`,`onKeydown`,`onItemClick`,`onItemMouseenter`]),e.$slots.end?(a(),f(`div`,o({key:1,class:e.cx(`end`)},e.ptm(`end`)),[v(e.$slots,`end`)],16)):d(``,!0)],16,W)}U.render=K;export{U as default};