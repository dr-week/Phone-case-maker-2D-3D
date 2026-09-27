import{At as e,B as t,Dt as n,H as r,I as i,O as a,X as o,Z as s,d as c,f as l,l as u,u as d,v as f,z as p}from"./Ca5TY7vb.js";import{t as m}from"./CRHlWn3X.js";import{Rt as h,Vt as g,o as _}from"#entry";import{t as v}from"./BAPwTHkl.js";import{t as y}from"./BnSyHpKn.js";import{n as b}from"./Bg9ykqvC.js";import{t as x}from"./P6At4ZqW.js";import{t as S}from"./9Rv2Li6F.js";var C=_.extend({name:`panel`,style:`
    .p-panel {
        display: block;
        border: 1px solid dt('panel.border.color');
        border-radius: dt('panel.border.radius');
        background: dt('panel.background');
        color: dt('panel.color');
    }

    .p-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: dt('panel.header.padding');
        background: dt('panel.header.background');
        color: dt('panel.header.color');
        border-style: solid;
        border-width: dt('panel.header.border.width');
        border-color: dt('panel.header.border.color');
        border-radius: dt('panel.header.border.radius');
    }

    .p-panel-toggleable .p-panel-header {
        padding: dt('panel.toggleable.header.padding');
    }

    .p-panel-title {
        line-height: 1;
        font-weight: dt('panel.title.font.weight');
    }

    .p-panel-content-container {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-panel-content-wrapper {
        min-height: 0;
    }

    .p-panel-content {
        padding: dt('panel.content.padding');
    }

    .p-panel-footer {
        padding: dt('panel.footer.padding');
    }
`,classes:{root:function(e){return[`p-panel p-component`,{"p-panel-toggleable":e.props.toggleable}]},header:`p-panel-header`,title:`p-panel-title`,headerActions:`p-panel-header-actions`,pcToggleButton:`p-panel-toggle-button`,contentContainer:`p-panel-content-container`,contentWrapper:`p-panel-content-wrapper`,content:`p-panel-content`,footer:`p-panel-footer`}}),w={name:`Panel`,extends:{name:`BasePanel`,extends:v,props:{header:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:Object,default:function(){return{severity:`secondary`,text:!0,rounded:!0}}}},style:C,provide:function(){return{$pcPanel:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:collapsed`,`toggle`],data:function(){return{d_collapsed:this.collapsed}},watch:{collapsed:function(e){this.d_collapsed=e}},methods:{toggle:function(e){this.d_collapsed=!this.d_collapsed,this.$emit(`update:collapsed`,this.d_collapsed),this.$emit(`toggle`,{originalEvent:e,value:this.d_collapsed})},onKeyDown:function(e){(e.code===`Enter`||e.code===`NumpadEnter`||e.code===`Space`)&&(this.toggle(e),e.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.header},dataP:function(){return m({toggleable:this.toggleable})}},components:{PlusIcon:S,MinusIcon:x,Button:b},directives:{ripple:y}},T=[`data-p`],E=[`data-p`],D=[`id`],O=[`id`,`aria-labelledby`];function k(m,_,v,y,b,x){var S=t(`Button`);return i(),l(`div`,a({class:m.cx(`root`),"data-p":x.dataP},m.ptmi(`root`)),[u(`div`,a({class:m.cx(`header`),"data-p":x.dataP},m.ptm(`header`)),[p(m.$slots,`header`,{id:m.$id+`_header`,class:n(m.cx(`title`)),collapsed:b.d_collapsed},function(){return[m.header?(i(),l(`span`,a({key:0,id:m.$id+`_header`,class:m.cx(`title`)},m.ptm(`title`)),e(m.header),17,D)):c(``,!0)]}),u(`div`,a({class:m.cx(`headerActions`)},m.ptm(`headerActions`)),[p(m.$slots,`icons`),m.toggleable?p(m.$slots,`togglebutton`,{key:0,collapsed:b.d_collapsed,toggleCallback:function(e){return x.toggle(e)},keydownCallback:function(e){return x.onKeyDown(e)}},function(){return[f(S,a({id:m.$id+`_header`,class:m.cx(`pcToggleButton`),"aria-label":x.buttonAriaLabel,"aria-controls":m.$id+`_content`,"aria-expanded":!b.d_collapsed,unstyled:m.unstyled,onClick:_[0]||=function(e){return x.toggle(e)},onKeydown:_[1]||=function(e){return x.onKeyDown(e)}},m.toggleButtonProps,{pt:m.ptm(`pcToggleButton`)}),{icon:o(function(e){return[p(m.$slots,m.$slots.toggleicon?`toggleicon`:`togglericon`,{collapsed:b.d_collapsed},function(){return[(i(),d(r(b.d_collapsed?`PlusIcon`:`MinusIcon`),a({class:e.class},m.ptm(`pcToggleButton`).icon),null,16,[`class`]))]})]}),_:3},16,[`id`,`class`,`aria-label`,`aria-controls`,`aria-expanded`,`unstyled`,`pt`])]}):c(``,!0)],16)],16,E),f(h,a({name:`p-collapsible`},m.ptm(`transition`)),{default:o(function(){return[s(u(`div`,a({id:m.$id+`_content`,class:m.cx(`contentContainer`),role:`region`,"aria-labelledby":m.$id+`_header`},m.ptm(`contentContainer`)),[u(`div`,a({class:m.cx(`contentWrapper`)},m.ptm(`contentWrapper`)),[u(`div`,a({class:m.cx(`content`)},m.ptm(`content`)),[p(m.$slots,`default`)],16),m.$slots.footer?(i(),l(`div`,a({key:0,class:m.cx(`footer`)},m.ptm(`footer`)),[p(m.$slots,`footer`)],16)):c(``,!0)],16)],16,O),[[g,!b.d_collapsed]])]}),_:3},16)],16,T)}w.render=k;export{w as default};