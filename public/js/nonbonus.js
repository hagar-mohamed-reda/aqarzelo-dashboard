/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var counter = 1;
var savedCounter = 1;

function setSelect2() {
    //Initialize Select2 Elements
    $('.select2').select2();
}

function loadData() {
    $.get(url + "/nonbonus/data", function (data) {
        $("#tableContainer").html(data);
        //
        dataTable();
    });
}


function editNonbonus(nonbonus) {
    $(".editModal").html('');
    $(".editModal").show();
    $.get(url + "/nonbonus/edit/" + nonbonus, function (data) {
        $(".editModal").html(data); 
        //
        setNicescroll();
    });
}

function updateNonbonus(id) {
    var nonbonus = {};
    
    nonbonus.employee = id;
    nonbonus.c1 = $(".editModal .c1").val();
    nonbonus.c2 = $(".editModal .c2").val();
    nonbonus.c3 = $(".editModal .c3").val();
    nonbonus.c4 = $(".editModal .c4").val();
    nonbonus.c5 = $(".editModal .c5").val();
    nonbonus.c6 = $(".editModal .c6").val();
    nonbonus.c7 = $(".editModal .c7").val();
    nonbonus.c8 = $(".editModal .c8").val(); 
     
    sendNonbonus(nonbonus, function(){
        $(".editModal").hide();
    }, '/nonbonus/update/'+id);
     
}

//function addNonbonus(form, action) {
//
//    $.post(form.action,
//            "name=" + form.name.value + "&start=" + form.start.value + "&end=" + form.end.value + "&_token=" + form._token.value,
//            function (data) {
//                var r = JSON.parse(data);
//
//                if (r.status == "1") {
//                    // show message
//                    success(r.message);
//                    // reset form
//                    form.reset();
//                    // load new data
//                    loadData();
//
//                    if (action != null)
//                        action();
//                }
//                else
//                    error(r.message);
//            });
//
//    return false;
//}

function onfinished() {
    $(".loader").slideUp(100);
    $(".dataSection").slideDown(500);
    $(".modal-footer").show();
    $(".notmain").remove();

    // reset inputs 
    resetTableInputs();
    
    // reload window
    window.location.reload();
}

function addData(nonbonuss) {
    if (nonbonuss.length <= 0) {
        onfinished();
        return;
    }
    var nonbonus = nonbonuss.pop();
    sendNonbonus(nonbonus, function () {
        $("#savedNumber").text(savedCounter);

        savedCounter++;
        addData(nonbonuss);
    }, '/nonbonus/store');
}

function addNonbonus() {
    var nonbonuss = collectData();
    $(".dataSection").slideUp();
    $(".modal-footer").hide();
    $(".loader").slideDown(200);

    //
    $("#tatalNumber").html(nonbonuss.length);
    savedCounter = 1;

    addData(nonbonuss);
}

function sendNonbonus(nonbonus, action, path) {
    // _token
    var _token = $("input[name=_token]").val();


    $.post(public_path + path, "_token="+_token+"&nonbonus="+JSON.stringify(nonbonus), function (data) {

            var r = data;
            try {
                r = JSON.parse(data);
            }catch(e) {
                error(r);
            }

            if (r.status == "1") {
                // show message
                success(r.message);

                // load new data
                loadData();

            }
            else
                error(r.message);

            if (action != null)
                action(data);
            $(".response")[0].innerHTML += r.message + "<br>";
        });

    return false;
}

function collectData() {
    var nonbonuss = [];
    $(".rows tr").each(function () {
        var nonbonus = {};
        nonbonus.employee = $(this).find(".employee").val();
        nonbonus.c1 = $(this).find(".c1").val();
        nonbonus.c2 = $(this).find(".c2").val();
        nonbonus.c3 = $(this).find(".c3").val();
        nonbonus.c4 = $(this).find(".c4").val();
        nonbonus.c5 = $(this).find(".c5").val();
        nonbonus.c6 = $(this).find(".c6").val();
        nonbonus.c7 = $(this).find(".c7").val();
        nonbonus.c8 = $(this).find(".c8").val(); 


        nonbonuss.push(nonbonus);
    });


    return nonbonuss;
}

function validate(input) {
    if ($(input).is(":invalid")) {
        error(ERROR_INPUT_VALUE);
        $("#addBtn").hide();
    } else
        $("#addBtn").show();
}

function addRow() {
    // create obj row
    var row = document.createElement("tr");
    row.className = "notmain row" + counter;

    // fill the html obj
    row.innerHTML = $(".row1").html();

    // select input
    var selectInput = $(".hiddenSection").html();

    $(row).find(".employeeCol").html(selectInput);

    $(row).find(".employee").select2();

    // add row to the table
    $(".rows").append(row);


    // increase counter
    counter++;
}

function removeRow(div) {
    swal({
        title: "😧 Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(function (willDelete) {
        if (willDelete) {
            if ($(".addTable tr").length <= 2)
                error("you should let at least one row");
            else {
                $(div).parent().parent().remove();
                success("row removed");
                counter--;
            }
        } else {
        }
    });
}

function validListner() {
    setInterval(function () {
        var valid = true;
        $(".nonbonusModal .form-control").each(function () {
            if ($(this).is(":invalid"))
                valid = false;
        });

        valid ? $("#addBtn").show() : $("#addBtn").hide();
    }, 1000);
}

function resetTableInputs() {
    $(".addTable .form-control").val('');
}


$(document).ready(function () {
    // load nonbonus date
    loadData();

    //Initialize Select2 Elements
    setSelect2();

    // valid on inputs
    validListner();

    // reset all inputs of table
    resetTableInputs();
});
//****************************************
// calculating section
//****************************************

function calculateCols(input) {
    var tr = $(input).parent().parent()[0];
    calculateC8(tr); 
}

function calculateC8(tr) {
    var c1 = $(tr).find(".c1")[0];
    var c2 = $(tr).find(".c2")[0];
    var c3 = $(tr).find(".c3")[0];
    var c4 = $(tr).find(".c4")[0];
    var c5 = $(tr).find(".c5")[0];
    var c6 = $(tr).find(".c6")[0];
    var c7 = $(tr).find(".c7")[0]; 

    var c8 = $(tr).find(".c8")[0];

    var value =
            parseFloat(c1.value) + parseFloat(c2.value) + parseFloat(c3.value) +
            parseFloat(c4.value) + parseFloat(c5.value) + parseFloat(c6.value) +
            parseFloat(c7.value);

    c8.value = value.toFixed(2);
}
 