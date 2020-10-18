/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function showEditForm() {
    $("#profileInfo").slideUp(600);
    $("#editForm").slideDown(800);
}

//****************************************
// profile image
//****************************************

function  updateProfileImage() {
    $('#profile-image-form').submit();
    $('.profile-image-icon').html("<i class='fa fa-camera' ></i>");
    $('.profile-image-icon')[0].onclick = function () {
        $('.profile-image-input').click();
    };
}

function changeProfileImageToEditIcon() {
    $('.profile-image-icon').html("<i class='fa fa-check' ></i>");
    $('.profile-image-icon')[0].onclick = function () {
        updateProfileImage();
    };
}

//****************************************
// profile cover
//****************************************

function updateProfileCover() {
    $('#profile-cover-form').submit();
    $('.profile-cover-icon').html("<i class='fa fa-camera' ></i>");
    $('.profile-cover-icon')[0].onclick = function () {
        $('.profile-cover-input').click();
    };
}

function changeProfileCoverToEditIcon() {
    $('.profile-cover-icon').html("<i class='fa fa-check' ></i>");
    $('.profile-cover-icon')[0].onclick = function () {
        updateProfileCover();
    };
}

function closeEditForm() {
    $("#editForm").slideUp(600);
    $("#profileInfo").slideDown(800);
}

function updateProfile() {
    var token = $("input[name=_token]").val();
    var data = "_token=" + token + "&profile=" + JSON.stringify(app.profile);
    $.post(public_path + "/profile/update", data, function (r) {
        if (r.status == 1) {
            success(r.message_en);
        } else {
            error(r.message_en);
        }
    });
}



$(document).ready(function () {
    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show');
        $('.dropdown-toggle').dropdown();
    });
    setNicescroll();

    $('.profile-image-icon')[0].onclick = function () {
        $('.profile-image-input').click();
    };
    $('.profile-cover-icon')[0].onclick = function () {
        $('.profile-cover-input').click();
    };

    formAjax();
});