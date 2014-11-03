(function() {
	var alertModule = angular.module('modAlert',[]);

	alertModule.factory('alertFactory', ['$timeout', function($timeout) {
		var alerta = {
			mensagem:  "",
			showLoading: false,
			timeout: 0
		};

		alerta.resetShowAlert = function() {
			alerta.showLoading = false;
		};
		alerta.showAlert = function(msg,timeout ) {
			alerta.mensagem = msg;	
			alerta.showLoading = true;
			this.timeout = timeout.timeout;

			runTimeout(this, this.resetShowAlert);
		};			

		function runTimeout(alerta, resetCallBack) {
			$timeout(function() {
				resetCallBack();	
			},alerta.timeout);
		}

		return alerta;
	}]);

	alertModule.directive('loading', ['alertFactory', function(alertFactory) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'loading.html',
			scope: {},
			controller: ['$scope', 'alertFactory' , function ($scope,alertFactory) {
				$scope.model = alertFactory; 
				$scope.test = "banana";
			}]
		}	
	}]);
})();
