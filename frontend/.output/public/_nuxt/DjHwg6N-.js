import{I as e,O as t,f as n,l as r,z as i}from"./Ca5TY7vb.js";import{o as a}from"#entry";import{t as o}from"./BAPwTHkl.js";var s=a.extend({name:`toolbar`,style:`
    .p-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: dt('toolbar.padding');
        background: dt('toolbar.background');
        border: 1px solid dt('toolbar.border.color');
        color: dt('toolbar.color');
        border-radius: dt('toolbar.border.radius');
        gap: dt('toolbar.gap');
    }

    .p-toolbar-start,
    .p-toolbar-center,
    .p-toolbar-end {
        display: flex;
        align-items: center;
    }
`,classes:{root:`p-toolbar p-component`,start:`p-toolbar-start`,center:`p-toolbar-center`,end:`p-toolbar-end`}}),c={name:`Toolbar`,extends:{name:`BaseToolbar`,extends:o,props:{ariaLabelledby:{type:String,default:null}},style:s,provide:function(){return{$pcToolbar:this,$parentInstance:this}}},inheritAttrs:!1},l=[`aria-labelledby`];function u(a,o,s,c,u,d){return e(),n(`div`,t({class:a.cx(`root`),role:`toolbar`,"aria-labelledby":a.ariaLabelledby},a.ptmi(`root`)),[r(`div`,t({class:a.cx(`start`)},a.ptm(`start`)),[i(a.$slots,`start`)],16),r(`div`,t({class:a.cx(`center`)},a.ptm(`center`)),[i(a.$slots,`center`)],16),r(`div`,t({class:a.cx(`end`)},a.ptm(`end`)),[i(a.$slots,`end`)],16)],16,l)}c.render=u;export{c as default};