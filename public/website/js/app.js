/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
    new Audio(public_path + "/audio/" + name + ".mp3").play();
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
        title = TITLE;

    playSound("not2");
    var html =
            "<table class='w3-text-green' style='direction: ltr!important' >" +
            "<tr>" +
            "<td><img src='" + img + "' class='w3-' width='60px'  ></td>" +
            "<td style='padding:7px' class='w3-text-green'  ><b class='w3-large' >" + title + "</b><br>" +
            "<p style='max-width: 200px;margin-top: 5px!important' >" + message + "</p>" +
            "</td>" +
            "</tr>" +
            "</table>";
    $instance = iziToast.show({
        class: 'shadow izitoast',
        timeout: 2000,
        message: html,
    });

    $(".izitoast").mousedown();
}

function error(message, title, img) {
    if (img == undefined || img.length <= 0)
        img = public_path + "/image/logo.png";

    if (title == undefined || title.length <= 0)
        title = TITLE;

    playSound("not2");
    var html =
            "<table class='' style='direction: ltr!important w3-text-red' >" +
            "<tr>" +
            "<td><img src='" + img + "' class='w3-' width='60px'  ></td>" +
            "<td style='padding:7px' class='w3-text-red' ><b class='w3-large' >" + title + "</b><br>" +
            "<p style='max-width: 200px;margin-top: 5px!important' >" + message + "</p>" +
            "</td>" +
            "</tr>" +
            "</table>";
    iziToast.show({
        class: 'w3-pale-red shadow izitoast',
        timeout: 2000,
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
    var html = "<br><br><br><br><br><br><br><br><div class='text-center' ><i class='w3-text-red fa fa-coffee animated bounceIn infinite w3-jumbo' ></i><br><br>انتظر</div>";
    $(".frame").html(html);
    $.get(url, function (response) {
        $(".frame").html(response);
    });
}

function edit(route, action) {
    $.get(route, function (r) {
        $(".editModalPlace").html(r);
        //
        $('#editModal').modal('show');
        //
        formAjax(true);
        
        if (action != undefined)
            action();
    });
}

function viewImage(image) {

    var modal = document.createElement("div");
    modal.className = "w3-modal w3-block nicescroll";
    modal.style.zIndex = "10000000";

    modal.innerHTML = "<center><div class='w3-animate-zoom' > " +
            "<img src='" + image.src + "' width='80%' />"
            + "</div></center>  ";

    modal.onclick = function () {
        modal.remove();
    };

    document.body.appendChild(modal);
}

function viewFile(div) {

    var modal = document.createElement("div");
    modal.className = "w3-modal w3-block nicescroll";
    modal.style.zIndex = "10000000";
    modal.style.paddingTop = "20px";

    modal.innerHTML = "<center><div class='w3-animate-zoom' > " +
            '<iframe frameborder="0" scrolling="no" width="400" height="600" src="' + div.getAttribute("data-src") + '" ></iframe>'
            + "</div></center>  ";

    modal.onclick = function () {
        modal.remove();
    };

    document.body.appendChild(modal);
}

function loadImage(input, event, image) {
    var file = event.target.files[0];

    if (file.size > (MAX_UPLOADED_IMAGE * 1000 * 1000)) {
        error(ERROR_UPLOAD_IMAGE_MESSAGE);
        return;
    }
    
    if ($(input).parent().find(".imageView")[0] != null)
        $(input).parent().find(".imageView")[0].src = URL.createObjectURL(file);
        
    if (image != null) 
        image.src = URL.createObjectURL(file);
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


function randColor() { 
    var colors = [
        "w3-red",
        "w3-pink",
        "w3-green",
        "w3-blue",
        "w3-purple",
        "w3-deep-purple",
        "w3-indigo",
        "w3-light-blue",
        "w3-cyan",
        "w3-aqua",
        "w3-teal",
        "w3-lime", 
        "w3-orange",
        "w3-blue-gray",
        "w3-brown",
    ];
    
    var index = parseInt(Math.random() * colors.length);
    return colors[index];
}


function get(url, feedback) {
    $.get(url, function(data){
        feedback(data);
    });
}

function post(url, data, feedback) {
    $.post(url, data, function(r){
        feedback(r);
    });
}

function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    if (succeed)
        success(elem.innerText);
    return succeed;
}