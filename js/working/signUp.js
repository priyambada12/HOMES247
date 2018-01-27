//(function(){
var app = angular.module('signupApp',[]);

app.factory ('signupFactory',function(networking){
	var factory = {};
	factory.signUpWithHomes247 = function(requestData,callback){
		return networking.callServerForUrlEncondedPOSTRequest('/user_registration', requestData, callback);
	}
	return factory;
});

app.controller('signUpCtrl',function($scope,signupFactory,$state){

	$('body').attr('id', 'signup_bg');
	
$scope.signup = {
	name:'',
	number:'',
	password:'',
	email:'',
	source:'',
	uniqueId:''
}

$scope.doRegistration = function(signUp){
	signUp.source=1;

	signupFactory.signUpWithHomes247(signUp,function(success){
		if(success.data.status == "True"){
			alert("Registered successfully");
			$state.go('/login');

		}
	},function(error){
		alert("server is not running");
	});
}

});
//});