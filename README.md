vultr-api-nodejs
================

Communication with the Vultr API from node.js

## Installation

    $ npm install vultr-api

## Functionality

```js
var vultr = require('vultr-api');

vultr.getPlans(function(err, plans)
{
});

vultr.getOS(function(err, plans)
{
});

var regionId = 8;
vultr.getRegionAvailability(regionId,function(err, plans)
{
});
```
