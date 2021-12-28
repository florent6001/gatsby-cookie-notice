import React, {useEffect, useState} from "react";
import {initializeAndTrack} from "gatsby-plugin-gdpr-cookies";

const CookieNotice = ({
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
                    personalizeValidationClasses,
                    personalizeValidationWrapperClasses,
                    personalizeValidationText
                }) => {

    const [displayCookieList, setDisplayCookieList] = useState();
    const [displayCookieNotice, setDisplayCookieNotice] = useState();

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
        personalizeValidation: personalizeValidationClasses,
        personalizeValidationWrapper: personalizeValidationWrapperClasses
    }

    const text = {
        acceptButton: acceptButtonText,
        declineButton: declineButtonText,
        personalizeButton: personalizeButtonText,
        personalizeValidation: personalizeValidationText
    }

    const prop = {
        declineButtonActivated: declineButton,
        cookiesList: cookies,
        cookieDays: cookieDays,
        personalizeButton: personalizeButtonEnable
    }

    let date = new Date();
    date.setTime(date.getTime() + (prop.cookieDays * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();

    const acceptCookie = () => {
        prop.cookiesList.map(c => {
            return document.cookie = c.name + "=true" + expires + "; path=/";
        })
        initializeAndTrack(window.location);
        setDisplayCookieNotice(false)
    }

    const declineCookie = () => {
        prop.cookiesList.map(c => {
            if (c.editable)
                return document.cookie = c.name + "=false" + expires + "; path=/";
            else
                return document.cookie = c.name + "=" + c.default + expires + "; path=/";
        })
        initializeAndTrack(window.location);
        setDisplayCookieNotice(false)
    }

    const validatePreferences = (e) => {
        e.preventDefault();
        prop.cookiesList.map(c => {
                if (document.getElementById(c.name).checked)
                    document.cookie = c.name + "=true" + expires + "; path=/";
                else
                    document.cookie = c.name + "=false" + expires + "; path=/";
                initializeAndTrack(window.location);
                setDisplayCookieNotice(false)
            }
        )
    }

    const cookieExist = (name) => {
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
    }


    useEffect(() => {
        prop.cookiesList.map(c => {
            if (!cookieExist(c.name)) {
                return setDisplayCookieNotice(true)
            }
        })
    })

    return (
        <>
            {displayCookieNotice && (
                <div className={styles.backgroundWrapper}>
                    <div className={styles.background}>
                        {children}
                        {displayCookieList && (
                            <form onSubmit={validatePreferences}>
                                <div className={styles.cookiesList}>
                                    {prop.cookiesList.map(c => {
                                        return (
                                            <div key={c.name} className={styles.cookieMap}>
                                                <input type="checkbox"
                                                       defaultChecked={c.default} disabled={!c.editable}
                                                       value={c.name} id={c.name}/>
                                                <label htmlFor={c.name} className={styles.cookieTitle}>{c.title}</label>
                                                <p>{c.text}</p>
                                            </div>
                                        )
                                    })}
                                    <div className={styles.personalizeValidationWrapper}>
                                        <button type={"submit"} className={styles.personalizeValidation}>
                                            {text.personalizeValidation}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )
                        }
                        {!displayCookieList && (
                            <div className={styles.wrapper}>
                                {prop.personalizeButton && (
                                    <button onClick={() => setDisplayCookieList(true)}
                                            className={styles.personalizeButton}>{text.personalizeButton}</button>
                                )}
                                <div className={styles.buttonWrapper}>
                                    {prop.declineButtonActivated && (
                                        <button onClick={declineCookie}
                                                className={styles.declineBtn}>{text.declineButton}</button>
                                    )}
                                    <button onClick={acceptCookie}
                                            className={styles.acceptBtn}>{text.acceptButton}</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

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
    cookies:
        [
            {
                name: 'necessary',
                editable: false,
                default: true,
                title: 'Essentiel',
                text: 'Essential cookie are necessary for the proper function of the website'
            }
        ],
    cookieDays: 365,
    personalizeButtonEnable: true,
    cookieListClasses: "row cookie-list",
    cookieMapClasses: "col-12 col-md-6",
    cookieTitleClasses: "",
    personalizeValidationClasses: "btn btn-primary btn-lg float-end",
    personalizeValidationWrapperClasses: "col-12",
    personalizeValidationText: "Save"
}

export default CookieNotice;