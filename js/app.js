var app = angular.module('twitter', ['twitter.wrapper']);

app.filter("asDate", function () {
    return function (input) {
        console.log(input);
        return new Date(input);
    }
});