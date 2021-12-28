"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _gatsbyPluginGdprCookies = require("gatsby-plugin-gdpr-cookies");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CookieNotice = _ref => {
  let {
    children,
    backgroundClasses,
    backgroundWrapperClasses,
    acceptButtonText,
    acceptButtonClasses,
    buttonWrapperClasses,
    declineButton,
    declineButtonClasses,
    declineButtonText,
    wrapperClasses,
    personalizeButtonClasses,
    personalizeButtonText,
    cookies,
    cookieDays,
    personalizeButtonEnable,
    cookieListClasses,
    cookieMapClasses,
    cookieTitleClasses,
    wrapCheckboxClasses,
    personalizeValidationClasses,
    personalizeValidationWrapperClasses,
    personalizeValidationText
  } = _ref;
  const [displayCookieList, setDisplayCookieList] = (0, _react.useState)();
  const [displayCookieNotice, setDisplayCookieNotice] = (0, _react.useState)();
  const styles = {
    background: backgroundClasses,
    backgroundWrapper: backgroundWrapperClasses,
    acceptBtn: acceptButtonClasses,
    buttonWrapper: buttonWrapperClasses,
    declineBtn: declineButtonClasses,
    wrapper: wrapperClasses,
    personalizeButton: personalizeButtonClasses,
    cookiesList: cookieListClasses,
    cookieMap: cookieMapClasses,
    cookieTitle: cookieTitleClasses,
    wrapCheckbox: wrapCheckboxClasses,
    personalizeValidation: personalizeValidationClasses,
    personalizeValidationWrapper: personalizeValidationWrapperClasses
  };
  const text = {
    acceptButton: acceptButtonText,
    declineButton: declineButtonText,
    personalizeButton: personalizeButtonText,
    personalizeValidation: personalizeValidationText
  };
  const prop = {
    declineButtonActivated: declineButton,
    cookiesList: cookies,
    cookieDays: cookieDays,
    personalizeButton: personalizeButtonEnable
  };
  let date = new Date();
  date.setTime(date.getTime() + prop.cookieDays * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();

  const acceptCookie = () => {
    prop.cookiesList.map(c => {
      return document.cookie = c.name + "=true" + expires + "; path=/";
    });
    (0, _gatsbyPluginGdprCookies.initializeAndTrack)(window.location);
    setDisplayCookieNotice(false);
  };

  const declineCookie = () => {
    prop.cookiesList.map(c => {
      if (c.editable) return document.cookie = c.name + "=false" + expires + "; path=/";else return document.cookie = c.name + "=" + c.default + expires + "; path=/";
    });
    (0, _gatsbyPluginGdprCookies.initializeAndTrack)(window.location);
    setDisplayCookieNotice(false);
  };

  const validatePreferences = e => {
    e.preventDefault();
    prop.cookiesList.map(c => {
      if (document.getElementById(c.name).checked) document.cookie = c.name + "=true" + expires + "; path=/";else document.cookie = c.name + "=false" + expires + "; path=/";
      (0, _gatsbyPluginGdprCookies.initializeAndTrack)(window.location);
      setDisplayCookieNotice(false);
    });
  };

  const cookieExist = name => {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);

    if (begin === -1) {
      begin = dc.indexOf(prefix);
      if (begin !== 0) return null;
    } else {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);

      if (end !== -1) {
        end = dc.length;
      }
    }

    return decodeURI(dc.substring(begin + prefix.length, end));
  };

  (0, _react.useEffect)(() => {
    prop.cookiesList.map(c => {
      if (!cookieExist(c.name)) {
        return setDisplayCookieNotice(true);
      }
    });
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, displayCookieNotice && /*#__PURE__*/_react.default.createElement("div", {
    className: styles.backgroundWrapper
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: styles.background
  }, children, displayCookieList && /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: validatePreferences
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: styles.cookiesList
  }, prop.cookiesList.map(c => {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: c.name,
      className: styles.cookieMap
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      defaultChecked: c.default,
      disabled: !c.editable,
      value: c.name,
      id: c.name
    }), /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: c.name,
      className: styles.cookieTitle
    }, c.title), /*#__PURE__*/_react.default.createElement("p", null, c.text));
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: styles.personalizeValidationWrapper
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    className: styles.personalizeValidation
  }, text.personalizeValidation)))), !displayCookieList && /*#__PURE__*/_react.default.createElement("div", {
    className: styles.wrapper
  }, prop.personalizeButton && /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setDisplayCookieList(true),
    className: styles.personalizeButton
  }, text.personalizeButton), /*#__PURE__*/_react.default.createElement("div", {
    className: styles.buttonWrapper
  }, prop.declineButtonActivated && /*#__PURE__*/_react.default.createElement("button", {
    onClick: declineCookie,
    className: styles.declineBtn
  }, text.declineButton), /*#__PURE__*/_react.default.createElement("button", {
    onClick: acceptCookie,
    className: styles.acceptBtn
  }, text.acceptButton))))));
};

CookieNotice.defaultProps = {
  backgroundClasses: "container",
  backgroundWrapperClasses: "bg-cookie fixed-bottom py-5",
  acceptButtonText: "Accept",
  buttonWrapperClasses: "float-end",
  acceptButtonClasses: "btn btn-primary btn-lg mx-2",
  declineButton: true,
  declineButtonText: "Decline",
  declineButtonClasses: "btn btn-secondary btn-lg mx-2",
  wrapperClasses: "d-flex justify-content-between cookie-notice",
  personalizeButtonClasses: "btn btn-secondary",
  personalizeButtonText: "Personalize",
  cookies: [{
    name: 'necessary',
    checked: true,
    editable: false,
    default: true,
    title: 'Essentiel',
    text: 'Essential cookie are necessary for the proper function of the website'
  }],
  cookieDays: 365,
  personalizeButtonEnable: true,
  cookieListClasses: "row cookie-list",
  cookieMapClasses: "col-12 col-md-6",
  cookieTitleClasses: "",
  wrapCheckboxClasses: "",
  personalizeValidationClasses: "btn btn-primary btn-lg float-end",
  personalizeValidationWrapperClasses: "col-12",
  personalizeValidationText: "Save"
};
var _default = CookieNotice;
exports.default = _default;