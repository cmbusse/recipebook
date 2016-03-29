'use strict';

angular.module('users').controller('GroceryListController', ['$scope', 'Authentication', 'Admin', 'Users', 
  function ($scope, Authentication, Admin, Users) {
    // function to build page in proper order
    $scope.buildPage = function() {
      $scope.authentication = Authentication;
      $scope.user = Authentication.user;
      $scope.form = {};
      $scope.form.ingredientToAdd = '';
      $scope.clearConfirm = false;
      /*
       * Users Errors:
       * 0 - Ingredient to add is blank
       */
      $scope.userErrors = [0];
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
    $scope.deleteAreYouSure = function(index) {
      for(var i = 0; i < $scope.groceryList.length; i++){
        $scope.groceryList[i].confirm = false;
      }
      $scope.groceryList[index].confirm = true;
    };

    //
    $scope.removeItem = function(index) {
      // tempGroceryListArray wil hold the edited grocery list of objects
      var tempGroceryListArray = [];
      // Remove items up to index
      for(var i = 0; i < index; i++){
        var newItem = $scope.groceryList[i];
        tempGroceryListArray.push(newItem);
      }
      // Remove items after index
      for(i = index + 1; i < $scope.groceryList.length; i++){
        var newItem2 = $scope.groceryList[i];
        tempGroceryListArray.push(newItem2);
      }
      // Restoring grocery to be an array of strings
      var newGroceryListArray = [];
      for(i = 0; i < tempGroceryListArray.length; i++){
        newGroceryListArray.push(tempGroceryListArray[i].content);
      }
      // Update the user with newGroceryListArray
      var user = new Users($scope.user);
      user.groceryList = newGroceryListArray;
      user.$update(function (response) {
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
      console.log('blip');
      // Set groceryList to tempGroceryListArray for proper viewing
      $scope.groceryList = tempGroceryListArray;
    };

    // Cancels the delete process for an item
    $scope.cancelRemove = function(index) {
      $scope.groceryList[index].confirm = false;
    };

    // Allows user to add an item to the grocery list from grocery list page
    $scope.addItemToGroceryList = function() {
      if($scope.form.ingredientToAdd.length === 0){
        $scope.userErrors[0] = 1;
      } else {
        $scope.userErrors[0] = 0;
        var tempGroceryListArray = [];
        for(var i = 0; i<$scope.groceryList.length; i++){
          tempGroceryListArray.push($scope.groceryList[i].content);
        }
        tempGroceryListArray.push($scope.form.ingredientToAdd);
        // Update the user with new grocery list
        var user = new Users($scope.user);
        user.groceryList = tempGroceryListArray;
        user.$update(function (response) {
          var groceryListObject = {
              content: user.groceryList[user.groceryList.length-1],
              confirm: false
            };
          $scope.groceryList.push(groceryListObject);
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
        console.log('blip');
        $scope.form.ingredientToAdd = '';
      }
    };

    // Toggles clearConfirm to prevent accidents
    $scope.clearAreYouSure = function() {
      $scope.clearConfirm = true;
    };

    // Cancels the clearing
    $scope.cancelClear = function() {
      $scope.clearConfirm = false;
    };

    // Clears the entire grocery list
    $scope.clearGroceryList = function() {
      var user = new Users($scope.user);
      user.groceryList = [];
      user.$update(function (response) {
        $scope.groceryList = [];
        $scope.clearConfirm = false;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
      console.log('blip');
    };
  }
]);