

// set height of the frame
$(".frame").css("height", (window.innerHeight - 50) + "px");

function setNicescroll() {
//        //background: rgba(255,255,255,0.33333),
    $(".nicescroll").niceScroll(/*
     {
     cursoropacitymin: 0.1,
     cursorcolor: "rgb(255,255,255)",
     cursorborder: '7px solid gray',
     cursorborderradius: 16,
     autohidemode: 'leave'
     }*/);
    $(document).mousemove(function () {
        $(".nicescroll").getNiceScroll().resize();
    });
}



// play sound 
function playSound(name) {
    var player = document.getElementById("soundPlayer");
    
    player.src = public_path + "/audio/" + name + ".mp3";
    player.play();
    //new Audio(public_path + "/audio/" + name + ".mp3").play();
}

function dataTable() {
    $('#table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "order": [[0, "desc"]]
    });
}

function dataTable2() {
    $('.dataTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "order": [[0, "desc"]]
    });
}

function success(message, title, img) {
    if (img == undefined || img.length <= 0)
        img = public_path + "/image/logo.png";

    if (title == undefined || title.length <= 0)
        title = "Oillixe";

    playSound("not2");
    var html =
            "<table class='w3-text-green' style='direction: ltr!important' >" +
            "<tr>" +
            "<td><img src='" + img + "' class=''  width='50px' ></td>" +
            "<td style='padding:4px' class='w3-text-green'  > " +
            "<p style='max-width: 200px;margin-top: 5px!important' ><b>" + message + "</b></p>" +
            "</td>" +
            "</tr>" +
            "</table>";
    $instance = iziToast.show({
        class: 'shadow izitoast',
        timeout: 10000,
        position: 'topRight',
        message: html,
    });

    $(".izitoast").mousedown();
}

function error(message, title, img) {
    if (img == undefined || img.length <= 0)
        img = public_path + "/image/logo.png";
 

    playSound("not2");
    var html =
            "<table class='' style='direction: ltr!important w3-text-red' >" +
            "<tr>" +
            "<td><img src='" + img + "' class='' width='50px' ></td>" +
            "<td style='padding:4px' class='w3-text-red' > " +
            "<p style='max-width: 200px;margin-top: 5px!important' ><b>" + message + "</b></p>" +
            "</td>" +
            "</tr>" +
            "</table>";
    iziToast.show({
        class: 'w3-pale-red shadow izitoast',
        timeout: 10000,
        position: 'topRight',
        message: html,
    });

    $(".izitoast").click();
}


function remove(text, url, div, action) {
    swal({
        title: "😧 هل انت متاكد?" + text,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(function (willDelete) {
        if (willDelete) {
            if (div != undefined) {
                $(div).remove();
            }
            $.get(url, function (data) {
                if (data.status == 1) {
                    success(data.message);
                    // reload data 
                    $('#table').DataTable().ajax.reload();

                    if (action != undefined)
                        action();
                } else {
                    error(data.message);
                }
            });
        } else {
        }
    });
}


function showPage(url) {
    var r = '<br><br><br><br><div class="text-center w3-xlarge w3-text-indigo shadow w3-white w3-round w3-padding w3-center" style="max-width: 200px!important;margin: auto" ><i class="fa fa-spin fa-spinner w3-margin" ></i> <br> loading !!</div>';
    $(".frame").html(r);
    $.get(url, function (response) {
        $(".frame").html(response);
    });
}

function edit(route, modal, place) {
    var r = '<br><br><br><br><div class="text-center w3-xlarge w3-text-indigo shadow w3-white w3-round w3-padding w3-center" style="max-width: 200px!important;margin: auto"  ><i class="fa fa-spin fa-spinner w3-margin" ></i> <br> loading !!</div>';
        if (modal) { 
            $("." + place).html(r);
            //
            $('#' + modal).modal('show');
        } else {
            $(".editModalPlace").html(r);
            //
            $('#editModal').modal('show');
        }
        
    $.get(route, function (r) {
        if (modal) { 
            $("." + place).html(r);
            //
            $('#' + modal).modal('show');
        } else {
            $(".editModalPlace").html(r);
            //
            $('#editModal').modal('show');
        }
        
        //
        formAjax(true);
    });
}

function viewImage(image) {

    var modal = document.createElement("div");
    modal.className = "w3-modal w3-block nicescroll";
    modal.style.zIndex = "10000000";

    modal.innerHTML = "<center><div class='w3-animate-zoom' > " +
            "<img src='" + image.src + "' />"
            + "</div></center>  ";

    modal.onclick = function () {
        modal.remove();
    };

    document.body.appendChild(modal);
}

function viewFile(div) {
    console.log(div);
    
    $(div).attr('data-open', 'on');
    
    return window.open("https://docs.google.com/viewerng/viewer?url="+div.getAttribute("data-src"), '_blank');
    
    var modal = document.createElement("div");
    modal.className = "w3-modal w3-block nicescroll";
    modal.style.zIndex = "10000000";
    modal.style.paddingTop = "20px";

    modal.innerHTML = "<center><div class='w3-animate-zoom' > " +
            '<iframe frameborder="0" scrolling="no" width="400" height="600" src="https://docs.google.com/viewerng/viewer?url=' + div.getAttribute("data-src") + '" ></iframe>'
            + "</div></center>  ";

    modal.onclick = function () {
        window.open('https://usefulangle.com', '_blank');
        //modal.remove();
    };

    document.body.appendChild(modal);
}

function loadImage(input, event) {
    var file = event.target.files[0];

    if (file.size > (MAX_UPLOADED_IMAGE * 1000 * 1000)) {
        error(ERROR_UPLOAD_IMAGE_MESSAGE);
        return;
    }
    $(input).parent().find(".imageView")[0].src = URL.createObjectURL(file);
}

function loadFile(input, event) {
    var span = $(input).parent().find(".fileView")[0];
    var file = event.target.files[0];

    if (file.size > (MAX_UPLOADED_FILE * 1000 * 1000)) {
        error(ERROR_UPLOAD_FILE_MESSAGE);
        return;
    }


    span.innerHTML = file.name;
    $(span).attr('data-src', URL.createObjectURL(file));
}

function loadImgWithoutCache() {
    $('img').each(function () {
        if (this.src.length > 0)
            $(this).attr('src', $(this).attr('src') + '?' + (new Date()).getTime());
    });
}

$(document).ready(function () {
    try {
        loadImgWithoutCache();
        setNicescroll();
    } catch (e) {
    }
});

var app = new Vue({
    el: '#topbarDiv',
    data: {
        notifications: [
        ]
    },
    methods: {
        addItem: function () {
            this.items.push(this.item);
        },
    },
    computed: {
    },
    watch: {
    }
});

