app.controller('controller', function($scope, $q, twitterWrapper) {

    $scope.foundTweets = [];
    $scope.results_found = 0;
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
            $scope.foundTweets = data;
            
            // Get the count;
            $scope.results_found = data.search_metadata.count;
            twitterWrapper.counter($scope, data.search_metadata.next_results).then(function() {
                $('.search-button-container').show();
        $('.spinner').hide();
//                $scope.results_found+= data;
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