import{At as e,B as t,Dt as n,H as r,I as i,O as a,Ot as o,R as s,V as c,X as l,Z as u,_ as d,d as f,f as p,h as m,l as h,r as g,u as _,v as ee,z as v}from"./Ca5TY7vb.js";import{t as y}from"./CRHlWn3X.js";import{A as b,Ct as x,Dt as S,F as te,G as ne,H as C,J as w,M as T,Rt as re,T as E,V as D,bt as ie,ct as O,jt as k,l as ae,nt as oe,o as se,ot as A,v as ce,x as le,z as ue}from"#entry";import{t as j}from"./BAPwTHkl.js";import{t as de}from"./DNrkBYt1.js";import{n as fe}from"./CSO9HMND.js";import{t as pe}from"./BnSyHpKn.js";import{t as me}from"./CAbdQ6wj.js";import{t as he}from"./Cm8kdziv.js";import{n as ge,r as M}from"./CujpVRyB.js";import{t as _e}from"./CESKisby.js";import{t as ve}from"./P6At4ZqW.js";import{n as ye}from"./i5-H45TZ.js";import be from"./Cd_tTuv4.js";import{n as N,r as P,t as F}from"./ld6Qrtia.js";var xe=se.extend({name:`treetable`,style:`
    .p-treetable {
        position: relative;
    }

    .p-treetable-table {
        border-spacing: 0;
        border-collapse: separate;
        width: 100%;
    }

    .p-treetable-scrollable > .p-treetable-table-container {
        position: relative;
    }

    .p-treetable-scrollable-table > .p-treetable-thead {
        inset-block-start: 0;
        z-index: 1;
    }

    .p-treetable-scrollable-table > .p-treetable-frozen-tbody {
        position: sticky;
        z-index: 1;
    }

    .p-treetable-scrollable-table > .p-treetable-tfoot {
        inset-block-end: 0;
        z-index: 1;
    }

    .p-treetable-scrollable .p-treetable-frozen-column {
        position: sticky;
        background: dt('treetable.header.cell.background');
    }

    .p-treetable-scrollable th.p-treetable-frozen-column {
        z-index: 1;
    }

    .p-treetable-scrollable > .p-treetable-table-container > .p-treetable-table > .p-treetable-thead {
        background: dt('treetable.header.cell.background');
    }

    .p-treetable-scrollable > .p-treetable-table-container > .p-treetable-table > .p-treetable-tfoot {
        background: dt('treetable.footer.cell.background');
    }

    .p-treetable-flex-scrollable {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .p-treetable-flex-scrollable > .p-treetable-table-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
    }

    .p-treetable-scrollable-table > .p-treetable-tbody > .p-treetable-row-group-header {
        position: sticky;
        z-index: 1;
    }

    .p-treetable-resizable-table > .p-treetable-thead > tr > th,
    .p-treetable-resizable-table > .p-treetable-tfoot > tr > td,
    .p-treetable-resizable-table > .p-treetable-tbody > tr > td {
        overflow: hidden;
        white-space: nowrap;
    }

    .p-treetable-resizable-table > .p-treetable-thead > tr > th.p-treetable-resizable-column:not(.p-treetable-frozen-column) {
        background-clip: padding-box;
        position: relative;
    }

    .p-treetable-resizable-table-fit > .p-treetable-thead > tr > th.p-treetable-resizable-column:last-child .p-treetable-column-resizer {
        display: none;
    }

    .p-treetable-column-resizer {
        display: block;
        position: absolute;
        inset-block-start: 0;
        inset-inline-end: 0;
        margin: 0;
        width: dt('treetable.column.resizer.width');
        height: 100%;
        padding: 0;
        cursor: col-resize;
        border: 1px solid transparent;
    }

    .p-treetable-column-header-content {
        display: flex;
        align-items: center;
        gap: dt('treetable.header.cell.gap');
    }

    .p-treetable-column-resize-indicator {
        width: dt('treetable.resize.indicator.width');
        position: absolute;
        z-index: 10;
        display: none;
        background: dt('treetable.resize.indicator.color');
    }

    .p-treetable-mask {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }

    .p-treetable-paginator-top {
        border-color: dt('treetable.paginator.top.border.color');
        border-style: solid;
        border-width: dt('treetable.paginator.top.border.width');
    }

    .p-treetable-paginator-bottom {
        border-color: dt('treetable.paginator.bottom.border.color');
        border-style: solid;
        border-width: dt('treetable.paginator.bottom.border.width');
    }

    .p-treetable-header {
        background: dt('treetable.header.background');
        color: dt('treetable.header.color');
        border-color: dt('treetable.header.border.color');
        border-style: solid;
        border-width: dt('treetable.header.border.width');
        padding: dt('treetable.header.padding');
    }

    .p-treetable-footer {
        background: dt('treetable.footer.background');
        color: dt('treetable.footer.color');
        border-color: dt('treetable.footer.border.color');
        border-style: solid;
        border-width: dt('treetable.footer.border.width');
        padding: dt('treetable.footer.padding');
    }

    .p-treetable-header-cell {
        padding: dt('treetable.header.cell.padding');
        background: dt('treetable.header.cell.background');
        border-color: dt('treetable.header.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        color: dt('treetable.header.cell.color');
        font-weight: normal;
        text-align: start;
        transition:
            background dt('treetable.transition.duration'),
            color dt('treetable.transition.duration'),
            border-color dt('treetable.transition.duration'),
            outline-color dt('treetable.transition.duration'),
            box-shadow dt('treetable.transition.duration');
    }

    .p-treetable-column-title {
        font-weight: dt('treetable.column.title.font.weight');
    }

    .p-treetable-tbody > tr {
        outline-color: transparent;
        background: dt('treetable.row.background');
        color: dt('treetable.row.color');
        transition:
            background dt('treetable.transition.duration'),
            color dt('treetable.transition.duration'),
            border-color dt('treetable.transition.duration'),
            outline-color dt('treetable.transition.duration'),
            box-shadow dt('treetable.transition.duration');
    }

    .p-treetable-tbody > tr > td {
        text-align: start;
        border-color: dt('treetable.body.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        padding: dt('treetable.body.cell.padding');
    }

    .p-treetable-hoverable .p-treetable-tbody > tr:not(.p-treetable-row-selected):hover {
        background: dt('treetable.row.hover.background');
        color: dt('treetable.row.hover.color');
    }

    .p-treetable-tbody > tr.p-treetable-row-selected {
        background: dt('treetable.row.selected.background');
        color: dt('treetable.row.selected.color');
    }

    .p-treetable-tbody > tr:has(+ .p-treetable-row-selected) > td {
        border-block-end-color: dt('treetable.body.cell.selected.border.color');
    }

    .p-treetable-tbody > tr.p-treetable-row-selected > td {
        border-block-end-color: dt('treetable.body.cell.selected.border.color');
    }

    .p-treetable-tbody > tr:focus-visible,
    .p-treetable-tbody > tr.p-treetable-contextmenu-row-selected {
        box-shadow: dt('treetable.row.focus.ring.shadow');
        outline: dt('treetable.row.focus.ring.width') dt('treetable.row.focus.ring.style') dt('treetable.row.focus.ring.color');
        outline-offset: dt('treetable.row.focus.ring.offset');
    }

    .p-treetable-tfoot > tr > td {
        text-align: start;
        padding: dt('treetable.footer.cell.padding');
        border-color: dt('treetable.footer.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        color: dt('treetable.footer.cell.color');
        background: dt('treetable.footer.cell.background');
    }

    .p-treetable-column-footer {
        font-weight: dt('treetable.column.footer.font.weight');
    }

    .p-treetable-sortable-column {
        cursor: pointer;
        user-select: none;
        outline-color: transparent;
    }

    .p-treetable-column-title,
    .p-treetable-sort-icon,
    .p-treetable-sort-badge {
        vertical-align: middle;
    }

    .p-treetable-sort-icon {
        color: dt('treetable.sort.icon.color');
        font-size: dt('treetable.sort.icon.size');
        width: dt('treetable.sort.icon.size');
        height: dt('treetable.sort.icon.size');
        transition: color dt('treetable.transition.duration');
    }

    .p-treetable-sortable-column:not(.p-treetable-column-sorted):hover {
        background: dt('treetable.header.cell.hover.background');
        color: dt('treetable.header.cell.hover.color');
    }

    .p-treetable-sortable-column:not(.p-treetable-column-sorted):hover .p-treetable-sort-icon {
        color: dt('treetable.sort.icon.hover.color');
    }

    .p-treetable-column-sorted {
        background: dt('treetable.header.cell.selected.background');
        color: dt('treetable.header.cell.selected.color');
    }

    .p-treetable-column-sorted .p-treetable-sort-icon {
        color: dt('treetable.header.cell.selected.color');
    }

    .p-treetable-sortable-column:focus-visible {
        box-shadow: dt('treetable.header.cell.focus.ring.shadow');
        outline: dt('treetable.header.cell.focus.ring.width') dt('treetable.header.cell.focus.ring.style') dt('treetable.header.cell.focus.ring.color');
        outline-offset: dt('treetable.header.cell.focus.ring.offset');
    }

    .p-treetable-hoverable .p-treetable-selectable-row {
        cursor: pointer;
    }

    .p-treetable-loading-icon {
        font-size: dt('treetable.loading.icon.size');
        width: dt('treetable.loading.icon.size');
        height: dt('treetable.loading.icon.size');
    }

    .p-treetable-gridlines .p-treetable-header {
        border-width: 1px 1px 0 1px;
    }

    .p-treetable-gridlines .p-treetable-footer {
        border-width: 0 1px 1px 1px;
    }

    .p-treetable-gridlines .p-treetable-paginator-top {
        border-width: 1px 1px 0 1px;
    }

    .p-treetable-gridlines .p-treetable-paginator-bottom {
        border-width: 0 1px 1px 1px;
    }

    .p-treetable-gridlines .p-treetable-thead > tr > th {
        border-width: 1px 0 1px 1px;
    }

    .p-treetable-gridlines .p-treetable-thead > tr > th:last-child {
        border-width: 1px;
    }

    .p-treetable-gridlines .p-treetable-tbody > tr > td {
        border-width: 1px 0 0 1px;
    }

    .p-treetable-gridlines .p-treetable-tbody > tr > td:last-child {
        border-width: 1px 1px 0 1px;
    }

    .p-treetable-gridlines .p-treetable-tbody > tr:last-child > td {
        border-width: 1px 0 1px 1px;
    }

    .p-treetable-gridlines .p-treetable-tbody > tr:last-child > td:last-child {
        border-width: 1px;
    }

    .p-treetable-gridlines .p-treetable-tfoot > tr > td {
        border-width: 1px 0 1px 1px;
    }

    .p-treetable-gridlines .p-treetable-tfoot > tr > td:last-child {
        border-width: 1px 1px 1px 1px;
    }

    .p-treetable.p-treetable-gridlines .p-treetable-thead + .p-treetable-tfoot > tr > td {
        border-width: 0 0 1px 1px;
    }

    .p-treetable.p-treetable-gridlines .p-treetable-thead + .p-treetable-tfoot > tr > td:last-child {
        border-width: 0 1px 1px 1px;
    }

    .p-treetable.p-treetable-gridlines:has(.p-treetable-thead):has(.p-treetable-tbody) .p-treetable-tbody > tr > td {
        border-width: 0 0 1px 1px;
    }

    .p-treetable.p-treetable-gridlines:has(.p-treetable-thead):has(.p-treetable-tbody) .p-treetable-tbody > tr > td:last-child {
        border-width: 0 1px 1px 1px;
    }

    .p-treetable.p-treetable-gridlines:has(.p-treetable-tbody):has(.p-treetable-tfoot) .p-treetable-tbody > tr:last-child > td {
        border-width: 0 0 0 1px;
    }

    .p-treetable.p-treetable-gridlines:has(.p-treetable-tbody):has(.p-treetable-tfoot) .p-treetable-tbody > tr:last-child > td:last-child {
        border-width: 0 1px 0 1px;
    }

    .p-treetable.p-treetable-sm .p-treetable-header {
        padding: 0.375rem 0.5rem;
    }

    .p-treetable.p-treetable-sm .p-treetable-thead > tr > th {
        padding: 0.375rem 0.5rem;
    }

    .p-treetable.p-treetable-sm .p-treetable-tbody > tr > td {
        padding: 0.375rem 0.5rem;
    }

    .p-treetable.p-treetable-sm .p-treetable-tfoot > tr > td {
        padding: 0.375rem 0.5rem;
    }

    .p-treetable.p-treetable-sm .p-treetable-footer {
        padding: 0.375rem 0.5rem;
    }

    .p-treetable.p-treetable-lg .p-treetable-header {
        padding: 0.9375rem 1.25rem;
    }

    .p-treetable.p-treetable-lg .p-treetable-thead > tr > th {
        padding: 0.9375rem 1.25rem;
    }

    .p-treetable.p-treetable-lg .p-treetable-tbody > tr > td {
        padding: 0.9375rem 1.25rem;
    }

    .p-treetable.p-treetable-lg .p-treetable-tfoot > tr > td {
        padding: 0.9375rem 1.25rem;
    }

    .p-treetable.p-treetable-lg .p-treetable-footer {
        padding: 0.9375rem 1.25rem;
    }

    .p-treetable-body-cell-content {
        display: flex;
        align-items: center;
        gap: dt('treetable.body.cell.gap');
    }

    .p-treetable-tbody > tr.p-treetable-row-selected .p-treetable-node-toggle-button {
        color: inherit;
    }

    .p-treetable-node-toggle-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: dt('treetable.node.toggle.button.size');
        height: dt('treetable.node.toggle.button.size');
        color: dt('treetable.node.toggle.button.color');
        border: 0 none;
        background: transparent;
        cursor: pointer;
        border-radius: dt('treetable.node.toggle.button.border.radius');
        transition:
            background dt('treetable.transition.duration'),
            color dt('treetable.transition.duration'),
            border-color dt('treetable.transition.duration'),
            outline-color dt('treetable.transition.duration'),
            box-shadow dt('treetable.transition.duration');
        outline-color: transparent;
        user-select: none;
    }

    .p-treetable-node-toggle-button:enabled:hover {
        color: dt('treetable.node.toggle.button.hover.color');
        background: dt('treetable.node.toggle.button.hover.background');
    }

    .p-treetable-tbody > tr.p-treetable-row-selected .p-treetable-node-toggle-button:hover {
        background: dt('treetable.node.toggle.button.selected.hover.background');
        color: dt('treetable.node.toggle.button.selected.hover.color');
    }

    .p-treetable-node-toggle-button:focus-visible {
        box-shadow: dt('treetable.node.toggle.button.focus.ring.shadow');
        outline: dt('treetable.node.toggle.button.focus.ring.width') dt('treetable.node.toggle.button.focus.ring.style') dt('treetable.node.toggle.button.focus.ring.color');
        outline-offset: dt('treetable.node.toggle.button.focus.ring.offset');
    }

    .p-treetable-node-toggle-icon:dir(rtl) {
        transform: rotate(180deg);
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-treetable p-component`,{"p-treetable-hoverable":n.rowHover||t.rowSelectionMode,"p-treetable-resizable":n.resizableColumns,"p-treetable-resizable-fit":n.resizableColumns&&n.columnResizeMode===`fit`,"p-treetable-scrollable":n.scrollable,"p-treetable-flex-scrollable":n.scrollable&&n.scrollHeight===`flex`,"p-treetable-gridlines":n.showGridlines,"p-treetable-sm":n.size===`small`,"p-treetable-lg":n.size===`large`}]},loading:`p-treetable-loading`,mask:`p-treetable-mask p-overlay-mask`,loadingIcon:`p-treetable-loading-icon`,header:`p-treetable-header`,paginator:function(e){return`p-treetable-paginator-`+e.position},tableContainer:`p-treetable-table-container`,table:function(e){var t=e.props;return[`p-treetable-table`,{"p-treetable-scrollable-table":t.scrollable,"p-treetable-resizable-table":t.resizableColumns,"p-treetable-resizable-table-fit":t.resizableColumns&&t.columnResizeMode===`fit`}]},thead:`p-treetable-thead`,headerCell:function(e){var t=e.instance,n=e.props;return[`p-treetable-header-cell`,{"p-treetable-sortable-column":t.columnProp(`sortable`),"p-treetable-resizable-column":n.resizableColumns,"p-treetable-column-sorted":t.columnProp(`sortable`)?t.isColumnSorted():!1,"p-treetable-frozen-column":t.columnProp(`frozen`)}]},columnResizer:`p-treetable-column-resizer`,columnHeaderContent:`p-treetable-column-header-content`,columnTitle:`p-treetable-column-title`,sortIcon:`p-treetable-sort-icon`,pcSortBadge:`p-treetable-sort-badge`,tbody:`p-treetable-tbody`,row:function(e){var t=e.props,n=e.instance;return[{"p-treetable-selectable-row":n.$parentInstance.rowSelectionMode,"p-treetable-row-selected":n.selected,"p-treetable-contextmenu-row-selected":t.contextMenuSelection&&n.isSelectedWithContextMenu}]},bodyCell:function(e){return[{"p-treetable-frozen-column":e.instance.columnProp(`frozen`)}]},bodyCellContent:function(e){return[`p-treetable-body-cell-content`,{"p-treetable-body-cell-content-expander":e.instance.columnProp(`expander`)}]},nodeToggleButton:`p-treetable-node-toggle-button`,nodeToggleIcon:`p-treetable-node-toggle-icon`,pcNodeCheckbox:`p-treetable-node-checkbox`,emptyMessage:`p-treetable-empty-message`,tfoot:`p-treetable-tfoot`,footerCell:function(e){return[{"p-treetable-frozen-column":e.instance.columnProp(`frozen`)}]},footer:`p-treetable-footer`,columnResizeIndicator:`p-treetable-column-resize-indicator`},inlineStyles:{tableContainer:{overflow:`auto`},thead:{position:`sticky`},tfoot:{position:`sticky`}}}),Se={name:`BaseTreeTable`,extends:j,props:{value:{type:null,default:null},dataKey:{type:[String,Function],default:`key`},expandedKeys:{type:null,default:null},selectionKeys:{type:null,default:null},selectionMode:{type:String,default:null},metaKeySelection:{type:Boolean,default:!1},contextMenu:{type:Boolean,default:!1},contextMenuSelection:{type:Object,default:null},rows:{type:Number,default:0},first:{type:Number,default:0},totalRecords:{type:Number,default:0},paginator:{type:Boolean,default:!1},paginatorPosition:{type:String,default:`bottom`},alwaysShowPaginator:{type:Boolean,default:!0},paginatorTemplate:{type:String,default:`FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown`},pageLinkSize:{type:Number,default:5},rowsPerPageOptions:{type:Array,default:null},currentPageReportTemplate:{type:String,default:`({currentPage} of {totalPages})`},lazy:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},loadingMode:{type:String,default:`mask`},rowHover:{type:Boolean,default:!1},autoLayout:{type:Boolean,default:!1},sortField:{type:[String,Function],default:null},sortOrder:{type:Number,default:null},defaultSortOrder:{type:Number,default:1},multiSortMeta:{type:Array,default:null},sortMode:{type:String,default:`single`},removableSort:{type:Boolean,default:!1},filters:{type:Object,default:null},filterMode:{type:String,default:`lenient`},filterLocale:{type:String,default:void 0},resizableColumns:{type:Boolean,default:!1},columnResizeMode:{type:String,default:`fit`},indentation:{type:Number,default:1},showGridlines:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},scrollHeight:{type:String,default:null},size:{type:String,default:null},tableStyle:{type:null,default:null},tableClass:{type:[String,Object],default:null},tableProps:{type:Object,default:null}},style:xe,provide:function(){return{$pcTreeTable:this,$parentInstance:this}}},I={name:`FooterCell`,hostName:`TreeTable`,extends:j,props:{column:{type:Object,default:null},index:{type:Number,default:null}},data:function(){return{styleObject:{}}},mounted:function(){this.columnProp(`frozen`)&&this.updateStickyPosition()},updated:function(){this.columnProp(`frozen`)&&this.updateStickyPosition()},methods:{columnProp:function(e){return M(this.column,e)},getColumnPT:function(e){var t={props:this.column.props,parent:{instance:this,props:this.$props,state:this.$data},context:{index:this.index,frozen:this.columnProp(`frozen`),size:this.$parentInstance?.size}};return a(this.ptm(`column.${e}`,{column:t}),this.ptm(`column.${e}`,t),this.ptmo(this.getColumnProp(),e,t))},getColumnProp:function(){return this.column.props&&this.column.props.pt?this.column.props.pt:void 0},updateStickyPosition:function(){if(this.columnProp(`frozen`)){if(this.columnProp(`alignFrozen`)===`right`){var e=0,t=D(this.$el,`[data-p-frozen-column="true"]`);t&&(e=A(t)+parseFloat(t.style[`inset-inline-end`]||0)),this.styleObject.insetInlineEnd=e+`px`}else{var n=0,r=b(this.$el,`[data-p-frozen-column="true"]`);r&&(n=A(r)+parseFloat(r.style[`inset-inline-start`]||0)),this.styleObject.insetInlineStart=n+`px`}}}},computed:{containerClass:function(){return[this.columnProp(`footerClass`),this.columnProp(`class`),this.cx(`footerCell`)]},containerStyle:function(){var e=this.columnProp(`footerStyle`),t=this.columnProp(`style`);return this.columnProp(`frozen`)?[t,e,this.styleObject]:[t,e]}}};function L(e){"@babel/helpers - typeof";return L=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},L(e)}function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Ce(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?R(Object(n),!0).forEach(function(t){we(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function we(e,t,n){return(t=Te(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Te(e){var t=Ee(e,`string`);return L(t)==`symbol`?t:t+``}function Ee(e,t){if(L(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(L(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var De=[`data-p-frozen-column`];function Oe(t,n,o,s,c,l){return i(),p(`td`,a({style:l.containerStyle,class:l.containerClass,role:`cell`},Ce(Ce({},l.getColumnPT(`root`)),l.getColumnPT(`footerCell`)),{"data-p-frozen-column":l.columnProp(`frozen`)}),[o.column.children&&o.column.children.footer?(i(),_(r(o.column.children.footer),{key:0,column:o.column},null,8,[`column`])):f(``,!0),l.columnProp(`footer`)?(i(),p(`span`,a({key:1,class:t.cx(`columnFooter`)},l.getColumnPT(`columnFooter`)),e(l.columnProp(`footer`)),17)):f(``,!0)],16,De)}I.render=Oe;var ke={name:`HeaderCell`,hostName:`TreeTable`,extends:j,emits:[`column-click`,`column-resizestart`],props:{column:{type:Object,default:null},resizableColumns:{type:Boolean,default:!1},sortField:{type:[String,Function],default:null},sortOrder:{type:Number,default:null},multiSortMeta:{type:Array,default:null},sortMode:{type:String,default:`single`},index:{type:Number,default:null}},data:function(){return{styleObject:{}}},mounted:function(){this.columnProp(`frozen`)&&this.updateStickyPosition()},updated:function(){this.columnProp(`frozen`)&&this.updateStickyPosition()},methods:{columnProp:function(e){return M(this.column,e)},getColumnPT:function(e){var t={props:this.column.props,parent:{instance:this,props:this.$props,state:this.$data},context:{index:this.index,sorted:this.isColumnSorted(),frozen:this.$parentInstance.scrollable&&this.columnProp(`frozen`),resizable:this.resizableColumns,scrollable:this.$parentInstance.scrollable,showGridlines:this.$parentInstance.showGridlines,size:this.$parentInstance?.size}};return a(this.ptm(`column.${e}`,{column:t}),this.ptm(`column.${e}`,t),this.ptmo(this.getColumnProp(),e,t))},getColumnProp:function(){return this.column.props&&this.column.props.pt?this.column.props.pt:void 0},updateStickyPosition:function(){if(this.columnProp(`frozen`)){if(this.columnProp(`alignFrozen`)===`right`){var e=0,t=D(this.$el,`[data-p-frozen-column="true"]`);t&&(e=A(t)+parseFloat(t.style[`inset-inline-end`]||0)),this.styleObject.insetInlineEnd=e+`px`}else{var n=0,r=b(this.$el,`[data-p-frozen-column="true"]`);r&&(n=A(r)+parseFloat(r.style[`inset-inline-start`]||0)),this.styleObject.insetInlineStart=n+`px`}var i=this.$el.parentElement.nextElementSibling;if(i){var a=le(this.$el);i.children[a].style[`inset-inline-start`]=this.styleObject[`inset-inline-start`],i.children[a].style[`inset-inline-end`]=this.styleObject[`inset-inline-end`]}}},onClick:function(e){this.$emit(`column-click`,{originalEvent:e,column:this.column})},onKeyDown:function(e){(e.code===`Enter`||e.code===`NumpadEnter`||e.code===`Space`)&&e.currentTarget.nodeName===`TH`&&T(e.currentTarget,`data-p-sortable-column`)&&(this.$emit(`column-click`,{originalEvent:e,column:this.column}),e.preventDefault())},onResizeStart:function(e){this.$emit(`column-resizestart`,e)},getMultiSortMetaIndex:function(){for(var e=-1,t=0;t<this.multiSortMeta.length;t++){var n=this.multiSortMeta[t];if(n.field===this.columnProp(`field`)||n.field===this.columnProp(`sortField`)){e=t;break}}return e},isMultiSorted:function(){return this.columnProp(`sortable`)&&this.getMultiSortMetaIndex()>-1},isColumnSorted:function(){return this.sortMode===`single`?this.sortField&&(this.sortField===this.columnProp(`field`)||this.sortField===this.columnProp(`sortField`)):this.isMultiSorted()}},computed:{containerClass:function(){return[this.columnProp(`headerClass`),this.columnProp(`class`),this.cx(`headerCell`)]},containerStyle:function(){var e=this.columnProp(`headerStyle`),t=this.columnProp(`style`);return this.columnProp(`frozen`)?[t,e,this.styleObject]:[t,e]},sortState:function(){var e=!1,t=null;if(this.sortMode===`single`)e=this.sortField&&(this.sortField===this.columnProp(`field`)||this.sortField===this.columnProp(`sortField`)),t=e?this.sortOrder:0;else if(this.sortMode===`multiple`){var n=this.getMultiSortMetaIndex();n>-1&&(e=!0,t=this.multiSortMeta[n].order)}return{sorted:e,sortOrder:t}},sortableColumnIcon:function(){var e=this.sortState,t=e.sorted,n=e.sortOrder;return t?t&&n>0?F:t&&n<0?N:null:P},ariaSort:function(){if(this.columnProp(`sortable`)){var e=this.sortState,t=e.sorted,n=e.sortOrder;return t&&n<0?`descending`:t&&n>0?`ascending`:`none`}return null}},components:{Badge:fe,SortAltIcon:P,SortAmountUpAltIcon:F,SortAmountDownIcon:N}};function z(e){"@babel/helpers - typeof";return z=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},z(e)}function Ae(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function je(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Ae(Object(n),!0).forEach(function(t){Me(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ae(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Me(e,t,n){return(t=Ne(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ne(e){var t=Pe(e,`string`);return z(t)==`symbol`?t:t+``}function Pe(e,t){if(z(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(z(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Fe=[`tabindex`,`aria-sort`,`data-p-sortable-column`,`data-p-resizable-column`,`data-p-sorted`,`data-p-frozen-column`];function Ie(n,s,c,l,u,d){var m=t(`Badge`);return i(),p(`th`,a({class:d.containerClass,style:[d.containerStyle],onClick:s[1]||=function(){return d.onClick&&d.onClick.apply(d,arguments)},onKeydown:s[2]||=function(){return d.onKeyDown&&d.onKeyDown.apply(d,arguments)},tabindex:d.columnProp(`sortable`)?`0`:null,"aria-sort":d.ariaSort,role:`columnheader`},je(je({},d.getColumnPT(`root`)),d.getColumnPT(`headerCell`)),{"data-p-sortable-column":d.columnProp(`sortable`),"data-p-resizable-column":c.resizableColumns,"data-p-sorted":d.isColumnSorted(),"data-p-frozen-column":d.columnProp(`frozen`)}),[c.resizableColumns&&!d.columnProp(`frozen`)?(i(),p(`span`,a({key:0,class:n.cx(`columnResizer`),onMousedown:s[0]||=function(){return d.onResizeStart&&d.onResizeStart.apply(d,arguments)}},d.getColumnPT(`columnResizer`)),null,16)):f(``,!0),h(`div`,a({class:n.cx(`columnHeaderContent`)},d.getColumnPT(`columnHeaderContent`)),[c.column.children&&c.column.children.header?(i(),_(r(c.column.children.header),{key:0,column:c.column},null,8,[`column`])):f(``,!0),d.columnProp(`header`)?(i(),p(`span`,a({key:1,class:n.cx(`columnTitle`)},d.getColumnPT(`columnTitle`)),e(d.columnProp(`header`)),17)):f(``,!0),d.columnProp(`sortable`)?(i(),p(`span`,o(a({key:2},d.getColumnPT(`sort`))),[(i(),_(r(c.column.children&&c.column.children.sorticon||d.sortableColumnIcon),a({sorted:d.sortState.sorted,sortOrder:d.sortState.sortOrder,class:n.cx(`sortIcon`)},d.getColumnPT(`sortIcon`)),null,16,[`sorted`,`sortOrder`,`class`]))],16)):f(``,!0),d.isMultiSorted()?(i(),_(m,a({key:3,class:n.cx(`pcSortBadge`)},d.getColumnPT(`pcSortBadge`),{value:d.getMultiSortMetaIndex()+1,size:`small`}),null,16,[`class`,`value`])):f(``,!0)],16)],16,Fe)}ke.render=Ie;var B={name:`BodyCell`,hostName:`TreeTable`,extends:j,emits:[`node-toggle`,`checkbox-toggle`],props:{node:{type:Object,default:null},column:{type:Object,default:null},level:{type:Number,default:0},indentation:{type:Number,default:1},leaf:{type:Boolean,default:!1},expanded:{type:Boolean,default:!1},selectionMode:{type:String,default:null},checked:{type:Boolean,default:!1},partialChecked:{type:Boolean,default:!1},templates:{type:Object,default:null},index:{type:Number,default:null},loadingMode:{type:String,default:`mask`}},data:function(){return{styleObject:{}}},mounted:function(){this.columnProp(`frozen`)&&this.updateStickyPosition()},updated:function(){this.columnProp(`frozen`)&&this.updateStickyPosition()},methods:{toggle:function(){this.$emit(`node-toggle`,this.node)},columnProp:function(e){return M(this.column,e)},getColumnPT:function(e){var t={props:this.column.props,parent:{instance:this,props:this.$props,state:this.$data},context:{index:this.index,selectable:this.$parentInstance.rowHover||this.$parentInstance.rowSelectionMode,selected:this.$parent.selected,frozen:this.columnProp(`frozen`),scrollable:this.$parentInstance.scrollable,showGridlines:this.$parentInstance.showGridlines,size:this.$parentInstance?.size,node:this.node}};return a(this.ptm(`column.${e}`,{column:t}),this.ptm(`column.${e}`,t),this.ptmo(this.getColumnProp(),e,t))},getColumnProp:function(){return this.column.props&&this.column.props.pt?this.column.props.pt:void 0},getColumnCheckboxPT:function(e){var t={props:this.column.props,parent:{instance:this,props:this.$props,state:this.$data},context:{checked:this.checked,partialChecked:this.partialChecked,node:this.node}};return a(this.ptm(`column.${e}`,{column:t}),this.ptm(`column.${e}`,t),this.ptmo(this.getColumnProp(),e,t))},updateStickyPosition:function(){if(this.columnProp(`frozen`)){if(this.columnProp(`alignFrozen`)===`right`){var e=0,t=D(this.$el,`[data-p-frozen-column="true"]`);t&&(e=A(t)+parseFloat(t.style[`inset-inline-end`]||0)),this.styleObject.insetInlineEnd=e+`px`}else{var n=0,r=b(this.$el,`[data-p-frozen-column="true"]`);r&&(n=A(r)+parseFloat(r.style[`inset-inline-start`]||0)),this.styleObject.insetInlineStart=n+`px`}}},resolveFieldData:function(e,t){return k(e,t)},toggleCheckbox:function(){this.$emit(`checkbox-toggle`)}},computed:{containerClass:function(){return[this.columnProp(`bodyClass`),this.columnProp(`class`),this.cx(`bodyCell`)]},containerStyle:function(){var e=this.columnProp(`bodyStyle`),t=this.columnProp(`style`);return this.columnProp(`frozen`)?[t,e,this.styleObject]:[t,e]},togglerStyle:function(){return{marginLeft:this.level*this.indentation+`rem`,visibility:this.leaf?`hidden`:`visible`}},checkboxSelectionMode:function(){return this.selectionMode===`checkbox`}},components:{Checkbox:ye,ChevronRightIcon:me,ChevronDownIcon:he,CheckIcon:_e,MinusIcon:ve,SpinnerIcon:de},directives:{ripple:pe}};function V(e){"@babel/helpers - typeof";return V=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},V(e)}function Le(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Re(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Le(Object(n),!0).forEach(function(t){ze(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Le(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ze(e,t,n){return(t=Be(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Be(e){var t=Ve(e,`string`);return V(t)==`symbol`?t:t+``}function Ve(e,t){if(V(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(V(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var He=[`data-p-frozen-column`];function Ue(o,s,m,ee,v,y){var b=t(`SpinnerIcon`),x=t(`Checkbox`),S=c(`ripple`);return i(),p(`td`,a({style:y.containerStyle,class:y.containerClass,role:`cell`},Re(Re({},y.getColumnPT(`root`)),y.getColumnPT(`bodyCell`)),{"data-p-frozen-column":y.columnProp(`frozen`)}),[h(`div`,a({class:o.cx(`bodyCellContent`)},y.getColumnPT(`bodyCellContent`)),[y.columnProp(`expander`)?u((i(),p(`button`,a({key:0,type:`button`,class:o.cx(`nodeToggleButton`),onClick:s[0]||=function(){return y.toggle&&y.toggle.apply(y,arguments)},style:y.togglerStyle,tabindex:`-1`},y.getColumnPT(`nodeToggleButton`),{"data-pc-group-section":`rowactionbutton`}),[m.node.loading&&m.loadingMode===`icon`?(i(),p(g,{key:0},[m.templates.nodetoggleicon?(i(),_(r(m.templates.nodetoggleicon),{key:0})):f(``,!0),m.templates.nodetogglericon?(i(),_(r(m.templates.nodetogglericon),{key:1})):(i(),_(b,a({key:2,spin:``},o.ptm(`nodetoggleicon`)),null,16))],64)):(i(),p(g,{key:1},[m.column.children&&m.column.children.rowtoggleicon?(i(),_(r(m.column.children.rowtoggleicon),{key:0,node:m.node,expanded:m.expanded,class:n(o.cx(`nodeToggleIcon`))},null,8,[`node`,`expanded`,`class`])):m.templates.nodetoggleicon?(i(),_(r(m.templates.nodetoggleicon),{key:1,node:m.node,expanded:m.expanded,class:n(o.cx(`nodeToggleIcon`))},null,8,[`node`,`expanded`,`class`])):m.column.children&&m.column.children.rowtogglericon?(i(),_(r(m.column.children.rowtogglericon),{key:2,node:m.node,expanded:m.expanded,class:n(o.cx(`nodeToggleIcon`))},null,8,[`node`,`expanded`,`class`])):m.expanded?(i(),_(r(m.node.expandedIcon?`span`:`ChevronDownIcon`),a({key:3,class:o.cx(`nodeToggleIcon`)},y.getColumnPT(`nodeToggleIcon`)),null,16,[`class`])):(i(),_(r(m.node.collapsedIcon?`span`:`ChevronRightIcon`),a({key:4,class:o.cx(`nodeToggleIcon`)},y.getColumnPT(`nodeToggleIcon`)),null,16,[`class`]))],64))],16)),[[S]]):f(``,!0),y.checkboxSelectionMode&&y.columnProp(`expander`)?(i(),_(x,{key:1,modelValue:m.checked,binary:!0,class:n(o.cx(`pcNodeCheckbox`)),disabled:m.node.selectable===!1,onChange:y.toggleCheckbox,tabindex:-1,indeterminate:m.partialChecked,unstyled:o.unstyled,pt:y.getColumnCheckboxPT(`pcNodeCheckbox`),"data-p-partialchecked":m.partialChecked},{icon:l(function(e){return[m.templates.checkboxicon?(i(),_(r(m.templates.checkboxicon),{key:0,checked:e.checked,partialChecked:m.partialChecked,class:n(e.class)},null,8,[`checked`,`partialChecked`,`class`])):f(``,!0)]}),_:1},8,[`modelValue`,`class`,`disabled`,`onChange`,`indeterminate`,`unstyled`,`pt`,`data-p-partialchecked`])):f(``,!0),m.column.children&&m.column.children.body?(i(),_(r(m.column.children.body),{key:2,node:m.node,column:m.column},null,8,[`node`,`column`])):(i(),p(g,{key:3},[d(e(y.resolveFieldData(m.node.data,y.columnProp(`field`))),1)],64))],16)],16,He)}B.render=Ue;function H(e){"@babel/helpers - typeof";return H=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},H(e)}function U(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=Xe(e))||t){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function We(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function W(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?We(Object(n),!0).forEach(function(t){Ge(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):We(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Ge(e,t,n){return(t=Ke(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ke(e){var t=qe(e,`string`);return H(t)==`symbol`?t:t+``}function qe(e,t){if(H(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(H(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Je(e){return Qe(e)||Ze(e)||Xe(e)||Ye()}function Ye(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Xe(e,t){if(e){if(typeof e==`string`)return G(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?G(e,t):void 0}}function Ze(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Qe(e){if(Array.isArray(e))return G(e)}function G(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var $e={name:`TreeTableRow`,hostName:`TreeTable`,extends:j,emits:[`node-click`,`node-toggle`,`checkbox-change`,`nodeClick`,`nodeToggle`,`checkboxChange`,`row-rightclick`,`rowRightclick`],props:{node:{type:null,default:null},dataKey:{type:[String,Function],default:`key`},parentNode:{type:null,default:null},columns:{type:null,default:null},expandedKeys:{type:null,default:null},selectionKeys:{type:null,default:null},selectionMode:{type:String,default:null},level:{type:Number,default:0},indentation:{type:Number,default:1},tabindex:{type:Number,default:-1},ariaSetSize:{type:Number,default:null},ariaPosInset:{type:Number,default:null},loadingMode:{type:String,default:`mask`},templates:{type:Object,default:null},contextMenu:{type:Boolean,default:!1},contextMenuSelection:{type:Object,default:null}},nodeTouched:!1,methods:{columnProp:function(e,t){return M(e,t)},toggle:function(){this.$emit(`node-toggle`,this.node)},onClick:function(e){ce(e.target)||T(e.target,`data-pc-section`)===`nodetogglebutton`||T(e.target,`data-pc-section`)===`nodetoggleicon`||e.target.tagName===`path`||(this.setTabIndexForSelectionMode(e,this.nodeTouched),this.$emit(`node-click`,{originalEvent:e,nodeTouched:this.nodeTouched,node:this.node}),this.nodeTouched=!1)},onRowRightClick:function(e){this.$emit(`row-rightclick`,{originalEvent:e,node:this.node})},onTouchEnd:function(){this.nodeTouched=!0},nodeKey:function(e){return k(e,this.dataKey)},onKeyDown:function(e,t){switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`ArrowRight`:this.onArrowRightKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Enter`:case`NumpadEnter`:case`Space`:ce(e.target)||this.onEnterKey(e,t);break;case`Tab`:this.onTabKey(e)}},onArrowDownKey:function(e){var t=e.currentTarget.nextElementSibling;t&&this.focusRowChange(e.currentTarget,t),e.preventDefault()},onArrowUpKey:function(e){var t=e.currentTarget.previousElementSibling;t&&this.focusRowChange(e.currentTarget,t),e.preventDefault()},onArrowRightKey:function(e){var t=this,n=O(e.currentTarget,`button`).style.visibility===`hidden`,r=O(this.$refs.node,`[data-pc-section="nodetogglebutton"]`);n||(!this.expanded&&r.click(),this.$nextTick(function(){t.onArrowDownKey(e)}),e.preventDefault())},onArrowLeftKey:function(e){if(this.level!==0||this.expanded){var t=e.currentTarget,n=O(t,`button`).style.visibility===`hidden`,r=O(t,`[data-pc-section="nodetogglebutton"]`);if(this.expanded&&!n){r.click();return}var i=this.findBeforeClickableNode(t);i&&this.focusRowChange(t,i)}},onHomeKey:function(e){var t=O(e.currentTarget.parentElement,`tr[aria-level="${this.level+1}"]`);t&&w(t),e.preventDefault()},onEndKey:function(e){var t=C(e.currentTarget.parentElement,`tr[aria-level="${this.level+1}"]`),n=t[t.length-1];w(n),e.preventDefault()},onEnterKey:function(e){if(e.preventDefault(),this.setTabIndexForSelectionMode(e,this.nodeTouched),this.selectionMode===`checkbox`){this.toggleCheckbox();return}this.$emit(`node-click`,{originalEvent:e,nodeTouched:this.nodeTouched,node:this.node}),this.nodeTouched=!1},onTabKey:function(){var e=Je(C(this.$refs.node.parentElement,`tr`)),t=e.some(function(e){return T(e,`data-p-selected`)||e.getAttribute(`aria-checked`)===`true`});if(e.forEach(function(e){e.tabIndex=-1}),t){var n=e.filter(function(e){return T(e,`data-p-selected`)||e.getAttribute(`aria-checked`)===`true`});n[0].tabIndex=0;return}e[0].tabIndex=0},focusRowChange:function(e,t){e.tabIndex=`-1`,t.tabIndex=`0`,w(t)},findBeforeClickableNode:function(e){var t=e.previousElementSibling;if(t){var n=t.querySelector(`button`);return n&&n.style.visibility!==`hidden`?t:this.findBeforeClickableNode(t)}return null},toggleCheckbox:function(){var e=this.selectionKeys?W({},this.selectionKeys):{},t=!this.checked;this.propagateDown(this.node,t,e),this.$emit(`checkbox-change`,{node:this.node,check:t,selectionKeys:e})},propagateDown:function(e,t,n){if(t?n[this.nodeKey(e)]={checked:!0,partialChecked:!1}:delete n[this.nodeKey(e)],e.children&&e.children.length){var r=U(e.children),i;try{for(r.s();!(i=r.n()).done;){var a=i.value;this.propagateDown(a,t,n)}}catch(e){r.e(e)}finally{r.f()}}},propagateUp:function(e){var t=e.check,n=W({},e.selectionKeys),r=0,i=!1,a=U(this.node.children),o;try{for(a.s();!(o=a.n()).done;){var s=o.value;n[this.nodeKey(s)]&&n[this.nodeKey(s)].checked?r++:n[this.nodeKey(s)]&&n[this.nodeKey(s)].partialChecked&&(i=!0)}}catch(e){a.e(e)}finally{a.f()}t&&r===this.node.children.length?n[this.nodeKey(this.node)]={checked:!0,partialChecked:!1}:(t||delete n[this.nodeKey(this.node)],i||r>0&&r!==this.node.children.length?n[this.nodeKey(this.node)]={checked:!1,partialChecked:!0}:n[this.nodeKey(this.node)]={checked:!1,partialChecked:!1}),this.$emit(`checkbox-change`,{node:e.node,check:e.check,selectionKeys:n})},onCheckboxChange:function(e){var t=e.check,n=W({},e.selectionKeys),r=0,i=!1,a=U(this.node.children),o;try{for(a.s();!(o=a.n()).done;){var s=o.value;n[this.nodeKey(s)]&&n[this.nodeKey(s)].checked?r++:n[this.nodeKey(s)]&&n[this.nodeKey(s)].partialChecked&&(i=!0)}}catch(e){a.e(e)}finally{a.f()}t&&r===this.node.children.length?n[this.nodeKey(this.node)]={checked:!0,partialChecked:!1}:(t||delete n[this.nodeKey(this.node)],i||r>0&&r!==this.node.children.length?n[this.nodeKey(this.node)]={checked:!1,partialChecked:!0}:n[this.nodeKey(this.node)]={checked:!1,partialChecked:!1}),this.$emit(`checkbox-change`,{node:e.node,check:e.check,selectionKeys:n})},setTabIndexForSelectionMode:function(e,t){if(this.selectionMode!==null){var n=Je(C(this.$refs.node.parentElement,`tr`));e.currentTarget.tabIndex=t===!1?-1:0,n.every(function(e){return e.tabIndex===-1})&&(n[0].tabIndex=0)}}},computed:{containerClass:function(){return[this.node.styleClass,this.cx(`row`)]},expanded:function(){return this.expandedKeys&&this.expandedKeys[this.nodeKey(this.node)]===!0},leaf:function(){return this.node.leaf!==!1&&!(this.node.children&&this.node.children.length)},selected:function(){return this.selectionMode&&this.selectionKeys?this.selectionKeys[this.nodeKey(this.node)]===!0:!1},isSelectedWithContextMenu:function(){return this.node&&this.contextMenuSelection?S(this.node,this.contextMenuSelection,this.dataKey):!1},checked:function(){return this.selectionKeys?this.selectionKeys[this.nodeKey(this.node)]&&this.selectionKeys[this.nodeKey(this.node)].checked:!1},partialChecked:function(){return this.selectionKeys?this.selectionKeys[this.nodeKey(this.node)]&&this.selectionKeys[this.nodeKey(this.node)].partialChecked:!1},getAriaSelected:function(){return this.selectionMode===`single`||this.selectionMode===`multiple`?this.selected:null},ptmOptions:function(){return{context:{selectable:this.$parentInstance.rowHover||this.$parentInstance.rowSelectionMode,selected:this.selected,scrollable:this.$parentInstance.scrollable}}}},components:{TTBodyCell:B}},et=[`tabindex`,`aria-expanded`,`aria-level`,`aria-setsize`,`aria-posinset`,`aria-selected`,`aria-checked`,`data-p-selected`,`data-p-selected-contextmenu`];function tt(e,n,r,o,c,l){var u=t(`TTBodyCell`),d=t(`TreeTableRow`,!0);return i(),p(g,null,[h(`tr`,a({ref:`node`,class:l.containerClass,style:r.node.style,tabindex:r.tabindex,role:`row`,"aria-expanded":r.node.children&&r.node.children.length?l.expanded:void 0,"aria-level":r.level+1,"aria-setsize":r.ariaSetSize,"aria-posinset":r.ariaPosInset,"aria-selected":l.getAriaSelected,"aria-checked":l.checked||void 0,onClick:n[1]||=function(){return l.onClick&&l.onClick.apply(l,arguments)},onKeydown:n[2]||=function(){return l.onKeyDown&&l.onKeyDown.apply(l,arguments)},onTouchend:n[3]||=function(){return l.onTouchEnd&&l.onTouchEnd.apply(l,arguments)},onContextmenu:n[4]||=function(){return l.onRowRightClick&&l.onRowRightClick.apply(l,arguments)}},e.ptm(`row`,l.ptmOptions),{"data-p-selected":l.selected,"data-p-selected-contextmenu":r.contextMenuSelection&&l.isSelectedWithContextMenu}),[(i(!0),p(g,null,s(r.columns,function(t,a){return i(),p(g,{key:l.columnProp(t,`columnKey`)||l.columnProp(t,`field`)||a},[l.columnProp(t,`hidden`)?f(``,!0):(i(),_(u,{key:0,column:t,node:r.node,level:r.level,leaf:l.leaf,indentation:r.indentation,expanded:l.expanded,selectionMode:r.selectionMode,checked:l.checked,partialChecked:l.partialChecked,templates:r.templates,onNodeToggle:n[0]||=function(t){return e.$emit(`node-toggle`,t)},onCheckboxToggle:l.toggleCheckbox,index:a,loadingMode:r.loadingMode,unstyled:e.unstyled,pt:e.pt},null,8,[`column`,`node`,`level`,`leaf`,`indentation`,`expanded`,`selectionMode`,`checked`,`partialChecked`,`templates`,`onCheckboxToggle`,`index`,`loadingMode`,`unstyled`,`pt`]))],64)}),128))],16,et),l.expanded&&r.node.children&&r.node.children.length?(i(!0),p(g,{key:0},s(r.node.children,function(t){return i(),_(d,{key:l.nodeKey(t),dataKey:r.dataKey,columns:r.columns,node:t,parentNode:r.node,level:r.level+1,expandedKeys:r.expandedKeys,selectionMode:r.selectionMode,selectionKeys:r.selectionKeys,contextMenu:r.contextMenu,contextMenuSelection:r.contextMenuSelection,indentation:r.indentation,ariaPosInset:r.node.children.indexOf(t)+1,ariaSetSize:r.node.children.length,templates:r.templates,onNodeToggle:n[5]||=function(t){return e.$emit(`node-toggle`,t)},onNodeClick:n[6]||=function(t){return e.$emit(`node-click`,t)},onRowRightclick:n[7]||=function(t){return e.$emit(`row-rightclick`,t)},onCheckboxChange:l.onCheckboxChange,unstyled:e.unstyled,pt:e.pt},null,8,[`dataKey`,`columns`,`node`,`parentNode`,`level`,`expandedKeys`,`selectionMode`,`selectionKeys`,`contextMenu`,`contextMenuSelection`,`indentation`,`ariaPosInset`,`ariaSetSize`,`templates`,`onCheckboxChange`,`unstyled`,`pt`])}),128)):f(``,!0)],64)}$e.render=tt;function K(e){"@babel/helpers - typeof";return K=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},K(e)}function q(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=ot(e))||t){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function nt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function J(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?nt(Object(n),!0).forEach(function(t){Y(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):nt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Y(e,t,n){return(t=rt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function rt(e){var t=it(e,`string`);return K(t)==`symbol`?t:t+``}function it(e,t){if(K(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(K(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function X(e){return ct(e)||st(e)||ot(e)||at()}function at(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ot(e,t){if(e){if(typeof e==`string`)return Z(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Z(e,t):void 0}}function st(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function ct(e){if(Array.isArray(e))return Z(e)}function Z(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var lt={name:`TreeTable`,extends:Se,inheritAttrs:!1,emits:[`node-expand`,`node-collapse`,`update:expandedKeys`,`update:selectionKeys`,`node-select`,`node-unselect`,`update:first`,`update:rows`,`page`,`update:sortField`,`update:sortOrder`,`update:multiSortMeta`,`sort`,`filter`,`column-resize-end`,`update:contextMenuSelection`,`row-contextmenu`],provide:function(){return{$columns:this.d_columns}},data:function(){return{d_expandedKeys:this.expandedKeys||{},d_first:this.first,d_rows:this.rows,d_sortField:this.sortField,d_sortOrder:this.sortOrder,d_multiSortMeta:this.multiSortMeta?X(this.multiSortMeta):[],hasASelectedNode:!1,d_columns:new ge({type:`Column`})}},documentColumnResizeListener:null,documentColumnResizeEndListener:null,lastResizeHelperX:null,resizeColumnElement:null,watch:{expandedKeys:function(e){this.d_expandedKeys=e},first:function(e){this.d_first=e},rows:function(e){this.d_rows=e},sortField:function(e){this.d_sortField=e},sortOrder:function(e){this.d_sortOrder=e},multiSortMeta:function(e){this.d_multiSortMeta=e}},beforeUnmount:function(){this.destroyStyleElement(),this.d_columns.clear()},methods:{columnProp:function(e,t){return M(e,t)},ptHeaderCellOptions:function(e){return{context:{frozen:this.columnProp(e,`frozen`)}}},onNodeToggle:function(e){var t=this.nodeKey(e);this.d_expandedKeys[t]?(delete this.d_expandedKeys[t],this.$emit(`node-collapse`,e)):(this.d_expandedKeys[t]=!0,this.$emit(`node-expand`,e)),this.d_expandedKeys=J({},this.d_expandedKeys),this.$emit(`update:expandedKeys`,this.d_expandedKeys)},onNodeClick:function(e){if(this.rowSelectionMode&&e.node.selectable!==!1){var t=!e.nodeTouched&&this.metaKeySelection?this.handleSelectionWithMetaKey(e):this.handleSelectionWithoutMetaKey(e);this.$emit(`update:selectionKeys`,t)}},nodeKey:function(e){return k(e,this.dataKey)},handleSelectionWithMetaKey:function(e){var t=e.originalEvent,n=e.node,r=this.nodeKey(n),i=t.metaKey||t.ctrlKey,a=this.isNodeSelected(n),o;return a&&i?(this.isSingleSelectionMode()?o={}:(o=J({},this.selectionKeys),delete o[r]),this.$emit(`node-unselect`,n)):(this.isSingleSelectionMode()?o={}:this.isMultipleSelectionMode()&&(o=i&&this.selectionKeys?J({},this.selectionKeys):{}),o[r]=!0,this.$emit(`node-select`,n)),o},handleSelectionWithoutMetaKey:function(e){var t=e.node,n=this.nodeKey(t),r=this.isNodeSelected(t),i;return this.isSingleSelectionMode()?r?(i={},this.$emit(`node-unselect`,t)):(i={},i[n]=!0,this.$emit(`node-select`,t)):r?(i=J({},this.selectionKeys),delete i[n],this.$emit(`node-unselect`,t)):(i=this.selectionKeys?J({},this.selectionKeys):{},i[n]=!0,this.$emit(`node-select`,t)),i},onCheckboxChange:function(e){this.$emit(`update:selectionKeys`,e.selectionKeys),e.check?this.$emit(`node-select`,e.node):this.$emit(`node-unselect`,e.node)},onRowRightClick:function(e){this.contextMenu&&(oe(),e.originalEvent.target.focus()),this.$emit(`update:contextMenuSelection`,e.node),this.$emit(`row-contextmenu`,e)},isSingleSelectionMode:function(){return this.selectionMode===`single`},isMultipleSelectionMode:function(){return this.selectionMode===`multiple`},onPage:function(e){this.d_first=e.first,this.d_rows=e.rows;var t=this.createLazyLoadEvent(e);t.pageCount=e.pageCount,t.page=e.page,this.d_expandedKeys={},this.$emit(`update:expandedKeys`,this.d_expandedKeys),this.$emit(`update:first`,this.d_first),this.$emit(`update:rows`,this.d_rows),this.$emit(`page`,t)},resetPage:function(){this.d_first=0,this.$emit(`update:first`,this.d_first)},getFilterColumnHeaderClass:function(e){return[this.cx(`headerCell`,{column:e}),this.columnProp(e,`filterHeaderClass`)]},onColumnHeaderClick:function(e){var t=e.originalEvent,n=e.column;if(this.columnProp(n,`sortable`)){var r=t.target,i=this.columnProp(n,`sortField`)||this.columnProp(n,`field`);(T(r,`data-p-sortable-column`)===!0||T(r,`data-pc-section`)===`columntitle`||T(r,`data-pc-section`)===`columnheadercontent`||T(r,`data-pc-section`)===`sorticon`||T(r.parentElement,`data-pc-section`)===`sorticon`||T(r.parentElement.parentElement,`data-pc-section`)===`sorticon`||r.closest(`[data-p-sortable-column="true"]`))&&(oe(),this.sortMode===`single`?(this.d_sortField===i?this.removableSort&&this.d_sortOrder*-1===this.defaultSortOrder?(this.d_sortOrder=null,this.d_sortField=null):this.d_sortOrder*=-1:(this.d_sortOrder=this.defaultSortOrder,this.d_sortField=i),this.$emit(`update:sortField`,this.d_sortField),this.$emit(`update:sortOrder`,this.d_sortOrder),this.resetPage()):this.sortMode===`multiple`&&(t.metaKey||t.ctrlKey||(this.d_multiSortMeta=this.d_multiSortMeta.filter(function(e){return e.field===i})),this.addMultiSortField(i),this.$emit(`update:multiSortMeta`,this.d_multiSortMeta)),this.$emit(`sort`,this.createLazyLoadEvent(t)))}},addMultiSortField:function(e){var t=this.d_multiSortMeta.findIndex(function(t){return t.field===e});t>=0?this.removableSort&&this.d_multiSortMeta[t].order*-1===this.defaultSortOrder?this.d_multiSortMeta.splice(t,1):this.d_multiSortMeta[t]={field:e,order:this.d_multiSortMeta[t].order*-1}:this.d_multiSortMeta.push({field:e,order:this.defaultSortOrder}),this.d_multiSortMeta=X(this.d_multiSortMeta)},sortSingle:function(e){return this.sortNodesSingle(e)},sortNodesSingle:function(e){var t=this,n=X(e),r=ie();return n.sort(function(e,n){var i=k(e.data,t.d_sortField),a=k(n.data,t.d_sortField);return x(i,a,t.d_sortOrder,r)}),n},sortMultiple:function(e){return this.sortNodesMultiple(e)},sortNodesMultiple:function(e){var t=this,n=X(e);return n.sort(function(e,n){return t.multisortField(e,n,0)}),n},multisortField:function(e,t,n){var r=k(e.data,this.d_multiSortMeta[n].field),i=k(t.data,this.d_multiSortMeta[n].field),a=ie();return r===i?this.d_multiSortMeta.length-1>n?this.multisortField(e,t,n+1):0:x(r,i,this.d_multiSortMeta[n].order,a)},filter:function(e){var t=[],n=this.filterMode===`strict`,r=q(e),i;try{for(r.s();!(i=r.n()).done;){for(var a=i.value,o=J({},a),s=!0,c=!1,l=0;l<this.columns.length;l++){var u=this.columns[l],d=this.columnProp(u,`filterField`)||this.columnProp(u,`field`);if(Object.prototype.hasOwnProperty.call(this.filters,d)){var f=this.columnProp(u,`filterMatchMode`)||`startsWith`,p={filterField:d,filterValue:this.filters[d],filterConstraint:ae.filters[f],strict:n};if((n&&!(this.findFilteredNodes(o,p)||this.isFilterMatched(o,p))||!n&&!(this.isFilterMatched(o,p)||this.findFilteredNodes(o,p)))&&(s=!1),!s)break}if(this.hasGlobalFilter()&&!c){var m=J({},o),h={filterField:d,filterValue:this.filters.global,filterConstraint:ae.filters.contains,strict:n};(n&&(this.findFilteredNodes(m,h)||this.isFilterMatched(m,h))||!n&&(this.isFilterMatched(m,h)||this.findFilteredNodes(m,h)))&&(c=!0,o=m)}}var g=s;this.hasGlobalFilter()&&(g=s&&c),g&&t.push(o)}}catch(e){r.e(e)}finally{r.f()}var _=this.createLazyLoadEvent(event);return _.filteredValue=t,this.$emit(`filter`,_),t},findFilteredNodes:function(e,t){if(e){var n=!1;if(e.children){var r=X(e.children);e.children=[];var i=q(r),a;try{for(i.s();!(a=i.n()).done;){var o=a.value,s=J({},o);this.isFilterMatched(s,t)&&(n=!0,e.children.push(s))}}catch(e){i.e(e)}finally{i.f()}}if(n)return!0}},isFilterMatched:function(e,t){var n=t.filterField,r=t.filterValue,i=t.filterConstraint,a=t.strict,o=!1;return i(k(e.data,n),r,this.filterLocale)&&(o=!0),(!o||a&&!this.isNodeLeaf(e))&&(o=this.findFilteredNodes(e,{filterField:n,filterValue:r,filterConstraint:i,strict:a})||o),o},isNodeSelected:function(e){return this.selectionMode&&this.selectionKeys?this.selectionKeys[this.nodeKey(e)]===!0:!1},isNodeLeaf:function(e){return e.leaf!==!1&&!(e.children&&e.children.length)},createLazyLoadEvent:function(e){var t=this,n;return this.hasFilters()&&(n={},this.columns.forEach(function(e){t.columnProp(e,`field`)&&(n[e.props.field]=t.columnProp(e,`filterMatchMode`))})),{originalEvent:e,first:this.d_first,rows:this.d_rows,sortField:this.d_sortField,sortOrder:this.d_sortOrder,multiSortMeta:this.d_multiSortMeta,filters:this.filters,filterMatchModes:n}},onColumnResizeStart:function(e){var t=E(this.$el).left;this.resizeColumnElement=e.target.parentElement,this.columnResizing=!0,this.lastResizeHelperX=e.pageX-t+this.$el.scrollLeft,this.bindColumnResizeEvents()},onColumnResize:function(e){var t=E(this.$el).left;this.$el.setAttribute(`data-p-unselectable-text`,`true`),!this.isUnstyled&&te(this.$el,{"user-select":`none`}),this.$refs.resizeHelper.style.height=this.$el.offsetHeight+`px`,this.$refs.resizeHelper.style.top=`0px`,this.$refs.resizeHelper.style.left=e.pageX-t+this.$el.scrollLeft+`px`,this.$refs.resizeHelper.style.display=`block`},onColumnResizeEnd:function(){var e=ue(this.$el)?this.lastResizeHelperX-this.$refs.resizeHelper.offsetLeft:this.$refs.resizeHelper.offsetLeft-this.lastResizeHelperX,t=this.resizeColumnElement.offsetWidth,n=t+e,r=this.resizeColumnElement.style.minWidth||15;if(t+e>parseInt(r,10)){if(this.columnResizeMode===`fit`){var i=this.resizeColumnElement.nextElementSibling.offsetWidth-e;n>15&&i>15&&this.resizeTableCells(n,i)}else if(this.columnResizeMode===`expand`){var a=this.$refs.table.offsetWidth+e+`px`;this.resizeTableCells(n),function(e){e&&(e.style.width=e.style.minWidth=a)}(this.$refs.table)}this.$emit(`column-resize-end`,{element:this.resizeColumnElement,delta:e})}this.$refs.resizeHelper.style.display=`none`,this.resizeColumn=null,this.$el.removeAttribute(`data-p-unselectable-text`),!this.isUnstyled&&(this.$el.style[`user-select`]=``),this.unbindColumnResizeEvents()},resizeTableCells:function(e,t){var n=le(this.resizeColumnElement),r=[];C(this.$refs.table,`thead[data-pc-section="thead"] > tr > th`).forEach(function(e){return r.push(A(e))}),this.destroyStyleElement(),this.createStyleElement();var i=``,a=`[data-pc-name="treetable"][${this.$attrSelector}] > [data-pc-section="tablecontainer"] > table[data-pc-section="table"]`;r.forEach(function(r,o){var s=o===n?e:t&&o===n+1?t:r,c=`width: ${s}px !important; max-width: ${s}px !important`;i+=`
                    ${a} > thead[data-pc-section="thead"] > tr > th:nth-child(${o+1}),
                    ${a} > tbody[data-pc-section="tbody"] > tr > td:nth-child(${o+1}),
                    ${a} > tfoot[data-pc-section="tfoot"] > tr > td:nth-child(${o+1}) {
                        ${c}
                    }
                `}),this.styleElement.innerHTML=i},bindColumnResizeEvents:function(){var e=this;this.documentColumnResizeListener||=document.addEventListener(`mousemove`,function(t){e.columnResizing&&e.onColumnResize(t)}),this.documentColumnResizeEndListener||=document.addEventListener(`mouseup`,function(){e.columnResizing&&(e.columnResizing=!1,e.onColumnResizeEnd())})},unbindColumnResizeEvents:function(){this.documentColumnResizeListener&&=(document.removeEventListener(`document`,this.documentColumnResizeListener),null),this.documentColumnResizeEndListener&&=(document.removeEventListener(`document`,this.documentColumnResizeEndListener),null)},onColumnKeyDown:function(e,t){(e.code===`Enter`||e.code===`NumpadEnter`)&&e.currentTarget.nodeName===`TH`&&T(e.currentTarget,`data-p-sortable-column`)&&this.onColumnHeaderClick(e,t)},hasColumnFilter:function(){if(this.columns){var e=q(this.columns),t;try{for(e.s();!(t=e.n()).done;){var n=t.value;if(n.children&&n.children.filter)return!0}}catch(t){e.e(t)}finally{e.f()}}return!1},hasFilters:function(){return this.filters&&Object.keys(this.filters).length>0&&this.filters.constructor===Object},hasGlobalFilter:function(){return this.filters&&Object.prototype.hasOwnProperty.call(this.filters,`global`)},getItemLabel:function(e){return e.data.name},createStyleElement:function(){var e;this.styleElement=document.createElement(`style`),this.styleElement.type=`text/css`,ne(this.styleElement,`nonce`,(e=this.$primevue)==null||(e=e.config)==null||(e=e.csp)==null?void 0:e.nonce),document.head.appendChild(this.styleElement)},destroyStyleElement:function(){this.styleElement&&=(document.head.removeChild(this.styleElement),null)},setTabindex:function(e,t){if(this.isNodeSelected(e))return this.hasASelectedNode=!0,0;if(this.selectionMode){if(!this.isNodeSelected(e)&&t===0&&!this.hasASelectedNode)return 0}else if(!this.selectionMode&&t===0)return 0;return-1}},computed:{columns:function(){return this.d_columns.get(this)},processedData:function(){if(this.lazy)return this.value;if(this.value&&this.value.length){var e=this.value;return this.sorted&&(this.sortMode===`single`?e=this.sortSingle(e):this.sortMode===`multiple`&&(e=this.sortMultiple(e))),this.hasFilters()&&(e=this.filter(e)),e}return null},dataToRender:function(){var e=this.processedData;if(this.paginator){var t=this.lazy?0:this.d_first;return e.slice(t,t+this.d_rows)}return e},empty:function(){var e=this.processedData;return!e||e.length===0},sorted:function(){return this.d_sortField||this.d_multiSortMeta&&this.d_multiSortMeta.length>0},hasFooter:function(){var e=!1,t=q(this.columns),n;try{for(t.s();!(n=t.n()).done;){var r=n.value;if(this.columnProp(r,`footer`)||r.children&&r.children.footer){e=!0;break}}}catch(e){t.e(e)}finally{t.f()}return e},paginatorTop:function(){return this.paginator&&(this.paginatorPosition!==`bottom`||this.paginatorPosition===`both`)},paginatorBottom:function(){return this.paginator&&(this.paginatorPosition!==`top`||this.paginatorPosition===`both`)},singleSelectionMode:function(){return this.selectionMode&&this.selectionMode===`single`},multipleSelectionMode:function(){return this.selectionMode&&this.selectionMode===`multiple`},rowSelectionMode:function(){return this.singleSelectionMode||this.multipleSelectionMode},totalRecordsLength:function(){if(this.lazy)return this.totalRecords;var e=this.processedData;return e?e.length:0},dataP:function(){return y(Y(Y(Y({scrollable:this.scrollable,"flex-scrollable":this.scrollable&&this.scrollHeight===`flex`},this.size,this.size),`loading`,this.loading),`empty`,this.empty))}},components:{TTRow:$e,TTPaginator:be,TTHeaderCell:ke,TTFooterCell:I,SpinnerIcon:de}};function Q(e){"@babel/helpers - typeof";return Q=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Q(e)}function ut(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function $(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?ut(Object(n),!0).forEach(function(t){dt(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ut(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function dt(e,t,n){return(t=ft(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ft(e){var t=pt(e,`string`);return Q(t)==`symbol`?t:t+``}function pt(e,t){if(Q(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Q(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var mt=[`data-p`],ht=[`colspan`];function gt(e,c,u,d,y,b){var x=t(`TTPaginator`),S=t(`TTHeaderCell`),te=t(`TTRow`),ne=t(`TTFooterCell`);return i(),p(`div`,a({class:e.cx(`root`),"data-scrollselectors":`.p-treetable-scrollable-body`,"data-p":b.dataP},e.ptmi(`root`)),[v(e.$slots,`default`),ee(re,{name:`p-overlay-mask`},{default:l(function(){return[e.loading&&e.loadingMode===`mask`?(i(),p(`div`,a({key:0,class:e.cx(`loading`)},e.ptm(`loading`)),[h(`div`,a({class:e.cx(`mask`)},e.ptm(`mask`)),[v(e.$slots,`loadingicon`,{class:n(e.cx(`loadingIcon`))},function(){return[(i(),_(r(e.loadingIcon?`span`:`SpinnerIcon`),a({spin:``,class:[e.cx(`loadingIcon`),e.loadingIcon]},e.ptm(`loadingIcon`)),null,16,[`class`]))]})],16)],16)):f(``,!0)]}),_:3}),e.$slots.header?(i(),p(`div`,a({key:0,class:e.cx(`header`)},e.ptm(`header`)),[v(e.$slots,`header`)],16)):f(``,!0),b.paginatorTop?(i(),_(x,{key:1,rows:y.d_rows,first:y.d_first,totalRecords:b.totalRecordsLength,pageLinkSize:e.pageLinkSize,template:e.paginatorTemplate,rowsPerPageOptions:e.rowsPerPageOptions,currentPageReportTemplate:e.currentPageReportTemplate,class:n(e.cx(`pcPaginator`,{position:`top`})),onPage:c[0]||=function(e){return b.onPage(e)},alwaysShow:e.alwaysShowPaginator,unstyled:e.unstyled,pt:e.ptm(`pcPaginator`)},m({_:2},[e.$slots.paginatorcontainer?{name:`container`,fn:l(function(t){return[v(e.$slots,`paginatorcontainer`,{first:t.first,last:t.last,rows:t.rows,page:t.page,pageCount:t.pageCount,totalRecords:t.totalRecords,firstPageCallback:t.firstPageCallback,lastPageCallback:t.lastPageCallback,prevPageCallback:t.prevPageCallback,nextPageCallback:t.nextPageCallback,rowChangeCallback:t.rowChangeCallback,pageLinks:t.pageLinks,changePageCallback:t.changePageCallback})]}),key:`0`}:void 0,e.$slots.paginatorstart?{name:`start`,fn:l(function(){return[v(e.$slots,`paginatorstart`)]}),key:`1`}:void 0,e.$slots.paginatorend?{name:`end`,fn:l(function(){return[v(e.$slots,`paginatorend`)]}),key:`2`}:void 0,e.$slots.paginatorfirstpagelinkicon?{name:`firstpagelinkicon`,fn:l(function(t){return[v(e.$slots,`paginatorfirstpagelinkicon`,{class:n(t.class)})]}),key:`3`}:void 0,e.$slots.paginatorprevpagelinkicon?{name:`prevpagelinkicon`,fn:l(function(t){return[v(e.$slots,`paginatorprevpagelinkicon`,{class:n(t.class)})]}),key:`4`}:void 0,e.$slots.paginatornextpagelinkicon?{name:`nextpagelinkicon`,fn:l(function(t){return[v(e.$slots,`paginatornextpagelinkicon`,{class:n(t.class)})]}),key:`5`}:void 0,e.$slots.paginatorlastpagelinkicon?{name:`lastpagelinkicon`,fn:l(function(t){return[v(e.$slots,`paginatorlastpagelinkicon`,{class:n(t.class)})]}),key:`6`}:void 0,e.$slots.paginatorjumptopagedropdownicon?{name:`jumptopagedropdownicon`,fn:l(function(t){return[v(e.$slots,`paginatorjumptopagedropdownicon`,{class:n(t.class)})]}),key:`7`}:void 0,e.$slots.paginatorrowsperpagedropdownicon?{name:`rowsperpagedropdownicon`,fn:l(function(t){return[v(e.$slots,`paginatorrowsperpagedropdownicon`,{class:n(t.class)})]}),key:`8`}:void 0]),1032,[`rows`,`first`,`totalRecords`,`pageLinkSize`,`template`,`rowsPerPageOptions`,`currentPageReportTemplate`,`class`,`alwaysShow`,`unstyled`,`pt`])):f(``,!0),h(`div`,a({class:e.cx(`tableContainer`),style:[e.sx(`tableContainer`),{maxHeight:e.scrollHeight}]},e.ptm(`tableContainer`)),[h(`table`,a({ref:`table`,role:`treegrid`,class:[e.cx(`table`),e.tableClass],style:e.tableStyle},$($({},e.tableProps),e.ptm(`table`))),[h(`thead`,a({class:e.cx(`thead`),style:e.sx(`thead`),role:`rowgroup`},e.ptm(`thead`)),[h(`tr`,a({role:`row`},e.ptm(`headerRow`)),[(i(!0),p(g,null,s(b.columns,function(t,n){return i(),p(g,{key:b.columnProp(t,`columnKey`)||b.columnProp(t,`field`)||n},[b.columnProp(t,`hidden`)?f(``,!0):(i(),_(S,{key:0,column:t,resizableColumns:e.resizableColumns,sortField:y.d_sortField,sortOrder:y.d_sortOrder,multiSortMeta:y.d_multiSortMeta,sortMode:e.sortMode,onColumnClick:c[1]||=function(e){return b.onColumnHeaderClick(e)},onColumnResizestart:c[2]||=function(e){return b.onColumnResizeStart(e)},index:n,unstyled:e.unstyled,pt:e.pt},null,8,[`column`,`resizableColumns`,`sortField`,`sortOrder`,`multiSortMeta`,`sortMode`,`index`,`unstyled`,`pt`]))],64)}),128))],16),b.hasColumnFilter()?(i(),p(`tr`,o(a({key:0},e.ptm(`headerRow`))),[(i(!0),p(g,null,s(b.columns,function(t,n){return i(),p(g,{key:b.columnProp(t,`columnKey`)||b.columnProp(t,`field`)||n},[b.columnProp(t,`hidden`)?f(``,!0):(i(),p(`th`,a({key:0,class:b.getFilterColumnHeaderClass(t),style:[b.columnProp(t,`style`),b.columnProp(t,`filterHeaderStyle`)]},{ref_for:!0},e.ptm(`headerCell`,b.ptHeaderCellOptions(t))),[t.children&&t.children.filter?(i(),_(r(t.children.filter),{key:0,column:t,index:n},null,8,[`column`,`index`])):f(``,!0)],16))],64)}),128))],16)):f(``,!0)],16),h(`tbody`,a({class:e.cx(`tbody`),role:`rowgroup`},e.ptm(`tbody`)),[b.empty?(i(),p(`tr`,a({key:1,class:e.cx(`emptyMessage`)},e.ptm(`emptyMessage`)),[h(`td`,a({colspan:b.columns.length},e.ptm(`emptyMessageCell`)),[v(e.$slots,`empty`)],16,ht)],16)):(i(!0),p(g,{key:0},s(b.dataToRender,function(t,n){return i(),_(te,{key:b.nodeKey(t),dataKey:e.dataKey,columns:b.columns,node:t,level:0,expandedKeys:y.d_expandedKeys,indentation:e.indentation,selectionMode:e.selectionMode,selectionKeys:e.selectionKeys,ariaSetSize:b.dataToRender.length,ariaPosInset:n+1,tabindex:b.setTabindex(t,n),loadingMode:e.loadingMode,contextMenu:e.contextMenu,contextMenuSelection:e.contextMenuSelection,templates:e.$slots,onNodeToggle:b.onNodeToggle,onNodeClick:b.onNodeClick,onCheckboxChange:b.onCheckboxChange,onRowRightclick:c[3]||=function(e){return b.onRowRightClick(e)},unstyled:e.unstyled,pt:e.pt},null,8,[`dataKey`,`columns`,`node`,`expandedKeys`,`indentation`,`selectionMode`,`selectionKeys`,`ariaSetSize`,`ariaPosInset`,`tabindex`,`loadingMode`,`contextMenu`,`contextMenuSelection`,`templates`,`onNodeToggle`,`onNodeClick`,`onCheckboxChange`,`unstyled`,`pt`])}),128))],16),b.hasFooter?(i(),p(`tfoot`,a({key:0,class:e.cx(`tfoot`),style:e.sx(`tfoot`),role:`rowgroup`},e.ptm(`tfoot`)),[h(`tr`,a({role:`row`},e.ptm(`footerRow`)),[(i(!0),p(g,null,s(b.columns,function(t,n){return i(),p(g,{key:b.columnProp(t,`columnKey`)||b.columnProp(t,`field`)||n},[b.columnProp(t,`hidden`)?f(``,!0):(i(),_(ne,{key:0,column:t,index:n,unstyled:e.unstyled,pt:e.pt},null,8,[`column`,`index`,`unstyled`,`pt`]))],64)}),128))],16)],16)):f(``,!0)],16)],16),b.paginatorBottom?(i(),_(x,{key:2,rows:y.d_rows,first:y.d_first,totalRecords:b.totalRecordsLength,pageLinkSize:e.pageLinkSize,template:e.paginatorTemplate,rowsPerPageOptions:e.rowsPerPageOptions,currentPageReportTemplate:e.currentPageReportTemplate,class:n(e.cx(`pcPaginator`,{position:`bottom`})),onPage:c[4]||=function(e){return b.onPage(e)},alwaysShow:e.alwaysShowPaginator,unstyled:e.unstyled,pt:e.ptm(`pcPaginator`)},m({_:2},[e.$slots.paginatorcontainer?{name:`container`,fn:l(function(t){return[v(e.$slots,`paginatorcontainer`,{first:t.first,last:t.last,rows:t.rows,page:t.page,pageCount:t.pageCount,pageLinks:t.pageLinks,totalRecords:t.totalRecords,firstPageCallback:t.firstPageCallback,lastPageCallback:t.lastPageCallback,prevPageCallback:t.prevPageCallback,nextPageCallback:t.nextPageCallback,rowChangeCallback:t.rowChangeCallback,changePageCallback:t.changePageCallback})]}),key:`0`}:void 0,e.$slots.paginatorstart?{name:`start`,fn:l(function(){return[v(e.$slots,`paginatorstart`)]}),key:`1`}:void 0,e.$slots.paginatorend?{name:`end`,fn:l(function(){return[v(e.$slots,`paginatorend`)]}),key:`2`}:void 0,e.$slots.paginatorfirstpagelinkicon?{name:`firstpagelinkicon`,fn:l(function(t){return[v(e.$slots,`paginatorfirstpagelinkicon`,{class:n(t.class)})]}),key:`3`}:void 0,e.$slots.paginatorprevpagelinkicon?{name:`prevpagelinkicon`,fn:l(function(t){return[v(e.$slots,`paginatorprevpagelinkicon`,{class:n(t.class)})]}),key:`4`}:void 0,e.$slots.paginatornextpagelinkicon?{name:`nextpagelinkicon`,fn:l(function(t){return[v(e.$slots,`paginatornextpagelinkicon`,{class:n(t.class)})]}),key:`5`}:void 0,e.$slots.paginatorlastpagelinkicon?{name:`lastpagelinkicon`,fn:l(function(t){return[v(e.$slots,`paginatorlastpagelinkicon`,{class:n(t.class)})]}),key:`6`}:void 0,e.$slots.paginatorjumptopagedropdownicon?{name:`jumptopagedropdownicon`,fn:l(function(t){return[v(e.$slots,`paginatorjumptopagedropdownicon`,{class:n(t.class)})]}),key:`7`}:void 0,e.$slots.paginatorrowsperpagedropdownicon?{name:`rowsperpagedropdownicon`,fn:l(function(t){return[v(e.$slots,`paginatorrowsperpagedropdownicon`,{class:n(t.class)})]}),key:`8`}:void 0]),1032,[`rows`,`first`,`totalRecords`,`pageLinkSize`,`template`,`rowsPerPageOptions`,`currentPageReportTemplate`,`class`,`alwaysShow`,`unstyled`,`pt`])):f(``,!0),e.$slots.footer?(i(),p(`div`,a({key:3,class:e.cx(`footer`)},e.ptm(`footer`)),[v(e.$slots,`footer`)],16)):f(``,!0),h(`div`,a({ref:`resizeHelper`,class:e.cx(`columnResizeIndicator`),style:{display:`none`}},e.ptm(`columnResizeIndicator`)),null,16)],16,mt)}lt.render=gt;export{lt as default};