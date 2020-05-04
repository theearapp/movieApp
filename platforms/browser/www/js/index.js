

async function test() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://ipinfo.io/json", true);
    xhr.send();
     
    xhr.onreadystatechange = processRequest;
    function processRequest(e) {
        console.log(xhr);
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            alert(response.ip);
        }
    }
}