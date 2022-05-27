var request = new XMLHttpRequest()

request.open('GET', 'http://127.0.0.1:3000/view', true)

request.onload = function () {
  // begin accessing JSON data here
  var data = JSON.parse(this.response)

  for (var i = 0; i < data.length; i++) {
    console.log(data[i].name + ' is a ' + data[i].race + '.')
  }
}

request.send()