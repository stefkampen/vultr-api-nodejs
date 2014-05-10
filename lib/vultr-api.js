var https = require('https');
var async = require('async');

var doRequest = function(options,parameters,callback)
{
	options['hostname'] = 'api.vultr.com';
	var req = https.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (data) {
			var jsonData = JSON.parse(data);	
			callback(null,jsonData);
		});
	});
	
	req.on('error', function(e) {
		callback(e,null);
	});
	
	if(options.method == 'POST')
	{
		req.setHeader('Content-Type','application/x-www-form-urlencoded');
		req.write(parameters);
	}
	
	req.end();
}

var getData = function(path,callback)
{
	doRequest({path:path,method:'GET'},null,callback)
}

var postData = function(path,parameters,callback)
{
	doRequest({path:path,method:'POST'},parameters,callback);
}

var getPlans = function(callback)
{
	getData('/v1/plans/list',callback);
}

var getRegionAvailability = function(regionId,callback)
{
	getData('/v1/regions/availability?DCID='+regionId,callback);
}

var getOS = function(callback)
{
	getData('/v1/os/list',callback);
}

exports.getPlans = getPlans;
exports.getRegionAvailability = getRegionAvailability;
exports.getOS = getOS;

exports.getPlansForRegion = function(regionId,callback)
{
	async.parallel([
		function(callback){
			getPlans(callback);
		},
		function(callback){
			getRegionAvailability(regionId,callback);
		}
	], function(err, results)
	{
		var combined = {};
		results[1].forEach(function(id)
		{
			combined[id] = results[0][id];
		});
		callback(err, combined);
	});
}

exports.createServer = function(apiKey,dcId,osId,vpsPlanId,callback)
{
	postData("/v1/server/create?api_key="+apiKey,'DCID='+dcId+'&OSID='+osId+'&VPSPLANID='+vpsPlanId,function(err,result)
	{	
		if(err)
			callback(err, result);
		else if(result && result["SUBID"])
			callback(null,result["SUBID"]);
		else
			callback(new Error("no SUBID found in result"),null);
	});
}

exports.destroyServer = function(apiKey,subId,callback)
{
	postData("/v1/server/destroy?api_key="+apiKey,'SUBID='+subId,callback);
}

exports.listServers = function(apiKey,callback)
{
	getData("/v1/server/list?api_key="+apiKey,callback);
}


