/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@chromatic-com/cypress/dist/support.js":
/*!*************************************************************!*\
  !*** ./node_modules/@chromatic-com/cypress/dist/support.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



var rrwebSnapshot = __webpack_require__(/*! rrweb-snapshot */ "./node_modules/rrweb-snapshot/es/rrweb-snapshot.js");

Cypress.Commands.add("takeSnapshot",e=>{Cypress.config("isTextTerminal")&&cy.document().then(s=>{let n=rrwebSnapshot.snapshot(s);cy.get("@manualSnapshots").then(r=>[...r,{name:e,snapshot:n}]).as("manualSnapshots");});});beforeEach(()=>{Cypress.config("isTextTerminal")&&(cy.wrap([]).as("manualSnapshots"),cy.task("prepareArchives",{action:"setup-network-listener",payload:{allowedDomains:Cypress.env("assetDomains")}}));});afterEach(()=>{Cypress.env("disableAutoSnapshot")||!Cypress.config("isTextTerminal")||cy.document().then(e=>{let s=rrwebSnapshot.snapshot(e);cy.get("@manualSnapshots").then((n=[])=>{cy.url().then(r=>{cy.task("prepareArchives",{action:"save-archives",payload:{testTitlePath:[Cypress.spec.relativeToCommonRoot,...Cypress.currentTest.titlePath],domSnapshots:[...n,{snapshot:s}],chromaticStorybookParams:{...Cypress.env("diffThreshold")&&{diffThreshold:Cypress.env("diffThreshold")},...Cypress.env("delay")&&{delay:Cypress.env("delay")},...Cypress.env("diffIncludeAntiAliasing")&&{diffIncludeAntiAliasing:Cypress.env("diffIncludeAntiAliasing")},...Cypress.env("diffThreshold")&&{diffThreshold:Cypress.env("diffThreshold")},...Cypress.env("forcedColors")&&{forcedColors:Cypress.env("forcedColors")},...Cypress.env("pauseAnimationAtEnd")&&{pauseAnimationAtEnd:Cypress.env("pauseAnimationAtEnd")},...Cypress.env("prefersReducedMotion")&&{prefersReducedMotion:Cypress.env("prefersReducedMotion")}},pageUrl:r,viewport:{height:Cypress.config("viewportHeight"),width:Cypress.config("viewportWidth")}}});});});});});
//# sourceMappingURL=out.js.map
//# sourceMappingURL=support.js.map

/***/ }),

/***/ "./node_modules/rrweb-snapshot/es/rrweb-snapshot.js":
/*!**********************************************************!*\
  !*** ./node_modules/rrweb-snapshot/es/rrweb-snapshot.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IGNORED_NODE: () => (/* binding */ IGNORED_NODE),
/* harmony export */   Mirror: () => (/* binding */ Mirror),
/* harmony export */   NodeType: () => (/* binding */ NodeType),
/* harmony export */   addHoverClass: () => (/* binding */ addHoverClass),
/* harmony export */   buildNodeWithSN: () => (/* binding */ buildNodeWithSN),
/* harmony export */   classMatchesRegex: () => (/* binding */ classMatchesRegex),
/* harmony export */   cleanupSnapshot: () => (/* binding */ cleanupSnapshot),
/* harmony export */   createCache: () => (/* binding */ createCache),
/* harmony export */   createMirror: () => (/* binding */ createMirror),
/* harmony export */   escapeImportStatement: () => (/* binding */ escapeImportStatement),
/* harmony export */   genId: () => (/* binding */ genId),
/* harmony export */   getInputType: () => (/* binding */ getInputType),
/* harmony export */   ignoreAttribute: () => (/* binding */ ignoreAttribute),
/* harmony export */   is2DCanvasBlank: () => (/* binding */ is2DCanvasBlank),
/* harmony export */   isCSSImportRule: () => (/* binding */ isCSSImportRule),
/* harmony export */   isElement: () => (/* binding */ isElement),
/* harmony export */   isNativeShadowDom: () => (/* binding */ isNativeShadowDom),
/* harmony export */   isNodeMetaEqual: () => (/* binding */ isNodeMetaEqual),
/* harmony export */   isShadowRoot: () => (/* binding */ isShadowRoot),
/* harmony export */   maskInputValue: () => (/* binding */ maskInputValue),
/* harmony export */   needMaskingText: () => (/* binding */ needMaskingText),
/* harmony export */   rebuild: () => (/* binding */ rebuild),
/* harmony export */   serializeNodeWithId: () => (/* binding */ serializeNodeWithId),
/* harmony export */   snapshot: () => (/* binding */ snapshot),
/* harmony export */   stringifyRule: () => (/* binding */ stringifyRule),
/* harmony export */   stringifyStylesheet: () => (/* binding */ stringifyStylesheet),
/* harmony export */   toLowerCase: () => (/* binding */ toLowerCase),
/* harmony export */   transformAttribute: () => (/* binding */ transformAttribute),
/* harmony export */   validateStringifiedCssRule: () => (/* binding */ validateStringifiedCssRule),
/* harmony export */   visitSnapshot: () => (/* binding */ visitSnapshot)
/* harmony export */ });
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Document"] = 0] = "Document";
    NodeType[NodeType["DocumentType"] = 1] = "DocumentType";
    NodeType[NodeType["Element"] = 2] = "Element";
    NodeType[NodeType["Text"] = 3] = "Text";
    NodeType[NodeType["CDATA"] = 4] = "CDATA";
    NodeType[NodeType["Comment"] = 5] = "Comment";
})(NodeType || (NodeType = {}));

function isElement(n) {
    return n.nodeType === n.ELEMENT_NODE;
}
function isShadowRoot(n) {
    var host = n === null || n === void 0 ? void 0 : n.host;
    return Boolean((host === null || host === void 0 ? void 0 : host.shadowRoot) === n);
}
function isNativeShadowDom(shadowRoot) {
    return Object.prototype.toString.call(shadowRoot) === '[object ShadowRoot]';
}
function fixBrowserCompatibilityIssuesInCSS(cssText) {
    if (cssText.includes(' background-clip: text;') &&
        !cssText.includes(' -webkit-background-clip: text;')) {
        cssText = cssText.replace(' background-clip: text;', ' -webkit-background-clip: text; background-clip: text;');
    }
    return cssText;
}
function escapeImportStatement(rule) {
    var cssText = rule.cssText;
    if (cssText.split('"').length < 3)
        return cssText;
    var statement = ['@import', "url(".concat(JSON.stringify(rule.href), ")")];
    if (rule.layerName === '') {
        statement.push("layer");
    }
    else if (rule.layerName) {
        statement.push("layer(".concat(rule.layerName, ")"));
    }
    if (rule.supportsText) {
        statement.push("supports(".concat(rule.supportsText, ")"));
    }
    if (rule.media.length) {
        statement.push(rule.media.mediaText);
    }
    return statement.join(' ') + ';';
}
function stringifyStylesheet(s) {
    try {
        var rules = s.rules || s.cssRules;
        return rules
            ? fixBrowserCompatibilityIssuesInCSS(Array.from(rules).map(stringifyRule).join(''))
            : null;
    }
    catch (error) {
        return null;
    }
}
function stringifyRule(rule) {
    var importStringified;
    if (isCSSImportRule(rule)) {
        try {
            importStringified =
                stringifyStylesheet(rule.styleSheet) ||
                    escapeImportStatement(rule);
        }
        catch (error) {
        }
    }
    return validateStringifiedCssRule(importStringified || rule.cssText);
}
function validateStringifiedCssRule(cssStringified) {
    if (cssStringified.includes(':')) {
        var regex = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm;
        return cssStringified.replace(regex, '$1\\$2');
    }
    return cssStringified;
}
function isCSSImportRule(rule) {
    return 'styleSheet' in rule;
}
var Mirror = (function () {
    function Mirror() {
        this.idNodeMap = new Map();
        this.nodeMetaMap = new WeakMap();
    }
    Mirror.prototype.getId = function (n) {
        var _a;
        if (!n)
            return -1;
        var id = (_a = this.getMeta(n)) === null || _a === void 0 ? void 0 : _a.id;
        return id !== null && id !== void 0 ? id : -1;
    };
    Mirror.prototype.getNode = function (id) {
        return this.idNodeMap.get(id) || null;
    };
    Mirror.prototype.getIds = function () {
        return Array.from(this.idNodeMap.keys());
    };
    Mirror.prototype.getMeta = function (n) {
        return this.nodeMetaMap.get(n) || null;
    };
    Mirror.prototype.removeNodeFromMap = function (n) {
        var _this = this;
        var id = this.getId(n);
        this.idNodeMap["delete"](id);
        if (n.childNodes) {
            n.childNodes.forEach(function (childNode) {
                return _this.removeNodeFromMap(childNode);
            });
        }
    };
    Mirror.prototype.has = function (id) {
        return this.idNodeMap.has(id);
    };
    Mirror.prototype.hasNode = function (node) {
        return this.nodeMetaMap.has(node);
    };
    Mirror.prototype.add = function (n, meta) {
        var id = meta.id;
        this.idNodeMap.set(id, n);
        this.nodeMetaMap.set(n, meta);
    };
    Mirror.prototype.replace = function (id, n) {
        var oldNode = this.getNode(id);
        if (oldNode) {
            var meta = this.nodeMetaMap.get(oldNode);
            if (meta)
                this.nodeMetaMap.set(n, meta);
        }
        this.idNodeMap.set(id, n);
    };
    Mirror.prototype.reset = function () {
        this.idNodeMap = new Map();
        this.nodeMetaMap = new WeakMap();
    };
    return Mirror;
}());
function createMirror() {
    return new Mirror();
}
function maskInputValue(_a) {
    var element = _a.element, maskInputOptions = _a.maskInputOptions, tagName = _a.tagName, type = _a.type, value = _a.value, maskInputFn = _a.maskInputFn;
    var text = value || '';
    var actualType = type && toLowerCase(type);
    if (maskInputOptions[tagName.toLowerCase()] ||
        (actualType && maskInputOptions[actualType])) {
        if (maskInputFn) {
            text = maskInputFn(text, element);
        }
        else {
            text = '*'.repeat(text.length);
        }
    }
    return text;
}
function toLowerCase(str) {
    return str.toLowerCase();
}
var ORIGINAL_ATTRIBUTE_NAME = '__rrweb_original__';
function is2DCanvasBlank(canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx)
        return true;
    var chunkSize = 50;
    for (var x = 0; x < canvas.width; x += chunkSize) {
        for (var y = 0; y < canvas.height; y += chunkSize) {
            var getImageData = ctx.getImageData;
            var originalGetImageData = ORIGINAL_ATTRIBUTE_NAME in getImageData
                ? getImageData[ORIGINAL_ATTRIBUTE_NAME]
                : getImageData;
            var pixelBuffer = new Uint32Array(originalGetImageData.call(ctx, x, y, Math.min(chunkSize, canvas.width - x), Math.min(chunkSize, canvas.height - y)).data.buffer);
            if (pixelBuffer.some(function (pixel) { return pixel !== 0; }))
                return false;
        }
    }
    return true;
}
function isNodeMetaEqual(a, b) {
    if (!a || !b || a.type !== b.type)
        return false;
    if (a.type === NodeType.Document)
        return a.compatMode === b.compatMode;
    else if (a.type === NodeType.DocumentType)
        return (a.name === b.name &&
            a.publicId === b.publicId &&
            a.systemId === b.systemId);
    else if (a.type === NodeType.Comment ||
        a.type === NodeType.Text ||
        a.type === NodeType.CDATA)
        return a.textContent === b.textContent;
    else if (a.type === NodeType.Element)
        return (a.tagName === b.tagName &&
            JSON.stringify(a.attributes) ===
                JSON.stringify(b.attributes) &&
            a.isSVG === b.isSVG &&
            a.needBlock === b.needBlock);
    return false;
}
function getInputType(element) {
    var type = element.type;
    return element.hasAttribute('data-rr-is-password')
        ? 'password'
        : type
            ?
                toLowerCase(type)
            : null;
}

var _id = 1;
var tagNameRegex = new RegExp('[^a-z0-9-_:]');
var IGNORED_NODE = -2;
function genId() {
    return _id++;
}
function getValidTagName(element) {
    if (element instanceof HTMLFormElement) {
        return 'form';
    }
    var processedTagName = toLowerCase(element.tagName);
    if (tagNameRegex.test(processedTagName)) {
        return 'div';
    }
    return processedTagName;
}
function extractOrigin(url) {
    var origin = '';
    if (url.indexOf('//') > -1) {
        origin = url.split('/').slice(0, 3).join('/');
    }
    else {
        origin = url.split('/')[0];
    }
    origin = origin.split('?')[0];
    return origin;
}
var canvasService;
var canvasCtx;
var URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm;
var URL_PROTOCOL_MATCH = /^(?:[a-z+]+:)?\/\//i;
var URL_WWW_MATCH = /^www\..*/i;
var DATA_URI = /^(data:)([^,]*),(.*)/i;
function absoluteToStylesheet(cssText, href) {
    return (cssText || '').replace(URL_IN_CSS_REF, function (origin, quote1, path1, quote2, path2, path3) {
        var filePath = path1 || path2 || path3;
        var maybeQuote = quote1 || quote2 || '';
        if (!filePath) {
            return origin;
        }
        if (URL_PROTOCOL_MATCH.test(filePath) || URL_WWW_MATCH.test(filePath)) {
            return "url(".concat(maybeQuote).concat(filePath).concat(maybeQuote, ")");
        }
        if (DATA_URI.test(filePath)) {
            return "url(".concat(maybeQuote).concat(filePath).concat(maybeQuote, ")");
        }
        if (filePath[0] === '/') {
            return "url(".concat(maybeQuote).concat(extractOrigin(href) + filePath).concat(maybeQuote, ")");
        }
        var stack = href.split('/');
        var parts = filePath.split('/');
        stack.pop();
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            if (part === '.') {
                continue;
            }
            else if (part === '..') {
                stack.pop();
            }
            else {
                stack.push(part);
            }
        }
        return "url(".concat(maybeQuote).concat(stack.join('/')).concat(maybeQuote, ")");
    });
}
var SRCSET_NOT_SPACES = /^[^ \t\n\r\u000c]+/;
var SRCSET_COMMAS_OR_SPACES = /^[, \t\n\r\u000c]+/;
function getAbsoluteSrcsetString(doc, attributeValue) {
    if (attributeValue.trim() === '') {
        return attributeValue;
    }
    var pos = 0;
    function collectCharacters(regEx) {
        var chars;
        var match = regEx.exec(attributeValue.substring(pos));
        if (match) {
            chars = match[0];
            pos += chars.length;
            return chars;
        }
        return '';
    }
    var output = [];
    while (true) {
        collectCharacters(SRCSET_COMMAS_OR_SPACES);
        if (pos >= attributeValue.length) {
            break;
        }
        var url = collectCharacters(SRCSET_NOT_SPACES);
        if (url.slice(-1) === ',') {
            url = absoluteToDoc(doc, url.substring(0, url.length - 1));
            output.push(url);
        }
        else {
            var descriptorsStr = '';
            url = absoluteToDoc(doc, url);
            var inParens = false;
            while (true) {
                var c = attributeValue.charAt(pos);
                if (c === '') {
                    output.push((url + descriptorsStr).trim());
                    break;
                }
                else if (!inParens) {
                    if (c === ',') {
                        pos += 1;
                        output.push((url + descriptorsStr).trim());
                        break;
                    }
                    else if (c === '(') {
                        inParens = true;
                    }
                }
                else {
                    if (c === ')') {
                        inParens = false;
                    }
                }
                descriptorsStr += c;
                pos += 1;
            }
        }
    }
    return output.join(', ');
}
function absoluteToDoc(doc, attributeValue) {
    if (!attributeValue || attributeValue.trim() === '') {
        return attributeValue;
    }
    var a = doc.createElement('a');
    a.href = attributeValue;
    return a.href;
}
function isSVGElement(el) {
    return Boolean(el.tagName === 'svg' || el.ownerSVGElement);
}
function getHref() {
    var a = document.createElement('a');
    a.href = '';
    return a.href;
}
function transformAttribute(doc, tagName, name, value) {
    if (!value) {
        return value;
    }
    if (name === 'src' ||
        (name === 'href' && !(tagName === 'use' && value[0] === '#'))) {
        return absoluteToDoc(doc, value);
    }
    else if (name === 'xlink:href' && value[0] !== '#') {
        return absoluteToDoc(doc, value);
    }
    else if (name === 'background' &&
        (tagName === 'table' || tagName === 'td' || tagName === 'th')) {
        return absoluteToDoc(doc, value);
    }
    else if (name === 'srcset') {
        return getAbsoluteSrcsetString(doc, value);
    }
    else if (name === 'style') {
        return absoluteToStylesheet(value, getHref());
    }
    else if (tagName === 'object' && name === 'data') {
        return absoluteToDoc(doc, value);
    }
    return value;
}
function ignoreAttribute(tagName, name, _value) {
    return (tagName === 'video' || tagName === 'audio') && name === 'autoplay';
}
function _isBlockedElement(element, blockClass, blockSelector) {
    try {
        if (typeof blockClass === 'string') {
            if (element.classList.contains(blockClass)) {
                return true;
            }
        }
        else {
            for (var eIndex = element.classList.length; eIndex--;) {
                var className = element.classList[eIndex];
                if (blockClass.test(className)) {
                    return true;
                }
            }
        }
        if (blockSelector) {
            return element.matches(blockSelector);
        }
    }
    catch (e) {
    }
    return false;
}
function classMatchesRegex(node, regex, checkAncestors) {
    if (!node)
        return false;
    if (node.nodeType !== node.ELEMENT_NODE) {
        if (!checkAncestors)
            return false;
        return classMatchesRegex(node.parentNode, regex, checkAncestors);
    }
    for (var eIndex = node.classList.length; eIndex--;) {
        var className = node.classList[eIndex];
        if (regex.test(className)) {
            return true;
        }
    }
    if (!checkAncestors)
        return false;
    return classMatchesRegex(node.parentNode, regex, checkAncestors);
}
function needMaskingText(node, maskTextClass, maskTextSelector) {
    try {
        var el = node.nodeType === node.ELEMENT_NODE
            ? node
            : node.parentElement;
        if (el === null)
            return false;
        if (typeof maskTextClass === 'string') {
            if (el.classList.contains(maskTextClass))
                return true;
            if (el.closest(".".concat(maskTextClass)))
                return true;
        }
        else {
            if (classMatchesRegex(el, maskTextClass, true))
                return true;
        }
        if (maskTextSelector) {
            if (el.matches(maskTextSelector))
                return true;
            if (el.closest(maskTextSelector))
                return true;
        }
    }
    catch (e) {
    }
    return false;
}
function onceIframeLoaded(iframeEl, listener, iframeLoadTimeout) {
    var win = iframeEl.contentWindow;
    if (!win) {
        return;
    }
    var fired = false;
    var readyState;
    try {
        readyState = win.document.readyState;
    }
    catch (error) {
        return;
    }
    if (readyState !== 'complete') {
        var timer_1 = setTimeout(function () {
            if (!fired) {
                listener();
                fired = true;
            }
        }, iframeLoadTimeout);
        iframeEl.addEventListener('load', function () {
            clearTimeout(timer_1);
            fired = true;
            listener();
        });
        return;
    }
    var blankUrl = 'about:blank';
    if (win.location.href !== blankUrl ||
        iframeEl.src === blankUrl ||
        iframeEl.src === '') {
        setTimeout(listener, 0);
        return iframeEl.addEventListener('load', listener);
    }
    iframeEl.addEventListener('load', listener);
}
function onceStylesheetLoaded(link, listener, styleSheetLoadTimeout) {
    var fired = false;
    var styleSheetLoaded;
    try {
        styleSheetLoaded = link.sheet;
    }
    catch (error) {
        return;
    }
    if (styleSheetLoaded)
        return;
    var timer = setTimeout(function () {
        if (!fired) {
            listener();
            fired = true;
        }
    }, styleSheetLoadTimeout);
    link.addEventListener('load', function () {
        clearTimeout(timer);
        fired = true;
        listener();
    });
}
function serializeNode(n, options) {
    var doc = options.doc, mirror = options.mirror, blockClass = options.blockClass, blockSelector = options.blockSelector, maskTextClass = options.maskTextClass, maskTextSelector = options.maskTextSelector, inlineStylesheet = options.inlineStylesheet, _a = options.maskInputOptions, maskInputOptions = _a === void 0 ? {} : _a, maskTextFn = options.maskTextFn, maskInputFn = options.maskInputFn, _b = options.dataURLOptions, dataURLOptions = _b === void 0 ? {} : _b, inlineImages = options.inlineImages, recordCanvas = options.recordCanvas, keepIframeSrcFn = options.keepIframeSrcFn, _c = options.newlyAddedElement, newlyAddedElement = _c === void 0 ? false : _c;
    var rootId = getRootId(doc, mirror);
    switch (n.nodeType) {
        case n.DOCUMENT_NODE:
            if (n.compatMode !== 'CSS1Compat') {
                return {
                    type: NodeType.Document,
                    childNodes: [],
                    compatMode: n.compatMode
                };
            }
            else {
                return {
                    type: NodeType.Document,
                    childNodes: []
                };
            }
        case n.DOCUMENT_TYPE_NODE:
            return {
                type: NodeType.DocumentType,
                name: n.name,
                publicId: n.publicId,
                systemId: n.systemId,
                rootId: rootId
            };
        case n.ELEMENT_NODE:
            return serializeElementNode(n, {
                doc: doc,
                blockClass: blockClass,
                blockSelector: blockSelector,
                inlineStylesheet: inlineStylesheet,
                maskInputOptions: maskInputOptions,
                maskInputFn: maskInputFn,
                dataURLOptions: dataURLOptions,
                inlineImages: inlineImages,
                recordCanvas: recordCanvas,
                keepIframeSrcFn: keepIframeSrcFn,
                newlyAddedElement: newlyAddedElement,
                rootId: rootId
            });
        case n.TEXT_NODE:
            return serializeTextNode(n, {
                maskTextClass: maskTextClass,
                maskTextSelector: maskTextSelector,
                maskTextFn: maskTextFn,
                rootId: rootId
            });
        case n.CDATA_SECTION_NODE:
            return {
                type: NodeType.CDATA,
                textContent: '',
                rootId: rootId
            };
        case n.COMMENT_NODE:
            return {
                type: NodeType.Comment,
                textContent: n.textContent || '',
                rootId: rootId
            };
        default:
            return false;
    }
}
function getRootId(doc, mirror) {
    if (!mirror.hasNode(doc))
        return undefined;
    var docId = mirror.getId(doc);
    return docId === 1 ? undefined : docId;
}
function serializeTextNode(n, options) {
    var _a;
    var maskTextClass = options.maskTextClass, maskTextSelector = options.maskTextSelector, maskTextFn = options.maskTextFn, rootId = options.rootId;
    var parentTagName = n.parentNode && n.parentNode.tagName;
    var textContent = n.textContent;
    var isStyle = parentTagName === 'STYLE' ? true : undefined;
    var isScript = parentTagName === 'SCRIPT' ? true : undefined;
    if (isStyle && textContent) {
        try {
            if (n.nextSibling || n.previousSibling) {
            }
            else if ((_a = n.parentNode.sheet) === null || _a === void 0 ? void 0 : _a.cssRules) {
                textContent = stringifyStylesheet(n.parentNode.sheet);
            }
        }
        catch (err) {
            console.warn("Cannot get CSS styles from text's parentNode. Error: ".concat(err), n);
        }
        textContent = absoluteToStylesheet(textContent, getHref());
    }
    if (isScript) {
        textContent = 'SCRIPT_PLACEHOLDER';
    }
    if (!isStyle &&
        !isScript &&
        textContent &&
        needMaskingText(n, maskTextClass, maskTextSelector)) {
        textContent = maskTextFn
            ? maskTextFn(textContent)
            : textContent.replace(/[\S]/g, '*');
    }
    return {
        type: NodeType.Text,
        textContent: textContent || '',
        isStyle: isStyle,
        rootId: rootId
    };
}
function serializeElementNode(n, options) {
    var doc = options.doc, blockClass = options.blockClass, blockSelector = options.blockSelector, inlineStylesheet = options.inlineStylesheet, _a = options.maskInputOptions, maskInputOptions = _a === void 0 ? {} : _a, maskInputFn = options.maskInputFn, _b = options.dataURLOptions, dataURLOptions = _b === void 0 ? {} : _b, inlineImages = options.inlineImages, recordCanvas = options.recordCanvas, keepIframeSrcFn = options.keepIframeSrcFn, _c = options.newlyAddedElement, newlyAddedElement = _c === void 0 ? false : _c, rootId = options.rootId;
    var needBlock = _isBlockedElement(n, blockClass, blockSelector);
    var tagName = getValidTagName(n);
    var attributes = {};
    var len = n.attributes.length;
    for (var i = 0; i < len; i++) {
        var attr = n.attributes[i];
        if (!ignoreAttribute(tagName, attr.name, attr.value)) {
            attributes[attr.name] = transformAttribute(doc, tagName, toLowerCase(attr.name), attr.value);
        }
    }
    if (tagName === 'link' && inlineStylesheet) {
        var stylesheet = Array.from(doc.styleSheets).find(function (s) {
            return s.href === n.href;
        });
        var cssText = null;
        if (stylesheet) {
            cssText = stringifyStylesheet(stylesheet);
        }
        if (cssText) {
            delete attributes.rel;
            delete attributes.href;
            attributes._cssText = absoluteToStylesheet(cssText, stylesheet.href);
        }
    }
    if (tagName === 'style' &&
        n.sheet &&
        !(n.innerText || n.textContent || '').trim().length) {
        var cssText = stringifyStylesheet(n.sheet);
        if (cssText) {
            attributes._cssText = absoluteToStylesheet(cssText, getHref());
        }
    }
    if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
        var value = n.value;
        var checked = n.checked;
        if (attributes.type !== 'radio' &&
            attributes.type !== 'checkbox' &&
            attributes.type !== 'submit' &&
            attributes.type !== 'button' &&
            value) {
            var type = getInputType(n);
            attributes.value = maskInputValue({
                element: n,
                type: type,
                tagName: tagName,
                value: value,
                maskInputOptions: maskInputOptions,
                maskInputFn: maskInputFn
            });
        }
        else if (checked) {
            attributes.checked = checked;
        }
    }
    if (tagName === 'option') {
        if (n.selected && !maskInputOptions['select']) {
            attributes.selected = true;
        }
        else {
            delete attributes.selected;
        }
    }
    if (tagName === 'canvas' && recordCanvas) {
        if (n.__context === '2d') {
            if (!is2DCanvasBlank(n)) {
                attributes.rr_dataURL = n.toDataURL(dataURLOptions.type, dataURLOptions.quality);
            }
        }
        else if (!('__context' in n)) {
            var canvasDataURL = n.toDataURL(dataURLOptions.type, dataURLOptions.quality);
            var blankCanvas = document.createElement('canvas');
            blankCanvas.width = n.width;
            blankCanvas.height = n.height;
            var blankCanvasDataURL = blankCanvas.toDataURL(dataURLOptions.type, dataURLOptions.quality);
            if (canvasDataURL !== blankCanvasDataURL) {
                attributes.rr_dataURL = canvasDataURL;
            }
        }
    }
    if (tagName === 'img' && inlineImages) {
        if (!canvasService) {
            canvasService = doc.createElement('canvas');
            canvasCtx = canvasService.getContext('2d');
        }
        var image_1 = n;
        var oldValue_1 = image_1.crossOrigin;
        image_1.crossOrigin = 'anonymous';
        var recordInlineImage_1 = function () {
            image_1.removeEventListener('load', recordInlineImage_1);
            try {
                canvasService.width = image_1.naturalWidth;
                canvasService.height = image_1.naturalHeight;
                canvasCtx.drawImage(image_1, 0, 0);
                attributes.rr_dataURL = canvasService.toDataURL(dataURLOptions.type, dataURLOptions.quality);
            }
            catch (err) {
                console.warn("Cannot inline img src=".concat(image_1.currentSrc, "! Error: ").concat(err));
            }
            oldValue_1
                ? (attributes.crossOrigin = oldValue_1)
                : image_1.removeAttribute('crossorigin');
        };
        if (image_1.complete && image_1.naturalWidth !== 0)
            recordInlineImage_1();
        else
            image_1.addEventListener('load', recordInlineImage_1);
    }
    if (tagName === 'audio' || tagName === 'video') {
        attributes.rr_mediaState = n.paused
            ? 'paused'
            : 'played';
        attributes.rr_mediaCurrentTime = n.currentTime;
    }
    if (!newlyAddedElement) {
        if (n.scrollLeft) {
            attributes.rr_scrollLeft = n.scrollLeft;
        }
        if (n.scrollTop) {
            attributes.rr_scrollTop = n.scrollTop;
        }
    }
    if (needBlock) {
        var _d = n.getBoundingClientRect(), width = _d.width, height = _d.height;
        attributes = {
            "class": attributes["class"],
            rr_width: "".concat(width, "px"),
            rr_height: "".concat(height, "px")
        };
    }
    if (tagName === 'iframe' && !keepIframeSrcFn(attributes.src)) {
        if (!n.contentDocument) {
            attributes.rr_src = attributes.src;
        }
        delete attributes.src;
    }
    return {
        type: NodeType.Element,
        tagName: tagName,
        attributes: attributes,
        childNodes: [],
        isSVG: isSVGElement(n) || undefined,
        needBlock: needBlock,
        rootId: rootId
    };
}
function lowerIfExists(maybeAttr) {
    if (maybeAttr === undefined || maybeAttr === null) {
        return '';
    }
    else {
        return maybeAttr.toLowerCase();
    }
}
function slimDOMExcluded(sn, slimDOMOptions) {
    if (slimDOMOptions.comment && sn.type === NodeType.Comment) {
        return true;
    }
    else if (sn.type === NodeType.Element) {
        if (slimDOMOptions.script &&
            (sn.tagName === 'script' ||
                (sn.tagName === 'link' &&
                    (sn.attributes.rel === 'preload' ||
                        sn.attributes.rel === 'modulepreload') &&
                    sn.attributes.as === 'script') ||
                (sn.tagName === 'link' &&
                    sn.attributes.rel === 'prefetch' &&
                    typeof sn.attributes.href === 'string' &&
                    sn.attributes.href.endsWith('.js')))) {
            return true;
        }
        else if (slimDOMOptions.headFavicon &&
            ((sn.tagName === 'link' && sn.attributes.rel === 'shortcut icon') ||
                (sn.tagName === 'meta' &&
                    (lowerIfExists(sn.attributes.name).match(/^msapplication-tile(image|color)$/) ||
                        lowerIfExists(sn.attributes.name) === 'application-name' ||
                        lowerIfExists(sn.attributes.rel) === 'icon' ||
                        lowerIfExists(sn.attributes.rel) === 'apple-touch-icon' ||
                        lowerIfExists(sn.attributes.rel) === 'shortcut icon')))) {
            return true;
        }
        else if (sn.tagName === 'meta') {
            if (slimDOMOptions.headMetaDescKeywords &&
                lowerIfExists(sn.attributes.name).match(/^description|keywords$/)) {
                return true;
            }
            else if (slimDOMOptions.headMetaSocial &&
                (lowerIfExists(sn.attributes.property).match(/^(og|twitter|fb):/) ||
                    lowerIfExists(sn.attributes.name).match(/^(og|twitter):/) ||
                    lowerIfExists(sn.attributes.name) === 'pinterest')) {
                return true;
            }
            else if (slimDOMOptions.headMetaRobots &&
                (lowerIfExists(sn.attributes.name) === 'robots' ||
                    lowerIfExists(sn.attributes.name) === 'googlebot' ||
                    lowerIfExists(sn.attributes.name) === 'bingbot')) {
                return true;
            }
            else if (slimDOMOptions.headMetaHttpEquiv &&
                sn.attributes['http-equiv'] !== undefined) {
                return true;
            }
            else if (slimDOMOptions.headMetaAuthorship &&
                (lowerIfExists(sn.attributes.name) === 'author' ||
                    lowerIfExists(sn.attributes.name) === 'generator' ||
                    lowerIfExists(sn.attributes.name) === 'framework' ||
                    lowerIfExists(sn.attributes.name) === 'publisher' ||
                    lowerIfExists(sn.attributes.name) === 'progid' ||
                    lowerIfExists(sn.attributes.property).match(/^article:/) ||
                    lowerIfExists(sn.attributes.property).match(/^product:/))) {
                return true;
            }
            else if (slimDOMOptions.headMetaVerification &&
                (lowerIfExists(sn.attributes.name) === 'google-site-verification' ||
                    lowerIfExists(sn.attributes.name) === 'yandex-verification' ||
                    lowerIfExists(sn.attributes.name) === 'csrf-token' ||
                    lowerIfExists(sn.attributes.name) === 'p:domain_verify' ||
                    lowerIfExists(sn.attributes.name) === 'verify-v1' ||
                    lowerIfExists(sn.attributes.name) === 'verification' ||
                    lowerIfExists(sn.attributes.name) === 'shopify-checkout-api-token')) {
                return true;
            }
        }
    }
    return false;
}
function serializeNodeWithId(n, options) {
    var doc = options.doc, mirror = options.mirror, blockClass = options.blockClass, blockSelector = options.blockSelector, maskTextClass = options.maskTextClass, maskTextSelector = options.maskTextSelector, _a = options.skipChild, skipChild = _a === void 0 ? false : _a, _b = options.inlineStylesheet, inlineStylesheet = _b === void 0 ? true : _b, _c = options.maskInputOptions, maskInputOptions = _c === void 0 ? {} : _c, maskTextFn = options.maskTextFn, maskInputFn = options.maskInputFn, slimDOMOptions = options.slimDOMOptions, _d = options.dataURLOptions, dataURLOptions = _d === void 0 ? {} : _d, _e = options.inlineImages, inlineImages = _e === void 0 ? false : _e, _f = options.recordCanvas, recordCanvas = _f === void 0 ? false : _f, onSerialize = options.onSerialize, onIframeLoad = options.onIframeLoad, _g = options.iframeLoadTimeout, iframeLoadTimeout = _g === void 0 ? 5000 : _g, onStylesheetLoad = options.onStylesheetLoad, _h = options.stylesheetLoadTimeout, stylesheetLoadTimeout = _h === void 0 ? 5000 : _h, _j = options.keepIframeSrcFn, keepIframeSrcFn = _j === void 0 ? function () { return false; } : _j, _k = options.newlyAddedElement, newlyAddedElement = _k === void 0 ? false : _k;
    var _l = options.preserveWhiteSpace, preserveWhiteSpace = _l === void 0 ? true : _l;
    var _serializedNode = serializeNode(n, {
        doc: doc,
        mirror: mirror,
        blockClass: blockClass,
        blockSelector: blockSelector,
        maskTextClass: maskTextClass,
        maskTextSelector: maskTextSelector,
        inlineStylesheet: inlineStylesheet,
        maskInputOptions: maskInputOptions,
        maskTextFn: maskTextFn,
        maskInputFn: maskInputFn,
        dataURLOptions: dataURLOptions,
        inlineImages: inlineImages,
        recordCanvas: recordCanvas,
        keepIframeSrcFn: keepIframeSrcFn,
        newlyAddedElement: newlyAddedElement
    });
    if (!_serializedNode) {
        console.warn(n, 'not serialized');
        return null;
    }
    var id;
    if (mirror.hasNode(n)) {
        id = mirror.getId(n);
    }
    else if (slimDOMExcluded(_serializedNode, slimDOMOptions) ||
        (!preserveWhiteSpace &&
            _serializedNode.type === NodeType.Text &&
            !_serializedNode.isStyle &&
            !_serializedNode.textContent.replace(/^\s+|\s+$/gm, '').length)) {
        id = IGNORED_NODE;
    }
    else {
        id = genId();
    }
    var serializedNode = Object.assign(_serializedNode, { id: id });
    mirror.add(n, serializedNode);
    if (id === IGNORED_NODE) {
        return null;
    }
    if (onSerialize) {
        onSerialize(n);
    }
    var recordChild = !skipChild;
    if (serializedNode.type === NodeType.Element) {
        recordChild = recordChild && !serializedNode.needBlock;
        delete serializedNode.needBlock;
        var shadowRoot = n.shadowRoot;
        if (shadowRoot && isNativeShadowDom(shadowRoot))
            serializedNode.isShadowHost = true;
    }
    if ((serializedNode.type === NodeType.Document ||
        serializedNode.type === NodeType.Element) &&
        recordChild) {
        if (slimDOMOptions.headWhitespace &&
            serializedNode.type === NodeType.Element &&
            serializedNode.tagName === 'head') {
            preserveWhiteSpace = false;
        }
        var bypassOptions = {
            doc: doc,
            mirror: mirror,
            blockClass: blockClass,
            blockSelector: blockSelector,
            maskTextClass: maskTextClass,
            maskTextSelector: maskTextSelector,
            skipChild: skipChild,
            inlineStylesheet: inlineStylesheet,
            maskInputOptions: maskInputOptions,
            maskTextFn: maskTextFn,
            maskInputFn: maskInputFn,
            slimDOMOptions: slimDOMOptions,
            dataURLOptions: dataURLOptions,
            inlineImages: inlineImages,
            recordCanvas: recordCanvas,
            preserveWhiteSpace: preserveWhiteSpace,
            onSerialize: onSerialize,
            onIframeLoad: onIframeLoad,
            iframeLoadTimeout: iframeLoadTimeout,
            onStylesheetLoad: onStylesheetLoad,
            stylesheetLoadTimeout: stylesheetLoadTimeout,
            keepIframeSrcFn: keepIframeSrcFn
        };
        for (var _i = 0, _m = Array.from(n.childNodes); _i < _m.length; _i++) {
            var childN = _m[_i];
            var serializedChildNode = serializeNodeWithId(childN, bypassOptions);
            if (serializedChildNode) {
                serializedNode.childNodes.push(serializedChildNode);
            }
        }
        if (isElement(n) && n.shadowRoot) {
            for (var _o = 0, _p = Array.from(n.shadowRoot.childNodes); _o < _p.length; _o++) {
                var childN = _p[_o];
                var serializedChildNode = serializeNodeWithId(childN, bypassOptions);
                if (serializedChildNode) {
                    isNativeShadowDom(n.shadowRoot) &&
                        (serializedChildNode.isShadow = true);
                    serializedNode.childNodes.push(serializedChildNode);
                }
            }
        }
    }
    if (n.parentNode &&
        isShadowRoot(n.parentNode) &&
        isNativeShadowDom(n.parentNode)) {
        serializedNode.isShadow = true;
    }
    if (serializedNode.type === NodeType.Element &&
        serializedNode.tagName === 'iframe') {
        onceIframeLoaded(n, function () {
            var iframeDoc = n.contentDocument;
            if (iframeDoc && onIframeLoad) {
                var serializedIframeNode = serializeNodeWithId(iframeDoc, {
                    doc: iframeDoc,
                    mirror: mirror,
                    blockClass: blockClass,
                    blockSelector: blockSelector,
                    maskTextClass: maskTextClass,
                    maskTextSelector: maskTextSelector,
                    skipChild: false,
                    inlineStylesheet: inlineStylesheet,
                    maskInputOptions: maskInputOptions,
                    maskTextFn: maskTextFn,
                    maskInputFn: maskInputFn,
                    slimDOMOptions: slimDOMOptions,
                    dataURLOptions: dataURLOptions,
                    inlineImages: inlineImages,
                    recordCanvas: recordCanvas,
                    preserveWhiteSpace: preserveWhiteSpace,
                    onSerialize: onSerialize,
                    onIframeLoad: onIframeLoad,
                    iframeLoadTimeout: iframeLoadTimeout,
                    onStylesheetLoad: onStylesheetLoad,
                    stylesheetLoadTimeout: stylesheetLoadTimeout,
                    keepIframeSrcFn: keepIframeSrcFn
                });
                if (serializedIframeNode) {
                    onIframeLoad(n, serializedIframeNode);
                }
            }
        }, iframeLoadTimeout);
    }
    if (serializedNode.type === NodeType.Element &&
        serializedNode.tagName === 'link' &&
        serializedNode.attributes.rel === 'stylesheet') {
        onceStylesheetLoaded(n, function () {
            if (onStylesheetLoad) {
                var serializedLinkNode = serializeNodeWithId(n, {
                    doc: doc,
                    mirror: mirror,
                    blockClass: blockClass,
                    blockSelector: blockSelector,
                    maskTextClass: maskTextClass,
                    maskTextSelector: maskTextSelector,
                    skipChild: false,
                    inlineStylesheet: inlineStylesheet,
                    maskInputOptions: maskInputOptions,
                    maskTextFn: maskTextFn,
                    maskInputFn: maskInputFn,
                    slimDOMOptions: slimDOMOptions,
                    dataURLOptions: dataURLOptions,
                    inlineImages: inlineImages,
                    recordCanvas: recordCanvas,
                    preserveWhiteSpace: preserveWhiteSpace,
                    onSerialize: onSerialize,
                    onIframeLoad: onIframeLoad,
                    iframeLoadTimeout: iframeLoadTimeout,
                    onStylesheetLoad: onStylesheetLoad,
                    stylesheetLoadTimeout: stylesheetLoadTimeout,
                    keepIframeSrcFn: keepIframeSrcFn
                });
                if (serializedLinkNode) {
                    onStylesheetLoad(n, serializedLinkNode);
                }
            }
        }, stylesheetLoadTimeout);
    }
    return serializedNode;
}
function snapshot(n, options) {
    var _a = options || {}, _b = _a.mirror, mirror = _b === void 0 ? new Mirror() : _b, _c = _a.blockClass, blockClass = _c === void 0 ? 'rr-block' : _c, _d = _a.blockSelector, blockSelector = _d === void 0 ? null : _d, _e = _a.maskTextClass, maskTextClass = _e === void 0 ? 'rr-mask' : _e, _f = _a.maskTextSelector, maskTextSelector = _f === void 0 ? null : _f, _g = _a.inlineStylesheet, inlineStylesheet = _g === void 0 ? true : _g, _h = _a.inlineImages, inlineImages = _h === void 0 ? false : _h, _j = _a.recordCanvas, recordCanvas = _j === void 0 ? false : _j, _k = _a.maskAllInputs, maskAllInputs = _k === void 0 ? false : _k, maskTextFn = _a.maskTextFn, maskInputFn = _a.maskInputFn, _l = _a.slimDOM, slimDOM = _l === void 0 ? false : _l, dataURLOptions = _a.dataURLOptions, preserveWhiteSpace = _a.preserveWhiteSpace, onSerialize = _a.onSerialize, onIframeLoad = _a.onIframeLoad, iframeLoadTimeout = _a.iframeLoadTimeout, onStylesheetLoad = _a.onStylesheetLoad, stylesheetLoadTimeout = _a.stylesheetLoadTimeout, _m = _a.keepIframeSrcFn, keepIframeSrcFn = _m === void 0 ? function () { return false; } : _m;
    var maskInputOptions = maskAllInputs === true
        ? {
            color: true,
            date: true,
            'datetime-local': true,
            email: true,
            month: true,
            number: true,
            range: true,
            search: true,
            tel: true,
            text: true,
            time: true,
            url: true,
            week: true,
            textarea: true,
            select: true,
            password: true
        }
        : maskAllInputs === false
            ? {
                password: true
            }
            : maskAllInputs;
    var slimDOMOptions = slimDOM === true || slimDOM === 'all'
        ?
            {
                script: true,
                comment: true,
                headFavicon: true,
                headWhitespace: true,
                headMetaDescKeywords: slimDOM === 'all',
                headMetaSocial: true,
                headMetaRobots: true,
                headMetaHttpEquiv: true,
                headMetaAuthorship: true,
                headMetaVerification: true
            }
        : slimDOM === false
            ? {}
            : slimDOM;
    return serializeNodeWithId(n, {
        doc: n,
        mirror: mirror,
        blockClass: blockClass,
        blockSelector: blockSelector,
        maskTextClass: maskTextClass,
        maskTextSelector: maskTextSelector,
        skipChild: false,
        inlineStylesheet: inlineStylesheet,
        maskInputOptions: maskInputOptions,
        maskTextFn: maskTextFn,
        maskInputFn: maskInputFn,
        slimDOMOptions: slimDOMOptions,
        dataURLOptions: dataURLOptions,
        inlineImages: inlineImages,
        recordCanvas: recordCanvas,
        preserveWhiteSpace: preserveWhiteSpace,
        onSerialize: onSerialize,
        onIframeLoad: onIframeLoad,
        iframeLoadTimeout: iframeLoadTimeout,
        onStylesheetLoad: onStylesheetLoad,
        stylesheetLoadTimeout: stylesheetLoadTimeout,
        keepIframeSrcFn: keepIframeSrcFn,
        newlyAddedElement: false
    });
}
function visitSnapshot(node, onVisit) {
    function walk(current) {
        onVisit(current);
        if (current.type === NodeType.Document ||
            current.type === NodeType.Element) {
            current.childNodes.forEach(walk);
        }
    }
    walk(node);
}
function cleanupSnapshot() {
    _id = 1;
}

var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
function parse(css, options) {
    if (options === void 0) { options = {}; }
    var lineno = 1;
    var column = 1;
    function updatePosition(str) {
        var lines = str.match(/\n/g);
        if (lines) {
            lineno += lines.length;
        }
        var i = str.lastIndexOf('\n');
        column = i === -1 ? column + str.length : str.length - i;
    }
    function position() {
        var start = { line: lineno, column: column };
        return function (node) {
            node.position = new Position(start);
            whitespace();
            return node;
        };
    }
    var Position = (function () {
        function Position(start) {
            this.start = start;
            this.end = { line: lineno, column: column };
            this.source = options.source;
        }
        return Position;
    }());
    Position.prototype.content = css;
    var errorsList = [];
    function error(msg) {
        var err = new Error("".concat(options.source || '', ":").concat(lineno, ":").concat(column, ": ").concat(msg));
        err.reason = msg;
        err.filename = options.source;
        err.line = lineno;
        err.column = column;
        err.source = css;
        if (options.silent) {
            errorsList.push(err);
        }
        else {
            throw err;
        }
    }
    function stylesheet() {
        var rulesList = rules();
        return {
            type: 'stylesheet',
            stylesheet: {
                source: options.source,
                rules: rulesList,
                parsingErrors: errorsList
            }
        };
    }
    function open() {
        return match(/^{\s*/);
    }
    function close() {
        return match(/^}/);
    }
    function rules() {
        var node;
        var rules = [];
        whitespace();
        comments(rules);
        while (css.length && css.charAt(0) !== '}' && (node = atrule() || rule())) {
            if (node) {
                rules.push(node);
                comments(rules);
            }
        }
        return rules;
    }
    function match(re) {
        var m = re.exec(css);
        if (!m) {
            return;
        }
        var str = m[0];
        updatePosition(str);
        css = css.slice(str.length);
        return m;
    }
    function whitespace() {
        match(/^\s*/);
    }
    function comments(rules) {
        if (rules === void 0) { rules = []; }
        var c;
        while ((c = comment())) {
            if (c) {
                rules.push(c);
            }
            c = comment();
        }
        return rules;
    }
    function comment() {
        var pos = position();
        if ('/' !== css.charAt(0) || '*' !== css.charAt(1)) {
            return;
        }
        var i = 2;
        while ('' !== css.charAt(i) &&
            ('*' !== css.charAt(i) || '/' !== css.charAt(i + 1))) {
            ++i;
        }
        i += 2;
        if ('' === css.charAt(i - 1)) {
            return error('End of comment missing');
        }
        var str = css.slice(2, i - 2);
        column += 2;
        updatePosition(str);
        css = css.slice(i);
        column += 2;
        return pos({
            type: 'comment',
            comment: str
        });
    }
    function selector() {
        var m = match(/^([^{]+)/);
        if (!m) {
            return;
        }
        return trim(m[0])
            .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '')
            .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (m) {
            return m.replace(/,/g, '\u200C');
        })
            .split(/\s*(?![^(]*\)),\s*/)
            .map(function (s) {
            return s.replace(/\u200C/g, ',');
        });
    }
    function declaration() {
        var pos = position();
        var propMatch = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
        if (!propMatch) {
            return;
        }
        var prop = trim(propMatch[0]);
        if (!match(/^:\s*/)) {
            return error("property missing ':'");
        }
        var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);
        var ret = pos({
            type: 'declaration',
            property: prop.replace(commentre, ''),
            value: val ? trim(val[0]).replace(commentre, '') : ''
        });
        match(/^[;\s]*/);
        return ret;
    }
    function declarations() {
        var decls = [];
        if (!open()) {
            return error("missing '{'");
        }
        comments(decls);
        var decl;
        while ((decl = declaration())) {
            if (decl !== false) {
                decls.push(decl);
                comments(decls);
            }
            decl = declaration();
        }
        if (!close()) {
            return error("missing '}'");
        }
        return decls;
    }
    function keyframe() {
        var m;
        var vals = [];
        var pos = position();
        while ((m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/))) {
            vals.push(m[1]);
            match(/^,\s*/);
        }
        if (!vals.length) {
            return;
        }
        return pos({
            type: 'keyframe',
            values: vals,
            declarations: declarations()
        });
    }
    function atkeyframes() {
        var pos = position();
        var m = match(/^@([-\w]+)?keyframes\s*/);
        if (!m) {
            return;
        }
        var vendor = m[1];
        m = match(/^([-\w]+)\s*/);
        if (!m) {
            return error('@keyframes missing name');
        }
        var name = m[1];
        if (!open()) {
            return error("@keyframes missing '{'");
        }
        var frame;
        var frames = comments();
        while ((frame = keyframe())) {
            frames.push(frame);
            frames = frames.concat(comments());
        }
        if (!close()) {
            return error("@keyframes missing '}'");
        }
        return pos({
            type: 'keyframes',
            name: name,
            vendor: vendor,
            keyframes: frames
        });
    }
    function atsupports() {
        var pos = position();
        var m = match(/^@supports *([^{]+)/);
        if (!m) {
            return;
        }
        var supports = trim(m[1]);
        if (!open()) {
            return error("@supports missing '{'");
        }
        var style = comments().concat(rules());
        if (!close()) {
            return error("@supports missing '}'");
        }
        return pos({
            type: 'supports',
            supports: supports,
            rules: style
        });
    }
    function athost() {
        var pos = position();
        var m = match(/^@host\s*/);
        if (!m) {
            return;
        }
        if (!open()) {
            return error("@host missing '{'");
        }
        var style = comments().concat(rules());
        if (!close()) {
            return error("@host missing '}'");
        }
        return pos({
            type: 'host',
            rules: style
        });
    }
    function atmedia() {
        var pos = position();
        var m = match(/^@media *([^{]+)/);
        if (!m) {
            return;
        }
        var media = trim(m[1]);
        if (!open()) {
            return error("@media missing '{'");
        }
        var style = comments().concat(rules());
        if (!close()) {
            return error("@media missing '}'");
        }
        return pos({
            type: 'media',
            media: media,
            rules: style
        });
    }
    function atcustommedia() {
        var pos = position();
        var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
        if (!m) {
            return;
        }
        return pos({
            type: 'custom-media',
            name: trim(m[1]),
            media: trim(m[2])
        });
    }
    function atpage() {
        var pos = position();
        var m = match(/^@page */);
        if (!m) {
            return;
        }
        var sel = selector() || [];
        if (!open()) {
            return error("@page missing '{'");
        }
        var decls = comments();
        var decl;
        while ((decl = declaration())) {
            decls.push(decl);
            decls = decls.concat(comments());
        }
        if (!close()) {
            return error("@page missing '}'");
        }
        return pos({
            type: 'page',
            selectors: sel,
            declarations: decls
        });
    }
    function atdocument() {
        var pos = position();
        var m = match(/^@([-\w]+)?document *([^{]+)/);
        if (!m) {
            return;
        }
        var vendor = trim(m[1]);
        var doc = trim(m[2]);
        if (!open()) {
            return error("@document missing '{'");
        }
        var style = comments().concat(rules());
        if (!close()) {
            return error("@document missing '}'");
        }
        return pos({
            type: 'document',
            document: doc,
            vendor: vendor,
            rules: style
        });
    }
    function atfontface() {
        var pos = position();
        var m = match(/^@font-face\s*/);
        if (!m) {
            return;
        }
        if (!open()) {
            return error("@font-face missing '{'");
        }
        var decls = comments();
        var decl;
        while ((decl = declaration())) {
            decls.push(decl);
            decls = decls.concat(comments());
        }
        if (!close()) {
            return error("@font-face missing '}'");
        }
        return pos({
            type: 'font-face',
            declarations: decls
        });
    }
    var atimport = _compileAtrule('import');
    var atcharset = _compileAtrule('charset');
    var atnamespace = _compileAtrule('namespace');
    function _compileAtrule(name) {
        var re = new RegExp('^@' + name + '\\s*([^;]+);');
        return function () {
            var pos = position();
            var m = match(re);
            if (!m) {
                return;
            }
            var ret = { type: name };
            ret[name] = m[1].trim();
            return pos(ret);
        };
    }
    function atrule() {
        if (css[0] !== '@') {
            return;
        }
        return (atkeyframes() ||
            atmedia() ||
            atcustommedia() ||
            atsupports() ||
            atimport() ||
            atcharset() ||
            atnamespace() ||
            atdocument() ||
            atpage() ||
            athost() ||
            atfontface());
    }
    function rule() {
        var pos = position();
        var sel = selector();
        if (!sel) {
            return error('selector missing');
        }
        comments();
        return pos({
            type: 'rule',
            selectors: sel,
            declarations: declarations()
        });
    }
    return addParent(stylesheet());
}
function trim(str) {
    return str ? str.replace(/^\s+|\s+$/g, '') : '';
}
function addParent(obj, parent) {
    var isNode = obj && typeof obj.type === 'string';
    var childParent = isNode ? obj : parent;
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var k = _a[_i];
        var value = obj[k];
        if (Array.isArray(value)) {
            value.forEach(function (v) {
                addParent(v, childParent);
            });
        }
        else if (value && typeof value === 'object') {
            addParent(value, childParent);
        }
    }
    if (isNode) {
        Object.defineProperty(obj, 'parent', {
            configurable: true,
            writable: true,
            enumerable: false,
            value: parent || null
        });
    }
    return obj;
}

var tagMap = {
    script: 'noscript',
    altglyph: 'altGlyph',
    altglyphdef: 'altGlyphDef',
    altglyphitem: 'altGlyphItem',
    animatecolor: 'animateColor',
    animatemotion: 'animateMotion',
    animatetransform: 'animateTransform',
    clippath: 'clipPath',
    feblend: 'feBlend',
    fecolormatrix: 'feColorMatrix',
    fecomponenttransfer: 'feComponentTransfer',
    fecomposite: 'feComposite',
    feconvolvematrix: 'feConvolveMatrix',
    fediffuselighting: 'feDiffuseLighting',
    fedisplacementmap: 'feDisplacementMap',
    fedistantlight: 'feDistantLight',
    fedropshadow: 'feDropShadow',
    feflood: 'feFlood',
    fefunca: 'feFuncA',
    fefuncb: 'feFuncB',
    fefuncg: 'feFuncG',
    fefuncr: 'feFuncR',
    fegaussianblur: 'feGaussianBlur',
    feimage: 'feImage',
    femerge: 'feMerge',
    femergenode: 'feMergeNode',
    femorphology: 'feMorphology',
    feoffset: 'feOffset',
    fepointlight: 'fePointLight',
    fespecularlighting: 'feSpecularLighting',
    fespotlight: 'feSpotLight',
    fetile: 'feTile',
    feturbulence: 'feTurbulence',
    foreignobject: 'foreignObject',
    glyphref: 'glyphRef',
    lineargradient: 'linearGradient',
    radialgradient: 'radialGradient'
};
function getTagName(n) {
    var tagName = tagMap[n.tagName] ? tagMap[n.tagName] : n.tagName;
    if (tagName === 'link' && n.attributes._cssText) {
        tagName = 'style';
    }
    return tagName;
}
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
var HOVER_SELECTOR = /([^\\]):hover/;
var HOVER_SELECTOR_GLOBAL = new RegExp(HOVER_SELECTOR.source, 'g');
function addHoverClass(cssText, cache) {
    var cachedStyle = cache === null || cache === void 0 ? void 0 : cache.stylesWithHoverClass.get(cssText);
    if (cachedStyle)
        return cachedStyle;
    var ast = parse(cssText, {
        silent: true
    });
    if (!ast.stylesheet) {
        return cssText;
    }
    var selectors = [];
    ast.stylesheet.rules.forEach(function (rule) {
        if ('selectors' in rule) {
            (rule.selectors || []).forEach(function (selector) {
                if (HOVER_SELECTOR.test(selector)) {
                    selectors.push(selector);
                }
            });
        }
    });
    if (selectors.length === 0) {
        return cssText;
    }
    var selectorMatcher = new RegExp(selectors
        .filter(function (selector, index) { return selectors.indexOf(selector) === index; })
        .sort(function (a, b) { return b.length - a.length; })
        .map(function (selector) {
        return escapeRegExp(selector);
    })
        .join('|'), 'g');
    var result = cssText.replace(selectorMatcher, function (selector) {
        var newSelector = selector.replace(HOVER_SELECTOR_GLOBAL, '$1.\\:hover');
        return "".concat(selector, ", ").concat(newSelector);
    });
    cache === null || cache === void 0 ? void 0 : cache.stylesWithHoverClass.set(cssText, result);
    return result;
}
function createCache() {
    var stylesWithHoverClass = new Map();
    return {
        stylesWithHoverClass: stylesWithHoverClass
    };
}
function buildNode(n, options) {
    var doc = options.doc, hackCss = options.hackCss, cache = options.cache;
    switch (n.type) {
        case NodeType.Document:
            return doc.implementation.createDocument(null, '', null);
        case NodeType.DocumentType:
            return doc.implementation.createDocumentType(n.name || 'html', n.publicId, n.systemId);
        case NodeType.Element: {
            var tagName = getTagName(n);
            var node_1;
            if (n.isSVG) {
                node_1 = doc.createElementNS('http://www.w3.org/2000/svg', tagName);
            }
            else {
                node_1 = doc.createElement(tagName);
            }
            var specialAttributes = {};
            for (var name_1 in n.attributes) {
                if (!Object.prototype.hasOwnProperty.call(n.attributes, name_1)) {
                    continue;
                }
                var value = n.attributes[name_1];
                if (tagName === 'option' &&
                    name_1 === 'selected' &&
                    value === false) {
                    continue;
                }
                if (value === null) {
                    continue;
                }
                if (value === true)
                    value = '';
                if (name_1.startsWith('rr_')) {
                    specialAttributes[name_1] = value;
                    continue;
                }
                var isTextarea = tagName === 'textarea' && name_1 === 'value';
                var isRemoteOrDynamicCss = tagName === 'style' && name_1 === '_cssText';
                if (isRemoteOrDynamicCss && hackCss && typeof value === 'string') {
                    value = addHoverClass(value, cache);
                }
                if ((isTextarea || isRemoteOrDynamicCss) && typeof value === 'string') {
                    var child = doc.createTextNode(value);
                    for (var _i = 0, _a = Array.from(node_1.childNodes); _i < _a.length; _i++) {
                        var c = _a[_i];
                        if (c.nodeType === node_1.TEXT_NODE) {
                            node_1.removeChild(c);
                        }
                    }
                    node_1.appendChild(child);
                    continue;
                }
                try {
                    if (n.isSVG && name_1 === 'xlink:href') {
                        node_1.setAttributeNS('http://www.w3.org/1999/xlink', name_1, value.toString());
                    }
                    else if (name_1 === 'onload' ||
                        name_1 === 'onclick' ||
                        name_1.substring(0, 7) === 'onmouse') {
                        node_1.setAttribute('_' + name_1, value.toString());
                    }
                    else if (tagName === 'meta' &&
                        n.attributes['http-equiv'] === 'Content-Security-Policy' &&
                        name_1 === 'content') {
                        node_1.setAttribute('csp-content', value.toString());
                        continue;
                    }
                    else if (tagName === 'link' &&
                        (n.attributes.rel === 'preload' ||
                            n.attributes.rel === 'modulepreload') &&
                        n.attributes.as === 'script') {
                    }
                    else if (tagName === 'link' &&
                        n.attributes.rel === 'prefetch' &&
                        typeof n.attributes.href === 'string' &&
                        n.attributes.href.endsWith('.js')) {
                    }
                    else if (tagName === 'img' &&
                        n.attributes.srcset &&
                        n.attributes.rr_dataURL) {
                        node_1.setAttribute('rrweb-original-srcset', n.attributes.srcset);
                    }
                    else {
                        node_1.setAttribute(name_1, value.toString());
                    }
                }
                catch (error) {
                }
            }
            var _loop_1 = function (name_2) {
                var value = specialAttributes[name_2];
                if (tagName === 'canvas' && name_2 === 'rr_dataURL') {
                    var image_1 = document.createElement('img');
                    image_1.onload = function () {
                        var ctx = node_1.getContext('2d');
                        if (ctx) {
                            ctx.drawImage(image_1, 0, 0, image_1.width, image_1.height);
                        }
                    };
                    image_1.src = value.toString();
                    if (node_1.RRNodeType)
                        node_1.rr_dataURL = value.toString();
                }
                else if (tagName === 'img' && name_2 === 'rr_dataURL') {
                    var image = node_1;
                    if (!image.currentSrc.startsWith('data:')) {
                        image.setAttribute('rrweb-original-src', n.attributes.src);
                        image.src = value.toString();
                    }
                }
                if (name_2 === 'rr_width') {
                    node_1.style.width = value.toString();
                }
                else if (name_2 === 'rr_height') {
                    node_1.style.height = value.toString();
                }
                else if (name_2 === 'rr_mediaCurrentTime' &&
                    typeof value === 'number') {
                    node_1.currentTime = value;
                }
                else if (name_2 === 'rr_mediaState') {
                    switch (value) {
                        case 'played':
                            node_1
                                .play()["catch"](function (e) { return console.warn('media playback error', e); });
                            break;
                        case 'paused':
                            node_1.pause();
                            break;
                    }
                }
            };
            for (var name_2 in specialAttributes) {
                _loop_1(name_2);
            }
            if (n.isShadowHost) {
                if (!node_1.shadowRoot) {
                    node_1.attachShadow({ mode: 'open' });
                }
                else {
                    while (node_1.shadowRoot.firstChild) {
                        node_1.shadowRoot.removeChild(node_1.shadowRoot.firstChild);
                    }
                }
            }
            return node_1;
        }
        case NodeType.Text:
            return doc.createTextNode(n.isStyle && hackCss
                ? addHoverClass(n.textContent, cache)
                : n.textContent);
        case NodeType.CDATA:
            return doc.createCDATASection(n.textContent);
        case NodeType.Comment:
            return doc.createComment(n.textContent);
        default:
            return null;
    }
}
function buildNodeWithSN(n, options) {
    var doc = options.doc, mirror = options.mirror, _a = options.skipChild, skipChild = _a === void 0 ? false : _a, _b = options.hackCss, hackCss = _b === void 0 ? true : _b, afterAppend = options.afterAppend, cache = options.cache;
    if (mirror.has(n.id)) {
        var nodeInMirror = mirror.getNode(n.id);
        var meta = mirror.getMeta(nodeInMirror);
        if (isNodeMetaEqual(meta, n))
            return mirror.getNode(n.id);
    }
    var node = buildNode(n, { doc: doc, hackCss: hackCss, cache: cache });
    if (!node) {
        return null;
    }
    if (n.rootId && mirror.getNode(n.rootId) !== doc) {
        mirror.replace(n.rootId, doc);
    }
    if (n.type === NodeType.Document) {
        doc.close();
        doc.open();
        if (n.compatMode === 'BackCompat' &&
            n.childNodes &&
            n.childNodes[0].type !== NodeType.DocumentType) {
            if (n.childNodes[0].type === NodeType.Element &&
                'xmlns' in n.childNodes[0].attributes &&
                n.childNodes[0].attributes.xmlns === 'http://www.w3.org/1999/xhtml') {
                doc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "">');
            }
            else {
                doc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "">');
            }
        }
        node = doc;
    }
    mirror.add(node, n);
    if ((n.type === NodeType.Document || n.type === NodeType.Element) &&
        !skipChild) {
        var _loop_2 = function (childN) {
            var childNode = buildNodeWithSN(childN, {
                doc: doc,
                mirror: mirror,
                skipChild: false,
                hackCss: hackCss,
                afterAppend: afterAppend,
                cache: cache
            });
            if (!childNode) {
                console.warn('Failed to rebuild', childN);
                return "continue";
            }
            if (childN.isShadow && isElement(node) && node.shadowRoot) {
                node.shadowRoot.appendChild(childNode);
            }
            else if (n.type === NodeType.Document &&
                childN.type == NodeType.Element) {
                var htmlElement = childNode;
                var body_1 = null;
                htmlElement.childNodes.forEach(function (child) {
                    if (child.nodeName === 'BODY')
                        body_1 = child;
                });
                if (body_1) {
                    htmlElement.removeChild(body_1);
                    node.appendChild(childNode);
                    htmlElement.appendChild(body_1);
                }
                else {
                    node.appendChild(childNode);
                }
            }
            else {
                node.appendChild(childNode);
            }
            if (afterAppend) {
                afterAppend(childNode, childN.id);
            }
        };
        for (var _i = 0, _c = n.childNodes; _i < _c.length; _i++) {
            var childN = _c[_i];
            _loop_2(childN);
        }
    }
    return node;
}
function visit(mirror, onVisit) {
    function walk(node) {
        onVisit(node);
    }
    for (var _i = 0, _a = mirror.getIds(); _i < _a.length; _i++) {
        var id = _a[_i];
        if (mirror.has(id)) {
            walk(mirror.getNode(id));
        }
    }
}
function handleScroll(node, mirror) {
    var n = mirror.getMeta(node);
    if ((n === null || n === void 0 ? void 0 : n.type) !== NodeType.Element) {
        return;
    }
    var el = node;
    for (var name_3 in n.attributes) {
        if (!(Object.prototype.hasOwnProperty.call(n.attributes, name_3) &&
            name_3.startsWith('rr_'))) {
            continue;
        }
        var value = n.attributes[name_3];
        if (name_3 === 'rr_scrollLeft') {
            el.scrollLeft = value;
        }
        if (name_3 === 'rr_scrollTop') {
            el.scrollTop = value;
        }
    }
}
function rebuild(n, options) {
    var doc = options.doc, onVisit = options.onVisit, _a = options.hackCss, hackCss = _a === void 0 ? true : _a, afterAppend = options.afterAppend, cache = options.cache, _b = options.mirror, mirror = _b === void 0 ? new Mirror() : _b;
    var node = buildNodeWithSN(n, {
        doc: doc,
        mirror: mirror,
        skipChild: false,
        hackCss: hackCss,
        afterAppend: afterAppend,
        cache: cache
    });
    visit(mirror, function (visitedNode) {
        if (onVisit) {
            onVisit(visitedNode);
        }
        handleScroll(visitedNode, mirror);
    });
    return node;
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./cypress/support/e2e.js ***!
  \********************************/


__webpack_require__(/*! @chromatic-com/cypress/support */ "./node_modules/@chromatic-com/cypress/dist/support.js");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZTJlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTs7QUFFYixvQkFBb0IsbUJBQU8sQ0FBQywwRUFBZ0I7O0FBRTVDLHdDQUF3Qyx5REFBeUQsZ0NBQWdDLDBDQUEwQyxrQkFBa0IsMEJBQTBCLEdBQUcsRUFBRSxnQkFBZ0IsZ0dBQWdHLHlDQUF5Qyw0Q0FBNEMsSUFBSSxFQUFFLGVBQWUsOEZBQThGLGdDQUFnQyx5Q0FBeUMsa0JBQWtCLDJCQUEyQixnQ0FBZ0MsdUdBQXVHLFdBQVcsNEJBQTRCLGtDQUFrQywyQ0FBMkMsMkJBQTJCLDJCQUEyQiw2Q0FBNkMsK0RBQStELG1DQUFtQywyQ0FBMkMsa0NBQWtDLHlDQUF5Qyx5Q0FBeUMsdURBQXVELDBDQUEwQywwREFBMEQscUJBQXFCLGdGQUFnRixHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQ3IvQztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNEJBQTRCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pELDBEQUEwRDtBQUMxRCwwREFBMEQsb0NBQW9DLHNCQUFzQjtBQUNwSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0Qyx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QscUJBQXFCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMscUJBQXFCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsU0FBUztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxTQUFTO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxrVUFBa1UsMklBQTJJO0FBQzdjO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscU5BQXFOLDBHQUEwRztBQUMvVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa2FBQWthLG9MQUFvTCwyZkFBMmYsZ0JBQWdCO0FBQ2ptQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxRQUFRO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsZ0JBQWdCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLGdCQUFnQjtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDBpQ0FBMGlDLGdCQUFnQjtBQUNwbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsMERBQTBELElBQUk7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsSUFBSTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGdCQUFnQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLCtDQUErQztBQUM1RixnQ0FBZ0MsNkJBQTZCO0FBQzdEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsZ0JBQWdCO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsaURBQWlEO0FBQ2pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxjQUFjO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsMENBQTBDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsZ0JBQWdCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGdCQUFnQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFOGQ7Ozs7Ozs7VUM3NEQ5ZDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDV0FBLG1CQUFBLGdHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BjaHJvbWF0aWMtY29tL2N5cHJlc3MvZGlzdC9zdXBwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ycndlYi1zbmFwc2hvdC9lcy9ycndlYi1zbmFwc2hvdC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9jeXByZXNzL3N1cHBvcnQvZTJlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHJyd2ViU25hcHNob3QgPSByZXF1aXJlKCdycndlYi1zbmFwc2hvdCcpO1xuXG5DeXByZXNzLkNvbW1hbmRzLmFkZChcInRha2VTbmFwc2hvdFwiLGU9PntDeXByZXNzLmNvbmZpZyhcImlzVGV4dFRlcm1pbmFsXCIpJiZjeS5kb2N1bWVudCgpLnRoZW4ocz0+e2xldCBuPXJyd2ViU25hcHNob3Quc25hcHNob3Qocyk7Y3kuZ2V0KFwiQG1hbnVhbFNuYXBzaG90c1wiKS50aGVuKHI9PlsuLi5yLHtuYW1lOmUsc25hcHNob3Q6bn1dKS5hcyhcIm1hbnVhbFNuYXBzaG90c1wiKTt9KTt9KTtiZWZvcmVFYWNoKCgpPT57Q3lwcmVzcy5jb25maWcoXCJpc1RleHRUZXJtaW5hbFwiKSYmKGN5LndyYXAoW10pLmFzKFwibWFudWFsU25hcHNob3RzXCIpLGN5LnRhc2soXCJwcmVwYXJlQXJjaGl2ZXNcIix7YWN0aW9uOlwic2V0dXAtbmV0d29yay1saXN0ZW5lclwiLHBheWxvYWQ6e2FsbG93ZWREb21haW5zOkN5cHJlc3MuZW52KFwiYXNzZXREb21haW5zXCIpfX0pKTt9KTthZnRlckVhY2goKCk9PntDeXByZXNzLmVudihcImRpc2FibGVBdXRvU25hcHNob3RcIil8fCFDeXByZXNzLmNvbmZpZyhcImlzVGV4dFRlcm1pbmFsXCIpfHxjeS5kb2N1bWVudCgpLnRoZW4oZT0+e2xldCBzPXJyd2ViU25hcHNob3Quc25hcHNob3QoZSk7Y3kuZ2V0KFwiQG1hbnVhbFNuYXBzaG90c1wiKS50aGVuKChuPVtdKT0+e2N5LnVybCgpLnRoZW4ocj0+e2N5LnRhc2soXCJwcmVwYXJlQXJjaGl2ZXNcIix7YWN0aW9uOlwic2F2ZS1hcmNoaXZlc1wiLHBheWxvYWQ6e3Rlc3RUaXRsZVBhdGg6W0N5cHJlc3Muc3BlYy5yZWxhdGl2ZVRvQ29tbW9uUm9vdCwuLi5DeXByZXNzLmN1cnJlbnRUZXN0LnRpdGxlUGF0aF0sZG9tU25hcHNob3RzOlsuLi5uLHtzbmFwc2hvdDpzfV0sY2hyb21hdGljU3Rvcnlib29rUGFyYW1zOnsuLi5DeXByZXNzLmVudihcImRpZmZUaHJlc2hvbGRcIikmJntkaWZmVGhyZXNob2xkOkN5cHJlc3MuZW52KFwiZGlmZlRocmVzaG9sZFwiKX0sLi4uQ3lwcmVzcy5lbnYoXCJkZWxheVwiKSYme2RlbGF5OkN5cHJlc3MuZW52KFwiZGVsYXlcIil9LC4uLkN5cHJlc3MuZW52KFwiZGlmZkluY2x1ZGVBbnRpQWxpYXNpbmdcIikmJntkaWZmSW5jbHVkZUFudGlBbGlhc2luZzpDeXByZXNzLmVudihcImRpZmZJbmNsdWRlQW50aUFsaWFzaW5nXCIpfSwuLi5DeXByZXNzLmVudihcImRpZmZUaHJlc2hvbGRcIikmJntkaWZmVGhyZXNob2xkOkN5cHJlc3MuZW52KFwiZGlmZlRocmVzaG9sZFwiKX0sLi4uQ3lwcmVzcy5lbnYoXCJmb3JjZWRDb2xvcnNcIikmJntmb3JjZWRDb2xvcnM6Q3lwcmVzcy5lbnYoXCJmb3JjZWRDb2xvcnNcIil9LC4uLkN5cHJlc3MuZW52KFwicGF1c2VBbmltYXRpb25BdEVuZFwiKSYme3BhdXNlQW5pbWF0aW9uQXRFbmQ6Q3lwcmVzcy5lbnYoXCJwYXVzZUFuaW1hdGlvbkF0RW5kXCIpfSwuLi5DeXByZXNzLmVudihcInByZWZlcnNSZWR1Y2VkTW90aW9uXCIpJiZ7cHJlZmVyc1JlZHVjZWRNb3Rpb246Q3lwcmVzcy5lbnYoXCJwcmVmZXJzUmVkdWNlZE1vdGlvblwiKX19LHBhZ2VVcmw6cix2aWV3cG9ydDp7aGVpZ2h0OkN5cHJlc3MuY29uZmlnKFwidmlld3BvcnRIZWlnaHRcIiksd2lkdGg6Q3lwcmVzcy5jb25maWcoXCJ2aWV3cG9ydFdpZHRoXCIpfX19KTt9KTt9KTt9KTt9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW91dC5qcy5tYXBcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN1cHBvcnQuanMubWFwIiwidmFyIE5vZGVUeXBlO1xyXG4oZnVuY3Rpb24gKE5vZGVUeXBlKSB7XHJcbiAgICBOb2RlVHlwZVtOb2RlVHlwZVtcIkRvY3VtZW50XCJdID0gMF0gPSBcIkRvY3VtZW50XCI7XHJcbiAgICBOb2RlVHlwZVtOb2RlVHlwZVtcIkRvY3VtZW50VHlwZVwiXSA9IDFdID0gXCJEb2N1bWVudFR5cGVcIjtcclxuICAgIE5vZGVUeXBlW05vZGVUeXBlW1wiRWxlbWVudFwiXSA9IDJdID0gXCJFbGVtZW50XCI7XHJcbiAgICBOb2RlVHlwZVtOb2RlVHlwZVtcIlRleHRcIl0gPSAzXSA9IFwiVGV4dFwiO1xyXG4gICAgTm9kZVR5cGVbTm9kZVR5cGVbXCJDREFUQVwiXSA9IDRdID0gXCJDREFUQVwiO1xyXG4gICAgTm9kZVR5cGVbTm9kZVR5cGVbXCJDb21tZW50XCJdID0gNV0gPSBcIkNvbW1lbnRcIjtcclxufSkoTm9kZVR5cGUgfHwgKE5vZGVUeXBlID0ge30pKTtcblxuZnVuY3Rpb24gaXNFbGVtZW50KG4pIHtcclxuICAgIHJldHVybiBuLm5vZGVUeXBlID09PSBuLkVMRU1FTlRfTk9ERTtcclxufVxyXG5mdW5jdGlvbiBpc1NoYWRvd1Jvb3Qobikge1xyXG4gICAgdmFyIGhvc3QgPSBuID09PSBudWxsIHx8IG4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IG4uaG9zdDtcclxuICAgIHJldHVybiBCb29sZWFuKChob3N0ID09PSBudWxsIHx8IGhvc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhvc3Quc2hhZG93Um9vdCkgPT09IG4pO1xyXG59XHJcbmZ1bmN0aW9uIGlzTmF0aXZlU2hhZG93RG9tKHNoYWRvd1Jvb3QpIHtcclxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc2hhZG93Um9vdCkgPT09ICdbb2JqZWN0IFNoYWRvd1Jvb3RdJztcclxufVxyXG5mdW5jdGlvbiBmaXhCcm93c2VyQ29tcGF0aWJpbGl0eUlzc3Vlc0luQ1NTKGNzc1RleHQpIHtcclxuICAgIGlmIChjc3NUZXh0LmluY2x1ZGVzKCcgYmFja2dyb3VuZC1jbGlwOiB0ZXh0OycpICYmXHJcbiAgICAgICAgIWNzc1RleHQuaW5jbHVkZXMoJyAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDsnKSkge1xyXG4gICAgICAgIGNzc1RleHQgPSBjc3NUZXh0LnJlcGxhY2UoJyBiYWNrZ3JvdW5kLWNsaXA6IHRleHQ7JywgJyAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDsgYmFja2dyb3VuZC1jbGlwOiB0ZXh0OycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNzc1RleHQ7XHJcbn1cclxuZnVuY3Rpb24gZXNjYXBlSW1wb3J0U3RhdGVtZW50KHJ1bGUpIHtcclxuICAgIHZhciBjc3NUZXh0ID0gcnVsZS5jc3NUZXh0O1xyXG4gICAgaWYgKGNzc1RleHQuc3BsaXQoJ1wiJykubGVuZ3RoIDwgMylcclxuICAgICAgICByZXR1cm4gY3NzVGV4dDtcclxuICAgIHZhciBzdGF0ZW1lbnQgPSBbJ0BpbXBvcnQnLCBcInVybChcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkocnVsZS5ocmVmKSwgXCIpXCIpXTtcclxuICAgIGlmIChydWxlLmxheWVyTmFtZSA9PT0gJycpIHtcclxuICAgICAgICBzdGF0ZW1lbnQucHVzaChcImxheWVyXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocnVsZS5sYXllck5hbWUpIHtcclxuICAgICAgICBzdGF0ZW1lbnQucHVzaChcImxheWVyKFwiLmNvbmNhdChydWxlLmxheWVyTmFtZSwgXCIpXCIpKTtcclxuICAgIH1cclxuICAgIGlmIChydWxlLnN1cHBvcnRzVGV4dCkge1xyXG4gICAgICAgIHN0YXRlbWVudC5wdXNoKFwic3VwcG9ydHMoXCIuY29uY2F0KHJ1bGUuc3VwcG9ydHNUZXh0LCBcIilcIikpO1xyXG4gICAgfVxyXG4gICAgaWYgKHJ1bGUubWVkaWEubGVuZ3RoKSB7XHJcbiAgICAgICAgc3RhdGVtZW50LnB1c2gocnVsZS5tZWRpYS5tZWRpYVRleHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlbWVudC5qb2luKCcgJykgKyAnOyc7XHJcbn1cclxuZnVuY3Rpb24gc3RyaW5naWZ5U3R5bGVzaGVldChzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHZhciBydWxlcyA9IHMucnVsZXMgfHwgcy5jc3NSdWxlcztcclxuICAgICAgICByZXR1cm4gcnVsZXNcclxuICAgICAgICAgICAgPyBmaXhCcm93c2VyQ29tcGF0aWJpbGl0eUlzc3Vlc0luQ1NTKEFycmF5LmZyb20ocnVsZXMpLm1hcChzdHJpbmdpZnlSdWxlKS5qb2luKCcnKSlcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc3RyaW5naWZ5UnVsZShydWxlKSB7XHJcbiAgICB2YXIgaW1wb3J0U3RyaW5naWZpZWQ7XHJcbiAgICBpZiAoaXNDU1NJbXBvcnRSdWxlKHJ1bGUpKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaW1wb3J0U3RyaW5naWZpZWQgPVxyXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5U3R5bGVzaGVldChydWxlLnN0eWxlU2hlZXQpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlSW1wb3J0U3RhdGVtZW50KHJ1bGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsaWRhdGVTdHJpbmdpZmllZENzc1J1bGUoaW1wb3J0U3RyaW5naWZpZWQgfHwgcnVsZS5jc3NUZXh0KTtcclxufVxyXG5mdW5jdGlvbiB2YWxpZGF0ZVN0cmluZ2lmaWVkQ3NzUnVsZShjc3NTdHJpbmdpZmllZCkge1xyXG4gICAgaWYgKGNzc1N0cmluZ2lmaWVkLmluY2x1ZGVzKCc6JykpIHtcclxuICAgICAgICB2YXIgcmVnZXggPSAvKFxcWyg/OltcXHctXSspW15cXFxcXSkoOig/OltcXHctXSspXFxdKS9nbTtcclxuICAgICAgICByZXR1cm4gY3NzU3RyaW5naWZpZWQucmVwbGFjZShyZWdleCwgJyQxXFxcXCQyJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3NzU3RyaW5naWZpZWQ7XHJcbn1cclxuZnVuY3Rpb24gaXNDU1NJbXBvcnRSdWxlKHJ1bGUpIHtcclxuICAgIHJldHVybiAnc3R5bGVTaGVldCcgaW4gcnVsZTtcclxufVxyXG52YXIgTWlycm9yID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1pcnJvcigpIHtcclxuICAgICAgICB0aGlzLmlkTm9kZU1hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLm5vZGVNZXRhTWFwID0gbmV3IFdlYWtNYXAoKTtcclxuICAgIH1cclxuICAgIE1pcnJvci5wcm90b3R5cGUuZ2V0SWQgPSBmdW5jdGlvbiAobikge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBpZiAoIW4pXHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB2YXIgaWQgPSAoX2EgPSB0aGlzLmdldE1ldGEobikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZDtcclxuICAgICAgICByZXR1cm4gaWQgIT09IG51bGwgJiYgaWQgIT09IHZvaWQgMCA/IGlkIDogLTE7XHJcbiAgICB9O1xyXG4gICAgTWlycm9yLnByb3RvdHlwZS5nZXROb2RlID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWROb2RlTWFwLmdldChpZCkgfHwgbnVsbDtcclxuICAgIH07XHJcbiAgICBNaXJyb3IucHJvdG90eXBlLmdldElkcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmlkTm9kZU1hcC5rZXlzKCkpO1xyXG4gICAgfTtcclxuICAgIE1pcnJvci5wcm90b3R5cGUuZ2V0TWV0YSA9IGZ1bmN0aW9uIChuKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZU1ldGFNYXAuZ2V0KG4pIHx8IG51bGw7XHJcbiAgICB9O1xyXG4gICAgTWlycm9yLnByb3RvdHlwZS5yZW1vdmVOb2RlRnJvbU1hcCA9IGZ1bmN0aW9uIChuKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgaWQgPSB0aGlzLmdldElkKG4pO1xyXG4gICAgICAgIHRoaXMuaWROb2RlTWFwW1wiZGVsZXRlXCJdKGlkKTtcclxuICAgICAgICBpZiAobi5jaGlsZE5vZGVzKSB7XHJcbiAgICAgICAgICAgIG4uY2hpbGROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5yZW1vdmVOb2RlRnJvbU1hcChjaGlsZE5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgTWlycm9yLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZE5vZGVNYXAuaGFzKGlkKTtcclxuICAgIH07XHJcbiAgICBNaXJyb3IucHJvdG90eXBlLmhhc05vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVNZXRhTWFwLmhhcyhub2RlKTtcclxuICAgIH07XHJcbiAgICBNaXJyb3IucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChuLCBtZXRhKSB7XHJcbiAgICAgICAgdmFyIGlkID0gbWV0YS5pZDtcclxuICAgICAgICB0aGlzLmlkTm9kZU1hcC5zZXQoaWQsIG4pO1xyXG4gICAgICAgIHRoaXMubm9kZU1ldGFNYXAuc2V0KG4sIG1ldGEpO1xyXG4gICAgfTtcclxuICAgIE1pcnJvci5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChpZCwgbikge1xyXG4gICAgICAgIHZhciBvbGROb2RlID0gdGhpcy5nZXROb2RlKGlkKTtcclxuICAgICAgICBpZiAob2xkTm9kZSkge1xyXG4gICAgICAgICAgICB2YXIgbWV0YSA9IHRoaXMubm9kZU1ldGFNYXAuZ2V0KG9sZE5vZGUpO1xyXG4gICAgICAgICAgICBpZiAobWV0YSlcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZU1ldGFNYXAuc2V0KG4sIG1ldGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlkTm9kZU1hcC5zZXQoaWQsIG4pO1xyXG4gICAgfTtcclxuICAgIE1pcnJvci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5pZE5vZGVNYXAgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlTWV0YU1hcCA9IG5ldyBXZWFrTWFwKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE1pcnJvcjtcclxufSgpKTtcclxuZnVuY3Rpb24gY3JlYXRlTWlycm9yKCkge1xyXG4gICAgcmV0dXJuIG5ldyBNaXJyb3IoKTtcclxufVxyXG5mdW5jdGlvbiBtYXNrSW5wdXRWYWx1ZShfYSkge1xyXG4gICAgdmFyIGVsZW1lbnQgPSBfYS5lbGVtZW50LCBtYXNrSW5wdXRPcHRpb25zID0gX2EubWFza0lucHV0T3B0aW9ucywgdGFnTmFtZSA9IF9hLnRhZ05hbWUsIHR5cGUgPSBfYS50eXBlLCB2YWx1ZSA9IF9hLnZhbHVlLCBtYXNrSW5wdXRGbiA9IF9hLm1hc2tJbnB1dEZuO1xyXG4gICAgdmFyIHRleHQgPSB2YWx1ZSB8fCAnJztcclxuICAgIHZhciBhY3R1YWxUeXBlID0gdHlwZSAmJiB0b0xvd2VyQ2FzZSh0eXBlKTtcclxuICAgIGlmIChtYXNrSW5wdXRPcHRpb25zW3RhZ05hbWUudG9Mb3dlckNhc2UoKV0gfHxcclxuICAgICAgICAoYWN0dWFsVHlwZSAmJiBtYXNrSW5wdXRPcHRpb25zW2FjdHVhbFR5cGVdKSkge1xyXG4gICAgICAgIGlmIChtYXNrSW5wdXRGbikge1xyXG4gICAgICAgICAgICB0ZXh0ID0gbWFza0lucHV0Rm4odGV4dCwgZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXh0ID0gJyonLnJlcGVhdCh0ZXh0Lmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn1cclxuZnVuY3Rpb24gdG9Mb3dlckNhc2Uoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCk7XHJcbn1cclxudmFyIE9SSUdJTkFMX0FUVFJJQlVURV9OQU1FID0gJ19fcnJ3ZWJfb3JpZ2luYWxfXyc7XHJcbmZ1bmN0aW9uIGlzMkRDYW52YXNCbGFuayhjYW52YXMpIHtcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGlmICghY3R4KVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgdmFyIGNodW5rU2l6ZSA9IDUwO1xyXG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCBjYW52YXMud2lkdGg7IHggKz0gY2h1bmtTaXplKSB7XHJcbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBjYW52YXMuaGVpZ2h0OyB5ICs9IGNodW5rU2l6ZSkge1xyXG4gICAgICAgICAgICB2YXIgZ2V0SW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YTtcclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsR2V0SW1hZ2VEYXRhID0gT1JJR0lOQUxfQVRUUklCVVRFX05BTUUgaW4gZ2V0SW1hZ2VEYXRhXHJcbiAgICAgICAgICAgICAgICA/IGdldEltYWdlRGF0YVtPUklHSU5BTF9BVFRSSUJVVEVfTkFNRV1cclxuICAgICAgICAgICAgICAgIDogZ2V0SW1hZ2VEYXRhO1xyXG4gICAgICAgICAgICB2YXIgcGl4ZWxCdWZmZXIgPSBuZXcgVWludDMyQXJyYXkob3JpZ2luYWxHZXRJbWFnZURhdGEuY2FsbChjdHgsIHgsIHksIE1hdGgubWluKGNodW5rU2l6ZSwgY2FudmFzLndpZHRoIC0geCksIE1hdGgubWluKGNodW5rU2l6ZSwgY2FudmFzLmhlaWdodCAtIHkpKS5kYXRhLmJ1ZmZlcik7XHJcbiAgICAgICAgICAgIGlmIChwaXhlbEJ1ZmZlci5zb21lKGZ1bmN0aW9uIChwaXhlbCkgeyByZXR1cm4gcGl4ZWwgIT09IDA7IH0pKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmZ1bmN0aW9uIGlzTm9kZU1ldGFFcXVhbChhLCBiKSB7XHJcbiAgICBpZiAoIWEgfHwgIWIgfHwgYS50eXBlICE9PSBiLnR5cGUpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGEudHlwZSA9PT0gTm9kZVR5cGUuRG9jdW1lbnQpXHJcbiAgICAgICAgcmV0dXJuIGEuY29tcGF0TW9kZSA9PT0gYi5jb21wYXRNb2RlO1xyXG4gICAgZWxzZSBpZiAoYS50eXBlID09PSBOb2RlVHlwZS5Eb2N1bWVudFR5cGUpXHJcbiAgICAgICAgcmV0dXJuIChhLm5hbWUgPT09IGIubmFtZSAmJlxyXG4gICAgICAgICAgICBhLnB1YmxpY0lkID09PSBiLnB1YmxpY0lkICYmXHJcbiAgICAgICAgICAgIGEuc3lzdGVtSWQgPT09IGIuc3lzdGVtSWQpO1xyXG4gICAgZWxzZSBpZiAoYS50eXBlID09PSBOb2RlVHlwZS5Db21tZW50IHx8XHJcbiAgICAgICAgYS50eXBlID09PSBOb2RlVHlwZS5UZXh0IHx8XHJcbiAgICAgICAgYS50eXBlID09PSBOb2RlVHlwZS5DREFUQSlcclxuICAgICAgICByZXR1cm4gYS50ZXh0Q29udGVudCA9PT0gYi50ZXh0Q29udGVudDtcclxuICAgIGVsc2UgaWYgKGEudHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudClcclxuICAgICAgICByZXR1cm4gKGEudGFnTmFtZSA9PT0gYi50YWdOYW1lICYmXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGEuYXR0cmlidXRlcykgPT09XHJcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShiLmF0dHJpYnV0ZXMpICYmXHJcbiAgICAgICAgICAgIGEuaXNTVkcgPT09IGIuaXNTVkcgJiZcclxuICAgICAgICAgICAgYS5uZWVkQmxvY2sgPT09IGIubmVlZEJsb2NrKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5mdW5jdGlvbiBnZXRJbnB1dFR5cGUoZWxlbWVudCkge1xyXG4gICAgdmFyIHR5cGUgPSBlbGVtZW50LnR5cGU7XHJcbiAgICByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtcnItaXMtcGFzc3dvcmQnKVxyXG4gICAgICAgID8gJ3Bhc3N3b3JkJ1xyXG4gICAgICAgIDogdHlwZVxyXG4gICAgICAgICAgICA/XHJcbiAgICAgICAgICAgICAgICB0b0xvd2VyQ2FzZSh0eXBlKVxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbn1cblxudmFyIF9pZCA9IDE7XHJcbnZhciB0YWdOYW1lUmVnZXggPSBuZXcgUmVnRXhwKCdbXmEtejAtOS1fOl0nKTtcclxudmFyIElHTk9SRURfTk9ERSA9IC0yO1xyXG5mdW5jdGlvbiBnZW5JZCgpIHtcclxuICAgIHJldHVybiBfaWQrKztcclxufVxyXG5mdW5jdGlvbiBnZXRWYWxpZFRhZ05hbWUoZWxlbWVudCkge1xyXG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gJ2Zvcm0nO1xyXG4gICAgfVxyXG4gICAgdmFyIHByb2Nlc3NlZFRhZ05hbWUgPSB0b0xvd2VyQ2FzZShlbGVtZW50LnRhZ05hbWUpO1xyXG4gICAgaWYgKHRhZ05hbWVSZWdleC50ZXN0KHByb2Nlc3NlZFRhZ05hbWUpKSB7XHJcbiAgICAgICAgcmV0dXJuICdkaXYnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByb2Nlc3NlZFRhZ05hbWU7XHJcbn1cclxuZnVuY3Rpb24gZXh0cmFjdE9yaWdpbih1cmwpIHtcclxuICAgIHZhciBvcmlnaW4gPSAnJztcclxuICAgIGlmICh1cmwuaW5kZXhPZignLy8nKSA+IC0xKSB7XHJcbiAgICAgICAgb3JpZ2luID0gdXJsLnNwbGl0KCcvJykuc2xpY2UoMCwgMykuam9pbignLycpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgb3JpZ2luID0gdXJsLnNwbGl0KCcvJylbMF07XHJcbiAgICB9XHJcbiAgICBvcmlnaW4gPSBvcmlnaW4uc3BsaXQoJz8nKVswXTtcclxuICAgIHJldHVybiBvcmlnaW47XHJcbn1cclxudmFyIGNhbnZhc1NlcnZpY2U7XHJcbnZhciBjYW52YXNDdHg7XHJcbnZhciBVUkxfSU5fQ1NTX1JFRiA9IC91cmxcXCgoPzooJykoW14nXSopJ3woXCIpKC4qPylcInwoW14pXSopKVxcKS9nbTtcclxudmFyIFVSTF9QUk9UT0NPTF9NQVRDSCA9IC9eKD86W2EteitdKzopP1xcL1xcLy9pO1xyXG52YXIgVVJMX1dXV19NQVRDSCA9IC9ed3d3XFwuLiovaTtcclxudmFyIERBVEFfVVJJID0gL14oZGF0YTopKFteLF0qKSwoLiopL2k7XHJcbmZ1bmN0aW9uIGFic29sdXRlVG9TdHlsZXNoZWV0KGNzc1RleHQsIGhyZWYpIHtcclxuICAgIHJldHVybiAoY3NzVGV4dCB8fCAnJykucmVwbGFjZShVUkxfSU5fQ1NTX1JFRiwgZnVuY3Rpb24gKG9yaWdpbiwgcXVvdGUxLCBwYXRoMSwgcXVvdGUyLCBwYXRoMiwgcGF0aDMpIHtcclxuICAgICAgICB2YXIgZmlsZVBhdGggPSBwYXRoMSB8fCBwYXRoMiB8fCBwYXRoMztcclxuICAgICAgICB2YXIgbWF5YmVRdW90ZSA9IHF1b3RlMSB8fCBxdW90ZTIgfHwgJyc7XHJcbiAgICAgICAgaWYgKCFmaWxlUGF0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoVVJMX1BST1RPQ09MX01BVENILnRlc3QoZmlsZVBhdGgpIHx8IFVSTF9XV1dfTUFUQ0gudGVzdChmaWxlUGF0aCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwidXJsKFwiLmNvbmNhdChtYXliZVF1b3RlKS5jb25jYXQoZmlsZVBhdGgpLmNvbmNhdChtYXliZVF1b3RlLCBcIilcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChEQVRBX1VSSS50ZXN0KGZpbGVQYXRoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ1cmwoXCIuY29uY2F0KG1heWJlUXVvdGUpLmNvbmNhdChmaWxlUGF0aCkuY29uY2F0KG1heWJlUXVvdGUsIFwiKVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZpbGVQYXRoWzBdID09PSAnLycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwidXJsKFwiLmNvbmNhdChtYXliZVF1b3RlKS5jb25jYXQoZXh0cmFjdE9yaWdpbihocmVmKSArIGZpbGVQYXRoKS5jb25jYXQobWF5YmVRdW90ZSwgXCIpXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhY2sgPSBocmVmLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdmFyIHBhcnRzID0gZmlsZVBhdGguc3BsaXQoJy8nKTtcclxuICAgICAgICBzdGFjay5wb3AoKTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHBhcnRzXzEgPSBwYXJ0czsgX2kgPCBwYXJ0c18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgcGFydCA9IHBhcnRzXzFbX2ldO1xyXG4gICAgICAgICAgICBpZiAocGFydCA9PT0gJy4nKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChwYXJ0ID09PSAnLi4nKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gocGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwidXJsKFwiLmNvbmNhdChtYXliZVF1b3RlKS5jb25jYXQoc3RhY2suam9pbignLycpKS5jb25jYXQobWF5YmVRdW90ZSwgXCIpXCIpO1xyXG4gICAgfSk7XHJcbn1cclxudmFyIFNSQ1NFVF9OT1RfU1BBQ0VTID0gL15bXiBcXHRcXG5cXHJcXHUwMDBjXSsvO1xyXG52YXIgU1JDU0VUX0NPTU1BU19PUl9TUEFDRVMgPSAvXlssIFxcdFxcblxcclxcdTAwMGNdKy87XHJcbmZ1bmN0aW9uIGdldEFic29sdXRlU3Jjc2V0U3RyaW5nKGRvYywgYXR0cmlidXRlVmFsdWUpIHtcclxuICAgIGlmIChhdHRyaWJ1dGVWYWx1ZS50cmltKCkgPT09ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZVZhbHVlO1xyXG4gICAgfVxyXG4gICAgdmFyIHBvcyA9IDA7XHJcbiAgICBmdW5jdGlvbiBjb2xsZWN0Q2hhcmFjdGVycyhyZWdFeCkge1xyXG4gICAgICAgIHZhciBjaGFycztcclxuICAgICAgICB2YXIgbWF0Y2ggPSByZWdFeC5leGVjKGF0dHJpYnV0ZVZhbHVlLnN1YnN0cmluZyhwb3MpKTtcclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgY2hhcnMgPSBtYXRjaFswXTtcclxuICAgICAgICAgICAgcG9zICs9IGNoYXJzLmxlbmd0aDtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICB2YXIgb3V0cHV0ID0gW107XHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgIGNvbGxlY3RDaGFyYWN0ZXJzKFNSQ1NFVF9DT01NQVNfT1JfU1BBQ0VTKTtcclxuICAgICAgICBpZiAocG9zID49IGF0dHJpYnV0ZVZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHVybCA9IGNvbGxlY3RDaGFyYWN0ZXJzKFNSQ1NFVF9OT1RfU1BBQ0VTKTtcclxuICAgICAgICBpZiAodXJsLnNsaWNlKC0xKSA9PT0gJywnKSB7XHJcbiAgICAgICAgICAgIHVybCA9IGFic29sdXRlVG9Eb2MoZG9jLCB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxKSk7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRvcnNTdHIgPSAnJztcclxuICAgICAgICAgICAgdXJsID0gYWJzb2x1dGVUb0RvYyhkb2MsIHVybCk7XHJcbiAgICAgICAgICAgIHZhciBpblBhcmVucyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBhdHRyaWJ1dGVWYWx1ZS5jaGFyQXQocG9zKTtcclxuICAgICAgICAgICAgICAgIGlmIChjID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKCh1cmwgKyBkZXNjcmlwdG9yc1N0cikudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFpblBhcmVucykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjID09PSAnLCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKCh1cmwgKyBkZXNjcmlwdG9yc1N0cikudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGMgPT09ICcoJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpblBhcmVucyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGMgPT09ICcpJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpblBhcmVucyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3JzU3RyICs9IGM7XHJcbiAgICAgICAgICAgICAgICBwb3MgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXRwdXQuam9pbignLCAnKTtcclxufVxyXG5mdW5jdGlvbiBhYnNvbHV0ZVRvRG9jKGRvYywgYXR0cmlidXRlVmFsdWUpIHtcclxuICAgIGlmICghYXR0cmlidXRlVmFsdWUgfHwgYXR0cmlidXRlVmFsdWUudHJpbSgpID09PSAnJykge1xyXG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVWYWx1ZTtcclxuICAgIH1cclxuICAgIHZhciBhID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIGEuaHJlZiA9IGF0dHJpYnV0ZVZhbHVlO1xyXG4gICAgcmV0dXJuIGEuaHJlZjtcclxufVxyXG5mdW5jdGlvbiBpc1NWR0VsZW1lbnQoZWwpIHtcclxuICAgIHJldHVybiBCb29sZWFuKGVsLnRhZ05hbWUgPT09ICdzdmcnIHx8IGVsLm93bmVyU1ZHRWxlbWVudCk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0SHJlZigpIHtcclxuICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgYS5ocmVmID0gJyc7XHJcbiAgICByZXR1cm4gYS5ocmVmO1xyXG59XHJcbmZ1bmN0aW9uIHRyYW5zZm9ybUF0dHJpYnV0ZShkb2MsIHRhZ05hbWUsIG5hbWUsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKG5hbWUgPT09ICdzcmMnIHx8XHJcbiAgICAgICAgKG5hbWUgPT09ICdocmVmJyAmJiAhKHRhZ05hbWUgPT09ICd1c2UnICYmIHZhbHVlWzBdID09PSAnIycpKSkge1xyXG4gICAgICAgIHJldHVybiBhYnNvbHV0ZVRvRG9jKGRvYywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobmFtZSA9PT0gJ3hsaW5rOmhyZWYnICYmIHZhbHVlWzBdICE9PSAnIycpIHtcclxuICAgICAgICByZXR1cm4gYWJzb2x1dGVUb0RvYyhkb2MsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG5hbWUgPT09ICdiYWNrZ3JvdW5kJyAmJlxyXG4gICAgICAgICh0YWdOYW1lID09PSAndGFibGUnIHx8IHRhZ05hbWUgPT09ICd0ZCcgfHwgdGFnTmFtZSA9PT0gJ3RoJykpIHtcclxuICAgICAgICByZXR1cm4gYWJzb2x1dGVUb0RvYyhkb2MsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG5hbWUgPT09ICdzcmNzZXQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldEFic29sdXRlU3Jjc2V0U3RyaW5nKGRvYywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobmFtZSA9PT0gJ3N0eWxlJykge1xyXG4gICAgICAgIHJldHVybiBhYnNvbHV0ZVRvU3R5bGVzaGVldCh2YWx1ZSwgZ2V0SHJlZigpKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRhZ05hbWUgPT09ICdvYmplY3QnICYmIG5hbWUgPT09ICdkYXRhJykge1xyXG4gICAgICAgIHJldHVybiBhYnNvbHV0ZVRvRG9jKGRvYywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIGlnbm9yZUF0dHJpYnV0ZSh0YWdOYW1lLCBuYW1lLCBfdmFsdWUpIHtcclxuICAgIHJldHVybiAodGFnTmFtZSA9PT0gJ3ZpZGVvJyB8fCB0YWdOYW1lID09PSAnYXVkaW8nKSAmJiBuYW1lID09PSAnYXV0b3BsYXknO1xyXG59XHJcbmZ1bmN0aW9uIF9pc0Jsb2NrZWRFbGVtZW50KGVsZW1lbnQsIGJsb2NrQ2xhc3MsIGJsb2NrU2VsZWN0b3IpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBibG9ja0NsYXNzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoYmxvY2tDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBlSW5kZXggPSBlbGVtZW50LmNsYXNzTGlzdC5sZW5ndGg7IGVJbmRleC0tOykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NMaXN0W2VJbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tDbGFzcy50ZXN0KGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmxvY2tTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5tYXRjaGVzKGJsb2NrU2VsZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZnVuY3Rpb24gY2xhc3NNYXRjaGVzUmVnZXgobm9kZSwgcmVnZXgsIGNoZWNrQW5jZXN0b3JzKSB7XHJcbiAgICBpZiAoIW5vZGUpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICAgICAgaWYgKCFjaGVja0FuY2VzdG9ycylcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBjbGFzc01hdGNoZXNSZWdleChub2RlLnBhcmVudE5vZGUsIHJlZ2V4LCBjaGVja0FuY2VzdG9ycyk7XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBlSW5kZXggPSBub2RlLmNsYXNzTGlzdC5sZW5ndGg7IGVJbmRleC0tOykge1xyXG4gICAgICAgIHZhciBjbGFzc05hbWUgPSBub2RlLmNsYXNzTGlzdFtlSW5kZXhdO1xyXG4gICAgICAgIGlmIChyZWdleC50ZXN0KGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFjaGVja0FuY2VzdG9ycylcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gY2xhc3NNYXRjaGVzUmVnZXgobm9kZS5wYXJlbnROb2RlLCByZWdleCwgY2hlY2tBbmNlc3RvcnMpO1xyXG59XHJcbmZ1bmN0aW9uIG5lZWRNYXNraW5nVGV4dChub2RlLCBtYXNrVGV4dENsYXNzLCBtYXNrVGV4dFNlbGVjdG9yKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHZhciBlbCA9IG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFXHJcbiAgICAgICAgICAgID8gbm9kZVxyXG4gICAgICAgICAgICA6IG5vZGUucGFyZW50RWxlbWVudDtcclxuICAgICAgICBpZiAoZWwgPT09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAodHlwZW9mIG1hc2tUZXh0Q2xhc3MgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMobWFza1RleHRDbGFzcykpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoXCIuXCIuY29uY2F0KG1hc2tUZXh0Q2xhc3MpKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNsYXNzTWF0Y2hlc1JlZ2V4KGVsLCBtYXNrVGV4dENsYXNzLCB0cnVlKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWFza1RleHRTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICBpZiAoZWwubWF0Y2hlcyhtYXNrVGV4dFNlbGVjdG9yKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZWwuY2xvc2VzdChtYXNrVGV4dFNlbGVjdG9yKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZnVuY3Rpb24gb25jZUlmcmFtZUxvYWRlZChpZnJhbWVFbCwgbGlzdGVuZXIsIGlmcmFtZUxvYWRUaW1lb3V0KSB7XHJcbiAgICB2YXIgd2luID0gaWZyYW1lRWwuY29udGVudFdpbmRvdztcclxuICAgIGlmICghd2luKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGZpcmVkID0gZmFsc2U7XHJcbiAgICB2YXIgcmVhZHlTdGF0ZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmVhZHlTdGF0ZSA9IHdpbi5kb2N1bWVudC5yZWFkeVN0YXRlO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlYWR5U3RhdGUgIT09ICdjb21wbGV0ZScpIHtcclxuICAgICAgICB2YXIgdGltZXJfMSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWZpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaWZyYW1lTG9hZFRpbWVvdXQpO1xyXG4gICAgICAgIGlmcmFtZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcl8xKTtcclxuICAgICAgICAgICAgZmlyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBsaXN0ZW5lcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBibGFua1VybCA9ICdhYm91dDpibGFuayc7XHJcbiAgICBpZiAod2luLmxvY2F0aW9uLmhyZWYgIT09IGJsYW5rVXJsIHx8XHJcbiAgICAgICAgaWZyYW1lRWwuc3JjID09PSBibGFua1VybCB8fFxyXG4gICAgICAgIGlmcmFtZUVsLnNyYyA9PT0gJycpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGxpc3RlbmVyLCAwKTtcclxuICAgICAgICByZXR1cm4gaWZyYW1lRWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGxpc3RlbmVyKTtcclxuICAgIH1cclxuICAgIGlmcmFtZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBsaXN0ZW5lcik7XHJcbn1cclxuZnVuY3Rpb24gb25jZVN0eWxlc2hlZXRMb2FkZWQobGluaywgbGlzdGVuZXIsIHN0eWxlU2hlZXRMb2FkVGltZW91dCkge1xyXG4gICAgdmFyIGZpcmVkID0gZmFsc2U7XHJcbiAgICB2YXIgc3R5bGVTaGVldExvYWRlZDtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgc3R5bGVTaGVldExvYWRlZCA9IGxpbmsuc2hlZXQ7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc3R5bGVTaGVldExvYWRlZClcclxuICAgICAgICByZXR1cm47XHJcbiAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIWZpcmVkKSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIGZpcmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LCBzdHlsZVNoZWV0TG9hZFRpbWVvdXQpO1xyXG4gICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgZmlyZWQgPSB0cnVlO1xyXG4gICAgICAgIGxpc3RlbmVyKCk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBzZXJpYWxpemVOb2RlKG4sIG9wdGlvbnMpIHtcclxuICAgIHZhciBkb2MgPSBvcHRpb25zLmRvYywgbWlycm9yID0gb3B0aW9ucy5taXJyb3IsIGJsb2NrQ2xhc3MgPSBvcHRpb25zLmJsb2NrQ2xhc3MsIGJsb2NrU2VsZWN0b3IgPSBvcHRpb25zLmJsb2NrU2VsZWN0b3IsIG1hc2tUZXh0Q2xhc3MgPSBvcHRpb25zLm1hc2tUZXh0Q2xhc3MsIG1hc2tUZXh0U2VsZWN0b3IgPSBvcHRpb25zLm1hc2tUZXh0U2VsZWN0b3IsIGlubGluZVN0eWxlc2hlZXQgPSBvcHRpb25zLmlubGluZVN0eWxlc2hlZXQsIF9hID0gb3B0aW9ucy5tYXNrSW5wdXRPcHRpb25zLCBtYXNrSW5wdXRPcHRpb25zID0gX2EgPT09IHZvaWQgMCA/IHt9IDogX2EsIG1hc2tUZXh0Rm4gPSBvcHRpb25zLm1hc2tUZXh0Rm4sIG1hc2tJbnB1dEZuID0gb3B0aW9ucy5tYXNrSW5wdXRGbiwgX2IgPSBvcHRpb25zLmRhdGFVUkxPcHRpb25zLCBkYXRhVVJMT3B0aW9ucyA9IF9iID09PSB2b2lkIDAgPyB7fSA6IF9iLCBpbmxpbmVJbWFnZXMgPSBvcHRpb25zLmlubGluZUltYWdlcywgcmVjb3JkQ2FudmFzID0gb3B0aW9ucy5yZWNvcmRDYW52YXMsIGtlZXBJZnJhbWVTcmNGbiA9IG9wdGlvbnMua2VlcElmcmFtZVNyY0ZuLCBfYyA9IG9wdGlvbnMubmV3bHlBZGRlZEVsZW1lbnQsIG5ld2x5QWRkZWRFbGVtZW50ID0gX2MgPT09IHZvaWQgMCA/IGZhbHNlIDogX2M7XHJcbiAgICB2YXIgcm9vdElkID0gZ2V0Um9vdElkKGRvYywgbWlycm9yKTtcclxuICAgIHN3aXRjaCAobi5ub2RlVHlwZSkge1xyXG4gICAgICAgIGNhc2Ugbi5ET0NVTUVOVF9OT0RFOlxyXG4gICAgICAgICAgICBpZiAobi5jb21wYXRNb2RlICE9PSAnQ1NTMUNvbXBhdCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogTm9kZVR5cGUuRG9jdW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGROb2RlczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGF0TW9kZTogbi5jb21wYXRNb2RlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBOb2RlVHlwZS5Eb2N1bWVudCxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZE5vZGVzOiBbXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGNhc2Ugbi5ET0NVTUVOVF9UWVBFX05PREU6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBOb2RlVHlwZS5Eb2N1bWVudFR5cGUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBwdWJsaWNJZDogbi5wdWJsaWNJZCxcclxuICAgICAgICAgICAgICAgIHN5c3RlbUlkOiBuLnN5c3RlbUlkLFxyXG4gICAgICAgICAgICAgICAgcm9vdElkOiByb290SWRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBjYXNlIG4uRUxFTUVOVF9OT0RFOlxyXG4gICAgICAgICAgICByZXR1cm4gc2VyaWFsaXplRWxlbWVudE5vZGUobiwge1xyXG4gICAgICAgICAgICAgICAgZG9jOiBkb2MsXHJcbiAgICAgICAgICAgICAgICBibG9ja0NsYXNzOiBibG9ja0NsYXNzLFxyXG4gICAgICAgICAgICAgICAgYmxvY2tTZWxlY3RvcjogYmxvY2tTZWxlY3RvcixcclxuICAgICAgICAgICAgICAgIGlubGluZVN0eWxlc2hlZXQ6IGlubGluZVN0eWxlc2hlZXQsXHJcbiAgICAgICAgICAgICAgICBtYXNrSW5wdXRPcHRpb25zOiBtYXNrSW5wdXRPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgbWFza0lucHV0Rm46IG1hc2tJbnB1dEZuLFxyXG4gICAgICAgICAgICAgICAgZGF0YVVSTE9wdGlvbnM6IGRhdGFVUkxPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgaW5saW5lSW1hZ2VzOiBpbmxpbmVJbWFnZXMsXHJcbiAgICAgICAgICAgICAgICByZWNvcmRDYW52YXM6IHJlY29yZENhbnZhcyxcclxuICAgICAgICAgICAgICAgIGtlZXBJZnJhbWVTcmNGbjoga2VlcElmcmFtZVNyY0ZuLFxyXG4gICAgICAgICAgICAgICAgbmV3bHlBZGRlZEVsZW1lbnQ6IG5ld2x5QWRkZWRFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgcm9vdElkOiByb290SWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSBuLlRFWFRfTk9ERTpcclxuICAgICAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZVRleHROb2RlKG4sIHtcclxuICAgICAgICAgICAgICAgIG1hc2tUZXh0Q2xhc3M6IG1hc2tUZXh0Q2xhc3MsXHJcbiAgICAgICAgICAgICAgICBtYXNrVGV4dFNlbGVjdG9yOiBtYXNrVGV4dFNlbGVjdG9yLFxyXG4gICAgICAgICAgICAgICAgbWFza1RleHRGbjogbWFza1RleHRGbixcclxuICAgICAgICAgICAgICAgIHJvb3RJZDogcm9vdElkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2Ugbi5DREFUQV9TRUNUSU9OX05PREU6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBOb2RlVHlwZS5DREFUQSxcclxuICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiAnJyxcclxuICAgICAgICAgICAgICAgIHJvb3RJZDogcm9vdElkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgY2FzZSBuLkNPTU1FTlRfTk9ERTpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5vZGVUeXBlLkNvbW1lbnQsXHJcbiAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogbi50ZXh0Q29udGVudCB8fCAnJyxcclxuICAgICAgICAgICAgICAgIHJvb3RJZDogcm9vdElkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldFJvb3RJZChkb2MsIG1pcnJvcikge1xyXG4gICAgaWYgKCFtaXJyb3IuaGFzTm9kZShkb2MpKVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB2YXIgZG9jSWQgPSBtaXJyb3IuZ2V0SWQoZG9jKTtcclxuICAgIHJldHVybiBkb2NJZCA9PT0gMSA/IHVuZGVmaW5lZCA6IGRvY0lkO1xyXG59XHJcbmZ1bmN0aW9uIHNlcmlhbGl6ZVRleHROb2RlKG4sIG9wdGlvbnMpIHtcclxuICAgIHZhciBfYTtcclxuICAgIHZhciBtYXNrVGV4dENsYXNzID0gb3B0aW9ucy5tYXNrVGV4dENsYXNzLCBtYXNrVGV4dFNlbGVjdG9yID0gb3B0aW9ucy5tYXNrVGV4dFNlbGVjdG9yLCBtYXNrVGV4dEZuID0gb3B0aW9ucy5tYXNrVGV4dEZuLCByb290SWQgPSBvcHRpb25zLnJvb3RJZDtcclxuICAgIHZhciBwYXJlbnRUYWdOYW1lID0gbi5wYXJlbnROb2RlICYmIG4ucGFyZW50Tm9kZS50YWdOYW1lO1xyXG4gICAgdmFyIHRleHRDb250ZW50ID0gbi50ZXh0Q29udGVudDtcclxuICAgIHZhciBpc1N0eWxlID0gcGFyZW50VGFnTmFtZSA9PT0gJ1NUWUxFJyA/IHRydWUgOiB1bmRlZmluZWQ7XHJcbiAgICB2YXIgaXNTY3JpcHQgPSBwYXJlbnRUYWdOYW1lID09PSAnU0NSSVBUJyA/IHRydWUgOiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoaXNTdHlsZSAmJiB0ZXh0Q29udGVudCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChuLm5leHRTaWJsaW5nIHx8IG4ucHJldmlvdXNTaWJsaW5nKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoKF9hID0gbi5wYXJlbnROb2RlLnNoZWV0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY3NzUnVsZXMpIHtcclxuICAgICAgICAgICAgICAgIHRleHRDb250ZW50ID0gc3RyaW5naWZ5U3R5bGVzaGVldChuLnBhcmVudE5vZGUuc2hlZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2Fubm90IGdldCBDU1Mgc3R5bGVzIGZyb20gdGV4dCdzIHBhcmVudE5vZGUuIEVycm9yOiBcIi5jb25jYXQoZXJyKSwgbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRleHRDb250ZW50ID0gYWJzb2x1dGVUb1N0eWxlc2hlZXQodGV4dENvbnRlbnQsIGdldEhyZWYoKSk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNTY3JpcHQpIHtcclxuICAgICAgICB0ZXh0Q29udGVudCA9ICdTQ1JJUFRfUExBQ0VIT0xERVInO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpc1N0eWxlICYmXHJcbiAgICAgICAgIWlzU2NyaXB0ICYmXHJcbiAgICAgICAgdGV4dENvbnRlbnQgJiZcclxuICAgICAgICBuZWVkTWFza2luZ1RleHQobiwgbWFza1RleHRDbGFzcywgbWFza1RleHRTZWxlY3RvcikpIHtcclxuICAgICAgICB0ZXh0Q29udGVudCA9IG1hc2tUZXh0Rm5cclxuICAgICAgICAgICAgPyBtYXNrVGV4dEZuKHRleHRDb250ZW50KVxyXG4gICAgICAgICAgICA6IHRleHRDb250ZW50LnJlcGxhY2UoL1tcXFNdL2csICcqJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IE5vZGVUeXBlLlRleHQsXHJcbiAgICAgICAgdGV4dENvbnRlbnQ6IHRleHRDb250ZW50IHx8ICcnLFxyXG4gICAgICAgIGlzU3R5bGU6IGlzU3R5bGUsXHJcbiAgICAgICAgcm9vdElkOiByb290SWRcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gc2VyaWFsaXplRWxlbWVudE5vZGUobiwgb3B0aW9ucykge1xyXG4gICAgdmFyIGRvYyA9IG9wdGlvbnMuZG9jLCBibG9ja0NsYXNzID0gb3B0aW9ucy5ibG9ja0NsYXNzLCBibG9ja1NlbGVjdG9yID0gb3B0aW9ucy5ibG9ja1NlbGVjdG9yLCBpbmxpbmVTdHlsZXNoZWV0ID0gb3B0aW9ucy5pbmxpbmVTdHlsZXNoZWV0LCBfYSA9IG9wdGlvbnMubWFza0lucHV0T3B0aW9ucywgbWFza0lucHV0T3B0aW9ucyA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCBtYXNrSW5wdXRGbiA9IG9wdGlvbnMubWFza0lucHV0Rm4sIF9iID0gb3B0aW9ucy5kYXRhVVJMT3B0aW9ucywgZGF0YVVSTE9wdGlvbnMgPSBfYiA9PT0gdm9pZCAwID8ge30gOiBfYiwgaW5saW5lSW1hZ2VzID0gb3B0aW9ucy5pbmxpbmVJbWFnZXMsIHJlY29yZENhbnZhcyA9IG9wdGlvbnMucmVjb3JkQ2FudmFzLCBrZWVwSWZyYW1lU3JjRm4gPSBvcHRpb25zLmtlZXBJZnJhbWVTcmNGbiwgX2MgPSBvcHRpb25zLm5ld2x5QWRkZWRFbGVtZW50LCBuZXdseUFkZGVkRWxlbWVudCA9IF9jID09PSB2b2lkIDAgPyBmYWxzZSA6IF9jLCByb290SWQgPSBvcHRpb25zLnJvb3RJZDtcclxuICAgIHZhciBuZWVkQmxvY2sgPSBfaXNCbG9ja2VkRWxlbWVudChuLCBibG9ja0NsYXNzLCBibG9ja1NlbGVjdG9yKTtcclxuICAgIHZhciB0YWdOYW1lID0gZ2V0VmFsaWRUYWdOYW1lKG4pO1xyXG4gICAgdmFyIGF0dHJpYnV0ZXMgPSB7fTtcclxuICAgIHZhciBsZW4gPSBuLmF0dHJpYnV0ZXMubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIHZhciBhdHRyID0gbi5hdHRyaWJ1dGVzW2ldO1xyXG4gICAgICAgIGlmICghaWdub3JlQXR0cmlidXRlKHRhZ05hbWUsIGF0dHIubmFtZSwgYXR0ci52YWx1ZSkpIHtcclxuICAgICAgICAgICAgYXR0cmlidXRlc1thdHRyLm5hbWVdID0gdHJhbnNmb3JtQXR0cmlidXRlKGRvYywgdGFnTmFtZSwgdG9Mb3dlckNhc2UoYXR0ci5uYW1lKSwgYXR0ci52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhZ05hbWUgPT09ICdsaW5rJyAmJiBpbmxpbmVTdHlsZXNoZWV0KSB7XHJcbiAgICAgICAgdmFyIHN0eWxlc2hlZXQgPSBBcnJheS5mcm9tKGRvYy5zdHlsZVNoZWV0cykuZmluZChmdW5jdGlvbiAocykge1xyXG4gICAgICAgICAgICByZXR1cm4gcy5ocmVmID09PSBuLmhyZWY7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGNzc1RleHQgPSBudWxsO1xyXG4gICAgICAgIGlmIChzdHlsZXNoZWV0KSB7XHJcbiAgICAgICAgICAgIGNzc1RleHQgPSBzdHJpbmdpZnlTdHlsZXNoZWV0KHN0eWxlc2hlZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3NzVGV4dCkge1xyXG4gICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlcy5yZWw7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzLmhyZWY7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuX2Nzc1RleHQgPSBhYnNvbHV0ZVRvU3R5bGVzaGVldChjc3NUZXh0LCBzdHlsZXNoZWV0LmhyZWYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YWdOYW1lID09PSAnc3R5bGUnICYmXHJcbiAgICAgICAgbi5zaGVldCAmJlxyXG4gICAgICAgICEobi5pbm5lclRleHQgfHwgbi50ZXh0Q29udGVudCB8fCAnJykudHJpbSgpLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBjc3NUZXh0ID0gc3RyaW5naWZ5U3R5bGVzaGVldChuLnNoZWV0KTtcclxuICAgICAgICBpZiAoY3NzVGV4dCkge1xyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzLl9jc3NUZXh0ID0gYWJzb2x1dGVUb1N0eWxlc2hlZXQoY3NzVGV4dCwgZ2V0SHJlZigpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFnTmFtZSA9PT0gJ2lucHV0JyB8fCB0YWdOYW1lID09PSAndGV4dGFyZWEnIHx8IHRhZ05hbWUgPT09ICdzZWxlY3QnKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gbi52YWx1ZTtcclxuICAgICAgICB2YXIgY2hlY2tlZCA9IG4uY2hlY2tlZDtcclxuICAgICAgICBpZiAoYXR0cmlidXRlcy50eXBlICE9PSAncmFkaW8nICYmXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMudHlwZSAhPT0gJ2NoZWNrYm94JyAmJlxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzLnR5cGUgIT09ICdzdWJtaXQnICYmXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMudHlwZSAhPT0gJ2J1dHRvbicgJiZcclxuICAgICAgICAgICAgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBnZXRJbnB1dFR5cGUobik7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMudmFsdWUgPSBtYXNrSW5wdXRWYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBuLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgIHRhZ05hbWU6IHRhZ05hbWUsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICBtYXNrSW5wdXRPcHRpb25zOiBtYXNrSW5wdXRPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgbWFza0lucHV0Rm46IG1hc2tJbnB1dEZuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjaGVja2VkKSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2hlY2tlZCA9IGNoZWNrZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhZ05hbWUgPT09ICdvcHRpb24nKSB7XHJcbiAgICAgICAgaWYgKG4uc2VsZWN0ZWQgJiYgIW1hc2tJbnB1dE9wdGlvbnNbJ3NlbGVjdCddKSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXMuc2VsZWN0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhZ05hbWUgPT09ICdjYW52YXMnICYmIHJlY29yZENhbnZhcykge1xyXG4gICAgICAgIGlmIChuLl9fY29udGV4dCA9PT0gJzJkJykge1xyXG4gICAgICAgICAgICBpZiAoIWlzMkRDYW52YXNCbGFuayhuKSkge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5ycl9kYXRhVVJMID0gbi50b0RhdGFVUkwoZGF0YVVSTE9wdGlvbnMudHlwZSwgZGF0YVVSTE9wdGlvbnMucXVhbGl0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoISgnX19jb250ZXh0JyBpbiBuKSkge1xyXG4gICAgICAgICAgICB2YXIgY2FudmFzRGF0YVVSTCA9IG4udG9EYXRhVVJMKGRhdGFVUkxPcHRpb25zLnR5cGUsIGRhdGFVUkxPcHRpb25zLnF1YWxpdHkpO1xyXG4gICAgICAgICAgICB2YXIgYmxhbmtDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICAgICAgYmxhbmtDYW52YXMud2lkdGggPSBuLndpZHRoO1xyXG4gICAgICAgICAgICBibGFua0NhbnZhcy5oZWlnaHQgPSBuLmhlaWdodDtcclxuICAgICAgICAgICAgdmFyIGJsYW5rQ2FudmFzRGF0YVVSTCA9IGJsYW5rQ2FudmFzLnRvRGF0YVVSTChkYXRhVVJMT3B0aW9ucy50eXBlLCBkYXRhVVJMT3B0aW9ucy5xdWFsaXR5KTtcclxuICAgICAgICAgICAgaWYgKGNhbnZhc0RhdGFVUkwgIT09IGJsYW5rQ2FudmFzRGF0YVVSTCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5ycl9kYXRhVVJMID0gY2FudmFzRGF0YVVSTDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YWdOYW1lID09PSAnaW1nJyAmJiBpbmxpbmVJbWFnZXMpIHtcclxuICAgICAgICBpZiAoIWNhbnZhc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgY2FudmFzU2VydmljZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICAgICAgY2FudmFzQ3R4ID0gY2FudmFzU2VydmljZS5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaW1hZ2VfMSA9IG47XHJcbiAgICAgICAgdmFyIG9sZFZhbHVlXzEgPSBpbWFnZV8xLmNyb3NzT3JpZ2luO1xyXG4gICAgICAgIGltYWdlXzEuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcclxuICAgICAgICB2YXIgcmVjb3JkSW5saW5lSW1hZ2VfMSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaW1hZ2VfMS5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgcmVjb3JkSW5saW5lSW1hZ2VfMSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjYW52YXNTZXJ2aWNlLndpZHRoID0gaW1hZ2VfMS5uYXR1cmFsV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBjYW52YXNTZXJ2aWNlLmhlaWdodCA9IGltYWdlXzEubmF0dXJhbEhlaWdodDtcclxuICAgICAgICAgICAgICAgIGNhbnZhc0N0eC5kcmF3SW1hZ2UoaW1hZ2VfMSwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnJyX2RhdGFVUkwgPSBjYW52YXNTZXJ2aWNlLnRvRGF0YVVSTChkYXRhVVJMT3B0aW9ucy50eXBlLCBkYXRhVVJMT3B0aW9ucy5xdWFsaXR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDYW5ub3QgaW5saW5lIGltZyBzcmM9XCIuY29uY2F0KGltYWdlXzEuY3VycmVudFNyYywgXCIhIEVycm9yOiBcIikuY29uY2F0KGVycikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9sZFZhbHVlXzFcclxuICAgICAgICAgICAgICAgID8gKGF0dHJpYnV0ZXMuY3Jvc3NPcmlnaW4gPSBvbGRWYWx1ZV8xKVxyXG4gICAgICAgICAgICAgICAgOiBpbWFnZV8xLnJlbW92ZUF0dHJpYnV0ZSgnY3Jvc3NvcmlnaW4nKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChpbWFnZV8xLmNvbXBsZXRlICYmIGltYWdlXzEubmF0dXJhbFdpZHRoICE9PSAwKVxyXG4gICAgICAgICAgICByZWNvcmRJbmxpbmVJbWFnZV8xKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBpbWFnZV8xLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByZWNvcmRJbmxpbmVJbWFnZV8xKTtcclxuICAgIH1cclxuICAgIGlmICh0YWdOYW1lID09PSAnYXVkaW8nIHx8IHRhZ05hbWUgPT09ICd2aWRlbycpIHtcclxuICAgICAgICBhdHRyaWJ1dGVzLnJyX21lZGlhU3RhdGUgPSBuLnBhdXNlZFxyXG4gICAgICAgICAgICA/ICdwYXVzZWQnXHJcbiAgICAgICAgICAgIDogJ3BsYXllZCc7XHJcbiAgICAgICAgYXR0cmlidXRlcy5ycl9tZWRpYUN1cnJlbnRUaW1lID0gbi5jdXJyZW50VGltZTtcclxuICAgIH1cclxuICAgIGlmICghbmV3bHlBZGRlZEVsZW1lbnQpIHtcclxuICAgICAgICBpZiAobi5zY3JvbGxMZWZ0KSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMucnJfc2Nyb2xsTGVmdCA9IG4uc2Nyb2xsTGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG4uc2Nyb2xsVG9wKSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMucnJfc2Nyb2xsVG9wID0gbi5zY3JvbGxUb3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG5lZWRCbG9jaykge1xyXG4gICAgICAgIHZhciBfZCA9IG4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHdpZHRoID0gX2Qud2lkdGgsIGhlaWdodCA9IF9kLmhlaWdodDtcclxuICAgICAgICBhdHRyaWJ1dGVzID0ge1xyXG4gICAgICAgICAgICBcImNsYXNzXCI6IGF0dHJpYnV0ZXNbXCJjbGFzc1wiXSxcclxuICAgICAgICAgICAgcnJfd2lkdGg6IFwiXCIuY29uY2F0KHdpZHRoLCBcInB4XCIpLFxyXG4gICAgICAgICAgICBycl9oZWlnaHQ6IFwiXCIuY29uY2F0KGhlaWdodCwgXCJweFwiKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAodGFnTmFtZSA9PT0gJ2lmcmFtZScgJiYgIWtlZXBJZnJhbWVTcmNGbihhdHRyaWJ1dGVzLnNyYykpIHtcclxuICAgICAgICBpZiAoIW4uY29udGVudERvY3VtZW50KSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMucnJfc3JjID0gYXR0cmlidXRlcy5zcmM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzLnNyYztcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogTm9kZVR5cGUuRWxlbWVudCxcclxuICAgICAgICB0YWdOYW1lOiB0YWdOYW1lLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXHJcbiAgICAgICAgY2hpbGROb2RlczogW10sXHJcbiAgICAgICAgaXNTVkc6IGlzU1ZHRWxlbWVudChuKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgbmVlZEJsb2NrOiBuZWVkQmxvY2ssXHJcbiAgICAgICAgcm9vdElkOiByb290SWRcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gbG93ZXJJZkV4aXN0cyhtYXliZUF0dHIpIHtcclxuICAgIGlmIChtYXliZUF0dHIgPT09IHVuZGVmaW5lZCB8fCBtYXliZUF0dHIgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbWF5YmVBdHRyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2xpbURPTUV4Y2x1ZGVkKHNuLCBzbGltRE9NT3B0aW9ucykge1xyXG4gICAgaWYgKHNsaW1ET01PcHRpb25zLmNvbW1lbnQgJiYgc24udHlwZSA9PT0gTm9kZVR5cGUuQ29tbWVudCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc24udHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCkge1xyXG4gICAgICAgIGlmIChzbGltRE9NT3B0aW9ucy5zY3JpcHQgJiZcclxuICAgICAgICAgICAgKHNuLnRhZ05hbWUgPT09ICdzY3JpcHQnIHx8XHJcbiAgICAgICAgICAgICAgICAoc24udGFnTmFtZSA9PT0gJ2xpbmsnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKHNuLmF0dHJpYnV0ZXMucmVsID09PSAncHJlbG9hZCcgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc24uYXR0cmlidXRlcy5yZWwgPT09ICdtb2R1bGVwcmVsb2FkJykgJiZcclxuICAgICAgICAgICAgICAgICAgICBzbi5hdHRyaWJ1dGVzLmFzID09PSAnc2NyaXB0JykgfHxcclxuICAgICAgICAgICAgICAgIChzbi50YWdOYW1lID09PSAnbGluaycgJiZcclxuICAgICAgICAgICAgICAgICAgICBzbi5hdHRyaWJ1dGVzLnJlbCA9PT0gJ3ByZWZldGNoJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBzbi5hdHRyaWJ1dGVzLmhyZWYgPT09ICdzdHJpbmcnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgc24uYXR0cmlidXRlcy5ocmVmLmVuZHNXaXRoKCcuanMnKSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzbGltRE9NT3B0aW9ucy5oZWFkRmF2aWNvbiAmJlxyXG4gICAgICAgICAgICAoKHNuLnRhZ05hbWUgPT09ICdsaW5rJyAmJiBzbi5hdHRyaWJ1dGVzLnJlbCA9PT0gJ3Nob3J0Y3V0IGljb24nKSB8fFxyXG4gICAgICAgICAgICAgICAgKHNuLnRhZ05hbWUgPT09ICdtZXRhJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkubWF0Y2goL15tc2FwcGxpY2F0aW9uLXRpbGUoaW1hZ2V8Y29sb3IpJC8pIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKSA9PT0gJ2FwcGxpY2F0aW9uLW5hbWUnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5yZWwpID09PSAnaWNvbicgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLnJlbCkgPT09ICdhcHBsZS10b3VjaC1pY29uJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMucmVsKSA9PT0gJ3Nob3J0Y3V0IGljb24nKSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzbi50YWdOYW1lID09PSAnbWV0YScpIHtcclxuICAgICAgICAgICAgaWYgKHNsaW1ET01PcHRpb25zLmhlYWRNZXRhRGVzY0tleXdvcmRzICYmXHJcbiAgICAgICAgICAgICAgICBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkubWF0Y2goL15kZXNjcmlwdGlvbnxrZXl3b3JkcyQvKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2xpbURPTU9wdGlvbnMuaGVhZE1ldGFTb2NpYWwgJiZcclxuICAgICAgICAgICAgICAgIChsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMucHJvcGVydHkpLm1hdGNoKC9eKG9nfHR3aXR0ZXJ8ZmIpOi8pIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpLm1hdGNoKC9eKG9nfHR3aXR0ZXIpOi8pIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpID09PSAncGludGVyZXN0JykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNsaW1ET01PcHRpb25zLmhlYWRNZXRhUm9ib3RzICYmXHJcbiAgICAgICAgICAgICAgICAobG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpID09PSAncm9ib3RzJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKSA9PT0gJ2dvb2dsZWJvdCcgfHxcclxuICAgICAgICAgICAgICAgICAgICBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkgPT09ICdiaW5nYm90JykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNsaW1ET01PcHRpb25zLmhlYWRNZXRhSHR0cEVxdWl2ICYmXHJcbiAgICAgICAgICAgICAgICBzbi5hdHRyaWJ1dGVzWydodHRwLWVxdWl2J10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2xpbURPTU9wdGlvbnMuaGVhZE1ldGFBdXRob3JzaGlwICYmXHJcbiAgICAgICAgICAgICAgICAobG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpID09PSAnYXV0aG9yJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKSA9PT0gJ2dlbmVyYXRvcicgfHxcclxuICAgICAgICAgICAgICAgICAgICBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkgPT09ICdmcmFtZXdvcmsnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpID09PSAncHVibGlzaGVyJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKSA9PT0gJ3Byb2dpZCcgfHxcclxuICAgICAgICAgICAgICAgICAgICBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMucHJvcGVydHkpLm1hdGNoKC9eYXJ0aWNsZTovKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5wcm9wZXJ0eSkubWF0Y2goL15wcm9kdWN0Oi8pKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2xpbURPTU9wdGlvbnMuaGVhZE1ldGFWZXJpZmljYXRpb24gJiZcclxuICAgICAgICAgICAgICAgIChsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkgPT09ICdnb29nbGUtc2l0ZS12ZXJpZmljYXRpb24nIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpID09PSAneWFuZGV4LXZlcmlmaWNhdGlvbicgfHxcclxuICAgICAgICAgICAgICAgICAgICBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkgPT09ICdjc3JmLXRva2VuJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKSA9PT0gJ3A6ZG9tYWluX3ZlcmlmeScgfHxcclxuICAgICAgICAgICAgICAgICAgICBsb3dlcklmRXhpc3RzKHNuLmF0dHJpYnV0ZXMubmFtZSkgPT09ICd2ZXJpZnktdjEnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgbG93ZXJJZkV4aXN0cyhzbi5hdHRyaWJ1dGVzLm5hbWUpID09PSAndmVyaWZpY2F0aW9uJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VySWZFeGlzdHMoc24uYXR0cmlidXRlcy5uYW1lKSA9PT0gJ3Nob3BpZnktY2hlY2tvdXQtYXBpLXRva2VuJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmZ1bmN0aW9uIHNlcmlhbGl6ZU5vZGVXaXRoSWQobiwgb3B0aW9ucykge1xyXG4gICAgdmFyIGRvYyA9IG9wdGlvbnMuZG9jLCBtaXJyb3IgPSBvcHRpb25zLm1pcnJvciwgYmxvY2tDbGFzcyA9IG9wdGlvbnMuYmxvY2tDbGFzcywgYmxvY2tTZWxlY3RvciA9IG9wdGlvbnMuYmxvY2tTZWxlY3RvciwgbWFza1RleHRDbGFzcyA9IG9wdGlvbnMubWFza1RleHRDbGFzcywgbWFza1RleHRTZWxlY3RvciA9IG9wdGlvbnMubWFza1RleHRTZWxlY3RvciwgX2EgPSBvcHRpb25zLnNraXBDaGlsZCwgc2tpcENoaWxkID0gX2EgPT09IHZvaWQgMCA/IGZhbHNlIDogX2EsIF9iID0gb3B0aW9ucy5pbmxpbmVTdHlsZXNoZWV0LCBpbmxpbmVTdHlsZXNoZWV0ID0gX2IgPT09IHZvaWQgMCA/IHRydWUgOiBfYiwgX2MgPSBvcHRpb25zLm1hc2tJbnB1dE9wdGlvbnMsIG1hc2tJbnB1dE9wdGlvbnMgPSBfYyA9PT0gdm9pZCAwID8ge30gOiBfYywgbWFza1RleHRGbiA9IG9wdGlvbnMubWFza1RleHRGbiwgbWFza0lucHV0Rm4gPSBvcHRpb25zLm1hc2tJbnB1dEZuLCBzbGltRE9NT3B0aW9ucyA9IG9wdGlvbnMuc2xpbURPTU9wdGlvbnMsIF9kID0gb3B0aW9ucy5kYXRhVVJMT3B0aW9ucywgZGF0YVVSTE9wdGlvbnMgPSBfZCA9PT0gdm9pZCAwID8ge30gOiBfZCwgX2UgPSBvcHRpb25zLmlubGluZUltYWdlcywgaW5saW5lSW1hZ2VzID0gX2UgPT09IHZvaWQgMCA/IGZhbHNlIDogX2UsIF9mID0gb3B0aW9ucy5yZWNvcmRDYW52YXMsIHJlY29yZENhbnZhcyA9IF9mID09PSB2b2lkIDAgPyBmYWxzZSA6IF9mLCBvblNlcmlhbGl6ZSA9IG9wdGlvbnMub25TZXJpYWxpemUsIG9uSWZyYW1lTG9hZCA9IG9wdGlvbnMub25JZnJhbWVMb2FkLCBfZyA9IG9wdGlvbnMuaWZyYW1lTG9hZFRpbWVvdXQsIGlmcmFtZUxvYWRUaW1lb3V0ID0gX2cgPT09IHZvaWQgMCA/IDUwMDAgOiBfZywgb25TdHlsZXNoZWV0TG9hZCA9IG9wdGlvbnMub25TdHlsZXNoZWV0TG9hZCwgX2ggPSBvcHRpb25zLnN0eWxlc2hlZXRMb2FkVGltZW91dCwgc3R5bGVzaGVldExvYWRUaW1lb3V0ID0gX2ggPT09IHZvaWQgMCA/IDUwMDAgOiBfaCwgX2ogPSBvcHRpb25zLmtlZXBJZnJhbWVTcmNGbiwga2VlcElmcmFtZVNyY0ZuID0gX2ogPT09IHZvaWQgMCA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9IDogX2osIF9rID0gb3B0aW9ucy5uZXdseUFkZGVkRWxlbWVudCwgbmV3bHlBZGRlZEVsZW1lbnQgPSBfayA9PT0gdm9pZCAwID8gZmFsc2UgOiBfaztcclxuICAgIHZhciBfbCA9IG9wdGlvbnMucHJlc2VydmVXaGl0ZVNwYWNlLCBwcmVzZXJ2ZVdoaXRlU3BhY2UgPSBfbCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9sO1xyXG4gICAgdmFyIF9zZXJpYWxpemVkTm9kZSA9IHNlcmlhbGl6ZU5vZGUobiwge1xyXG4gICAgICAgIGRvYzogZG9jLFxyXG4gICAgICAgIG1pcnJvcjogbWlycm9yLFxyXG4gICAgICAgIGJsb2NrQ2xhc3M6IGJsb2NrQ2xhc3MsXHJcbiAgICAgICAgYmxvY2tTZWxlY3RvcjogYmxvY2tTZWxlY3RvcixcclxuICAgICAgICBtYXNrVGV4dENsYXNzOiBtYXNrVGV4dENsYXNzLFxyXG4gICAgICAgIG1hc2tUZXh0U2VsZWN0b3I6IG1hc2tUZXh0U2VsZWN0b3IsXHJcbiAgICAgICAgaW5saW5lU3R5bGVzaGVldDogaW5saW5lU3R5bGVzaGVldCxcclxuICAgICAgICBtYXNrSW5wdXRPcHRpb25zOiBtYXNrSW5wdXRPcHRpb25zLFxyXG4gICAgICAgIG1hc2tUZXh0Rm46IG1hc2tUZXh0Rm4sXHJcbiAgICAgICAgbWFza0lucHV0Rm46IG1hc2tJbnB1dEZuLFxyXG4gICAgICAgIGRhdGFVUkxPcHRpb25zOiBkYXRhVVJMT3B0aW9ucyxcclxuICAgICAgICBpbmxpbmVJbWFnZXM6IGlubGluZUltYWdlcyxcclxuICAgICAgICByZWNvcmRDYW52YXM6IHJlY29yZENhbnZhcyxcclxuICAgICAgICBrZWVwSWZyYW1lU3JjRm46IGtlZXBJZnJhbWVTcmNGbixcclxuICAgICAgICBuZXdseUFkZGVkRWxlbWVudDogbmV3bHlBZGRlZEVsZW1lbnRcclxuICAgIH0pO1xyXG4gICAgaWYgKCFfc2VyaWFsaXplZE5vZGUpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4obiwgJ25vdCBzZXJpYWxpemVkJyk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICB2YXIgaWQ7XHJcbiAgICBpZiAobWlycm9yLmhhc05vZGUobikpIHtcclxuICAgICAgICBpZCA9IG1pcnJvci5nZXRJZChuKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNsaW1ET01FeGNsdWRlZChfc2VyaWFsaXplZE5vZGUsIHNsaW1ET01PcHRpb25zKSB8fFxyXG4gICAgICAgICghcHJlc2VydmVXaGl0ZVNwYWNlICYmXHJcbiAgICAgICAgICAgIF9zZXJpYWxpemVkTm9kZS50eXBlID09PSBOb2RlVHlwZS5UZXh0ICYmXHJcbiAgICAgICAgICAgICFfc2VyaWFsaXplZE5vZGUuaXNTdHlsZSAmJlxyXG4gICAgICAgICAgICAhX3NlcmlhbGl6ZWROb2RlLnRleHRDb250ZW50LnJlcGxhY2UoL15cXHMrfFxccyskL2dtLCAnJykubGVuZ3RoKSkge1xyXG4gICAgICAgIGlkID0gSUdOT1JFRF9OT0RFO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWQgPSBnZW5JZCgpO1xyXG4gICAgfVxyXG4gICAgdmFyIHNlcmlhbGl6ZWROb2RlID0gT2JqZWN0LmFzc2lnbihfc2VyaWFsaXplZE5vZGUsIHsgaWQ6IGlkIH0pO1xyXG4gICAgbWlycm9yLmFkZChuLCBzZXJpYWxpemVkTm9kZSk7XHJcbiAgICBpZiAoaWQgPT09IElHTk9SRURfTk9ERSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKG9uU2VyaWFsaXplKSB7XHJcbiAgICAgICAgb25TZXJpYWxpemUobik7XHJcbiAgICB9XHJcbiAgICB2YXIgcmVjb3JkQ2hpbGQgPSAhc2tpcENoaWxkO1xyXG4gICAgaWYgKHNlcmlhbGl6ZWROb2RlLnR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQpIHtcclxuICAgICAgICByZWNvcmRDaGlsZCA9IHJlY29yZENoaWxkICYmICFzZXJpYWxpemVkTm9kZS5uZWVkQmxvY2s7XHJcbiAgICAgICAgZGVsZXRlIHNlcmlhbGl6ZWROb2RlLm5lZWRCbG9jaztcclxuICAgICAgICB2YXIgc2hhZG93Um9vdCA9IG4uc2hhZG93Um9vdDtcclxuICAgICAgICBpZiAoc2hhZG93Um9vdCAmJiBpc05hdGl2ZVNoYWRvd0RvbShzaGFkb3dSb290KSlcclxuICAgICAgICAgICAgc2VyaWFsaXplZE5vZGUuaXNTaGFkb3dIb3N0ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICgoc2VyaWFsaXplZE5vZGUudHlwZSA9PT0gTm9kZVR5cGUuRG9jdW1lbnQgfHxcclxuICAgICAgICBzZXJpYWxpemVkTm9kZS50eXBlID09PSBOb2RlVHlwZS5FbGVtZW50KSAmJlxyXG4gICAgICAgIHJlY29yZENoaWxkKSB7XHJcbiAgICAgICAgaWYgKHNsaW1ET01PcHRpb25zLmhlYWRXaGl0ZXNwYWNlICYmXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZWROb2RlLnR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQgJiZcclxuICAgICAgICAgICAgc2VyaWFsaXplZE5vZGUudGFnTmFtZSA9PT0gJ2hlYWQnKSB7XHJcbiAgICAgICAgICAgIHByZXNlcnZlV2hpdGVTcGFjZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYnlwYXNzT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgZG9jOiBkb2MsXHJcbiAgICAgICAgICAgIG1pcnJvcjogbWlycm9yLFxyXG4gICAgICAgICAgICBibG9ja0NsYXNzOiBibG9ja0NsYXNzLFxyXG4gICAgICAgICAgICBibG9ja1NlbGVjdG9yOiBibG9ja1NlbGVjdG9yLFxyXG4gICAgICAgICAgICBtYXNrVGV4dENsYXNzOiBtYXNrVGV4dENsYXNzLFxyXG4gICAgICAgICAgICBtYXNrVGV4dFNlbGVjdG9yOiBtYXNrVGV4dFNlbGVjdG9yLFxyXG4gICAgICAgICAgICBza2lwQ2hpbGQ6IHNraXBDaGlsZCxcclxuICAgICAgICAgICAgaW5saW5lU3R5bGVzaGVldDogaW5saW5lU3R5bGVzaGVldCxcclxuICAgICAgICAgICAgbWFza0lucHV0T3B0aW9uczogbWFza0lucHV0T3B0aW9ucyxcclxuICAgICAgICAgICAgbWFza1RleHRGbjogbWFza1RleHRGbixcclxuICAgICAgICAgICAgbWFza0lucHV0Rm46IG1hc2tJbnB1dEZuLFxyXG4gICAgICAgICAgICBzbGltRE9NT3B0aW9uczogc2xpbURPTU9wdGlvbnMsXHJcbiAgICAgICAgICAgIGRhdGFVUkxPcHRpb25zOiBkYXRhVVJMT3B0aW9ucyxcclxuICAgICAgICAgICAgaW5saW5lSW1hZ2VzOiBpbmxpbmVJbWFnZXMsXHJcbiAgICAgICAgICAgIHJlY29yZENhbnZhczogcmVjb3JkQ2FudmFzLFxyXG4gICAgICAgICAgICBwcmVzZXJ2ZVdoaXRlU3BhY2U6IHByZXNlcnZlV2hpdGVTcGFjZSxcclxuICAgICAgICAgICAgb25TZXJpYWxpemU6IG9uU2VyaWFsaXplLFxyXG4gICAgICAgICAgICBvbklmcmFtZUxvYWQ6IG9uSWZyYW1lTG9hZCxcclxuICAgICAgICAgICAgaWZyYW1lTG9hZFRpbWVvdXQ6IGlmcmFtZUxvYWRUaW1lb3V0LFxyXG4gICAgICAgICAgICBvblN0eWxlc2hlZXRMb2FkOiBvblN0eWxlc2hlZXRMb2FkLFxyXG4gICAgICAgICAgICBzdHlsZXNoZWV0TG9hZFRpbWVvdXQ6IHN0eWxlc2hlZXRMb2FkVGltZW91dCxcclxuICAgICAgICAgICAga2VlcElmcmFtZVNyY0ZuOiBrZWVwSWZyYW1lU3JjRm5cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX20gPSBBcnJheS5mcm9tKG4uY2hpbGROb2Rlcyk7IF9pIDwgX20ubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZE4gPSBfbVtfaV07XHJcbiAgICAgICAgICAgIHZhciBzZXJpYWxpemVkQ2hpbGROb2RlID0gc2VyaWFsaXplTm9kZVdpdGhJZChjaGlsZE4sIGJ5cGFzc09wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAoc2VyaWFsaXplZENoaWxkTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplZE5vZGUuY2hpbGROb2Rlcy5wdXNoKHNlcmlhbGl6ZWRDaGlsZE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0VsZW1lbnQobikgJiYgbi5zaGFkb3dSb290KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9vID0gMCwgX3AgPSBBcnJheS5mcm9tKG4uc2hhZG93Um9vdC5jaGlsZE5vZGVzKTsgX28gPCBfcC5sZW5ndGg7IF9vKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZE4gPSBfcFtfb107XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VyaWFsaXplZENoaWxkTm9kZSA9IHNlcmlhbGl6ZU5vZGVXaXRoSWQoY2hpbGROLCBieXBhc3NPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZXJpYWxpemVkQ2hpbGROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNOYXRpdmVTaGFkb3dEb20obi5zaGFkb3dSb290KSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoc2VyaWFsaXplZENoaWxkTm9kZS5pc1NoYWRvdyA9IHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWROb2RlLmNoaWxkTm9kZXMucHVzaChzZXJpYWxpemVkQ2hpbGROb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChuLnBhcmVudE5vZGUgJiZcclxuICAgICAgICBpc1NoYWRvd1Jvb3Qobi5wYXJlbnROb2RlKSAmJlxyXG4gICAgICAgIGlzTmF0aXZlU2hhZG93RG9tKG4ucGFyZW50Tm9kZSkpIHtcclxuICAgICAgICBzZXJpYWxpemVkTm9kZS5pc1NoYWRvdyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoc2VyaWFsaXplZE5vZGUudHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCAmJlxyXG4gICAgICAgIHNlcmlhbGl6ZWROb2RlLnRhZ05hbWUgPT09ICdpZnJhbWUnKSB7XHJcbiAgICAgICAgb25jZUlmcmFtZUxvYWRlZChuLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpZnJhbWVEb2MgPSBuLmNvbnRlbnREb2N1bWVudDtcclxuICAgICAgICAgICAgaWYgKGlmcmFtZURvYyAmJiBvbklmcmFtZUxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZXJpYWxpemVkSWZyYW1lTm9kZSA9IHNlcmlhbGl6ZU5vZGVXaXRoSWQoaWZyYW1lRG9jLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jOiBpZnJhbWVEb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgbWlycm9yOiBtaXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tDbGFzczogYmxvY2tDbGFzcyxcclxuICAgICAgICAgICAgICAgICAgICBibG9ja1NlbGVjdG9yOiBibG9ja1NlbGVjdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tUZXh0Q2xhc3M6IG1hc2tUZXh0Q2xhc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFza1RleHRTZWxlY3RvcjogbWFza1RleHRTZWxlY3RvcixcclxuICAgICAgICAgICAgICAgICAgICBza2lwQ2hpbGQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGlubGluZVN0eWxlc2hlZXQ6IGlubGluZVN0eWxlc2hlZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFza0lucHV0T3B0aW9uczogbWFza0lucHV0T3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICBtYXNrVGV4dEZuOiBtYXNrVGV4dEZuLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tJbnB1dEZuOiBtYXNrSW5wdXRGbixcclxuICAgICAgICAgICAgICAgICAgICBzbGltRE9NT3B0aW9uczogc2xpbURPTU9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVVSTE9wdGlvbnM6IGRhdGFVUkxPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgIGlubGluZUltYWdlczogaW5saW5lSW1hZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZENhbnZhczogcmVjb3JkQ2FudmFzLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXNlcnZlV2hpdGVTcGFjZTogcHJlc2VydmVXaGl0ZVNwYWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VyaWFsaXplOiBvblNlcmlhbGl6ZSxcclxuICAgICAgICAgICAgICAgICAgICBvbklmcmFtZUxvYWQ6IG9uSWZyYW1lTG9hZCxcclxuICAgICAgICAgICAgICAgICAgICBpZnJhbWVMb2FkVGltZW91dDogaWZyYW1lTG9hZFRpbWVvdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgb25TdHlsZXNoZWV0TG9hZDogb25TdHlsZXNoZWV0TG9hZCxcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZXNoZWV0TG9hZFRpbWVvdXQ6IHN0eWxlc2hlZXRMb2FkVGltZW91dCxcclxuICAgICAgICAgICAgICAgICAgICBrZWVwSWZyYW1lU3JjRm46IGtlZXBJZnJhbWVTcmNGblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VyaWFsaXplZElmcmFtZU5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbklmcmFtZUxvYWQobiwgc2VyaWFsaXplZElmcmFtZU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaWZyYW1lTG9hZFRpbWVvdXQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHNlcmlhbGl6ZWROb2RlLnR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQgJiZcclxuICAgICAgICBzZXJpYWxpemVkTm9kZS50YWdOYW1lID09PSAnbGluaycgJiZcclxuICAgICAgICBzZXJpYWxpemVkTm9kZS5hdHRyaWJ1dGVzLnJlbCA9PT0gJ3N0eWxlc2hlZXQnKSB7XHJcbiAgICAgICAgb25jZVN0eWxlc2hlZXRMb2FkZWQobiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAob25TdHlsZXNoZWV0TG9hZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlcmlhbGl6ZWRMaW5rTm9kZSA9IHNlcmlhbGl6ZU5vZGVXaXRoSWQobiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvYzogZG9jLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pcnJvcjogbWlycm9yLFxyXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrQ2xhc3M6IGJsb2NrQ2xhc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tTZWxlY3RvcjogYmxvY2tTZWxlY3RvcixcclxuICAgICAgICAgICAgICAgICAgICBtYXNrVGV4dENsYXNzOiBtYXNrVGV4dENsYXNzLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tUZXh0U2VsZWN0b3I6IG1hc2tUZXh0U2VsZWN0b3IsXHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcENoaWxkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbmxpbmVTdHlsZXNoZWV0OiBpbmxpbmVTdHlsZXNoZWV0LFxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tJbnB1dE9wdGlvbnM6IG1hc2tJbnB1dE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFza1RleHRGbjogbWFza1RleHRGbixcclxuICAgICAgICAgICAgICAgICAgICBtYXNrSW5wdXRGbjogbWFza0lucHV0Rm4sXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpbURPTU9wdGlvbnM6IHNsaW1ET01PcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFVUkxPcHRpb25zOiBkYXRhVVJMT3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICBpbmxpbmVJbWFnZXM6IGlubGluZUltYWdlcyxcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRDYW52YXM6IHJlY29yZENhbnZhcyxcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZXJ2ZVdoaXRlU3BhY2U6IHByZXNlcnZlV2hpdGVTcGFjZSxcclxuICAgICAgICAgICAgICAgICAgICBvblNlcmlhbGl6ZTogb25TZXJpYWxpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgb25JZnJhbWVMb2FkOiBvbklmcmFtZUxvYWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lTG9hZFRpbWVvdXQ6IGlmcmFtZUxvYWRUaW1lb3V0LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uU3R5bGVzaGVldExvYWQ6IG9uU3R5bGVzaGVldExvYWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzaGVldExvYWRUaW1lb3V0OiBzdHlsZXNoZWV0TG9hZFRpbWVvdXQsXHJcbiAgICAgICAgICAgICAgICAgICAga2VlcElmcmFtZVNyY0ZuOiBrZWVwSWZyYW1lU3JjRm5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlcmlhbGl6ZWRMaW5rTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU3R5bGVzaGVldExvYWQobiwgc2VyaWFsaXplZExpbmtOb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHN0eWxlc2hlZXRMb2FkVGltZW91dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VyaWFsaXplZE5vZGU7XHJcbn1cclxuZnVuY3Rpb24gc25hcHNob3Qobiwgb3B0aW9ucykge1xyXG4gICAgdmFyIF9hID0gb3B0aW9ucyB8fCB7fSwgX2IgPSBfYS5taXJyb3IsIG1pcnJvciA9IF9iID09PSB2b2lkIDAgPyBuZXcgTWlycm9yKCkgOiBfYiwgX2MgPSBfYS5ibG9ja0NsYXNzLCBibG9ja0NsYXNzID0gX2MgPT09IHZvaWQgMCA/ICdyci1ibG9jaycgOiBfYywgX2QgPSBfYS5ibG9ja1NlbGVjdG9yLCBibG9ja1NlbGVjdG9yID0gX2QgPT09IHZvaWQgMCA/IG51bGwgOiBfZCwgX2UgPSBfYS5tYXNrVGV4dENsYXNzLCBtYXNrVGV4dENsYXNzID0gX2UgPT09IHZvaWQgMCA/ICdyci1tYXNrJyA6IF9lLCBfZiA9IF9hLm1hc2tUZXh0U2VsZWN0b3IsIG1hc2tUZXh0U2VsZWN0b3IgPSBfZiA9PT0gdm9pZCAwID8gbnVsbCA6IF9mLCBfZyA9IF9hLmlubGluZVN0eWxlc2hlZXQsIGlubGluZVN0eWxlc2hlZXQgPSBfZyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9nLCBfaCA9IF9hLmlubGluZUltYWdlcywgaW5saW5lSW1hZ2VzID0gX2ggPT09IHZvaWQgMCA/IGZhbHNlIDogX2gsIF9qID0gX2EucmVjb3JkQ2FudmFzLCByZWNvcmRDYW52YXMgPSBfaiA9PT0gdm9pZCAwID8gZmFsc2UgOiBfaiwgX2sgPSBfYS5tYXNrQWxsSW5wdXRzLCBtYXNrQWxsSW5wdXRzID0gX2sgPT09IHZvaWQgMCA/IGZhbHNlIDogX2ssIG1hc2tUZXh0Rm4gPSBfYS5tYXNrVGV4dEZuLCBtYXNrSW5wdXRGbiA9IF9hLm1hc2tJbnB1dEZuLCBfbCA9IF9hLnNsaW1ET00sIHNsaW1ET00gPSBfbCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfbCwgZGF0YVVSTE9wdGlvbnMgPSBfYS5kYXRhVVJMT3B0aW9ucywgcHJlc2VydmVXaGl0ZVNwYWNlID0gX2EucHJlc2VydmVXaGl0ZVNwYWNlLCBvblNlcmlhbGl6ZSA9IF9hLm9uU2VyaWFsaXplLCBvbklmcmFtZUxvYWQgPSBfYS5vbklmcmFtZUxvYWQsIGlmcmFtZUxvYWRUaW1lb3V0ID0gX2EuaWZyYW1lTG9hZFRpbWVvdXQsIG9uU3R5bGVzaGVldExvYWQgPSBfYS5vblN0eWxlc2hlZXRMb2FkLCBzdHlsZXNoZWV0TG9hZFRpbWVvdXQgPSBfYS5zdHlsZXNoZWV0TG9hZFRpbWVvdXQsIF9tID0gX2Eua2VlcElmcmFtZVNyY0ZuLCBrZWVwSWZyYW1lU3JjRm4gPSBfbSA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0gOiBfbTtcclxuICAgIHZhciBtYXNrSW5wdXRPcHRpb25zID0gbWFza0FsbElucHV0cyA9PT0gdHJ1ZVxyXG4gICAgICAgID8ge1xyXG4gICAgICAgICAgICBjb2xvcjogdHJ1ZSxcclxuICAgICAgICAgICAgZGF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgJ2RhdGV0aW1lLWxvY2FsJzogdHJ1ZSxcclxuICAgICAgICAgICAgZW1haWw6IHRydWUsXHJcbiAgICAgICAgICAgIG1vbnRoOiB0cnVlLFxyXG4gICAgICAgICAgICBudW1iZXI6IHRydWUsXHJcbiAgICAgICAgICAgIHJhbmdlOiB0cnVlLFxyXG4gICAgICAgICAgICBzZWFyY2g6IHRydWUsXHJcbiAgICAgICAgICAgIHRlbDogdHJ1ZSxcclxuICAgICAgICAgICAgdGV4dDogdHJ1ZSxcclxuICAgICAgICAgICAgdGltZTogdHJ1ZSxcclxuICAgICAgICAgICAgdXJsOiB0cnVlLFxyXG4gICAgICAgICAgICB3ZWVrOiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0YXJlYTogdHJ1ZSxcclxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICA6IG1hc2tBbGxJbnB1dHMgPT09IGZhbHNlXHJcbiAgICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA6IG1hc2tBbGxJbnB1dHM7XHJcbiAgICB2YXIgc2xpbURPTU9wdGlvbnMgPSBzbGltRE9NID09PSB0cnVlIHx8IHNsaW1ET00gPT09ICdhbGwnXHJcbiAgICAgICAgP1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjb21tZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGVhZEZhdmljb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBoZWFkV2hpdGVzcGFjZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGhlYWRNZXRhRGVzY0tleXdvcmRzOiBzbGltRE9NID09PSAnYWxsJyxcclxuICAgICAgICAgICAgICAgIGhlYWRNZXRhU29jaWFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGVhZE1ldGFSb2JvdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBoZWFkTWV0YUh0dHBFcXVpdjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGhlYWRNZXRhQXV0aG9yc2hpcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGhlYWRNZXRhVmVyaWZpY2F0aW9uOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICA6IHNsaW1ET00gPT09IGZhbHNlXHJcbiAgICAgICAgICAgID8ge31cclxuICAgICAgICAgICAgOiBzbGltRE9NO1xyXG4gICAgcmV0dXJuIHNlcmlhbGl6ZU5vZGVXaXRoSWQobiwge1xyXG4gICAgICAgIGRvYzogbixcclxuICAgICAgICBtaXJyb3I6IG1pcnJvcixcclxuICAgICAgICBibG9ja0NsYXNzOiBibG9ja0NsYXNzLFxyXG4gICAgICAgIGJsb2NrU2VsZWN0b3I6IGJsb2NrU2VsZWN0b3IsXHJcbiAgICAgICAgbWFza1RleHRDbGFzczogbWFza1RleHRDbGFzcyxcclxuICAgICAgICBtYXNrVGV4dFNlbGVjdG9yOiBtYXNrVGV4dFNlbGVjdG9yLFxyXG4gICAgICAgIHNraXBDaGlsZDogZmFsc2UsXHJcbiAgICAgICAgaW5saW5lU3R5bGVzaGVldDogaW5saW5lU3R5bGVzaGVldCxcclxuICAgICAgICBtYXNrSW5wdXRPcHRpb25zOiBtYXNrSW5wdXRPcHRpb25zLFxyXG4gICAgICAgIG1hc2tUZXh0Rm46IG1hc2tUZXh0Rm4sXHJcbiAgICAgICAgbWFza0lucHV0Rm46IG1hc2tJbnB1dEZuLFxyXG4gICAgICAgIHNsaW1ET01PcHRpb25zOiBzbGltRE9NT3B0aW9ucyxcclxuICAgICAgICBkYXRhVVJMT3B0aW9uczogZGF0YVVSTE9wdGlvbnMsXHJcbiAgICAgICAgaW5saW5lSW1hZ2VzOiBpbmxpbmVJbWFnZXMsXHJcbiAgICAgICAgcmVjb3JkQ2FudmFzOiByZWNvcmRDYW52YXMsXHJcbiAgICAgICAgcHJlc2VydmVXaGl0ZVNwYWNlOiBwcmVzZXJ2ZVdoaXRlU3BhY2UsXHJcbiAgICAgICAgb25TZXJpYWxpemU6IG9uU2VyaWFsaXplLFxyXG4gICAgICAgIG9uSWZyYW1lTG9hZDogb25JZnJhbWVMb2FkLFxyXG4gICAgICAgIGlmcmFtZUxvYWRUaW1lb3V0OiBpZnJhbWVMb2FkVGltZW91dCxcclxuICAgICAgICBvblN0eWxlc2hlZXRMb2FkOiBvblN0eWxlc2hlZXRMb2FkLFxyXG4gICAgICAgIHN0eWxlc2hlZXRMb2FkVGltZW91dDogc3R5bGVzaGVldExvYWRUaW1lb3V0LFxyXG4gICAgICAgIGtlZXBJZnJhbWVTcmNGbjoga2VlcElmcmFtZVNyY0ZuLFxyXG4gICAgICAgIG5ld2x5QWRkZWRFbGVtZW50OiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gdmlzaXRTbmFwc2hvdChub2RlLCBvblZpc2l0KSB7XHJcbiAgICBmdW5jdGlvbiB3YWxrKGN1cnJlbnQpIHtcclxuICAgICAgICBvblZpc2l0KGN1cnJlbnQpO1xyXG4gICAgICAgIGlmIChjdXJyZW50LnR5cGUgPT09IE5vZGVUeXBlLkRvY3VtZW50IHx8XHJcbiAgICAgICAgICAgIGN1cnJlbnQudHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjdXJyZW50LmNoaWxkTm9kZXMuZm9yRWFjaCh3YWxrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3YWxrKG5vZGUpO1xyXG59XHJcbmZ1bmN0aW9uIGNsZWFudXBTbmFwc2hvdCgpIHtcclxuICAgIF9pZCA9IDE7XHJcbn1cblxudmFyIGNvbW1lbnRyZSA9IC9cXC9cXCpbXipdKlxcKisoW14vKl1bXipdKlxcKispKlxcLy9nO1xyXG5mdW5jdGlvbiBwYXJzZShjc3MsIG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XHJcbiAgICB2YXIgbGluZW5vID0gMTtcclxuICAgIHZhciBjb2x1bW4gPSAxO1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24oc3RyKSB7XHJcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLm1hdGNoKC9cXG4vZyk7XHJcbiAgICAgICAgaWYgKGxpbmVzKSB7XHJcbiAgICAgICAgICAgIGxpbmVubyArPSBsaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpID0gc3RyLmxhc3RJbmRleE9mKCdcXG4nKTtcclxuICAgICAgICBjb2x1bW4gPSBpID09PSAtMSA/IGNvbHVtbiArIHN0ci5sZW5ndGggOiBzdHIubGVuZ3RoIC0gaTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBvc2l0aW9uKCkge1xyXG4gICAgICAgIHZhciBzdGFydCA9IHsgbGluZTogbGluZW5vLCBjb2x1bW46IGNvbHVtbiB9O1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKHN0YXJ0KTtcclxuICAgICAgICAgICAgd2hpdGVzcGFjZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgdmFyIFBvc2l0aW9uID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBQb3NpdGlvbihzdGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0geyBsaW5lOiBsaW5lbm8sIGNvbHVtbjogY29sdW1uIH07XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gb3B0aW9ucy5zb3VyY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQb3NpdGlvbjtcclxuICAgIH0oKSk7XHJcbiAgICBQb3NpdGlvbi5wcm90b3R5cGUuY29udGVudCA9IGNzcztcclxuICAgIHZhciBlcnJvcnNMaXN0ID0gW107XHJcbiAgICBmdW5jdGlvbiBlcnJvcihtc2cpIHtcclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKFwiXCIuY29uY2F0KG9wdGlvbnMuc291cmNlIHx8ICcnLCBcIjpcIikuY29uY2F0KGxpbmVubywgXCI6XCIpLmNvbmNhdChjb2x1bW4sIFwiOiBcIikuY29uY2F0KG1zZykpO1xyXG4gICAgICAgIGVyci5yZWFzb24gPSBtc2c7XHJcbiAgICAgICAgZXJyLmZpbGVuYW1lID0gb3B0aW9ucy5zb3VyY2U7XHJcbiAgICAgICAgZXJyLmxpbmUgPSBsaW5lbm87XHJcbiAgICAgICAgZXJyLmNvbHVtbiA9IGNvbHVtbjtcclxuICAgICAgICBlcnIuc291cmNlID0gY3NzO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnNpbGVudCkge1xyXG4gICAgICAgICAgICBlcnJvcnNMaXN0LnB1c2goZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdHlsZXNoZWV0KCkge1xyXG4gICAgICAgIHZhciBydWxlc0xpc3QgPSBydWxlcygpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdHlsZXNoZWV0JyxcclxuICAgICAgICAgICAgc3R5bGVzaGVldDoge1xyXG4gICAgICAgICAgICAgICAgc291cmNlOiBvcHRpb25zLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgIHJ1bGVzOiBydWxlc0xpc3QsXHJcbiAgICAgICAgICAgICAgICBwYXJzaW5nRXJyb3JzOiBlcnJvcnNMaXN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gb3BlbigpIHtcclxuICAgICAgICByZXR1cm4gbWF0Y2goL157XFxzKi8pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY2xvc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoKC9efS8pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcnVsZXMoKSB7XHJcbiAgICAgICAgdmFyIG5vZGU7XHJcbiAgICAgICAgdmFyIHJ1bGVzID0gW107XHJcbiAgICAgICAgd2hpdGVzcGFjZSgpO1xyXG4gICAgICAgIGNvbW1lbnRzKHJ1bGVzKTtcclxuICAgICAgICB3aGlsZSAoY3NzLmxlbmd0aCAmJiBjc3MuY2hhckF0KDApICE9PSAnfScgJiYgKG5vZGUgPSBhdHJ1bGUoKSB8fCBydWxlKCkpKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBydWxlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgY29tbWVudHMocnVsZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBydWxlcztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG1hdGNoKHJlKSB7XHJcbiAgICAgICAgdmFyIG0gPSByZS5leGVjKGNzcyk7XHJcbiAgICAgICAgaWYgKCFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0ciA9IG1bMF07XHJcbiAgICAgICAgdXBkYXRlUG9zaXRpb24oc3RyKTtcclxuICAgICAgICBjc3MgPSBjc3Muc2xpY2Uoc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB3aGl0ZXNwYWNlKCkge1xyXG4gICAgICAgIG1hdGNoKC9eXFxzKi8pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY29tbWVudHMocnVsZXMpIHtcclxuICAgICAgICBpZiAocnVsZXMgPT09IHZvaWQgMCkgeyBydWxlcyA9IFtdOyB9XHJcbiAgICAgICAgdmFyIGM7XHJcbiAgICAgICAgd2hpbGUgKChjID0gY29tbWVudCgpKSkge1xyXG4gICAgICAgICAgICBpZiAoYykge1xyXG4gICAgICAgICAgICAgICAgcnVsZXMucHVzaChjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjID0gY29tbWVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcnVsZXM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjb21tZW50KCkge1xyXG4gICAgICAgIHZhciBwb3MgPSBwb3NpdGlvbigpO1xyXG4gICAgICAgIGlmICgnLycgIT09IGNzcy5jaGFyQXQoMCkgfHwgJyonICE9PSBjc3MuY2hhckF0KDEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGkgPSAyO1xyXG4gICAgICAgIHdoaWxlICgnJyAhPT0gY3NzLmNoYXJBdChpKSAmJlxyXG4gICAgICAgICAgICAoJyonICE9PSBjc3MuY2hhckF0KGkpIHx8ICcvJyAhPT0gY3NzLmNoYXJBdChpICsgMSkpKSB7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaSArPSAyO1xyXG4gICAgICAgIGlmICgnJyA9PT0gY3NzLmNoYXJBdChpIC0gMSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVycm9yKCdFbmQgb2YgY29tbWVudCBtaXNzaW5nJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdHIgPSBjc3Muc2xpY2UoMiwgaSAtIDIpO1xyXG4gICAgICAgIGNvbHVtbiArPSAyO1xyXG4gICAgICAgIHVwZGF0ZVBvc2l0aW9uKHN0cik7XHJcbiAgICAgICAgY3NzID0gY3NzLnNsaWNlKGkpO1xyXG4gICAgICAgIGNvbHVtbiArPSAyO1xyXG4gICAgICAgIHJldHVybiBwb3Moe1xyXG4gICAgICAgICAgICB0eXBlOiAnY29tbWVudCcsXHJcbiAgICAgICAgICAgIGNvbW1lbnQ6IHN0clxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2VsZWN0b3IoKSB7XHJcbiAgICAgICAgdmFyIG0gPSBtYXRjaCgvXihbXntdKykvKTtcclxuICAgICAgICBpZiAoIW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJpbShtWzBdKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwvXFwqKFteKl18W1xcclxcbl18KFxcKisoW14qL118W1xcclxcbl0pKSkqXFwqXFwvKy9nLCAnJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1wiKD86XFxcXFwifFteXCJdKSpcInwnKD86XFxcXCd8W14nXSkqJy9nLCBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbS5yZXBsYWNlKC8sL2csICdcXHUyMDBDJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnNwbGl0KC9cXHMqKD8hW14oXSpcXCkpLFxccyovKVxyXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzLnJlcGxhY2UoL1xcdTIwMEMvZywgJywnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGRlY2xhcmF0aW9uKCkge1xyXG4gICAgICAgIHZhciBwb3MgPSBwb3NpdGlvbigpO1xyXG4gICAgICAgIHZhciBwcm9wTWF0Y2ggPSBtYXRjaCgvXihcXCo/Wy0jXFwvXFwqXFxcXFxcd10rKFxcW1swLTlhLXpfLV0rXFxdKT8pXFxzKi8pO1xyXG4gICAgICAgIGlmICghcHJvcE1hdGNoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHByb3AgPSB0cmltKHByb3BNYXRjaFswXSk7XHJcbiAgICAgICAgaWYgKCFtYXRjaCgvXjpcXHMqLykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVycm9yKFwicHJvcGVydHkgbWlzc2luZyAnOidcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB2YWwgPSBtYXRjaCgvXigoPzonKD86XFxcXCd8LikqPyd8XCIoPzpcXFxcXCJ8LikqP1wifFxcKFteXFwpXSo/XFwpfFtefTtdKSspLyk7XHJcbiAgICAgICAgdmFyIHJldCA9IHBvcyh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdkZWNsYXJhdGlvbicsXHJcbiAgICAgICAgICAgIHByb3BlcnR5OiBwcm9wLnJlcGxhY2UoY29tbWVudHJlLCAnJyksXHJcbiAgICAgICAgICAgIHZhbHVlOiB2YWwgPyB0cmltKHZhbFswXSkucmVwbGFjZShjb21tZW50cmUsICcnKSA6ICcnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWF0Y2goL15bO1xcc10qLyk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGRlY2xhcmF0aW9ucygpIHtcclxuICAgICAgICB2YXIgZGVjbHMgPSBbXTtcclxuICAgICAgICBpZiAoIW9wZW4oKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3IoXCJtaXNzaW5nICd7J1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tbWVudHMoZGVjbHMpO1xyXG4gICAgICAgIHZhciBkZWNsO1xyXG4gICAgICAgIHdoaWxlICgoZGVjbCA9IGRlY2xhcmF0aW9uKCkpKSB7XHJcbiAgICAgICAgICAgIGlmIChkZWNsICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgZGVjbHMucHVzaChkZWNsKTtcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRzKGRlY2xzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWNsID0gZGVjbGFyYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjbG9zZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcihcIm1pc3NpbmcgJ30nXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVjbHM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBrZXlmcmFtZSgpIHtcclxuICAgICAgICB2YXIgbTtcclxuICAgICAgICB2YXIgdmFscyA9IFtdO1xyXG4gICAgICAgIHZhciBwb3MgPSBwb3NpdGlvbigpO1xyXG4gICAgICAgIHdoaWxlICgobSA9IG1hdGNoKC9eKChcXGQrXFwuXFxkK3xcXC5cXGQrfFxcZCspJT98W2Etel0rKVxccyovKSkpIHtcclxuICAgICAgICAgICAgdmFscy5wdXNoKG1bMV0pO1xyXG4gICAgICAgICAgICBtYXRjaCgvXixcXHMqLyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdmFscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9zKHtcclxuICAgICAgICAgICAgdHlwZTogJ2tleWZyYW1lJyxcclxuICAgICAgICAgICAgdmFsdWVzOiB2YWxzLFxyXG4gICAgICAgICAgICBkZWNsYXJhdGlvbnM6IGRlY2xhcmF0aW9ucygpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhdGtleWZyYW1lcygpIHtcclxuICAgICAgICB2YXIgcG9zID0gcG9zaXRpb24oKTtcclxuICAgICAgICB2YXIgbSA9IG1hdGNoKC9eQChbLVxcd10rKT9rZXlmcmFtZXNcXHMqLyk7XHJcbiAgICAgICAgaWYgKCFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHZlbmRvciA9IG1bMV07XHJcbiAgICAgICAgbSA9IG1hdGNoKC9eKFstXFx3XSspXFxzKi8pO1xyXG4gICAgICAgIGlmICghbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3IoJ0BrZXlmcmFtZXMgbWlzc2luZyBuYW1lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuYW1lID0gbVsxXTtcclxuICAgICAgICBpZiAoIW9wZW4oKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3IoXCJAa2V5ZnJhbWVzIG1pc3NpbmcgJ3snXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZnJhbWU7XHJcbiAgICAgICAgdmFyIGZyYW1lcyA9IGNvbW1lbnRzKCk7XHJcbiAgICAgICAgd2hpbGUgKChmcmFtZSA9IGtleWZyYW1lKCkpKSB7XHJcbiAgICAgICAgICAgIGZyYW1lcy5wdXNoKGZyYW1lKTtcclxuICAgICAgICAgICAgZnJhbWVzID0gZnJhbWVzLmNvbmNhdChjb21tZW50cygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjbG9zZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcihcIkBrZXlmcmFtZXMgbWlzc2luZyAnfSdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb3Moe1xyXG4gICAgICAgICAgICB0eXBlOiAna2V5ZnJhbWVzJyxcclxuICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgdmVuZG9yOiB2ZW5kb3IsXHJcbiAgICAgICAgICAgIGtleWZyYW1lczogZnJhbWVzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhdHN1cHBvcnRzKCkge1xyXG4gICAgICAgIHZhciBwb3MgPSBwb3NpdGlvbigpO1xyXG4gICAgICAgIHZhciBtID0gbWF0Y2goL15Ac3VwcG9ydHMgKihbXntdKykvKTtcclxuICAgICAgICBpZiAoIW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3VwcG9ydHMgPSB0cmltKG1bMV0pO1xyXG4gICAgICAgIGlmICghb3BlbigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcihcIkBzdXBwb3J0cyBtaXNzaW5nICd7J1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0eWxlID0gY29tbWVudHMoKS5jb25jYXQocnVsZXMoKSk7XHJcbiAgICAgICAgaWYgKCFjbG9zZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcihcIkBzdXBwb3J0cyBtaXNzaW5nICd9J1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvcyh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdXBwb3J0cycsXHJcbiAgICAgICAgICAgIHN1cHBvcnRzOiBzdXBwb3J0cyxcclxuICAgICAgICAgICAgcnVsZXM6IHN0eWxlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhdGhvc3QoKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IHBvc2l0aW9uKCk7XHJcbiAgICAgICAgdmFyIG0gPSBtYXRjaCgvXkBob3N0XFxzKi8pO1xyXG4gICAgICAgIGlmICghbSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghb3BlbigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcihcIkBob3N0IG1pc3NpbmcgJ3snXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3R5bGUgPSBjb21tZW50cygpLmNvbmNhdChydWxlcygpKTtcclxuICAgICAgICBpZiAoIWNsb3NlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVycm9yKFwiQGhvc3QgbWlzc2luZyAnfSdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb3Moe1xyXG4gICAgICAgICAgICB0eXBlOiAnaG9zdCcsXHJcbiAgICAgICAgICAgIHJ1bGVzOiBzdHlsZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXRtZWRpYSgpIHtcclxuICAgICAgICB2YXIgcG9zID0gcG9zaXRpb24oKTtcclxuICAgICAgICB2YXIgbSA9IG1hdGNoKC9eQG1lZGlhICooW157XSspLyk7XHJcbiAgICAgICAgaWYgKCFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1lZGlhID0gdHJpbShtWzFdKTtcclxuICAgICAgICBpZiAoIW9wZW4oKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3IoXCJAbWVkaWEgbWlzc2luZyAneydcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdHlsZSA9IGNvbW1lbnRzKCkuY29uY2F0KHJ1bGVzKCkpO1xyXG4gICAgICAgIGlmICghY2xvc2UoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3IoXCJAbWVkaWEgbWlzc2luZyAnfSdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb3Moe1xyXG4gICAgICAgICAgICB0eXBlOiAnbWVkaWEnLFxyXG4gICAgICAgICAgICBtZWRpYTogbWVkaWEsXHJcbiAgICAgICAgICAgIHJ1bGVzOiBzdHlsZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXRjdXN0b21tZWRpYSgpIHtcclxuICAgICAgICB2YXIgcG9zID0gcG9zaXRpb24oKTtcclxuICAgICAgICB2YXIgbSA9IG1hdGNoKC9eQGN1c3RvbS1tZWRpYVxccysoLS1bXlxcc10rKVxccyooW157O10rKTsvKTtcclxuICAgICAgICBpZiAoIW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9zKHtcclxuICAgICAgICAgICAgdHlwZTogJ2N1c3RvbS1tZWRpYScsXHJcbiAgICAgICAgICAgIG5hbWU6IHRyaW0obVsxXSksXHJcbiAgICAgICAgICAgIG1lZGlhOiB0cmltKG1bMl0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhdHBhZ2UoKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IHBvc2l0aW9uKCk7XHJcbiAgICAgICAgdmFyIG0gPSBtYXRjaCgvXkBwYWdlICovKTtcclxuICAgICAgICBpZiAoIW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VsID0gc2VsZWN0b3IoKSB8fCBbXTtcclxuICAgICAgICBpZiAoIW9wZW4oKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3IoXCJAcGFnZSBtaXNzaW5nICd7J1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRlY2xzID0gY29tbWVudHMoKTtcclxuICAgICAgICB2YXIgZGVjbDtcclxuICAgICAgICB3aGlsZSAoKGRlY2wgPSBkZWNsYXJhdGlvbigpKSkge1xyXG4gICAgICAgICAgICBkZWNscy5wdXNoKGRlY2wpO1xyXG4gICAgICAgICAgICBkZWNscyA9IGRlY2xzLmNvbmNhdChjb21tZW50cygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjbG9zZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcihcIkBwYWdlIG1pc3NpbmcgJ30nXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9zKHtcclxuICAgICAgICAgICAgdHlwZTogJ3BhZ2UnLFxyXG4gICAgICAgICAgICBzZWxlY3RvcnM6IHNlbCxcclxuICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBkZWNsc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXRkb2N1bWVudCgpIHtcclxuICAgICAgICB2YXIgcG9zID0gcG9zaXRpb24oKTtcclxuICAgICAgICB2YXIgbSA9IG1hdGNoKC9eQChbLVxcd10rKT9kb2N1bWVudCAqKFtee10rKS8pO1xyXG4gICAgICAgIGlmICghbSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB2ZW5kb3IgPSB0cmltKG1bMV0pO1xyXG4gICAgICAgIHZhciBkb2MgPSB0cmltKG1bMl0pO1xyXG4gICAgICAgIGlmICghb3BlbigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcihcIkBkb2N1bWVudCBtaXNzaW5nICd7J1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0eWxlID0gY29tbWVudHMoKS5jb25jYXQocnVsZXMoKSk7XHJcbiAgICAgICAgaWYgKCFjbG9zZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcihcIkBkb2N1bWVudCBtaXNzaW5nICd9J1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvcyh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdkb2N1bWVudCcsXHJcbiAgICAgICAgICAgIGRvY3VtZW50OiBkb2MsXHJcbiAgICAgICAgICAgIHZlbmRvcjogdmVuZG9yLFxyXG4gICAgICAgICAgICBydWxlczogc3R5bGVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGF0Zm9udGZhY2UoKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IHBvc2l0aW9uKCk7XHJcbiAgICAgICAgdmFyIG0gPSBtYXRjaCgvXkBmb250LWZhY2VcXHMqLyk7XHJcbiAgICAgICAgaWYgKCFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFvcGVuKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVycm9yKFwiQGZvbnQtZmFjZSBtaXNzaW5nICd7J1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRlY2xzID0gY29tbWVudHMoKTtcclxuICAgICAgICB2YXIgZGVjbDtcclxuICAgICAgICB3aGlsZSAoKGRlY2wgPSBkZWNsYXJhdGlvbigpKSkge1xyXG4gICAgICAgICAgICBkZWNscy5wdXNoKGRlY2wpO1xyXG4gICAgICAgICAgICBkZWNscyA9IGRlY2xzLmNvbmNhdChjb21tZW50cygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjbG9zZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcihcIkBmb250LWZhY2UgbWlzc2luZyAnfSdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb3Moe1xyXG4gICAgICAgICAgICB0eXBlOiAnZm9udC1mYWNlJyxcclxuICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBkZWNsc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdmFyIGF0aW1wb3J0ID0gX2NvbXBpbGVBdHJ1bGUoJ2ltcG9ydCcpO1xyXG4gICAgdmFyIGF0Y2hhcnNldCA9IF9jb21waWxlQXRydWxlKCdjaGFyc2V0Jyk7XHJcbiAgICB2YXIgYXRuYW1lc3BhY2UgPSBfY29tcGlsZUF0cnVsZSgnbmFtZXNwYWNlJyk7XHJcbiAgICBmdW5jdGlvbiBfY29tcGlsZUF0cnVsZShuYW1lKSB7XHJcbiAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cCgnXkAnICsgbmFtZSArICdcXFxccyooW147XSspOycpO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSBwb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB2YXIgbSA9IG1hdGNoKHJlKTtcclxuICAgICAgICAgICAgaWYgKCFtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHJldCA9IHsgdHlwZTogbmFtZSB9O1xyXG4gICAgICAgICAgICByZXRbbmFtZV0gPSBtWzFdLnRyaW0oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBvcyhyZXQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhdHJ1bGUoKSB7XHJcbiAgICAgICAgaWYgKGNzc1swXSAhPT0gJ0AnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChhdGtleWZyYW1lcygpIHx8XHJcbiAgICAgICAgICAgIGF0bWVkaWEoKSB8fFxyXG4gICAgICAgICAgICBhdGN1c3RvbW1lZGlhKCkgfHxcclxuICAgICAgICAgICAgYXRzdXBwb3J0cygpIHx8XHJcbiAgICAgICAgICAgIGF0aW1wb3J0KCkgfHxcclxuICAgICAgICAgICAgYXRjaGFyc2V0KCkgfHxcclxuICAgICAgICAgICAgYXRuYW1lc3BhY2UoKSB8fFxyXG4gICAgICAgICAgICBhdGRvY3VtZW50KCkgfHxcclxuICAgICAgICAgICAgYXRwYWdlKCkgfHxcclxuICAgICAgICAgICAgYXRob3N0KCkgfHxcclxuICAgICAgICAgICAgYXRmb250ZmFjZSgpKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJ1bGUoKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IHBvc2l0aW9uKCk7XHJcbiAgICAgICAgdmFyIHNlbCA9IHNlbGVjdG9yKCk7XHJcbiAgICAgICAgaWYgKCFzZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVycm9yKCdzZWxlY3RvciBtaXNzaW5nJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbW1lbnRzKCk7XHJcbiAgICAgICAgcmV0dXJuIHBvcyh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdydWxlJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JzOiBzZWwsXHJcbiAgICAgICAgICAgIGRlY2xhcmF0aW9uczogZGVjbGFyYXRpb25zKClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBhZGRQYXJlbnQoc3R5bGVzaGVldCgpKTtcclxufVxyXG5mdW5jdGlvbiB0cmltKHN0cikge1xyXG4gICAgcmV0dXJuIHN0ciA/IHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykgOiAnJztcclxufVxyXG5mdW5jdGlvbiBhZGRQYXJlbnQob2JqLCBwYXJlbnQpIHtcclxuICAgIHZhciBpc05vZGUgPSBvYmogJiYgdHlwZW9mIG9iai50eXBlID09PSAnc3RyaW5nJztcclxuICAgIHZhciBjaGlsZFBhcmVudCA9IGlzTm9kZSA/IG9iaiA6IHBhcmVudDtcclxuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3Qua2V5cyhvYmopOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBrID0gX2FbX2ldO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IG9ialtrXTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgYWRkUGFyZW50KHYsIGNoaWxkUGFyZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgYWRkUGFyZW50KHZhbHVlLCBjaGlsZFBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGlzTm9kZSkge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdwYXJlbnQnLCB7XHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogcGFyZW50IHx8IG51bGxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBvYmo7XHJcbn1cblxudmFyIHRhZ01hcCA9IHtcclxuICAgIHNjcmlwdDogJ25vc2NyaXB0JyxcclxuICAgIGFsdGdseXBoOiAnYWx0R2x5cGgnLFxyXG4gICAgYWx0Z2x5cGhkZWY6ICdhbHRHbHlwaERlZicsXHJcbiAgICBhbHRnbHlwaGl0ZW06ICdhbHRHbHlwaEl0ZW0nLFxyXG4gICAgYW5pbWF0ZWNvbG9yOiAnYW5pbWF0ZUNvbG9yJyxcclxuICAgIGFuaW1hdGVtb3Rpb246ICdhbmltYXRlTW90aW9uJyxcclxuICAgIGFuaW1hdGV0cmFuc2Zvcm06ICdhbmltYXRlVHJhbnNmb3JtJyxcclxuICAgIGNsaXBwYXRoOiAnY2xpcFBhdGgnLFxyXG4gICAgZmVibGVuZDogJ2ZlQmxlbmQnLFxyXG4gICAgZmVjb2xvcm1hdHJpeDogJ2ZlQ29sb3JNYXRyaXgnLFxyXG4gICAgZmVjb21wb25lbnR0cmFuc2ZlcjogJ2ZlQ29tcG9uZW50VHJhbnNmZXInLFxyXG4gICAgZmVjb21wb3NpdGU6ICdmZUNvbXBvc2l0ZScsXHJcbiAgICBmZWNvbnZvbHZlbWF0cml4OiAnZmVDb252b2x2ZU1hdHJpeCcsXHJcbiAgICBmZWRpZmZ1c2VsaWdodGluZzogJ2ZlRGlmZnVzZUxpZ2h0aW5nJyxcclxuICAgIGZlZGlzcGxhY2VtZW50bWFwOiAnZmVEaXNwbGFjZW1lbnRNYXAnLFxyXG4gICAgZmVkaXN0YW50bGlnaHQ6ICdmZURpc3RhbnRMaWdodCcsXHJcbiAgICBmZWRyb3BzaGFkb3c6ICdmZURyb3BTaGFkb3cnLFxyXG4gICAgZmVmbG9vZDogJ2ZlRmxvb2QnLFxyXG4gICAgZmVmdW5jYTogJ2ZlRnVuY0EnLFxyXG4gICAgZmVmdW5jYjogJ2ZlRnVuY0InLFxyXG4gICAgZmVmdW5jZzogJ2ZlRnVuY0cnLFxyXG4gICAgZmVmdW5jcjogJ2ZlRnVuY1InLFxyXG4gICAgZmVnYXVzc2lhbmJsdXI6ICdmZUdhdXNzaWFuQmx1cicsXHJcbiAgICBmZWltYWdlOiAnZmVJbWFnZScsXHJcbiAgICBmZW1lcmdlOiAnZmVNZXJnZScsXHJcbiAgICBmZW1lcmdlbm9kZTogJ2ZlTWVyZ2VOb2RlJyxcclxuICAgIGZlbW9ycGhvbG9neTogJ2ZlTW9ycGhvbG9neScsXHJcbiAgICBmZW9mZnNldDogJ2ZlT2Zmc2V0JyxcclxuICAgIGZlcG9pbnRsaWdodDogJ2ZlUG9pbnRMaWdodCcsXHJcbiAgICBmZXNwZWN1bGFybGlnaHRpbmc6ICdmZVNwZWN1bGFyTGlnaHRpbmcnLFxyXG4gICAgZmVzcG90bGlnaHQ6ICdmZVNwb3RMaWdodCcsXHJcbiAgICBmZXRpbGU6ICdmZVRpbGUnLFxyXG4gICAgZmV0dXJidWxlbmNlOiAnZmVUdXJidWxlbmNlJyxcclxuICAgIGZvcmVpZ25vYmplY3Q6ICdmb3JlaWduT2JqZWN0JyxcclxuICAgIGdseXBocmVmOiAnZ2x5cGhSZWYnLFxyXG4gICAgbGluZWFyZ3JhZGllbnQ6ICdsaW5lYXJHcmFkaWVudCcsXHJcbiAgICByYWRpYWxncmFkaWVudDogJ3JhZGlhbEdyYWRpZW50J1xyXG59O1xyXG5mdW5jdGlvbiBnZXRUYWdOYW1lKG4pIHtcclxuICAgIHZhciB0YWdOYW1lID0gdGFnTWFwW24udGFnTmFtZV0gPyB0YWdNYXBbbi50YWdOYW1lXSA6IG4udGFnTmFtZTtcclxuICAgIGlmICh0YWdOYW1lID09PSAnbGluaycgJiYgbi5hdHRyaWJ1dGVzLl9jc3NUZXh0KSB7XHJcbiAgICAgICAgdGFnTmFtZSA9ICdzdHlsZSc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFnTmFtZTtcclxufVxyXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyk7XHJcbn1cclxudmFyIEhPVkVSX1NFTEVDVE9SID0gLyhbXlxcXFxdKTpob3Zlci87XHJcbnZhciBIT1ZFUl9TRUxFQ1RPUl9HTE9CQUwgPSBuZXcgUmVnRXhwKEhPVkVSX1NFTEVDVE9SLnNvdXJjZSwgJ2cnKTtcclxuZnVuY3Rpb24gYWRkSG92ZXJDbGFzcyhjc3NUZXh0LCBjYWNoZSkge1xyXG4gICAgdmFyIGNhY2hlZFN0eWxlID0gY2FjaGUgPT09IG51bGwgfHwgY2FjaGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhY2hlLnN0eWxlc1dpdGhIb3ZlckNsYXNzLmdldChjc3NUZXh0KTtcclxuICAgIGlmIChjYWNoZWRTdHlsZSlcclxuICAgICAgICByZXR1cm4gY2FjaGVkU3R5bGU7XHJcbiAgICB2YXIgYXN0ID0gcGFyc2UoY3NzVGV4dCwge1xyXG4gICAgICAgIHNpbGVudDogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWFzdC5zdHlsZXNoZWV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNzc1RleHQ7XHJcbiAgICB9XHJcbiAgICB2YXIgc2VsZWN0b3JzID0gW107XHJcbiAgICBhc3Quc3R5bGVzaGVldC5ydWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XHJcbiAgICAgICAgaWYgKCdzZWxlY3RvcnMnIGluIHJ1bGUpIHtcclxuICAgICAgICAgICAgKHJ1bGUuc2VsZWN0b3JzIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKEhPVkVSX1NFTEVDVE9SLnRlc3Qoc2VsZWN0b3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JzLnB1c2goc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChzZWxlY3RvcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGNzc1RleHQ7XHJcbiAgICB9XHJcbiAgICB2YXIgc2VsZWN0b3JNYXRjaGVyID0gbmV3IFJlZ0V4cChzZWxlY3RvcnNcclxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChzZWxlY3RvciwgaW5kZXgpIHsgcmV0dXJuIHNlbGVjdG9ycy5pbmRleE9mKHNlbGVjdG9yKSA9PT0gaW5kZXg7IH0pXHJcbiAgICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7IH0pXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gZXNjYXBlUmVnRXhwKHNlbGVjdG9yKTtcclxuICAgIH0pXHJcbiAgICAgICAgLmpvaW4oJ3wnKSwgJ2cnKTtcclxuICAgIHZhciByZXN1bHQgPSBjc3NUZXh0LnJlcGxhY2Uoc2VsZWN0b3JNYXRjaGVyLCBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICB2YXIgbmV3U2VsZWN0b3IgPSBzZWxlY3Rvci5yZXBsYWNlKEhPVkVSX1NFTEVDVE9SX0dMT0JBTCwgJyQxLlxcXFw6aG92ZXInKTtcclxuICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQoc2VsZWN0b3IsIFwiLCBcIikuY29uY2F0KG5ld1NlbGVjdG9yKTtcclxuICAgIH0pO1xyXG4gICAgY2FjaGUgPT09IG51bGwgfHwgY2FjaGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhY2hlLnN0eWxlc1dpdGhIb3ZlckNsYXNzLnNldChjc3NUZXh0LCByZXN1bHQpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVDYWNoZSgpIHtcclxuICAgIHZhciBzdHlsZXNXaXRoSG92ZXJDbGFzcyA9IG5ldyBNYXAoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3R5bGVzV2l0aEhvdmVyQ2xhc3M6IHN0eWxlc1dpdGhIb3ZlckNsYXNzXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGJ1aWxkTm9kZShuLCBvcHRpb25zKSB7XHJcbiAgICB2YXIgZG9jID0gb3B0aW9ucy5kb2MsIGhhY2tDc3MgPSBvcHRpb25zLmhhY2tDc3MsIGNhY2hlID0gb3B0aW9ucy5jYWNoZTtcclxuICAgIHN3aXRjaCAobi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5Eb2N1bWVudDpcclxuICAgICAgICAgICAgcmV0dXJuIGRvYy5pbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudChudWxsLCAnJywgbnVsbCk7XHJcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5Eb2N1bWVudFR5cGU6XHJcbiAgICAgICAgICAgIHJldHVybiBkb2MuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnRUeXBlKG4ubmFtZSB8fCAnaHRtbCcsIG4ucHVibGljSWQsIG4uc3lzdGVtSWQpO1xyXG4gICAgICAgIGNhc2UgTm9kZVR5cGUuRWxlbWVudDoge1xyXG4gICAgICAgICAgICB2YXIgdGFnTmFtZSA9IGdldFRhZ05hbWUobik7XHJcbiAgICAgICAgICAgIHZhciBub2RlXzE7XHJcbiAgICAgICAgICAgIGlmIChuLmlzU1ZHKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlXzEgPSBkb2MuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIHRhZ05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZV8xID0gZG9jLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNwZWNpYWxBdHRyaWJ1dGVzID0ge307XHJcbiAgICAgICAgICAgIGZvciAodmFyIG5hbWVfMSBpbiBuLmF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG4uYXR0cmlidXRlcywgbmFtZV8xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gbi5hdHRyaWJ1dGVzW25hbWVfMV07XHJcbiAgICAgICAgICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ29wdGlvbicgJiZcclxuICAgICAgICAgICAgICAgICAgICBuYW1lXzEgPT09ICdzZWxlY3RlZCcgJiZcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZV8xLnN0YXJ0c1dpdGgoJ3JyXycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlY2lhbEF0dHJpYnV0ZXNbbmFtZV8xXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGlzVGV4dGFyZWEgPSB0YWdOYW1lID09PSAndGV4dGFyZWEnICYmIG5hbWVfMSA9PT0gJ3ZhbHVlJztcclxuICAgICAgICAgICAgICAgIHZhciBpc1JlbW90ZU9yRHluYW1pY0NzcyA9IHRhZ05hbWUgPT09ICdzdHlsZScgJiYgbmFtZV8xID09PSAnX2Nzc1RleHQnO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzUmVtb3RlT3JEeW5hbWljQ3NzICYmIGhhY2tDc3MgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gYWRkSG92ZXJDbGFzcyh2YWx1ZSwgY2FjaGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKChpc1RleHRhcmVhIHx8IGlzUmVtb3RlT3JEeW5hbWljQ3NzKSAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gZG9jLmNyZWF0ZVRleHROb2RlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gQXJyYXkuZnJvbShub2RlXzEuY2hpbGROb2Rlcyk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjID0gX2FbX2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYy5ub2RlVHlwZSA9PT0gbm9kZV8xLlRFWFRfTk9ERSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZV8xLnJlbW92ZUNoaWxkKGMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVfMS5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuLmlzU1ZHICYmIG5hbWVfMSA9PT0gJ3hsaW5rOmhyZWYnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVfMS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIG5hbWVfMSwgdmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5hbWVfMSA9PT0gJ29ubG9hZCcgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZV8xID09PSAnb25jbGljaycgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZV8xLnN1YnN0cmluZygwLCA3KSA9PT0gJ29ubW91c2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVfMS5zZXRBdHRyaWJ1dGUoJ18nICsgbmFtZV8xLCB2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGFnTmFtZSA9PT0gJ21ldGEnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4uYXR0cmlidXRlc1snaHR0cC1lcXVpdiddID09PSAnQ29udGVudC1TZWN1cml0eS1Qb2xpY3knICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVfMSA9PT0gJ2NvbnRlbnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVfMS5zZXRBdHRyaWJ1dGUoJ2NzcC1jb250ZW50JywgdmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0YWdOYW1lID09PSAnbGluaycgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG4uYXR0cmlidXRlcy5yZWwgPT09ICdwcmVsb2FkJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbi5hdHRyaWJ1dGVzLnJlbCA9PT0gJ21vZHVsZXByZWxvYWQnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuLmF0dHJpYnV0ZXMuYXMgPT09ICdzY3JpcHQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhZ05hbWUgPT09ICdsaW5rJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuLmF0dHJpYnV0ZXMucmVsID09PSAncHJlZmV0Y2gnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBuLmF0dHJpYnV0ZXMuaHJlZiA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgbi5hdHRyaWJ1dGVzLmhyZWYuZW5kc1dpdGgoJy5qcycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhZ05hbWUgPT09ICdpbWcnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4uYXR0cmlidXRlcy5zcmNzZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgbi5hdHRyaWJ1dGVzLnJyX2RhdGFVUkwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZV8xLnNldEF0dHJpYnV0ZSgncnJ3ZWItb3JpZ2luYWwtc3Jjc2V0Jywgbi5hdHRyaWJ1dGVzLnNyY3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlXzEuc2V0QXR0cmlidXRlKG5hbWVfMSwgdmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAobmFtZV8yKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBzcGVjaWFsQXR0cmlidXRlc1tuYW1lXzJdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdjYW52YXMnICYmIG5hbWVfMiA9PT0gJ3JyX2RhdGFVUkwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGltYWdlXzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZV8xLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9IG5vZGVfMS5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlXzEsIDAsIDAsIGltYWdlXzEud2lkdGgsIGltYWdlXzEuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VfMS5zcmMgPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlXzEuUlJOb2RlVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZV8xLnJyX2RhdGFVUkwgPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGFnTmFtZSA9PT0gJ2ltZycgJiYgbmFtZV8yID09PSAncnJfZGF0YVVSTCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSBub2RlXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpbWFnZS5jdXJyZW50U3JjLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdycndlYi1vcmlnaW5hbC1zcmMnLCBuLmF0dHJpYnV0ZXMuc3JjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZV8yID09PSAncnJfd2lkdGgnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZV8xLnN0eWxlLndpZHRoID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5hbWVfMiA9PT0gJ3JyX2hlaWdodCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlXzEuc3R5bGUuaGVpZ2h0ID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5hbWVfMiA9PT0gJ3JyX21lZGlhQ3VycmVudFRpbWUnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVfMS5jdXJyZW50VGltZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobmFtZV8yID09PSAncnJfbWVkaWFTdGF0ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BsYXllZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlXzFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGxheSgpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGNvbnNvbGUud2FybignbWVkaWEgcGxheWJhY2sgZXJyb3InLCBlKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGF1c2VkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVfMS5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lXzIgaW4gc3BlY2lhbEF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgICAgIF9sb29wXzEobmFtZV8yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobi5pc1NoYWRvd0hvc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmICghbm9kZV8xLnNoYWRvd1Jvb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlXzEuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5vZGVfMS5zaGFkb3dSb290LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZV8xLnNoYWRvd1Jvb3QucmVtb3ZlQ2hpbGQobm9kZV8xLnNoYWRvd1Jvb3QuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlXzE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgTm9kZVR5cGUuVGV4dDpcclxuICAgICAgICAgICAgcmV0dXJuIGRvYy5jcmVhdGVUZXh0Tm9kZShuLmlzU3R5bGUgJiYgaGFja0Nzc1xyXG4gICAgICAgICAgICAgICAgPyBhZGRIb3ZlckNsYXNzKG4udGV4dENvbnRlbnQsIGNhY2hlKVxyXG4gICAgICAgICAgICAgICAgOiBuLnRleHRDb250ZW50KTtcclxuICAgICAgICBjYXNlIE5vZGVUeXBlLkNEQVRBOlxyXG4gICAgICAgICAgICByZXR1cm4gZG9jLmNyZWF0ZUNEQVRBU2VjdGlvbihuLnRleHRDb250ZW50KTtcclxuICAgICAgICBjYXNlIE5vZGVUeXBlLkNvbW1lbnQ6XHJcbiAgICAgICAgICAgIHJldHVybiBkb2MuY3JlYXRlQ29tbWVudChuLnRleHRDb250ZW50KTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBidWlsZE5vZGVXaXRoU04obiwgb3B0aW9ucykge1xyXG4gICAgdmFyIGRvYyA9IG9wdGlvbnMuZG9jLCBtaXJyb3IgPSBvcHRpb25zLm1pcnJvciwgX2EgPSBvcHRpb25zLnNraXBDaGlsZCwgc2tpcENoaWxkID0gX2EgPT09IHZvaWQgMCA/IGZhbHNlIDogX2EsIF9iID0gb3B0aW9ucy5oYWNrQ3NzLCBoYWNrQ3NzID0gX2IgPT09IHZvaWQgMCA/IHRydWUgOiBfYiwgYWZ0ZXJBcHBlbmQgPSBvcHRpb25zLmFmdGVyQXBwZW5kLCBjYWNoZSA9IG9wdGlvbnMuY2FjaGU7XHJcbiAgICBpZiAobWlycm9yLmhhcyhuLmlkKSkge1xyXG4gICAgICAgIHZhciBub2RlSW5NaXJyb3IgPSBtaXJyb3IuZ2V0Tm9kZShuLmlkKTtcclxuICAgICAgICB2YXIgbWV0YSA9IG1pcnJvci5nZXRNZXRhKG5vZGVJbk1pcnJvcik7XHJcbiAgICAgICAgaWYgKGlzTm9kZU1ldGFFcXVhbChtZXRhLCBuKSlcclxuICAgICAgICAgICAgcmV0dXJuIG1pcnJvci5nZXROb2RlKG4uaWQpO1xyXG4gICAgfVxyXG4gICAgdmFyIG5vZGUgPSBidWlsZE5vZGUobiwgeyBkb2M6IGRvYywgaGFja0NzczogaGFja0NzcywgY2FjaGU6IGNhY2hlIH0pO1xyXG4gICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAobi5yb290SWQgJiYgbWlycm9yLmdldE5vZGUobi5yb290SWQpICE9PSBkb2MpIHtcclxuICAgICAgICBtaXJyb3IucmVwbGFjZShuLnJvb3RJZCwgZG9jKTtcclxuICAgIH1cclxuICAgIGlmIChuLnR5cGUgPT09IE5vZGVUeXBlLkRvY3VtZW50KSB7XHJcbiAgICAgICAgZG9jLmNsb3NlKCk7XHJcbiAgICAgICAgZG9jLm9wZW4oKTtcclxuICAgICAgICBpZiAobi5jb21wYXRNb2RlID09PSAnQmFja0NvbXBhdCcgJiZcclxuICAgICAgICAgICAgbi5jaGlsZE5vZGVzICYmXHJcbiAgICAgICAgICAgIG4uY2hpbGROb2Rlc1swXS50eXBlICE9PSBOb2RlVHlwZS5Eb2N1bWVudFR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKG4uY2hpbGROb2Rlc1swXS50eXBlID09PSBOb2RlVHlwZS5FbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAneG1sbnMnIGluIG4uY2hpbGROb2Rlc1swXS5hdHRyaWJ1dGVzICYmXHJcbiAgICAgICAgICAgICAgICBuLmNoaWxkTm9kZXNbMF0uYXR0cmlidXRlcy54bWxucyA9PT0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnKSB7XHJcbiAgICAgICAgICAgICAgICBkb2Mud3JpdGUoJzwhRE9DVFlQRSBodG1sIFBVQkxJQyBcIi0vL1czQy8vRFREIFhIVE1MIDEuMCBUcmFuc2l0aW9uYWwvL0VOXCIgXCJcIj4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvYy53cml0ZSgnPCFET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgSFRNTCA0LjAgVHJhbnNpdGlvbmFsLy9FTlwiIFwiXCI+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZSA9IGRvYztcclxuICAgIH1cclxuICAgIG1pcnJvci5hZGQobm9kZSwgbik7XHJcbiAgICBpZiAoKG4udHlwZSA9PT0gTm9kZVR5cGUuRG9jdW1lbnQgfHwgbi50eXBlID09PSBOb2RlVHlwZS5FbGVtZW50KSAmJlxyXG4gICAgICAgICFza2lwQ2hpbGQpIHtcclxuICAgICAgICB2YXIgX2xvb3BfMiA9IGZ1bmN0aW9uIChjaGlsZE4pIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkTm9kZSA9IGJ1aWxkTm9kZVdpdGhTTihjaGlsZE4sIHtcclxuICAgICAgICAgICAgICAgIGRvYzogZG9jLFxyXG4gICAgICAgICAgICAgICAgbWlycm9yOiBtaXJyb3IsXHJcbiAgICAgICAgICAgICAgICBza2lwQ2hpbGQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaGFja0NzczogaGFja0NzcyxcclxuICAgICAgICAgICAgICAgIGFmdGVyQXBwZW5kOiBhZnRlckFwcGVuZCxcclxuICAgICAgICAgICAgICAgIGNhY2hlOiBjYWNoZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKCFjaGlsZE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignRmFpbGVkIHRvIHJlYnVpbGQnLCBjaGlsZE4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29udGludWVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGROLmlzU2hhZG93ICYmIGlzRWxlbWVudChub2RlKSAmJiBub2RlLnNoYWRvd1Jvb3QpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChjaGlsZE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG4udHlwZSA9PT0gTm9kZVR5cGUuRG9jdW1lbnQgJiZcclxuICAgICAgICAgICAgICAgIGNoaWxkTi50eXBlID09IE5vZGVUeXBlLkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBodG1sRWxlbWVudCA9IGNoaWxkTm9kZTtcclxuICAgICAgICAgICAgICAgIHZhciBib2R5XzEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaHRtbEVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0JPRFknKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5XzEgPSBjaGlsZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvZHlfMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWxFbGVtZW50LnJlbW92ZUNoaWxkKGJvZHlfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWxFbGVtZW50LmFwcGVuZENoaWxkKGJvZHlfMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkTm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkTm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFmdGVyQXBwZW5kKSB7XHJcbiAgICAgICAgICAgICAgICBhZnRlckFwcGVuZChjaGlsZE5vZGUsIGNoaWxkTi5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2MgPSBuLmNoaWxkTm9kZXM7IF9pIDwgX2MubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZE4gPSBfY1tfaV07XHJcbiAgICAgICAgICAgIF9sb29wXzIoY2hpbGROKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9kZTtcclxufVxyXG5mdW5jdGlvbiB2aXNpdChtaXJyb3IsIG9uVmlzaXQpIHtcclxuICAgIGZ1bmN0aW9uIHdhbGsobm9kZSkge1xyXG4gICAgICAgIG9uVmlzaXQobm9kZSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gbWlycm9yLmdldElkcygpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBpZCA9IF9hW19pXTtcclxuICAgICAgICBpZiAobWlycm9yLmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgd2FsayhtaXJyb3IuZ2V0Tm9kZShpZCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBoYW5kbGVTY3JvbGwobm9kZSwgbWlycm9yKSB7XHJcbiAgICB2YXIgbiA9IG1pcnJvci5nZXRNZXRhKG5vZGUpO1xyXG4gICAgaWYgKChuID09PSBudWxsIHx8IG4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IG4udHlwZSkgIT09IE5vZGVUeXBlLkVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgZWwgPSBub2RlO1xyXG4gICAgZm9yICh2YXIgbmFtZV8zIGluIG4uYXR0cmlidXRlcykge1xyXG4gICAgICAgIGlmICghKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLmF0dHJpYnV0ZXMsIG5hbWVfMykgJiZcclxuICAgICAgICAgICAgbmFtZV8zLnN0YXJ0c1dpdGgoJ3JyXycpKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHZhbHVlID0gbi5hdHRyaWJ1dGVzW25hbWVfM107XHJcbiAgICAgICAgaWYgKG5hbWVfMyA9PT0gJ3JyX3Njcm9sbExlZnQnKSB7XHJcbiAgICAgICAgICAgIGVsLnNjcm9sbExlZnQgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWVfMyA9PT0gJ3JyX3Njcm9sbFRvcCcpIHtcclxuICAgICAgICAgICAgZWwuc2Nyb2xsVG9wID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJlYnVpbGQobiwgb3B0aW9ucykge1xyXG4gICAgdmFyIGRvYyA9IG9wdGlvbnMuZG9jLCBvblZpc2l0ID0gb3B0aW9ucy5vblZpc2l0LCBfYSA9IG9wdGlvbnMuaGFja0NzcywgaGFja0NzcyA9IF9hID09PSB2b2lkIDAgPyB0cnVlIDogX2EsIGFmdGVyQXBwZW5kID0gb3B0aW9ucy5hZnRlckFwcGVuZCwgY2FjaGUgPSBvcHRpb25zLmNhY2hlLCBfYiA9IG9wdGlvbnMubWlycm9yLCBtaXJyb3IgPSBfYiA9PT0gdm9pZCAwID8gbmV3IE1pcnJvcigpIDogX2I7XHJcbiAgICB2YXIgbm9kZSA9IGJ1aWxkTm9kZVdpdGhTTihuLCB7XHJcbiAgICAgICAgZG9jOiBkb2MsXHJcbiAgICAgICAgbWlycm9yOiBtaXJyb3IsXHJcbiAgICAgICAgc2tpcENoaWxkOiBmYWxzZSxcclxuICAgICAgICBoYWNrQ3NzOiBoYWNrQ3NzLFxyXG4gICAgICAgIGFmdGVyQXBwZW5kOiBhZnRlckFwcGVuZCxcclxuICAgICAgICBjYWNoZTogY2FjaGVcclxuICAgIH0pO1xyXG4gICAgdmlzaXQobWlycm9yLCBmdW5jdGlvbiAodmlzaXRlZE5vZGUpIHtcclxuICAgICAgICBpZiAob25WaXNpdCkge1xyXG4gICAgICAgICAgICBvblZpc2l0KHZpc2l0ZWROb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaGFuZGxlU2Nyb2xsKHZpc2l0ZWROb2RlLCBtaXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbm9kZTtcclxufVxuXG5leHBvcnQgeyBJR05PUkVEX05PREUsIE1pcnJvciwgTm9kZVR5cGUsIGFkZEhvdmVyQ2xhc3MsIGJ1aWxkTm9kZVdpdGhTTiwgY2xhc3NNYXRjaGVzUmVnZXgsIGNsZWFudXBTbmFwc2hvdCwgY3JlYXRlQ2FjaGUsIGNyZWF0ZU1pcnJvciwgZXNjYXBlSW1wb3J0U3RhdGVtZW50LCBnZW5JZCwgZ2V0SW5wdXRUeXBlLCBpZ25vcmVBdHRyaWJ1dGUsIGlzMkRDYW52YXNCbGFuaywgaXNDU1NJbXBvcnRSdWxlLCBpc0VsZW1lbnQsIGlzTmF0aXZlU2hhZG93RG9tLCBpc05vZGVNZXRhRXF1YWwsIGlzU2hhZG93Um9vdCwgbWFza0lucHV0VmFsdWUsIG5lZWRNYXNraW5nVGV4dCwgcmVidWlsZCwgc2VyaWFsaXplTm9kZVdpdGhJZCwgc25hcHNob3QsIHN0cmluZ2lmeVJ1bGUsIHN0cmluZ2lmeVN0eWxlc2hlZXQsIHRvTG93ZXJDYXNlLCB0cmFuc2Zvcm1BdHRyaWJ1dGUsIHZhbGlkYXRlU3RyaW5naWZpZWRDc3NSdWxlLCB2aXNpdFNuYXBzaG90IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyBUaGlzIGV4YW1wbGUgc3VwcG9ydC9lMmUudHMgaXMgcHJvY2Vzc2VkIGFuZFxuLy8gbG9hZGVkIGF1dG9tYXRpY2FsbHkgYmVmb3JlIHlvdXIgdGVzdCBmaWxlcy5cbi8vXG4vLyBUaGlzIGlzIGEgZ3JlYXQgcGxhY2UgdG8gcHV0IGdsb2JhbCBjb25maWd1cmF0aW9uIGFuZFxuLy8gYmVoYXZpb3IgdGhhdCBtb2RpZmllcyBDeXByZXNzLlxuLy9cbi8vIFlvdSBjYW4gY2hhbmdlIHRoZSBsb2NhdGlvbiBvZiB0aGlzIGZpbGUgb3IgdHVybiBvZmZcbi8vIGF1dG9tYXRpY2FsbHkgc2VydmluZyBzdXBwb3J0IGZpbGVzIHdpdGggdGhlXG4vLyAnc3VwcG9ydEZpbGUnIGNvbmZpZ3VyYXRpb24gb3B0aW9uLlxuLy9cbi8vIFlvdSBjYW4gcmVhZCBtb3JlIGhlcmU6XG4vLyBodHRwczovL29uLmN5cHJlc3MuaW8vY29uZmlndXJhdGlvblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuLy8gSW1wb3J0IGNvbW1hbmRzLmpzIHVzaW5nIEVTMjAxNSBzeW50YXg6XG4vLyBpbXBvcnQgXCIuL2NvbW1hbmRzXCI7XG5pbXBvcnQgXCJAY2hyb21hdGljLWNvbS9jeXByZXNzL3N1cHBvcnRcIjtcblxuLy8gQWx0ZXJuYXRpdmVseSB5b3UgY2FuIHVzZSBDb21tb25KUyBzeW50YXg6XG4vLyByZXF1aXJlKCcuL2NvbW1hbmRzJylcbiJdLCJuYW1lcyI6WyJyZXF1aXJlIl0sInNvdXJjZVJvb3QiOiIifQ==