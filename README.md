vultr-api-nodejs
================

Communication with the Vultr API from node.js

## Installation

    $ npm install vultr-api

## Functionality

Get the complete list of available server plans
```js
var vultr = require('vultr-api');

vultr.getPlans(function(err, plans)
{

});
```

Get the list of available OS versions
```js
vultr.getOS(function(err, osVersions)
{
});
```

Get the availability of plans in a specific region
```js
var regionId = 8;
vultr.getRegionAvailability(regionId,function(err, plans)
{
});
```

Create a server (needs the API key from your vultr profile page)
```js
vultr.createServer(apiKey,regionId,osId,vpsPlanId,function(err, subscriptionId)
{
});
```

List your servers
```js
vultr.listServers(apiKey,function(err, servers)
{
});
```

