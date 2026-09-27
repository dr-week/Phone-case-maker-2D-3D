import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { getCurrentScope, ref, watchEffect, getCurrentInstance, onBeforeUnmount, onDeactivated, onActivated, createApp, provide, onErrorCaptured, onServerPrefetch, unref, createVNode, resolveDynamicComponent, shallowReactive, reactive, effectScope, hasInjectionContext, inject, defineAsyncComponent, mergeProps, toRef, shallowRef, isReadonly, defineComponent, h, useSSRContext, isRef, isShallow, isReactive, toRaw, computed, watch, isVNode, createCommentVNode, markRaw, Suspense, readonly, Fragment, nextTick } from 'vue';
import { h as createError, $ as $fetch, m as baseURL, n as hasProtocol, j as joinURL, w as withQuery, o as sanitizeStatusCode, q as parseURL, e as encodePath, v as decodePath, x as defu, y as isScriptProtocol } from '../_/nitro.mjs';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import { walkResolver } from 'unhead/utils';
import { i as injectHead$1, V as VueResolver, h as headSymbol } from '../routes/renderer.mjs';

function useHead(input, options = {}) {
  const head = options.head || injectHead$1();
  return head.ssr ? head.push(input || {}, options) : clientUseHead(head, input, options);
}
function clientUseHead(head, input, options = {}) {
  const scope = getCurrentScope();
  if (scope && !scope.active) {
    return { patch() {
    }, dispose() {
    }, _i: -1 };
  }
  const deactivated = ref(false);
  if (options.onRendered && scope) {
    const _onRendered = options.onRendered;
    options = { ...options, onRendered: (ctx) => scope.run(() => _onRendered(ctx)) };
  }
  let entry;
  watchEffect(() => {
    const i = deactivated.value ? {} : walkResolver(input, VueResolver);
    if (entry) {
      entry.patch(i);
    } else {
      entry = head.push(i, options);
    }
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}

function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}

function _getAsyncLocalStorage() {
	return globalThis.AsyncLocalStorage || globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
}
const _WeakRef = globalThis.WeakRef || class StrongRef {
	#value;
	constructor(value) {
		this.#value = value;
	}
	deref() {
		return this.#value;
	}
};
function createContext(opts = {}) {
	let currentInstance;
	let isSingleton = false;
	const checkConflict = (instance) => {
		if (currentInstance && currentInstance !== instance) throw new Error("Context conflict");
	};
	let als;
	if (opts.asyncContext) {
		const _AsyncLocalStorage = opts.AsyncLocalStorage || _getAsyncLocalStorage();
		if (_AsyncLocalStorage) als = new _AsyncLocalStorage();
		else console.warn("[unctx] `AsyncLocalStorage` is not provided.");
	}
	const _wrapInstance = (instance) => als && instance !== null && typeof instance === "object" ? { __unctx_weak: new _WeakRef(instance) } : instance;
	const _unwrapInstance = (store) => store && store.__unctx_weak ? store.__unctx_weak.deref() : store;
	const _getCurrentInstance = () => {
		if (als) {
			const store = als.getStore();
			if (store !== void 0) return _unwrapInstance(store);
		}
		return currentInstance;
	};
	return {
		use: () => {
			const _instance = _getCurrentInstance();
			if (_instance === void 0) throw new Error("Context is not available");
			return _instance;
		},
		tryUse: () => {
			return _getCurrentInstance() ?? null;
		},
		set: (instance, replace) => {
			if (!replace) checkConflict(instance);
			currentInstance = instance;
			isSingleton = true;
		},
		unset: () => {
			currentInstance = void 0;
			isSingleton = false;
		},
		call: (instance, callback) => {
			checkConflict(instance);
			currentInstance = instance;
			try {
				return als ? als.run(_wrapInstance(instance), callback) : callback();
			} finally {
				if (!isSingleton) currentInstance = void 0;
			}
		},
		async callAsync(instance, callback) {
			currentInstance = instance;
			const onRestore = () => {
				currentInstance = instance;
			};
			const onLeave = () => currentInstance === instance ? onRestore : void 0;
			asyncHandlers.add(onLeave);
			try {
				const r = als ? als.run(_wrapInstance(instance), callback) : callback();
				if (!isSingleton) currentInstance = void 0;
				return await r;
			} finally {
				asyncHandlers.delete(onLeave);
			}
		}
	};
}
function createNamespace(defaultOpts = {}) {
	const contexts = {};
	return { get(key, opts = {}) {
		if (!contexts[key]) contexts[key] = createContext({
			...defaultOpts,
			...opts
		});
		return contexts[key];
	} };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
	const restores = [];
	for (const leaveHandler of asyncHandlers) {
		const restore = leaveHandler();
		if (restore) restores.push(restore);
	}
	const restore = () => {
		for (const restore of restores) restore();
	};
	let awaitable = function_();
	if (awaitable && typeof awaitable === "object" && "catch" in awaitable) awaitable = awaitable.catch((error) => {
		restore();
		throw error;
	});
	return [awaitable, restore];
}

var captureStackTrace = Error.captureStackTrace;
var Diagnostic = class Diagnostic extends Error {
	name;
	/**
	* The diagnostic code, e.g. `MATH_E001`.
	* Also appears as the `name` property.
	*/
	code;
	/**
	* URL to extended documentation for this diagnostic code.
	* Auto-generated from {@link DefineDiagnosticsOptions.docsBase}.
	*/
	docs;
	/**
	* Optional actionable instructions on how to resolve the problem.
	*/
	fix;
	/**
	* Locations in user code that contributed to this diagnostic, in
	* `file:line:column` format. Relevant when the stack trace doesn't reflect
	* the user's source (e.g. compilers, bundlers), otherwise redundant with the
	* stack and should be omitted.
	*/
	sources;
	/**
	* Alias for {@link Error.message}: the reason this diagnostic was raised.
	*/
	get why() {
		return this.message;
	}
	/**
	* @param init        structured initializer; `why` is required
	* @param captureFrom V8 stack-cutoff frame. Defaults to {@link Diagnostic}
	* so the top of the trace is the `new Diagnostic(...)` call site.
	* `defineDiagnostics` passes its action method to strip its own frames too.
	* Ignored on engines without `Error.captureStackTrace`.
	*/
	constructor(init, captureFrom = Diagnostic) {
		super(init.why, { cause: init.cause });
		this.code = this.name = init.code;
		this.fix = init.fix;
		this.docs = init.docs;
		this.sources = init.sources;
		captureStackTrace?.(this, captureFrom);
	}
	/**
	* Converts the diagnostic into a serializable structured object.
	*/
	toJSON() {
		return {
			name: this.name,
			why: this.why,
			fix: this.fix,
			docs: this.docs,
			sources: this.sources,
			cause: this.cause,
			stack: this.stack
		};
	}
};
/**
* Resolves the docs URL for a code from a `docsBase` (string template or
* resolver function). Shared by {@link defineDiagnostics} and
* {@link defineProdDiagnostics}. Per-code `docs` overrides are handled by the
* caller; this only covers the `docsBase`-derived case.
*
* @internal
*/
function deriveDocs(docsBase, code) {
	return typeof docsBase === "string" ? `${docsBase}/${code.toLowerCase()}` : docsBase?.(code);
}
/**
* Production counterpart to {@link defineDiagnostics}. Returns a `Proxy` that
* builds a minimal {@link Diagnostic} for any accessed code: the code becomes
* the instance `name`, `docs` is derived from `docsBase`, and `why` points to
* the docs URL when one exists (empty otherwise, so the thrown header is just
* the code). It carries no catalog text, so it stays tiny in a bundle.
*
* The strip plugin (`@nostics/unplugin`) can rewrite a `defineDiagnostics()`
* call into a `"production" === 'production'` ternary that selects this
* factory in production, dropping every `why`/`fix` string from the bundle.
*
* @example
* ```ts
* const diagnostics = defineProdDiagnostics({ docsBase: 'https://docs.example.com' })
* throw diagnostics.NUXT_B2011() // NUXT_B2011: https://docs.example.com/nuxt_b2011
* ```
*/
/* @__NO_SIDE_EFFECTS__ */
function defineProdDiagnostics(options = {}) {
	const { docsBase, reporters = [] } = options;
	return new Proxy({}, { get(_target, code) {
		if (typeof code !== "string") return void 0;
		const handle = (params = {}, reporterOptions = {}) => {
			const docs = deriveDocs(docsBase, code);
			const diagnostic = new Diagnostic({
				code,
				why: docs ?? "",
				docs,
				cause: params.cause,
				sources: params.sources
			}, handle);
			for (const reporter of reporters) reporter(diagnostic, reporterOptions);
			return diagnostic;
		};
		return handle;
	} });
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/diagnostics/_shared.js
/**
* Shared configuration for the runtime (E<N>xxx) diagnostics catalogs.
*
* Catalogs are split by domain and imported directly where used (no barrel),
* so the browser bundle only pulls in the codes a module references. Pair the
* pure-call annotations on each `defineDiagnostics()` with dev-guarded,
* statement-level report calls so report-only diagnostics strip from production.
*
* Codes are stable, fully-qualified `NUXT_E<NNNN>` identifiers. Codes with a
* dedicated docs page resolve a `see:` URL via {@link docsBase}; the rest opt
* out with `docs: false`.
*/
function docsBase(code) {
	return `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
}
var prodReporter = (diagnostic) => {
	console.error(`[${diagnostic.name}]`);
};
var prodReporters = [prodReporter];
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/diagnostics/core.js
/**
* E1xxx
* Core / Nuxt-instance / lifecycle runtime diagnostics.
*/
var appDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt.config.mjs
var nuxtLinkDefaults = {
	"componentName": "NuxtLink"};
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/nuxt.js
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext(id, { asyncContext: false });
}
var NuxtPluginIndicator = "__nuxt_plugin";
/** @since 3.0.0 */
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		versions: {
			get nuxt() {
				return "4.5.2";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: {},
		_asyncData: shallowReactive({}),
		_state: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const contextCaller = async function(hooks, args) {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
/** @since 3.0.0 */
async function applyPlugin(nuxtApp, plugin) {
	if (typeof plugin === "function") {
		const run = () => nuxtApp.runWithContext(() => plugin(nuxtApp));
		const { provide } = await run() || {};
		if (provide && typeof provide === "object") for (const key in provide) nuxtApp.provide(key, provide[key]);
	}
}
/** @since 3.0.0 */
async function applyPlugins(nuxtApp, plugins) {
	let error;
	for (const plugin of plugins) try {
		await applyPlugin(nuxtApp, plugin);
	} catch (e) {
		if (!nuxtApp.payload.error) throw e;
		error ||= e;
	}
	if (error) throw nuxtApp.payload.error || error;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin) {
	if (typeof plugin === "function") return plugin;
	const _name = plugin._name || plugin.name;
	delete plugin.name;
	return Object.assign(plugin.setup || (() => {}), plugin, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
/**
* Ensures that the setup function passed in has access to the Nuxt instance via `useNuxtApp`.
* @param nuxt A Nuxt instance
* @param setup The function to call
* @since 3.0.0
*/
function callWithNuxt(nuxt, setup, args) {
	const fn = () => setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw appDiagnostics.NUXT_E1001();
	return nuxtAppInstance;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/utils.js
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/components/injections.js
var LayoutMetaSymbol = Symbol("layout-meta");
var PageRouteSymbol = Symbol("route");
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/diagnostics/navigation.js
/**
* E2xxx
* Navigation / routing / middleware runtime diagnostics.
*/
var navigationDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/composables/router.js
/** @since 3.0.0 */
var useRouter = () => {
	return useNuxtApp()?.$router;
};
/**
* Whether the current effect scope is (a descendant of) the component instance's scope.
* A detached scope (e.g. `createSharedComposable`) outlives the component, so the
* per-page route injected there would freeze after navigation (#18903).
*/
function isScopeWithinInstance(instance) {
	const instanceScope = instance.scope;
	let scope = getCurrentScope();
	while (scope) {
		if (scope === instanceScope) return true;
		scope = scope.parent;
	}
	return false;
}
/** @since 3.0.0 */
var useRoute = (() => {
	if (hasInjectionContext()) {
		const instance = getCurrentInstance();
		if (!instance || isScopeWithinInstance(instance)) return inject(PageRouteSymbol, useNuxtApp()._route);
	}
	return useNuxtApp()._route;
});
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
/** @since 3.0.0 */
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
var HTML_ATTR_ENCODE_MAP = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;"
};
function encodeForHtmlAttr(value) {
	return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
/**
* A helper that aids in programmatic navigation within your Nuxt application.
*
* Can be called on the server and on the client, within pages, route middleware, plugins, and more.
* @param {RouteLocationRaw | undefined | null} [to] - The route to navigate to. Accepts a route object, string path, `undefined`, or `null`. Defaults to '/'.
* @param {NavigateToOptions} [options] - Optional customization for controlling the behavior of the navigation.
* @returns {Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw} The navigation result, which varies depending on context and options.
* @see https://nuxt.com/docs/4.x/api/utils/navigate-to
* @since 3.0.0
*/
var navigateTo = (to, options) => {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw navigationDiagnostics.NUXT_E2001({ toPath });
		const { protocol } = new URL(toPath, "http://localhost");
		if (protocol && isScriptProtocol(protocol)) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		const location = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedHeader = encodeURL(location, isExternalHost);
			const encodedLoc = encodeForHtmlAttr(encodedHeader);
			nuxtApp.ssrContext["~renderResponse"] = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		};
		if (!isExternal && inMiddleware) {
			router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._scope.stop();
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
	return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
/**
* @internal
*/
function resolveRouteObject(to) {
	return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
/**
* @internal
*/
function encodeURL(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname.replace(/^\/{2,}/, "/") + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
/**
* Encode the pathname of a route location string. Ensures decoded paths like
* `/café` are percent-encoded to match vue-router's encoded route records.
* Already-encoded paths are not double-encoded.
* @internal
*/
function encodeRoutePath(url) {
	const parsed = parseURL(url);
	return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/composables/error.js
var NUXT_ERROR_SIGNATURE = "__nuxt_error";
/** @since 3.0.0 */
var useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
/** @since 3.0.0 */
var showError = (error) => {
	const nuxtError = createError$1(error);
	try {
		const error = /* @__PURE__ */ useError();
		error.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
/**
* Show the error page unless the current client is a crawler, in which case the
* bot receives the already server-rendered HTML instead (#32137, #35338).
*
* @internal
*/
var _showErrorUnlessCrawler = async (nuxtApp, error) => {
	await nuxtApp.runWithContext(() => showError(error));
};
/** @since 3.0.0 */
var isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
/** @since 3.0.0 */
var createError$1 = (error) => {
	if (typeof error !== "string" && error.statusText) error.message ??= error.statusText;
	const nuxtError = createError(error);
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	Object.defineProperty(nuxtError, "status", {
		get: () => nuxtError.statusCode,
		configurable: true
	});
	Object.defineProperty(nuxtError, "statusText", {
		get: () => nuxtError.statusMessage,
		configurable: true
	});
	return nuxtError;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Ffetch.mjs
if (!globalThis.$fetch) globalThis.$fetch = $fetch.create({ baseURL: baseURL() });
var $fetch$1 = globalThis.$fetch;
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fglobal-polyfills.mjs
if (!("global" in globalThis)) globalThis.global = globalThis;
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/head/runtime/island-head.js
/**
* No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
* augmentations on the same head are unaffected.
*/
function freezeHead(head) {
	const realPush = head.push;
	head.push = () => ({
		dispose: () => {},
		patch: () => {},
		_i: 0
	});
	return () => {
		head.push = realPush;
	};
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/head/runtime/plugins/unhead.server.js
var plugin$2 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		if (nuxtApp.ssrContext.islandContext) {
			const unfreeze = freezeHead(head);
			nuxtApp.hooks.hookOnce("app:created", unfreeze);
		}
		nuxtApp.vueApp.use(head);
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/pages/runtime/utils.js
var ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
var interpolatePath = (route, match) => {
	return match.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => route.params[r.slice(1)]?.toString() || "");
};
var generateRouteKey$1 = (routeProps, override) => {
	const matchedRoute = routeProps.route.matched.find((m) => m.components?.default === routeProps.Component.type);
	const source = matchedRoute?.meta.key ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
	return typeof source === "function" ? source(routeProps.route) : source;
};
/** @since 3.9.0 */
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
//#endregion
//#region node_modules/.pnpm/vue-router@5.3.1_@vue+compi_fec07f30051f38647b1506285aa10449/node_modules/vue-router/dist/useApi-BPuI6ZR9.js
/*!
* vue-router v5.3.1
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
/**
* Checks if a path is absolute, meaning it starts with a `/`.
*
* @param path - path to check
*
* @internal
*/
var isAbsolutePath = (path) => path.startsWith("/");
/**
* Allows differentiating lazy components from functional components and vue-class-component
* @internal
*
* @param component
*/
function isRouteComponent(component) {
	return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
	return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
}
var assign = Object.assign;
function applyToParams(fn, params) {
	const newParams = {};
	for (const key in params) {
		const value = params[key];
		newParams[key] = isArray(value) ? value.map(fn) : fn(value);
	}
	return newParams;
}
var noop = () => {};
/**
* Typesafe alternative to Array.isArray
* https://github.com/microsoft/TypeScript/pull/48228
*
* @internal
*/
var isArray = Array.isArray;
function mergeOptions(defaults, partialOptions) {
	const options = {};
	for (const key in defaults) options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
	return options;
}
var NavigationFailureSymbol = Symbol("");
/**
* Creates a typed NavigationFailure object.
* @internal
* @param type - NavigationFailureType
* @param params - { from, to }
*/
function createRouterError(type, params) {
	return assign(/* @__PURE__ */ new Error(), {
		type,
		[NavigationFailureSymbol]: true
	}, params);
}
function isNavigationFailure(error, type) {
	return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
/**
* RouteRecord being rendered by the closest ancestor Router View. Used for
* `onBeforeRouteUpdate` and `onBeforeRouteLeave`. rvlm stands for Router View
* Location Matched
*
* @internal
*/
var matchedRouteKey = Symbol("");
/**
* Allows overriding the router view depth to control which component in
* `matched` is rendered. rvd stands for Router View Depth
*
* @internal
*/
var viewDepthKey = Symbol("");
/**
* Allows overriding the router instance returned by `useRouter` in tests. r
* stands for router
*
* @internal
*/
var routerKey = Symbol("");
/**
* Allows overriding the current route returned by `useRoute` in tests. rl
* stands for route location
*
* @internal
*/
var routeLocationKey = Symbol("");
/**
* Allows overriding the current route used by router-view. Internally this is
* used when the `route` prop is passed.
*
* @internal
*/
var routerViewLocationKey = Symbol("");
//#endregion
//#region node_modules/.pnpm/vue-router@5.3.1_@vue+compi_fec07f30051f38647b1506285aa10449/node_modules/vue-router/dist/devtools-CN5uWJaH.js
/*!
* vue-router v5.3.1
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
/**
* Encoding Rules (␣ = Space)
* - Path: ␣ " < > # ? { }
* - Query: ␣ " < > # & =
* - Hash: ␣ " < > `
*
* On top of that, the RFC3986 (https://tools.ietf.org/html/rfc3986#section-2.2)
* defines some extra characters to be encoded. Most browsers do not encode them
* in encodeURI https://github.com/whatwg/url/issues/369, so it may be safer to
* also encode `!'()*`. Leaving un-encoded only ASCII alphanumeric(`a-zA-Z0-9`)
* plus `-._~`. This extra safety should be applied to query by patching the
* string returned by encodeURIComponent encodeURI also encodes `[\]^`. `\`
* should be encoded to avoid ambiguity. Browsers (IE, FF, C) transform a `\`
* into a `/` if directly typed in. The _backtick_ (`````) should also be
* encoded everywhere because some browsers like FF encode it when directly
* written while others don't. Safari and IE don't encode ``"<>{}``` in hash.
*/
var HASH_RE = /#/g;
var AMPERSAND_RE = /&/g;
var SLASH_RE = /\//g;
var EQUAL_RE = /=/g;
var IM_RE = /\?/g;
var PLUS_RE = /\+/g;
/**
* NOTE: It's not clear to me if we should encode the + symbol in queries, it
* seems to be less flexible than not doing so and I can't find out the legacy
* systems requiring this for regular requests like text/html. In the standard,
* the encoding of the plus character is only mentioned for
* application/x-www-form-urlencoded
* (https://url.spec.whatwg.org/#urlencoded-parsing) and most browsers seems lo
* leave the plus character as is in queries. To be more flexible, we allow the
* plus character on the query, but it can also be manually encoded by the user.
*
* Resources:
* - https://url.spec.whatwg.org/#urlencoded-parsing
* - https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20
*/
var ENC_BRACKET_OPEN_RE = /%5B/g;
var ENC_BRACKET_CLOSE_RE = /%5D/g;
var ENC_CARET_RE = /%5E/g;
var ENC_BACKTICK_RE = /%60/g;
var ENC_CURLY_OPEN_RE = /%7B/g;
var ENC_PIPE_RE = /%7C/g;
var ENC_CURLY_CLOSE_RE = /%7D/g;
var ENC_SPACE_RE = /%20/g;
/**
* Encode characters that need to be encoded on the path, search and hash
* sections of the URL.
*
* @internal
* @param text - string to encode
* @returns encoded string
*/
function commonEncode(text) {
	return text == null ? "" : encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
/**
* Encode characters that need to be encoded on the hash section of the URL.
*
* @param text - string to encode
* @returns encoded string
*/
function encodeHash(text) {
	return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
/**
* Encode characters that need to be encoded query values on the query
* section of the URL.
*
* @param text - string to encode
* @returns encoded string
*/
function encodeQueryValue(text) {
	return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
/**
* Like `encodeQueryValue` but also encodes the `=` character.
*
* @param text - string to encode
*/
function encodeQueryKey(text) {
	return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
/**
* Encode characters that need to be encoded on the path section of the URL.
*
* @param text - string to encode
* @returns encoded string
*/
function encodePath$1(text) {
	return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
/**
* Encode characters that need to be encoded on the path section of the URL as a
* param. This function encodes everything {@link encodePath} does plus the
* slash (`/`) character. If `text` is `null` or `undefined`, returns an empty
* string instead.
*
* @param text - string to encode
* @returns encoded string
*/
function encodeParam(text) {
	return encodePath$1(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
	if (text == null) return null;
	try {
		return decodeURIComponent("" + text);
	} catch {}
	return "" + text;
}
var TRAILING_SLASH_RE = /\/$/;
var removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
/**
* Transforms a URI into a normalized history location
*
* @param parseQuery
* @param location - URI to normalize
* @param currentLocation - current absolute location. Allows resolving relative
* paths. Must start with `/`. Defaults to `/`
* @returns a normalized history location
*/
function parseURL$1(parseQuery, location, currentLocation = "/") {
	let path, query = {}, searchString = "", hash = "";
	const hashPos = location.indexOf("#");
	let searchPos = location.indexOf("?");
	searchPos = hashPos >= 0 && searchPos > hashPos ? -1 : searchPos;
	if (searchPos >= 0) {
		path = location.slice(0, searchPos);
		searchString = location.slice(searchPos, hashPos > 0 ? hashPos : location.length);
		query = parseQuery(searchString.slice(1));
	}
	if (hashPos >= 0) {
		path = path || location.slice(0, hashPos);
		hash = location.slice(hashPos, location.length);
	}
	path = resolveRelativePath(path != null ? path : location, currentLocation);
	return {
		fullPath: path + searchString + hash,
		path,
		query,
		hash: decode(hash)
	};
}
/**
* Stringifies a URL object
*
* @param stringifyQuery
* @param location
*/
function stringifyURL(stringifyQuery, location) {
	const query = location.query ? stringifyQuery(location.query) : "";
	return location.path + (query && "?") + query + (location.hash || "");
}
/**
* Checks if two RouteLocation are equal. This means that both locations are
* pointing towards the same {@link RouteRecord} and that all `params`, `query`
* parameters and `hash` are the same
*
* @param stringifyQuery - A function that takes a query object of type LocationQueryRaw and returns a string representation of it.
* @param a - first {@link RouteLocation}
* @param b - second {@link RouteLocation}
*/
function isSameRouteLocation(stringifyQuery, a, b) {
	const aLastIndex = a.matched.length - 1;
	const bLastIndex = b.matched.length - 1;
	return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery(a.query) === stringifyQuery(b.query) && a.hash === b.hash;
}
/**
* Check if two `RouteRecords` are equal. Takes into account aliases: they are
* considered equal to the `RouteRecord` they are aliasing.
*
* @param a - first {@link RouteRecord}
* @param b - second {@link RouteRecord}
*/
function isSameRouteRecord(a, b) {
	return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
	if (Object.keys(a).length !== Object.keys(b).length) return false;
	for (var key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
	return true;
}
function isSameRouteLocationParamsValue(a, b) {
	return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : (a && a.valueOf()) === (b && b.valueOf());
}
/**
* Check if two arrays are the same or if an array with one single entry is the
* same as another primitive value. Used to check query and parameters
*
* @param a - array of values
* @param b - array of values or a single value
*/
function isEquivalentArray(a, b) {
	return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
/**
* Resolves a relative path that starts with `.`.
*
* @param to - path location we are resolving
* @param from - currentLocation.path, should start with `/`
*/
function resolveRelativePath(to, from) {
	if (isAbsolutePath(to)) return to;
	if (!to) return from;
	const fromSegments = from.split("/");
	const toSegments = to.split("/");
	const lastToSegment = toSegments[toSegments.length - 1];
	if (lastToSegment === ".." || lastToSegment === ".") toSegments.push("");
	let position = fromSegments.length - 1;
	let toPosition;
	let segment;
	for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
		segment = toSegments[toPosition];
		if (segment === ".") continue;
		if (segment === "..") {
			if (position > 1) position--;
		} else break;
	}
	return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
/**
* Initial route location where the router is. Can be used in navigation guards
* to differentiate the initial navigation.
*
* @example
* ```js
* import { START_LOCATION } from 'vue-router'
*
* router.beforeEach((to, from) => {
*   if (from === START_LOCATION) {
*     // initial navigation
*   }
* })
* ```
*/
var START_LOCATION_NORMALIZED = {
	path: "/",
	name: void 0,
	params: {},
	query: {},
	hash: "",
	fullPath: "/",
	matched: [],
	meta: {},
	redirectedFrom: void 0
};
/**
* Normalizes a base by removing any trailing slash and reading the base tag if
* present.
*
* @param base - base to normalize
*/
function normalizeBase(base) {
	if (!base) base = "/";
	if (base[0] !== "/" && base[0] !== "#") base = "/" + base;
	return removeTrailingSlash(base);
}
var BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location) {
	return base.replace(BEFORE_HASH_RE, "#") + location;
}
/**
* ScrollBehavior instance used by the router to compute and restore the scroll
* position when navigating.
*/
function isRouteLocation(route) {
	return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
	return typeof name === "string" || typeof name === "symbol";
}
/**
* Transforms a queryString into a {@link LocationQuery} object. Accept both, a
* version with the leading `?` and without Should work as URLSearchParams

* @internal
*
* @param search - search string to parse
* @returns a query object
*/
function parseQuery$1(search) {
	const query = {};
	if (search === "" || search === "?") return query;
	const searchParams = (search[0] === "?" ? search.slice(1) : search).split("&");
	for (let i = 0; i < searchParams.length; ++i) {
		const searchParam = searchParams[i].replace(PLUS_RE, " ");
		const eqPos = searchParam.indexOf("=");
		const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
		const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
		if (key in query) {
			let currentValue = query[key];
			if (!isArray(currentValue)) currentValue = query[key] = [currentValue];
			currentValue.push(value);
		} else query[key] = value;
	}
	return query;
}
/**
* Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
* doesn't prepend a `?`
*
* @internal
*
* @param query - query object to stringify
* @returns string version of the query without the leading `?`
*/
function stringifyQuery(query) {
	let search = "";
	for (let key in query) {
		const value = query[key];
		key = encodeQueryKey(key);
		if (value == null) {
			if (value !== void 0) search += (search.length ? "&" : "") + key;
			continue;
		}
		(isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)]).forEach((value) => {
			if (value !== void 0) {
				search += (search.length ? "&" : "") + key;
				if (value != null) search += "=" + value;
			}
		});
	}
	return search;
}
/**
* Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
* numbers into strings, removing keys with an undefined value and replacing
* undefined with null in arrays
*
* @param query - query object to normalize
* @returns a normalized query object
*/
function normalizeQuery(query) {
	const normalizedQuery = {};
	for (const key in query) {
		const value = query[key];
		if (value !== void 0) normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
	}
	return normalizedQuery;
}
/**
* Create a list of callbacks that can be reset. Used to create before and after navigation guards list
*/
function useCallbacks() {
	let handlers = [];
	function add(handler) {
		handlers.push(handler);
		return () => {
			const i = handlers.indexOf(handler);
			if (i > -1) handlers.splice(i, 1);
		};
	}
	function reset() {
		handlers = [];
	}
	return {
		add,
		list: () => handlers.slice(),
		reset
	};
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
	const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
	return () => new Promise((resolve, reject) => {
		const next = (valid) => {
			if (valid === false) reject(createRouterError(4, {
				from,
				to
			}));
			else if (valid instanceof Error) reject(valid);
			else if (isRouteLocation(valid)) reject(createRouterError(2, {
				from: to,
				to: valid
			}));
			else {
				if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") enterCallbackArray.push(valid);
				resolve();
			}
		};
		const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, next));
		let guardCall = Promise.resolve(guardReturn);
		if (guard.length < 3) guardCall = guardCall.then(next);
		guardCall.catch((err) => reject(err));
	});
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
	const guards = [];
	for (const record of matched) for (const name in record.components) {
		let rawComponent = record.components[name];
		if (guardType !== "beforeRouteEnter" && !record.instances[name]) continue;
		if (isRouteComponent(rawComponent)) {
			const guard = (rawComponent.__vccOpts || rawComponent)[guardType];
			guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
		} else {
			let componentPromise = rawComponent();
			guards.push(() => componentPromise.then((resolved) => {
				if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
				const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
				record.mods[name] = resolved;
				record.components[name] = resolvedComponent;
				const guard = (resolvedComponent.__vccOpts || resolvedComponent)[guardType];
				return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
			}));
		}
	}
	return guards;
}
/**
* Split the leaving, updating, and entering records.
* @internal
*
* @param  to - Location we are navigating to
* @param from - Location we are navigating from
*/
function extractChangingRecords(to, from) {
	const leavingRecords = [];
	const updatingRecords = [];
	const enteringRecords = [];
	const len = Math.max(from.matched.length, to.matched.length);
	for (let i = 0; i < len; i++) {
		const recordFrom = from.matched[i];
		if (recordFrom) {
			if (to.matched.find((record) => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);
			else leavingRecords.push(recordFrom);
		}
		const recordTo = to.matched[i];
		if (recordTo) {
			if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) enteringRecords.push(recordTo);
		}
	}
	return [
		leavingRecords,
		updatingRecords,
		enteringRecords
	];
}
//#endregion
//#region node_modules/.pnpm/vue-router@5.3.1_@vue+compi_fec07f30051f38647b1506285aa10449/node_modules/vue-router/dist/vue-router.js
/*!
* vue-router v5.3.1
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
/**
* Creates an in-memory based history. The main purpose of this history is to handle SSR. It starts in a special location that is nowhere.
* It's up to the user to replace that location with the starter location by either calling `router.push` or `router.replace`.
*
* @param base - Base applied to all urls, defaults to '/'
* @returns a history object that can be passed to the router constructor
*/
function createMemoryHistory(base = "") {
	let listeners = [];
	let queue = [["", {}]];
	let position = 0;
	base = normalizeBase(base);
	function setLocation(location, state = {}) {
		position++;
		if (position !== queue.length) queue.splice(position);
		queue.push([location, state]);
	}
	function triggerListeners(to, from, { direction, delta }) {
		const info = {
			direction,
			delta,
			type: "pop"
		};
		for (const callback of listeners) callback(to, from, info);
	}
	const routerHistory = {
		location: "",
		state: {},
		base,
		createHref: createHref.bind(null, base),
		replace(to, state) {
			queue.splice(position--, 1);
			setLocation(to, state);
		},
		push(to, state) {
			setLocation(to, state);
		},
		listen(callback) {
			listeners.push(callback);
			return () => {
				const index = listeners.indexOf(callback);
				if (index > -1) listeners.splice(index, 1);
			};
		},
		destroy() {
			listeners = [];
			queue = [["", {}]];
			position = 0;
		},
		go(delta, shouldTrigger = true) {
			const from = this.location;
			const direction = delta < 0 ? "back" : "forward";
			position = Math.max(0, Math.min(position + delta, queue.length - 1));
			if (shouldTrigger) triggerListeners(this.location, from, {
				direction,
				delta
			});
		}
	};
	Object.defineProperty(routerHistory, "location", {
		enumerable: true,
		get: () => queue[position][0]
	});
	Object.defineProperty(routerHistory, "state", {
		enumerable: true,
		get: () => queue[position][1]
	});
	return routerHistory;
}
var ROOT_TOKEN = {
	type: 0,
	value: ""
};
var VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
	if (!path) return [[]];
	if (path === "/") return [[ROOT_TOKEN]];
	if (!isAbsolutePath(path)) throw new Error(`Invalid path "${path}"`);
	function crash(message) {
		throw new Error(`ERR (${state})/"${buffer}": ${message}`);
	}
	let state = 0;
	let previousState = state;
	const tokens = [];
	let segment;
	function finalizeSegment() {
		if (segment) tokens.push(segment);
		segment = [];
	}
	let i = 0;
	let char;
	let buffer = "";
	let customRe = "";
	function consumeBuffer() {
		if (!buffer) return;
		if (state === 0) segment.push({
			type: 0,
			value: buffer
		});
		else if (state === 1 || state === 2 || state === 3) {
			if (segment.length > 1 && (char === "*" || char === "+")) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
			segment.push({
				type: 1,
				value: buffer,
				regexp: customRe,
				repeatable: char === "*" || char === "+",
				optional: char === "*" || char === "?"
			});
		} else crash("Invalid state to consume buffer");
		buffer = "";
	}
	function addCharToBuffer() {
		buffer += char;
	}
	while (i < path.length) {
		char = path[i++];
		switch (state) {
			case 0:
				if (char === "\\") {
					previousState = state;
					state = 4;
				} else if (char === "/") {
					if (buffer) consumeBuffer();
					finalizeSegment();
				} else if (char === ":") {
					consumeBuffer();
					state = 1;
				} else addCharToBuffer();
				break;
			case 4:
				addCharToBuffer();
				state = previousState;
				break;
			case 1:
				if (char === "(") state = 2;
				else if (VALID_PARAM_RE.test(char)) addCharToBuffer();
				else {
					consumeBuffer();
					state = 0;
					if (char !== "*" && char !== "?" && char !== "+") i--;
				}
				break;
			case 2:
				if (char === ")") {
					if (customRe[customRe.length - 1] == "\\") customRe = customRe.slice(0, -1) + char;
					else state = 3;
				} else customRe += char;
				break;
			case 3:
				consumeBuffer();
				state = 0;
				if (char !== "*" && char !== "?" && char !== "+") i--;
				customRe = "";
				break;
			default: crash("Unknown state");
		}
	}
	if (state === 2) crash(`Unfinished custom RegExp for param "${buffer}"`);
	consumeBuffer();
	finalizeSegment();
	return tokens;
}
var BASE_PARAM_PATTERN = "[^/]+?";
var BASE_PATH_PARSER_OPTIONS = {
	sensitive: false,
	strict: false,
	start: true,
	end: true
};
var REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
/**
* Creates a path parser from an array of Segments (a segment is an array of Tokens)
*
* @param segments - array of segments returned by tokenizePath
* @param extraOptions - optional options for the regexp
* @returns a PathParser
*/
function tokensToParser(segments, extraOptions) {
	const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
	const score = [];
	let pattern = options.start ? "^" : "";
	const keys = [];
	for (const segment of segments) {
		const segmentScores = segment.length ? [] : [90];
		if (options.strict && !segment.length) pattern += "/";
		for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
			const token = segment[tokenIndex];
			let subSegmentScore = 40 + (options.sensitive ? .25 : 0);
			if (token.type === 0) {
				if (!tokenIndex) pattern += "/";
				pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
				subSegmentScore += 40;
			} else if (token.type === 1) {
				const { value, repeatable, optional, regexp } = token;
				keys.push({
					name: value,
					repeatable,
					optional
				});
				const re = regexp ? regexp : BASE_PARAM_PATTERN;
				if (re !== BASE_PARAM_PATTERN) {
					subSegmentScore += 10;
					try {
						new RegExp(`(${re})`);
					} catch (err) {
						throw new Error(`Invalid custom RegExp for param "${value}" (${re}): ` + err.message);
					}
				}
				let subPattern = repeatable ? `((?:${re})(?:/(?:${re}))*)` : `(${re})`;
				if (!tokenIndex) subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
				if (optional) subPattern += "?";
				pattern += subPattern;
				subSegmentScore += 20;
				if (optional) subSegmentScore += -8;
				if (repeatable) subSegmentScore += -20;
				if (re === ".*") subSegmentScore += -50;
			}
			segmentScores.push(subSegmentScore);
		}
		score.push(segmentScores);
	}
	if (options.strict && options.end) {
		const i = score.length - 1;
		score[i][score[i].length - 1] += .7000000000000001;
	}
	if (!options.strict) pattern += "/?";
	if (options.end) pattern += "$";
	else if (options.strict && !pattern.endsWith("/")) pattern += "(?:/|$)";
	const re = new RegExp(pattern, options.sensitive ? "" : "i");
	function parse(path) {
		const match = path.match(re);
		const params = {};
		if (!match) return null;
		for (let i = 1; i < match.length; i++) {
			const value = match[i] || "";
			const key = keys[i - 1];
			params[key.name] = value && key.repeatable ? value.split("/") : value;
		}
		return params;
	}
	function stringify(params) {
		let path = "";
		let avoidDuplicatedSlash = false;
		for (const segment of segments) {
			if (!avoidDuplicatedSlash || !path.endsWith("/")) path += "/";
			avoidDuplicatedSlash = false;
			for (const token of segment) if (token.type === 0) path += token.value;
			else if (token.type === 1) {
				const { value, repeatable, optional } = token;
				const param = value in params ? params[value] : "";
				if (isArray(param) && !repeatable) throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
				const text = isArray(param) ? param.join("/") : param;
				if (!text) {
					if (optional) {
						if (segment.length < 2) {
							if (path.endsWith("/")) path = path.slice(0, -1);
							else avoidDuplicatedSlash = true;
						}
					} else throw new Error(`Missing required param "${value}"`);
				}
				path += text;
			}
		}
		return path || "/";
	}
	return {
		re,
		score,
		keys,
		parse,
		stringify
	};
}
/**
* Compares an array of numbers as used in PathParser.score and returns a
* number. This function can be used to `sort` an array
*
* @param a - first array of numbers
* @param b - second array of numbers
* @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
* should be sorted first
*/
function compareScoreArray(a, b) {
	let i = 0;
	while (i < a.length && i < b.length) {
		const diff = b[i] - a[i];
		if (diff) return diff;
		i++;
	}
	if (a.length < b.length) return a.length === 1 && a[0] === 80 ? -1 : 1;
	else if (a.length > b.length) return b.length === 1 && b[0] === 80 ? 1 : -1;
	return 0;
}
/**
* Compare function that can be used with `sort` to sort an array of PathParser
*
* @param a - first PathParser
* @param b - second PathParser
* @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
*/
function comparePathParserScore(a, b) {
	let i = 0;
	const aScore = a.score;
	const bScore = b.score;
	while (i < aScore.length && i < bScore.length) {
		const comp = compareScoreArray(aScore[i], bScore[i]);
		if (comp) return comp;
		i++;
	}
	if (Math.abs(bScore.length - aScore.length) === 1) {
		if (isLastScoreNegative(aScore)) return 1;
		if (isLastScoreNegative(bScore)) return -1;
	}
	return bScore.length - aScore.length;
}
/**
* This allows detecting splats at the end of a path: /home/:id(.*)*
*
* @param score - score to check
* @returns true if the last entry is negative
*/
function isLastScoreNegative(score) {
	const last = score[score.length - 1];
	return score.length > 0 && last[last.length - 1] < 0;
}
var PATH_PARSER_OPTIONS_DEFAULTS = {
	strict: false,
	end: true,
	sensitive: false
};
function createRouteRecordMatcher(record, parent, options) {
	const matcher = assign(tokensToParser(tokenizePath(record.path), options), {
		record,
		parent,
		children: [],
		alias: []
	});
	if (parent) {
		if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
	}
	return matcher;
}
/**
* Creates a Router Matcher.
*
* @internal
* @param routes - array of initial routes
* @param globalOptions - global route options
*/
function createRouterMatcher(routes, globalOptions) {
	const matchers = [];
	const matcherMap = /* @__PURE__ */ new Map();
	globalOptions = mergeOptions(PATH_PARSER_OPTIONS_DEFAULTS, globalOptions);
	function getRecordMatcher(name) {
		return matcherMap.get(name);
	}
	function addRoute(record, parent, originalRecord) {
		const isRootAdd = !originalRecord;
		const mainNormalizedRecord = normalizeRouteRecord(record);
		mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
		const options = mergeOptions(globalOptions, record);
		const normalizedRecords = [mainNormalizedRecord];
		if ("alias" in record) {
			const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
			for (const alias of aliases) normalizedRecords.push(normalizeRouteRecord(assign({}, mainNormalizedRecord, {
				components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
				path: alias,
				aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
			})));
		}
		let matcher;
		let originalMatcher;
		for (const normalizedRecord of normalizedRecords) {
			const { path } = normalizedRecord;
			if (parent && !isAbsolutePath(path)) {
				const parentPath = parent.record.path;
				const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
				normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
			}
			matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
			if (originalRecord) originalRecord.alias.push(matcher);
			else {
				originalMatcher = originalMatcher || matcher;
				if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
				if (isRootAdd && record.name && !isAliasRecord(matcher)) removeRoute(record.name);
			}
			if (isMatchable(matcher)) insertMatcher(matcher);
			if (mainNormalizedRecord.children) {
				const children = mainNormalizedRecord.children;
				for (let i = 0; i < children.length; i++) addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
			}
			originalRecord = originalRecord || matcher;
		}
		return originalMatcher ? () => {
			removeRoute(originalMatcher);
		} : noop;
	}
	function removeRoute(matcherRef) {
		if (isRouteName(matcherRef)) {
			const matcher = matcherMap.get(matcherRef);
			if (matcher) {
				matcherMap.delete(matcherRef);
				matchers.splice(matchers.indexOf(matcher), 1);
				matcher.children.forEach(removeRoute);
				matcher.alias.forEach(removeRoute);
			}
		} else {
			const index = matchers.indexOf(matcherRef);
			if (index > -1) {
				matchers.splice(index, 1);
				if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
				matcherRef.children.forEach(removeRoute);
				matcherRef.alias.forEach(removeRoute);
			}
		}
	}
	function getRoutes() {
		return matchers;
	}
	function insertMatcher(matcher) {
		const index = findInsertionIndex(matcher, matchers);
		matchers.splice(index, 0, matcher);
		if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
	}
	function resolve(location, currentLocation) {
		let matcher;
		let params = {};
		let path;
		let name;
		if ("name" in location && location.name) {
			matcher = matcherMap.get(location.name);
			if (!matcher) throw createRouterError(1, { location });
			name = matcher.record.name;
			params = assign(pickParams(currentLocation.params, matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)), location.params && pickParams(location.params, matcher.keys.map((k) => k.name)));
			path = matcher.stringify(params);
		} else if (location.path != null) {
			path = location.path;
			matcher = matchers.find((m) => m.re.test(path));
			if (matcher) {
				params = matcher.parse(path);
				name = matcher.record.name;
				matcher.keys.forEach((key) => {
					if (key.optional && !params[key.name]) delete params[key.name];
				});
			}
		} else {
			matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
			if (!matcher) throw createRouterError(1, {
				location,
				currentLocation
			});
			name = matcher.record.name;
			params = assign({}, currentLocation.params, location.params);
			path = matcher.stringify(params);
		}
		const matched = [];
		let parentMatcher = matcher;
		while (parentMatcher) {
			matched.unshift(parentMatcher.record);
			parentMatcher = parentMatcher.parent;
		}
		return {
			name,
			path,
			params,
			matched,
			meta: mergeMetaFields(matched)
		};
	}
	routes.forEach((route) => addRoute(route));
	function clearRoutes() {
		matchers.length = 0;
		matcherMap.clear();
	}
	return {
		addRoute,
		resolve,
		removeRoute,
		clearRoutes,
		getRoutes,
		getRecordMatcher
	};
}
/**
* Picks an object param to contain only specified keys.
*
* @param params - params object to pick from
* @param keys - keys to pick
*/
function pickParams(params, keys) {
	const newParams = {};
	for (const key of keys) if (key in params) newParams[key] = params[key];
	return newParams;
}
/**
* Normalizes a RouteRecordRaw. Creates a copy
*
* @param record
* @returns the normalized version
*/
function normalizeRouteRecord(record) {
	const normalized = {
		path: record.path,
		redirect: record.redirect,
		name: record.name,
		meta: record.meta || {},
		aliasOf: record.aliasOf,
		beforeEnter: record.beforeEnter,
		props: normalizeRecordProps(record),
		children: record.children || [],
		instances: {},
		leaveGuards: /* @__PURE__ */ new Set(),
		updateGuards: /* @__PURE__ */ new Set(),
		enterCallbacks: {},
		components: "components" in record ? record.components || null : record.component && { default: record.component }
	};
	Object.defineProperty(normalized, "mods", { value: {} });
	return normalized;
}
/**
* Normalize the optional `props` in a record to always be an object similar to
* components. Also accept a boolean for components.
* @param record
*/
function normalizeRecordProps(record) {
	const propsObject = {};
	const props = record.props || false;
	if ("component" in record) propsObject.default = props;
	else for (const name in record.components) propsObject[name] = typeof props === "object" ? props[name] : props;
	return propsObject;
}
/**
* Checks if a record or any of its parent is an alias
* @param record
*/
function isAliasRecord(record) {
	while (record) {
		if (record.record.aliasOf) return true;
		record = record.parent;
	}
	return false;
}
/**
* Merge meta fields of an array of records
*
* @param matched - array of matched records
*/
function mergeMetaFields(matched) {
	return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
/**
* Performs a binary search to find the correct insertion index for a new matcher.
*
* Matchers are primarily sorted by their score. If scores are tied then we also consider parent/child relationships,
* with descendants coming before ancestors. If there's still a tie, new routes are inserted after existing routes.
*
* @param matcher - new matcher to be inserted
* @param matchers - existing matchers
*/
function findInsertionIndex(matcher, matchers) {
	let lower = 0;
	let upper = matchers.length;
	while (lower !== upper) {
		const mid = lower + upper >> 1;
		if (comparePathParserScore(matcher, matchers[mid]) < 0) upper = mid;
		else lower = mid + 1;
	}
	const insertionAncestor = getInsertionAncestor(matcher);
	if (insertionAncestor) upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
	return upper;
}
function getInsertionAncestor(matcher) {
	let ancestor = matcher;
	while (ancestor = ancestor.parent) if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) return ancestor;
}
/**
* Checks if a matcher can be reachable. This means if it's possible to reach it as a route. For example, routes without
* a component, or name, or redirect, are just used to group other routes.
* @param matcher
* @param matcher.record record of the matcher
* @returns
*/
function isMatchable({ record }) {
	return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
/**
* Returns the internal behavior of a {@link RouterLink} without the rendering part.
*
* @param props - a `to` location and an optional `replace` flag
*/
function useLink(props) {
	const router = inject(routerKey);
	const currentRoute = inject(routeLocationKey);
	const route = computed(() => {
		const to = unref(props.to);
		return router.resolve(to);
	});
	const activeRecordIndex = computed(() => {
		const { matched } = route.value;
		const { length } = matched;
		const routeMatched = matched[length - 1];
		const currentMatched = currentRoute.matched;
		if (!routeMatched || !currentMatched.length) return -1;
		const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
		if (index > -1) return index;
		const parentRecordPath = getOriginalPath(matched[length - 2]);
		return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
	});
	const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
	const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
	function navigate(e = {}) {
		if (guardEvent(e)) {
			const p = router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
			if (props.viewTransition && false);
			return p;
		}
		return Promise.resolve();
	}
	/**
	* NOTE: update {@link _RouterLinkI}'s `$slots` type when updating this
	*/
	return {
		route,
		href: computed(() => route.value.href),
		isActive,
		isExactActive,
		navigate
	};
}
function preferSingleVNode(vnodes) {
	return vnodes.length === 1 ? vnodes[0] : vnodes;
}
/**
* Component to render a link that triggers a navigation on click.
*/
var RouterLink = /* @__PURE__ */ defineComponent({
	name: "RouterLink",
	compatConfig: { MODE: 3 },
	props: {
		to: {
			type: [String, Object],
			required: true
		},
		replace: Boolean,
		activeClass: String,
		exactActiveClass: String,
		custom: Boolean,
		ariaCurrentValue: {
			type: String,
			default: "page"
		},
		viewTransition: Boolean
	},
	useLink,
	setup(props, { slots }) {
		const link = reactive(useLink(props));
		const { options } = inject(routerKey);
		const elClass = computed(() => ({
			[getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
			[getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
		}));
		return () => {
			const children = slots.default && preferSingleVNode(slots.default(link));
			return props.custom ? children : h("a", {
				"aria-current": link.isExactActive ? props.ariaCurrentValue : null,
				href: link.href,
				onClick: link.navigate,
				class: elClass.value
			}, children);
		};
	}
});
function guardEvent(e) {
	if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
	if (e.defaultPrevented) return;
	if (e.button !== void 0 && e.button !== 0) return;
	if (e.currentTarget && e.currentTarget.getAttribute) {
		const target = e.currentTarget.getAttribute("target");
		if (/\b_blank\b/i.test(target)) return;
	}
	if (e.preventDefault) e.preventDefault();
	return true;
}
function includesParams(outer, inner) {
	for (const key in inner) {
		const innerValue = inner[key];
		const outerValue = outer[key];
		if (isArray(innerValue)) {
			if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
		} else if (innerValue !== outerValue) return false;
	}
	return true;
}
/**
* Get the original path value of a record by following its aliasOf
* @param record
*/
function getOriginalPath(record) {
	return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
/**
* Utility class to get the active class based on defaults.
* @param propClass
* @param globalClass
* @param defaultClass
*/
var getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
var RouterViewImpl = /*#__PURE__*/ defineComponent({
	name: "RouterView",
	inheritAttrs: false,
	props: {
		name: {
			type: String,
			default: "default"
		},
		route: Object
	},
	compatConfig: { MODE: 3 },
	setup(props, { attrs, slots }) {
		const injectedRoute = inject(routerViewLocationKey);
		const routeToDisplay = computed(() => props.route || injectedRoute.value);
		const injectedDepth = inject(viewDepthKey, 0);
		const depth = computed(() => {
			let initialDepth = unref(injectedDepth);
			const { matched } = routeToDisplay.value;
			let matchedRoute;
			while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) initialDepth++;
			return initialDepth;
		});
		const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
		provide(viewDepthKey, computed(() => depth.value + 1));
		provide(matchedRouteKey, matchedRouteRef);
		provide(routerViewLocationKey, routeToDisplay);
		const viewRef = ref();
		watch(() => [
			viewRef.value,
			matchedRouteRef.value,
			props.name
		], ([instance, to, name], [oldInstance, from, _oldName]) => {
			if (to) {
				to.instances[name] = instance;
				if (from && from !== to && instance && instance === oldInstance) {
					if (!to.leaveGuards.size) to.leaveGuards = from.leaveGuards;
					if (!to.updateGuards.size) to.updateGuards = from.updateGuards;
				}
			}
			if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
		}, { flush: "post" });
		return () => {
			const route = routeToDisplay.value;
			const currentName = props.name;
			const matchedRoute = matchedRouteRef.value;
			const ViewComponent = matchedRoute && matchedRoute.components[currentName];
			if (!ViewComponent) return normalizeSlot$1(slots.default, {
				Component: ViewComponent,
				route
			});
			const routePropsOption = matchedRoute.props[currentName];
			const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
			const onVnodeUnmounted = (vnode) => {
				if (vnode.component.isUnmounted) matchedRoute.instances[currentName] = null;
			};
			const component = h(ViewComponent, assign({}, routeProps, attrs, {
				onVnodeUnmounted,
				ref: viewRef
			}));
			return normalizeSlot$1(slots.default, {
				Component: component,
				route
			}) || component;
		};
	}
});
function normalizeSlot$1(slot, data) {
	if (!slot) return null;
	const slotContent = slot(data);
	return slotContent.length === 1 ? slotContent[0] : slotContent;
}
/**
* Component to display the current route the user is at.
*/
var RouterView = RouterViewImpl;
/**
* Creates a Router instance that can be used by a Vue app.
*
* @param options - {@link RouterOptions}
*/
function createRouter(options) {
	const matcher = createRouterMatcher(options.routes, options);
	const parseQuery$1$1 = options.parseQuery || parseQuery$1;
	const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
	const routerHistory = options.history;
	const beforeGuards = useCallbacks();
	const beforeResolveGuards = useCallbacks();
	const afterGuards = useCallbacks();
	const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
	const routesVersion = shallowRef(0);
	let pendingLocation = START_LOCATION_NORMALIZED;
	const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
	const encodeParams = applyToParams.bind(null, encodeParam);
	const decodeParams = applyToParams.bind(null, decode);
	function addRoute(parentOrRoute, route) {
		let parent;
		let record;
		if (isRouteName(parentOrRoute)) {
			parent = matcher.getRecordMatcher(parentOrRoute);
			record = route;
		} else record = parentOrRoute;
		const removeRoute = matcher.addRoute(record, parent);
		routesVersion.value++;
		return () => {
			removeRoute();
			routesVersion.value++;
		};
	}
	function removeRoute(name) {
		const recordMatcher = matcher.getRecordMatcher(name);
		if (recordMatcher) {
			matcher.removeRoute(recordMatcher);
			routesVersion.value++;
		}
	}
	function clearRoutes() {
		matcher.clearRoutes();
		routesVersion.value++;
	}
	function getRoutes() {
		return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
	}
	function hasRoute(name) {
		return !!matcher.getRecordMatcher(name);
	}
	function resolve(rawLocation, currentLocation) {
		routesVersion.value;
		if (typeof rawLocation === "string") {
			currentLocation = currentLocation || (rawLocation.startsWith("/") ? START_LOCATION_NORMALIZED : currentRoute.value);
			const locationNormalized = parseURL$1(parseQuery$1$1, rawLocation, currentLocation.path);
			const matchedRoute = matcher.resolve({ path: locationNormalized.path }, currentLocation);
			const href = routerHistory.createHref(locationNormalized.fullPath);
			return assign(locationNormalized, matchedRoute, {
				params: decodeParams(matchedRoute.params),
				redirectedFrom: void 0,
				href
			});
		}
		currentLocation = assign({}, currentLocation || (rawLocation.path != null && rawLocation.path.startsWith("/") && !("name" in rawLocation && rawLocation.name) ? START_LOCATION_NORMALIZED : currentRoute.value));
		let matcherLocation;
		if (rawLocation.path != null) matcherLocation = assign({}, rawLocation, { path: parseURL$1(parseQuery$1$1, rawLocation.path, currentLocation.path).path });
		else {
			const targetParams = assign({}, rawLocation.params);
			for (const key in targetParams) if (targetParams[key] == null) delete targetParams[key];
			matcherLocation = assign({}, rawLocation, { params: encodeParams(targetParams) });
			currentLocation.params = encodeParams(currentLocation.params);
		}
		const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
		const hash = rawLocation.hash || "";
		matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
		const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
			hash: encodeHash(hash),
			path: matchedRoute.path
		}));
		const href = routerHistory.createHref(fullPath);
		return assign({
			fullPath,
			hash,
			query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
		}, matchedRoute, {
			redirectedFrom: void 0,
			href
		});
	}
	function locationAsObject(to) {
		return typeof to === "string" ? parseURL$1(parseQuery$1$1, to, currentRoute.value.path) : assign({}, to);
	}
	function checkCanceledNavigation(to, from) {
		if (pendingLocation !== to) return createRouterError(8, {
			from,
			to
		});
	}
	function push(to) {
		return pushWithRedirect(to);
	}
	function replace(to) {
		return push(assign(locationAsObject(to), { replace: true }));
	}
	function handleRedirectRecord(to, from) {
		const lastMatched = to.matched[to.matched.length - 1];
		if (lastMatched && lastMatched.redirect) {
			const { redirect } = lastMatched;
			let newTargetLocation = typeof redirect === "function" ? redirect(to, from) : redirect;
			if (typeof newTargetLocation === "string") {
				newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
				newTargetLocation.params = {};
			}
			return assign({
				query: to.query,
				hash: to.hash,
				params: newTargetLocation.path != null ? {} : to.params
			}, newTargetLocation);
		}
	}
	function pushWithRedirect(to, redirectedFrom) {
		const targetLocation = pendingLocation = resolve(to);
		const from = currentRoute.value;
		const data = to.state;
		const force = to.force;
		const replace = to.replace === true;
		const shouldRedirect = handleRedirectRecord(targetLocation, from);
		if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
			state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
			force,
			replace
		}), redirectedFrom || targetLocation);
		const toLocation = targetLocation;
		toLocation.redirectedFrom = redirectedFrom;
		let failure;
		if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
			failure = createRouterError(16, {
				to: toLocation,
				from
			});
			handleScroll();
		}
		return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, 2) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure) => {
			if (failure) {
				if (isNavigationFailure(failure, 2)) return pushWithRedirect(assign({ replace }, locationAsObject(failure.to), {
					state: typeof failure.to === "object" ? assign({}, data, failure.to.state) : data,
					force
				}), redirectedFrom || toLocation);
			} else failure = finalizeNavigation(toLocation, from, true, replace, data);
			triggerAfterEach(toLocation, from, failure);
			return failure;
		});
	}
	/**
	* Helper to reject and skip all navigation guards if a new navigation happened
	* @param to
	* @param from
	*/
	function checkCanceledNavigationAndReject(to, from) {
		const error = checkCanceledNavigation(to, from);
		return error ? Promise.reject(error) : Promise.resolve();
	}
	function runWithContext(fn) {
		const app = installedApps.values().next().value;
		return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
	}
	function navigate(to, from) {
		let guards;
		const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
		guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
		for (const record of leavingRecords) record.leaveGuards.forEach((guard) => {
			guards.push(guardToPromiseFn(guard, to, from));
		});
		const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
		guards.push(canceledNavigationCheck);
		return runGuardQueue(guards).then(() => {
			guards = [];
			for (const guard of beforeGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).then(() => {
			guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
			for (const record of updatingRecords) record.updateGuards.forEach((guard) => {
				guards.push(guardToPromiseFn(guard, to, from));
			});
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).then(() => {
			guards = [];
			for (const record of enteringRecords) if (record.beforeEnter) {
				if (isArray(record.beforeEnter)) for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
				else guards.push(guardToPromiseFn(record.beforeEnter, to, from));
			}
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).then(() => {
			to.matched.forEach((record) => record.enterCallbacks = {});
			guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).then(() => {
			guards = [];
			for (const guard of beforeResolveGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
	}
	function triggerAfterEach(to, from, failure) {
		afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
	}
	/**
	* - Cleans up any navigation guards
	* - Changes the url if necessary
	* - Calls the scrollBehavior
	*/
	function finalizeNavigation(toLocation, from, isPush, replace, data) {
		const error = checkCanceledNavigation(toLocation, from);
		if (error) return error;
		const isFirstNavigation = from === START_LOCATION_NORMALIZED;
		const state = {};
		if (isPush) {
			if (replace || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({ scroll: isFirstNavigation && state && state.scroll }, data));
			else routerHistory.push(toLocation.fullPath, data);
		}
		currentRoute.value = toLocation;
		handleScroll();
		markAsReady();
	}
	let removeHistoryListener;
	function setupListeners() {
		if (removeHistoryListener) return;
		removeHistoryListener = routerHistory.listen((to, _from, info) => {
			if (!router.listening) return;
			const toLocation = resolve(to);
			const shouldRedirect = handleRedirectRecord(toLocation, router.currentRoute.value);
			if (shouldRedirect) {
				pushWithRedirect(assign(shouldRedirect, {
					replace: true,
					force: true
				}), toLocation).catch(noop);
				return;
			}
			pendingLocation = toLocation;
			const from = currentRoute.value;
			navigate(toLocation, from).catch((error) => {
				if (isNavigationFailure(error, 12)) return error;
				if (isNavigationFailure(error, 2)) {
					pushWithRedirect(assign(locationAsObject(error.to), { force: true }), toLocation).then((failure) => {
						if (isNavigationFailure(failure, 20) && !info.delta && info.type === "pop") routerHistory.go(-1, false);
					}).catch(noop);
					return Promise.reject();
				}
				if (info.delta) routerHistory.go(-info.delta, false);
				return triggerError(error, toLocation, from);
			}).then((failure) => {
				failure = failure || finalizeNavigation(toLocation, from, false);
				if (failure) {
					if (info.delta && !isNavigationFailure(failure, 8)) routerHistory.go(-info.delta, false);
					else if (info.type === "pop" && isNavigationFailure(failure, 20)) routerHistory.go(-1, false);
				}
				triggerAfterEach(toLocation, from, failure);
			}).catch(noop);
		});
	}
	let readyHandlers = useCallbacks();
	let errorListeners = useCallbacks();
	let ready;
	/**
	* Trigger errorListeners added via onError and throws the error as well
	*
	* @param error - error to throw
	* @param to - location we were navigating to when the error happened
	* @param from - location we were navigating from when the error happened
	* @returns the error as a rejected promise
	*/
	function triggerError(error, to, from) {
		markAsReady(error);
		const list = errorListeners.list();
		if (list.length) list.forEach((handler) => handler(error, to, from));
		else console.error(error);
		return Promise.reject(error);
	}
	function isReady() {
		if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
		return new Promise((resolve, reject) => {
			readyHandlers.add([resolve, reject]);
		});
	}
	function markAsReady(err) {
		if (!ready) {
			ready = !err;
			setupListeners();
			readyHandlers.list().forEach(([resolve, reject]) => err ? reject(err) : resolve());
			readyHandlers.reset();
		}
		return err;
	}
	function handleScroll(to, from, isPush, isFirstNavigation) {
		const { scrollBehavior } = options;
		return Promise.resolve();
	}
	const go = (delta) => routerHistory.go(delta);
	const installedApps = /* @__PURE__ */ new Set();
	const router = {
		currentRoute,
		listening: true,
		addRoute,
		removeRoute,
		clearRoutes,
		hasRoute,
		getRoutes,
		resolve,
		options,
		push,
		replace,
		go,
		back: () => go(-1),
		forward: () => go(1),
		beforeEach: beforeGuards.add,
		beforeResolve: beforeResolveGuards.add,
		afterEach: afterGuards.add,
		onError: errorListeners.add,
		isReady,
		install(app) {
			app.component("RouterLink", RouterLink);
			app.component("RouterView", RouterView);
			app.config.globalProperties.$router = router;
			Object.defineProperty(app.config.globalProperties, "$route", {
				enumerable: true,
				get: () => unref(currentRoute)
			});
			const reactiveRoute = {};
			for (const key in START_LOCATION_NORMALIZED) Object.defineProperty(reactiveRoute, key, {
				get: () => currentRoute.value[key],
				enumerable: true
			});
			app.provide(routerKey, router);
			app.provide(routeLocationKey, shallowReactive(reactiveRoute));
			app.provide(routerViewLocationKey, currentRoute);
			const unmountApp = app.unmount;
			installedApps.add(app);
			app.unmount = function() {
				installedApps.delete(app);
				if (installedApps.size < 1) {
					pendingLocation = START_LOCATION_NORMALIZED;
					removeHistoryListener && removeHistoryListener();
					removeHistoryListener = null;
					currentRoute.value = START_LOCATION_NORMALIZED;
					ready = false;
				}
				unmountApp();
			};
		}
	};
	function runGuardQueue(guards) {
		return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
	}
	return router;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/components/utils.js
var ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
	const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
	return typeof source === "function" ? source(route) : source;
}
/**
* Utility used within router guards
* return true if the route has been changed with a page change during navigation
*/
function isChangingPage(to, from) {
	if (to === from || from === START_LOCATION_NORMALIZED) return false;
	if (generateRouteKey(to) !== generateRouteKey(from)) return true;
	if (to.matched.every((comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default)) return false;
	return true;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/pages/runtime/router.options.js
var router_options_default = { scrollBehavior(to, from, savedPosition) {
	const nuxtApp = useNuxtApp();
	const router = useRouter();
	const hashScrollBehaviour = router.options?.scrollBehaviorType ?? "auto";
	if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
		if (from.hash && !to.hash) return savedPosition ?? {
			left: 0,
			top: 0
		};
		if (to.hash) return {
			el: to.hash,
			top: _getHashElementScrollMarginTop(to.hash),
			behavior: hashScrollBehaviour
		};
		return false;
	}
	if ((typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop) === false) return false;
	if (from === START_LOCATION_NORMALIZED) return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
	return new Promise((resolve) => {
		const doScroll = () => {
			requestAnimationFrame(() => {
				if (router.currentRoute.value.fullPath !== to.fullPath) {
					resolve(false);
					return;
				}
				resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
			});
		};
		nuxtApp.hooks.hookOnce("page:loading:end", () => {
			const transitionPromise = nuxtApp["~transitionPromise"];
			if (transitionPromise) transitionPromise.then(doScroll);
			else doScroll();
		});
	});
} };
function _getHashElementScrollMarginTop(selector) {
	try {
		const elem = (void 0).querySelector(selector);
		if (elem) return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
	} catch {}
	return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
	if (savedPosition) return savedPosition;
	if (to.hash) return {
		el: to.hash,
		top: _getHashElementScrollMarginTop(to.hash),
		behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
	};
	return {
		left: 0,
		top: 0
	};
}
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default = {
	hashMode: false,
	scrollBehaviorType: "auto",
	...router_options_default
};
Object.assign(Object.create(null), {});
var pageIslandRoutes = Object.assign(Object.create(null), {});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/pages/runtime/validate.js
var middleware$1 = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
	let __temp, __restore;
	if (!to.meta?.validate) return;
	const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
	if (result === true) return;
	return createError$1({
		fatal: false,
		status: result && (result.status || result.statusCode) || 404,
		statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
		data: { path: to.fullPath }
	});
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/diagnostics/manifest.js
/**
* E5xxx
* App manifest / route-rules runtime diagnostics.
*/
var manifestDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froute-rules.mjs
var sensitiveMatcher = (m, p) => {
	return [];
};
var foldedMatcher = sensitiveMatcher;
var decodeRoutePath = function decodeRoutePath(path) {
	if (!path.includes("%")) return path;
	const queryIndex = path.indexOf("?");
	const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
	try {
		return queryIndex === -1 ? decodeURI(pathname) : decodeURI(pathname) + path.slice(queryIndex);
	} catch {
		return path;
	}
};
var normalizePath = (path, fold) => {
	if (typeof path !== "string") return path;
	const decoded = decodeRoutePath(path);
	return fold ? decoded.toLowerCase() : decoded;
};
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default = (path) => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.sensitive ? defu({}, ...sensitiveMatcher("", normalizePath(path, false)).map((r) => r.data).reverse()) : defu({}, ...foldedMatcher("", normalizePath(path, true)).map((r) => r.data).reverse());
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/composables/manifest.js
var routeRulesMatcher = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default;
function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	try {
		return routeRulesMatcher(path);
	} catch (e) {
		manifestDiagnostics.NUXT_E5003({
			path,
			cause: e
		});
		return {};
	}
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fmiddleware.mjs
var globalMiddleware = [middleware$1, /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {})];
var namedMiddleware = {};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froutes.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default = [{
	name: "index",
	path: "/",
	component: () => import('../build/pages-CH0WqDeX.mjs')
}];
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/pages/runtime/plugins/router.js
var plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	async setup(nuxtApp) {
		let __temp, __restore;
		let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
		const history = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.history?.(routerBase) ?? createMemoryHistory(routerBase);
		const routes = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes ? ([__temp, __restore] = executeAsync(() => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default)), __temp = await __temp, __restore(), __temp) ?? virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default : virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default;
		let startPosition;
		const router = createRouter({
			...virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default,
			scrollBehavior: (to, from, savedPosition) => {
				if (from === START_LOCATION_NORMALIZED) {
					startPosition = savedPosition;
					return;
				}
				if (virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior) {
					router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
					if ("scrollRestoration" in (void 0).history) {
						const unsub = router.beforeEach(() => {
							unsub();
							(void 0).history.scrollRestoration = "manual";
						});
					}
					return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior(to, START_LOCATION_NORMALIZED, startPosition || savedPosition);
				}
			},
			history,
			routes
		});
		nuxtApp.vueApp.use(router);
		const previousRoute = shallowRef(router.currentRoute.value);
		router.afterEach((_to, from) => {
			previousRoute.value = from;
		});
		Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", { get: () => previousRoute.value });
		const initialURL = nuxtApp.ssrContext.url;
		const _route = shallowRef(router.currentRoute.value);
		const syncCurrentRoute = () => {
			_route.value = router.currentRoute.value;
		};
		router.afterEach((to, from) => {
			const lastTo = to.matched.at(-1)?.components?.default;
			const lastFrom = from.matched.at(-1)?.components?.default;
			if (lastTo === lastFrom) {
				if (generateRouteKey$1({
					route: to,
					Component: { type: lastTo }
				}) === generateRouteKey$1({
					route: from,
					Component: { type: lastFrom }
				})) syncCurrentRoute();
				return;
			}
			if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) syncCurrentRoute();
		});
		const route = { sync: syncCurrentRoute };
		for (const key in _route.value) Object.defineProperty(route, key, {
			get: () => _route.value[key],
			enumerable: true
		});
		nuxtApp._route = shallowReactive(route);
		nuxtApp._middleware ||= {
			global: [],
			named: {}
		};
		const error = /* @__PURE__ */ useError();
		const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
		if (!nuxtApp.ssrContext?.islandContext || isServerPage) router.afterEach(async (to, _from, failure) => {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
			if (failure) await nuxtApp.callHook("page:loading:end");
			if (failure?.type === 4) return;
			if (to.redirectedFrom && to.fullPath !== initialURL) await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
		});
		try {
			[__temp, __restore] = executeAsync(() => router.push(initialURL)), __temp = await __temp, __restore();
			[__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
		} catch (error) {
			[__temp, __restore] = executeAsync(() => _showErrorUnlessCrawler(nuxtApp, error)), await __temp, __restore();
		}
		const resolvedInitialRoute = router.currentRoute.value;
		syncCurrentRoute();
		if (nuxtApp.ssrContext?.islandContext && !isServerPage) return { provide: { router } };
		const initialLayout = nuxtApp.payload.state._layout;
		router.beforeEach(async (to, from) => {
			await nuxtApp.callHook("page:loading:start");
			to.meta = reactive(to.meta);
			if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) to.meta.layout = initialLayout;
			nuxtApp._processingMiddleware = true;
			nuxtApp._middlewareTo = to;
			if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
				const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
				for (const component of to.matched) {
					const componentMiddleware = component.meta.middleware;
					if (!componentMiddleware) continue;
					for (const entry of toArray(componentMiddleware)) middlewareEntries.add(entry);
				}
				const routeRules = getRouteRules({ path: to.path });
				if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) if (routeRules.appMiddleware[key]) middlewareEntries.add(key);
				else middlewareEntries.delete(key);
				for (const entry of middlewareEntries) {
					const middleware = typeof entry === "string" ? nuxtApp._middleware.named[entry] || await namedMiddleware[entry]?.().then((r) => r.default || r) : entry;
					if (!middleware) throw navigationDiagnostics.NUXT_E2004({
						entry: String(entry),
						validMiddleware: void 0
					});
					try {
						const result = await nuxtApp.runWithContext(() => middleware(to, from));
						if (result === false || result instanceof Error) {
							const error = result || createError$1({
								status: 404,
								statusText: `Page Not Found: ${initialURL}`
							});
							await nuxtApp.runWithContext(() => showError(error));
							return false;
						}
						if (result === true) continue;
						if (result === false) return result;
						if (result) {
							if (isNuxtError(result) && result.fatal) await nuxtApp.runWithContext(() => showError(result));
							return result;
						}
					} catch (err) {
						const error = createError$1(err);
						if (error.fatal) await nuxtApp.runWithContext(() => showError(error));
						return error;
					}
				}
			}
		});
		if (isServerPage) router.beforeResolve((to) => {
			const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
			const actual = to.matched.find((m) => (m.components?.default)?.__nuxt_island)?.components?.default;
			if (!expected || expected !== actual?.__nuxt_island) {
				nuxtApp.ssrContext["~renderResponse"] = {
					statusCode: 400,
					statusMessage: "Invalid island request path"
				};
				return false;
			}
		});
		router.onError(async () => {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
			await nuxtApp.callHook("page:loading:end");
		});
		router.afterEach((to) => {
			if (to.matched.length === 0 && !error.value) return nuxtApp.runWithContext(() => showError(createError$1({
				status: 404,
				fatal: false,
				statusText: `Page not found: ${to.fullPath}`,
				data: { path: to.fullPath }
			})));
		});
		nuxtApp.hooks.hookOnce("app:created", async () => {
			try {
				if ("name" in resolvedInitialRoute) resolvedInitialRoute.name = void 0;
				await router.replace({
					...resolvedInitialRoute,
					force: true
				});
				router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
			} catch (error) {
				await _showErrorUnlessCrawler(nuxtApp, error);
			}
		});
		return { provide: { router } };
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/diagnostics/head.js
/**
* E6xxx
* Head / unhead runtime diagnostics.
*/
var unheadDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/head/runtime/composables.js
/**
* Injects the head client from the Nuxt context or Vue inject.
*/
function injectHead(nuxtApp) {
	const nuxt = nuxtApp || useNuxtApp();
	return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
		if (hasInjectionContext()) {
			const head = inject(headSymbol);
			if (!head) throw unheadDiagnostics.NUXT_E6001();
			return head;
		}
	});
}
function useHead$1(input, options = {}) {
	const head = options.head || injectHead(options.nuxt);
	return useHead(input, {
		head,
		...options
	});
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/composables/payload.js
/**
* This is an experimental function for configuring passing rich data from server -> client.
* @since 3.4.0
*/
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/plugins/revive-payload.server.js
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isRef(data) && data.value],
	["Reactive", (data) => isReactive(data) && toRaw(data)]
];
var plugin = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:revive-payload:server",
	setup() {
		for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
	}
});
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/autocomplete/index.mjs?nuxt_component=async&nuxt_component_name=AutoComplete&nuxt_component_export=default
var autocomplete_default = defineAsyncComponent(() => import('../build/autocomplete-DtCei46I.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/calendar/index.mjs?nuxt_component=async&nuxt_component_name=Calendar&nuxt_component_export=default
var calendar_default = defineAsyncComponent(() => import('../build/calendar-B7Ay1oah.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/cascadeselect/index.mjs?nuxt_component=async&nuxt_component_name=CascadeSelect&nuxt_component_export=default
var cascadeselect_default = defineAsyncComponent(() => import('../build/cascadeselect-DyfyM8Kj.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/checkbox/index.mjs?nuxt_component=async&nuxt_component_name=Checkbox&nuxt_component_export=default
var checkbox_default = defineAsyncComponent(() => import('../build/checkbox-CdVTEsX6.mjs').then((n) => n.t).then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/checkboxgroup/index.mjs?nuxt_component=async&nuxt_component_name=CheckboxGroup&nuxt_component_export=default
var checkboxgroup_default = defineAsyncComponent(() => import('../build/checkboxgroup-D_FyeB-5.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/chips/index.mjs?nuxt_component=async&nuxt_component_name=Chips&nuxt_component_export=default
var chips_default = defineAsyncComponent(() => import('../build/chips-S7PhO2Ko.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/colorpicker/index.mjs?nuxt_component=async&nuxt_component_name=ColorPicker&nuxt_component_export=default
var colorpicker_default = defineAsyncComponent(() => import('../build/colorpicker-DOp7_nb9.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/datepicker/index.mjs?nuxt_component=async&nuxt_component_name=DatePicker&nuxt_component_export=default
var datepicker_default = defineAsyncComponent(() => import('../build/datepicker-CHVnP7KO.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/dropdown/index.mjs?nuxt_component=async&nuxt_component_name=Dropdown&nuxt_component_export=default
var dropdown_default = defineAsyncComponent(() => import('../build/dropdown-DG7KEKu1.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/floatlabel/index.mjs?nuxt_component=async&nuxt_component_name=FloatLabel&nuxt_component_export=default
var floatlabel_default = defineAsyncComponent(() => import('../build/floatlabel-DYWsLJy8.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/fluid/index.mjs?nuxt_component=async&nuxt_component_name=Fluid&nuxt_component_export=default
var fluid_default = defineAsyncComponent(() => import('../build/fluid-C9RT5H2P.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/iconfield/index.mjs?nuxt_component=async&nuxt_component_name=IconField&nuxt_component_export=default
var iconfield_default = defineAsyncComponent(() => import('../build/iconfield-Cgks-fsd.mjs').then((n) => n.t).then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/iftalabel/index.mjs?nuxt_component=async&nuxt_component_name=IftaLabel&nuxt_component_export=default
var iftalabel_default = defineAsyncComponent(() => import('../build/iftalabel-Czhapyp-.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/inputchips/index.mjs?nuxt_component=async&nuxt_component_name=InputChips&nuxt_component_export=default
var inputchips_default = defineAsyncComponent(() => import('../build/inputchips-C-vVDV_1.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/inputgroup/index.mjs?nuxt_component=async&nuxt_component_name=InputGroup&nuxt_component_export=default
var inputgroup_default = defineAsyncComponent(() => import('../build/inputgroup-BXspgrrV.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/inputgroupaddon/index.mjs?nuxt_component=async&nuxt_component_name=InputGroupAddon&nuxt_component_export=default
var inputgroupaddon_default = defineAsyncComponent(() => import('../build/inputgroupaddon-lrbpjpRX.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/inputicon/index.mjs?nuxt_component=async&nuxt_component_name=InputIcon&nuxt_component_export=default
var inputicon_default = defineAsyncComponent(() => import('../build/inputicon-Z3iAp3dN.mjs').then((n) => n.t).then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/inputmask/index.mjs?nuxt_component=async&nuxt_component_name=InputMask&nuxt_component_export=default
var inputmask_default = defineAsyncComponent(() => import('../build/inputmask-qtljQx1h.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/inputnumber/index.mjs?nuxt_component=async&nuxt_component_name=InputNumber&nuxt_component_export=default
var inputnumber_default = defineAsyncComponent(() => import('../build/inputnumber-COnATfhu.mjs').then((n) => n.t).then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/inputotp/index.mjs?nuxt_component=async&nuxt_component_name=InputOtp&nuxt_component_export=default
var inputotp_default = defineAsyncComponent(() => import('../build/inputotp-BgDNcJCI.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/inputswitch/index.mjs?nuxt_component=async&nuxt_component_name=InputSwitch&nuxt_component_export=default
var inputswitch_default = defineAsyncComponent(() => import('../build/inputswitch-DoFbAufo.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/inputtext/index.mjs?nuxt_component=async&nuxt_component_name=InputText&nuxt_component_export=default
var inputtext_default = defineAsyncComponent(() => import('../build/inputtext-vtKBcO3f.mjs').then((n) => n.t).then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/knob/index.mjs?nuxt_component=async&nuxt_component_name=Knob&nuxt_component_export=default
var knob_default = defineAsyncComponent(() => import('../build/knob-B7Utx8kB.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/listbox/index.mjs?nuxt_component=async&nuxt_component_name=Listbox&nuxt_component_export=default
var listbox_default = defineAsyncComponent(() => import('../build/listbox-BikngtYa.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/multiselect/index.mjs?nuxt_component=async&nuxt_component_name=MultiSelect&nuxt_component_export=default
var multiselect_default = defineAsyncComponent(() => import('../build/multiselect-ur5o_taE.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/password/index.mjs?nuxt_component=async&nuxt_component_name=Password&nuxt_component_export=default
var password_default = defineAsyncComponent(() => import('../build/password-Bcpxd7Qm.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/radiobutton/index.mjs?nuxt_component=async&nuxt_component_name=RadioButton&nuxt_component_export=default
var radiobutton_default = defineAsyncComponent(() => import('../build/radiobutton-iWV6qUGb.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/radiobuttongroup/index.mjs?nuxt_component=async&nuxt_component_name=RadioButtonGroup&nuxt_component_export=default
var radiobuttongroup_default = defineAsyncComponent(() => import('../build/radiobuttongroup-DqmTZKbU.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/rating/index.mjs?nuxt_component=async&nuxt_component_name=Rating&nuxt_component_export=default
var rating_default = defineAsyncComponent(() => import('../build/rating-BI7lCjRQ.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/select/index.mjs?nuxt_component=async&nuxt_component_name=Select&nuxt_component_export=default
var select_default = defineAsyncComponent(() => import('../build/select-CLJANPSR.mjs').then((n) => n.n).then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/selectbutton/index.mjs?nuxt_component=async&nuxt_component_name=SelectButton&nuxt_component_export=default
var selectbutton_default = defineAsyncComponent(() => import('../build/selectbutton-CLB5sEVY.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/slider/index.mjs?nuxt_component=async&nuxt_component_name=Slider&nuxt_component_export=default
var slider_default = defineAsyncComponent(() => import('../build/slider-hi1rntNG.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/textarea/index.mjs?nuxt_component=async&nuxt_component_name=Textarea&nuxt_component_export=default
var textarea_default = defineAsyncComponent(() => import('../build/textarea-CwjDwdKT.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/togglebutton/index.mjs?nuxt_component=async&nuxt_component_name=ToggleButton&nuxt_component_export=default
var togglebutton_default = defineAsyncComponent(() => import('../build/togglebutton-8d_TWyzz.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/toggleswitch/index.mjs?nuxt_component=async&nuxt_component_name=ToggleSwitch&nuxt_component_export=default
var toggleswitch_default = defineAsyncComponent(() => import('../build/toggleswitch-DN1Z30CH.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/treeselect/index.mjs?nuxt_component=async&nuxt_component_name=TreeSelect&nuxt_component_export=default
var treeselect_default = defineAsyncComponent(() => import('../build/treeselect-DiT1fHeR.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/button/index.mjs?nuxt_component=async&nuxt_component_name=Button&nuxt_component_export=default
var button_default = defineAsyncComponent(() => import('../build/button-C40UUDts.mjs').then((n) => n.t).then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/buttongroup/index.mjs?nuxt_component=async&nuxt_component_name=ButtonGroup&nuxt_component_export=default
var buttongroup_default = defineAsyncComponent(() => import('../build/buttongroup-Cle3FSVd.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/speeddial/index.mjs?nuxt_component=async&nuxt_component_name=SpeedDial&nuxt_component_export=default
var speeddial_default = defineAsyncComponent(() => import('../build/speeddial-dxoYaJKC.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/splitbutton/index.mjs?nuxt_component=async&nuxt_component_name=SplitButton&nuxt_component_export=default
var splitbutton_default = defineAsyncComponent(() => import('../build/splitbutton-DnNhZ3me.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/column/index.mjs?nuxt_component=async&nuxt_component_name=Column&nuxt_component_export=default
var column_default = defineAsyncComponent(() => import('../build/column-7BHjOb9s.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/row/index.mjs?nuxt_component=async&nuxt_component_name=Row&nuxt_component_export=default
var row_default = defineAsyncComponent(() => import('../build/row-DBRIhxFT.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/columngroup/index.mjs?nuxt_component=async&nuxt_component_name=ColumnGroup&nuxt_component_export=default
var columngroup_default = defineAsyncComponent(() => import('../build/columngroup-DRW_69NJ.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/datatable/index.mjs?nuxt_component=async&nuxt_component_name=DataTable&nuxt_component_export=default
var datatable_default = defineAsyncComponent(() => import('../build/datatable-C8Ooccva.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/dataview/index.mjs?nuxt_component=async&nuxt_component_name=DataView&nuxt_component_export=default
var dataview_default = defineAsyncComponent(() => import('../build/dataview-RoJ7eoTn.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/orderlist/index.mjs?nuxt_component=async&nuxt_component_name=OrderList&nuxt_component_export=default
var orderlist_default = defineAsyncComponent(() => import('../build/orderlist-DzVpHMvQ.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/organizationchart/index.mjs?nuxt_component=async&nuxt_component_name=OrganizationChart&nuxt_component_export=default
var organizationchart_default = defineAsyncComponent(() => import('../build/organizationchart-Cu1n4zKP.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/paginator/index.mjs?nuxt_component=async&nuxt_component_name=Paginator&nuxt_component_export=default
var paginator_default = defineAsyncComponent(() => import('../build/paginator-MzGp2OGQ.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/picklist/index.mjs?nuxt_component=async&nuxt_component_name=PickList&nuxt_component_export=default
var picklist_default = defineAsyncComponent(() => import('../build/picklist-BLeRrpPQ.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/tree/index.mjs?nuxt_component=async&nuxt_component_name=Tree&nuxt_component_export=default
var tree_default = defineAsyncComponent(() => import('../build/tree-DfWc6YPf.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/treetable/index.mjs?nuxt_component=async&nuxt_component_name=TreeTable&nuxt_component_export=default
var treetable_default = defineAsyncComponent(() => import('../build/treetable-5X18Yh7E.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/timeline/index.mjs?nuxt_component=async&nuxt_component_name=Timeline&nuxt_component_export=default
var timeline_default = defineAsyncComponent(() => import('../build/timeline-C4UYbmg9.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/virtualscroller/index.mjs?nuxt_component=async&nuxt_component_name=VirtualScroller&nuxt_component_export=default
var virtualscroller_default = defineAsyncComponent(() => import('../build/virtualscroller-D2XKvbhU.mjs').then((n) => n.n).then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/accordion/index.mjs?nuxt_component=async&nuxt_component_name=Accordion&nuxt_component_export=default
var accordion_default = defineAsyncComponent(() => import('../build/accordion-C7aL8Ps-.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/accordionpanel/index.mjs?nuxt_component=async&nuxt_component_name=AccordionPanel&nuxt_component_export=default
var accordionpanel_default = defineAsyncComponent(() => import('../build/accordionpanel-CVapd_DB.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/accordionheader/index.mjs?nuxt_component=async&nuxt_component_name=AccordionHeader&nuxt_component_export=default
var accordionheader_default = defineAsyncComponent(() => import('../build/accordionheader-BOdisEJz.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/accordioncontent/index.mjs?nuxt_component=async&nuxt_component_name=AccordionContent&nuxt_component_export=default
var accordioncontent_default = defineAsyncComponent(() => import('../build/accordioncontent-Chr0Sn85.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/accordiontab/index.mjs?nuxt_component=async&nuxt_component_name=AccordionTab&nuxt_component_export=default
var accordiontab_default = defineAsyncComponent(() => import('../build/accordiontab-Cyn_VP69.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/card/index.mjs?nuxt_component=async&nuxt_component_name=Card&nuxt_component_export=default
var card_default = defineAsyncComponent(() => import('../build/card-i0twDTGF.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/deferredcontent/index.mjs?nuxt_component=async&nuxt_component_name=DeferredContent&nuxt_component_export=default
var deferredcontent_default = defineAsyncComponent(() => import('../build/deferredcontent-BI7reXCT.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/divider/index.mjs?nuxt_component=async&nuxt_component_name=Divider&nuxt_component_export=default
var divider_default = defineAsyncComponent(() => import('../build/divider-BfNrA_a4.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/fieldset/index.mjs?nuxt_component=async&nuxt_component_name=Fieldset&nuxt_component_export=default
var fieldset_default = defineAsyncComponent(() => import('../build/fieldset-B6ti2mBj.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/panel/index.mjs?nuxt_component=async&nuxt_component_name=Panel&nuxt_component_export=default
var panel_default = defineAsyncComponent(() => import('../build/panel-i48CI-h0.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/scrollpanel/index.mjs?nuxt_component=async&nuxt_component_name=ScrollPanel&nuxt_component_export=default
var scrollpanel_default = defineAsyncComponent(() => import('../build/scrollpanel-CLxmOtpK.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/splitter/index.mjs?nuxt_component=async&nuxt_component_name=Splitter&nuxt_component_export=default
var splitter_default = defineAsyncComponent(() => import('../build/splitter-Di2OQJGl.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/splitterpanel/index.mjs?nuxt_component=async&nuxt_component_name=SplitterPanel&nuxt_component_export=default
var splitterpanel_default = defineAsyncComponent(() => import('../build/splitterpanel-8y9hiodB.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/stepper/index.mjs?nuxt_component=async&nuxt_component_name=Stepper&nuxt_component_export=default
var stepper_default = defineAsyncComponent(() => import('../build/stepper-D9pBEtmL.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/steplist/index.mjs?nuxt_component=async&nuxt_component_name=StepList&nuxt_component_export=default
var steplist_default = defineAsyncComponent(() => import('../build/steplist-CY1yTVxg.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/step/index.mjs?nuxt_component=async&nuxt_component_name=Step&nuxt_component_export=default
var step_default = defineAsyncComponent(() => import('../build/step-Df_wbjge.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/stepitem/index.mjs?nuxt_component=async&nuxt_component_name=StepItem&nuxt_component_export=default
var stepitem_default = defineAsyncComponent(() => import('../build/stepitem-CuWJdoA5.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/steppanels/index.mjs?nuxt_component=async&nuxt_component_name=StepPanels&nuxt_component_export=default
var steppanels_default = defineAsyncComponent(() => import('../build/steppanels-Dqn_dGNC.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/steppanel/index.mjs?nuxt_component=async&nuxt_component_name=StepPanel&nuxt_component_export=default
var steppanel_default = defineAsyncComponent(() => import('../build/steppanel-CWJW9QCx.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/tabview/index.mjs?nuxt_component=async&nuxt_component_name=TabView&nuxt_component_export=default
var tabview_default = defineAsyncComponent(() => import('../build/tabview-DLi2G2nT.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/tabs/index.mjs?nuxt_component=async&nuxt_component_name=Tabs&nuxt_component_export=default
var tabs_default = defineAsyncComponent(() => import('../build/tabs-l5GesnSc.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/tablist/index.mjs?nuxt_component=async&nuxt_component_name=TabList&nuxt_component_export=default
var tablist_default = defineAsyncComponent(() => import('../build/tablist-LmjJ1eJY.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/tab/index.mjs?nuxt_component=async&nuxt_component_name=Tab&nuxt_component_export=default
var tab_default = defineAsyncComponent(() => import('../build/tab-CBEFqRJe.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/tabpanels/index.mjs?nuxt_component=async&nuxt_component_name=TabPanels&nuxt_component_export=default
var tabpanels_default = defineAsyncComponent(() => import('../build/tabpanels-BserxTy5.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/tabpanel/index.mjs?nuxt_component=async&nuxt_component_name=TabPanel&nuxt_component_export=default
var tabpanel_default = defineAsyncComponent(() => import('../build/tabpanel-Bnu_MXyV.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/toolbar/index.mjs?nuxt_component=async&nuxt_component_name=Toolbar&nuxt_component_export=default
var toolbar_default = defineAsyncComponent(() => import('../build/toolbar-DdvBbGdu.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/confirmdialog/index.mjs?nuxt_component=async&nuxt_component_name=ConfirmDialog&nuxt_component_export=default
var confirmdialog_default = defineAsyncComponent(() => import('../build/confirmdialog-C5hU0c9F.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/confirmpopup/index.mjs?nuxt_component=async&nuxt_component_name=ConfirmPopup&nuxt_component_export=default
var confirmpopup_default = defineAsyncComponent(() => import('../build/confirmpopup-Ck0xz-AL.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/dialog/index.mjs?nuxt_component=async&nuxt_component_name=Dialog&nuxt_component_export=default
var dialog_default = defineAsyncComponent(() => import('../build/dialog-Ds8Tu1Sm.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/drawer/index.mjs?nuxt_component=async&nuxt_component_name=Drawer&nuxt_component_export=default
var drawer_default = defineAsyncComponent(() => import('../build/drawer-BCodAukE.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/dynamicdialog/index.mjs?nuxt_component=async&nuxt_component_name=DynamicDialog&nuxt_component_export=default
var dynamicdialog_default = defineAsyncComponent(() => import('../build/dynamicdialog-BLj3DTHc.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/overlaypanel/index.mjs?nuxt_component=async&nuxt_component_name=OverlayPanel&nuxt_component_export=default
var overlaypanel_default = defineAsyncComponent(() => import('../build/overlaypanel-CnQjFcus.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/popover/index.mjs?nuxt_component=async&nuxt_component_name=Popover&nuxt_component_export=default
var popover_default = defineAsyncComponent(() => import('../build/popover-DIclxOwD.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/sidebar/index.mjs?nuxt_component=async&nuxt_component_name=Sidebar&nuxt_component_export=default
var sidebar_default = defineAsyncComponent(() => import('../build/sidebar-COo9JS2h.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/fileupload/index.mjs?nuxt_component=async&nuxt_component_name=FileUpload&nuxt_component_export=default
var fileupload_default = defineAsyncComponent(() => import('../build/fileupload-B1-SnA0F.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/breadcrumb/index.mjs?nuxt_component=async&nuxt_component_name=Breadcrumb&nuxt_component_export=default
var breadcrumb_default = defineAsyncComponent(() => import('../build/breadcrumb-00WSwJ8M.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/contextmenu/index.mjs?nuxt_component=async&nuxt_component_name=ContextMenu&nuxt_component_export=default
var contextmenu_default = defineAsyncComponent(() => import('../build/contextmenu-DHvwJBJG.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/dock/index.mjs?nuxt_component=async&nuxt_component_name=Dock&nuxt_component_export=default
var dock_default = defineAsyncComponent(() => import('../build/dock-DfuoxIrp.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/menu/index.mjs?nuxt_component=async&nuxt_component_name=Menu&nuxt_component_export=default
var menu_default = defineAsyncComponent(() => import('../build/menu-rSo5f0rL.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/menubar/index.mjs?nuxt_component=async&nuxt_component_name=Menubar&nuxt_component_export=default
var menubar_default = defineAsyncComponent(() => import('../build/menubar-CTYnIKdM.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/megamenu/index.mjs?nuxt_component=async&nuxt_component_name=MegaMenu&nuxt_component_export=default
var megamenu_default = defineAsyncComponent(() => import('../build/megamenu-C3vGKLnY.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/panelmenu/index.mjs?nuxt_component=async&nuxt_component_name=PanelMenu&nuxt_component_export=default
var panelmenu_default = defineAsyncComponent(() => import('../build/panelmenu-KDqne3Zz.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/steps/index.mjs?nuxt_component=async&nuxt_component_name=Steps&nuxt_component_export=default
var steps_default = defineAsyncComponent(() => import('../build/steps-D7rQmAVS.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/tabmenu/index.mjs?nuxt_component=async&nuxt_component_name=TabMenu&nuxt_component_export=default
var tabmenu_default = defineAsyncComponent(() => import('../build/tabmenu-BnkAW_nV.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/tieredmenu/index.mjs?nuxt_component=async&nuxt_component_name=TieredMenu&nuxt_component_export=default
var tieredmenu_default = defineAsyncComponent(() => import('../build/tieredmenu-bIaeJItz.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/message/index.mjs?nuxt_component=async&nuxt_component_name=Message&nuxt_component_export=default
var message_default = defineAsyncComponent(() => import('../build/message-SRqpd48V.mjs').then((n) => n.t).then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/inlinemessage/index.mjs?nuxt_component=async&nuxt_component_name=InlineMessage&nuxt_component_export=default
var inlinemessage_default = defineAsyncComponent(() => import('../build/inlinemessage-D5hHhVxl.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/toast/index.mjs?nuxt_component=async&nuxt_component_name=Toast&nuxt_component_export=default
var toast_default = defineAsyncComponent(() => import('../build/toast-BUmAWK-j.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/carousel/index.mjs?nuxt_component=async&nuxt_component_name=Carousel&nuxt_component_export=default
var carousel_default = defineAsyncComponent(() => import('../build/carousel-VjL4CHUh.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/galleria/index.mjs?nuxt_component=async&nuxt_component_name=Galleria&nuxt_component_export=default
var galleria_default = defineAsyncComponent(() => import('../build/galleria-BmPlarKD.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/image/index.mjs?nuxt_component=async&nuxt_component_name=Image&nuxt_component_export=default
var image_default = defineAsyncComponent(() => import('../build/image-DynxoGpr.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/imagecompare/index.mjs?nuxt_component=async&nuxt_component_name=ImageCompare&nuxt_component_export=default
var imagecompare_default = defineAsyncComponent(() => import('../build/imagecompare-DXCawDp7.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/avatar/index.mjs?nuxt_component=async&nuxt_component_name=Avatar&nuxt_component_export=default
var avatar_default = defineAsyncComponent(() => import('../build/avatar-L1z0VGD0.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/avatargroup/index.mjs?nuxt_component=async&nuxt_component_name=AvatarGroup&nuxt_component_export=default
var avatargroup_default = defineAsyncComponent(() => import('../build/avatargroup-4Cpgvqqp.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/badge/index.mjs?nuxt_component=async&nuxt_component_name=Badge&nuxt_component_export=default
var badge_default = defineAsyncComponent(() => import('../build/badge-BYCk9fNB.mjs').then((n) => n.t).then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/blockui/index.mjs?nuxt_component=async&nuxt_component_name=BlockUI&nuxt_component_export=default
var blockui_default = defineAsyncComponent(() => import('../build/blockui-D9WxMQFt.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/chip/index.mjs?nuxt_component=async&nuxt_component_name=Chip&nuxt_component_export=default
var chip_default = defineAsyncComponent(() => import('../build/chip-Ci7AKzh9.mjs').then((n) => n.t).then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/inplace/index.mjs?nuxt_component=async&nuxt_component_name=Inplace&nuxt_component_export=default
var inplace_default = defineAsyncComponent(() => import('../build/inplace-C_mYb6Oi.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/metergroup/index.mjs?nuxt_component=async&nuxt_component_name=MeterGroup&nuxt_component_export=default
var metergroup_default = defineAsyncComponent(() => import('../build/metergroup-A1L6VOOB.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/overlaybadge/index.mjs?nuxt_component=async&nuxt_component_name=OverlayBadge&nuxt_component_export=default
var overlaybadge_default = defineAsyncComponent(() => import('../build/overlaybadge-DIhKMotf.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/scrolltop/index.mjs?nuxt_component=async&nuxt_component_name=ScrollTop&nuxt_component_export=default
var scrolltop_default = defineAsyncComponent(() => import('../build/scrolltop-BfhRXscc.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/skeleton/index.mjs?nuxt_component=async&nuxt_component_name=Skeleton&nuxt_component_export=default
var skeleton_default = defineAsyncComponent(() => import('../build/skeleton-BORfr5hV.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/progressbar/index.mjs?nuxt_component=async&nuxt_component_name=ProgressBar&nuxt_component_export=default
var progressbar_default = defineAsyncComponent(() => import('../build/progressbar-BSRBF2-6.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/progressspinner/index.mjs?nuxt_component=async&nuxt_component_name=ProgressSpinner&nuxt_component_export=default
var progressspinner_default = defineAsyncComponent(() => import('../build/progressspinner-B-z1U_wW.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/tag/index.mjs?nuxt_component=async&nuxt_component_name=Tag&nuxt_component_export=default
var tag_default = defineAsyncComponent(() => import('../build/tag-CMBdw0uh.mjs').then((n) => n.n).then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/terminal/index.mjs?nuxt_component=async&nuxt_component_name=Terminal&nuxt_component_export=default
var terminal_default = defineAsyncComponent(() => import('../build/terminal-VgEeFZUS.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@primevue+forms@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/@primevue/forms/form/index.mjs?nuxt_component=async&nuxt_component_name=Form&nuxt_component_export=default
var form_default = defineAsyncComponent(() => import('../build/form-CKvUTBs4.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region node_modules/.pnpm/@primevue+forms@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/@primevue/forms/formfield/index.mjs?nuxt_component=async&nuxt_component_name=FormField&nuxt_component_export=default
var formfield_default = defineAsyncComponent(() => import('../build/formfield-DJFI7cd_.mjs').then((r) => r["default"] || r.default || r));
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fcomponents.plugin.mjs
var lazyGlobalComponents = [
	["AutoComplete", autocomplete_default],
	["Calendar", calendar_default],
	["CascadeSelect", cascadeselect_default],
	["Checkbox", checkbox_default],
	["CheckboxGroup", checkboxgroup_default],
	["Chips", chips_default],
	["ColorPicker", colorpicker_default],
	["DatePicker", datepicker_default],
	["Dropdown", dropdown_default],
	["FloatLabel", floatlabel_default],
	["Fluid", fluid_default],
	["IconField", iconfield_default],
	["IftaLabel", iftalabel_default],
	["InputChips", inputchips_default],
	["InputGroup", inputgroup_default],
	["InputGroupAddon", inputgroupaddon_default],
	["InputIcon", inputicon_default],
	["InputMask", inputmask_default],
	["InputNumber", inputnumber_default],
	["InputOtp", inputotp_default],
	["InputSwitch", inputswitch_default],
	["InputText", inputtext_default],
	["Knob", knob_default],
	["Listbox", listbox_default],
	["MultiSelect", multiselect_default],
	["Password", password_default],
	["RadioButton", radiobutton_default],
	["RadioButtonGroup", radiobuttongroup_default],
	["Rating", rating_default],
	["Select", select_default],
	["SelectButton", selectbutton_default],
	["Slider", slider_default],
	["Textarea", textarea_default],
	["ToggleButton", togglebutton_default],
	["ToggleSwitch", toggleswitch_default],
	["TreeSelect", treeselect_default],
	["Button", button_default],
	["ButtonGroup", buttongroup_default],
	["SpeedDial", speeddial_default],
	["SplitButton", splitbutton_default],
	["Column", column_default],
	["Row", row_default],
	["ColumnGroup", columngroup_default],
	["DataTable", datatable_default],
	["DataView", dataview_default],
	["OrderList", orderlist_default],
	["OrganizationChart", organizationchart_default],
	["Paginator", paginator_default],
	["PickList", picklist_default],
	["Tree", tree_default],
	["TreeTable", treetable_default],
	["Timeline", timeline_default],
	["VirtualScroller", virtualscroller_default],
	["Accordion", accordion_default],
	["AccordionPanel", accordionpanel_default],
	["AccordionHeader", accordionheader_default],
	["AccordionContent", accordioncontent_default],
	["AccordionTab", accordiontab_default],
	["Card", card_default],
	["DeferredContent", deferredcontent_default],
	["Divider", divider_default],
	["Fieldset", fieldset_default],
	["Panel", panel_default],
	["ScrollPanel", scrollpanel_default],
	["Splitter", splitter_default],
	["SplitterPanel", splitterpanel_default],
	["Stepper", stepper_default],
	["StepList", steplist_default],
	["Step", step_default],
	["StepItem", stepitem_default],
	["StepPanels", steppanels_default],
	["StepPanel", steppanel_default],
	["TabView", tabview_default],
	["Tabs", tabs_default],
	["TabList", tablist_default],
	["Tab", tab_default],
	["TabPanels", tabpanels_default],
	["TabPanel", tabpanel_default],
	["Toolbar", toolbar_default],
	["ConfirmDialog", confirmdialog_default],
	["ConfirmPopup", confirmpopup_default],
	["Dialog", dialog_default],
	["Drawer", drawer_default],
	["DynamicDialog", dynamicdialog_default],
	["OverlayPanel", overlaypanel_default],
	["Popover", popover_default],
	["Sidebar", sidebar_default],
	["FileUpload", fileupload_default],
	["Breadcrumb", breadcrumb_default],
	["ContextMenu", contextmenu_default],
	["Dock", dock_default],
	["Menu", menu_default],
	["Menubar", menubar_default],
	["MegaMenu", megamenu_default],
	["PanelMenu", panelmenu_default],
	["Steps", steps_default],
	["TabMenu", tabmenu_default],
	["TieredMenu", tieredmenu_default],
	["Message", message_default],
	["InlineMessage", inlinemessage_default],
	["Toast", toast_default],
	["Carousel", carousel_default],
	["Galleria", galleria_default],
	["Image", image_default],
	["ImageCompare", imagecompare_default],
	["Avatar", avatar_default],
	["AvatarGroup", avatargroup_default],
	["Badge", badge_default],
	["BlockUI", blockui_default],
	["Chip", chip_default],
	["Inplace", inplace_default],
	["MeterGroup", metergroup_default],
	["OverlayBadge", overlaybadge_default],
	["ScrollTop", scrolltop_default],
	["Skeleton", skeleton_default],
	["ProgressBar", progressbar_default],
	["ProgressSpinner", progressspinner_default],
	["Tag", tag_default],
	["Terminal", terminal_default],
	["Form", form_default],
	["FormField", formfield_default]
];
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:global-components",
	setup(nuxtApp) {
		for (const [name, component] of lazyGlobalComponents) {
			nuxtApp.vueApp.component(name, component);
			nuxtApp.vueApp.component("Lazy" + name, component);
		}
	}
});
//#endregion
//#region node_modules/.pnpm/@primeuix+utils@0.6.4/node_modules/@primeuix/utils/dist/object/index.mjs
var ie$1 = Object.defineProperty;
var K$1 = Object.getOwnPropertySymbols;
var se = Object.prototype.hasOwnProperty;
var ae$1 = Object.prototype.propertyIsEnumerable;
var N$1 = (e, t, n) => t in e ? ie$1(e, t, {
	enumerable: true,
	configurable: true,
	writable: true,
	value: n
}) : e[t] = n;
var d = (e, t) => {
	for (var n in t || (t = {})) se.call(t, n) && N$1(e, n, t[n]);
	if (K$1) for (var n of K$1(t)) ae$1.call(t, n) && N$1(e, n, t[n]);
	return e;
};
function l(e) {
	return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function x$1(e, t, n, o = 1) {
	let r = -1, u = l(e), f = l(t);
	return u && f ? r = 0 : u ? r = o : f ? r = -o : typeof e == "string" && typeof t == "string" ? r = n(e, t) : r = e < t ? -1 : e > t ? 1 : 0, r;
}
function b$2(e, t, n = /* @__PURE__ */ new WeakSet()) {
	if (e === t) return true;
	if (!e || !t || typeof e != "object" || typeof t != "object" || n.has(e) || n.has(t)) return false;
	n.add(e).add(t);
	let o = Array.isArray(e), r = Array.isArray(t), u, f, T;
	if (o && r) {
		if (f = e.length, f != t.length) return false;
		for (u = f; u-- !== 0;) if (!b$2(e[u], t[u], n)) return false;
		return true;
	}
	if (o != r) return false;
	let S = e instanceof Date, A = t instanceof Date;
	if (S != A) return false;
	if (S && A) return e.getTime() == t.getTime();
	let I = e instanceof RegExp, L = t instanceof RegExp;
	if (I != L) return false;
	if (I && L) return e.toString() == t.toString();
	let R = Object.keys(e);
	if (f = R.length, f !== Object.keys(t).length) return false;
	for (u = f; u-- !== 0;) if (!Object.prototype.hasOwnProperty.call(t, R[u])) return false;
	for (u = f; u-- !== 0;) if (T = R[u], !b$2(e[T], t[T], n)) return false;
	return true;
}
function y$1(e, t) {
	return b$2(e, t);
}
function c$1(e) {
	return typeof e == "function" && "call" in e && "apply" in e;
}
function s$1(e) {
	return !l(e);
}
function p(e, t) {
	if (!e || !t) return null;
	try {
		let n = e[t];
		if (s$1(n)) return n;
	} catch (n) {}
	if (Object.keys(e).length) {
		if (c$1(t)) return t(e);
		if (t.indexOf(".") === -1) return e[t];
		{
			let n = t.split("."), o = e;
			for (let r = 0, u = n.length; r < u; ++r) {
				if (o == null) return null;
				o = o[n[r]];
			}
			return o;
		}
	}
	return null;
}
function k$2(e, t, n) {
	return n ? p(e, n) === p(t, n) : y$1(e, t);
}
function q(e, t) {
	if (e != null && t && t.length) {
		for (let n of t) if (k$2(e, n)) return true;
	}
	return false;
}
function i(e, t = true) {
	return e instanceof Object && e.constructor === Object && (t || Object.keys(e).length !== 0);
}
function $$2(e = {}, t = {}) {
	let n = d({}, e);
	return Object.keys(t).forEach((o) => {
		let r = o;
		i(t[r]) && r in e && i(e[r]) ? n[r] = $$2(e[r], t[r]) : n[r] = t[r];
	}), n;
}
function w$1(...e) {
	return e.reduce((t, n, o) => o === 0 ? n : $$2(t, n), {});
}
function h$3(e, t) {
	let n = -1;
	if (t) {
		for (let o = 0; o < t.length; o++) if (t[o] === e) {
			n = o;
			break;
		}
	}
	return n;
}
function V$1(e, t) {
	let n;
	if (s$1(e)) try {
		n = e.findLast(t);
	} catch (o) {
		n = [...e].reverse().find(t);
	}
	return n;
}
function M$1(e, t) {
	let n = -1;
	if (s$1(e)) try {
		n = e.findLastIndex(t);
	} catch (o) {
		n = e.lastIndexOf([...e].reverse().find(t));
	}
	return n;
}
function m(e, ...t) {
	return c$1(e) ? e(...t) : e;
}
function a(e, t = true) {
	return typeof e == "string" && (t || e !== "");
}
function g(e) {
	return a(e) ? e.replace(/(-|_)/g, "").toLowerCase() : e;
}
function F$2(e, t = "", n = {}) {
	let o = g(t).split("."), r = o.shift();
	if (r) {
		if (i(e)) return F$2(m(e[Object.keys(e).find((f) => g(f) === r) || ""], n), o.join("."), n);
		return;
	}
	return m(e, n);
}
function C$2(e, t = true) {
	return Array.isArray(e) && (t || e.length !== 0);
}
function O$1(e) {
	return e instanceof Date;
}
function z$1(e) {
	return s$1(e) && !isNaN(e);
}
function J$1(e = "") {
	return s$1(e) && e.length === 1 && !!e.match(/\S| /);
}
function W$1() {
	return new Intl.Collator(void 0, { numeric: true }).compare;
}
function G$1(e, t) {
	if (t) {
		let n = t.test(e);
		return t.lastIndex = 0, n;
	}
	return false;
}
function H(...e) {
	return w$1(...e);
}
function Y$2(e) {
	return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":").trim();
}
function Q$2(e, ...t) {
	if (!i(e)) return e;
	let n = d({}, e);
	return t?.flat().forEach((o) => delete n[o]), n;
}
function X(e) {
	if (e && /[\xC0-\xFF\u0100-\u017E]/.test(e)) {
		let n = {
			A: /[\xC0-\xC5\u0100\u0102\u0104]/g,
			AE: /[\xC6]/g,
			C: /[\xC7\u0106\u0108\u010A\u010C]/g,
			D: /[\xD0\u010E\u0110]/g,
			E: /[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g,
			G: /[\u011C\u011E\u0120\u0122]/g,
			H: /[\u0124\u0126]/g,
			I: /[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g,
			IJ: /[\u0132]/g,
			J: /[\u0134]/g,
			K: /[\u0136]/g,
			L: /[\u0139\u013B\u013D\u013F\u0141]/g,
			N: /[\xD1\u0143\u0145\u0147\u014A]/g,
			O: /[\xD2-\xD6\xD8\u014C\u014E\u0150]/g,
			OE: /[\u0152]/g,
			R: /[\u0154\u0156\u0158]/g,
			S: /[\u015A\u015C\u015E\u0160]/g,
			T: /[\u0162\u0164\u0166]/g,
			U: /[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g,
			W: /[\u0174]/g,
			Y: /[\xDD\u0176\u0178]/g,
			Z: /[\u0179\u017B\u017D]/g,
			a: /[\xE0-\xE5\u0101\u0103\u0105]/g,
			ae: /[\xE6]/g,
			c: /[\xE7\u0107\u0109\u010B\u010D]/g,
			d: /[\u010F\u0111]/g,
			e: /[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g,
			g: /[\u011D\u011F\u0121\u0123]/g,
			i: /[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g,
			ij: /[\u0133]/g,
			j: /[\u0135]/g,
			k: /[\u0137,\u0138]/g,
			l: /[\u013A\u013C\u013E\u0140\u0142]/g,
			n: /[\xF1\u0144\u0146\u0148\u014B]/g,
			p: /[\xFE]/g,
			o: /[\xF2-\xF6\xF8\u014D\u014F\u0151]/g,
			oe: /[\u0153]/g,
			r: /[\u0155\u0157\u0159]/g,
			s: /[\u015B\u015D\u015F\u0161]/g,
			t: /[\u0163\u0165\u0167]/g,
			u: /[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g,
			w: /[\u0175]/g,
			y: /[\xFD\xFF\u0177]/g,
			z: /[\u017A\u017C\u017E]/g
		};
		for (let o in n) e = e.replace(n[o], o);
	}
	return e;
}
function B$1(e, t, n) {
	e && t !== n && (n >= e.length && (n %= e.length, t %= e.length), e.splice(n, 0, e.splice(t, 1)[0]));
}
function ee(e, t, n = 1, o, r = 1) {
	let u = x$1(e, t, o, n), f = n;
	return (l(e) || l(t)) && (f = r === 1 ? n : r), f * u;
}
function ne$1(e) {
	return a(e, false) ? e[0].toUpperCase() + e.slice(1) : e;
}
function re(e) {
	return a(e) ? e.replace(/(_)/g, "-").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() : e;
}
//#endregion
//#region node_modules/.pnpm/@primeuix+utils@0.6.4/node_modules/@primeuix/utils/dist/eventbus/index.mjs
function s() {
	let r = /* @__PURE__ */ new Map();
	return {
		on(e, t) {
			let n = r.get(e);
			return n ? n.push(t) : n = [t], r.set(e, n), this;
		},
		off(e, t) {
			let n = r.get(e);
			return n && n.splice(n.indexOf(t) >>> 0, 1), this;
		},
		emit(e, t) {
			let n = r.get(e);
			n && n.forEach((i) => {
				i(t);
			});
		},
		clear() {
			r.clear();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@primeuix+utils@0.6.4/node_modules/@primeuix/utils/dist/dom/index.mjs
function R(t, e) {
	return t ? t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className) : false;
}
function W(t, e) {
	if (t && e) {
		let o = (n) => {
			R(t, n) || (t.classList ? t.classList.add(n) : t.className += " " + n);
		};
		[e].flat().filter(Boolean).forEach((n) => n.split(" ").forEach(o));
	}
}
function F$1() {
	return (void 0).innerWidth - (void 0).documentElement.offsetWidth;
}
function st$1(t) {
	typeof t == "string" ? W((void 0).body, t || "p-overflow-hidden") : (t != null && t.variableName && (void 0).body.style.setProperty(t.variableName, F$1() + "px"), W((void 0).body, (t == null ? void 0 : t.className) || "p-overflow-hidden"));
}
function B(t) {
	if (t) {
		let e = (void 0).createElement("a");
		if (e.download !== void 0) {
			let { name: o, src: n } = t;
			return e.setAttribute("href", n), e.setAttribute("download", o), e.style.display = "none", (void 0).body.appendChild(e), e.click(), (void 0).body.removeChild(e), true;
		}
	}
	return false;
}
function at(t, e) {
	let o = new Blob([t], { type: "application/csv;charset=utf-8;" });
	(void 0).navigator.msSaveOrOpenBlob ? (void 0).msSaveOrOpenBlob(o, e + ".csv") : B({
		name: e + ".csv",
		src: URL.createObjectURL(o)
	}) || (t = "data:text/csv;charset=utf-8," + t, (void 0).open(encodeURI(t)));
}
function P(t, e) {
	if (t && e) {
		let o = (n) => {
			t.classList ? t.classList.remove(n) : t.className = t.className.replace(new RegExp("(^|\\b)" + n.split(" ").join("|") + "(\\b|$)", "gi"), " ");
		};
		[e].flat().filter(Boolean).forEach((n) => n.split(" ").forEach(o));
	}
}
function dt$1(t) {
	typeof t == "string" ? P((void 0).body, t || "p-overflow-hidden") : (t != null && t.variableName && (void 0).body.style.removeProperty(t.variableName), P((void 0).body, (t == null ? void 0 : t.className) || "p-overflow-hidden"));
}
function x(t) {
	for (let e of void 0) try {
		for (let o of e == null ? void 0 : e.cssRules) for (let n of o == null ? void 0 : o.style) if (t.test(n)) return {
			name: n,
			value: o.style.getPropertyValue(n).trim()
		};
	} catch (o) {}
	return null;
}
function w(t) {
	let e = {
		width: 0,
		height: 0
	};
	if (t) {
		let [o, n] = [t.style.visibility, t.style.display], r = t.getBoundingClientRect();
		t.style.visibility = "hidden", t.style.display = "block", e.width = r.width || t.offsetWidth, e.height = r.height || t.offsetHeight, t.style.display = n, t.style.visibility = o;
	}
	return e;
}
function h$2() {
	let t = void 0, e = void 0, o = e.documentElement, n = e.getElementsByTagName("body")[0];
	return {
		width: t.innerWidth || o.clientWidth || n.clientWidth,
		height: t.innerHeight || o.clientHeight || n.clientHeight
	};
}
function E$1(t) {
	return t ? Math.abs(t.scrollLeft) : 0;
}
function k$1() {
	let t = (void 0).documentElement;
	return ((void 0).pageXOffset || E$1(t)) - (t.clientLeft || 0);
}
function $$1() {
	let t = (void 0).documentElement;
	return ((void 0).pageYOffset || t.scrollTop) - (t.clientTop || 0);
}
function V(t) {
	return t ? getComputedStyle(t).direction === "rtl" : false;
}
function D(t, e, o = true) {
	var n, r, i, l;
	if (t) {
		let d = t.offsetParent ? {
			width: t.offsetWidth,
			height: t.offsetHeight
		} : w(t), s = d.height, a = d.width, u = e.offsetHeight, p = e.offsetWidth, f = e.getBoundingClientRect(), g = $$1(), it = k$1(), lt = h$2(), L, N, ot = "top";
		f.top + u + s > lt.height ? (L = f.top + g - s, ot = "bottom", L < 0 && (L = g)) : L = u + f.top + g, f.left + a > lt.width ? N = Math.max(0, f.left + it + p - a) : N = f.left + it, V(t) ? t.style.insetInlineEnd = N + "px" : t.style.insetInlineStart = N + "px", t.style.top = L + "px", t.style.transformOrigin = ot, o && (t.style.marginTop = ot === "bottom" ? `calc(${(r = (n = x(/-anchor-gutter$/)) == null ? void 0 : n.value) != null ? r : "2px"} * -1)` : (l = (i = x(/-anchor-gutter$/)) == null ? void 0 : i.value) != null ? l : "");
	}
}
function S$1(t, e) {
	t && (typeof e == "string" ? t.style.cssText = e : Object.entries(e || {}).forEach(([o, n]) => t.style[o] = n));
}
function v$1(t, e) {
	if (t instanceof HTMLElement) {
		let o = t.offsetWidth;
		if (e) {
			let n = getComputedStyle(t);
			o += parseFloat(n.marginLeft) + parseFloat(n.marginRight);
		}
		return o;
	}
	return 0;
}
function I(t, e, o = true, n = void 0) {
	var r;
	if (t) {
		let i = t.offsetParent ? {
			width: t.offsetWidth,
			height: t.offsetHeight
		} : w(t), l = e.offsetHeight, d = e.getBoundingClientRect(), s = h$2(), a, u, p = n != null ? n : "top";
		if (!n && d.top + l + i.height > s.height ? (a = -1 * i.height, p = "bottom", d.top + a < 0 && (a = -1 * d.top)) : a = l, i.width > s.width ? u = d.left * -1 : d.left + i.width > s.width ? u = (d.left + i.width - s.width) * -1 : u = 0, t.style.top = a + "px", t.style.insetInlineStart = u + "px", t.style.transformOrigin = p, o) {
			let f = (r = x(/-anchor-gutter$/)) == null ? void 0 : r.value;
			t.style.marginTop = p === "bottom" ? `calc(${f != null ? f : "2px"} * -1)` : f != null ? f : "";
		}
	}
}
function y(t) {
	if (t) {
		let e = t.parentNode;
		return e && e instanceof ShadowRoot && e.host && (e = e.host), e;
	}
	return null;
}
function T(t) {
	return !!(t !== null && typeof t != "undefined" && t.nodeName && y(t));
}
function c(t) {
	return typeof Element != "undefined" ? t instanceof Element : t !== null && typeof t == "object" && t.nodeType === 1 && typeof t.nodeName == "string";
}
var rt$1;
function O(t) {
	{
		if (rt$1 != null) return rt$1;
		let e = (void 0).createElement("div");
		S$1(e, {
			width: "100px",
			height: "100px",
			overflow: "scroll",
			position: "absolute",
			top: "-9999px"
		}), (void 0).body.appendChild(e);
		let o = e.offsetWidth - e.clientWidth;
		return (void 0).body.removeChild(e), rt$1 = o, o;
	}
}
function pt() {
	if ((void 0).getSelection) {
		let t = (void 0).getSelection() || {};
		t.empty ? t.empty() : t.removeAllRanges && t.rangeCount > 0 && t.getRangeAt(0).getClientRects().length > 0 && t.removeAllRanges();
	}
}
function A(t, e = {}) {
	if (c(t)) {
		let o = (n, r) => {
			var l, d;
			let i = (l = t == null ? void 0 : t.$attrs) != null && l[n] ? [(d = t == null ? void 0 : t.$attrs) == null ? void 0 : d[n]] : [];
			return [r].flat().reduce((s, a) => {
				if (a != null) {
					let u = typeof a;
					if (u === "string" || u === "number") s.push(a);
					else if (u === "object") {
						let p = Array.isArray(a) ? o(n, a) : Object.entries(a).map(([f, g]) => n === "style" && (g || g === 0) ? `${f.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${g}` : g ? f : void 0);
						s = p.length ? s.concat(p.filter((f) => !!f)) : s;
					}
				}
				return s;
			}, i);
		};
		Object.entries(e).forEach(([n, r]) => {
			if (r != null) {
				let i = n.match(/^on(.+)/);
				i ? t.addEventListener(i[1].toLowerCase(), r) : n === "p-bind" || n === "pBind" ? A(t, r) : (r = n === "class" ? [...new Set(o("class", r))].join(" ").trim() : n === "style" ? o("style", r).join(";").trim() : r, (t.$attrs = t.$attrs || {}) && (t.$attrs[n] = r), t.setAttribute(n, r));
			}
		});
	}
}
function U(t, e = {}, ...o) {
	if (t) {
		let n = (void 0).createElement(t);
		return A(n, e), n.append(...o), n;
	}
}
function ht$1(t, e) {
	if (t) {
		t.style.opacity = "0";
		let o = +/* @__PURE__ */ new Date(), n = "0", r = function() {
			n = `${+t.style.opacity + ((/* @__PURE__ */ new Date()).getTime() - o) / e}`, t.style.opacity = n, o = +/* @__PURE__ */ new Date(), +n < 1 && ("requestAnimationFrame" in void 0 ? requestAnimationFrame(r) : setTimeout(r, 16));
		};
		r();
	}
}
function Y$1(t, e) {
	return c(t) ? Array.from(t.querySelectorAll(e)) : [];
}
function z(t, e) {
	return c(t) ? t.matches(e) ? t : t.querySelector(e) : null;
}
function bt(t, e) {
	t && (void 0).activeElement !== t && t.focus(e);
}
function Q$1(t, e) {
	if (c(t)) {
		let o = t.getAttribute(e);
		return isNaN(o) ? o === "true" || o === "false" ? o === "true" : o : +o;
	}
}
function b$1(t, e = "") {
	let o = Y$1(t, `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [href]:not([tabindex = "-1"]):not([style*="display:none"]):not([hidden])${e},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`), n = [];
	for (let r of o) getComputedStyle(r).display != "none" && getComputedStyle(r).visibility != "hidden" && n.push(r);
	return n;
}
function vt(t, e) {
	let o = b$1(t, e);
	return o.length > 0 ? o[0] : null;
}
function Tt(t) {
	if (t) {
		let e = t.offsetHeight, o = getComputedStyle(t);
		return e -= parseFloat(o.paddingTop) + parseFloat(o.paddingBottom) + parseFloat(o.borderTopWidth) + parseFloat(o.borderBottomWidth), e;
	}
	return 0;
}
function G(t) {
	if (t) {
		let [e, o] = [t.style.visibility, t.style.display];
		t.style.visibility = "hidden", t.style.display = "block";
		let n = t.offsetHeight;
		return t.style.display = o, t.style.visibility = e, n;
	}
	return 0;
}
function J(t) {
	if (t) {
		let [e, o] = [t.style.visibility, t.style.display];
		t.style.visibility = "hidden", t.style.display = "block";
		let n = t.offsetWidth;
		return t.style.display = o, t.style.visibility = e, n;
	}
	return 0;
}
function Ht(t) {
	var e;
	if (t) {
		let o = (e = y(t)) == null ? void 0 : e.childNodes, n = 0;
		if (o) for (let r = 0; r < o.length; r++) {
			if (o[r] === t) return n;
			o[r].nodeType === 1 && n++;
		}
	}
	return -1;
}
function Lt(t, e) {
	let o = b$1(t, e);
	return o.length > 0 ? o[o.length - 1] : null;
}
function Wt(t, e) {
	let o = t.nextElementSibling;
	for (; o;) {
		if (o.matches(e)) return o;
		o = o.nextElementSibling;
	}
	return null;
}
function K(t) {
	if (t) {
		let e = t.getBoundingClientRect();
		return {
			top: e.top + ((void 0).pageYOffset || (void 0).documentElement.scrollTop || (void 0).body.scrollTop || 0),
			left: e.left + ((void 0).pageXOffset || E$1((void 0).documentElement) || E$1((void 0).body) || 0)
		};
	}
	return {
		top: "auto",
		left: "auto"
	};
}
function C$1(t, e) {
	if (t) {
		let o = t.offsetHeight;
		if (e) {
			let n = getComputedStyle(t);
			o += parseFloat(n.marginTop) + parseFloat(n.marginBottom);
		}
		return o;
	}
	return 0;
}
function M(t, e = []) {
	let o = y(t);
	return o === null ? e : M(o, e.concat([o]));
}
function Ot(t, e) {
	let o = t.previousElementSibling;
	for (; o;) {
		if (o.matches(e)) return o;
		o = o.previousElementSibling;
	}
	return null;
}
function At(t) {
	let e = [];
	if (t) {
		let o = M(t), n = /(auto|scroll)/, r = (i) => {
			try {
				let l = (void 0).getComputedStyle(i, null);
				return n.test(l.getPropertyValue("overflow")) || n.test(l.getPropertyValue("overflowX")) || n.test(l.getPropertyValue("overflowY"));
			} catch (l) {
				return false;
			}
		};
		for (let i of o) {
			let l = i.nodeType === 1 && i.dataset.scrollselectors;
			if (l) {
				let d = l.split(",");
				for (let s of d) {
					let a = z(i, s);
					a && r(a) && e.push(a);
				}
			}
			i.nodeType !== 9 && r(i) && e.push(i);
		}
	}
	return e;
}
function Mt() {
	if ((void 0).getSelection) return (void 0).getSelection().toString();
	if ((void 0).getSelection) return (void 0).getSelection().toString();
}
function Nt() {
	return (void 0).userAgent;
}
function Rt(t) {
	if (t) {
		let e = t.offsetWidth, o = getComputedStyle(t);
		return e -= parseFloat(o.paddingLeft) + parseFloat(o.paddingRight) + parseFloat(o.borderLeftWidth) + parseFloat(o.borderRightWidth), e;
	}
	return 0;
}
function Ft(t) {
	if (t) {
		let e = getComputedStyle(t);
		return parseFloat(e.getPropertyValue("animation-duration") || "0") > 0;
	}
	return false;
}
function kt(t, e, o) {
	let n = t[e];
	typeof n == "function" && n.apply(t, []);
}
function $t() {
	return /(android)/i.test((void 0).userAgent);
}
function _(t, e, o) {
	return c(t) ? Q$1(t, e) === o : false;
}
function Dt(t) {
	if (t) {
		let e = t.nodeName, o = t.parentElement && t.parentElement.nodeName;
		return e === "INPUT" || e === "TEXTAREA" || e === "BUTTON" || e === "A" || o === "INPUT" || o === "TEXTAREA" || o === "BUTTON" || o === "A" || !!t.closest(".p-button, .p-checkbox, .p-radiobutton");
	}
	return false;
}
function tt() {
	return false;
}
function It(t, e = "") {
	return c(t) ? t.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`) : false;
}
function et(t) {
	return !!(t && t.offsetParent != null);
}
function Yt() {
	return "ontouchstart" in void 0 || (void 0).maxTouchPoints > 0 || (void 0).msMaxTouchPoints > 0;
}
function zt(t, e) {
	var o, n;
	if (t) {
		let r = t.parentElement, i = K(r), l = h$2(), d = t.offsetParent ? t.offsetWidth : J(t), s = t.offsetParent ? t.offsetHeight : G(t), a = v$1((o = r == null ? void 0 : r.children) == null ? void 0 : o[0]), u = C$1((n = r == null ? void 0 : r.children) == null ? void 0 : n[0]), p = "", f = "";
		i.left + a + d > l.width - O() ? i.left < d ? e % 2 === 1 ? p = i.left ? "-" + i.left + "px" : "100%" : e % 2 === 0 && (p = l.width - d - O() + "px") : p = "-100%" : p = "100%", t.getBoundingClientRect().top + u + s > l.height ? f = `-${s - u}px` : f = "0px", t.style.top = f, t.style.insetInlineStart = p;
	}
}
function Kt(t, e) {
	let o = getComputedStyle(t).getPropertyValue("borderTopWidth"), n = o ? parseFloat(o) : 0, r = getComputedStyle(t).getPropertyValue("paddingTop"), i = r ? parseFloat(r) : 0, l = t.getBoundingClientRect(), s = e.getBoundingClientRect().top + (void 0).body.scrollTop - (l.top + (void 0).body.scrollTop) - n - i, a = t.scrollTop, u = t.clientHeight, p = C$1(e);
	s < 0 ? t.scrollTop = a + s : s + p > u && (t.scrollTop = a + s - u + p);
}
function _t(t, e = "", o) {
	c(t) && o !== null && o !== void 0 && t.setAttribute(e, o);
}
function te(t, e, o = null, n) {
	var r;
	e && ((r = t == null ? void 0 : t.style) == null || r.setProperty(e, o, n));
}
//#endregion
//#region node_modules/.pnpm/@primeuix+styled@0.7.4/node_modules/@primeuix/styled/dist/index.mjs
var rt = Object.defineProperty;
var st = Object.defineProperties;
var nt = Object.getOwnPropertyDescriptors;
var F = Object.getOwnPropertySymbols;
var xe = Object.prototype.hasOwnProperty;
var be = Object.prototype.propertyIsEnumerable;
var _e = (e, t, r) => t in e ? rt(e, t, {
	enumerable: true,
	configurable: true,
	writable: true,
	value: r
}) : e[t] = r;
var h$1 = (e, t) => {
	for (var r in t || (t = {})) xe.call(t, r) && _e(e, r, t[r]);
	if (F) for (var r of F(t)) be.call(t, r) && _e(e, r, t[r]);
	return e;
};
var $ = (e, t) => st(e, nt(t));
var v = (e, t) => {
	var r = {};
	for (var s in e) xe.call(e, s) && t.indexOf(s) < 0 && (r[s] = e[s]);
	if (e != null && F) for (var s of F(e)) t.indexOf(s) < 0 && be.call(e, s) && (r[s] = e[s]);
	return r;
};
var N = s();
var k = /{([^}]*)}/g;
var ne = /(\d+\s+[\+\-\*\/]\s+\d+)/g;
var ie = /var\([^)]+\)/g;
function oe(e) {
	return a(e) ? e.replace(/[A-Z]/g, (t, r) => r === 0 ? t : "." + t.toLowerCase()).toLowerCase() : e;
}
function ve(e) {
	return i(e) && e.hasOwnProperty("$value") && e.hasOwnProperty("$type") ? e.$value : e;
}
function dt(e) {
	return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function Q(e = "", t = "") {
	return dt(`${a(e, false) && a(t, false) ? `${e}-` : e}${t}`);
}
function ae(e = "", t = "") {
	return `--${Q(e, t)}`;
}
function ht(e = "") {
	return ((e.match(/{/g) || []).length + (e.match(/}/g) || []).length) % 2 !== 0;
}
function Y(e, t = "", r = "", s = [], i) {
	if (a(e)) {
		let a = e.trim();
		if (ht(a)) return;
		if (G$1(a, k)) {
			let n = a.replaceAll(k, (l) => {
				return `var(${ae(r, re(l.replace(/{|}/g, "").split(".").filter((m) => !s.some((d) => G$1(m, d))).join("-")))}${s$1(i) ? `, ${i}` : ""})`;
			});
			return G$1(n.replace(ie, "0"), ne) ? `calc(${n})` : n;
		}
		return a;
	} else if (z$1(e)) return e;
}
function Re(e, t, r) {
	a(t, false) && e.push(`${t}:${r};`);
}
function C(e, t) {
	return e ? `${e}{${t}}` : "";
}
function le(e, t) {
	if (e.indexOf("dt(") === -1) return e;
	function r(n, l) {
		let o = [], c = 0, m = "", d = null, u = 0;
		for (; c <= n.length;) {
			let g = n[c];
			if ((g === "\"" || g === "'" || g === "`") && n[c - 1] !== "\\" && (d = d === g ? null : g), !d && (g === "(" && u++, g === ")" && u--, (g === "," || c === n.length) && u === 0)) {
				let f = m.trim();
				f.startsWith("dt(") ? o.push(le(f, l)) : o.push(s(f)), m = "", c++;
				continue;
			}
			g !== void 0 && (m += g), c++;
		}
		return o;
	}
	function s(n) {
		let l = n[0];
		if ((l === "\"" || l === "'" || l === "`") && n[n.length - 1] === l) return n.slice(1, -1);
		let o = Number(n);
		return isNaN(o) ? n : o;
	}
	let i = [], a = [];
	for (let n = 0; n < e.length; n++) if (e[n] === "d" && e.slice(n, n + 3) === "dt(") a.push(n), n += 2;
	else if (e[n] === ")" && a.length > 0) {
		let l = a.pop();
		a.length === 0 && i.push([l, n]);
	}
	if (!i.length) return e;
	for (let n = i.length - 1; n >= 0; n--) {
		let [l, o] = i[n], d = t(...r(e.slice(l + 3, o), t));
		e = e.slice(0, l) + d + e.slice(o + 1);
	}
	return e;
}
var rr = (e) => {
	var a;
	let t = S.getTheme(), r = ue(t, e, void 0, "variable");
	return {
		name: (a = r == null ? void 0 : r.match(/--[\w-]+/g)) == null ? void 0 : a[0],
		variable: r,
		value: ue(t, e, void 0, "value")
	};
};
var E = (...e) => ue(S.getTheme(), ...e);
var ue = (e = {}, t, r, s) => {
	if (t) {
		let { variable: i, options: a } = S.defaults || {}, { prefix: n, transform: l$2 } = (e == null ? void 0 : e.options) || a || {}, o = G$1(t, k) ? t : `{${t}}`;
		return s === "value" || l(s) && l$2 === "strict" ? S.getTokenValue(t) : Y(o, void 0, n, [i.excludedKeyRegex], r);
	}
	return "";
};
function ar(e, ...t) {
	if (e instanceof Array) return le(e.reduce((s, i, a) => {
		var n;
		return s + i + ((n = m(t[a], { dt: E })) != null ? n : "");
	}, ""), E);
	return m(e, { dt: E });
}
function de(e, t = {}) {
	let r = S.defaults.variable, { prefix: s = r.prefix, selector: i$4 = r.selector, excludedKeyRegex: a = r.excludedKeyRegex } = t, n = [], l = [], o = [{
		node: e,
		path: s
	}];
	for (; o.length;) {
		let { node: m, path: d } = o.pop();
		for (let u in m) {
			let g = m[u], f = ve(g), p = G$1(u, a) ? Q(d) : Q(d, re(u));
			if (i(f)) o.push({
				node: f,
				path: p
			});
			else {
				Re(l, ae(p), Y(f, p, s, [a]));
				let T = p;
				s && T.startsWith(s + "-") && (T = T.slice(s.length + 1)), n.push(T.replace(/-/g, "."));
			}
		}
	}
	let c = l.join("");
	return {
		value: l,
		tokens: n,
		declarations: c,
		css: C(i$4, c)
	};
}
var b = {
	regex: {
		rules: {
			class: {
				pattern: /^\.([a-zA-Z][\w-]*)$/,
				resolve(e) {
					return {
						type: "class",
						selector: e,
						matched: this.pattern.test(e.trim())
					};
				}
			},
			attr: {
				pattern: /^\[(.*)\]$/,
				resolve(e) {
					return {
						type: "attr",
						selector: `:root${e},:host${e}`,
						matched: this.pattern.test(e.trim())
					};
				}
			},
			media: {
				pattern: /^@media (.*)$/,
				resolve(e) {
					return {
						type: "media",
						selector: e,
						matched: this.pattern.test(e.trim())
					};
				}
			},
			system: {
				pattern: /^system$/,
				resolve(e) {
					return {
						type: "system",
						selector: "@media (prefers-color-scheme: dark)",
						matched: this.pattern.test(e.trim())
					};
				}
			},
			custom: { resolve(e) {
				return {
					type: "custom",
					selector: e,
					matched: true
				};
			} }
		},
		resolve(e) {
			let t = Object.keys(this.rules).filter((r) => r !== "custom").map((r) => this.rules[r]);
			return [e].flat().map((r) => {
				var s;
				return (s = t.map((i) => i.resolve(r)).find((i) => i.matched)) != null ? s : this.rules.custom.resolve(r);
			});
		}
	},
	_toVariables(e, t) {
		return de(e, { prefix: t == null ? void 0 : t.prefix });
	},
	getCommon({ name: e = "", theme: t = {}, params: r, set: s, defaults: i }) {
		var R, T, j, O, M, z, V;
		let { preset: a, options: n } = t, l, o, c, m$1, d, u, g;
		if (s$1(a) && n.transform !== "strict") {
			let { primitive: L, semantic: te, extend: re } = a, f = te || {}, { colorScheme: K } = f, A = v(f, ["colorScheme"]), x = re || {}, { colorScheme: X } = x, G = v(x, ["colorScheme"]), p = K || {}, { dark: U } = p, B = v(p, ["dark"]), y = X || {}, { dark: I } = y, H = v(y, ["dark"]), W = s$1(L) ? this._toVariables({ primitive: L }, n) : {}, q = s$1(A) ? this._toVariables({ semantic: A }, n) : {}, Z = s$1(B) ? this._toVariables({ light: B }, n) : {}, pe = s$1(U) ? this._toVariables({ dark: U }, n) : {}, fe = s$1(G) ? this._toVariables({ semantic: G }, n) : {}, ye = s$1(H) ? this._toVariables({ light: H }, n) : {}, Se = s$1(I) ? this._toVariables({ dark: I }, n) : {}, [Me, ze] = [(R = W.declarations) != null ? R : "", W.tokens], [Ke, Xe] = [(T = q.declarations) != null ? T : "", q.tokens || []], [Ge, Ue] = [(j = Z.declarations) != null ? j : "", Z.tokens || []], [Be, Ie] = [(O = pe.declarations) != null ? O : "", pe.tokens || []], [He, We] = [(M = fe.declarations) != null ? M : "", fe.tokens || []], [qe, Ze] = [(z = ye.declarations) != null ? z : "", ye.tokens || []], [Fe, Je] = [(V = Se.declarations) != null ? V : "", Se.tokens || []];
			l = this.transformCSS(e, Me, "light", "variable", n, s, i), o = ze;
			c = `${this.transformCSS(e, `${Ke}${Ge}`, "light", "variable", n, s, i)}${this.transformCSS(e, `${Be}`, "dark", "variable", n, s, i)}`, m$1 = [.../* @__PURE__ */ new Set([
				...Xe,
				...Ue,
				...Ie
			])];
			d = `${this.transformCSS(e, `${He}${qe}color-scheme:light`, "light", "variable", n, s, i)}${this.transformCSS(e, `${Fe}color-scheme:dark`, "dark", "variable", n, s, i)}`, u = [.../* @__PURE__ */ new Set([
				...We,
				...Ze,
				...Je
			])], g = m(a.css, { dt: E });
		}
		return {
			primitive: {
				css: l,
				tokens: o
			},
			semantic: {
				css: c,
				tokens: m$1
			},
			global: {
				css: d,
				tokens: u
			},
			style: g
		};
	},
	getPreset({ name: e = "", preset: t = {}, options: r, params: s, set: i, defaults: a, selector: n }) {
		var f, x, p;
		let l, o, c;
		if (s$1(t) && r.transform !== "strict") {
			let y = e.replace("-directive", ""), m$2 = t, { colorScheme: R, extend: T, css: j } = m$2, O = v(m$2, [
				"colorScheme",
				"extend",
				"css"
			]), d = T || {}, { colorScheme: M } = d, z = v(d, ["colorScheme"]), u = R || {}, { dark: V } = u, L = v(u, ["dark"]), g = M || {}, { dark: te } = g, re = v(g, ["dark"]), K = s$1(O) ? this._toVariables({ [y]: h$1(h$1({}, O), z) }, r) : {}, A = s$1(L) ? this._toVariables({ [y]: h$1(h$1({}, L), re) }, r) : {}, X = s$1(V) ? this._toVariables({ [y]: h$1(h$1({}, V), te) }, r) : {}, [G, U] = [(f = K.declarations) != null ? f : "", K.tokens || []], [B, I] = [(x = A.declarations) != null ? x : "", A.tokens || []], [H, W] = [(p = X.declarations) != null ? p : "", X.tokens || []];
			l = `${this.transformCSS(y, `${G}${B}`, "light", "variable", r, i, a, n)}${this.transformCSS(y, H, "dark", "variable", r, i, a, n)}`, o = [.../* @__PURE__ */ new Set([
				...U,
				...I,
				...W
			])], c = m(j, { dt: E });
		}
		return {
			css: l,
			tokens: o,
			style: c
		};
	},
	getPresetC({ name: e = "", theme: t = {}, params: r, set: s, defaults: i }) {
		var o;
		let { preset: a, options: n } = t, l = (o = a == null ? void 0 : a.components) == null ? void 0 : o[e];
		return this.getPreset({
			name: e,
			preset: l,
			options: n,
			params: r,
			set: s,
			defaults: i
		});
	},
	getPresetD({ name: e = "", theme: t = {}, params: r, set: s, defaults: i }) {
		var c, m;
		let a = e.replace("-directive", ""), { preset: n, options: l } = t, o = ((c = n == null ? void 0 : n.components) == null ? void 0 : c[a]) || ((m = n == null ? void 0 : n.directives) == null ? void 0 : m[a]);
		return this.getPreset({
			name: a,
			preset: o,
			options: l,
			params: r,
			set: s,
			defaults: i
		});
	},
	applyDarkColorScheme(e) {
		return !(e.darkModeSelector === "none" || e.darkModeSelector === false);
	},
	getColorSchemeOption(e, t) {
		var r;
		return this.applyDarkColorScheme(e) ? this.regex.resolve(e.darkModeSelector === true ? t.options.darkModeSelector : (r = e.darkModeSelector) != null ? r : t.options.darkModeSelector) : [];
	},
	getLayerOrder(e, t = {}, r, s) {
		let { cssLayer: i } = t;
		return i ? `@layer ${m(i.order || i.name || "primeui", r)}` : "";
	},
	getCommonStyleSheet({ name: e = "", theme: t = {}, params: r, props: s = {}, set: i$1, defaults: a }) {
		let n = this.getCommon({
			name: e,
			theme: t,
			params: r,
			set: i$1,
			defaults: a
		}), l = Object.entries(s).reduce((o, [c, m]) => o.push(`${c}="${m}"`) && o, []).join(" ");
		return Object.entries(n || {}).reduce((o, [c, m]) => {
			if (i(m) && Object.hasOwn(m, "css")) {
				let d = Y$2(m.css), u = `${c}-variables`;
				o.push(`<style type="text/css" data-primevue-style-id="${u}" ${l}>${d}</style>`);
			}
			return o;
		}, []).join("");
	},
	getStyleSheet({ name: e = "", theme: t = {}, params: r, props: s = {}, set: i, defaults: a }) {
		var c;
		let n = {
			name: e,
			theme: t,
			params: r,
			set: i,
			defaults: a
		}, l = (c = e.includes("-directive") ? this.getPresetD(n) : this.getPresetC(n)) == null ? void 0 : c.css, o = Object.entries(s).reduce((m, [d, u]) => m.push(`${d}="${u}"`) && m, []).join(" ");
		return l ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${o}>${Y$2(l)}</style>` : "";
	},
	createTokens(e = {}, t, r = "", s = "", i$2 = {}) {
		let a = function(l$1, o = {}, c = []) {
			if (c.includes(this.path)) return console.warn(`Circular reference detected at ${this.path}`), {
				colorScheme: l$1,
				path: this.path,
				paths: o,
				value: void 0
			};
			c.push(this.path), o.name = this.path, o.binding || (o.binding = {});
			let m = this.value;
			if (typeof this.value == "string" && k.test(this.value)) {
				let u = this.value.trim().replace(k, (g) => {
					var y;
					let f = g.slice(1, -1), x = this.tokens[f];
					if (!x) return console.warn(`Token not found for path: ${f}`), "__UNRESOLVED__";
					let p = x.computed(l$1, o, c);
					return Array.isArray(p) && p.length === 2 ? `light-dark(${p[0].value},${p[1].value})` : (y = p == null ? void 0 : p.value) != null ? y : "__UNRESOLVED__";
				});
				m = ne.test(u.replace(ie, "0")) ? `calc(${u})` : u;
			}
			return l(o.binding) && delete o.binding, c.pop(), {
				colorScheme: l$1,
				path: this.path,
				paths: o,
				value: m.includes("__UNRESOLVED__") ? void 0 : m
			};
		}, n = (l, o, c) => {
			Object.entries(l).forEach(([m, d]) => {
				let u = G$1(m, t.variable.excludedKeyRegex) ? o : o ? `${o}.${oe(m)}` : oe(m), g = c ? `${c}.${m}` : m;
				i(d) ? n(d, u, g) : (i$2[u] || (i$2[u] = {
					paths: [],
					computed: (f, x = {}, p = []) => {
						if (i$2[u].paths.length === 1) return i$2[u].paths[0].computed(i$2[u].paths[0].scheme, x.binding, p);
						if (f && f !== "none") for (let y = 0; y < i$2[u].paths.length; y++) {
							let R = i$2[u].paths[y];
							if (R.scheme === f) return R.computed(f, x.binding, p);
						}
						return i$2[u].paths.map((y) => y.computed(y.scheme, x[y.scheme], p));
					}
				}), i$2[u].paths.push({
					path: g,
					value: d,
					scheme: g.includes("colorScheme.light") ? "light" : g.includes("colorScheme.dark") ? "dark" : "none",
					computed: a,
					tokens: i$2
				}));
			});
		};
		return n(e, r, s), i$2;
	},
	getTokenValue(e, t, r) {
		var l;
		let i = ((o) => o.split(".").filter((m) => !G$1(m.toLowerCase(), r.variable.excludedKeyRegex)).join("."))(t), a = t.includes("colorScheme.light") ? "light" : t.includes("colorScheme.dark") ? "dark" : void 0, n = [(l = e[i]) == null ? void 0 : l.computed(a)].flat().filter((o) => o);
		return n.length === 1 ? n[0].value : n.reduce((o = {}, c) => {
			let u = c, { colorScheme: m } = u;
			return o[m] = v(u, ["colorScheme"]), o;
		}, void 0);
	},
	getSelectorRule(e, t, r, s) {
		return r === "class" || r === "attr" ? C(s$1(t) ? `${e}${t},${e} ${t}` : e, s) : C(e, C(t != null ? t : ":root,:host", s));
	},
	transformCSS(e, t, r, s, i$3 = {}, a, n, l) {
		if (s$1(t)) {
			let { cssLayer: o } = i$3;
			if (s !== "style") {
				let c = this.getColorSchemeOption(i$3, n);
				t = r === "dark" ? c.reduce((m, { type: d, selector: u }) => (s$1(u) && (m += u.includes("[CSS]") ? u.replace("[CSS]", t) : this.getSelectorRule(u, l, d, t)), m), "") : C(l != null ? l : ":root,:host", t);
			}
			if (o) {
				let c = {
					name: "primeui"};
				i(o) && (c.name = m(o.name, {
					name: e,
					type: s
				})), s$1(c.name) && (t = C(`@layer ${c.name}`, t), a?.layerNames(c.name));
			}
			return t;
		}
		return "";
	}
};
var S = {
	defaults: {
		variable: {
			prefix: "p",
			selector: ":root,:host",
			excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi
		},
		options: {
			prefix: "p",
			darkModeSelector: "system",
			cssLayer: false
		}
	},
	_theme: void 0,
	_layerNames: /* @__PURE__ */ new Set(),
	_loadedStyleNames: /* @__PURE__ */ new Set(),
	_loadingStyles: /* @__PURE__ */ new Set(),
	_tokens: {},
	update(e = {}) {
		let { theme: t } = e;
		t && (this._theme = $(h$1({}, t), { options: h$1(h$1({}, this.defaults.options), t.options) }), this._tokens = b.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
	},
	get theme() {
		return this._theme;
	},
	get preset() {
		var e;
		return ((e = this.theme) == null ? void 0 : e.preset) || {};
	},
	get options() {
		var e;
		return ((e = this.theme) == null ? void 0 : e.options) || {};
	},
	get tokens() {
		return this._tokens;
	},
	getTheme() {
		return this.theme;
	},
	setTheme(e) {
		this.update({ theme: e }), N.emit("theme:change", e);
	},
	getPreset() {
		return this.preset;
	},
	setPreset(e) {
		this._theme = $(h$1({}, this.theme), { preset: e }), this._tokens = b.createTokens(e, this.defaults), this.clearLoadedStyleNames(), N.emit("preset:change", e), N.emit("theme:change", this.theme);
	},
	getOptions() {
		return this.options;
	},
	setOptions(e) {
		this._theme = $(h$1({}, this.theme), { options: e }), this.clearLoadedStyleNames(), N.emit("options:change", e), N.emit("theme:change", this.theme);
	},
	getLayerNames() {
		return [...this._layerNames];
	},
	setLayerNames(e) {
		this._layerNames.add(e);
	},
	getLoadedStyleNames() {
		return this._loadedStyleNames;
	},
	isStyleNameLoaded(e) {
		return this._loadedStyleNames.has(e);
	},
	setLoadedStyleName(e) {
		this._loadedStyleNames.add(e);
	},
	deleteLoadedStyleName(e) {
		this._loadedStyleNames.delete(e);
	},
	clearLoadedStyleNames() {
		this._loadedStyleNames.clear();
	},
	getTokenValue(e) {
		return b.getTokenValue(this.tokens, e, this.defaults);
	},
	getCommon(e = "", t) {
		return b.getCommon({
			name: e,
			theme: this.theme,
			params: t,
			defaults: this.defaults,
			set: { layerNames: this.setLayerNames.bind(this) }
		});
	},
	getComponent(e = "", t) {
		let r = {
			name: e,
			theme: this.theme,
			params: t,
			defaults: this.defaults,
			set: { layerNames: this.setLayerNames.bind(this) }
		};
		return b.getPresetC(r);
	},
	getDirective(e = "", t) {
		let r = {
			name: e,
			theme: this.theme,
			params: t,
			defaults: this.defaults,
			set: { layerNames: this.setLayerNames.bind(this) }
		};
		return b.getPresetD(r);
	},
	getCustomPreset(e = "", t, r, s) {
		let i = {
			name: e,
			preset: t,
			options: this.options,
			selector: r,
			params: s,
			defaults: this.defaults,
			set: { layerNames: this.setLayerNames.bind(this) }
		};
		return b.getPreset(i);
	},
	getLayerOrderCSS(e = "") {
		return b.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
	},
	transformCSS(e = "", t, r = "style", s) {
		return b.transformCSS(e, t, s, r, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
	},
	getCommonStyleSheet(e = "", t, r = {}) {
		return b.getCommonStyleSheet({
			name: e,
			theme: this.theme,
			params: t,
			props: r,
			defaults: this.defaults,
			set: { layerNames: this.setLayerNames.bind(this) }
		});
	},
	getStyleSheet(e, t, r = {}) {
		return b.getStyleSheet({
			name: e,
			theme: this.theme,
			params: t,
			props: r,
			defaults: this.defaults,
			set: { layerNames: this.setLayerNames.bind(this) }
		});
	},
	onStyleMounted(e) {
		this._loadingStyles.add(e);
	},
	onStyleUpdated(e) {
		this._loadingStyles.add(e);
	},
	onStyleLoaded(e, { name: t }) {
		this._loadingStyles.size && (this._loadingStyles.delete(t), N.emit(`theme:${t}:load`, e), !this._loadingStyles.size && N.emit("theme:load"));
	}
};
//#endregion
//#region node_modules/.pnpm/@primevue+core@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/@primevue/core/api/index.mjs
var FilterMatchMode = {
	STARTS_WITH: "startsWith",
	CONTAINS: "contains",
	NOT_CONTAINS: "notContains",
	ENDS_WITH: "endsWith",
	EQUALS: "equals",
	NOT_EQUALS: "notEquals",
	LESS_THAN: "lt",
	LESS_THAN_OR_EQUAL_TO: "lte",
	GREATER_THAN: "gt",
	GREATER_THAN_OR_EQUAL_TO: "gte",
	DATE_IS: "dateIs",
	DATE_IS_NOT: "dateIsNot",
	DATE_BEFORE: "dateBefore",
	DATE_AFTER: "dateAfter"
};
var FilterOperator = {
	AND: "and",
	OR: "or"
};
function _createForOfIteratorHelper(r, e) {
	var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (!t) {
		if (Array.isArray(r) || (t = _unsupportedIterableToArray$1(r)) || e) {
			t && (r = t);
			var _n = 0, F = function F() {};
			return {
				s: F,
				n: function n() {
					return _n >= r.length ? { done: true } : {
						done: false,
						value: r[_n++]
					};
				},
				e: function e(r) {
					throw r;
				},
				f: F
			};
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var o, a = true, u = false;
	return {
		s: function s() {
			t = t.call(r);
		},
		n: function n() {
			var r = t.next();
			return a = r.done, r;
		},
		e: function e(r) {
			u = true, o = r;
		},
		f: function f() {
			try {
				a || null == t["return"] || t["return"]();
			} finally {
				if (u) throw o;
			}
		}
	};
}
function _unsupportedIterableToArray$1(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
	}
}
function _arrayLikeToArray$1(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
var FilterService = {
	filter: function filter(value, fields, filterValue, filterMatchMode, filterLocale) {
		var filteredItems = [];
		if (!value) return filteredItems;
		var _iterator = _createForOfIteratorHelper(value), _step;
		try {
			for (_iterator.s(); !(_step = _iterator.n()).done;) {
				var item = _step.value;
				if (typeof item === "string") {
					if (this.filters[filterMatchMode](item, filterValue, filterLocale)) {
						filteredItems.push(item);
						continue;
					}
				} else {
					var _iterator2 = _createForOfIteratorHelper(fields), _step2;
					try {
						for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
							var field = _step2.value;
							var fieldValue = p(item, field);
							if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
								filteredItems.push(item);
								break;
							}
						}
					} catch (err) {
						_iterator2.e(err);
					} finally {
						_iterator2.f();
					}
				}
			}
		} catch (err) {
			_iterator.e(err);
		} finally {
			_iterator.f();
		}
		return filteredItems;
	},
	filters: {
		startsWith: function startsWith(value, filter, filterLocale) {
			if (filter === void 0 || filter === null || filter === "") return true;
			if (value === void 0 || value === null) return false;
			var filterValue = X(filter.toString()).toLocaleLowerCase(filterLocale);
			return X(value.toString()).toLocaleLowerCase(filterLocale).slice(0, filterValue.length) === filterValue;
		},
		contains: function contains(value, filter, filterLocale) {
			if (filter === void 0 || filter === null || filter === "") return true;
			if (value === void 0 || value === null) return false;
			var filterValue = X(filter.toString()).toLocaleLowerCase(filterLocale);
			return X(value.toString()).toLocaleLowerCase(filterLocale).indexOf(filterValue) !== -1;
		},
		notContains: function notContains(value, filter, filterLocale) {
			if (filter === void 0 || filter === null || filter === "") return true;
			if (value === void 0 || value === null) return false;
			var filterValue = X(filter.toString()).toLocaleLowerCase(filterLocale);
			return X(value.toString()).toLocaleLowerCase(filterLocale).indexOf(filterValue) === -1;
		},
		endsWith: function endsWith(value, filter, filterLocale) {
			if (filter === void 0 || filter === null || filter === "") return true;
			if (value === void 0 || value === null) return false;
			var filterValue = X(filter.toString()).toLocaleLowerCase(filterLocale);
			var stringValue = X(value.toString()).toLocaleLowerCase(filterLocale);
			return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
		},
		equals: function equals(value, filter, filterLocale) {
			if (filter === void 0 || filter === null || filter === "") return true;
			if (value === void 0 || value === null) return false;
			if (value.getTime && filter.getTime) return value.getTime() === filter.getTime();
			else return X(value.toString()).toLocaleLowerCase(filterLocale) == X(filter.toString()).toLocaleLowerCase(filterLocale);
		},
		notEquals: function notEquals(value, filter, filterLocale) {
			if (filter === void 0 || filter === null || filter === "") return false;
			if (value === void 0 || value === null) return true;
			if (value.getTime && filter.getTime) return value.getTime() !== filter.getTime();
			else return X(value.toString()).toLocaleLowerCase(filterLocale) != X(filter.toString()).toLocaleLowerCase(filterLocale);
		},
		"in": function _in(value, filter) {
			if (filter === void 0 || filter === null || filter.length === 0) return true;
			for (var i = 0; i < filter.length; i++) if (k$2(value, filter[i])) return true;
			return false;
		},
		between: function between(value, filter) {
			if (filter == null || filter[0] == null || filter[1] == null) return true;
			if (value === void 0 || value === null) return false;
			if (value.getTime) return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();
			else return filter[0] <= value && value <= filter[1];
		},
		lt: function lt(value, filter) {
			if (filter === void 0 || filter === null) return true;
			if (value === void 0 || value === null) return false;
			if (value.getTime && filter.getTime) return value.getTime() < filter.getTime();
			else return value < filter;
		},
		lte: function lte(value, filter) {
			if (filter === void 0 || filter === null) return true;
			if (value === void 0 || value === null) return false;
			if (value.getTime && filter.getTime) return value.getTime() <= filter.getTime();
			else return value <= filter;
		},
		gt: function gt(value, filter) {
			if (filter === void 0 || filter === null) return true;
			if (value === void 0 || value === null) return false;
			if (value.getTime && filter.getTime) return value.getTime() > filter.getTime();
			else return value > filter;
		},
		gte: function gte(value, filter) {
			if (filter === void 0 || filter === null) return true;
			if (value === void 0 || value === null) return false;
			if (value.getTime && filter.getTime) return value.getTime() >= filter.getTime();
			else return value >= filter;
		},
		dateIs: function dateIs(value, filter) {
			if (filter === void 0 || filter === null) return true;
			if (value === void 0 || value === null) return false;
			return value.toDateString() === filter.toDateString();
		},
		dateIsNot: function dateIsNot(value, filter) {
			if (filter === void 0 || filter === null) return true;
			if (value === void 0 || value === null) return false;
			return value.toDateString() !== filter.toDateString();
		},
		dateBefore: function dateBefore(value, filter) {
			if (filter === void 0 || filter === null) return true;
			if (value === void 0 || value === null) return false;
			return value.getTime() < filter.getTime();
		},
		dateAfter: function dateAfter(value, filter) {
			if (filter === void 0 || filter === null) return true;
			if (value === void 0 || value === null) return false;
			return value.getTime() > filter.getTime();
		}
	},
	register: function register(rule, fn) {
		this.filters[rule] = fn;
	}
};
//#endregion
//#region node_modules/.pnpm/@primeuix+styles@2.0.3/node_modules/@primeuix/styles/dist/base/index.mjs
var style = "\n    *,\n    ::before,\n    ::after {\n        box-sizing: border-box;\n    }\n\n    .p-collapsible-enter-active {\n        animation: p-animate-collapsible-expand 0.2s ease-out;\n        overflow: hidden;\n    }\n\n    .p-collapsible-leave-active {\n        animation: p-animate-collapsible-collapse 0.2s ease-out;\n        overflow: hidden;\n    }\n\n    @keyframes p-animate-collapsible-expand {\n        from {\n            grid-template-rows: 0fr;\n        }\n        to {\n            grid-template-rows: 1fr;\n        }\n    }\n\n    @keyframes p-animate-collapsible-collapse {\n        from {\n            grid-template-rows: 1fr;\n        }\n        to {\n            grid-template-rows: 0fr;\n        }\n    }\n\n    .p-disabled,\n    .p-disabled * {\n        cursor: default;\n        pointer-events: none;\n        user-select: none;\n    }\n\n    .p-disabled,\n    .p-component:disabled {\n        opacity: dt('disabled.opacity');\n    }\n\n    .pi {\n        font-size: dt('icon.size');\n    }\n\n    .p-icon {\n        width: dt('icon.size');\n        height: dt('icon.size');\n    }\n\n    .p-overlay-mask {\n        background: var(--px-mask-background, dt('mask.background'));\n        color: dt('mask.color');\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-overlay-mask-enter-active {\n        animation: p-animate-overlay-mask-enter dt('mask.transition.duration') forwards;\n    }\n\n    .p-overlay-mask-leave-active {\n        animation: p-animate-overlay-mask-leave dt('mask.transition.duration') forwards;\n    }\n\n    @keyframes p-animate-overlay-mask-enter {\n        from {\n            background: transparent;\n        }\n        to {\n            background: var(--px-mask-background, dt('mask.background'));\n        }\n    }\n    @keyframes p-animate-overlay-mask-leave {\n        from {\n            background: var(--px-mask-background, dt('mask.background'));\n        }\n        to {\n            background: transparent;\n        }\n    }\n\n    .p-anchored-overlay-enter-active {\n        animation: p-animate-anchored-overlay-enter 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    .p-anchored-overlay-leave-active {\n        animation: p-animate-anchored-overlay-leave 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    @keyframes p-animate-anchored-overlay-enter {\n        from {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n\n    @keyframes p-animate-anchored-overlay-leave {\n        to {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n";
//#endregion
//#region node_modules/.pnpm/@primevue+core@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/@primevue/core/usestyle/index.mjs
function _typeof$2(o) {
	"@babel/helpers - typeof";
	return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$2(o);
}
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), true).forEach(function(r) {
			_defineProperty$2(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$2(e, r, t) {
	return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: true,
		configurable: true,
		writable: true
	}) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
	if ("object" != _typeof$2(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r);
		if ("object" != _typeof$2(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function tryOnMounted(fn) {
	var sync = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
	if (getCurrentInstance() && getCurrentInstance().components);
	else if (sync) fn();
	else nextTick(fn);
}
var _id = 0;
function useStyle(css) {
	var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	var isLoaded = ref(false);
	var cssRef = ref(css);
	var styleRef = ref(null);
	var defaultDocument = void 0;
	var _options$document = options.document, document = _options$document === void 0 ? defaultDocument : _options$document, _options$immediate = options.immediate, immediate = _options$immediate === void 0 ? true : _options$immediate, _options$manual = options.manual, manual = _options$manual === void 0 ? false : _options$manual, _options$name = options.name, name = _options$name === void 0 ? "style_".concat(++_id) : _options$name, _options$id = options.id, id = _options$id === void 0 ? void 0 : _options$id, _options$media = options.media, media = _options$media === void 0 ? void 0 : _options$media, _options$nonce = options.nonce, nonce = _options$nonce === void 0 ? void 0 : _options$nonce, _options$first = options.first, first = _options$first === void 0 ? false : _options$first, _options$onMounted = options.onMounted, onStyleMounted = _options$onMounted === void 0 ? void 0 : _options$onMounted, _options$onUpdated = options.onUpdated, onStyleUpdated = _options$onUpdated === void 0 ? void 0 : _options$onUpdated, _options$onLoad = options.onLoad, onStyleLoaded = _options$onLoad === void 0 ? void 0 : _options$onLoad, _options$props = options.props, props = _options$props === void 0 ? {} : _options$props;
	var stop = function stop() {};
	var load = function load(_css) {
		var _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		if (!document) return;
		var _styleProps = _objectSpread$2(_objectSpread$2({}, props), _props);
		var _name = _styleProps.name || name, _id = _styleProps.id || id, _nonce = _styleProps.nonce || nonce;
		styleRef.value = document.querySelector("style[data-primevue-style-id=\"".concat(_name, "\"]")) || document.getElementById(_id) || document.createElement("style");
		if (!styleRef.value.isConnected) {
			cssRef.value = _css || css;
			A(styleRef.value, {
				type: "text/css",
				id: _id,
				media,
				nonce: _nonce
			});
			first ? document.head.prepend(styleRef.value) : document.head.appendChild(styleRef.value);
			_t(styleRef.value, "data-primevue-style-id", _name);
			A(styleRef.value, _styleProps);
			styleRef.value.onload = function(event) {
				return onStyleLoaded === null || onStyleLoaded === void 0 ? void 0 : onStyleLoaded(event, { name: _name });
			};
			onStyleMounted === null || onStyleMounted === void 0 || onStyleMounted(_name);
		}
		if (isLoaded.value) return;
		stop = watch(cssRef, function(value) {
			styleRef.value.textContent = value;
			onStyleUpdated === null || onStyleUpdated === void 0 || onStyleUpdated(_name);
		}, { immediate: true });
		isLoaded.value = true;
	};
	var unload = function unload() {
		if (!document || !isLoaded.value) return;
		stop();
		T(styleRef.value) && document.head.removeChild(styleRef.value);
		isLoaded.value = false;
		styleRef.value = null;
	};
	if (immediate && !manual) tryOnMounted(load);
	return {
		id,
		name,
		el: styleRef,
		css: cssRef,
		unload,
		load,
		isLoaded: readonly(isLoaded)
	};
}
//#endregion
//#region node_modules/.pnpm/@primevue+core@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/@primevue/core/base/style/index.mjs
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$1(o);
}
var _templateObject;
var _templateObject2;
var _templateObject3;
var _templateObject4;
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = true, o = false;
		try {
			if (i = (t = t.call(r)).next, 0 === l);
			else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = true, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), true).forEach(function(r) {
			_defineProperty$1(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$1(e, r, t) {
	return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: true,
		configurable: true,
		writable: true
	}) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
	if ("object" != _typeof$1(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r);
		if ("object" != _typeof$1(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _taggedTemplateLiteral(e, t) {
	return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var BaseStyle = {
	name: "base",
	css: function css(_ref) {
		var dt = _ref.dt;
		return "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    opacity: 0;\n    overflow: hidden;\n    padding: 0;\n    pointer-events: none;\n    position: absolute;\n    white-space: nowrap;\n    width: 1px;\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n    padding-right: ".concat(dt("scrollbar.width"), ";\n}\n");
	},
	style,
	classes: {},
	inlineStyles: {},
	load: function load(style) {
		var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		var computedStyle = (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(cs) {
			return cs;
		})(ar(_templateObject || (_templateObject = _taggedTemplateLiteral(["", ""])), style));
		return s$1(computedStyle) ? useStyle(Y$2(computedStyle), _objectSpread$1({ name: this.name }, options)) : {};
	},
	loadCSS: function loadCSS() {
		var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		return this.load(this.css, options);
	},
	loadStyle: function loadStyle() {
		var _this = this;
		var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		var style = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
		return this.load(this.style, options, function() {
			var computedStyle = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
			return S.transformCSS(options.name || _this.name, "".concat(computedStyle).concat(ar(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["", ""])), style)));
		});
	},
	getCommonTheme: function getCommonTheme(params) {
		return S.getCommon(this.name, params);
	},
	getComponentTheme: function getComponentTheme(params) {
		return S.getComponent(this.name, params);
	},
	getDirectiveTheme: function getDirectiveTheme(params) {
		return S.getDirective(this.name, params);
	},
	getPresetTheme: function getPresetTheme(preset, selector, params) {
		return S.getCustomPreset(this.name, preset, selector, params);
	},
	getLayerOrderThemeCSS: function getLayerOrderThemeCSS() {
		return S.getLayerOrderCSS(this.name);
	},
	getStyleSheet: function getStyleSheet() {
		var extendedCSS = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
		var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		if (this.css) {
			var _css = m(this.css, { dt: E }) || "";
			var _style = Y$2(ar(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral([
				"",
				"",
				""
			])), _css, extendedCSS));
			var _props = Object.entries(props).reduce(function(acc, _ref2) {
				var _ref3 = _slicedToArray(_ref2, 2), k = _ref3[0], v = _ref3[1];
				return acc.push("".concat(k, "=\"").concat(v, "\"")) && acc;
			}, []).join(" ");
			return s$1(_style) ? "<style type=\"text/css\" data-primevue-style-id=\"".concat(this.name, "\" ").concat(_props, ">").concat(_style, "</style>") : "";
		}
		return "";
	},
	getCommonThemeStyleSheet: function getCommonThemeStyleSheet(params) {
		var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		return S.getCommonStyleSheet(this.name, params, props);
	},
	getThemeStyleSheet: function getThemeStyleSheet(params) {
		var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		var css = [S.getStyleSheet(this.name, params, props)];
		if (this.style) {
			var name = this.name === "base" ? "global-style" : "".concat(this.name, "-style");
			var _css = ar(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["", ""])), m(this.style, { dt: E }));
			var _style = Y$2(S.transformCSS(name, _css));
			var _props = Object.entries(props).reduce(function(acc, _ref4) {
				var _ref5 = _slicedToArray(_ref4, 2), k = _ref5[0], v = _ref5[1];
				return acc.push("".concat(k, "=\"").concat(v, "\"")) && acc;
			}, []).join(" ");
			s$1(_style) && css.push("<style type=\"text/css\" data-primevue-style-id=\"".concat(name, "\" ").concat(_props, ">").concat(_style, "</style>"));
		}
		return css.join("");
	},
	extend: function extend(inStyle) {
		return _objectSpread$1(_objectSpread$1({}, this), {}, {
			css: void 0,
			style: void 0
		}, inStyle);
	}
};
//#endregion
//#region node_modules/.pnpm/@primevue+core@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/@primevue/core/service/index.mjs
var PrimeVueService = s();
//#endregion
//#region node_modules/.pnpm/@primevue+core@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/@primevue/core/config/index.mjs
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: true,
		configurable: true,
		writable: true
	}) : e[r] = t, e;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r);
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var defaultOptions = {
	ripple: false,
	inputStyle: null,
	inputVariant: null,
	locale: {
		startsWith: "Starts with",
		contains: "Contains",
		notContains: "Not contains",
		endsWith: "Ends with",
		equals: "Equals",
		notEquals: "Not equals",
		noFilter: "No Filter",
		lt: "Less than",
		lte: "Less than or equal to",
		gt: "Greater than",
		gte: "Greater than or equal to",
		dateIs: "Date is",
		dateIsNot: "Date is not",
		dateBefore: "Date is before",
		dateAfter: "Date is after",
		clear: "Clear",
		apply: "Apply",
		matchAll: "Match All",
		matchAny: "Match Any",
		addRule: "Add Rule",
		removeRule: "Remove Rule",
		accept: "Yes",
		reject: "No",
		choose: "Choose",
		upload: "Upload",
		cancel: "Cancel",
		completed: "Completed",
		pending: "Pending",
		fileSizeTypes: [
			"B",
			"KB",
			"MB",
			"GB",
			"TB",
			"PB",
			"EB",
			"ZB",
			"YB"
		],
		dayNames: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		],
		dayNamesShort: [
			"Sun",
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat"
		],
		dayNamesMin: [
			"Su",
			"Mo",
			"Tu",
			"We",
			"Th",
			"Fr",
			"Sa"
		],
		monthNames: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		],
		monthNamesShort: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		],
		chooseYear: "Choose Year",
		chooseMonth: "Choose Month",
		chooseDate: "Choose Date",
		prevDecade: "Previous Decade",
		nextDecade: "Next Decade",
		prevYear: "Previous Year",
		nextYear: "Next Year",
		prevMonth: "Previous Month",
		nextMonth: "Next Month",
		prevHour: "Previous Hour",
		nextHour: "Next Hour",
		prevMinute: "Previous Minute",
		nextMinute: "Next Minute",
		prevSecond: "Previous Second",
		nextSecond: "Next Second",
		am: "am",
		pm: "pm",
		today: "Today",
		weekHeader: "Wk",
		firstDayOfWeek: 0,
		showMonthAfterYear: false,
		dateFormat: "mm/dd/yy",
		weak: "Weak",
		medium: "Medium",
		strong: "Strong",
		passwordPrompt: "Enter a password",
		emptyFilterMessage: "No results found",
		searchMessage: "{0} results are available",
		selectionMessage: "{0} items selected",
		emptySelectionMessage: "No selected item",
		emptySearchMessage: "No results found",
		fileChosenMessage: "{0} files",
		noFileChosenMessage: "No file chosen",
		emptyMessage: "No available options",
		aria: {
			trueLabel: "True",
			falseLabel: "False",
			nullLabel: "Not Selected",
			star: "1 star",
			stars: "{star} stars",
			selectAll: "All items selected",
			unselectAll: "All items unselected",
			close: "Close",
			previous: "Previous",
			next: "Next",
			navigation: "Navigation",
			scrollTop: "Scroll Top",
			moveTop: "Move Top",
			moveUp: "Move Up",
			moveDown: "Move Down",
			moveBottom: "Move Bottom",
			moveToTarget: "Move to Target",
			moveToSource: "Move to Source",
			moveAllToTarget: "Move All to Target",
			moveAllToSource: "Move All to Source",
			pageLabel: "Page {page}",
			firstPageLabel: "First Page",
			lastPageLabel: "Last Page",
			nextPageLabel: "Next Page",
			prevPageLabel: "Previous Page",
			rowsPerPageLabel: "Rows per page",
			jumpToPageDropdownLabel: "Jump to Page Dropdown",
			jumpToPageInputLabel: "Jump to Page Input",
			selectRow: "Row Selected",
			unselectRow: "Row Unselected",
			expandRow: "Row Expanded",
			collapseRow: "Row Collapsed",
			showFilterMenu: "Show Filter Menu",
			hideFilterMenu: "Hide Filter Menu",
			filterOperator: "Filter Operator",
			filterConstraint: "Filter Constraint",
			editRow: "Row Edit",
			saveEdit: "Save Edit",
			cancelEdit: "Cancel Edit",
			listView: "List View",
			gridView: "Grid View",
			slide: "Slide",
			slideNumber: "{slideNumber}",
			zoomImage: "Zoom Image",
			zoomIn: "Zoom In",
			zoomOut: "Zoom Out",
			rotateRight: "Rotate Right",
			rotateLeft: "Rotate Left",
			listLabel: "Option List"
		}
	},
	filterMatchModeOptions: {
		text: [
			FilterMatchMode.STARTS_WITH,
			FilterMatchMode.CONTAINS,
			FilterMatchMode.NOT_CONTAINS,
			FilterMatchMode.ENDS_WITH,
			FilterMatchMode.EQUALS,
			FilterMatchMode.NOT_EQUALS
		],
		numeric: [
			FilterMatchMode.EQUALS,
			FilterMatchMode.NOT_EQUALS,
			FilterMatchMode.LESS_THAN,
			FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
			FilterMatchMode.GREATER_THAN,
			FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
		],
		date: [
			FilterMatchMode.DATE_IS,
			FilterMatchMode.DATE_IS_NOT,
			FilterMatchMode.DATE_BEFORE,
			FilterMatchMode.DATE_AFTER
		]
	},
	zIndex: {
		modal: 1100,
		overlay: 1e3,
		menu: 1e3,
		tooltip: 1100
	},
	theme: void 0,
	unstyled: false,
	pt: void 0,
	ptOptions: {
		mergeSections: true,
		mergeProps: false
	},
	csp: { nonce: void 0 }
};
var PrimeVueSymbol = Symbol();
function setup(app, options) {
	var PrimeVue = { config: reactive(options) };
	app.config.globalProperties.$primevue = PrimeVue;
	app.provide(PrimeVueSymbol, PrimeVue);
	clearConfig();
	setupConfig(app, PrimeVue);
	return PrimeVue;
}
var stopWatchers = [];
function clearConfig() {
	N.clear();
	stopWatchers.forEach(function(fn) {
		return fn === null || fn === void 0 ? void 0 : fn();
	});
	stopWatchers = [];
}
function setupConfig(app, PrimeVue) {
	var isThemeChanged = ref(false);
	/*** Methods and Services ***/
	var loadCommonTheme = function loadCommonTheme() {
		var _PrimeVue$config;
		if (((_PrimeVue$config = PrimeVue.config) === null || _PrimeVue$config === void 0 ? void 0 : _PrimeVue$config.theme) === "none") return;
		if (!S.isStyleNameLoaded("common")) {
			var _BaseStyle$getCommonT, _PrimeVue$config2;
			var _ref = ((_BaseStyle$getCommonT = BaseStyle.getCommonTheme) === null || _BaseStyle$getCommonT === void 0 ? void 0 : _BaseStyle$getCommonT.call(BaseStyle)) || {}, primitive = _ref.primitive, semantic = _ref.semantic, global = _ref.global, style = _ref.style;
			var styleOptions = { nonce: (_PrimeVue$config2 = PrimeVue.config) === null || _PrimeVue$config2 === void 0 || (_PrimeVue$config2 = _PrimeVue$config2.csp) === null || _PrimeVue$config2 === void 0 ? void 0 : _PrimeVue$config2.nonce };
			BaseStyle.load(primitive === null || primitive === void 0 ? void 0 : primitive.css, _objectSpread({ name: "primitive-variables" }, styleOptions));
			BaseStyle.load(semantic === null || semantic === void 0 ? void 0 : semantic.css, _objectSpread({ name: "semantic-variables" }, styleOptions));
			BaseStyle.load(global === null || global === void 0 ? void 0 : global.css, _objectSpread({ name: "global-variables" }, styleOptions));
			BaseStyle.loadStyle(_objectSpread({ name: "global-style" }, styleOptions), style);
			S.setLoadedStyleName("common");
		}
	};
	N.on("theme:change", function(newTheme) {
		if (!isThemeChanged.value) {
			app.config.globalProperties.$primevue.config.theme = newTheme;
			isThemeChanged.value = true;
		}
	});
	/*** Watchers ***/
	var stopConfigWatcher = watch(PrimeVue.config, function(newValue, oldValue) {
		PrimeVueService.emit("config:change", {
			newValue,
			oldValue
		});
	}, {
		immediate: true,
		deep: true
	});
	var stopRippleWatcher = watch(function() {
		return PrimeVue.config.ripple;
	}, function(newValue, oldValue) {
		PrimeVueService.emit("config:ripple:change", {
			newValue,
			oldValue
		});
	}, {
		immediate: true,
		deep: true
	});
	var stopThemeWatcher = watch(function() {
		return PrimeVue.config.theme;
	}, function(newValue, oldValue) {
		if (!isThemeChanged.value) S.setTheme(newValue);
		if (!PrimeVue.config.unstyled) loadCommonTheme();
		isThemeChanged.value = false;
		PrimeVueService.emit("config:theme:change", {
			newValue,
			oldValue
		});
	}, {
		immediate: true,
		deep: false
	});
	var stopUnstyledWatcher = watch(function() {
		return PrimeVue.config.unstyled;
	}, function(newValue, oldValue) {
		if (!newValue && PrimeVue.config.theme) loadCommonTheme();
		PrimeVueService.emit("config:unstyled:change", {
			newValue,
			oldValue
		});
	}, {
		immediate: true,
		deep: true
	});
	stopWatchers.push(stopConfigWatcher);
	stopWatchers.push(stopRippleWatcher);
	stopWatchers.push(stopThemeWatcher);
	stopWatchers.push(stopUnstyledWatcher);
}
var PrimeVue = { install: function install(app, options) {
	setup(app, H(defaultOptions, options));
} };
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/confirmationeventbus/index.mjs
var ConfirmationEventBus = s();
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/useconfirm/index.mjs
var PrimeVueConfirmSymbol = Symbol();
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/confirmationservice/index.mjs
var ConfirmationService = { install: function install(app) {
	var ConfirmationService = {
		require: function require(options) {
			ConfirmationEventBus.emit("confirm", options);
		},
		close: function close() {
			ConfirmationEventBus.emit("close");
		}
	};
	app.config.globalProperties.$confirm = ConfirmationService;
	app.provide(PrimeVueConfirmSymbol, ConfirmationService);
} };
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/dynamicdialogeventbus/index.mjs
var DynamicDialogEventBus = s();
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/usedialog/index.mjs
var PrimeVueDialogSymbol = Symbol();
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/dialogservice/index.mjs
var DialogService = { install: function install(app) {
	var DialogService = { open: function open(content, options) {
		var instance = {
			content: content && markRaw(content),
			options: options || {},
			data: options && options.data,
			close: function close(params) {
				DynamicDialogEventBus.emit("close", {
					instance,
					params
				});
			}
		};
		DynamicDialogEventBus.emit("open", { instance });
		return instance;
	} };
	app.config.globalProperties.$dialog = DialogService;
	app.provide(PrimeVueDialogSymbol, DialogService);
} };
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/toasteventbus/index.mjs
var ToastEventBus = s();
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/usetoast/index.mjs
var PrimeVueToastSymbol = Symbol();
//#endregion
//#region node_modules/.pnpm/primevue@4.5.4_vue@3.5.43_typescript@5.9.3_/node_modules/primevue/toastservice/index.mjs
var ToastService = { install: function install(app) {
	var ToastService = {
		add: function add(message) {
			ToastEventBus.emit("add", message);
		},
		remove: function remove(message) {
			ToastEventBus.emit("remove", message);
		},
		removeGroup: function removeGroup(group) {
			ToastEventBus.emit("remove-group", group);
		},
		removeAllGroups: function removeAllGroups() {
			ToastEventBus.emit("remove-all-groups");
		}
	};
	app.config.globalProperties.$toast = ToastService;
	app.provide(PrimeVueToastSymbol, ToastService);
} };
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fplugins.server.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default = [
	plugin$2,
	plugin$1,
	plugin,
	virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default,
	/* @__PURE__ */ defineNuxtPlugin(({ vueApp }) => {
		const { usePrimeVue = true, options = {} } = (/* @__PURE__ */ useRuntimeConfig())?.public?.primevue ?? {};
		const pt = {};
		const theme = {};
		usePrimeVue && vueApp.use(PrimeVue, {
			...options,
			...pt,
			...theme
		});
		vueApp.use(ConfirmationService);
		vueApp.use(DialogService);
		vueApp.use(ToastService);
	})
];
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/components/route-provider.js
var defineRouteProvider = (name = "RouteProvider") => defineComponent({
	name,
	props: {
		route: {
			type: Object,
			required: true
		},
		vnode: Object,
		vnodeRef: Object,
		renderKey: String,
		trackRootNodes: Boolean,
		routeRecord: Object
	},
	setup(props) {
		const previousKey = props.renderKey;
		const previousRoute = props.route;
		const route = {};
		for (const key in props.route) Object.defineProperty(route, key, {
			get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
			enumerable: true
		});
		provide(PageRouteSymbol, shallowReactive(route));
		return () => {
			if (!props.vnode) return props.vnode;
			return h(props.vnode, { ref: props.vnodeRef });
		};
	}
});
var RouteProvider = defineRouteProvider();
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/pages/runtime/page.js
var page_default = defineComponent({
	name: "NuxtPage",
	inheritAttrs: false,
	props: {
		name: { type: String },
		transition: {
			type: [Boolean, Object],
			default: void 0
		},
		keepalive: {
			type: [Boolean, Object],
			default: void 0
		},
		route: { type: Object },
		pageKey: {
			type: [Function, String],
			default: null
		}
	},
	setup(props, { attrs, slots, expose }) {
		const nuxtApp = useNuxtApp();
		const pageRef = ref();
		inject(PageRouteSymbol, null);
		expose({ pageRef });
		inject(LayoutMetaSymbol, null);
		nuxtApp.deferHydration();
		return () => {
			return h(RouterView, {
				name: props.name,
				route: props.route,
				...attrs
			}, { default: markStableSlot((routeProps) => {
				return h(Suspense, { suspensible: true }, { default() {
					return h(RouteProvider, {
						vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
						route: routeProps.route,
						vnodeRef: pageRef
					});
				} });
			}) });
		};
	}
});
function markStableSlot(fn) {
	const wrapped = ((routeProps) => {
		const result = fn(routeProps);
		if (Array.isArray(result)) return result;
		if (result == null || !isVNode(result)) return [createCommentVNode()];
		return [result];
	});
	wrapped._n = true;
	return wrapped;
}
function normalizeSlot(slot, data) {
	const slotContent = slot(data);
	return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region app/app.vue
var _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(ssrRenderComponent(page_default, _attrs, null, _parent));
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/components/nuxt-error-page.vue
var _sfc_main$1 = {
	__name: "nuxt-error-page",
	__ssrInlineRender: true,
	props: { error: Object },
	setup(__props) {
		const _error = __props.error;
		const status = Number(_error.statusCode || 500);
		const is404 = status === 404;
		const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
		const description = _error.message || _error.toString();
		const stack = void 0;
		const _Error404 = defineAsyncComponent(() => import('../build/error-404-JR8A3VqH.mjs'));
		const _Error = defineAsyncComponent(() => import('../build/error-500-CY12DU0a.mjs'));
		const ErrorTemplate = is404 ? _Error404 : _Error;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({
				status: unref(status),
				statusText: unref(statusText),
				statusCode: unref(status),
				statusMessage: unref(statusText),
				description: unref(description),
				stack: unref(stack)
			}, _attrs), null, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fisland-renderer.mjs
var IslandRenderer = () => null;
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/components/nuxt-root.vue
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
		const error = /* @__PURE__ */ useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		function invokeAppErrorHandler(err, target, info) {
			const errorHandler = nuxtApp.vueApp.config.errorHandler;
			if (errorHandler && !errorHandler.__nuxt_default) try {
				errorHandler(err, target, info);
			} catch (handlerError) {
				console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
			}
		}
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(err));
				onServerPrefetch(() => p);
				invokeAppErrorHandler(err, target, info);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				},
				_: 1
			});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8533a2d76e9513a51094ebb932f8cf08/node_modules/nuxt/dist/app/entry.js
var entry$1 = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(_sfc_main);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createError$1(error);
	}
	if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) throw new Error("skipping render");
	return vueApp;
};
var entry_default = ((ssrContext) => entry$1(ssrContext));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: entry_default
}, Symbol.toStringTag, { value: 'Module' }));

export { $fetch$1 as $, At as A, BaseStyle as B, C$2 as C, D, q as E, F$2 as F, FilterService as G, Ht as H, I, J$1 as J, K, Lt as L, M$1 as M, Nt as N, O$1 as O, P, Q$1 as Q, Rt as R, S$1 as S, Tt as T, U, vt as V, W, $t as X, Yt as Y, pt as Z, _t as _, a, Mt as a0, V as a1, k$1 as a2, $$1 as a3, R as a4, h$2 as a5, T as a6, ht$1 as a7, zt as a8, B$1 as a9, useRouter as aA, encodeRoutePath as aB, resolveRouteObject as aC, navigateTo as aD, useNuxtApp as aE, nuxtLinkDefaults as aF, entry as aG, J as aa, G as ab, at as ac, h$3 as ad, Dt as ae, FilterMatchMode as af, FilterOperator as ag, ee as ah, Wt as ai, Ot as aj, kt as ak, It as al, Kt as am, _ as an, ConfirmationEventBus as ao, dt$1 as ap, st$1 as aq, DynamicDialogEventBus as ar, V$1 as as, ToastEventBus as at, te as au, Ft as av, Q$2 as aw, H as ax, _plugin_vue_export_helper_default as ay, useHead$1 as az, bt as b, W$1 as c, b$1 as d, Y$1 as e, N as f, g, S as h, c$1 as i, c as j, k$2 as k, l, m, C$1 as n, ne$1 as o, p, i as q, rr as r, s$1 as s, PrimeVueService as t, useRuntimeConfig as u, v$1 as v, s as w, tt as x, et as y, z };
//# sourceMappingURL=entry.mjs.map
