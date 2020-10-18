



var Ratebar = (function () {

    function Ratebar(div) {
        this.container = document.createElement("div");
        this.value = 0;
        this.div = div;
        this.init();
    }

    Ratebar.prototype.initContainerStyle = function () {
        this.container.className = "w3-xxlarge";
    };

    Ratebar.prototype.createView = function () {
        for (var number = 0; number < 5; number++) {
            var span = document.createElement("span");
            span.style.margin = "5px";
            span.style.cursor = "pointer";
            span.className = "fa fa-star rate-star star-" + (number + 1);
            span.id = (number + 1);
            //
            this.container.appendChild(span);
        }
    };

    Ratebar.prototype.setMouseEnter = function () {
        var spans = this.container.children;
        for (var index = 0; index < spans.length; index++) {
            var span = spans[index];
            span.onmouseover = function () {
                this.style.color = "#DAA520";
            };
        }
    };

    Ratebar.prototype.setMouseExit = function () {
        var spans = this.container.children;
        var _this = this;
        for (var index = 0; index < spans.length; index++) {
            var span = spans[index];
            span.onmouseout = function () {
                if (parseInt(this.id) > _this.value)
                    this.style.color = "black";
            };
        }
    };

    Ratebar.prototype.setMouseClick = function () {
        var spans = this.container.children;
        var _this = this;
        for (var index = 0; index < spans.length; index++) {
            var span = spans[index];
            span.onclick = function () {
                var id = parseInt(this.id);
                _this.rate(id);
            };
        }
    };

    Ratebar.prototype.rate = function (id) {
        this.value = parseInt(id);
        var spans = this.container.children;
        for (var index = 0; index < spans.length; index++) {
            var span = spans[index];
            span.style.color = "black";
            if (parseInt(span.id) <= id)
                span.style.color = "#DAA520";
        }
        if (this.action != undefined)
            this.action();
    };

    Ratebar.prototype.addContainerToDiv = function () {
        this.div.appendChild(this.container);
    };
    
    Ratebar.prototype.setOnRate = function (action) {
        this.action = action;
    };

    Ratebar.prototype.init = function () {
        this.initContainerStyle();
        this.createView();
        this.setMouseEnter();
        this.setMouseExit();
        this.setMouseClick();
        this.addContainerToDiv();
    };

    return Ratebar;
}());