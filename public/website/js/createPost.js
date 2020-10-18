/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




function loadImage(img, src) {
    img.src = src;
}

function uploadImage(img, event, src, file, is360) {
    if (event != null) {
        var file = event.target.files[0];
        src = URL.createObjectURL(file);
    }

    app.post.images.push({
        src: src,
        file: file,
        is_360: is360? true : false
    });
    img.src = src;

    return success(imageAdded);
}

function uploadMasterImage(img, event, src, file) {
    if (!apiToken) {
        return error(login_first);
    }
    //
    if (event != null) {
        var file = event.target.files[0];
        src = URL.createObjectURL(file);
    }

    app.post.images[0] = {
        src: src,
        file: file,
        is_360: false
    };

    app.post.images.push({ src: ''});
    app.post.images.pop();

    $('#masterDrop').css("background-image", "url('" + src + "')");
    console.log($('#masterDrop')[0].style);


    if (img)
        img.src = src;
    $("#masterImage").attr('src', src);

}

function gotoStep(s) {
    if (s == 2) {
        if (app.post.images[0] == undefined)
            return error(masterImageError);
    }

    if (s == 3) {
        if (!apiToken) {
            return error(login_first);
        }
    }


    step = s;

    $(".step").hide();
    $(".step-" + s).show();

    if (s == 1 || s == 2) {
        s = 1;
    }

    if (s == 3 || s == 4) {
        //$()fill_required_data_msg
        s = 2;
    }

    if (s == 5) {
        s = 3;
    }

    // fill the circle
    $(".step-post-button").css("background-color", "white");
    $(".step-btn-" + s).css("background-color", "#06d9b2");
}


function gotoStep2(s) {

    if (s == 2) {
        if (
            !app.post.title ||
            !app.post.title_ar ||
            !app.post.type ||
            !app.post.category_id ||
            !app.post.space ||
            !app.post.price
        ) {
            return error(fill_required_data_msg);
        }

        if (app.post.category_id != 4) {
            if (
                !app.post.bedroom_number ||
                !app.post.bathroom_number
            ) {
                return error(fill_required_data_msg);
            }
        }
        if (app.post.type != 'rent') {
            if (
                !app.post.price_per_meter
            ) {
                return error(fill_required_data_msg);
            }
        }
    }

    $(".post-data-step").hide();
    $(".post-data-step-" + s).show();

    // fill the circle
    $(".post-data-step-circle").removeClass("active");
    $(".post-data-step-circle-" + s).addClass("active");
}

function changeArea(city) {
    $('.area-select option').hide();
    $('.area-select option[city='+city+']').show();
}

var images = [];

function isValid() {
    var valid = true;
    if (app.post.images.length <= 1) {
       error(image_error);
       valid = false;
    }
    if (!app.post.images[0]) {
       error(masterImageError);
       valid = false;
    }
    if (!app.post.lng || !app.post.lat) {
       error(choose_location);
       valid = false;
    }
    if (
            !app.post.owner_type ||
            !app.post.city_id ||
            !app.post.area_id ||
            !app.post.payment_method ||
            !app.post.finishing_type) {
       error(fill_all_data);
       valid = false;
    }


    return valid;
}

function getPostParams() {
    var fitlerImages = app.post.images.filter(function(value, index, arr){
        return value;
    });
    var post = app.post;
    post.images = null;
    var string = $.param(post);
    app.post.images = fitlerImages;

    return string;
}

function savePost() {
    if (!apiToken)
        return error(login_first);

    if (!isValid())
        return isValid();



    images = app.post.images.filter(function(value, index, arr){
        return value;
    });

    // show loading
    $(".post-loader").show();

    var data = "";

    data += "api_token=" + apiToken + "&" + getPostParams();

    // reverse array
    images.reverse();

    app.uploadedImageCount = 0;

    // save post info
    $.post(public_path + "/api/post/add", data, function(response){
        if (response.status == 1) {
            if (LANG == "en")
                success(response.message_en);
            if (LANG == "ar")
                success(response.message_ar);

            //
            for(var i = 0; i < app.post.images.length; i ++) {
                images[i].post_id =  response.data.id;
                app.post.images[i].post_id =  response.data.id;
            }

            savePostImages(images);

        } else {
            if (LANG == "en")
                error(response.message_en);
            if (LANG == "ar")
                error(response.message_ar);
        }

    });
}

function savePostImages(imgs) {
    if (imgs.length <= 0)
        return finish();

    var image = imgs.pop();
    var formData = new FormData();
    if (image.id)
        formData.append("id", image.id);
    if (image.file)
        formData.append("photo", image.file);
    formData.append("is_360", image.is_360);
    formData.append("api_token", apiToken);
    formData.append("post_id", image.post_id);

    $.ajax({
        url: public_path + "/api/post/add-image",
        type: 'POST',
        data: formData,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
//            if (response.status == 1) {
//                if (LANG == "en")
//                    success(response.message_en)
//                if (LANG == "ar")
//                    success(response.message_ar)
//            } else {
//                if (LANG == "en")
//                    error(response.message_en)
//                if (LANG == "ar")
//                    error(response.message_ar)
//            }
            app.uploadedImageCount += 1;
            savePostImages(imgs)
        }
    });
}

function finish() {
    $(".post-loader").hide();
   // window.location = public_path + "/profile?state=pending";

    showPage('admin/post');
}



//***********************************************************
// drag and drop
//***********************************************************
var sort = null;

function resortImages() {
    var images = app.post.images.filter(function(value, index, arr){ return value });
    var sortedImages = [];

    var index = 0;
    $("#sortable li").each(function(){
        var liIndex = $(this).attr("data-index");
        sortedImages[index] = images[liIndex];
        index ++;
    });

    app.post.images = sortedImages;
}

  $( function() {
    sort = $( "#sortable" ).sortable({
        cursor: "move",
        items: ".ui-state-default",
        update: function( event, ui ) {
            resortImages();
        }
    });
    $( "#sortable" ).disableSelection();
  } );



  console.log(sort);
