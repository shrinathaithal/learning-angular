app.controller('controller', function($scope, $q, twitterWrapper) {

    $scope.statuses = [];
    $scope.resultsFound = 0;
    twitterWrapper.init();

    /**
     * Search tweets
     * @returns {undefined}
     */
    $scope.search = function() {
        $('.search-button-container').hide();
        $('.spinner').show();
        $('.result_counter').show();
        twitterWrapper.search($scope.query).then(function(data) {
            $scope.statuses = data.statuses;

            // Get the count;
            $scope.resultsFound = data.search_metadata.count;
            twitterWrapper.counter($scope, data.search_metadata.next_results).then(function(data) {
                $('.search-button-container').show();
                $('.spinner').hide();
            }, function(err) {
            }, function(update) {
                $scope.statuses = $scope.statuses.concat(update);
            });
        });
    }

    /**
     * Login to twitter
     * @returns {undefined}
     */
    $scope.auth = function() {
        twitterWrapper.auth().then(function() {
            if (twitterWrapper.ready()) {
                //if the authorization is successful, 
                //hide the login button & show search bar
                $('#login').fadeOut(function() {
                    $('#search, #searchButton, #signOut').fadeIn();
                });
            }
        });
    }

    /**
     * Sign out of twitter
     * @returns {undefined}
     */
    $scope.signOut = function() {
        twitterWrapper.clearCache();
        $scope.foundTweets = null;
        $('#search, #results, #searchButton, #signOut').fadeOut(function() {
            $('#login').fadeIn();
        });
    }

    // Start when logged in.
    if (twitterWrapper.ready()) {
        $('#login').hide();
        $('#search, #searchButton, #signOut, #results').show();
    }

});