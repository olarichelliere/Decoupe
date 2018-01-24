
//var baseURL = 'http://www.dblaval.com/decoupe/api';
//var baseURL = 'http://localhost/api';
var baseURL = window.location.protocol + '//' + window.location.hostname + '/api';

var userToken;
var isAdmin;
var username;

function httpRequest(method, url, payload, callback) {
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
        // Process the server response here.
        if (httpRequest.readyState !== XMLHttpRequest.DONE) {
            // Not ready yet
            return
        }

        if (httpRequest.status !== 200) {
            alert('Something went wrong: ' + httpRequest.responseText);
            return
        }

        callback(JSON.parse(httpRequest.responseText));
    };

    httpRequest.open(method, baseURL + url);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.setRequestHeader('Authorization', 'Bearer ' + userToken);

    if (payload) {
        payload = JSON.stringify(payload)
    }

    httpRequest.send(payload);
}



function hideAllSections() {
    document.getElementById("list_container").style.display = "none";
    document.getElementById("divisions_container").style.display = "none";
    document.getElementById("decoupe_container_original").style.display = "none";
    document.getElementById("new_divisionData_container").style.display = "none";
    document.getElementById("new_period_container").style.display = "none";   
    document.getElementById("login_container").style.display = "none";   
    document.getElementById("decoupe_container").style.display = "none";  
}

function loaded() {
    
    /// Button Listeners
    document.getElementById("division_btn").addEventListener('click', showNewDataDivision, false);
    document.getElementById("decoupe_btn").addEventListener('click', showDecoupe, false);
    document.getElementById("login_btn").addEventListener('click', showLogin, false);
}

hideAllSections();
loaded();
showLogin();
