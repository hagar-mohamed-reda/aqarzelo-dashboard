/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 

function loadData() {
    $.get(url + "/depart/data", function (data) {
        $("#tableContainer").html(data);
        //
        dataTable();
    });
}


function editDepart(depart) {
    $(".editModal").html('');
    $(".editModal").show();
    $.get(url + "/depart/edit/" + depart, function (data) {
        $(".editModal").html(data); 
    });
}

function addDepart(form, action) {

    $.post(form.action,
            "name=" + form.name.value + "&_token=" + form._token.value,
            function (data) {
                var r = JSON.parse(data);

                if (r.status == "1") {
                    // show message
                    success(r.message);
                    // reset form
                    form.reset();
                    // load new data
                    loadData();

                    if (action != null)
                        action();
                }
                else {
                    error(r.message);
                    form.reset();
                }
            });

    return false;
}


$(document).ready(function () {
    // load depart data
    loadData(); 
});