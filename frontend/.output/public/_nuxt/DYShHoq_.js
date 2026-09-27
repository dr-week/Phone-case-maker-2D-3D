import{At as e,B as t,Dt as n,H as r,I as i,O as a,R as o,d as s,f as c,l,r as u,u as d,v as f,z as p}from"./Ca5TY7vb.js";import{o as m}from"#entry";import{t as h}from"./BAPwTHkl.js";import{t as g}from"./CAbdQ6wj.js";var _=m.extend({name:`breadcrumb`,style:`
    .p-breadcrumb {
        background: dt('breadcrumb.background');
        padding: dt('breadcrumb.padding');
        overflow-x: auto;
    }

    .p-breadcrumb-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: dt('breadcrumb.gap');
    }

    .p-breadcrumb-separator {
        display: flex;
        align-items: center;
        color: dt('breadcrumb.separator.color');
    }

    .p-breadcrumb-separator-icon:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-breadcrumb::-webkit-scrollbar {
        display: none;
    }

    .p-breadcrumb-item-link {
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: dt('breadcrumb.item.gap');
        transition:
            background dt('breadcrumb.transition.duration'),
            color dt('breadcrumb.transition.duration'),
            outline-color dt('breadcrumb.transition.duration'),
            box-shadow dt('breadcrumb.transition.duration');
        border-radius: dt('breadcrumb.item.border.radius');
        outline-color: transparent;
        color: dt('breadcrumb.item.color');
    }

    .p-breadcrumb-item-link:focus-visible {
        box-shadow: dt('breadcrumb.item.focus.ring.shadow');
        outline: dt('breadcrumb.item.focus.ring.width') dt('breadcrumb.item.focus.ring.style') dt('breadcrumb.item.focus.ring.color');
        outline-offset: dt('breadcrumb.item.focus.ring.offset');
    }

    .p-breadcrumb-item-link:hover .p-breadcrumb-item-label {
        color: dt('breadcrumb.item.hover.color');
    }

    .p-breadcrumb-item-label {
        transition: inherit;
    }

    .p-breadcrumb-item-icon {
        color: dt('breadcrumb.item.icon.color');
        transition: inherit;
    }

    .p-breadcrumb-item-link:hover .p-breadcrumb-item-icon {
        color: dt('breadcrumb.item.icon.hover.color');
    }
`,classes:{root:`p-breadcrumb p-component`,list:`p-breadcrumb-list`,homeItem:`p-breadcrumb-home-item`,separator:`p-breadcrumb-separator`,separatorIcon:`p-breadcrumb-separator-icon`,item:function(e){return[`p-breadcrumb-item`,{"p-disabled":e.instance.disabled()}]},itemLink:`p-breadcrumb-item-link`,itemIcon:`p-breadcrumb-item-icon`,itemLabel:`p-breadcrumb-item-label`}}),v={name:`BaseBreadcrumb`,extends:h,props:{model:{type:Array,default:null},home:{type:null,default:null}},style:_,provide:function(){return{$pcBreadcrumb:this,$parentInstance:this}}},y={name:`BreadcrumbItem`,hostName:`Breadcrumb`,extends:h,props:{item:null,templates:null,index:null},methods:{onClick:function(e){this.item.command&&this.item.command({originalEvent:e,item:this.item})},visible:function(){return typeof this.item.visible==`function`?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled==`function`?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label==`function`?this.item.label():this.item.label},isCurrentUrl:function(){var e=this.item,t=e.to,n=e.url,r=typeof window<`u`?window.location.pathname:``;return t===r||n===r?`page`:void 0}},computed:{ptmOptions:function(){return{context:{item:this.item,index:this.index}}},getMenuItemProps:function(){var e=this;return{action:a({class:this.cx(`itemLink`),"aria-current":this.isCurrentUrl(),onClick:function(t){return e.onClick(t)}},this.ptm(`itemLink`,this.ptmOptions)),icon:a({class:[this.cx(`icon`),this.item.icon]},this.ptm(`icon`,this.ptmOptions)),label:a({class:this.cx(`label`)},this.ptm(`label`,this.ptmOptions))}}}},b=[`href`,`target`,`aria-current`];function x(t,o,l,u,f,p){return p.visible()?(i(),c(`li`,a({key:0,class:[t.cx(`item`),l.item.class]},t.ptm(`item`,p.ptmOptions)),[l.templates.item?(i(),d(r(l.templates.item),{key:1,item:l.item,label:p.label(),props:p.getMenuItemProps},null,8,[`item`,`label`,`props`])):(i(),c(`a`,a({key:0,href:l.item.url||`#`,class:t.cx(`itemLink`),target:l.item.target,"aria-current":p.isCurrentUrl(),onClick:o[0]||=function(){return p.onClick&&p.onClick.apply(p,arguments)}},t.ptm(`itemLink`,p.ptmOptions)),[l.templates&&l.templates.itemicon?(i(),d(r(l.templates.itemicon),{key:0,item:l.item,class:n(t.cx(`itemIcon`,p.ptmOptions))},null,8,[`item`,`class`])):l.item.icon?(i(),c(`span`,a({key:1,class:[t.cx(`itemIcon`),l.item.icon]},t.ptm(`itemIcon`,p.ptmOptions)),null,16)):s(``,!0),l.item.label?(i(),c(`span`,a({key:2,class:t.cx(`itemLabel`)},t.ptm(`itemLabel`,p.ptmOptions)),e(p.label()),17)):s(``,!0)],16,b))],16)):s(``,!0)}y.render=x;var S={name:`Breadcrumb`,extends:v,inheritAttrs:!1,components:{BreadcrumbItem:y,ChevronRightIcon:g}};function C(e,n,r,m,h,g){var _=t(`BreadcrumbItem`),v=t(`ChevronRightIcon`);return i(),c(`nav`,a({class:e.cx(`root`)},e.ptmi(`root`)),[l(`ol`,a({class:e.cx(`list`)},e.ptm(`list`)),[e.home?(i(),d(_,a({key:0,item:e.home,class:e.cx(`homeItem`),templates:e.$slots,pt:e.pt,unstyled:e.unstyled},e.ptm(`homeItem`)),null,16,[`item`,`class`,`templates`,`pt`,`unstyled`])):s(``,!0),(i(!0),c(u,null,o(e.model,function(t,n){return i(),c(u,{key:t.label+`_`+n},[e.home||n!==0?(i(),c(`li`,a({key:0,class:e.cx(`separator`)},{ref_for:!0},e.ptm(`separator`)),[p(e.$slots,`separator`,{},function(){return[f(v,a({"aria-hidden":`true`,class:e.cx(`separatorIcon`)},{ref_for:!0},e.ptm(`separatorIcon`)),null,16,[`class`])]})],16)):s(``,!0),f(_,{item:t,index:n,templates:e.$slots,pt:e.pt,unstyled:e.unstyled},null,8,[`item`,`index`,`templates`,`pt`,`unstyled`])],64)}),128))],16)],16)}S.render=C;export{S as default};