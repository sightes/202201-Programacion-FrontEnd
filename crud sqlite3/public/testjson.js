

var getJSON = function(url, callback) {

    var xmlhttprequest = new XMLHttpRequest();
    xmlhttprequest.open('GET', url, true);
    xmlhttprequest.responseType = 'json';

    xmlhttprequest.onload = function() {

        var status = xmlhttprequest.status;

        if (status == 200) {
            callback(null, xmlhttprequest.response);
        } else {
            callback(status, xmlhttprequest.response);
        }
    };

    xmlhttprequest.send();
};

getJSON('http://127.0.0.1:3000/view',  function(err, data) {

    if (err != null) {
        console.error(err);
    } else {

       var display = `User_ID: ${data.nombre}
ID: ${data.email}
Title: ${data.mensaje} `;
    }
  console.log(display);
});