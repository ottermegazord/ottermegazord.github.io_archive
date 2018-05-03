var urlSelect = document.getElementById('selectResort'),
    myFrame = document.getElementById('myFrame');
myFrame.setAttribute('src', 'http://forecast.io/embed/#lat=42.3583&lon=-71.0603&name=Downtown Boston&font=inherit');
function loadPages() {
    var loc = urlSelect.value;
    // You can also do -> myFrame.src = loc;
    myFrame.setAttribute('src', loc);
}