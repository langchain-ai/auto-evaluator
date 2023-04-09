(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
	typeof define === 'function' && define.amd ? define(['react'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.HTMLReactParser = factory(global.React));
})(this, (function (require$$0) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var htmlReactParser$1 = {exports: {}};

	var lib$1 = {};

	var possibleStandardNamesOptimized$1 = {};

	// An attribute in which the DOM/SVG standard name is the same as the React prop name (e.g., 'accept').
	var SAME$1 = 0;
	possibleStandardNamesOptimized$1.SAME = SAME$1;

	// An attribute in which the React prop name is the camelcased version of the DOM/SVG standard name (e.g., 'acceptCharset').
	var CAMELCASE$1 = 1;
	possibleStandardNamesOptimized$1.CAMELCASE = CAMELCASE$1;

	possibleStandardNamesOptimized$1.possibleStandardNames = {
	  accept: 0,
	  acceptCharset: 1,
	  'accept-charset': 'acceptCharset',
	  accessKey: 1,
	  action: 0,
	  allowFullScreen: 1,
	  alt: 0,
	  as: 0,
	  async: 0,
	  autoCapitalize: 1,
	  autoComplete: 1,
	  autoCorrect: 1,
	  autoFocus: 1,
	  autoPlay: 1,
	  autoSave: 1,
	  capture: 0,
	  cellPadding: 1,
	  cellSpacing: 1,
	  challenge: 0,
	  charSet: 1,
	  checked: 0,
	  children: 0,
	  cite: 0,
	  class: 'className',
	  classID: 1,
	  className: 1,
	  cols: 0,
	  colSpan: 1,
	  content: 0,
	  contentEditable: 1,
	  contextMenu: 1,
	  controls: 0,
	  controlsList: 1,
	  coords: 0,
	  crossOrigin: 1,
	  dangerouslySetInnerHTML: 1,
	  data: 0,
	  dateTime: 1,
	  default: 0,
	  defaultChecked: 1,
	  defaultValue: 1,
	  defer: 0,
	  dir: 0,
	  disabled: 0,
	  disablePictureInPicture: 1,
	  disableRemotePlayback: 1,
	  download: 0,
	  draggable: 0,
	  encType: 1,
	  enterKeyHint: 1,
	  for: 'htmlFor',
	  form: 0,
	  formMethod: 1,
	  formAction: 1,
	  formEncType: 1,
	  formNoValidate: 1,
	  formTarget: 1,
	  frameBorder: 1,
	  headers: 0,
	  height: 0,
	  hidden: 0,
	  high: 0,
	  href: 0,
	  hrefLang: 1,
	  htmlFor: 1,
	  httpEquiv: 1,
	  'http-equiv': 'httpEquiv',
	  icon: 0,
	  id: 0,
	  innerHTML: 1,
	  inputMode: 1,
	  integrity: 0,
	  is: 0,
	  itemID: 1,
	  itemProp: 1,
	  itemRef: 1,
	  itemScope: 1,
	  itemType: 1,
	  keyParams: 1,
	  keyType: 1,
	  kind: 0,
	  label: 0,
	  lang: 0,
	  list: 0,
	  loop: 0,
	  low: 0,
	  manifest: 0,
	  marginWidth: 1,
	  marginHeight: 1,
	  max: 0,
	  maxLength: 1,
	  media: 0,
	  mediaGroup: 1,
	  method: 0,
	  min: 0,
	  minLength: 1,
	  multiple: 0,
	  muted: 0,
	  name: 0,
	  noModule: 1,
	  nonce: 0,
	  noValidate: 1,
	  open: 0,
	  optimum: 0,
	  pattern: 0,
	  placeholder: 0,
	  playsInline: 1,
	  poster: 0,
	  preload: 0,
	  profile: 0,
	  radioGroup: 1,
	  readOnly: 1,
	  referrerPolicy: 1,
	  rel: 0,
	  required: 0,
	  reversed: 0,
	  role: 0,
	  rows: 0,
	  rowSpan: 1,
	  sandbox: 0,
	  scope: 0,
	  scoped: 0,
	  scrolling: 0,
	  seamless: 0,
	  selected: 0,
	  shape: 0,
	  size: 0,
	  sizes: 0,
	  span: 0,
	  spellCheck: 1,
	  src: 0,
	  srcDoc: 1,
	  srcLang: 1,
	  srcSet: 1,
	  start: 0,
	  step: 0,
	  style: 0,
	  summary: 0,
	  tabIndex: 1,
	  target: 0,
	  title: 0,
	  type: 0,
	  useMap: 1,
	  value: 0,
	  width: 0,
	  wmode: 0,
	  wrap: 0,
	  about: 0,
	  accentHeight: 1,
	  'accent-height': 'accentHeight',
	  accumulate: 0,
	  additive: 0,
	  alignmentBaseline: 1,
	  'alignment-baseline': 'alignmentBaseline',
	  allowReorder: 1,
	  alphabetic: 0,
	  amplitude: 0,
	  arabicForm: 1,
	  'arabic-form': 'arabicForm',
	  ascent: 0,
	  attributeName: 1,
	  attributeType: 1,
	  autoReverse: 1,
	  azimuth: 0,
	  baseFrequency: 1,
	  baselineShift: 1,
	  'baseline-shift': 'baselineShift',
	  baseProfile: 1,
	  bbox: 0,
	  begin: 0,
	  bias: 0,
	  by: 0,
	  calcMode: 1,
	  capHeight: 1,
	  'cap-height': 'capHeight',
	  clip: 0,
	  clipPath: 1,
	  'clip-path': 'clipPath',
	  clipPathUnits: 1,
	  clipRule: 1,
	  'clip-rule': 'clipRule',
	  color: 0,
	  colorInterpolation: 1,
	  'color-interpolation': 'colorInterpolation',
	  colorInterpolationFilters: 1,
	  'color-interpolation-filters': 'colorInterpolationFilters',
	  colorProfile: 1,
	  'color-profile': 'colorProfile',
	  colorRendering: 1,
	  'color-rendering': 'colorRendering',
	  contentScriptType: 1,
	  contentStyleType: 1,
	  cursor: 0,
	  cx: 0,
	  cy: 0,
	  d: 0,
	  datatype: 0,
	  decelerate: 0,
	  descent: 0,
	  diffuseConstant: 1,
	  direction: 0,
	  display: 0,
	  divisor: 0,
	  dominantBaseline: 1,
	  'dominant-baseline': 'dominantBaseline',
	  dur: 0,
	  dx: 0,
	  dy: 0,
	  edgeMode: 1,
	  elevation: 0,
	  enableBackground: 1,
	  'enable-background': 'enableBackground',
	  end: 0,
	  exponent: 0,
	  externalResourcesRequired: 1,
	  fill: 0,
	  fillOpacity: 1,
	  'fill-opacity': 'fillOpacity',
	  fillRule: 1,
	  'fill-rule': 'fillRule',
	  filter: 0,
	  filterRes: 1,
	  filterUnits: 1,
	  floodOpacity: 1,
	  'flood-opacity': 'floodOpacity',
	  floodColor: 1,
	  'flood-color': 'floodColor',
	  focusable: 0,
	  fontFamily: 1,
	  'font-family': 'fontFamily',
	  fontSize: 1,
	  'font-size': 'fontSize',
	  fontSizeAdjust: 1,
	  'font-size-adjust': 'fontSizeAdjust',
	  fontStretch: 1,
	  'font-stretch': 'fontStretch',
	  fontStyle: 1,
	  'font-style': 'fontStyle',
	  fontVariant: 1,
	  'font-variant': 'fontVariant',
	  fontWeight: 1,
	  'font-weight': 'fontWeight',
	  format: 0,
	  from: 0,
	  fx: 0,
	  fy: 0,
	  g1: 0,
	  g2: 0,
	  glyphName: 1,
	  'glyph-name': 'glyphName',
	  glyphOrientationHorizontal: 1,
	  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
	  glyphOrientationVertical: 1,
	  'glyph-orientation-vertical': 'glyphOrientationVertical',
	  glyphRef: 1,
	  gradientTransform: 1,
	  gradientUnits: 1,
	  hanging: 0,
	  horizAdvX: 1,
	  'horiz-adv-x': 'horizAdvX',
	  horizOriginX: 1,
	  'horiz-origin-x': 'horizOriginX',
	  ideographic: 0,
	  imageRendering: 1,
	  'image-rendering': 'imageRendering',
	  in2: 0,
	  in: 0,
	  inlist: 0,
	  intercept: 0,
	  k1: 0,
	  k2: 0,
	  k3: 0,
	  k4: 0,
	  k: 0,
	  kernelMatrix: 1,
	  kernelUnitLength: 1,
	  kerning: 0,
	  keyPoints: 1,
	  keySplines: 1,
	  keyTimes: 1,
	  lengthAdjust: 1,
	  letterSpacing: 1,
	  'letter-spacing': 'letterSpacing',
	  lightingColor: 1,
	  'lighting-color': 'lightingColor',
	  limitingConeAngle: 1,
	  local: 0,
	  markerEnd: 1,
	  'marker-end': 'markerEnd',
	  markerHeight: 1,
	  markerMid: 1,
	  'marker-mid': 'markerMid',
	  markerStart: 1,
	  'marker-start': 'markerStart',
	  markerUnits: 1,
	  markerWidth: 1,
	  mask: 0,
	  maskContentUnits: 1,
	  maskUnits: 1,
	  mathematical: 0,
	  mode: 0,
	  numOctaves: 1,
	  offset: 0,
	  opacity: 0,
	  operator: 0,
	  order: 0,
	  orient: 0,
	  orientation: 0,
	  origin: 0,
	  overflow: 0,
	  overlinePosition: 1,
	  'overline-position': 'overlinePosition',
	  overlineThickness: 1,
	  'overline-thickness': 'overlineThickness',
	  paintOrder: 1,
	  'paint-order': 'paintOrder',
	  panose1: 0,
	  'panose-1': 'panose1',
	  pathLength: 1,
	  patternContentUnits: 1,
	  patternTransform: 1,
	  patternUnits: 1,
	  pointerEvents: 1,
	  'pointer-events': 'pointerEvents',
	  points: 0,
	  pointsAtX: 1,
	  pointsAtY: 1,
	  pointsAtZ: 1,
	  prefix: 0,
	  preserveAlpha: 1,
	  preserveAspectRatio: 1,
	  primitiveUnits: 1,
	  property: 0,
	  r: 0,
	  radius: 0,
	  refX: 1,
	  refY: 1,
	  renderingIntent: 1,
	  'rendering-intent': 'renderingIntent',
	  repeatCount: 1,
	  repeatDur: 1,
	  requiredExtensions: 1,
	  requiredFeatures: 1,
	  resource: 0,
	  restart: 0,
	  result: 0,
	  results: 0,
	  rotate: 0,
	  rx: 0,
	  ry: 0,
	  scale: 0,
	  security: 0,
	  seed: 0,
	  shapeRendering: 1,
	  'shape-rendering': 'shapeRendering',
	  slope: 0,
	  spacing: 0,
	  specularConstant: 1,
	  specularExponent: 1,
	  speed: 0,
	  spreadMethod: 1,
	  startOffset: 1,
	  stdDeviation: 1,
	  stemh: 0,
	  stemv: 0,
	  stitchTiles: 1,
	  stopColor: 1,
	  'stop-color': 'stopColor',
	  stopOpacity: 1,
	  'stop-opacity': 'stopOpacity',
	  strikethroughPosition: 1,
	  'strikethrough-position': 'strikethroughPosition',
	  strikethroughThickness: 1,
	  'strikethrough-thickness': 'strikethroughThickness',
	  string: 0,
	  stroke: 0,
	  strokeDasharray: 1,
	  'stroke-dasharray': 'strokeDasharray',
	  strokeDashoffset: 1,
	  'stroke-dashoffset': 'strokeDashoffset',
	  strokeLinecap: 1,
	  'stroke-linecap': 'strokeLinecap',
	  strokeLinejoin: 1,
	  'stroke-linejoin': 'strokeLinejoin',
	  strokeMiterlimit: 1,
	  'stroke-miterlimit': 'strokeMiterlimit',
	  strokeWidth: 1,
	  'stroke-width': 'strokeWidth',
	  strokeOpacity: 1,
	  'stroke-opacity': 'strokeOpacity',
	  suppressContentEditableWarning: 1,
	  suppressHydrationWarning: 1,
	  surfaceScale: 1,
	  systemLanguage: 1,
	  tableValues: 1,
	  targetX: 1,
	  targetY: 1,
	  textAnchor: 1,
	  'text-anchor': 'textAnchor',
	  textDecoration: 1,
	  'text-decoration': 'textDecoration',
	  textLength: 1,
	  textRendering: 1,
	  'text-rendering': 'textRendering',
	  to: 0,
	  transform: 0,
	  typeof: 0,
	  u1: 0,
	  u2: 0,
	  underlinePosition: 1,
	  'underline-position': 'underlinePosition',
	  underlineThickness: 1,
	  'underline-thickness': 'underlineThickness',
	  unicode: 0,
	  unicodeBidi: 1,
	  'unicode-bidi': 'unicodeBidi',
	  unicodeRange: 1,
	  'unicode-range': 'unicodeRange',
	  unitsPerEm: 1,
	  'units-per-em': 'unitsPerEm',
	  unselectable: 0,
	  vAlphabetic: 1,
	  'v-alphabetic': 'vAlphabetic',
	  values: 0,
	  vectorEffect: 1,
	  'vector-effect': 'vectorEffect',
	  version: 0,
	  vertAdvY: 1,
	  'vert-adv-y': 'vertAdvY',
	  vertOriginX: 1,
	  'vert-origin-x': 'vertOriginX',
	  vertOriginY: 1,
	  'vert-origin-y': 'vertOriginY',
	  vHanging: 1,
	  'v-hanging': 'vHanging',
	  vIdeographic: 1,
	  'v-ideographic': 'vIdeographic',
	  viewBox: 1,
	  viewTarget: 1,
	  visibility: 0,
	  vMathematical: 1,
	  'v-mathematical': 'vMathematical',
	  vocab: 0,
	  widths: 0,
	  wordSpacing: 1,
	  'word-spacing': 'wordSpacing',
	  writingMode: 1,
	  'writing-mode': 'writingMode',
	  x1: 0,
	  x2: 0,
	  x: 0,
	  xChannelSelector: 1,
	  xHeight: 1,
	  'x-height': 'xHeight',
	  xlinkActuate: 1,
	  'xlink:actuate': 'xlinkActuate',
	  xlinkArcrole: 1,
	  'xlink:arcrole': 'xlinkArcrole',
	  xlinkHref: 1,
	  'xlink:href': 'xlinkHref',
	  xlinkRole: 1,
	  'xlink:role': 'xlinkRole',
	  xlinkShow: 1,
	  'xlink:show': 'xlinkShow',
	  xlinkTitle: 1,
	  'xlink:title': 'xlinkTitle',
	  xlinkType: 1,
	  'xlink:type': 'xlinkType',
	  xmlBase: 1,
	  'xml:base': 'xmlBase',
	  xmlLang: 1,
	  'xml:lang': 'xmlLang',
	  xmlns: 0,
	  'xml:space': 'xmlSpace',
	  xmlnsXlink: 1,
	  'xmlns:xlink': 'xmlnsXlink',
	  xmlSpace: 1,
	  y1: 0,
	  y2: 0,
	  y: 0,
	  yChannelSelector: 1,
	  z: 0,
	  zoomAndPan: 1
	};

	Object.defineProperty(lib$1, '__esModule', { value: true });

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

	  if (_i == null) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;

	  var _s, _e;

	  try {
	    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	// A reserved attribute.
	// It is handled by React separately and shouldn't be written to the DOM.
	var RESERVED = 0; // A simple string attribute.
	// Attributes that aren't in the filter are presumed to have this type.

	var STRING = 1; // A string attribute that accepts booleans in React. In HTML, these are called
	// "enumerated" attributes with "true" and "false" as possible values.
	// When true, it should be set to a "true" string.
	// When false, it should be set to a "false" string.

	var BOOLEANISH_STRING = 2; // A real boolean attribute.
	// When true, it should be present (set either to an empty string or its name).
	// When false, it should be omitted.

	var BOOLEAN = 3; // An attribute that can be used as a flag as well as with a value.
	// When true, it should be present (set either to an empty string or its name).
	// When false, it should be omitted.
	// For any other value, should be present with that value.

	var OVERLOADED_BOOLEAN = 4; // An attribute that must be numeric or parse as a numeric.
	// When falsy, it should be removed.

	var NUMERIC = 5; // An attribute that must be positive numeric or parse as a positive numeric.
	// When falsy, it should be removed.

	var POSITIVE_NUMERIC = 6;
	function getPropertyInfo(name) {
	  return properties.hasOwnProperty(name) ? properties[name] : null;
	}

	function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL, removeEmptyString) {
	  this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
	  this.attributeName = attributeName;
	  this.attributeNamespace = attributeNamespace;
	  this.mustUseProperty = mustUseProperty;
	  this.propertyName = name;
	  this.type = type;
	  this.sanitizeURL = sanitizeURL;
	  this.removeEmptyString = removeEmptyString;
	} // When adding attributes to this list, be sure to also add them to
	// the `possibleStandardNames` module to ensure casing and incorrect
	// name warnings.


	var properties = {}; // These props are reserved by React. They shouldn't be written to the DOM.

	var reservedProps = ['children', 'dangerouslySetInnerHTML', // TODO: This prevents the assignment of defaultValue to regular
	// elements (not just inputs). Now that ReactDOMInput assigns to the
	// defaultValue property -- do we need this?
	'defaultValue', 'defaultChecked', 'innerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'style'];
	reservedProps.forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, RESERVED, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // A few React string attributes have a different name.
	// This is a mapping from React prop names to the attribute names.

	[['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
	  var _ref2 = _slicedToArray(_ref, 2),
	      name = _ref2[0],
	      attributeName = _ref2[1];

	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are "enumerated" HTML attributes that accept "true" and "false".
	// In React, we let users pass `true` and `false` even though technically
	// these aren't boolean attributes (they are coerced to strings).

	['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
	  name.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are "enumerated" SVG attributes that accept "true" and "false".
	// In React, we let users pass `true` and `false` even though technically
	// these aren't boolean attributes (they are coerced to strings).
	// Since these are SVG attributes, their attribute names are case-sensitive.

	['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML boolean attributes.

	['allowFullScreen', 'async', // Note: there is a special case that prevents it from being written to the DOM
	// on the client side because the browsers are inconsistent. Instead we call focus().
	'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'disablePictureInPicture', 'disableRemotePlayback', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless', // Microdata
	'itemScope'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, // mustUseProperty
	  name.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are the few React props that we set as DOM properties
	// rather than attributes. These are all booleans.

	['checked', // Note: `option.selected` is not updated if `select.multiple` is
	// disabled with `removeAttribute`. We have special logic for handling this.
	'multiple', 'muted', 'selected' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML attributes that are "overloaded booleans": they behave like
	// booleans, but can also accept a string value.

	['capture', 'download' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML attributes that must be positive numbers.

	['cols', 'rows', 'size', 'span' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML attributes that must be numbers.

	['rowSpan', 'start'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, NUMERIC, false, // mustUseProperty
	  name.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	});
	var CAMELIZE = /[\-\:]([a-z])/g;

	var capitalize$1 = function capitalize(token) {
	  return token[1].toUpperCase();
	}; // This is a list of all SVG attributes that need special casing, namespacing,
	// or boolean value assignment. Regular attributes that just accept strings
	// and have the same names are omitted, just like in the HTML attribute filter.
	// Some of these attributes can be hard to find. This list was created by
	// scraping the MDN documentation.


	['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (attributeName) {
	  var name = attributeName.replace(CAMELIZE, capitalize$1);
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // String SVG attributes with the xlink namespace.

	['xlink:actuate', 'xlink:arcrole', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (attributeName) {
	  var name = attributeName.replace(CAMELIZE, capitalize$1);
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, 'http://www.w3.org/1999/xlink', false, // sanitizeURL
	  false);
	}); // String SVG attributes with the xml namespace.

	['xml:base', 'xml:lang', 'xml:space' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (attributeName) {
	  var name = attributeName.replace(CAMELIZE, capitalize$1);
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, 'http://www.w3.org/XML/1998/namespace', false, // sanitizeURL
	  false);
	}); // These attribute exists both in HTML and SVG.
	// The attribute name is case-sensitive in SVG so we can't just use
	// the React name like we do for attributes that exist only in HTML.

	['tabIndex', 'crossOrigin'].forEach(function (attributeName) {
	  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
	  attributeName.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These attributes accept URLs. These must not allow javascript: URLS.
	// These will also need to accept Trusted Types object in the future.

	var xlinkHref = 'xlinkHref';
	properties[xlinkHref] = new PropertyInfoRecord('xlinkHref', STRING, false, // mustUseProperty
	'xlink:href', 'http://www.w3.org/1999/xlink', true, // sanitizeURL
	false);
	['src', 'href', 'action', 'formAction'].forEach(function (attributeName) {
	  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
	  attributeName.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  true, // sanitizeURL
	  true);
	});

	var _require = possibleStandardNamesOptimized$1,
	    CAMELCASE = _require.CAMELCASE,
	    SAME = _require.SAME,
	    possibleStandardNamesOptimized = _require.possibleStandardNames;

	var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
	var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
	/**
	 * Checks whether a property name is a custom attribute.
	 *
	 * @see {@link https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/HTMLDOMPropertyConfig.js#L23-L25}
	 *
	 * @param {string}
	 * @return {boolean}
	 */

	var isCustomAttribute = RegExp.prototype.test.bind( // eslint-disable-next-line no-misleading-character-class
	new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));
	var possibleStandardNames = Object.keys(possibleStandardNamesOptimized).reduce(function (accumulator, standardName) {
	  var propName = possibleStandardNamesOptimized[standardName];

	  if (propName === SAME) {
	    accumulator[standardName] = standardName;
	  } else if (propName === CAMELCASE) {
	    accumulator[standardName.toLowerCase()] = standardName;
	  } else {
	    accumulator[standardName] = propName;
	  }

	  return accumulator;
	}, {});

	lib$1.BOOLEAN = BOOLEAN;
	lib$1.BOOLEANISH_STRING = BOOLEANISH_STRING;
	lib$1.NUMERIC = NUMERIC;
	lib$1.OVERLOADED_BOOLEAN = OVERLOADED_BOOLEAN;
	lib$1.POSITIVE_NUMERIC = POSITIVE_NUMERIC;
	lib$1.RESERVED = RESERVED;
	lib$1.STRING = STRING;
	lib$1.getPropertyInfo = getPropertyInfo;
	lib$1.isCustomAttribute = isCustomAttribute;
	lib$1.possibleStandardNames = possibleStandardNames;

	var cjs = {};

	// http://www.w3.org/TR/CSS21/grammar.html
	// https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
	var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

	var NEWLINE_REGEX = /\n/g;
	var WHITESPACE_REGEX = /^\s*/;

	// declaration
	var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
	var COLON_REGEX = /^:\s*/;
	var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
	var SEMICOLON_REGEX = /^[;\s]*/;

	// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
	var TRIM_REGEX = /^\s+|\s+$/g;

	// strings
	var NEWLINE = '\n';
	var FORWARD_SLASH = '/';
	var ASTERISK = '*';
	var EMPTY_STRING = '';

	// types
	var TYPE_COMMENT = 'comment';
	var TYPE_DECLARATION = 'declaration';

	/**
	 * @param {String} style
	 * @param {Object} [options]
	 * @return {Object[]}
	 * @throws {TypeError}
	 * @throws {Error}
	 */
	var inlineStyleParser = function(style, options) {
	  if (typeof style !== 'string') {
	    throw new TypeError('First argument must be a string');
	  }

	  if (!style) return [];

	  options = options || {};

	  /**
	   * Positional.
	   */
	  var lineno = 1;
	  var column = 1;

	  /**
	   * Update lineno and column based on `str`.
	   *
	   * @param {String} str
	   */
	  function updatePosition(str) {
	    var lines = str.match(NEWLINE_REGEX);
	    if (lines) lineno += lines.length;
	    var i = str.lastIndexOf(NEWLINE);
	    column = ~i ? str.length - i : column + str.length;
	  }

	  /**
	   * Mark position and patch `node.position`.
	   *
	   * @return {Function}
	   */
	  function position() {
	    var start = { line: lineno, column: column };
	    return function(node) {
	      node.position = new Position(start);
	      whitespace();
	      return node;
	    };
	  }

	  /**
	   * Store position information for a node.
	   *
	   * @constructor
	   * @property {Object} start
	   * @property {Object} end
	   * @property {undefined|String} source
	   */
	  function Position(start) {
	    this.start = start;
	    this.end = { line: lineno, column: column };
	    this.source = options.source;
	  }

	  /**
	   * Non-enumerable source string.
	   */
	  Position.prototype.content = style;

	  /**
	   * Error `msg`.
	   *
	   * @param {String} msg
	   * @throws {Error}
	   */
	  function error(msg) {
	    var err = new Error(
	      options.source + ':' + lineno + ':' + column + ': ' + msg
	    );
	    err.reason = msg;
	    err.filename = options.source;
	    err.line = lineno;
	    err.column = column;
	    err.source = style;

	    if (options.silent) ; else {
	      throw err;
	    }
	  }

	  /**
	   * Match `re` and return captures.
	   *
	   * @param {RegExp} re
	   * @return {undefined|Array}
	   */
	  function match(re) {
	    var m = re.exec(style);
	    if (!m) return;
	    var str = m[0];
	    updatePosition(str);
	    style = style.slice(str.length);
	    return m;
	  }

	  /**
	   * Parse whitespace.
	   */
	  function whitespace() {
	    match(WHITESPACE_REGEX);
	  }

	  /**
	   * Parse comments.
	   *
	   * @param {Object[]} [rules]
	   * @return {Object[]}
	   */
	  function comments(rules) {
	    var c;
	    rules = rules || [];
	    while ((c = comment())) {
	      if (c !== false) {
	        rules.push(c);
	      }
	    }
	    return rules;
	  }

	  /**
	   * Parse comment.
	   *
	   * @return {Object}
	   * @throws {Error}
	   */
	  function comment() {
	    var pos = position();
	    if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;

	    var i = 2;
	    while (
	      EMPTY_STRING != style.charAt(i) &&
	      (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))
	    ) {
	      ++i;
	    }
	    i += 2;

	    if (EMPTY_STRING === style.charAt(i - 1)) {
	      return error('End of comment missing');
	    }

	    var str = style.slice(2, i - 2);
	    column += 2;
	    updatePosition(str);
	    style = style.slice(i);
	    column += 2;

	    return pos({
	      type: TYPE_COMMENT,
	      comment: str
	    });
	  }

	  /**
	   * Parse declaration.
	   *
	   * @return {Object}
	   * @throws {Error}
	   */
	  function declaration() {
	    var pos = position();

	    // prop
	    var prop = match(PROPERTY_REGEX);
	    if (!prop) return;
	    comment();

	    // :
	    if (!match(COLON_REGEX)) return error("property missing ':'");

	    // val
	    var val = match(VALUE_REGEX);

	    var ret = pos({
	      type: TYPE_DECLARATION,
	      property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
	      value: val
	        ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING))
	        : EMPTY_STRING
	    });

	    // ;
	    match(SEMICOLON_REGEX);

	    return ret;
	  }

	  /**
	   * Parse declarations.
	   *
	   * @return {Object[]}
	   */
	  function declarations() {
	    var decls = [];

	    comments(decls);

	    // declarations
	    var decl;
	    while ((decl = declaration())) {
	      if (decl !== false) {
	        decls.push(decl);
	        comments(decls);
	      }
	    }

	    return decls;
	  }

	  whitespace();
	  return declarations();
	};

	/**
	 * Trim `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function trim(str) {
	  return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
	}

	var parse = inlineStyleParser;

	/**
	 * Parses inline style to object.
	 *
	 * @example
	 * // returns { 'line-height': '42' }
	 * StyleToObject('line-height: 42;');
	 *
	 * @param  {String}      style      - The inline style.
	 * @param  {Function}    [iterator] - The iterator function.
	 * @return {null|Object}
	 */
	function StyleToObject(style, iterator) {
	  var output = null;
	  if (!style || typeof style !== 'string') {
	    return output;
	  }

	  var declaration;
	  var declarations = parse(style);
	  var hasIterator = typeof iterator === 'function';
	  var property;
	  var value;

	  for (var i = 0, len = declarations.length; i < len; i++) {
	    declaration = declarations[i];
	    property = declaration.property;
	    value = declaration.value;

	    if (hasIterator) {
	      iterator(property, value, declaration);
	    } else if (value) {
	      output || (output = {});
	      output[property] = value;
	    }
	  }

	  return output;
	}

	var styleToObject = StyleToObject;

	var utilities$4 = {};

	utilities$4.__esModule = true;
	utilities$4.camelCase = void 0;
	var CUSTOM_PROPERTY_REGEX = /^--[a-zA-Z0-9-]+$/;
	var HYPHEN_REGEX = /-([a-z])/g;
	var NO_HYPHEN_REGEX = /^[^-]+$/;
	var VENDOR_PREFIX_REGEX = /^-(webkit|moz|ms|o|khtml)-/;
	var skipCamelCase = function (property) {
	    return !property ||
	        NO_HYPHEN_REGEX.test(property) ||
	        CUSTOM_PROPERTY_REGEX.test(property);
	};
	var capitalize = function (match, character) {
	    return character.toUpperCase();
	};
	var trimHyphen = function (match, prefix) { return prefix + "-"; };
	var camelCase = function (property, options) {
	    if (options === void 0) { options = {}; }
	    if (skipCamelCase(property)) {
	        return property;
	    }
	    property = property.toLowerCase();
	    if (!options.reactCompat) {
	        property = property.replace(VENDOR_PREFIX_REGEX, trimHyphen);
	    }
	    return property.replace(HYPHEN_REGEX, capitalize);
	};
	utilities$4.camelCase = camelCase;

	(function (exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	exports.__esModule = true;
	var style_to_object_1 = __importDefault(styleToObject);
	var utilities_1 = utilities$4;
	function StyleToJS(style, options) {
	    var output = {};
	    if (!style || typeof style !== 'string') {
	        return output;
	    }
	    style_to_object_1["default"](style, function (property, value) {
	        if (property && value) {
	            output[utilities_1.camelCase(property, options)] = value;
	        }
	    });
	    return output;
	}
	exports["default"] = StyleToJS;
	}(cjs));

	var React$1 = require$$0__default["default"];
	var styleToJS = cjs.default;

	/**
	 * Swap key with value in an object.
	 *
	 * @param  {Object}   obj        - The object.
	 * @param  {Function} [override] - The override method.
	 * @return {Object}              - The inverted object.
	 */
	function invertObject(obj, override) {
	  if (!obj || typeof obj !== 'object') {
	    throw new TypeError('First argument must be an object');
	  }

	  var key;
	  var value;
	  var isOverridePresent = typeof override === 'function';
	  var overrides = {};
	  var result = {};

	  for (key in obj) {
	    value = obj[key];

	    if (isOverridePresent) {
	      overrides = override(key, value);
	      if (overrides && overrides.length === 2) {
	        result[overrides[0]] = overrides[1];
	        continue;
	      }
	    }

	    if (typeof value === 'string') {
	      result[value] = key;
	    }
	  }

	  return result;
	}

	/**
	 * Check if a given tag is a custom component.
	 *
	 * @see {@link https://github.com/facebook/react/blob/v16.6.3/packages/react-dom/src/shared/isCustomComponent.js}
	 *
	 * @param {string} tagName - The name of the html tag.
	 * @param {Object} props   - The props being passed to the element.
	 * @return {boolean}
	 */
	function isCustomComponent(tagName, props) {
	  if (tagName.indexOf('-') === -1) {
	    return props && typeof props.is === 'string';
	  }

	  switch (tagName) {
	    // These are reserved SVG and MathML elements.
	    // We don't mind this whitelist too much because we expect it to never grow.
	    // The alternative is to track the namespace in a few places which is convoluted.
	    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
	    case 'annotation-xml':
	    case 'color-profile':
	    case 'font-face':
	    case 'font-face-src':
	    case 'font-face-uri':
	    case 'font-face-format':
	    case 'font-face-name':
	    case 'missing-glyph':
	      return false;
	    default:
	      return true;
	  }
	}

	var styleToJSOptions = { reactCompat: true };

	/**
	 * Sets style prop.
	 *
	 * @param {null|undefined|string} style
	 * @param {object} props
	 */
	function setStyleProp$1(style, props) {
	  if (style === null || style === undefined) {
	    return;
	  }
	  try {
	    props.style = styleToJS(style, styleToJSOptions);
	  } catch (err) {
	    props.style = {};
	  }
	}

	/**
	 * @constant {boolean}
	 * @see {@link https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html}
	 */
	var PRESERVE_CUSTOM_ATTRIBUTES = React$1.version.split('.')[0] >= 16;

	// Taken from
	// https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react-dom/src/client/validateDOMNesting.js#L213
	var elementsWithNoTextChildren = new Set([
	  'tr',
	  'tbody',
	  'thead',
	  'tfoot',
	  'colgroup',
	  'table',
	  'head',
	  'html',
	  'frameset'
	]);

	/**
	 * Checks if the given node can contain text nodes
	 *
	 * @param {DomElement} node
	 * @returns {boolean}
	 */
	function canTextBeChildOfNode$1(node) {
	  return !elementsWithNoTextChildren.has(node.name);
	}

	var utilities$3 = {
	  PRESERVE_CUSTOM_ATTRIBUTES: PRESERVE_CUSTOM_ATTRIBUTES,
	  invertObject: invertObject,
	  isCustomComponent: isCustomComponent,
	  setStyleProp: setStyleProp$1,
	  canTextBeChildOfNode: canTextBeChildOfNode$1,
	  elementsWithNoTextChildren: elementsWithNoTextChildren
	};

	var reactProperty = lib$1;
	var utilities$2 = utilities$3;

	/**
	 * Converts HTML/SVG DOM attributes to React props.
	 *
	 * @param  {object} [attributes={}] - HTML/SVG DOM attributes.
	 * @return {object}                 - React props.
	 */
	var attributesToProps$2 = function attributesToProps(attributes) {
	  attributes = attributes || {};

	  var valueOnlyInputs = {
	    reset: true,
	    submit: true
	  };

	  var attributeName;
	  var attributeNameLowerCased;
	  var attributeValue;
	  var propName;
	  var propertyInfo;
	  var props = {};
	  var inputIsValueOnly = attributes.type && valueOnlyInputs[attributes.type];

	  for (attributeName in attributes) {
	    attributeValue = attributes[attributeName];

	    // ARIA (aria-*) or custom data (data-*) attribute
	    if (reactProperty.isCustomAttribute(attributeName)) {
	      props[attributeName] = attributeValue;
	      continue;
	    }

	    // convert HTML/SVG attribute to React prop
	    attributeNameLowerCased = attributeName.toLowerCase();
	    propName = getPropName(attributeNameLowerCased);

	    if (propName) {
	      propertyInfo = reactProperty.getPropertyInfo(propName);

	      // convert attribute to uncontrolled component prop (e.g., `value` to `defaultValue`)
	      // https://reactjs.org/docs/uncontrolled-components.html
	      if (
	        (propName === 'checked' || propName === 'value') &&
	        !inputIsValueOnly
	      ) {
	        propName = getPropName('default' + attributeNameLowerCased);
	      }

	      props[propName] = attributeValue;

	      switch (propertyInfo && propertyInfo.type) {
	        case reactProperty.BOOLEAN:
	          props[propName] = true;
	          break;
	        case reactProperty.OVERLOADED_BOOLEAN:
	          if (attributeValue === '') {
	            props[propName] = true;
	          }
	          break;
	      }
	      continue;
	    }

	    // preserve custom attribute if React >=16
	    if (utilities$2.PRESERVE_CUSTOM_ATTRIBUTES) {
	      props[attributeName] = attributeValue;
	    }
	  }

	  // transform inline style to object
	  utilities$2.setStyleProp(attributes.style, props);

	  return props;
	};

	/**
	 * Gets prop name from lowercased attribute name.
	 *
	 * @param {string} attributeName - Lowercased attribute name.
	 * @return {string}
	 */
	function getPropName(attributeName) {
	  return reactProperty.possibleStandardNames[attributeName];
	}

	var React = require$$0__default["default"];
	var attributesToProps$1 = attributesToProps$2;
	var utilities$1 = utilities$3;

	var setStyleProp = utilities$1.setStyleProp;
	var canTextBeChildOfNode = utilities$1.canTextBeChildOfNode;

	/**
	 * Converts DOM nodes to JSX element(s).
	 *
	 * @param  {DomElement[]} nodes             - DOM nodes.
	 * @param  {object}       [options={}]      - Options.
	 * @param  {Function}     [options.replace] - Replacer.
	 * @param  {object}       [options.library] - Library (React/Preact/etc.).
	 * @return {string|JSX.Element|JSX.Element[]}
	 */
	function domToReact$1(nodes, options) {
	  options = options || {};

	  var library = options.library || React;
	  var cloneElement = library.cloneElement;
	  var createElement = library.createElement;
	  var isValidElement = library.isValidElement;

	  var result = [];
	  var node;
	  var isWhitespace;
	  var hasReplace = typeof options.replace === 'function';
	  var replaceElement;
	  var props;
	  var children;
	  var trim = options.trim;

	  for (var i = 0, len = nodes.length; i < len; i++) {
	    node = nodes[i];

	    // replace with custom React element (if present)
	    if (hasReplace) {
	      replaceElement = options.replace(node);

	      if (isValidElement(replaceElement)) {
	        // set "key" prop for sibling elements
	        // https://fb.me/react-warning-keys
	        if (len > 1) {
	          replaceElement = cloneElement(replaceElement, {
	            key: replaceElement.key || i
	          });
	        }
	        result.push(replaceElement);
	        continue;
	      }
	    }

	    if (node.type === 'text') {
	      isWhitespace = !node.data.trim().length;

	      if (isWhitespace && node.parent && !canTextBeChildOfNode(node.parent)) {
	        // We have a whitespace node that can't be nested in its parent
	        // so skip it
	        continue;
	      }

	      if (trim && isWhitespace) {
	        // Trim is enabled and we have a whitespace node
	        // so skip it
	        continue;
	      }

	      // We have a text node that's not whitespace and it can be nested
	      // in its parent so add it to the results
	      result.push(node.data);
	      continue;
	    }

	    props = node.attribs;
	    if (skipAttributesToProps(node)) {
	      setStyleProp(props.style, props);
	    } else if (props) {
	      props = attributesToProps$1(props);
	    }

	    children = null;

	    switch (node.type) {
	      case 'script':
	      case 'style':
	        // prevent text in <script> or <style> from being escaped
	        // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
	        if (node.children[0]) {
	          props.dangerouslySetInnerHTML = {
	            __html: node.children[0].data
	          };
	        }
	        break;

	      case 'tag':
	        // setting textarea value in children is an antipattern in React
	        // https://reactjs.org/docs/forms.html#the-textarea-tag
	        if (node.name === 'textarea' && node.children[0]) {
	          props.defaultValue = node.children[0].data;
	        } else if (node.children && node.children.length) {
	          // continue recursion of creating React elements (if applicable)
	          children = domToReact$1(node.children, options);
	        }
	        break;

	      // skip all other cases (e.g., comment)
	      default:
	        continue;
	    }

	    // set "key" prop for sibling elements
	    // https://fb.me/react-warning-keys
	    if (len > 1) {
	      props.key = i;
	    }

	    result.push(createElement(node.name, props, children));
	  }

	  return result.length === 1 ? result[0] : result;
	}

	/**
	 * Determines whether DOM element attributes should be transformed to props.
	 * Web Components should not have their attributes transformed except for `style`.
	 *
	 * @param  {DomElement} node
	 * @return {boolean}
	 */
	function skipAttributesToProps(node) {
	  return (
	    utilities$1.PRESERVE_CUSTOM_ATTRIBUTES &&
	    node.type === 'tag' &&
	    utilities$1.isCustomComponent(node.name, node.attribs)
	  );
	}

	var domToReact_1 = domToReact$1;

	/**
	 * SVG elements are case-sensitive.
	 *
	 * @see {@link https://developer.mozilla.org/docs/Web/SVG/Element#SVG_elements_A_to_Z}
	 */

	var CASE_SENSITIVE_TAG_NAMES$1 = [
	  'animateMotion',
	  'animateTransform',
	  'clipPath',
	  'feBlend',
	  'feColorMatrix',
	  'feComponentTransfer',
	  'feComposite',
	  'feConvolveMatrix',
	  'feDiffuseLighting',
	  'feDisplacementMap',
	  'feDropShadow',
	  'feFlood',
	  'feFuncA',
	  'feFuncB',
	  'feFuncG',
	  'feFuncR',
	  'feGaussainBlur',
	  'feImage',
	  'feMerge',
	  'feMergeNode',
	  'feMorphology',
	  'feOffset',
	  'fePointLight',
	  'feSpecularLighting',
	  'feSpotLight',
	  'feTile',
	  'feTurbulence',
	  'foreignObject',
	  'linearGradient',
	  'radialGradient',
	  'textPath'
	];

	var constants$1 = {
	  CASE_SENSITIVE_TAG_NAMES: CASE_SENSITIVE_TAG_NAMES$1
	};

	var node = {};

	var lib = {};

	(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = exports.ElementType = void 0;
	/** Types of elements found in htmlparser2's DOM */
	var ElementType;
	(function (ElementType) {
	    /** Type for the root element of a document */
	    ElementType["Root"] = "root";
	    /** Type for Text */
	    ElementType["Text"] = "text";
	    /** Type for <? ... ?> */
	    ElementType["Directive"] = "directive";
	    /** Type for <!-- ... --> */
	    ElementType["Comment"] = "comment";
	    /** Type for <script> tags */
	    ElementType["Script"] = "script";
	    /** Type for <style> tags */
	    ElementType["Style"] = "style";
	    /** Type for Any tag */
	    ElementType["Tag"] = "tag";
	    /** Type for <![CDATA[ ... ]]> */
	    ElementType["CDATA"] = "cdata";
	    /** Type for <!doctype ...> */
	    ElementType["Doctype"] = "doctype";
	})(ElementType = exports.ElementType || (exports.ElementType = {}));
	/**
	 * Tests whether an element is a tag or not.
	 *
	 * @param elem Element to test
	 */
	function isTag(elem) {
	    return (elem.type === ElementType.Tag ||
	        elem.type === ElementType.Script ||
	        elem.type === ElementType.Style);
	}
	exports.isTag = isTag;
	// Exports for backwards compatibility
	/** Type for the root element of a document */
	exports.Root = ElementType.Root;
	/** Type for Text */
	exports.Text = ElementType.Text;
	/** Type for <? ... ?> */
	exports.Directive = ElementType.Directive;
	/** Type for <!-- ... --> */
	exports.Comment = ElementType.Comment;
	/** Type for <script> tags */
	exports.Script = ElementType.Script;
	/** Type for <style> tags */
	exports.Style = ElementType.Style;
	/** Type for Any tag */
	exports.Tag = ElementType.Tag;
	/** Type for <![CDATA[ ... ]]> */
	exports.CDATA = ElementType.CDATA;
	/** Type for <!doctype ...> */
	exports.Doctype = ElementType.Doctype;
	}(lib));

	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	Object.defineProperty(node, "__esModule", { value: true });
	node.cloneNode = node.hasChildren = node.isDocument = node.isDirective = node.isComment = node.isText = node.isCDATA = node.isTag = node.Element = node.Document = node.NodeWithChildren = node.ProcessingInstruction = node.Comment = node.Text = node.DataNode = node.Node = void 0;
	var domelementtype_1 = lib;
	var nodeTypes = new Map([
	    [domelementtype_1.ElementType.Tag, 1],
	    [domelementtype_1.ElementType.Script, 1],
	    [domelementtype_1.ElementType.Style, 1],
	    [domelementtype_1.ElementType.Directive, 1],
	    [domelementtype_1.ElementType.Text, 3],
	    [domelementtype_1.ElementType.CDATA, 4],
	    [domelementtype_1.ElementType.Comment, 8],
	    [domelementtype_1.ElementType.Root, 9],
	]);
	/**
	 * This object will be used as the prototype for Nodes when creating a
	 * DOM-Level-1-compliant structure.
	 */
	var Node = /** @class */ (function () {
	    /**
	     *
	     * @param type The type of the node.
	     */
	    function Node(type) {
	        this.type = type;
	        /** Parent of the node */
	        this.parent = null;
	        /** Previous sibling */
	        this.prev = null;
	        /** Next sibling */
	        this.next = null;
	        /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
	        this.startIndex = null;
	        /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
	        this.endIndex = null;
	    }
	    Object.defineProperty(Node.prototype, "nodeType", {
	        // Read-only aliases
	        /**
	         * [DOM spec](https://dom.spec.whatwg.org/#dom-node-nodetype)-compatible
	         * node {@link type}.
	         */
	        get: function () {
	            var _a;
	            return (_a = nodeTypes.get(this.type)) !== null && _a !== void 0 ? _a : 1;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Node.prototype, "parentNode", {
	        // Read-write aliases for properties
	        /**
	         * Same as {@link parent}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.parent;
	        },
	        set: function (parent) {
	            this.parent = parent;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Node.prototype, "previousSibling", {
	        /**
	         * Same as {@link prev}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.prev;
	        },
	        set: function (prev) {
	            this.prev = prev;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Node.prototype, "nextSibling", {
	        /**
	         * Same as {@link next}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.next;
	        },
	        set: function (next) {
	            this.next = next;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Clone this node, and optionally its children.
	     *
	     * @param recursive Clone child nodes as well.
	     * @returns A clone of the node.
	     */
	    Node.prototype.cloneNode = function (recursive) {
	        if (recursive === void 0) { recursive = false; }
	        return cloneNode(this, recursive);
	    };
	    return Node;
	}());
	node.Node = Node;
	/**
	 * A node that contains some data.
	 */
	var DataNode = /** @class */ (function (_super) {
	    __extends(DataNode, _super);
	    /**
	     * @param type The type of the node
	     * @param data The content of the data node
	     */
	    function DataNode(type, data) {
	        var _this = _super.call(this, type) || this;
	        _this.data = data;
	        return _this;
	    }
	    Object.defineProperty(DataNode.prototype, "nodeValue", {
	        /**
	         * Same as {@link data}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.data;
	        },
	        set: function (data) {
	            this.data = data;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return DataNode;
	}(Node));
	node.DataNode = DataNode;
	/**
	 * Text within the document.
	 */
	var Text$1 = /** @class */ (function (_super) {
	    __extends(Text, _super);
	    function Text(data) {
	        return _super.call(this, domelementtype_1.ElementType.Text, data) || this;
	    }
	    return Text;
	}(DataNode));
	node.Text = Text$1;
	/**
	 * Comments within the document.
	 */
	var Comment$1 = /** @class */ (function (_super) {
	    __extends(Comment, _super);
	    function Comment(data) {
	        return _super.call(this, domelementtype_1.ElementType.Comment, data) || this;
	    }
	    return Comment;
	}(DataNode));
	node.Comment = Comment$1;
	/**
	 * Processing instructions, including doc types.
	 */
	var ProcessingInstruction$1 = /** @class */ (function (_super) {
	    __extends(ProcessingInstruction, _super);
	    function ProcessingInstruction(name, data) {
	        var _this = _super.call(this, domelementtype_1.ElementType.Directive, data) || this;
	        _this.name = name;
	        return _this;
	    }
	    return ProcessingInstruction;
	}(DataNode));
	node.ProcessingInstruction = ProcessingInstruction$1;
	/**
	 * A `Node` that can have children.
	 */
	var NodeWithChildren = /** @class */ (function (_super) {
	    __extends(NodeWithChildren, _super);
	    /**
	     * @param type Type of the node.
	     * @param children Children of the node. Only certain node types can have children.
	     */
	    function NodeWithChildren(type, children) {
	        var _this = _super.call(this, type) || this;
	        _this.children = children;
	        return _this;
	    }
	    Object.defineProperty(NodeWithChildren.prototype, "firstChild", {
	        // Aliases
	        /** First child of the node. */
	        get: function () {
	            var _a;
	            return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(NodeWithChildren.prototype, "lastChild", {
	        /** Last child of the node. */
	        get: function () {
	            return this.children.length > 0
	                ? this.children[this.children.length - 1]
	                : null;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(NodeWithChildren.prototype, "childNodes", {
	        /**
	         * Same as {@link children}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.children;
	        },
	        set: function (children) {
	            this.children = children;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return NodeWithChildren;
	}(Node));
	node.NodeWithChildren = NodeWithChildren;
	/**
	 * The root node of the document.
	 */
	var Document = /** @class */ (function (_super) {
	    __extends(Document, _super);
	    function Document(children) {
	        return _super.call(this, domelementtype_1.ElementType.Root, children) || this;
	    }
	    return Document;
	}(NodeWithChildren));
	node.Document = Document;
	/**
	 * An element within the DOM.
	 */
	var Element$1 = /** @class */ (function (_super) {
	    __extends(Element, _super);
	    /**
	     * @param name Name of the tag, eg. `div`, `span`.
	     * @param attribs Object mapping attribute names to attribute values.
	     * @param children Children of the node.
	     */
	    function Element(name, attribs, children, type) {
	        if (children === void 0) { children = []; }
	        if (type === void 0) { type = name === "script"
	            ? domelementtype_1.ElementType.Script
	            : name === "style"
	                ? domelementtype_1.ElementType.Style
	                : domelementtype_1.ElementType.Tag; }
	        var _this = _super.call(this, type, children) || this;
	        _this.name = name;
	        _this.attribs = attribs;
	        return _this;
	    }
	    Object.defineProperty(Element.prototype, "tagName", {
	        // DOM Level 1 aliases
	        /**
	         * Same as {@link name}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.name;
	        },
	        set: function (name) {
	            this.name = name;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Element.prototype, "attributes", {
	        get: function () {
	            var _this = this;
	            return Object.keys(this.attribs).map(function (name) {
	                var _a, _b;
	                return ({
	                    name: name,
	                    value: _this.attribs[name],
	                    namespace: (_a = _this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
	                    prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name],
	                });
	            });
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return Element;
	}(NodeWithChildren));
	node.Element = Element$1;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node is a `Element`, `false` otherwise.
	 */
	function isTag(node) {
	    return (0, domelementtype_1.isTag)(node);
	}
	node.isTag = isTag;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `CDATA`, `false` otherwise.
	 */
	function isCDATA(node) {
	    return node.type === domelementtype_1.ElementType.CDATA;
	}
	node.isCDATA = isCDATA;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `Text`, `false` otherwise.
	 */
	function isText(node) {
	    return node.type === domelementtype_1.ElementType.Text;
	}
	node.isText = isText;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `Comment`, `false` otherwise.
	 */
	function isComment(node) {
	    return node.type === domelementtype_1.ElementType.Comment;
	}
	node.isComment = isComment;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
	 */
	function isDirective(node) {
	    return node.type === domelementtype_1.ElementType.Directive;
	}
	node.isDirective = isDirective;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
	 */
	function isDocument(node) {
	    return node.type === domelementtype_1.ElementType.Root;
	}
	node.isDocument = isDocument;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node is a `NodeWithChildren` (has children), `false` otherwise.
	 */
	function hasChildren(node) {
	    return Object.prototype.hasOwnProperty.call(node, "children");
	}
	node.hasChildren = hasChildren;
	/**
	 * Clone a node, and optionally its children.
	 *
	 * @param recursive Clone child nodes as well.
	 * @returns A clone of the node.
	 */
	function cloneNode(node, recursive) {
	    if (recursive === void 0) { recursive = false; }
	    var result;
	    if (isText(node)) {
	        result = new Text$1(node.data);
	    }
	    else if (isComment(node)) {
	        result = new Comment$1(node.data);
	    }
	    else if (isTag(node)) {
	        var children = recursive ? cloneChildren(node.children) : [];
	        var clone_1 = new Element$1(node.name, __assign({}, node.attribs), children);
	        children.forEach(function (child) { return (child.parent = clone_1); });
	        if (node.namespace != null) {
	            clone_1.namespace = node.namespace;
	        }
	        if (node["x-attribsNamespace"]) {
	            clone_1["x-attribsNamespace"] = __assign({}, node["x-attribsNamespace"]);
	        }
	        if (node["x-attribsPrefix"]) {
	            clone_1["x-attribsPrefix"] = __assign({}, node["x-attribsPrefix"]);
	        }
	        result = clone_1;
	    }
	    else if (isCDATA(node)) {
	        var children = recursive ? cloneChildren(node.children) : [];
	        var clone_2 = new NodeWithChildren(domelementtype_1.ElementType.CDATA, children);
	        children.forEach(function (child) { return (child.parent = clone_2); });
	        result = clone_2;
	    }
	    else if (isDocument(node)) {
	        var children = recursive ? cloneChildren(node.children) : [];
	        var clone_3 = new Document(children);
	        children.forEach(function (child) { return (child.parent = clone_3); });
	        if (node["x-mode"]) {
	            clone_3["x-mode"] = node["x-mode"];
	        }
	        result = clone_3;
	    }
	    else if (isDirective(node)) {
	        var instruction = new ProcessingInstruction$1(node.name, node.data);
	        if (node["x-name"] != null) {
	            instruction["x-name"] = node["x-name"];
	            instruction["x-publicId"] = node["x-publicId"];
	            instruction["x-systemId"] = node["x-systemId"];
	        }
	        result = instruction;
	    }
	    else {
	        throw new Error("Not implemented yet: ".concat(node.type));
	    }
	    result.startIndex = node.startIndex;
	    result.endIndex = node.endIndex;
	    if (node.sourceCodeLocation != null) {
	        result.sourceCodeLocation = node.sourceCodeLocation;
	    }
	    return result;
	}
	node.cloneNode = cloneNode;
	function cloneChildren(childs) {
	    var children = childs.map(function (child) { return cloneNode(child, true); });
	    for (var i = 1; i < children.length; i++) {
	        children[i].prev = children[i - 1];
	        children[i - 1].next = children[i];
	    }
	    return children;
	}

	var constants = constants$1;
	var domhandler = node;

	var CASE_SENSITIVE_TAG_NAMES = constants.CASE_SENSITIVE_TAG_NAMES;

	var Comment = domhandler.Comment;
	var Element = domhandler.Element;
	var ProcessingInstruction = domhandler.ProcessingInstruction;
	var Text = domhandler.Text;

	var caseSensitiveTagNamesMap = {};
	var tagName;

	for (var i = 0, len = CASE_SENSITIVE_TAG_NAMES.length; i < len; i++) {
	  tagName = CASE_SENSITIVE_TAG_NAMES[i];
	  caseSensitiveTagNamesMap[tagName.toLowerCase()] = tagName;
	}

	/**
	 * Gets case-sensitive tag name.
	 *
	 * @param  {string}           tagName - Tag name in lowercase.
	 * @return {string|undefined}         - Case-sensitive tag name.
	 */
	function getCaseSensitiveTagName(tagName) {
	  return caseSensitiveTagNamesMap[tagName];
	}

	/**
	 * Formats DOM attributes to a hash map.
	 *
	 * @param  {NamedNodeMap} attributes - List of attributes.
	 * @return {object}                  - Map of attribute name to value.
	 */
	function formatAttributes(attributes) {
	  var result = {};
	  var attribute;
	  // `NamedNodeMap` is array-like
	  for (var i = 0, len = attributes.length; i < len; i++) {
	    attribute = attributes[i];
	    result[attribute.name] = attribute.value;
	  }
	  return result;
	}

	/**
	 * Corrects the tag name if it is case-sensitive (SVG).
	 * Otherwise, returns the lowercase tag name (HTML).
	 *
	 * @param  {string} tagName - Lowercase tag name.
	 * @return {string}         - Formatted tag name.
	 */
	function formatTagName(tagName) {
	  tagName = tagName.toLowerCase();
	  var caseSensitiveTagName = getCaseSensitiveTagName(tagName);
	  if (caseSensitiveTagName) {
	    return caseSensitiveTagName;
	  }
	  return tagName;
	}

	/**
	 * Transforms DOM nodes to `domhandler` nodes.
	 *
	 * @param  {NodeList}     nodes         - DOM nodes.
	 * @param  {Element|null} [parent=null] - Parent node.
	 * @param  {string}       [directive]   - Directive.
	 * @return {Array<Comment|Element|ProcessingInstruction|Text>}
	 */
	function formatDOM$1(nodes, parent, directive) {
	  parent = parent || null;
	  var result = [];

	  for (var index = 0, len = nodes.length; index < len; index++) {
	    var node = nodes[index];
	    var current;

	    // set the node data given the type
	    switch (node.nodeType) {
	      case 1:
	        // script, style, or tag
	        current = new Element(
	          formatTagName(node.nodeName),
	          formatAttributes(node.attributes)
	        );
	        current.children = formatDOM$1(node.childNodes, current);
	        break;

	      case 3:
	        current = new Text(node.nodeValue);
	        break;

	      case 8:
	        current = new Comment(node.nodeValue);
	        break;

	      default:
	        continue;
	    }

	    // set previous node next
	    var prev = result[index - 1] || null;
	    if (prev) {
	      prev.next = current;
	    }

	    // set properties for current node
	    current.parent = parent;
	    current.prev = prev;
	    current.next = null;

	    result.push(current);
	  }

	  if (directive) {
	    current = new ProcessingInstruction(
	      directive.substring(0, directive.indexOf(' ')).toLowerCase(),
	      directive
	    );
	    current.next = result[0] || null;
	    current.parent = parent;
	    result.unshift(current);

	    if (result[1]) {
	      result[1].prev = result[0];
	    }
	  }

	  return result;
	}

	/**
	 * Detects if browser is Internet Explorer.
	 *
	 * @return {boolean} - Whether IE is detected.
	 */
	function isIE$1() {
	  return /(MSIE |Trident\/|Edge\/)/.test(navigator.userAgent);
	}

	var utilities = {
	  formatAttributes: formatAttributes,
	  formatDOM: formatDOM$1,
	  isIE: isIE$1
	};

	// constants
	var HTML = 'html';
	var HEAD = 'head';
	var BODY = 'body';
	var FIRST_TAG_REGEX = /<([a-zA-Z]+[0-9]?)/; // e.g., <h1>
	var HEAD_TAG_REGEX = /<head.*>/i;
	var BODY_TAG_REGEX = /<body.*>/i;

	// falls back to `parseFromString` if `createHTMLDocument` cannot be used
	var parseFromDocument = function () {
	  throw new Error(
	    'This browser does not support `document.implementation.createHTMLDocument`'
	  );
	};

	var parseFromString = function () {
	  throw new Error(
	    'This browser does not support `DOMParser.prototype.parseFromString`'
	  );
	};

	/**
	 * DOMParser (performance: slow).
	 *
	 * @see https://developer.mozilla.org/docs/Web/API/DOMParser#Parsing_an_SVG_or_HTML_document
	 */
	if (typeof window.DOMParser === 'function') {
	  var domParser = new window.DOMParser();
	  var mimeType = 'text/html';

	  /**
	   * Creates an HTML document using `DOMParser.parseFromString`.
	   *
	   * @param  {string} html      - The HTML string.
	   * @param  {string} [tagName] - The element to render the HTML (with 'body' as fallback).
	   * @return {HTMLDocument}
	   */
	  parseFromString = function (html, tagName) {
	    if (tagName) {
	      html = '<' + tagName + '>' + html + '</' + tagName + '>';
	    }

	    return domParser.parseFromString(html, mimeType);
	  };

	  parseFromDocument = parseFromString;
	}

	/**
	 * DOMImplementation (performance: fair).
	 *
	 * @see https://developer.mozilla.org/docs/Web/API/DOMImplementation/createHTMLDocument
	 */
	if (document.implementation) {
	  var isIE = utilities.isIE;

	  // title parameter is required in IE
	  // https://msdn.microsoft.com/en-us/library/ff975457(v=vs.85).aspx
	  var doc = document.implementation.createHTMLDocument(
	    isIE() ? 'html-dom-parser' : undefined
	  );

	  /**
	   * Use HTML document created by `document.implementation.createHTMLDocument`.
	   *
	   * @param  {string} html      - The HTML string.
	   * @param  {string} [tagName] - The element to render the HTML (with 'body' as fallback).
	   * @return {HTMLDocument}
	   */
	  parseFromDocument = function (html, tagName) {
	    if (tagName) {
	      doc.documentElement.getElementsByTagName(tagName)[0].innerHTML = html;
	      return doc;
	    }

	    doc.documentElement.innerHTML = html;
	    return doc;
	  };
	}

	/**
	 * Template (performance: fast).
	 *
	 * @see https://developer.mozilla.org/docs/Web/HTML/Element/template
	 */
	var template = document.createElement('template');
	var parseFromTemplate;

	if (template.content) {
	  /**
	   * Uses a template element (content fragment) to parse HTML.
	   *
	   * @param  {string} html - The HTML string.
	   * @return {NodeList}
	   */
	  parseFromTemplate = function (html) {
	    template.innerHTML = html;
	    return template.content.childNodes;
	  };
	}

	/**
	 * Parses HTML string to DOM nodes.
	 *
	 * @param  {string}   html - HTML markup.
	 * @return {NodeList}
	 */
	function domparser$1(html) {
	  var firstTagName;
	  var match = html.match(FIRST_TAG_REGEX);

	  if (match && match[1]) {
	    firstTagName = match[1].toLowerCase();
	  }

	  var doc;
	  var element;
	  var elements;

	  switch (firstTagName) {
	    case HTML:
	      doc = parseFromString(html);

	      // the created document may come with filler head/body elements,
	      // so make sure to remove them if they don't actually exist
	      if (!HEAD_TAG_REGEX.test(html)) {
	        element = doc.getElementsByTagName(HEAD)[0];
	        if (element) {
	          element.parentNode.removeChild(element);
	        }
	      }

	      if (!BODY_TAG_REGEX.test(html)) {
	        element = doc.getElementsByTagName(BODY)[0];
	        if (element) {
	          element.parentNode.removeChild(element);
	        }
	      }

	      return doc.getElementsByTagName(HTML);

	    case HEAD:
	    case BODY:
	      elements = parseFromDocument(html).getElementsByTagName(firstTagName);

	      // if there's a sibling element, then return both elements
	      if (BODY_TAG_REGEX.test(html) && HEAD_TAG_REGEX.test(html)) {
	        return elements[0].parentNode.childNodes;
	      }
	      return elements;

	    // low-level tag or text
	    default:
	      if (parseFromTemplate) {
	        return parseFromTemplate(html);
	      }

	      return parseFromDocument(html, BODY).getElementsByTagName(BODY)[0]
	        .childNodes;
	  }
	}

	var domparser_1 = domparser$1;

	var domparser = domparser_1;
	var formatDOM = utilities.formatDOM;

	var DIRECTIVE_REGEX = /<(![a-zA-Z\s]+)>/; // e.g., <!doctype html>

	/**
	 * Parses HTML string to DOM nodes in browser.
	 *
	 * @param  {string} html  - HTML markup.
	 * @return {DomElement[]} - DOM elements.
	 */
	function HTMLDOMParser(html) {
	  if (typeof html !== 'string') {
	    throw new TypeError('First argument must be a string');
	  }

	  if (html === '') {
	    return [];
	  }

	  // match directive
	  var match = html.match(DIRECTIVE_REGEX);
	  var directive;

	  if (match && match[1]) {
	    directive = match[1];
	  }

	  return formatDOM(domparser(html), null, directive);
	}

	var htmlToDom = HTMLDOMParser;

	var domToReact = domToReact_1;
	var attributesToProps = attributesToProps$2;
	var htmlToDOM = htmlToDom;

	// support backwards compatibility for ES Module
	htmlToDOM =
	  /* istanbul ignore next */
	  typeof htmlToDOM.default === 'function' ? htmlToDOM.default : htmlToDOM;

	var domParserOptions = { lowerCaseAttributeNames: false };

	/**
	 * Converts HTML string to React elements.
	 *
	 * @param  {String}   html                    - HTML string.
	 * @param  {Object}   [options]               - Parser options.
	 * @param  {Object}   [options.htmlparser2]   - htmlparser2 options.
	 * @param  {Object}   [options.library]       - Library for React, Preact, etc.
	 * @param  {Function} [options.replace]       - Replace method.
	 * @return {JSX.Element|JSX.Element[]|String} - React element(s), empty array, or string.
	 */
	function HTMLReactParser(html, options) {
	  if (typeof html !== 'string') {
	    throw new TypeError('First argument must be a string');
	  }
	  if (html === '') {
	    return [];
	  }
	  options = options || {};
	  return domToReact(
	    htmlToDOM(html, options.htmlparser2 || domParserOptions),
	    options
	  );
	}

	HTMLReactParser.domToReact = domToReact;
	HTMLReactParser.htmlToDOM = htmlToDOM;
	HTMLReactParser.attributesToProps = attributesToProps;
	HTMLReactParser.Element = node.Element;

	// support CommonJS and ES Modules
	htmlReactParser$1.exports = HTMLReactParser;
	htmlReactParser$1.exports.default = HTMLReactParser;

	var htmlReactParser = htmlReactParser$1.exports;

	return htmlReactParser;

}));
//# sourceMappingURL=html-react-parser.js.map
