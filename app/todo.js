app.controller("todo-list", function($scope, $http){
	$scope.folders = [];
	jsonimport = function(){
		$http({
			method: 'GET',
		  	url: 'assets/list.json'
		}).then(function successCallback(response) {
			$scope.folders = response.data;
		}, function errorCallback(response) {
		    console.log("Could not load json file");
		});
	}

	jsonimport();

	// variable de filtro y funcion para controlar el filtro estricto de angular
	$scope.ffilter = "";
	$scope.folderFilter = function(f) { if (f=="") return false; return true; }

	folderList = function(f) { return $scope.folders.map(function(x) { return x.name }); }
	folderIndex = function(f) { return folderList().indexOf(f); }

	folderCount = function(f) {
		// contar las carpetas
		// retornar la cantidad o un string vacío (para uso en el nombre de las carpetas)
		var count = 0, nameToCheck = f;

		while (folderList().includes(nameToCheck)) {
			count++;
			nameToCheck = f + count.toString();
		}

		if (count==0) return ""; return count;
	}

	itemIndex = function(i, f) {
		// dar el index del item. la carpeta especificada tiene que existir
		if (folderIndex[f]!=-1) {
			return $scope.folders[folderIndex(f)].items.map(function(x) { return x.text }).indexOf(i);
		}
		return -1;
	}

	$scope.createFolder = function(f) {
		if (f!=null) {
			$scope
			.folders
			.push({ 
				items: [], 
				name: f + folderCount(f).toString() 
			});
		}
	}

	$scope.addElement = function(i, f) {
		// crear item en carpeta especificada (se crea si no existe)
		var fx = folderIndex(f);
		if (fx==-1) $scope.createFolder(f);

		$scope
		.folders[fx]
		.items
		.push({
			text: i, 
			checked: false
		});
	}

	$scope.removeElement = function(i, f) {
		// eliminar item si el item y su carpeta contenedora existen
		var fx = folderIndex(f);
		var ix = itemIndex(i, f);

		if (fx!=-1 && ix!=-1) { 
			$scope
			.folders[fx]
			.items
			.splice(ix, 1);
		}
	}

	$scope.removeFolder = function(f) {
		var fx = folderIndex(f);
		if (fx!=-1) $scope.folders.splice(fx, 1);

		if ($scope.ffilter==f) $scope.ffilter="";
	}

	$scope.editElement = function(i, f) {
		if (folderIndex(f) !=-1 && itemIndex(i, f)!=-1) {
			var fx = folderIndex(f);
			var ix = itemIndex(i, f);
			
			var newName = prompt("Edit item", $scope.folders[fx].items[ix].text);
			if (newName!=null) $scope.folders[fx].items[ix].text = newName;
		}
	}

	$scope.editFolder = function(f) {
		var fx = folderIndex(f);
		if (fx!=-1) { 
			var newName = prompt("Edit folder", $scope.folders[fx].name);
			if (newName!=null) $scope.folders[fx].name = newName + (folderCount(newName).toString());
		}
	}
});