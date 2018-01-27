var network = angular.module('networkApp',[]);
 network.constant('domain', 'http://18.218.16.184/homes247/backend');
  
 network.service('urls', function(domain) {
    this.apiUrl = domain;
 });
 
 network.factory('networking',function($http,urls){
	 
	 var factory={};
	 
	 factory.urlencodedRequest = function(serviceUrl,requestData){
		 
		 var req = {
			 method:'POST',
			 url:serviceUrl,
			 transformRequest: function(obj) {
                       var str = [];
                       for(var p in obj)
                       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                       return str.join("&");
                   },
			 data:requestData,
			 headers:{
				 "Content-Type": "application/x-www-form-urlencoded"
			 }
		 }
		 return req;
	 };
	 
	 
	 factory.urlencodedRequestForGet = function(serviceUrl){
		 
		 var req = {
			 method:'GET',
			 url:serviceUrl,
			 transformRequest: function(obj) {
                       var str = [];
                       for(var p in obj)
                       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                       return str.join("&");
                   },
			 headers:{
				 "Content-Type": "application/x-www-form-urlencoded"
			 }
		 }
		 return req;
	 };
	 
	 
	 factory.jsonPostRequest = function(serviceUrl,requestData){
		 
		 var req = {
			 method:'POST',
			 url: serviceUrl,
		     data: requestdata,
             headers : {       
                "Content-Type": "application/json"
            }
		 } 
		 return req;
		 
	 };
	 
	 
	 
	 factory.callServerForUrlEncondedPOSTRequest = function(serverUrl,requestData,callback){
		 var requestForUrlEncoded = factory.urlencodedRequest(urls.apiUrl+serverUrl,requestData);
		 return $http(requestForUrlEncoded).then(callback,function(error){
			 console.log(error);
		 })
	 };
	 
	 factory.callServerForUrlEncondedGETRequest = function(serverUrl,callback){
		 var requestForUrlEncoded = factory.urlencodedRequestForGet(urls.apiUrl+serverUrl);
		 return $http(requestForUrlEncoded).then(callback,function(error){
			 console.log(error);
		 })
	 };
	 
	 factory.callServerForJsonPOSTRequest = function(serverUrl,requestData,callback){
		 var requestForJson = factory.jsonPostRequest(urls.apiUrl+serverUrl,requestData);
		 return $http(requestForJson).then(callback,function(error){
			 console.log(error);
		 })
	 };
	 
	 return factory;
	 
 });

