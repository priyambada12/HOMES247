var app = angular.module('cityApp',[]);
app.factory('cityFactory',function(networking){
	var factory = {};

    factory.addCallbackDetails = function(requestData, callback) {
        return networking.callServerForUrlEncondedPOSTRequest('/callback', requestData, callback);
    };
	
	factory.getBedroomDetails = function(callback){
		return networking.callServerForUrlEncondedGETRequest('/get_bedrooms',callback);
	};
	
	factory.getBudget  = function(callback){
		return networking.callServerForUrlEncondedGETRequest('/get_budget',callback);
	};
	
	factory.getPossission = function(callback){
		return networking.callServerForUrlEncondedGETRequest('/get_possission',callback);
	};
	
    return factory;
});
app.controller('cityCtrl',function($scope,cityFactory,$stateParams,$state){
	
	//console.log($state.params);
	console.log($stateParams.param);
	$scope.properties = JSON.parse($stateParams.param);
	
	
	
	$scope.user = {
        name: '',
        mobileno: ''
    }
	
	cityFactory.getBedroomDetails(function(success){
		$scope.bedrooms = success.data.bedroom;
		
	});
	
	cityFactory.getBudget(function(success){
		$scope.budgets = success.data.budget;
		
	});
	
	cityFactory.getPossission(function(success){
		$scope.possissions = success.data.possission;
	});
	
    $scope.callBack = function(user) {
        console.log($scope.user);
        if (user.name == "") {
            alert("please provide your name");
        } else if (user.mobileno == "") {
            alert("please provide your Mobile Number");
        } else if (user.name != "" && user.mobileno != "") {
            var requestParam = {
                name: user.name,
                number: user.mobileno
            };
            cityFactory.addCallbackDetails(requestParam, function(success) {
                var status = success.status;
                if (status == 200) {
                    alert("You will intimate you soon");
                }

            }, function(error) {
                console.log(error);
            });
        }

    };
	
	$scope.getPropertyID = function(propertyID){
		$state.go('property',{param:propertyID});
	};
	
	$(".open-popup").fullScreenPopup({
					bgColor: '#fff'
				});
				
				var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);
  
   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	
});