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

Http-client depends on the [Fetch API]. If you support older browsers which may
not yet provide these natively (e.g. IE), consider including a global polyfill
in your bundled application, such as [fetch].


<!-- LINKS -->

[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[fetch]: https://github.com/github/fetch

