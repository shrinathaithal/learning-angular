app.controller('controller', function($scope, $q, twitterWrapper) {

    $scope.foundTweets;

    twitterWrapper.init();

    /**
     * Search tweets
     * @returns {undefined}
     */
    $scope.search = function() {
        twitterWrapper.search($scope.q).then(function(data) {
            $scope.foundTweets = data;
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
        $scope.foundTweets.length = 0;
        $('#searchButton, #signOut').fadeOut(function() {
            $('#login').fadeIn();
        });
    }

    // Start when logged in.
    if (twitterWrapper.ready()) {
        $('#login').hide();
        $('#search, #searchButton, #signOut').show();
    }

});