var MacWindow = (function () {

    MacWindow.selected = 9999999999999;

    function MacWindow(src, title) {
        this.src = src;
        this.title = title;
        this.autoload();
    }

    MacWindow.prototype.createView = function () {
        this.container = document.createElement("div");
        this.container.className = "nicescroll";
        this.container.style.background = "#fafafa";
        this.frame = document.createElement("iframe");
        this.container.className = "mac-window";
        this.frame.className = "window";
        this.frame.style.display = "none";
        this.frame.style.overflow = "auto";
        this.frame.style.resize = "both";
        this.container.style.resize = "both";

        this.container.innerHTML =
                '<div class="title-bar">' +
                '<div class="buttons">' +
                '<div class="close"></div>' +
                '<div class="minimize"></div>' +
                '<div class="maximize"></div>' +
                '</div>' +
                '<div class="title">' +
                '</div>' +
                '</div>';
        this.container.appendChild(this.frame);
    };

    MacWindow.prototype.setSrc = function () {
        this.frame.src = this.src;
        var self = this;
        this.frame.onload = function () {
            this.style.display = "block";
            self.loaderContainer.remove();
        };
    };

    MacWindow.prototype.setLoader = function () {

        var loader =
                '<div class="loader" style="margin-top: 25px;z-index: 99999999999;display:block;width: 100%;height: 400px;position: fixed;left:0;top:0;background-color: #fafafa;" >' +
                '<br><br><br>' +
                '<center>' +
                '<span>من فضلك انتظر ...</span>' +
                '</center>' +
                '</div>';
        this.loaderContainer = document.createElement("div");
        this.loaderContainer.innerHTML = loader;

        this.container.appendChild(this.loaderContainer);
    };

    MacWindow.prototype.setOptions = function () {
        var self = this;
        $(this.container).find('.close').click(function () {
            self.close();
        });

        $(this.container).find('.minimize').click(function () {
            self.minimize();
        });

        $(this.container).find('.maximize').click(function () {
            self.maximize();
        });

        $(this.container).find('.title-bar').dblclick(function () {
            self.maximize();
        });

        this.container.onmousedown = function () {
            self.select();
        };
    };

    MacWindow.prototype.setTitle = function () {
        $(this.container).find(".title").text(this.title);
    };

    MacWindow.prototype.addView = function () {
        document.body.appendChild(this.container);
    };

    MacWindow.prototype.open = function () {
        this.select();
        $(this.container).addClass("active");
    };

    MacWindow.prototype.minimize = function () {
        $(this.container).toggleClass('minimize');
        $(this.container).removeClass('maximize');
    };

    MacWindow.prototype.maximize = function () {
        this.container.style.width = null;
        this.container.style.height = null;

        $(this.container).toggleClass('maximize');
        $(this.container).removeClass('minimize');
        this.container.style.left = null;
        this.container.style.top = null;
    };

    MacWindow.prototype.close = function () {
        $(this.container).removeClass('active');
        $(this.container).removeClass('maximize');
        $(this.container).removeClass('minimize');
    };

    MacWindow.prototype.select = function () {
        MacWindow.selected += 1;
        this.container.style.zIndex = MacWindow.selected;
    };

//	MacWindow.prototype.setResizable = function() {
//	  const element = this.container;
//	  const resizers = [this.container];
//	  for (let i = 0;i < resizers.length; i++) {
//		const currentResizer = resizers[i];
//		currentResizer.addEventListener('mousedown', function(e) {
//		  currentResizer.addEventListener('mousemove', resize)
//		})
//
//		function resize(e) {
//		  if (currentResizer.classList.contains('bottom-right')) {
//			element.style.width = e.pageX - element.getBoundingClientRect().left + 'px';
//		  }
//		}
//	  }
//	};

    MacWindow.prototype.autoload = function () {
        this.createView();
        this.setTitle();
        this.setLoader();
        this.setSrc();
        this.setOptions();
        this.setDragable();
        //this.setResizable();
        this.addView();
    };


    MacWindow.prototype.setDragable = function () {
        var mousePosition;
        var offset = [0, 0];
        var isDown = false;
        var self = this;

        this.container.style.position = "fixed";
        this.container.style.right = "20px";
        this.container.style.bottom = "20px";



        $(this.container).find(".title-bar").mousedown(function (e) {
            isDown = true;
            self.container.style.transition = "all 0.0s";
            offset = [
                self.container.offsetLeft - e.clientX,
                self.container.offsetTop - e.clientY
            ];
        });

        document.addEventListener('mouseup', function () {
            isDown = false;
            self.container.style.transition = "all 0.25s";
        }, true);

        document.addEventListener('mousemove', function (event) {
            event.preventDefault();
            if (isDown) {
                mousePosition = {
                    x: event.clientX,
                    y: event.clientY

                };
                self.container.style.left = (mousePosition.x + offset[0]) + 'px';
                self.container.style.top = (mousePosition.y + offset[1]) + 'px';
            }
        }, true);
    };


    return MacWindow;
}());
