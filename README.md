# Gatsby Cookie Notice

A customizable React component that display a cookie banner on your website, Gatsby Cookie Notice can be customized very esily.

## Screenshots

![gatsby-cookie-consent](https://i.imgur.com/3PdZAff.png)
![gatsby-cookie-consent](https://i.imgur.com/IJ29PBF.png)

## Installation

```shell
npm install @mirzalikic/react-cookie-notice --save
```

## Usage 

First, you have to import the component to your file.
```js
import {CookieNotice} from "gatsby-cookie-notice";
```

Then, you call the component in your view, passing your text :
```js
<CookieNotice>
    <h4>This websites uses cookies.</h4>
    <p>We use cookies to make the site work better, but also to see how you interact with it. how you interact with it. We will only use cookies if you allow us to do so by clicking by clicking on "Accept Cookies". You can also choose which cookie you want to allow.</p>
</CookieNotice>
```

You can also pass somes props (list below)
```js
<CookieNotice
  personalizeButtonClasses={"my-btn-classes"}
  personalizeButtonText={"I want to choose my cookies !"}
  cookies={[
          {name: 'necessary', checked: true, editable: false, default: true, title: 'Essentiel', text: 'Essential cookies are necessary for the proper functioning of the site. The site cannot function properly without them.' },
          {name: 'gatsby-gdpr-google-analytics', checked: true, editable: true, default: true, title: 'Google Analytics', text: 'Google Analytics is a statistical tool of Google allowing to measure the audience of the website.' }
    ]}>
    <h4>This websites uses cookies.</h4>
    <p>We use cookies to make the site work better, but also to see how you interact with it. how you interact with it. We will only use cookies if you allow us to do so by clicking by clicking on "Accept Cookies". You can also choose which cookie you want to allow.</p>
</CookieNotice>
```

By default gatsby-cookie-notice work with Bootstrap 5, but you can change classes by passing props.

## Props

| Name                                | Default                                                                                                                                                            | Description                                                                                                      |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| backgroundClasses                   | "container"                                                                                                                                                        | Div inside the BackgroundWrapper, create to make the backgronud color by default.                                |
| backgroundWrapperClasses            | "bg-cookie fixed-bottom py-5"                                                                                                                                      | Div that wrap all the others.                                                                                    |
| acceptButtonText                    | "Accept"                                                                                                                                                           | Accept button text                                                                                               |
| acceptButtonClasses                 | "float-end"                                                                                                                                                        | Accept button classes                                                                                            |
| buttonWrapperClasses                | "btn btn-primary btn-lg mx-2"                                                                                                                                      | Accept and decline button are wrapped inside the same div, here you can change the class of this div.            |
| declineButton                       | true                                                                                                                                                               | Do you want a decline button ? True or false.                                                                    |
| declineButtonText                   | "Decline"                                                                                                                                                          | Decline button classes                                                                                           |
| declineButtonClass                  | "btn btn-secondary btn-lg mx-2"                                                                                                                                    | Decline button text                                                                                              |
| wrapperClasses                      | "d-flex justify-content-between cookie-notice"                                                                                                                     | Classes of the div that wrap accept/decline button (which are in the same div), and also the personalize button. |
| personalizeButtonClasses            | "btn btn-secondary"                                                                                                                                                | Personalize button classes                                                                                       |
| personalizeButtonText               | "Personalize"                                                                                                                                                      | Personalize button text                                                                                          |
| cookies                             | [{name: 'necessary',checked: true,editable: false,default: true,title: 'Essentiel',text: 'Essential cookie are necessary for the proper function of the website'}] | Cookie that you want to implement.                                                                               |
| cookieDays                          | 365                                                                                                                                                                | How much times do you want to keep the cookies ?                                                                 |
| personalizeButtonEnable             | true                                                                                                                                                               | Activate / Desactivate the personalize button                                                                    |
| cookieListClasses                   | "row cookie-list"                                                                                                                                                  | Styles of a div that wrap every every cookie on the customize section.                                           |
| cookieMapClasses                    | "col-12 col-md-6"                                                                                                                                                  | Styles of a Class that wrap checkbox + label (cookie title) + p(description of the cookie)                       |
| cookieTitleClasses                  | ""                                                                                                                                                                 | Styles of the label of the cookie (personalize cookies)                                                          |
| personalizeValidationClasses        | "btn btn-primary btn-lg float-end"                                                                                                                                 | Classes for the button that save the preferences (personalize cookies)                                           |
| personalizeValidationWrapperClasses | "col-12"                                                                                                                                                           | Classes for the button wrapper that save the preferences (personalize cookies)                                   |
| personalizeValidationText           | "Save"                                                                                                                                                             | Validation button text                                                                                           |


## Cookies property


`name` Name of the cookie, should be the same as gatsby-plugin-gdpr-cookies cookie name.
`editable` If the cookie isn't editable, the checkbox cannot be checked / unchecked, used for necessary cookies.
`default` Cookie default value, if the cookie isn't editable, the default value is stored while decline the cookie.
`title` Title of the cookie, displayed on the customize section.
`text` Description of the cookie, displayed with the title on the customize section.

## License 

MIT

## Acknowledgement

Thank's to mirzalikic. He have a repository called "react-cookie-notice" that inspired me to create this repository for gatsby. The design and a bit of code are inspired by him. Also, thank's to all the peoples that will help the repository (add features, fix bugs, ..)
