/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * vue js object
 * @type object
 */
var app = {};
var filterSidebarFlag = true;
var recommendedFlag = false;
var ranger1 = null;
var ranger2 = null;
var map = null;
var markers = [];
var postSidebarFlag = -1;
var recommendOwl = null;
var right = "-" + $(".filter-sidebar-content").css("width");


var PostCeriteria = (function () {


    function PostCeriteria() {
        this.baseurl = public_path + "/api/post/search?";
    }

    /**
     * 
     * @param {type} url
     * @param {type} action
     * @returns {}
     */
    PostCeriteria.prototype.load = function (url, action) {
        $.get(url, function (response) {
            action(response);
            //
            $(".posts-content").show();
        });
    };

    /**
     * get all post with visitor location
     * @param {type} lat
     * @param {type} lng
     * @returns {Array} return list of posts
     */
    PostCeriteria.prototype.filterDistance = function (lat, lng) {
        var url = this.baseurl + "lat=" + lat + "&lng=" + lng;
        console.log(url);

        this.load(url, function (response) {
            app.posts = response.data;
        });
    };




    return PostCeriteria;
}());

/**
 * set nicescroll plugins
 * @returns {}
 */
function setNicescroll() {
    $(".nicescroll").niceScroll();
    $(document).mousemove(function () {
        $(".nicescroll").getNiceScroll().resize();
    });
}


/**
 * slide toggle side bar of post page
 * @returns {}
 */
function toggleMapSidebar() {
    $(".posts-content").toggle();
}

/**
 * 
 * @param {type} param
 */
function loadAllPosts(filters) {
    var url = public_path + "/api/post/search";
    $.get(url, function (response) {
        app.posts = response.data;
    });
}

/**
 * get location and call feedback
 * 
 */
function getLocation() {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            // set current location
            map.setCenter({lat: lat, lng: lng});
        });
}

/**
 * draw marker on the map
 * 
 * @param {type} location
 * @param {type} map
 * @returns {undefined}
 */

var infoWindows = [];

function closeAllInfoWindow() {
    for(var i = 0; i < infoWindows.length; i ++) {
        infoWindows[i].close();
    }
}

function addMarker(location, label, icon, html) {
    label = label + "";
    color = "white";
    var style = document.createElement('style');
    style.markers = [];
    document.getElementsByTagName('head')[0].appendChild(style);
    
    if (icon == undefined)
        icon = public_path + "/website/icons/marker.png";
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP, 
        icon: {
          url: icon,
          labelOrigin: { x: 12, y: 40}
        }, 
        title: label, 
        label: { backgroundColor: '#fff', color: '#02aaa8', fontWeight: 'bold', fontSize: '12px', text: label }, 
        labelInBackground: true
    });
    var selector = ['#', map.getDiv().id, ' img[src="', marker.getIcon(), '"]'].join('');
    if (style.markers.indexOf(selector) < 0) {
        style.markers.push(selector);
        style.sheet.insertRule([selector, '{background-color:', color, ';}'].join(''), 0);
    }
    
    console.log(label);


    var infowindow = new google.maps.InfoWindow({
        content: html
    });

    infoWindows.push(infowindow);

    marker.addListener('click', function () {
        closeAllInfoWindow();
        infowindow.open(map, marker);
    }); 
    //infowindow.open(map, marker);
    var cnv=document.createElement("canvas");  
    var cntx = cnv.getContext("2d");
    cnv.style.backgroundColor = "rgb(0,0,0)";
    console.log(cnv);
    cnv.width= 150;
    cnv.height = 30; 
 
    cntx.strokeStyle = "#06D9B2";
	cntx.lineWidth = 0.3;
    cntx.shadowBlur = 4;
    cntx.shadowColor = "black";
    cntx.fillStyle = "#fff";
	cntx.strokeRect(5, 5, 110, 20);
	cntx.fillRect(5, 5, 110, 20); 
    marker.setIcon(cnv.toDataURL('image/png')); 
            
    return marker;
}

/**
 * clear all markers on the map
 * 
 * @returns {undefined}
 */
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

/**
 * set all posts marker on the map
 * 
 * @param {Array} posts
 */
function drawPostsMarkers(posts) {
    clearMarkers();
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        var div = document.createElement("div");
        var html = $(".infobox").html();
        if (post.images[0] != undefined)
            html = html.replace("{src}", post.images[0].image);
        html = html.replace("{title}", post.title);
        
        if (post.description)
            html = html.replace("{description}", post.description.substring(0, 100) + "...");
        
        html = html.replace("{price}", post.price);
        html = html.replace("{post}", post.id);
        
        div.innerHTML = html;

        div.onclick = function () {
            showPost(post);
        };

        var container = document.createElement("div");
        container.appendChild(div);

        var marker = addMarker({lat: parseFloat(post.lat), lng: parseFloat(post.lng)}, post.price, null, $(container).html());
        markers.push(marker);
    }
}

/**
 * search about post with current location
 *   
 * @returns {}
 */
function searchWithCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;


            app.filter.lat = lat;
            app.filter.lng = lng;

            // set current location
            map.setCenter({lat: lat, lng: lng});
            search();

            $(".recommended-post").animate({
                bottom: -300
            }, 'slow');
            $(".recommended-post .icon").html('<i class="fa fa-angle-up" ></i>');
            recommendedFlag = true;
            toggleFilterSidebar();
        });
    }
}

/**
 * get recommends post for the user
 *   
 * @returns {}
 */
function loadRecommends() {
    $.get(public_path + "/api/post/recommended", function (data) {
        if (data.status == 1) {
            
            app.recommends = data.data;

            var i = 0;
            for(i = 0; i < app.recommends.length; i ++) {
                app.recommends[i].price = (app.recommends[i].price).toLocaleString('en-US', { style: 'currency', currency: 'EGP', }).replace(".00", "");
                app.recommends[i].price_per_meter = (app.recommends[i].price_per_meter).toLocaleString('en-US', { style: 'currency', currency: 'EGP', }).replace(".00", "");
            }
            setTimeout(function(){
                toggleRecommended(); 
                setOwlCarousel();
            }, 3000);
        }
    });
}

/**
 * toggle post sidebar
 * @returns {undefined}
 */
function togglePostSidebar(element) {
    if (postSidebarFlag == 1) {
        w3_open();
        $(element).css("left", "-40px");
        $(element).find("button").html('<i class="fa fa-angle-right " ></i>');
    } else {
        w3_close();
        $(element).css("left", "-57px");
        $(element).find("button").html('<i class="fa fa-angle-left " ></i>');
    }
    postSidebarFlag *= -1;
}

function w3_open() {
    var windowSize = window.innerWidth;
    
    if (windowSize <= 600) {
        $("#mySidebar").animate({width: '70%'});
        $("#main").animate({width: '30%'});
    } else {
        $("#mySidebar").animate({width: '40%'});
        $("#main").animate({width: '60%'});
    }
    //document.getElementById("openNav").style.display = 'none';
}

function w3_close() {
    $("#mySidebar").animate({width: '0%'});
    $("#main").animate({width: '100%'});
    //document.getElementById("openNav").style.display = "inline-block";
}


function setOwlCarousel() {
    recommendOwl = $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            300: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 5
            }
        }
    });
    recommendOwl.on('mousewheel', '.owl-stage', function (e) { 
        if (e.originalEvent.deltaY>0) {
            recommendOwl.trigger('next.owl');
        } else {
            recommendOwl.trigger('prev.owl');
        } 
        e.preventDefault();
    });
}

function setFavouriteBtn() {
    $(".favourite-btn").click(function () {
        if ($(this).hasClass("fa-heart-o")) {
            $(this).removeClass("fa-heart-o");
            $(this).addClass("fa-heart");
        } else {
            $(this).removeClass("fa-heart");
            $(this).addClass("fa-heart-o");
        }

        $.get(public_path + "/post/toggle/favourite?post_id=" + app.currentPost.id, function (r) {
            if (r.status == 1) {
                success(r.message_en);
            } else {
                error(r.message_en);
                window.location = public_path + "/login";
            }
        });
    });
}

function navigateTo(element) {
    var top = $("a[name=" + element + "]").offset().top + 100;
    $('.post-content').animate({
        scrollTop: 0
    });
    $('.post-content').animate({
        scrollTop: top
    }, 'slow');
}

function setCurrentPostChart() {
    if (app.currentPost) {
        var ctx = document.getElementById('currentPostChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: app.currentPost.chart_data.x,
                datasets: [{
                        label: chartTitle.replace("{city}", (LANG == "en")? app.currentPost.city.name_en : app.currentPost.city.name_ar),
                        backgroundColor: 'rgba(2, 169, 168, 0.5)',
                        borderColor: 'rgb(2, 150, 168)',
                        data: app.currentPost.chart_data.y
                    }]
            },
            // Configuration options go here
            options: {}
        });
    }
}

function setRatebar() {
    var rate = new Ratebar($(".rate")[0]);
    rate.setOnRate(function () {
        $(".rate-value").val(rate.value);
    });
}

function setPanoramaView(path) {
//    var viewer = new PhotoSphereViewer({
//        container: 'viewer',
//        panorama: path
//    });
    //var panorama = new PANOLENS.ImagePanorama(path);
    //var viewer = new PANOLENS.Viewer();
    //viewer.add(panorama);
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}



function toggleFilterSidebar() {
    var right = "-" + $(".filter-sidebar-content").css("width");
    if (filterSidebarFlag) {
        $("#filterSidebar").animate({
            right: right
        }, 'slow');
        $("#filterToggleSidebarBtn").html('<i class="fa fa-angle-left" ></i>' + $('.filterToggleSidebarBtnText').html());
        filterSidebarFlag = false;
         
    } else {
        $("#filterSidebar").animate({
            right: 0
        }, 'slow');
        $("#filterToggleSidebarBtn").html('<i class="fa fa-angle-right" ></i>' + $('.filterToggleSidebarBtnText').html());
        filterSidebarFlag = true;
        
        
        $('[data-toggle="tooltip"]').tooltip('show');
        // close recommended
        $(".recommended-post").animate({
            bottom: -300
        }, 'slow');
        $(".recommended-post .icon").html('<i class="fa fa-angle-up" ></i>');
        recommendedFlag = true;
    }

}

function toggleRecommended() {
    if (recommendedFlag) {
        $(".recommended-post").animate({
            bottom: 0
        }, 'slow');
        $(".recommended-post .icon").html('<i class="fa fa-angle-down" ></i>');
        recommendedFlag = false;
        
        // close filter 
        $("#filterSidebar").animate({
            right: right
        }, 'slow');
        $("#filterToggleSidebarBtn").html('<i class="fa fa-angle-left" ></i>' + $('.filterToggleSidebarBtnText').html());
        filterSidebarFlag = false;
    } else {
        $(".recommended-post").animate({
            bottom: -300
        }, 'slow');
        $(".recommended-post .icon").html('<i class="fa fa-angle-up" ></i>');
        recommendedFlag = true;
        toggleFilterSidebar();
    }

}

function loadPost(id) {
    $.get(public_path + "/api/post/get?post_id=" + id, function (r) {
        showPost(r.data);

    });
}

function showPost(data) {
    app.currentPost = data;
    app.currentPostId = data.id;
    app.loadding360 = true;
     
    data.price = (data.price).toLocaleString('en-US', { style: 'currency', currency: 'EGP', }).replace(".00", "");
    data.price_per_meter = (data.price_per_meter).toLocaleString('en-US', { style: 'currency', currency: 'EGP', }).replace(".00", ""); 
    
    // show post id
    window.history.pushState('', 'Title', public_path + "/map?post_id=" + data.id);

    //setOwlCarousel();
    _setWaterMark();
    setTimeout(function () {
     
        setCurrentPostChart();
        // set water mark
        _setWaterMark();
        // set nicescroll
        setNicescroll();
        // 
        formAjax(false, function(r){
            if (r.status == 0) { 
                window.location = public_path + "/login";
            }
        });
        // 
        w3_open();
        //
        setFavouriteBtn();
        //
        setRatebar();
        //
        setPanoramaView(public_path + "/website/image/panorama.jpg");
        //
        $('#main').css('height', window.innerHeight);
        //
    }, 500);

    setTimeout(function(){
        app.loadding360 = false;
    }, 3000);
}

function search() {
    $(".filters").slideUp(500);
    $(".result").slideDown(500);
    app.posts = [];
    app.result_message = '';
    
    $(".post-loading-state").show();
    
    $(".post-no-found-state").hide();

    var data = jQuery.param(app.filter);
    $.get(public_path + "/api/post/search?" + data, function (r) {
        app.posts = r.data;
        var i = 0;
        for(i = 0; i < app.posts.length; i ++) {
            app.posts[i].price = (app.posts[i].price).toLocaleString('en-US', { style: 'currency', currency: 'EGP', }).replace(".00", "");
            app.posts[i].price_per_meter = (app.posts[i].price_per_meter).toLocaleString('en-US', { style: 'currency', currency: 'EGP', }).replace(".00", "");
        }
            
        drawPostsMarkers(r.data);
        var message = (LANG == "en") ? r.message_en : r.message_ar;

        if (app.posts[0] != null)
            map.setCenter({lat: parseFloat(app.posts[0].lat), lng: parseFloat(app.posts[0].lng)});

        app.result_message = message;
        
        if (r.data.length <= 0)
            $(".post-no-found-state").show();
            
        $(".post-loading-state").hide();
    });
}

var changePriceSlideValues = function () {
    var prices = $(".price-range").val().split(",");

    app.filter.price1 = prices[0];
    app.filter.price2 = prices[1];

}

var changeSpaceSlideValues = function () {
    var spaces = $(".space-range").val().split(",");

    app.filter.space1 = spaces[0];
    app.filter.space2 = spaces[1];
}

function reset() {
    ranger1.refresh();
    ranger2.refresh();
    app.filter = {
        category_id: null,
        city_id: null,
        price1: null,
        price2: null,
        space1: null,
        space2: null,
        area_id: null,
        bedroom_number: 0,
        bathroom_number: 0,
    };
}

function setFilterSpinner() {
    // preparse number spinner for bedroom_number
    $(document).on('click', '.number-bedroom-spinner button', function () {
        var btn = $(this),
                oldValue = btn.closest('.number-bedroom-spinner').find('input').val().trim(),
                newVal = 0;

        if (btn.attr('data-dir') == 'up') {
            app.filter.bedroom_number = parseInt(oldValue) + 1;
        } else {
            if (oldValue > 1) {
                app.filter.bedroom_number = parseInt(oldValue) - 1;
            } else {
                app.filter.bedroom_number = 1;
            }
        }
        btn.closest('.number-bedroom-spinner').find('input').val(app.filter.bedroom_number);
    });
    $(document).on('click', '.number-bathroom-spinner button', function () {
        var btn = $(this),
                oldValue = btn.closest('.number-bathroom-spinner').find('input').val().trim(),
                newVal = 0;

        if (btn.attr('data-dir') == 'up') {
            app.filter.bathroom_number = parseInt(oldValue) + 1;
        } else {
            if (oldValue > 1) {
                app.filter.bathroom_number = parseInt(oldValue) - 1;
            } else {
                app.filter.bathroom_number = 1;
            }
        }
        btn.closest('.number-bedroom-spinner').find('input').val(app.filter.bathroom_number);
    });
}

function setFilterRanges() {
    ranger1 = $($(".ranger")[0]).slider({})
            .on("slide", changePriceSlideValues)
            .data('slider');
    ranger2 = $($(".ranger")[1]).slider({})
            .on("slide", changeSpaceSlideValues)
            .data('slider');
}

function _setWaterMark() {
    /*
    $(".wm").each(function(){ 
        var _this = this;
        watermark([_this.src, public_path+"/website/image/zelo.png"])
          .image(watermark.image.lowerRight(0.5))
          .then(function (img) {
            _this.src = img.src;
            //document.getElementById('lower-right').appendChild(img);
        });
    });*/
}

/**
 * on document ready load init library
 */
$(document).ready(function () {
//window.onload = function() {
    if (app.currentPostId != null) {
        loadPost(app.currentPostId);
    }

    // load location of visitor
    getLocation();

    // set nicescroll
    setNicescroll();

    // load recommended posts
    loadRecommends();
 
    // set spinner of bedroom and bathroom
    setFilterSpinner();
    
    // set range of price and space
    setFilterRanges();
    
    // toggle recommended
    toggleRecommended();


    
    // prep comment form
    $(".comment-form").submit(function () {
        loadPost(app.currentPostId);
    }); 
 
  
    // set tooltip
    setTimeout(function () {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });

    }, 2000);
    
    //
    

});



