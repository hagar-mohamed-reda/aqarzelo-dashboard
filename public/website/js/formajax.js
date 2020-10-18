function formAjax(edit, action) {

    $(".form").each(function () {
        this.onsubmit = function (e) {
            e.preventDefault();
            
            var formdata = new FormData();
            var elements = this.elements;
            var self = this;

            for (var i = 0; i < elements.length; i++) {
                var e = elements[i];
                if (e.name.length > 0) {
                    if (e.type == "file") {
                        if (e.files[0] != undefined)
                            formdata.append(e.name, e.files[0]);
                    } else
                        formdata.append(e.name, e.value);
                }
            }

            //sendPost(this.action, formdata, function(r){console.log(r);});

            $.ajax({
                url: this.action,
                type: 'POST',
                data: formdata,
                processData: false, // tell jQuery not to process the data
                contentType: false, // tell jQuery not to set contentType
                success: function (data) {
                    if (data.status == 1) {
                        success(data.message_en);
                        // reload data 
                        try{
                            $('#table').DataTable().ajax.reload();
                            
                            loadData();
                        }catch(e){}

                        if (self.action.indexOf("update") < 0)
                            self.reset();
                    } else {
                        error(data.message_en);
                    }
                        
                    if (action != null)
                        action(data);
                }
            });

            return false;
        };
    });

}
