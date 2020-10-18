

function addEventHandler(obj, evt, handler) {
    if (obj.addEventListener) {
        // W3C method
        obj.addEventListener(evt, handler, false);
    } else if (obj.attachEvent) {
        // IE method.
        obj.attachEvent('on' + evt, handler);
    } else {
        // Old school method.
        obj['on' + evt] = handler;
    }
}



function Droper(drop, action) { 
    addEventHandler(window, 'load', function () { 

        function cancel(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            return false;
        }

        // Tells the browser that we *can* drop on this target
        new addEventHandler(drop, 'dragover', cancel);
        new addEventHandler(drop, 'dragenter', cancel);

        new addEventHandler(drop, 'drop', function (e) {
            e = e || window.event; // get window.event if e argument missing (in IE)   
            if (e.preventDefault) {
                e.preventDefault();
            } // stops the browser from redirecting off to the image.

            var dt = e.dataTransfer;
            var files = dt.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var reader = new FileReader();

                //attach event handlers here...

                reader.readAsDataURL(file);
                new addEventHandler(reader, 'loadend', function (e, file) {
                    var bin = this.result;
                    var newFile = document.createElement('div');
                    //newFile.innerHTML = 'Loaded : ' + file.name + ' size ' + file.size + ' B';
                   
                      
 
                    action(bin, file);
                }.bindToEventHandler(file));
            }
            return false;
        });
        Function.prototype.bindToEventHandler = function bindToEventHandler() {
            var handler = this;
            var boundParameters = Array.prototype.slice.call(arguments);
            console.log(boundParameters);
            //create closure
            return function (e) {
                e = e || window.event; // get window.event if e argument missing (in IE)   
                boundParameters.unshift(e);
                handler.apply(this, boundParameters);
            }
        };
    });
}