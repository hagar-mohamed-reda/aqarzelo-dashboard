/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var X = XLSX;
var XW = {
    /* worker message */
    msg: 'xlsx',
    /* worker scripts */
    worker: './xlsxworker.js'
};

function loadExcel(files) {
    var f = files[0];
    var reader = new FileReader();
    var array = [];
    reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});

        array = to_array(workbook);

        /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsArrayBuffer(f);

    return array;
}

function viewData(obj) {
    $(".importTable").html('');
    for (var i = 0; i < obj.length; i++) {
        var row = obj[i];
        var tr = document.createElement("tr");

        for (var j = 0; j < row.length; j++) {
            var col = row[j];
            var td = document.createElement("td");
            td.innerHTML = col;

            tr.appendChild(td);
        }

        $(".importTable").append(tr);
    }
}

var to_array = function to_array(workbook) {

    var result = [];
    workbook.SheetNames.forEach(function (sheetName) {
        //console.log(X.utils);
        result = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
//        if (csv.length) {
//            result.push("SHEET: " + sheetName);
//            result.push("");
//            result.push(csv);
//        }
    });
//		return result.join("\n");
//    var result = {};
//    workbook.SheetNames.forEach(function (sheetName) {
//        var roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1});
//        if (roa.length)
//            result = roa;
//    });
//    
    //console.log(result);
    console.log(result);
    console.log(convertStringToArray(result));
    return  convertStringToArray(result);//JSON.stringify(result, 2, 2);
};

function convertStringToArray(text) {
    var arr = text.split("\n");
    var array = [];
    
    for(var index = 0; index < arr.length; index ++) {
        if (arr[index].length > 0)
            array[index] = arr[index].split(",");
    }
    
    return array;
}
