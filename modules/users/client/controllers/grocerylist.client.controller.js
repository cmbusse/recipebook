'use strict';

angular.module('users').controller('GroceryListController', ['$scope', 'Authentication', 'Admin', 'Users', 
  function ($scope, Authentication, Admin, Users) {
    // function to build page in proper order
    $scope.buildPage = function() {
      $scope.authentication = Authentication;
      $scope.user = Authentication.user;
      if($scope.authentication.user){
        Admin.query(function (data) {
          $scope.users = data;
          $scope.findCurrentUserGroceryList();
          $scope.pageBuilt = true;
      });
      }
    };
    
    // finds current user's ID through searching all users for matching email
    $scope.findCurrentUserGroceryList = function(){
      $scope.groceryList = [];
      for(var i = 0; i < $scope.users.length; i++){
        if($scope.authentication.user.email === $scope.users[i].email){
          $scope.currentUser = $scope.users[i];
          for(var j = 0; j < $scope.currentUser.groceryList.length; j++){
            // Each entry in the grocery list has a confirm property to it
            // The confirm property allows for tracking which entry is to be deleted
            // And for displaying an "Are you sure?" button for the proper index
            var groceryListObject = {
              content: $scope.currentUser.groceryList[j],
              confirm: false
            };
            $scope.groceryList.push(groceryListObject);
          }
        }
      }
    };

    // Confirms user's choice to delete item from grocery list
    $scope.areYouSure = function(index) {
      for(var i = 0; i < $scope.groceryList.length; i++){
        $scope.groceryList[i].confirm = false;
      }
      $scope.groceryList[index].confirm = true;
    };

    //
    $scope.removeItem = function(index) {
      // If only one item in list and its being removed, insert a blank item in its place
      if($scope.groceryList.length === 1){
        var blankItem = {
          content: '',
          confirm: false
        };
        $scope.groceryList[0] = blankItem;
      } else{
        var newGroceryListArray = [];
        for(var i = 0; i < index; i++){
          var newItem = $scope.groceryList[i];
          newGroceryListArray.push(newItem);
        }
        for(i = index + 1; i < $scope.groceryList.length; i++){
          var newItem2 = $scope.groceryList[i];
          newGroceryListArray.push(newItem2);
        }
        var user = new Users($scope.user);
        user.groceryList = newGroceryListArray;
        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
        console.log('blip');
        $scope.groceryList = newGroceryListArray;
      }
    };

    // Cancels the delete process for an item
    $scope.cancelRemove = function(index) {
      $scope.groceryList[index].confirm = false;
    };
  }
]);

/*
var user = new Users($scope.user);
    // If user has no grocery list, make them an empty one
    if(!user.groceryList){
      user.groceryList = [];
    }

    // Cycles through selected ingredients and adds the content to the user's grocery list
    for(var i = 0; i < $scope.selected.items.length; i++){
      user.groceryList.push($scope.selected.items[i].content);
    }
    // Updates user, closes the modal, and redirects them to their grocery list
    user.$update(function (response) {
      $scope.success = true;
      Authentication.user = response;
      $modalInstance.dismiss('cancel');
      $location.url('/grocerylist');
    }, function (response) {
      $scope.error = response.data.message;
    });
    console.log('blip');
    */