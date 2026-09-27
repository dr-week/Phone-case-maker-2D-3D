import{I as e,O as t,d as n,f as r,l as i,z as a}from"./Ca5TY7vb.js";import{o}from"#entry";import{t as s}from"./BAPwTHkl.js";var c=o.extend({name:`card`,style:`
    .p-card {
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
    }
`,classes:{root:`p-card p-component`,header:`p-card-header`,body:`p-card-body`,caption:`p-card-caption`,title:`p-card-title`,subtitle:`p-card-subtitle`,content:`p-card-content`,footer:`p-card-footer`}}),l={name:`Card`,extends:{name:`BaseCard`,extends:s,style:c,provide:function(){return{$pcCard:this,$parentInstance:this}}},inheritAttrs:!1};function u(o,s,c,l,u,d){return e(),r(`div`,t({class:o.cx(`root`)},o.ptmi(`root`)),[o.$slots.header?(e(),r(`div`,t({key:0,class:o.cx(`header`)},o.ptm(`header`)),[a(o.$slots,`header`)],16)):n(``,!0),i(`div`,t({class:o.cx(`body`)},o.ptm(`body`)),[o.$slots.title||o.$slots.subtitle?(e(),r(`div`,t({key:0,class:o.cx(`caption`)},o.ptm(`caption`)),[o.$slots.title?(e(),r(`div`,t({key:0,class:o.cx(`title`)},o.ptm(`title`)),[a(o.$slots,`title`)],16)):n(``,!0),o.$slots.subtitle?(e(),r(`div`,t({key:1,class:o.cx(`subtitle`)},o.ptm(`subtitle`)),[a(o.$slots,`subtitle`)],16)):n(``,!0)],16)):n(``,!0),i(`div`,t({class:o.cx(`content`)},o.ptm(`content`)),[a(o.$slots,`content`)],16),o.$slots.footer?(e(),r(`div`,t({key:1,class:o.cx(`footer`)},o.ptm(`footer`)),[a(o.$slots,`footer`)],16)):n(``,!0)],16)],16)}l.render=u;export{l as default};