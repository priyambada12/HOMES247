//(function(){
var app = angular.module('sidebarApp',[]);

app.controller('sidebarCtrl',function($scope){
	
	
	$scope.openNav =function() {
		document.getElementById("mySidenav").style.width = "250px";
	}

	$scope.closeNav = function() {
		document.getElementById("mySidenav").style.width = "0";
	}

});


//});