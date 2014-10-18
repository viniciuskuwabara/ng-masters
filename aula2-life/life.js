
if(!window.Global){
    window.Global = {};
}

Global.myApp = angular.module("myApp", []);

function MyCtrl($scope) {
	$scope.grid = [];
	$scope.gridX = 10;
	$scope.gridY = 10;
	$scope.autorunFlag = false;
	$scope.autoButton = "AUTO";
	var tmpGrid = [];
	
	$scope.newGrid = function(x,y) {
		$scope.gridX = x;
		$scope.gridY = y;
		$scope.grid.length = 0
		for (var i=0;i<x;i++) {
			$scope.grid.push([]);
			tmpGrid.push([]);
			for(var j=0;j<y;j++) {
				$scope.grid[i][j]=false;
				tmpGrid[i][j]=false;
			}
		}
	}
	$scope.changeState = function(row,column) {
		$scope.grid[row][column] = !$scope.grid[row][column];
		tmpGrid[row][column] = !tmpGrid[row][column];

	}
	$scope.getState = function(row,column) {
		return $scope.grid[row][column];
	}

	$scope.run = function() {
		nextStep();

	}

	$scope.reset = function() {
		for (var i=0;i<$scope.gridX;i++) {
			for(var j=0;j<$scope.gridY;j++) {
				$scope.grid[i][j]= false;
				tmpGrid[i][j]=false;
			}
		}
	}

	$scope.autorun = function() {
		$scope.autorunFlag = !$scope.autorunFlag;
		if ($scope.autorunFlag) {
			$scope.autoButton = "STOP";
			nextAutoStep();
		}
		else {
			$scope.autoButton = "AUTO";
		}
	}

	function nextAutoStep() {
		if ($scope.autorunFlag) {
			nextStep();
			setTimeout(function() {
				nextAutoStep();
				$scope.$apply();
			},500);
		}
	}

	function nextStep() {
		for (var i=0;i<$scope.gridX;i++) {
			for(var j=0;j<$scope.gridY;j++) {
				generateNextState(i,j);
			}
		}
		renderBoard();
	}

	function generateNextState(row,column) {
		var vizinhosAlive = getNumVizinhosAlive(row,column);
		if ($scope.grid[row][column]) {
			if ((vizinhosAlive < 2) || (vizinhosAlive > 3)) {
				tmpGrid[row][column] = !$scope.grid[row][column];
			}

		}
		else {
			if (vizinhosAlive == 3) {
				tmpGrid[row][column] = !$scope.grid[row][column];
			}
		}
	}

	function getNumVizinhosAlive(row,column) {
		var countVizinhosAlive = 0;
		for (var i=row-1;i<=row+1;i++) {
			if ((i < $scope.gridX ) && (i >= 0)) {
				for (var j=column-1;j<=column+1;j++) {
					if ((j <= $scope.gridY) && (j >= 0) && ((i != row) || (j != column))) {
						if ($scope.grid[i][j]) {
							countVizinhosAlive++;
						}
					}
				}
			}
		}	
		return countVizinhosAlive;
	}

	function renderBoard() {
		for (var i=0;i<$scope.gridX;i++) {
			for(var j=0;j<$scope.gridY;j++) {
				$scope.grid[i][j]= tmpGrid[i][j];
			}
		}
	}
}
