
var interval, video = document.getElementsByTagName("video")[0],  
stage = document.getElementById("stage"),  //stage ở đây là phần div dùng để chứa kí tự chạy
canvas = document.createElement("canvas"),  
captureImage = function () {  
    var ctx;  
    canvas.width = video.videoWidth;  
    canvas.height = video.videoHeight;  
    if (canvas.width) {  
        ctx = canvas.getContext('2d');  
        ctx.clearRect(0, 0, canvas.width, canvas.height);  
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);  
        stage.innerText = toChars(ctx, canvas.width, canvas.height, 90);  
    }  
},  
beginCapture = function () {  
    interval = setInterval(function () {  
        captureImage(1)  
    }, 100);  
},  
endCapture = function () {  
    if (interval) {  
        clearInterval(interval);  
    }  
},  
//hàm chạy khi bắt đầu xem
play = function () {  
    var file = document.getElementById('file').files[0];  
    var url = URL.createObjectURL(file);  
    var button=document.getElementById('video1')
    button.setAttribute('style','display:block')
    var thongbao=document.getElementById('p1')
    thongbao.innerHTML="Chuyển thành công ^^"
    var stage=document.getElementById('stage')
    stage.setAttribute('style','display:block')
    if (!file) {  
        alert("Hãy chọn tệp tin");  
    }  
    console.log(url);  
    video.src = url;  
    video.play();  
};  
//phần lắng nghe hành động của người dùng khi tác động vào video
video.addEventListener("play", beginCapture);  
video.addEventListener("pause", endCapture);  
video.addEventListener("ended", endCapture);  
video.addEventListener("playing", function () {  
endCapture();  
beginCapture();  
});


/**
* Created by Văn
*/  
var map=getCharsMap();    
function toChars(context, width, height, rowChars) {  
    var pixels = [],  
        output = "",  
        imageData = context.getImageData(0, 0, width, height),  
        rowChars = width < rowChars ? width : rowChars,  
        char_h = width / rowChars,  
        char_w = char_h,  
        rows = height / char_h,  
        cols = rowChars,  
        //đếm điểm ảnh và xác định tỉ lệ phần trăm màu RGB(red, green , blu)
        getBlockGray = function (x, y, w, h) {  
            var sumGray = 0, pixels;  
            for (var row = 0; row < w; row++) {  
                for (var col = 0; col < h; col++) {  
                    var cx = x + col,  
                        cy = y + row,  
                        index = (cy * imageData.width + cx ) * 4,  
                        data = imageData.data,  
                        R = data[index],  
                        G = data[index + 1],  
                        B = data[index + 2],  
                        gray = ~~(R * 0.4 + G* 0.49 + B* 0.11);  
                    sumGray += gray;  
                }  
            }  
            pixels = (w * h) *2 ; //xác định tỉ lệ khung hình (ở đây mình nhân đôi khung hình nên truyền vào 6 kí tự) 
            return ~~(sumGray / pixels);  
        };  
    for (var r = 0; r < rows; r++) {  
        for (var c = 0; c < cols; c++) {  
            var pos_x = ~~(c * char_h),  
                pos_y = ~~(r * char_h),  
                avg = getBlockGray(pos_x, pos_y, ~~char_w, ~~char_h),  
                ch = map[avg];  
            output += ch;  
        }  
        output += '\r\n';  
    }  
    ;  
    return output;  
}  
// xác định kí tự chạy vào map
function getCharsMap() {  
    var chars = ['@', '#','$','!', '~', '`',  ];
    // var chars = ['@','$','#','w','i','#', 'i', '-','-','`' ,'`' ]  (đây là đoạn kí tự mình setup nếu dùng pixel=w*h)
    var step = 25,  
        map = {};  
    for (var i = 0; i < 256; i++) {  
        var index = ~~(i / 25)  
        map[i] = chars[index];  
    }  
    ;  
    return map;  
}
