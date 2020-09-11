# 35up Javascript SDK

This library provides with Javascript APIs to integrate 35up
into your online shop.

You could include it into you code statically as a npm package
```$xslt
npm i -S @35up/js-sdk
```

or you can include it dynamically by inserting the following tag into your HTML:
```$xslt
<script type="text/javascript" src="http://cdn.35up.com/35up-js-sdk.js"></script>
```

In this case all the API will be available from the global object
`thirtyFiveUp`


## Requirements

SDK library uses following javascript API and features, please make sure you have them polyfilled if you support older browsers:
 - [Fetch API]
 - [Object.entries]


<!-- LINKS -->

[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[Object.entries]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
