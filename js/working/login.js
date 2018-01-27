//(function(){
var app = angular.module('loginApp',[]);
app.factory('loginFactory',function(networking){
		var factory = {};
	factory.signinWithHomes247 = function(requestData,callback){
		return networking.callServerForUrlEncondedPOSTRequest('/user_login', requestData, callback);
	}
	return factory;
});
app.controller('loginCtrl',function($scope,loginFactory,$state){
	$('body').attr('id', 'signup_bg');
	$scope.user = {
	email:'',
	password:'',
	source:''
	};
	
	$scope.login = function(user){
		user.source =1;
		console.log(user);
		loginFactory.signinWithHomes247(user,function(success){
		if(success.data.status=="True"){
			$state.go('myaccounts');
		}else{
			alert("Invalid username and password");
		}
		
	},function(error){
		alert("unable to connect to server");
	});
	
	}
	

});

//});