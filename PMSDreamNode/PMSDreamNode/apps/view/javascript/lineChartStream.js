var socket;
function onload() {
    var smoothie = new SmoothieChart({millisPerPixel:16,timestampFormatter:SmoothieChart.timeFormatter});
    smoothie.streamTo(document.getElementById("pmsprofile"), 500);

    var line1 = new TimeSeries();

    socket = io.connect();
    socket.on('timer', function (data) {
        line1.append(new Date().getTime(), data);
    });

    // Add to SmoothieChart
    smoothie.addTimeSeries(line1, {lineWidth:2,strokeStyle:'#80ff80',fillStyle:'rgba(0,128,192,0.36)'});
};