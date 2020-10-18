/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//
//var i = 0;
//var txt = 'Be or Not To Be'; /* The text */
//var speed = 100; /* The speed/duration of the effect in milliseconds */
//
//function typeWriter() {
//    if (i < txt.length) {
//        document.getElementById("textHeader").innerHTML += txt.charAt(i);
//        i++;
//        setTimeout(typeWriter, speed);
//    } else {
//        setTimeout(function () {
//            i = 0;
//            document.getElementById("textHeader").innerHTML = "";
//            typeWriter();
//        }, 1000);
//    }
//
//}

var TypeWriter = (function () {

    function TypeWriter(div, spead) {
        this.div = div;
        this.text = div.innerHTML; 
        this.spead = spead;
        this.index = 0;
        this.preload();
        this.start();
    }
    
    TypeWriter.prototype.preload = function () {
        this.div.innerHTML = "";
    };

    TypeWriter.prototype.start = function () {
        var self = this; 
        if (self.index < self.text.length) {
            self.div.innerHTML += self.text.charAt(self.index);
            self.index++;
            setTimeout(function(){
                self.start();
            }, self.spead);
        } else {
            setTimeout(function () {
                self.index = 0;
                self.div.innerHTML = "";
                self.start();
            }, 1000);
        }
    };

    return TypeWriter;
}());
