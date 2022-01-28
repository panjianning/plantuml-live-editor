$(function () {
    plantuml_runonce();
});

function encode64(data) {
    let r = "";
    for (let i = 0; i < data.length; i += 3) {
        if (i + 2 === data.length) {
            r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), 0);
        } else if (i + 1 === data.length) {
            r += append3bytes(data.charCodeAt(i), 0, 0);
        } else {
            r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), data.charCodeAt(i + 2));
        }
    }
    return r;
}

function append3bytes(b1, b2, b3) {
    let c1 = b1 >> 2;
    let c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
    let c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
    let c4 = b3 & 0x3F;
    let r = "";
    r += encode6bit(c1 & 0x3F);
    r += encode6bit(c2 & 0x3F);
    r += encode6bit(c3 & 0x3F);
    r += encode6bit(c4 & 0x3F);
    return r;
}

function encode6bit(b) {
    if (b < 10) {
        return String.fromCharCode(48 + b);
    }
    b -= 10;
    if (b < 26) {
        return String.fromCharCode(65 + b);
    }
    b -= 26;
    if (b < 26) {
        return String.fromCharCode(97 + b);
    }
    b -= 26;
    if (b === 0) {
        return '-';
    }
    if (b === 1) {
        return '_';
    }
    return '?';
}

var deflater = window.SharedWorker && new SharedWorker('js/jquery_plantuml/rawdeflate.js');
if (deflater) {
    deflater.port.addEventListener('message', done_deflating, false);
    deflater.port.start();
    console.log(deflater);
} else if (window.Worker) {
    deflater = new Worker('js/jquery_plantuml/rawdeflate.js');
    deflater.onmessage = done_deflating;
}

function done_deflating(e) {
    var done = 0;
    $("img").each(function () {
        if (done === 1) return;
        var u1 = $(this).attr("src");
        if (u1 != null) return;
        var u2 = $(this).attr("uml");
        if (u2 === "") return;
        console.log(this);
        console.log(e);
        $(this).attr("src", "http://www.plantuml.com/plantuml/svg/" + encode64(e.data));
        $(this).attr("uml", "");
        done = 1;
    });
    plantuml_runonce();
}

function plantuml_runonce() {
    var done = 0;
    $("img").each(function () {
        if (done === 1) return;
        var u1 = $(this).attr("src");
        if (u1 != null) return;
        var u2 = $(this).attr("uml");
        console.log(u2);
        if (u2 === "") return;
        var s = unescape(encodeURIComponent(u2));
        if (deflater) {
            if (deflater.port && deflater.port.postMessage) {
                deflater.port.postMessage(s);
            } else {
                deflater.postMessage(s);
            }
        } else {
            setTimeout(function () {
                done_deflating({data: deflate(s)});
            }, 100);
        }
        done = 1;
    });
}
