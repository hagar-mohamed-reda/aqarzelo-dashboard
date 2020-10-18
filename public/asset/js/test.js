
//$(".sub-menu a").click(function () {
//	$(this).parent().find("ul").slideToggle(100);
//	$(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
//});

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
                event.preventDefault();
                $(this).ekkoLightbox();
            });

$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
};

$(".for-show").hover(function(){
    $('.crazy-cart').show();
},function(){
    $('.crazy-cart').hide();
});

function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

  $('.selectpicker').selectpicker();



    $(function () {
            var $propertiesForm = $('.mall-category-filter');
            var $body = $('body');

            $body.on('click', '.js-mall-filter', function () {
                var $input = $(this).find('input');
                $(this).toggleClass('mall-filter__option--selected')
                $input.prop('checked', ! $input.prop('checked'));
                $propertiesForm.trigger('submit');
            });
            $body.on('click', '.js-mall-clear-filter', function () {
                var $parent = $(this).closest('.mall-property');

                $parent.find(':input:not([type="checkbox"])').val('');
                $parent.find('input[type="checkbox"]').prop('checked', false);
                $parent.find('.mall-filter__option--selected').removeClass('mall-filter__option--selected')

                var slider = $parent.find('.mall-slider-handles')[0]
                if (slider) {
                    slider.noUiSlider.updateOptions({
                        start: [slider.dataset.min, slider.dataset.max]
                    });
                }
                $propertiesForm.trigger('submit');
            });

            $propertiesForm.on('submit', function (e) {
                e.preventDefault();

                $.publish('mall.category.filter.start')
                $(this).request('categoryFilter::onSetFilter', {
                    loading: $.oc.stripeLoadIndicator,
                    complete: function (response) {
                        $.oc.stripeLoadIndicator.hide()
                        if (response.responseJSON.hasOwnProperty('queryString')) {
                            history.replaceState(null, '', '?' +              response.responseJSON.queryString)
                        }
                        $('[data-filter]').hide()
                        if (response.responseJSON.hasOwnProperty('filter')) {
                            for (var filter of Object.keys(response.responseJSON.filter)) {
                                $('[data-filter="' + filter + '"]').show();
                            }
                        }
                        $.publish('mall.category.filter.complete')
                    },
                    error: function () {
                        $.oc.stripeLoadIndicator.hide()
                        $.oc.flashMsg({text: 'Fehler beim Ausführen der Suche.', class: 'error'})
                        $.publish('mall.category.filter.error')
                    }
                });
            });

            $('.mall-slider-handles').each(function () {
                var el = this;
                noUiSlider.create(el, {
                    start: [el.dataset.start, el.dataset.end],
                    connect: true,
                    tooltips: true,
                    range: {
                        min: [parseFloat(el.dataset.min)],
                        max: [parseFloat(el.dataset.max)]
                    },
                    pips: {
                        mode: 'range',
                        density: 20
                    }
                }).on('change', function (values) {
                    $('[data-min="' + el.dataset.target + '"]').val(values[0])
                    $('[data-max="' + el.dataset.target + '"]').val(values[1])
                    $propertiesForm.trigger('submit');
                });
            })
        })
        
   

        function quickView(product) {
            $.get(public_path + "/quickview?product="+product, function(r){ 
                $(".quickViewPlace").html(r);
                $("#quickViewModal").modal();
            });
        }

        function addToCart(product, amount=1) {
            $.get(public_path + "/cart/add?product="+product+"&amount="+amount, function(r){ 
                /*if (r.status == 1)
                    success(r.message);
                else
                    error(r.message);
                */
                window.location = window.location.origin + window.location.pathname + "?msg="+r.message+"&status="+r.status;
            });
        }

        function removeFromCart(product, div) {
            $.get(public_path + "/cart/remove?product="+product, function(r){ 
                /*if (r.status == 1) {
                    success(r.message);
                    $(div).remove();
                }
                else
                    error(r.message);
                */
                window.location = window.location.origin + window.location.pathname + "?msg="+r.message+"&status="+r.status;
            });
        }