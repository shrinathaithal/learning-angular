app.controller('controller', ["$scope", "$q", "twitterWrapper", "$filter", function($scope, $q, twitterWrapper, $filter) {

        $scope.statuses = [];
        $scope.resultsFound = 0;
        $scope.graphData = [];
        twitterWrapper.init();

        /**
         * Search tweets
         * @returns {undefined}
         */
        $scope.search = function() {
            $('.spinner').show();
            $('.result_counter').show();
            $('#graph').show();
            twitterWrapper.search($scope.query).then(function(data) {
                $scope.statuses = data.statuses;

                // Get the count;
                $scope.resultsFound = 0;
                twitterWrapper.counter($scope, data.search_metadata.next_results).then(function(data) {
                    $('.spinner').hide();

                    // Count occurrances per hour
                    var graphData = {};
                    $scope.statuses.map(function(status) {
                        d = new Date(status.created_at);
                        d = $filter('date')(d, 'H');
                        graphData[d] = graphData[d] || 0;
                        graphData[d]++;
                    });
                    
                    for (var obj in graphData) {
                        $scope.graphData.push({"name":obj, "count":graphData[obj]});
                    }
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

    }]);