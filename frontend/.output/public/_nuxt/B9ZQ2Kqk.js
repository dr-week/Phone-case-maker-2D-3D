import{At as e,B as t,Dt as n,H as r,I as i,O as a,R as o,V as s,X as c,Z as l,d as u,f as d,l as f,r as p,u as m,v as h,z as g}from"./Ca5TY7vb.js";import{Dt as _,J as v,M as y,Nt as b,Ot as x,Rt as S,Vt as C,ct as w,ht as T,kt as E,o as D,yt as O}from"#entry";import{t as k}from"./BAPwTHkl.js";import{t as A}from"./BnSyHpKn.js";import{t as j}from"./CAbdQ6wj.js";import{t as M}from"./Cm8kdziv.js";var N=D.extend({name:`panelmenu`,style:`
    .p-panelmenu {
        display: flex;
        flex-direction: column;
        gap: dt('panelmenu.gap');
    }

    .p-panelmenu-panel {
        background: dt('panelmenu.panel.background');
        border-width: dt('panelmenu.panel.border.width');
        border-style: solid;
        border-color: dt('panelmenu.panel.border.color');
        color: dt('panelmenu.panel.color');
        border-radius: dt('panelmenu.panel.border.radius');
        padding: dt('panelmenu.panel.padding');
    }

    .p-panelmenu-panel:first-child {
        border-width: dt('panelmenu.panel.first.border.width');
        border-start-start-radius: dt('panelmenu.panel.first.top.border.radius');
        border-start-end-radius: dt('panelmenu.panel.first.top.border.radius');
    }

    .p-panelmenu-panel:last-child {
        border-width: dt('panelmenu.panel.last.border.width');
        border-end-start-radius: dt('panelmenu.panel.last.bottom.border.radius');
        border-end-end-radius: dt('panelmenu.panel.last.bottom.border.radius');
    }

    .p-panelmenu-header {
        outline: 0 none;
    }

    .p-panelmenu-header-content {
        border-radius: dt('panelmenu.item.border.radius');
        transition:
            background dt('panelmenu.transition.duration'),
            color dt('panelmenu.transition.duration'),
            outline-color dt('panelmenu.transition.duration'),
            box-shadow dt('panelmenu.transition.duration');
        outline-color: transparent;
        color: dt('panelmenu.item.color');
    }

    .p-panelmenu-header-link {
        display: flex;
        gap: dt('panelmenu.item.gap');
        padding: dt('panelmenu.item.padding');
        align-items: center;
        user-select: none;
        cursor: pointer;
        position: relative;
        text-decoration: none;
        color: inherit;
    }

    .p-panelmenu-header-icon,
    .p-panelmenu-item-icon {
        color: dt('panelmenu.item.icon.color');
    }

    .p-panelmenu-submenu-icon {
        color: dt('panelmenu.submenu.icon.color');
    }

    .p-panelmenu-submenu-icon:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-panelmenu-header:not(.p-disabled):focus-visible .p-panelmenu-header-content {
        background: dt('panelmenu.item.focus.background');
        color: dt('panelmenu.item.focus.color');
    }

    .p-panelmenu-header:not(.p-disabled):focus-visible .p-panelmenu-header-content .p-panelmenu-header-icon {
        color: dt('panelmenu.item.icon.focus.color');
    }

    .p-panelmenu-header:not(.p-disabled):focus-visible .p-panelmenu-header-content .p-panelmenu-submenu-icon {
        color: dt('panelmenu.submenu.icon.focus.color');
    }

    .p-panelmenu-header:not(.p-disabled) .p-panelmenu-header-content:hover {
        background: dt('panelmenu.item.focus.background');
        color: dt('panelmenu.item.focus.color');
    }

    .p-panelmenu-header:not(.p-disabled) .p-panelmenu-header-content:hover .p-panelmenu-header-icon {
        color: dt('panelmenu.item.icon.focus.color');
    }

    .p-panelmenu-header:not(.p-disabled) .p-panelmenu-header-content:hover .p-panelmenu-submenu-icon {
        color: dt('panelmenu.submenu.icon.focus.color');
    }

    .p-panelmenu-submenu {
        margin: 0;
        padding: 0 0 0 dt('panelmenu.submenu.indent');
        outline: 0;
        list-style: none;
    }

    .p-panelmenu-submenu:dir(rtl) {
        padding: 0 dt('panelmenu.submenu.indent') 0 0;
    }

    .p-panelmenu-item-link {
        display: flex;
        gap: dt('panelmenu.item.gap');
        padding: dt('panelmenu.item.padding');
        align-items: center;
        user-select: none;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        position: relative;
        overflow: hidden;
    }

    .p-panelmenu-item-label {
        line-height: 1;
    }

    .p-panelmenu-item-content {
        border-radius: dt('panelmenu.item.border.radius');
        transition:
            background dt('panelmenu.transition.duration'),
            color dt('panelmenu.transition.duration'),
            outline-color dt('panelmenu.transition.duration'),
            box-shadow dt('panelmenu.transition.duration');
        color: dt('panelmenu.item.color');
        outline-color: transparent;
    }

    .p-panelmenu-item.p-focus > .p-panelmenu-item-content {
        background: dt('panelmenu.item.focus.background');
        color: dt('panelmenu.item.focus.color');
    }

    .p-panelmenu-item.p-focus > .p-panelmenu-item-content .p-panelmenu-item-icon {
        color: dt('panelmenu.item.focus.color');
    }

    .p-panelmenu-item.p-focus > .p-panelmenu-item-content .p-panelmenu-submenu-icon {
        color: dt('panelmenu.submenu.icon.focus.color');
    }

    .p-panelmenu-item:not(.p-disabled) > .p-panelmenu-item-content:hover {
        background: dt('panelmenu.item.focus.background');
        color: dt('panelmenu.item.focus.color');
    }

    .p-panelmenu-item:not(.p-disabled) > .p-panelmenu-item-content:hover .p-panelmenu-item-icon {
        color: dt('panelmenu.item.icon.focus.color');
    }

    .p-panelmenu-item:not(.p-disabled) > .p-panelmenu-item-content:hover .p-panelmenu-submenu-icon {
        color: dt('panelmenu.submenu.icon.focus.color');
    }

    .p-panelmenu-content-container {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-panelmenu-content-wrapper {
        min-height: 0;
    }
`,classes:{root:`p-panelmenu p-component`,panel:`p-panelmenu-panel`,header:function(e){var t=e.instance,n=e.item;return[`p-panelmenu-header`,{"p-panelmenu-header-active":t.isItemActive(n)&&!!n.items,"p-disabled":t.isItemDisabled(n)}]},headerContent:`p-panelmenu-header-content`,headerLink:`p-panelmenu-header-link`,headerIcon:`p-panelmenu-header-icon`,headerLabel:`p-panelmenu-header-label`,contentContainer:`p-panelmenu-content-container`,contentWrapper:`p-panelmenu-content-wrapper`,content:`p-panelmenu-content`,rootList:`p-panelmenu-root-list`,item:function(e){var t=e.instance,n=e.processedItem;return[`p-panelmenu-item`,{"p-focus":t.isItemFocused(n),"p-disabled":t.isItemDisabled(n)}]},itemContent:`p-panelmenu-item-content`,itemLink:`p-panelmenu-item-link`,itemIcon:`p-panelmenu-item-icon`,itemLabel:`p-panelmenu-item-label`,submenuIcon:`p-panelmenu-submenu-icon`,submenu:`p-panelmenu-submenu`,separator:`p-menuitem-separator`}}),P={name:`BasePanelMenu`,extends:k,props:{model:{type:Array,default:null},expandedKeys:{type:Object,default:null},multiple:{type:Boolean,default:!1},tabindex:{type:Number,default:0}},style:N,provide:function(){return{$pcPanelMenu:this,$parentInstance:this}}},F={name:`PanelMenuSub`,hostName:`PanelMenu`,extends:k,emits:[`item-toggle`,`item-mousemove`],props:{panelId:{type:String,default:null},focusedItemId:{type:String,default:null},items:{type:Array,default:null},level:{type:Number,default:0},templates:{type:Object,default:null},activeItemPath:{type:Object,default:null},tabindex:{type:Number,default:-1}},methods:{getItemId:function(e){return`${this.panelId}_${e.key}`},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,n){return e&&e.item?E(e.item[t],n):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},getPTOptions:function(e,t,n){return this.ptm(e,{context:{item:t.item,index:n,active:this.isItemActive(t),focused:this.isItemFocused(t),disabled:this.isItemDisabled(t)}})},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return b(e.items)},onItemClick:function(e,t){this.getItemProp(t,`command`,{originalEvent:e,item:t.item}),this.$emit(`item-toggle`,{processedItem:t,expanded:!this.isItemActive(t)})},onItemToggle:function(e){this.$emit(`item-toggle`,e)},onItemMouseMove:function(e,t){this.$emit(`item-mousemove`,{originalEvent:e,processedItem:t})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,`separator`)}).length},getAriaPosInset:function(e){var t=this;return e-this.items.slice(0,e).filter(function(e){return t.isItemVisible(e)&&t.getItemProp(e,`separator`)}).length+1},getMenuItemProps:function(e,t){return{action:a({class:this.cx(`itemLink`),tabindex:-1},this.getPTOptions(`itemLink`,e,t)),icon:a({class:[this.cx(`itemIcon`),this.getItemProp(e,`icon`)]},this.getPTOptions(`itemIcon`,e,t)),label:a({class:this.cx(`itemLabel`)},this.getPTOptions(`itemLabel`,e,t)),submenuicon:a({class:this.cx(`submenuIcon`)},this.getPTOptions(`submenuicon`,e,t))}}},components:{ChevronRightIcon:j,ChevronDownIcon:M},directives:{ripple:A}},ee=[`tabindex`],te=[`id`,`aria-label`,`aria-expanded`,`aria-level`,`aria-setsize`,`aria-posinset`,`data-p-focused`,`data-p-disabled`],I=[`onClick`,`onMousemove`],L=[`href`,`target`];function R(g,_,v,y,b,x){var w=t(`PanelMenuSub`,!0),T=s(`ripple`);return i(),d(`ul`,{class:n(g.cx(`submenu`)),tabindex:v.tabindex},[(i(!0),d(p,null,o(v.items,function(t,o){return i(),d(p,{key:x.getItemKey(t)},[x.isItemVisible(t)&&!x.getItemProp(t,`separator`)?(i(),d(`li`,a({key:0,id:x.getItemId(t),class:[g.cx(`item`,{processedItem:t}),x.getItemProp(t,`class`)],style:x.getItemProp(t,`style`),role:`treeitem`,"aria-label":x.getItemLabel(t),"aria-expanded":x.isItemGroup(t)?x.isItemActive(t):void 0,"aria-level":v.level+1,"aria-setsize":x.getAriaSetSize(),"aria-posinset":x.getAriaPosInset(o)},{ref_for:!0},x.getPTOptions(`item`,t,o),{"data-p-focused":x.isItemFocused(t),"data-p-disabled":x.isItemDisabled(t)}),[f(`div`,a({class:g.cx(`itemContent`),onClick:function(e){return x.onItemClick(e,t)},onMousemove:function(e){return x.onItemMouseMove(e,t)}},{ref_for:!0},x.getPTOptions(`itemContent`,t,o)),[v.templates.item?(i(),m(r(v.templates.item),{key:1,item:t.item,root:!1,active:x.isItemActive(t),hasSubmenu:x.isItemGroup(t),label:x.getItemLabel(t),props:x.getMenuItemProps(t,o)},null,8,[`item`,`active`,`hasSubmenu`,`label`,`props`])):l((i(),d(`a`,a({key:0,href:x.getItemProp(t,`url`),class:g.cx(`itemLink`),target:x.getItemProp(t,`target`),tabindex:`-1`},{ref_for:!0},x.getPTOptions(`itemLink`,t,o)),[x.isItemGroup(t)?(i(),d(p,{key:0},[v.templates.submenuicon?(i(),m(r(v.templates.submenuicon),a({key:0,class:g.cx(`submenuIcon`),active:x.isItemActive(t)},{ref_for:!0},x.getPTOptions(`submenuIcon`,t,o)),null,16,[`class`,`active`])):(i(),m(r(x.isItemActive(t)?`ChevronDownIcon`:`ChevronRightIcon`),a({key:1,class:g.cx(`submenuIcon`)},{ref_for:!0},x.getPTOptions(`submenuIcon`,t,o)),null,16,[`class`]))],64)):u(``,!0),v.templates.itemicon?(i(),m(r(v.templates.itemicon),{key:1,item:t.item,class:n(g.cx(`itemIcon`))},null,8,[`item`,`class`])):x.getItemProp(t,`icon`)?(i(),d(`span`,a({key:2,class:[g.cx(`itemIcon`),x.getItemProp(t,`icon`)]},{ref_for:!0},x.getPTOptions(`itemIcon`,t,o)),null,16)):u(``,!0),f(`span`,a({class:g.cx(`itemLabel`)},{ref_for:!0},x.getPTOptions(`itemLabel`,t,o)),e(x.getItemLabel(t)),17)],16,L)),[[T]])],16,I),h(S,a({name:`p-collapsible`},{ref_for:!0},g.ptm(`transition`)),{default:c(function(){return[l(f(`div`,a({class:g.cx(`contentContainer`)},{ref_for:!0},g.ptm(`contentContainer`)),[f(`div`,a({class:g.cx(`contentWrapper`)},{ref_for:!0},g.ptm(`contentWrapper`)),[x.isItemVisible(t)&&x.isItemGroup(t)?(i(),m(w,a({key:0,id:x.getItemId(t)+`_list`,role:`group`,panelId:v.panelId,focusedItemId:v.focusedItemId,items:t.items,level:v.level+1,templates:v.templates,activeItemPath:v.activeItemPath,onItemToggle:x.onItemToggle,onItemMousemove:_[0]||=function(e){return g.$emit(`item-mousemove`,e)},pt:g.pt,unstyled:g.unstyled},{ref_for:!0},g.ptm(`submenu`)),null,16,[`id`,`panelId`,`focusedItemId`,`items`,`level`,`templates`,`activeItemPath`,`onItemToggle`,`pt`,`unstyled`])):u(``,!0)],16)],16),[[C,x.isItemActive(t)]])]}),_:2},1040)],16,te)):u(``,!0),x.isItemVisible(t)&&x.getItemProp(t,`separator`)?(i(),d(`li`,a({key:1,style:x.getItemProp(t,`style`),class:[g.cx(`separator`),x.getItemProp(t,`class`)],role:`separator`},{ref_for:!0},g.ptm(`separator`)),null,16)):u(``,!0)],64)}),128))],10,ee)}F.render=R;function z(e,t){return W(e)||U(e,t)||V(e,t)||B()}function B(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function V(e,t){if(e){if(typeof e==`string`)return H(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}function H(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function U(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t!==0)for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function W(e){if(Array.isArray(e))return e}var G={name:`PanelMenuList`,hostName:`PanelMenu`,extends:k,emits:[`item-toggle`,`header-focus`],props:{panelId:{type:String,default:null},items:{type:Array,default:null},templates:{type:Object,default:null},expandedKeys:{type:Object,default:null}},searchTimeout:null,searchValue:null,data:function(){return{focused:!1,focusedItem:null,activeItemPath:[]}},watch:{expandedKeys:function(e){this.autoUpdateActiveItemPath(e)}},created:function(){this.autoUpdateActiveItemPath(this.expandedKeys)},methods:{getItemProp:function(e,t){return e&&e.item?E(e.item[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.parentKey})},isItemGroup:function(e){return b(e.items)},onFocus:function(e){this.focused=!0,this.focusedItem=this.focusedItem||(this.isElementInPanel(e,e.relatedTarget)?this.findFirstItem():this.findLastItem())},onBlur:function(){this.focused=!1,this.focusedItem=null,this.searchValue=``},onKeyDown:function(e){var t=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`ArrowRight`:this.onArrowRightKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Space`:this.onSpaceKey(e);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:case`Tab`:case`PageDown`:case`PageUp`:case`Backspace`:case`ShiftLeft`:case`ShiftRight`:break;default:!t&&T(e.key)&&this.searchItems(e,e.key)}},onArrowDownKey:function(e){var t=b(this.focusedItem)?this.findNextItem(this.focusedItem):this.findFirstItem();this.changeFocusedItem({originalEvent:e,processedItem:t,focusOnNext:!0}),e.preventDefault()},onArrowUpKey:function(e){var t=b(this.focusedItem)?this.findPrevItem(this.focusedItem):this.findLastItem();this.changeFocusedItem({originalEvent:e,processedItem:t,selfCheck:!0}),e.preventDefault()},onArrowLeftKey:function(e){var t=this;b(this.focusedItem)&&(this.activeItemPath.some(function(e){return e.key===t.focusedItem.key})?this.activeItemPath=this.activeItemPath.filter(function(e){return e.key!==t.focusedItem.key}):this.focusedItem=b(this.focusedItem.parent)?this.focusedItem.parent:this.focusedItem,e.preventDefault())},onArrowRightKey:function(e){var t=this;b(this.focusedItem)&&(this.isItemGroup(this.focusedItem)&&(this.activeItemPath.some(function(e){return e.key===t.focusedItem.key})?this.onArrowDownKey(e):(this.activeItemPath=this.activeItemPath.filter(function(e){return e.parentKey!==t.focusedItem.parentKey}),this.activeItemPath.push(this.focusedItem))),e.preventDefault())},onHomeKey:function(e){this.changeFocusedItem({originalEvent:e,processedItem:this.findFirstItem(),allowHeaderFocus:!1}),e.preventDefault()},onEndKey:function(e){this.changeFocusedItem({originalEvent:e,processedItem:this.findLastItem(),focusOnNext:!0,allowHeaderFocus:!1}),e.preventDefault()},onEnterKey:function(e){if(b(this.focusedItem)){var t=w(this.$el,`li[id="${`${this.focusedItemId}`}"]`),n=t&&(w(t,`[data-pc-section="itemlink"]`)||w(t,`a,button`));n?n.click():t&&t.click()}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onItemToggle:function(e){var t=e.processedItem,n=e.expanded;this.expandedKeys?this.$emit(`item-toggle`,{item:t.item,expanded:n}):(this.activeItemPath=this.activeItemPath.filter(function(e){return e.parentKey!==t.parentKey}),n&&this.activeItemPath.push(t)),this.focusedItem=t,v(this.$el)},onItemMouseMove:function(e){this.focused&&(this.focusedItem=e.processedItem)},isElementInPanel:function(e,t){var n=e.currentTarget.closest(`[data-pc-section="panel"]`);return n&&n.contains(t)},isItemMatched:function(e){return this.isValidItem(e)&&this.getItemLabel(e)?.toLocaleLowerCase(this.searchLocale).startsWith(this.searchValue.toLocaleLowerCase(this.searchLocale))},isVisibleItem:function(e){return!!e&&(e.level===0||this.isItemActive(e))&&this.isItemVisible(e)},isValidItem:function(e){return!!e&&!this.isItemDisabled(e)&&!this.getItemProp(e,`separator`)},findFirstItem:function(){var e=this;return this.visibleItems.find(function(t){return e.isValidItem(t)})},findLastItem:function(){var e=this;return O(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItem:function(e){var t=this,n=this.visibleItems.findIndex(function(t){return t.key===e.key});return(n<this.visibleItems.length-1?this.visibleItems.slice(n+1).find(function(e){return t.isValidItem(e)}):void 0)||e},findPrevItem:function(e){var t=this,n=this.visibleItems.findIndex(function(t){return t.key===e.key});return(n>0?O(this.visibleItems.slice(0,n),function(e){return t.isValidItem(e)}):void 0)||e},searchItems:function(e,t){var n=this;this.searchValue=(this.searchValue||``)+t;var r=null,i=!1;if(b(this.focusedItem)){var a=this.visibleItems.findIndex(function(e){return e.key===n.focusedItem.key});r=this.visibleItems.slice(a).find(function(e){return n.isItemMatched(e)}),r=x(r)?this.visibleItems.slice(0,a).find(function(e){return n.isItemMatched(e)}):r}else r=this.visibleItems.find(function(e){return n.isItemMatched(e)});return b(r)&&(i=!0),x(r)&&x(this.focusedItem)&&(r=this.findFirstItem()),b(r)&&this.changeFocusedItem({originalEvent:e,processedItem:r,allowHeaderFocus:!1}),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){n.searchValue=``,n.searchTimeout=null},500),i},changeFocusedItem:function(e){var t=e.originalEvent,n=e.processedItem,r=e.focusOnNext,i=e.selfCheck,a=e.allowHeaderFocus,o=a===void 0||a;b(this.focusedItem)&&this.focusedItem.key!==n.key?(this.focusedItem=n,this.scrollInView()):o&&this.$emit(`header-focus`,{originalEvent:t,focusOnNext:r,selfCheck:i})},scrollInView:function(){var e=w(this.$el,`li[id="${`${this.focusedItemId}`}"]`);e&&e.scrollIntoView&&e.scrollIntoView({block:`nearest`,inline:`start`})},autoUpdateActiveItemPath:function(e){var t=this;this.activeItemPath=Object.entries(e||{}).reduce(function(e,n){var r=z(n,2),i=r[0];if(r[1]){var a=t.findProcessedItemByItemKey(i);a&&e.push(a)}return e},[])},findProcessedItemByItemKey:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0;if(t||=n===0&&this.processedItems,!t)return null;for(var r=0;r<t.length;r++){var i=t[r];if(this.getItemProp(i,`key`)===e)return i;var a=this.findProcessedItemByItemKey(e,i.items,n+1);if(a)return a}},createProcessedItems:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:``,a=[];return e&&e.forEach(function(e,o){var s=(i===``?``:i+`_`)+o,c={item:e,index:o,level:n,key:s,parent:r,parentKey:i};c.items=t.createProcessedItems(e.items,n+1,c,s),a.push(c)}),a},flatItems:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return e&&e.forEach(function(e){t.isVisibleItem(e)&&(n.push(e),t.flatItems(e.items,n))}),n}},computed:{processedItems:function(){return this.createProcessedItems(this.items||[])},visibleItems:function(){return this.flatItems(this.processedItems)},focusedItemId:function(){return b(this.focusedItem)?`${this.panelId}_${this.focusedItem.key}`:null}},components:{PanelMenuSub:F}};function K(e,n,r,o,s,c){var l=t(`PanelMenuSub`);return i(),m(l,a({id:r.panelId+`_list`,class:e.cx(`rootList`),role:`tree`,tabindex:-1,"aria-activedescendant":s.focused?c.focusedItemId:void 0,panelId:r.panelId,focusedItemId:s.focused?c.focusedItemId:void 0,items:c.processedItems,templates:r.templates,activeItemPath:s.activeItemPath,onFocus:c.onFocus,onBlur:c.onBlur,onKeydown:c.onKeyDown,onItemToggle:c.onItemToggle,onItemMousemove:c.onItemMouseMove,pt:e.pt,unstyled:e.unstyled},e.ptm(`rootList`)),null,16,[`id`,`class`,`aria-activedescendant`,`panelId`,`focusedItemId`,`items`,`templates`,`activeItemPath`,`onFocus`,`onBlur`,`onKeydown`,`onItemToggle`,`onItemMousemove`,`pt`,`unstyled`])}G.render=K;function q(e){"@babel/helpers - typeof";return q=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},q(e)}function J(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Y(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?J(Object(n),!0).forEach(function(t){X(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):J(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function X(e,t,n){return(t=Z(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Z(e){var t=ne(e,`string`);return q(t)==`symbol`?t:t+``}function ne(e,t){if(q(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(q(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Q={name:`PanelMenu`,extends:P,inheritAttrs:!1,emits:[`update:expandedKeys`,`panel-open`,`panel-close`],data:function(){return{activeItem:null,activeItems:[]}},methods:{getItemProp:function(e,t){return e?E(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},getPTOptions:function(e,t,n){return this.ptm(e,{context:{index:n,active:this.isItemActive(t),focused:this.isItemFocused(t),disabled:this.isItemDisabled(t)}})},isItemActive:function(e){return this.expandedKeys?this.expandedKeys[this.getItemProp(e,`key`)]:this.multiple?this.activeItems.some(function(t){return _(e,t)}):_(e,this.activeItem)},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemFocused:function(e){return _(e,this.activeItem)},isItemGroup:function(e){return b(e.items)},getPanelId:function(e){return`${this.$id}_${e}`},getPanelKey:function(e){return this.getPanelId(e)},getHeaderId:function(e){return`${this.getPanelId(e)}_header`},getContentId:function(e){return`${this.getPanelId(e)}_content`},onHeaderClick:function(e,t){if(this.isItemDisabled(t)){e.preventDefault();return}t.command&&t.command({originalEvent:e,item:t}),this.changeActiveItem(e,t),v(e.currentTarget)},onHeaderKeyDown:function(e,t){switch(e.code){case`ArrowDown`:this.onHeaderArrowDownKey(e);break;case`ArrowUp`:this.onHeaderArrowUpKey(e);break;case`Home`:this.onHeaderHomeKey(e);break;case`End`:this.onHeaderEndKey(e);break;case`Enter`:case`NumpadEnter`:case`Space`:this.onHeaderEnterKey(e,t)}},onHeaderArrowDownKey:function(e){var t=y(e.currentTarget,`data-p-active`)===!0?w(e.currentTarget.nextElementSibling,`[data-pc-section="rootlist"]`):null;t?v(t):this.updateFocusedHeader({originalEvent:e,focusOnNext:!0}),e.preventDefault()},onHeaderArrowUpKey:function(e){var t=this.findPrevHeader(e.currentTarget.parentElement)||this.findLastHeader(),n=y(t,`data-p-active`)===!0?w(t.nextElementSibling,`[data-pc-section="rootlist"]`):null;n?v(n):this.updateFocusedHeader({originalEvent:e,focusOnNext:!1}),e.preventDefault()},onHeaderHomeKey:function(e){this.changeFocusedHeader(e,this.findFirstHeader()),e.preventDefault()},onHeaderEndKey:function(e){this.changeFocusedHeader(e,this.findLastHeader()),e.preventDefault()},onHeaderEnterKey:function(e,t){var n=w(e.currentTarget,`[data-pc-section="headerlink"]`);n?n.click():this.onHeaderClick(e,t),e.preventDefault()},findNextHeader:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.nextElementSibling,n=w(t,`[data-pc-section="header"]`);return n?y(n,`data-p-disabled`)?this.findNextHeader(n.parentElement):n:null},findPrevHeader:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.previousElementSibling,n=w(t,`[data-pc-section="header"]`);return n?y(n,`data-p-disabled`)?this.findPrevHeader(n.parentElement):n:null},findFirstHeader:function(){return this.findNextHeader(this.$el.firstElementChild,!0)},findLastHeader:function(){return this.findPrevHeader(this.$el.lastElementChild,!0)},updateFocusedHeader:function(e){var t=e.originalEvent,n=e.focusOnNext,r=e.selfCheck,i=t.currentTarget.closest(`[data-pc-section="panel"]`),a=r?w(i,`[data-pc-section="header"]`):n?this.findNextHeader(i):this.findPrevHeader(i);a?this.changeFocusedHeader(t,a):n?this.onHeaderHomeKey(t):this.onHeaderEndKey(t)},changeActiveItem:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0&&arguments[2];if(!this.isItemDisabled(t)){var r=this.isItemActive(t),i=r?`panel-close`:`panel-open`;this.activeItem=n?t:this.activeItem&&_(t,this.activeItem)?null:t,this.multiple&&(this.activeItems.some(function(e){return _(t,e)})?this.activeItems=this.activeItems.filter(function(e){return!_(t,e)}):this.activeItems.push(t)),this.changeExpandedKeys({item:t,expanded:!r}),this.$emit(i,{originalEvent:e,item:t})}},changeExpandedKeys:function(e){var t=e.item,n=e.expanded,r=n!==void 0&&n;if(this.expandedKeys){var i=Y({},this.expandedKeys);r?i[t.key]=!0:delete i[t.key],this.$emit(`update:expandedKeys`,i)}},changeFocusedHeader:function(e,t){t&&v(t)},getMenuItemProps:function(e,t){return{icon:a({class:[this.cx(`headerIcon`),this.getItemProp(e,`icon`)]},this.getPTOptions(`headerIcon`,e,t)),label:a({class:this.cx(`headerLabel`)},this.getPTOptions(`headerLabel`,e,t))}}},components:{PanelMenuList:G,ChevronRightIcon:j,ChevronDownIcon:M}},$=[`id`],re=[`id`,`tabindex`,`aria-label`,`aria-expanded`,`aria-controls`,`aria-disabled`,`onClick`,`onKeydown`,`data-p-active`,`data-p-disabled`],ie=[`href`],ae=[`id`,`aria-labelledby`];function oe(s,_,v,y,b,x){var w=t(`PanelMenuList`);return i(),d(`div`,a({id:s.$id,class:s.cx(`root`)},s.ptmi(`root`)),[(i(!0),d(p,null,o(s.model,function(t,o){return i(),d(p,{key:x.getPanelKey(o)},[x.isItemVisible(t)?(i(),d(`div`,a({key:0,style:x.getItemProp(t,`style`),class:[s.cx(`panel`),x.getItemProp(t,`class`)]},{ref_for:!0},s.ptm(`panel`)),[f(`div`,a({id:x.getHeaderId(o),class:[s.cx(`header`,{item:t}),x.getItemProp(t,`headerClass`)],tabindex:x.isItemDisabled(t)?-1:s.tabindex,role:`button`,"aria-label":x.getItemLabel(t),"aria-expanded":x.isItemActive(t),"aria-controls":x.getContentId(o),"aria-disabled":x.isItemDisabled(t),onClick:function(e){return x.onHeaderClick(e,t)},onKeydown:function(e){return x.onHeaderKeyDown(e,t)}},{ref_for:!0},x.getPTOptions(`header`,t,o),{"data-p-active":x.isItemActive(t),"data-p-disabled":x.isItemDisabled(t)}),[f(`div`,a({class:s.cx(`headerContent`)},{ref_for:!0},x.getPTOptions(`headerContent`,t,o)),[s.$slots.item?(i(),m(r(s.$slots.item),{key:1,item:t,root:!0,active:x.isItemActive(t),hasSubmenu:x.isItemGroup(t),label:x.getItemLabel(t),props:x.getMenuItemProps(t,o)},null,8,[`item`,`active`,`hasSubmenu`,`label`,`props`])):(i(),d(`a`,a({key:0,href:x.getItemProp(t,`url`),class:s.cx(`headerLink`),tabindex:-1},{ref_for:!0},x.getPTOptions(`headerLink`,t,o)),[x.getItemProp(t,`items`)?g(s.$slots,`submenuicon`,{key:0,active:x.isItemActive(t)},function(){return[(i(),m(r(x.isItemActive(t)?`ChevronDownIcon`:`ChevronRightIcon`),a({class:s.cx(`submenuIcon`)},{ref_for:!0},x.getPTOptions(`submenuIcon`,t,o)),null,16,[`class`]))]}):u(``,!0),s.$slots.headericon?(i(),m(r(s.$slots.headericon),{key:1,item:t,class:n([s.cx(`headerIcon`),x.getItemProp(t,`icon`)])},null,8,[`item`,`class`])):x.getItemProp(t,`icon`)?(i(),d(`span`,a({key:2,class:[s.cx(`headerIcon`),x.getItemProp(t,`icon`)]},{ref_for:!0},x.getPTOptions(`headerIcon`,t,o)),null,16)):u(``,!0),f(`span`,a({class:s.cx(`headerLabel`)},{ref_for:!0},x.getPTOptions(`headerLabel`,t,o)),e(x.getItemLabel(t)),17)],16,ie))],16)],16,re),h(S,a({name:`p-collapsible`},{ref_for:!0},s.ptm(`transition`)),{default:c(function(){return[l(f(`div`,a({id:x.getContentId(o),class:s.cx(`contentContainer`),role:`region`,"aria-labelledby":x.getHeaderId(o)},{ref_for:!0},s.ptm(`contentContainer`)),[f(`div`,a({class:s.cx(`contentWrapper`)},{ref_for:!0},s.ptm(`contentWrapper`)),[x.getItemProp(t,`items`)?(i(),d(`div`,a({key:0,class:s.cx(`content`)},{ref_for:!0},s.ptm(`content`)),[h(w,{panelId:x.getPanelId(o),items:x.getItemProp(t,`items`),templates:s.$slots,expandedKeys:s.expandedKeys,onItemToggle:x.changeExpandedKeys,onHeaderFocus:x.updateFocusedHeader,pt:s.pt,unstyled:s.unstyled},null,8,[`panelId`,`items`,`templates`,`expandedKeys`,`onItemToggle`,`onHeaderFocus`,`pt`,`unstyled`])],16)):u(``,!0)],16)],16,ae),[[C,x.isItemActive(t)]])]}),_:2},1040)],16)):u(``,!0)],64)}),128))],16,$)}Q.render=oe;export{Q as default};