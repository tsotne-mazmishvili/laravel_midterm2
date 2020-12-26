define([

        'jquery',
        'jqueryui',
        'wow',
        'bootstrap',
        'slick',
        'LazySizes',
        'Imager',
        'RevolutionSlider',
        'Navigation',
        'sweetAlert'

    ],

    function($, model, Imager, revolution, jqueryui) {
        'use strict';

        var TimeOutOfSlider = 50; // Start Slider after 500ms

        $(function() {
            var $ = jQuery.noConflict();
            var url = $("input[name='site_url']").val();
            var full_url = window.location.href;

            // Translate
            function Translate(name = '') {
                var json = JSON.parse($("input[name='translate']").val());
                return json[name];
            }

            $('.main2-slider').css('opacity', '0');
            setTimeout(function() {
                $('.main2-slider').css('opacity', '1');
            }, TimeOutOfSlider);
            // Main Slider
            jQuery('.main2-slider .tp-banner').show().revolution({
                dottedOverlay: "yes",
                delay: 10000,
                startwidth: 1200,
                startheight: 450,
                hideThumbs: 600,
                thumbWidth: 80,
                thumbHeight: 50,
                thumbAmount: 5,

                navigationType: "bullet", // use none, bullet or thumb
                navigationArrows: "solo", // nexttobullets, solo (old name verticalcentered), none
                navigationStyle: "hermes", // round, square, navbar, round-old, square-old, navbar-old

                touchenabled: "on",
                onHoverStop: "off",
                swipe_velocity: 0.7,
                swipe_min_touches: 1,
                swipe_max_touches: 1,
                drag_block_vertical: false,
                parallax: "mouse",
                parallaxBgFreeze: "on",
                parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],
                keyboardNavigation: "off",
                navigationHAlign: "left",
                navigationVAlign: "bottom",
                navigationHOffset: 0,
                navigationVOffset: 20,
                soloArrowLeftHalign: "left",
                soloArrowLeftValign: "center",
                soloArrowLeftHOffset: 20,
                soloArrowLeftVOffset: 0,
                soloArrowRightHalign: "right",
                soloArrowRightValign: "center",
                soloArrowRightHOffset: 20,
                soloArrowRightVOffset: 0,
                shadow: 0,
                fullWidth: "on",
                fullScreen: "off",
                spinner: "spinner4",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                forceFullWidth: "on",
                hideThumbsOnMobile: "on",
                hideNavDelayOnMobile: 1500,
                hideBulletsOnMobile: "on",
                hideArrowsOnMobile: "on",
                hideThumbsUnderResolution: 0,
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                startWithSlide: 0,
                videoJsPath: "",
                fullScreenOffsetContainer: ""
            });

            // Animation WowJS
            var wow = new WOW({
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0, // distance to the element when triggering the animation (default is 0)
                mobile: true, // trigger animations on mobile devices (default is true)
                live: true, // act on asynchronously loaded content (default is true)
                callback: function(box) {
                    // the callback is fired every time an animation is started
                    // the argument that is passed in is the DOM node being animated
                },
                scrollContainer: null // optional scroll container selector, otherwise use window
            });
            wow.init();

            (function() {
                [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function(el) {
                    new SelectFx(el, {
                        onChange: function(val) {
                            $("select[name='sorting']").val(val);
                            $("input[name='pagination']").val('0');
                            filterProducts(0);
                        }
                    });
                });
            })();

            function isInt(input) {
                return !isNaN(input) && parseInt(input) == input;
            }
            $.fn.PricingSlider = function(from, to) {
                var priceMaxVal = to.data('max-value');
                var values = [priceMaxVal / 3, priceMaxVal / 1.5];
                if (isInt(from.val())) {
                    values[0] = from.val();
                }
                if (isInt(to.val())) {
                    values[1] = to.val();
                }
                if ($().slider) {
                    $(this).slider({
                        range: true,
                        min: 0,
                        max: priceMaxVal,
                        values: values,
                        slide: function(event, ui) {
                            from.val(ui.values[0]);
                            to.val(ui.values[1]);
                        },
                        change: function(event, ui) {
                            $("input[name='pagination']").val('0');
                            filterProducts(0);
                        }
                    });
                }
            }
            $(".pricing-slider").PricingSlider($('#filter-pricing input[name="price_from"]'), $('#filter-pricing input[name="price_to"]'));

            $(window).load(function() {
                $(document).on("change", "body #filter-groups input, body #filter-categories input, body #filter-discounts input, body #filter-brands input, body #filter-colors input, body #filter-sizes input, body select[name='sorting']", function() {
                    $("input[name='pagination']").val('0');
                    filterProducts(0);
                });

                $("body #filter-search input").keyup(function() {
                    $("input[name='pagination']").val('0');
                    filterProducts(0);
                });
            });


            if (full_url.match(/\?./)) {
                $("input[name='pagination']").val('0');
                filterProducts(0);
            }

            var outerPane = $('#products-listing'),
                didScroll = false;

            $(window).scroll(function() { //watches scroll of the window
                didScroll = true;
            });
            setInterval(function() {
                if (didScroll) {
                    didScroll = false;
                    if (($(document).height() - $(window).height()) - $(window).scrollTop() < 1602) {
                        pageCountUpdate();
                    }
                }
            }, 250);

            function pageCountUpdate() {
                var page = parseInt($("input[name='pagination']").val());
                var max_page = parseInt($("input[name='max_page']").val());

                if (page < max_page) {
                    $('#page').val(page + 1);
                    filterProducts(0);
                    $('#end_of_page').hide();
                } else {
                    $('#end_of_page').fadeIn();
                }
            }

            function updateWindowHistoryUrl(url) {
                window.history.pushState('', '', url.replace("/api", "/"));
            }

            function scrollTopForFilter() {
                $('html, body').stop().animate({
                    scrollTop: 620
                }, 1500, 'easeInOutExpo');
            }

            function filterProducts(pagination, tpn = 0) {


                if (!pagination) {
                    var page = $("input[name='pagination']").val();
                } else {
                    var page = pagination;
                }


                var first_url = window.location.href;

                var window_url = '?';
                var url_params = '';
                if ($("#filter-search input").val()) {
                    url_params += 'search=' + $("#filter-search input").val() + '&';
                }
                if ($("select[name='sorting']").val()) {
                    url_params += 'sorting=' + $("select[name='sorting']").val() + '&';
                }
                if ($("#filter-pricing input[name='price_from']").val()) {
                    url_params += 'price_from=' + $("#filter-pricing input[name='price_from']").val() + '&';
                }
                if ($("#filter-pricing input[name='price_to']").val()) {
                    url_params += 'price_to=' + $("#filter-pricing input[name='price_to']").val() + '&';
                }

                if (first_url.indexOf('sale') >= 0) {
                    url_params += 'sale=1&';
                    $("#discount-2").prop('checked', true);
                }

                var filter = {
                    page: page,
                    search: $("#filter-search input").val(),
                    sorting: $("select[name='sorting']").val(),
                    price_from: $("#filter-pricing input[name='price_from']").val(),
                    price_to: $("#filter-pricing input[name='price_to']").val(),
                    group: [],
                    category: [],
                    discount: [],
                    brand: [],
                    color: [],
                    size: []
                };

                // Groups
                $("#filter-groups input:checked").each(function() {
                    filter.group.push($(this).val());
                });

                $(".filter-color-linza").each(function() {
                    $(this).css('display', 'inline-block');
                });
                $(".filter-color-glasses").each(function() {
                    $(this).css('display', 'inline-block');
                });


                $("#filter-colors").css('display', 'block');

                // Categories
                $("#filter-categories input:checked").each(function() {
                    if ($('#filter-categories input:checked').length == $('#filter-categories input').length || $('#filter-categories input:checked').length == 0) {
                        $(".filter-color-glasses").each(function() {
                            $(this).css('display', 'inline-block');
                        });
                        $(".filter-color-linza").each(function() {
                            $(this).css('display', 'inline-block');
                        });
                    } else if ($('#filter-categories input:checked').length > 1) {
                        filter.category.push($(this).val());
                        if ($("#hierarchy-" + $(this).val()).length == 0) {
                            $("ul.breadcrumb").append('<li class="hierarchy" id="hierarchy-' + $(this).val() + '"><a style="font-weight: bold;" href="' + $("#category-" + $(this).val()).parent().find('label').attr('data-href') + '">' + $("#category-" + $(this).val()).parent().find('label').html() + '</a><span id="close-category-' + $(this).val() + '" data-value="' + $(this).val() + '" class="close blades thick"></span></li>');
                        }
                        $("#close-category-" + $(this).val()).click(function() {
                            $("#category-" + $(this).attr('data-value')).prop('checked', false);
                            $("input[name='pagination']").val(0);
                            $(this).parent().remove();
                        });
                        if ($(this).attr('data-linza') == '1') {
                            $("#filter-groups").css('display', 'none');
                            $(".filter-color-linza").each(function() {
                                $(this).css('display', 'inline-block');
                            });
                        } else if ($(this).attr('data-linza') == '0') {
                            $("#filter-groups").css('display', 'block');
                            $(".filter-color-glasses").each(function() {
                                $(this).css('display', 'inline-block');
                            });
                        }
                    } else if ($('#filter-categories input:checked').length == 1) {
                        filter.category.push($(this).val());
                        if ($("#hierarchy-" + $(this).val()).length == 0) {
                            $("ul.breadcrumb").append('<li class="hierarchy" id="hierarchy-' + $(this).val() + '"><a style="font-weight: bold;" href="' + $("#category-" + $(this).val()).parent().find('label').attr('data-href') + '">' + $("#category-" + $(this).val()).parent().find('label').html() + '</a><span id="close-category-' + $(this).val() + '" data-value="' + $(this).val() + '" class="close blades thick"></span></li>');
                        }
                        $("#close-category-" + $(this).val()).click(function() {
                            $("#category-" + $(this).attr('data-value')).prop('checked', false);
                            $("input[name='pagination']").val(0);
                            $(this).parent().remove();
                        });
                        if ($(this).attr('data-linza') == '1') {
                            $("#filter-groups").css('display', 'none');
                            $(".filter-color-glasses").each(function() {
                                $(this).css('display', 'none');
                            });
                            $(".filter-color-linza").each(function() {
                                $(this).css('display', 'inline-block');
                            });
                        } else if ($(this).attr('data-linza') == '0') {
                            $("#filter-groups").css('display', 'block');
                            $(".filter-color-linza").each(function() {
                                $(this).css('display', 'none');
                            });
                            $(".filter-color-glasses").each(function() {
                                $(this).css('display', 'inline-block');
                            });
                        }
                    } else {
                        filter.category.push($(this).val());
                        if ($("#hierarchy-" + $(this).val()).length == 0) {
                            $("ul.breadcrumb").append('<li class="hierarchy" id="hierarchy-' + $(this).val() + '"><a style="font-weight: bold;" href="' + $("#category-" + $(this).val()).parent().find('label').attr('data-href') + '">' + $("#category-" + $(this).val()).parent().find('label').html() + '</a><span id="close-category-' + $(this).val() + '" data-value="' + $(this).val() + '" class="close blades thick"></span></li>');
                        }
                        $("#close-category-" + $(this).val()).click(function() {
                            $("#category-" + $(this).attr('data-value')).prop('checked', false);
                            $("input[name='pagination']").val(0);
                            $(this).parent().remove();
                            $("input[name='pagination']").val('0');
                            filterProducts(0);
                        });
                        if ($(this).attr('data-linza') == '1') {
                            $("#filter-groups").css('display', 'none');
                        } else if ($(this).attr('data-linza') == '0') {
                            $("#filter-groups").css('display', 'block');
                        }
                        $(".filter-color-linza").each(function() {
                            $(this).css('display', 'inline-block');
                        });
                        $(".filter-color-glasses").each(function() {
                            $(this).css('display', 'inline-block');
                        });
                    }

                    if ($(this).attr('data-linza') == '2' || $(this).val() == 4 || $(this).val() == 9) {
                        $("#filter-colors").css('display', 'none');
                    } else {
                        $("#filter-colors").css('display', 'block');
                    }
                });


                // Categories
                $("#filter-categories input:checked").each(function() {
                    //filter.category.push($(this).val());
                    if ($("#hierarchy-" + $(this).val()).length == 0) {
                        $("ul.breadcrumb").append('<li class="hierarchy" id="hierarchy-' + $(this).val() + '"><a style="font-weight: bold;" href="' + $("#category-" + $(this).val()).parent().find('label').attr('data-href') + '">' + $("#category-" + $(this).val()).parent().find('label').html() + '</a><span id="close-category-' + $(this).val() + '" data-value="' + $(this).val() + '" class="close blades thick"></span></li>');
                    }
                    $("#close-category-" + $(this).val()).click(function() {
                        $("#category-" + $(this).attr('data-value')).prop('checked', false);
                        $("input[name='pagination']").val(0);
                        $(this).parent().remove();
                        $("input[name='pagination']").val('0');
                        filterProducts(0);
                    });
                });

                // Categories Checking
                $("#filter-categories input:checked").each(function() {
                    //$(".hierarchy").remove();
                    if ($("#hierarchy-" + $(this).val()).length == 0) {
                        $("ul.breadcrumb").append('<li class="hierarchy" id="hierarchy-' + $(this).val() + '"><a style="font-weight: bold;" href="' + $("#category-" + $(this).val()).parent().find('label').attr('data-href') + '">' + $("#category-" + $(this).val()).parent().find('label').html() + '</a><span id="close-category-' + $(this).val() + '" data-value="' + $(this).val() + '" class="close blades thick"></span></li>');
                    }
                    $("#close-category-" + $(this).val()).click(function() {
                        $("#category-" + $(this).attr('data-value')).prop('checked', false);
                        $("input[name='pagination']").val(0);
                        $(this).parent().remove();
                        $("input[name='pagination']").val('0');
                        filterProducts(0);
                    });
                });

                // Categories Checking
                $("#filter-categories input").each(function() {
                    //$(".hierarchy").remove();
                    if (!$(this).is(':checked')) {
                        $('#hierarchy-' + $(this).val()).remove();
                    }
                });
                // Discount
                $("#filter-discounts input:checked").each(function() {
                    filter.discount.push($(this).val());
                });
                // Brands
                $("#filter-brands input:checked").each(function() {
                    filter.brand.push($(this).val());
                });
                console.log("--------------------------------------------------");
                console.log(filter.brand);
                // Colors
                $("#filter-colors input:checked").each(function() {
                    filter.color.push($(this).val());
                });
                // Sizes
                $("#filter-sizes input:checked").each(function() {
                    filter.size.push($(this).val());
                });


                if (filter.group) {
                    var ghtm = '';
                    $.each(filter.group, function(index, value) {
                        ghtm += value + ',';
                    });
                    if (ghtm != '') {
                        url_params += 'group=' + ghtm.slice(0, -1) + '&';
                    }
                }

                if (filter.category) {
                    var ghtm = '';
                    $.each(filter.category, function(index, value) {
                        ghtm += value + ',';
                    });
                    if (ghtm != '') {
                        url_params += 'category=' + ghtm.slice(0, -1) + '&';
                    }
                }

                if (filter.brand) {
                    var ghtm = '';
                    $.each(filter.brand, function(index, value) {
                        ghtm += value + ',';
                    });
                    if (ghtm != '') {
                        url_params += 'brand=' + ghtm.slice(0, -1) + '&';
                    }
                }

                if (filter.color) {
                    var ghtm = '';
                    $.each(filter.color, function(index, value) {
                        ghtm += value + ',';
                    });
                    if (ghtm != '') {
                        url_params += 'color=' + ghtm.slice(0, -1) + '&';
                    }
                }

                if (filter.size) {
                    var ghtm = '';
                    $.each(filter.size, function(index, value) {
                        ghtm += value + ',';
                    });
                    if (ghtm != '') {
                        url_params += 'size=' + ghtm.slice(0, -1) + '&';
                    }
                }

                if (filter.discount) {
                    var ghtm = '';
                    $.each(filter.discount, function(index, value) {
                        ghtm += value + ',';
                    });
                    if (ghtm != '') {
                        url_params += 'discount=' + ghtm.slice(0, -1) + '&';
                    }
                }

                $("body").removeClass("open-menu");

                updateWindowHistoryUrl(url + '/products?' + url_params.slice(0, -1));

                $.ajax({
                    url: url + "/products",
                    type: "POST",
                    dataType: "json",
                    data: filter,
                    success: function(data) {
                        if (page == 0) {
                            if (data.brands) {
                                $("#filter-brands .filter-checkbox").css('display', 'none');
                                $.each(data.brands, function(i, value) {
                                    if (data.brands[i] == $("#brand-" + data.brands[i]).val()) {
                                        $("#brand-" + data.brands[i]).parent().css('display', 'block');
                                    }
                                });
                            }
                            if (data.categories) {
                                $("#filter-categories .filter-checkbox").css('display', 'none');
                                $.each(data.categories, function(i, value) {
                                    if (data.categories[i] == $("#category-" + data.categories[i]).val()) {
                                        $("#category-" + data.categories[i]).parent().css('display', 'block');
                                    }
                                });
                            }
                            if (data.sizes) {
                                $("#filter-sizes .filter-checkbox").css('display', 'none');
                                $.each(data.sizes, function(i, value) {
                                    if (data.sizes[i] == $("#size-" + data.sizes[i]).val()) {
                                        $("#size-" + data.sizes[i]).parent().css('display', 'block');
                                    }
                                });
                            }

                            $('.filter-checkbox input:checked').each(function() {
                                $(this).parent().css('display', 'block');
                            });

                        }
                        /*	if (tpn==0){
				filterProducts($("input[name='pagination']").val(),1);
				return false;
			}
        */
                        if (data.pagination != $("input[name='pagination']").val()) {
                            // Display pagination
                            $("input[name='pagination']").val(data.pagination);

                            if (page > 0) {
                                // Display products listing
                                $('#products-listing').append(data.products).slideDown();
                            } else {
                                // Display products listing
                                if (!data.products) {
                                    var notsrc = $('.notfoundimg').attr('src');
                                    $('#products-listing').html('<div id="not-found">' +
                                        '<h1>' + Translate('not_found') + '</h1>' +
                                        '<img src="' + notsrc + '">' +
                                        '</div>');
                                } else {
                                    $('#products-listing').html(data.products);
                                }

                                // Scroll to top after update products listing
                                if ($('.mobileDropDown:visible').length == 0) {
                                    scrollTopForFilter();
                                }
                            }
                        }
                    }
                });



            }

        });
    });