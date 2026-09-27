import{At as e,B as t,C as n,Dt as r,H as i,I as a,O as o,Ot as s,R as c,V as l,Z as u,d,f,kt as p,l as m,r as h,u as g,v as _,z as v}from"./Ca5TY7vb.js";import{t as y}from"./cO8iUN-n.js";import{J as b,Nt as x,Ot as S,U as C,ct as w,gt as T,ht as E,kt as D,o as O}from"#entry";import{t as k}from"./BAPwTHkl.js";import{t as A}from"./BnSyHpKn.js";import{t as j}from"./Wn9AgR_U.js";import{t as M}from"./BKJPl1I7.js";import{t as N}from"./ClkZMcUw.js";var P=O.extend({name:`menubar`,style:`
    .p-menubar {
        display: flex;
        align-items: center;
        background: dt('menubar.background');
        border: 1px solid dt('menubar.border.color');
        border-radius: dt('menubar.border.radius');
        color: dt('menubar.color');
        padding: dt('menubar.padding');
        gap: dt('menubar.gap');
    }

    .p-menubar-start,
    .p-megamenu-end {
        display: flex;
        align-items: center;
    }

    .p-menubar-root-list,
    .p-menubar-submenu {
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;
        outline: 0 none;
    }

    .p-menubar-root-list {
        align-items: center;
        flex-wrap: wrap;
        gap: dt('menubar.gap');
    }

    .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content {
        border-radius: dt('menubar.base.item.border.radius');
    }

    .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content > .p-menubar-item-link {
        padding: dt('menubar.base.item.padding');
    }

    .p-menubar-item-content {
        transition:
            background dt('menubar.transition.duration'),
            color dt('menubar.transition.duration');
        border-radius: dt('menubar.item.border.radius');
        color: dt('menubar.item.color');
    }

    .p-menubar-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('menubar.item.padding');
        gap: dt('menubar.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-menubar-item-label {
        line-height: 1;
    }

    .p-menubar-item-icon {
        color: dt('menubar.item.icon.color');
    }

    .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.color');
        margin-left: auto;
        font-size: dt('menubar.submenu.icon.size');
        width: dt('menubar.submenu.icon.size');
        height: dt('menubar.submenu.icon.size');
    }

    .p-menubar-submenu .p-menubar-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-menubar-item.p-focus > .p-menubar-item-content {
        color: dt('menubar.item.focus.color');
        background: dt('menubar.item.focus.background');
    }

    .p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-item-icon {
        color: dt('menubar.item.icon.focus.color');
    }

    .p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.focus.color');
    }

    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover {
        color: dt('menubar.item.focus.color');
        background: dt('menubar.item.focus.background');
    }

    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-item-icon {
        color: dt('menubar.item.icon.focus.color');
    }

    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.focus.color');
    }

    .p-menubar-item-active > .p-menubar-item-content {
        color: dt('menubar.item.active.color');
        background: dt('menubar.item.active.background');
    }

    .p-menubar-item-active > .p-menubar-item-content .p-menubar-item-icon {
        color: dt('menubar.item.icon.active.color');
    }

    .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.active.color');
    }

    .p-menubar-submenu {
        display: none;
        position: absolute;
        min-width: 12.5rem;
        z-index: 1;
        background: dt('menubar.submenu.background');
        border: 1px solid dt('menubar.submenu.border.color');
        border-radius: dt('menubar.submenu.border.radius');
        box-shadow: dt('menubar.submenu.shadow');
        color: dt('menubar.submenu.color');
        flex-direction: column;
        padding: dt('menubar.submenu.padding');
        gap: dt('menubar.submenu.gap');
    }

    .p-menubar-submenu .p-menubar-separator {
        border-block-start: 1px solid dt('menubar.separator.border.color');
    }

    .p-menubar-submenu .p-menubar-item {
        position: relative;
    }

    .p-menubar-submenu > .p-menubar-item-active > .p-menubar-submenu {
        display: block;
        left: 100%;
        top: 0;
    }

    .p-menubar-end {
        margin-left: auto;
        align-self: center;
    }

    .p-menubar-end:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-menubar-button {
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: dt('menubar.mobile.button.size');
        height: dt('menubar.mobile.button.size');
        position: relative;
        color: dt('menubar.mobile.button.color');
        border: 0 none;
        background: transparent;
        border-radius: dt('menubar.mobile.button.border.radius');
        transition:
            background dt('menubar.transition.duration'),
            color dt('menubar.transition.duration'),
            outline-color dt('menubar.transition.duration');
        outline-color: transparent;
    }

    .p-menubar-button:hover {
        color: dt('menubar.mobile.button.hover.color');
        background: dt('menubar.mobile.button.hover.background');
    }

    .p-menubar-button:focus-visible {
        box-shadow: dt('menubar.mobile.button.focus.ring.shadow');
        outline: dt('menubar.mobile.button.focus.ring.width') dt('menubar.mobile.button.focus.ring.style') dt('menubar.mobile.button.focus.ring.color');
        outline-offset: dt('menubar.mobile.button.focus.ring.offset');
    }

    .p-menubar-mobile {
        position: relative;
    }

    .p-menubar-mobile .p-menubar-button {
        display: flex;
    }

    .p-menubar-mobile .p-menubar-root-list {
        position: absolute;
        display: none;
        width: 100%;
        flex-direction: column;
        top: 100%;
        left: 0;
        z-index: 1;
        padding: dt('menubar.submenu.padding');
        background: dt('menubar.submenu.background');
        border: 1px solid dt('menubar.submenu.border.color');
        box-shadow: dt('menubar.submenu.shadow');
        border-radius: dt('menubar.submenu.border.radius');
        gap: dt('menubar.submenu.gap');
    }

    .p-menubar-mobile .p-menubar-root-list:dir(rtl) {
        left: auto;
        right: 0;
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content > .p-menubar-item-link {
        padding: dt('menubar.item.padding');
    }

    .p-menubar-mobile-active .p-menubar-root-list {
        display: flex;
    }

    .p-menubar-mobile .p-menubar-root-list .p-menubar-item {
        width: 100%;
        position: static;
    }

    .p-menubar-mobile .p-menubar-root-list .p-menubar-separator {
        border-block-start: 1px solid dt('menubar.separator.border.color');
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content .p-menubar-submenu-icon {
        margin-left: auto;
        transition: transform 0.2s;
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content .p-menubar-submenu-icon:dir(rtl),
    .p-menubar-mobile .p-menubar-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
        transform: rotate(-180deg);
    }

    .p-menubar-mobile .p-menubar-submenu .p-menubar-submenu-icon {
        transition: transform 0.2s;
        transform: rotate(90deg);
    }

    .p-menubar-mobile .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
        transform: rotate(-90deg);
    }

    .p-menubar-mobile .p-menubar-submenu {
        width: 100%;
        position: static;
        box-shadow: none;
        border: 0 none;
        padding-inline-start: dt('menubar.submenu.mobile.indent');
        padding-inline-end: 0;
    }
`,classes:{root:function(e){var t=e.instance;return[`p-menubar p-component`,{"p-menubar-mobile":t.queryMatches,"p-menubar-mobile-active":t.mobileActive}]},start:`p-menubar-start`,button:`p-menubar-button`,rootList:`p-menubar-root-list`,item:function(e){var t=e.instance,n=e.processedItem;return[`p-menubar-item`,{"p-menubar-item-active":t.isItemActive(n),"p-focus":t.isItemFocused(n),"p-disabled":t.isItemDisabled(n)}]},itemContent:`p-menubar-item-content`,itemLink:`p-menubar-item-link`,itemIcon:`p-menubar-item-icon`,itemLabel:`p-menubar-item-label`,submenuIcon:`p-menubar-submenu-icon`,submenu:`p-menubar-submenu`,separator:`p-menubar-separator`,end:`p-menubar-end`},inlineStyles:{submenu:function(e){var t=e.instance,n=e.processedItem;return{display:t.isItemActive(n)?`flex`:`none`}}}}),F={name:`BaseMenubar`,extends:k,props:{model:{type:Array,default:null},buttonProps:{type:null,default:null},breakpoint:{type:String,default:`960px`},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:P,provide:function(){return{$pcMenubar:this,$parentInstance:this}}},I={name:`MenubarSub`,hostName:`Menubar`,extends:k,emits:[`item-mouseenter`,`item-click`,`item-mousemove`],props:{items:{type:Array,default:null},root:{type:Boolean,default:!1},popup:{type:Boolean,default:!1},mobileActive:{type:Boolean,default:!1},templates:{type:Object,default:null},level:{type:Number,default:0},menuId:{type:String,default:null},focusedItemId:{type:String,default:null},activeItemPath:{type:Object,default:null}},list:null,methods:{getItemId:function(e){return`${this.menuId}_${e.key}`},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,n){return e&&e.item?D(e.item[t],n):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},getItemLabelId:function(e){return`${this.menuId}_${e.key}_label`},getPTOptions:function(e,t,n){return this.ptm(n,{context:{item:e.item,index:t,active:this.isItemActive(e),focused:this.isItemFocused(e),disabled:this.isItemDisabled(e),level:this.level}})},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return x(e.items)},onItemClick:function(e,t){this.getItemProp(t,`command`,{originalEvent:e,item:t.item}),this.$emit(`item-click`,{originalEvent:e,processedItem:t,isFocus:!0})},onItemMouseEnter:function(e,t){this.$emit(`item-mouseenter`,{originalEvent:e,processedItem:t})},onItemMouseMove:function(e,t){this.$emit(`item-mousemove`,{originalEvent:e,processedItem:t})},getAriaPosInset:function(e){return e-this.calculateAriaSetSize.slice(0,e).length+1},getMenuItemProps:function(e,t){return{action:o({class:this.cx(`itemLink`),tabindex:-1},this.getPTOptions(e,t,`itemLink`)),icon:o({class:[this.cx(`itemIcon`),this.getItemProp(e,`icon`)]},this.getPTOptions(e,t,`itemIcon`)),label:o({class:this.cx(`itemLabel`)},this.getPTOptions(e,t,`itemLabel`)),submenuicon:o({class:this.cx(`submenuIcon`)},this.getPTOptions(e,t,`submenuIcon`))}}},computed:{calculateAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&e.getItemProp(t,`separator`)})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,`separator`)}).length}},components:{AngleRightIcon:j,AngleDownIcon:M},directives:{ripple:A}},L=[`id`,`aria-label`,`aria-disabled`,`aria-expanded`,`aria-haspopup`,`aria-setsize`,`aria-posinset`,`data-p-active`,`data-p-focused`,`data-p-disabled`],R=[`onClick`,`onMouseenter`,`onMousemove`],z=[`href`,`target`],B=[`id`],V=[`id`];function H(n,s,_,v,y,b){var x=t(`MenubarSub`,!0),S=l(`ripple`);return a(),f(`ul`,o({class:_.level===0?n.cx(`rootList`):n.cx(`submenu`)},_.level===0?n.ptm(`rootList`):n.ptm(`submenu`)),[(a(!0),f(h,null,c(_.items,function(t,c){return a(),f(h,{key:b.getItemKey(t)},[b.isItemVisible(t)&&!b.getItemProp(t,`separator`)?(a(),f(`li`,o({key:0,id:b.getItemId(t),style:b.getItemProp(t,`style`),class:[n.cx(`item`,{processedItem:t}),b.getItemProp(t,`class`)],role:`menuitem`,"aria-label":b.getItemLabel(t),"aria-disabled":b.isItemDisabled(t)||void 0,"aria-expanded":b.isItemGroup(t)?b.isItemActive(t):void 0,"aria-haspopup":b.isItemGroup(t)&&!b.getItemProp(t,`to`)?`menu`:void 0,"aria-setsize":b.getAriaSetSize,"aria-posinset":b.getAriaPosInset(c)},{ref_for:!0},b.getPTOptions(t,c,`item`),{"data-p-active":b.isItemActive(t),"data-p-focused":b.isItemFocused(t),"data-p-disabled":b.isItemDisabled(t)}),[m(`div`,o({class:n.cx(`itemContent`),onClick:function(e){return b.onItemClick(e,t)},onMouseenter:function(e){return b.onItemMouseEnter(e,t)},onMousemove:function(e){return b.onItemMouseMove(e,t)}},{ref_for:!0},b.getPTOptions(t,c,`itemContent`)),[_.templates.item?(a(),g(i(_.templates.item),{key:1,item:t.item,root:_.root,hasSubmenu:b.getItemProp(t,`items`),label:b.getItemLabel(t),props:b.getMenuItemProps(t,c)},null,8,[`item`,`root`,`hasSubmenu`,`label`,`props`])):u((a(),f(`a`,o({key:0,href:b.getItemProp(t,`url`),class:n.cx(`itemLink`),target:b.getItemProp(t,`target`),tabindex:`-1`},{ref_for:!0},b.getPTOptions(t,c,`itemLink`)),[_.templates.itemicon?(a(),g(i(_.templates.itemicon),{key:0,item:t.item,class:r(n.cx(`itemIcon`))},null,8,[`item`,`class`])):b.getItemProp(t,`icon`)?(a(),f(`span`,o({key:1,class:[n.cx(`itemIcon`),b.getItemProp(t,`icon`)]},{ref_for:!0},b.getPTOptions(t,c,`itemIcon`)),null,16)):d(``,!0),m(`span`,o({id:b.getItemLabelId(t),class:n.cx(`itemLabel`)},{ref_for:!0},b.getPTOptions(t,c,`itemLabel`)),e(b.getItemLabel(t)),17,B),b.getItemProp(t,`items`)?(a(),f(h,{key:2},[_.templates.submenuicon?(a(),g(i(_.templates.submenuicon),{key:0,root:_.root,active:b.isItemActive(t),class:r(n.cx(`submenuIcon`))},null,8,[`root`,`active`,`class`])):(a(),g(i(_.root?`AngleDownIcon`:`AngleRightIcon`),o({key:1,class:n.cx(`submenuIcon`)},{ref_for:!0},b.getPTOptions(t,c,`submenuIcon`)),null,16,[`class`]))],64)):d(``,!0)],16,z)),[[S]])],16,R),b.isItemVisible(t)&&b.isItemGroup(t)?(a(),g(x,{key:0,id:b.getItemId(t)+`_list`,menuId:_.menuId,role:`menu`,style:p(n.sx(`submenu`,!0,{processedItem:t})),focusedItemId:_.focusedItemId,items:t.items,mobileActive:_.mobileActive,activeItemPath:_.activeItemPath,templates:_.templates,level:_.level+1,"aria-labelledby":b.getItemLabelId(t),pt:n.pt,unstyled:n.unstyled,onItemClick:s[0]||=function(e){return n.$emit(`item-click`,e)},onItemMouseenter:s[1]||=function(e){return n.$emit(`item-mouseenter`,e)},onItemMousemove:s[2]||=function(e){return n.$emit(`item-mousemove`,e)}},null,8,[`id`,`menuId`,`style`,`focusedItemId`,`items`,`mobileActive`,`activeItemPath`,`templates`,`level`,`aria-labelledby`,`pt`,`unstyled`])):d(``,!0)],16,L)):d(``,!0),b.isItemVisible(t)&&b.getItemProp(t,`separator`)?(a(),f(`li`,o({key:1,id:b.getItemId(t),class:[n.cx(`separator`),b.getItemProp(t,`class`)],style:b.getItemProp(t,`style`),role:`separator`},{ref_for:!0},n.ptm(`separator`)),null,16,V)):d(``,!0)],64)}),128))],16)}I.render=H;var U={name:`Menubar`,extends:F,inheritAttrs:!1,emits:[`focus`,`blur`],matchMediaListener:null,data:function(){return{mobileActive:!1,focused:!1,focusedItemInfo:{index:-1,level:0,parentKey:``},activeItemPath:[],dirty:!1,query:null,queryMatches:!1}},watch:{activeItemPath:function(e){x(e)?(this.bindOutsideClickListener(),this.bindResizeListener()):(this.unbindOutsideClickListener(),this.unbindResizeListener())}},outsideClickListener:null,container:null,menubar:null,mounted:function(){this.bindMatchMediaListener()},beforeUnmount:function(){this.mobileActive=!1,this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindMatchMediaListener(),this.container&&y.clear(this.container),this.container=null},methods:{getItemProp:function(e,t){return e?D(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemGroup:function(e){return x(this.getItemProp(e,`items`))},isItemSeparator:function(e){return this.getItemProp(e,`separator`)},getProccessedItemLabel:function(e){return e?this.getItemLabel(e.item):void 0},isProccessedItemGroup:function(e){return e&&x(e.items)},toggle:function(e){var t=this;this.mobileActive?(this.mobileActive=!1,y.clear(this.menubar),this.hide()):(this.mobileActive=!0,y.set(`menu`,this.menubar,this.$primevue.config.zIndex.menu),setTimeout(function(){t.show()},1)),this.bindOutsideClickListener(),e.preventDefault()},show:function(){b(this.menubar)},hide:function(e,t){var n=this;this.mobileActive&&(this.mobileActive=!1,setTimeout(function(){b(n.$refs.menubutton)},0)),this.activeItemPath=[],this.focusedItemInfo={index:-1,level:0,parentKey:``},t&&b(this.menubar),this.dirty=!1},onFocus:function(e){this.focused=!0,this.focusedItemInfo=this.focusedItemInfo.index===-1?{index:this.findFirstFocusedItemIndex(),level:0,parentKey:``}:this.focusedItemInfo,this.$emit(`focus`,e)},onBlur:function(e){this.focused=!1,this.focusedItemInfo={index:-1,level:0,parentKey:``},this.searchValue=``,this.dirty=!1,this.$emit(`blur`,e)},onKeyDown:function(e){var t=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`ArrowRight`:this.onArrowRightKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Space`:this.onSpaceKey(e);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`PageDown`:case`PageUp`:case`Backspace`:case`ShiftLeft`:case`ShiftRight`:break;default:!t&&E(e.key)&&this.searchItems(e,e.key)}},onItemChange:function(e,t){var n=e.processedItem,r=e.isFocus;if(!S(n)){var i=n.index,a=n.key,o=n.level,s=n.parentKey,c=n.items,l=x(c),u=this.activeItemPath.filter(function(e){return e.parentKey!==s&&e.parentKey!==a});l&&u.push(n),this.focusedItemInfo={index:i,level:o,parentKey:s},l&&(this.dirty=!0),r&&b(this.menubar),!(t===`hover`&&this.queryMatches)&&(this.activeItemPath=u)}},onItemClick:function(e){var t=e.originalEvent,n=e.processedItem,r=this.isProccessedItemGroup(n),i=S(n.parent);if(this.isSelected(n)){var a=n.index,o=n.key,s=n.level,c=n.parentKey;this.activeItemPath=this.activeItemPath.filter(function(e){return o!==e.key&&o.startsWith(e.key)}),this.focusedItemInfo={index:a,level:s,parentKey:c},this.dirty=!i,b(this.menubar)}else if(r)this.onItemChange(e);else{var l=i?n:this.activeItemPath.find(function(e){return e.parentKey===``});this.hide(t),this.changeFocusedItemIndex(t,l?l.index:-1),this.mobileActive=!1,b(this.menubar)}},onItemMouseEnter:function(e){this.dirty&&this.onItemChange(e,`hover`)},onItemMouseMove:function(e){this.focused&&this.changeFocusedItemIndex(e,e.processedItem.index)},menuButtonClick:function(e){this.toggle(e)},menuButtonKeydown:function(e){(e.code===`Enter`||e.code===`NumpadEnter`||e.code===`Space`)&&this.menuButtonClick(e)},onArrowDownKey:function(e){var t=this.visibleItems[this.focusedItemInfo.index];if(t&&S(t.parent))this.isProccessedItemGroup(t)&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,parentKey:t.key},this.onArrowRightKey(e));else{var n=this.focusedItemInfo.index===-1?this.findFirstFocusedItemIndex():this.findNextItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,n)}e.preventDefault()},onArrowUpKey:function(e){var t=this,n=this.visibleItems[this.focusedItemInfo.index];if(S(n.parent)){if(this.isProccessedItemGroup(n)){this.onItemChange({originalEvent:e,processedItem:n}),this.focusedItemInfo={index:-1,parentKey:n.key};var r=this.findLastItemIndex();this.changeFocusedItemIndex(e,r)}}else{var i=this.activeItemPath.find(function(e){return e.key===n.parentKey});if(this.focusedItemInfo.index===0)this.focusedItemInfo={index:-1,parentKey:i?i.parentKey:``},this.searchValue=``,this.onArrowLeftKey(e),this.activeItemPath=this.activeItemPath.filter(function(e){return e.parentKey!==t.focusedItemInfo.parentKey});else{var a=this.focusedItemInfo.index===-1?this.findLastFocusedItemIndex():this.findPrevItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,a)}}e.preventDefault()},onArrowLeftKey:function(e){var t=this,n=this.visibleItems[this.focusedItemInfo.index],r=n?this.activeItemPath.find(function(e){return e.key===n.parentKey}):null;if(r)this.onItemChange({originalEvent:e,processedItem:r}),this.activeItemPath=this.activeItemPath.filter(function(e){return e.parentKey!==t.focusedItemInfo.parentKey}),e.preventDefault();else{var i=this.focusedItemInfo.index===-1?this.findLastFocusedItemIndex():this.findPrevItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,i),e.preventDefault()}},onArrowRightKey:function(e){var t=this.visibleItems[this.focusedItemInfo.index];if(t&&this.activeItemPath.find(function(e){return e.key===t.parentKey}))this.isProccessedItemGroup(t)&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,parentKey:t.key},this.onArrowDownKey(e));else{var n=this.focusedItemInfo.index===-1?this.findFirstFocusedItemIndex():this.findNextItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,n),e.preventDefault()}},onHomeKey:function(e){this.changeFocusedItemIndex(e,this.findFirstItemIndex()),e.preventDefault()},onEndKey:function(e){this.changeFocusedItemIndex(e,this.findLastItemIndex()),e.preventDefault()},onEnterKey:function(e){if(this.focusedItemInfo.index!==-1){var t=w(this.menubar,`li[id="${`${this.focusedItemId}`}"]`),n=t&&w(t,`a[data-pc-section="itemlink"]`);n?n.click():t&&t.click();var r=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(r)&&(this.focusedItemInfo.index=this.findFirstFocusedItemIndex())}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onEscapeKey:function(e){if(this.focusedItemInfo.level!==0){var t=this.focusedItemInfo;this.hide(e,!1),this.focusedItemInfo={index:Number(t.parentKey.split(`_`)[0]),level:0,parentKey:``}}e.preventDefault()},onTabKey:function(e){if(this.focusedItemInfo.index!==-1){var t=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(t)&&this.onItemChange({originalEvent:e,processedItem:t})}this.hide()},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var n=e.container&&!e.container.contains(t.target),r=!e.target||e.target!==t.target&&!e.target.contains(t.target);n&&r&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(t){C()||e.hide(t,!0),e.mobileActive=!1},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},bindMatchMediaListener:function(){var e=this;if(!this.matchMediaListener){var t=matchMedia(`(max-width: ${this.breakpoint})`);this.query=t,this.queryMatches=t.matches,this.matchMediaListener=function(){e.queryMatches=t.matches,e.mobileActive=!1},this.query.addEventListener(`change`,this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&=(this.query.removeEventListener(`change`,this.matchMediaListener),null)},isItemMatched:function(e){return this.isValidItem(e)&&this.getProccessedItemLabel(e)?.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase())},isValidItem:function(e){return!!e&&!this.isItemDisabled(e.item)&&!this.isItemSeparator(e.item)&&this.isItemVisible(e.item)},isValidSelectedItem:function(e){return this.isValidItem(e)&&this.isSelected(e)},isSelected:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},findFirstItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidItem(t)})},findLastItemIndex:function(){var e=this;return T(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItemIndex:function(e){var t=this,n=e<this.visibleItems.length-1?this.visibleItems.slice(e+1).findIndex(function(e){return t.isValidItem(e)}):-1;return n>-1?n+e+1:e},findPrevItemIndex:function(e){var t=this,n=e>0?T(this.visibleItems.slice(0,e),function(e){return t.isValidItem(e)}):-1;return n>-1?n:e},findSelectedItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidSelectedItem(t)})},findFirstFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findFirstItemIndex():e},findLastFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findLastItemIndex():e},searchItems:function(e,t){var n=this;this.searchValue=(this.searchValue||``)+t;var r=-1,i=!1;return this.focusedItemInfo.index===-1?r=this.visibleItems.findIndex(function(e){return n.isItemMatched(e)}):(r=this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function(e){return n.isItemMatched(e)}),r=r===-1?this.visibleItems.slice(0,this.focusedItemInfo.index).findIndex(function(e){return n.isItemMatched(e)}):r+this.focusedItemInfo.index),r!==-1&&(i=!0),r===-1&&this.focusedItemInfo.index===-1&&(r=this.findFirstFocusedItemIndex()),r!==-1&&this.changeFocusedItemIndex(e,r),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){n.searchValue=``,n.searchTimeout=null},500),i},changeFocusedItemIndex:function(e,t){this.focusedItemInfo.index!==t&&(this.focusedItemInfo.index=t,this.scrollInView())},scrollInView:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1,t=e===-1?this.focusedItemId:`${this.$id}_${e}`,n=w(this.menubar,`li[id="${t}"]`);n&&n.scrollIntoView&&n.scrollIntoView({block:`nearest`,inline:`start`})},createProcessedItems:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:``,a=[];return e&&e.forEach(function(e,o){var s=(i===``?``:i+`_`)+o,c={item:e,index:o,level:n,key:s,parent:r,parentKey:i};c.items=t.createProcessedItems(e.items,n+1,c,s),a.push(c)}),a},containerRef:function(e){this.container=e},menubarRef:function(e){this.menubar=e?e.$el:void 0}},computed:{processedItems:function(){return this.createProcessedItems(this.model||[])},visibleItems:function(){var e=this,t=this.activeItemPath.find(function(t){return t.key===e.focusedItemInfo.parentKey});return t?t.items:this.processedItems},focusedItemId:function(){return this.focusedItemInfo.index===-1?null:`${this.$id}${x(this.focusedItemInfo.parentKey)?`_`+this.focusedItemInfo.parentKey:``}_${this.focusedItemInfo.index}`}},components:{MenubarSub:I,BarsIcon:N}};function W(e){"@babel/helpers - typeof";return W=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},W(e)}function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function K(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?G(Object(n),!0).forEach(function(t){q(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function q(e,t,n){return(t=J(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function J(e){var t=Y(e,`string`);return W(t)==`symbol`?t:t+``}function Y(e,t){if(W(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(W(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var X=[`aria-haspopup`,`aria-expanded`,`aria-controls`,`aria-label`];function Z(e,i,c,l,u,p){var m=t(`BarsIcon`),h=t(`MenubarSub`);return a(),f(`div`,o({ref:p.containerRef,class:e.cx(`root`)},e.ptmi(`root`)),[e.$slots.start?(a(),f(`div`,o({key:0,class:e.cx(`start`)},e.ptm(`start`)),[v(e.$slots,`start`)],16)):d(``,!0),v(e.$slots,e.$slots.button?`button`:`menubutton`,{id:e.$id,class:r(e.cx(`button`)),toggleCallback:function(e){return p.menuButtonClick(e)}},function(){return[e.model&&e.model.length>0?(a(),f(`a`,o({key:0,ref:`menubutton`,role:`button`,tabindex:`0`,class:e.cx(`button`),"aria-haspopup":!!(e.model.length&&e.model.length>0),"aria-expanded":u.mobileActive,"aria-controls":e.$id,"aria-label":e.$primevue.config.locale.aria?.navigation,onClick:i[0]||=function(e){return p.menuButtonClick(e)},onKeydown:i[1]||=function(e){return p.menuButtonKeydown(e)}},K(K({},e.buttonProps),e.ptm(`button`))),[v(e.$slots,e.$slots.buttonicon?`buttonicon`:`menubuttonicon`,{},function(){return[_(m,s(n(e.ptm(`buttonicon`))),null,16)]})],16,X)):d(``,!0)]}),_(h,{ref:p.menubarRef,id:e.$id+`_list`,role:`menubar`,items:p.processedItems,templates:e.$slots,root:!0,mobileActive:u.mobileActive,tabindex:`0`,"aria-activedescendant":u.focused?p.focusedItemId:void 0,menuId:e.$id,focusedItemId:u.focused?p.focusedItemId:void 0,activeItemPath:u.activeItemPath,level:0,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,pt:e.pt,unstyled:e.unstyled,onFocus:p.onFocus,onBlur:p.onBlur,onKeydown:p.onKeyDown,onItemClick:p.onItemClick,onItemMouseenter:p.onItemMouseEnter,onItemMousemove:p.onItemMouseMove},null,8,[`id`,`items`,`templates`,`mobileActive`,`aria-activedescendant`,`menuId`,`focusedItemId`,`activeItemPath`,`aria-labelledby`,`aria-label`,`pt`,`unstyled`,`onFocus`,`onBlur`,`onKeydown`,`onItemClick`,`onItemMouseenter`,`onItemMousemove`]),e.$slots.end?(a(),f(`div`,o({key:1,class:e.cx(`end`)},e.ptm(`end`)),[v(e.$slots,`end`)],16)):d(``,!0)],16)}U.render=Z;export{U as default};