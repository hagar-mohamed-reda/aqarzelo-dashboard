/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function editCompany() {
    var company = $("#companyName")[0].value;
    
    if (company.length <= 0) {
        error(ERROR_INPUT_VALUE);
        return;
    }
    
    $.get(url + "/company/update?company="+company, function(r){
        success(r);
    });
}

function uploadLogo() {
    var formData = new FormData();
    
    if ($(".logo")[0].files <= 0) {
        error(ERROR_INPUT_VALUE);
        return;
    }
    
    formData.append("_token", $("input[name=_token]").val());
    formData.append("logo", $(".logo")[0].files[0]);
     
    $.ajax({
        url: url + "/companylogo/update",
        type: 'POST',
        data: formData,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (r) { 
            success(r);
        }
    });
}


function setDirection() {
    direction *= -1;
    
    $.get(url + "/direction/update?direction="+direction, function(r){
        success(r);
    });
}
 
function selectTheme(theme, div) {
    $(".theme-item .fa").removeClass("fa-check").addClass("fa-close");
    $(div).find(".fa").removeClass("fa-close").addClass("fa-check");
    $.get(url + "/theme/update?theme="+theme, function(r){
        success(r);
    });
}

function setMaxDelay4() { 
    $.get(url + "/maxd4/update?value="+$("#max_delay_day_4").val(), function(r){
        success(r);
    });
}

function setMaxDelay2() { 
    $.get(url + "/maxd2/update?value="+$("#max_delay_day_2").val(), function(r){
        success(r);
    });
}

function setMaxDelay2() { 
    $.get(url + "/maxa1/update?value="+$("#max_absent_day_1").val(), function(r){
        success(r);
    });
}

$(document).ready(function(){
    
    $(".theme-"+theme + " .fa").removeClass("fa-close").addClass("fa-check");
    
});