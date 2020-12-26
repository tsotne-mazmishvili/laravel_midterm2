define([

        'jquery',

        'bootstrap',

        'TweenMax',

        'vendor/swal'

    ],



    function($, model, TweenMax) {

        'use strict';

        var url = document.location.origin + '';
        (function(url) {
            // Create a new `Image` instance
            var image = new Image();

            image.onload = function() {
                // Inside here we already have the dimensions of the loaded image
                var style = [
                    // Hacky way of forcing image's viewport using `font-size` and `line-height`
                    'font-size: 1px;',
                    'line-height: ' + this.height + 'px;',

                    // Hacky way of forcing a middle/center anchor point for the image
                    'padding: ' + this.height * .5 + 'px ' + this.width * .5 + 'px;',

                    // Set image dimensions
                    'background-size: 50px;',

                    // Set image URL
                    'background: url(' + url + ');'
                ].join(' ');

                console.log('%c', style);
            };

            // Actually loads the image
            image.src = url;
        })(url + '/Public/images/console-logo.png');

        var navigationMenu = jQuery('.menu');

        var SidebarMenuToggle = jQuery('#menu-toggle');

        var SidebarMenu = jQuery('.sidebar-menu');
        $(document).ready(function() {
            $(window).scroll(function() {


                var div = document.getElementById('onlineHelp');
                var deg = 0;

                if (($(window).scrollTop() + $(window).height()) == ($(document).height())) {
                    deg = -90;
                    $('#onlineHelp').css({
                        "bottom": '50%',
                        'right': '-77px',
                        'height': '50px'
                    });
                } else {
                    $('#onlineHelp').css({
                        'bottom': '0',
                        'right': '20px',
                        'height': 'auto'
                    });
                }
                div.style.webkitTransform = 'rotate(' + deg + 'deg)';
                div.style.mozTransform = 'rotate(' + deg + 'deg)';
                div.style.msTransform = 'rotate(' + deg + 'deg)';
                div.style.oTransform = 'rotate(' + deg + 'deg)';
                div.style.transform = 'rotate(' + deg + 'deg)';
            });
        });

        $(function() {

            // Sidebar Menu

            SidebarMenuToggle.click(function() {

                if (SidebarMenu.hasClass('active')) {

                    SidebarMenuToggle.removeClass('remove-button');

                    SidebarMenu.removeClass('active');

                } else {

                    SidebarMenu.addClass('active');

                    SidebarMenuToggle.addClass('remove-button');

                }

                $("#site-header .menu .submenu").parent().find('a').removeClass('active');
                $("#site-header .menu .submenu").removeClass('active');
                $("#site-header .menu .submenu").css('display', 'none');

            });



            // Find Dropdown Item and click on it -> open submenu

            navigationMenu.find('li.menu__item.dropdown a').on('click', function() {

                var submenu = jQuery(this);

                $("#menu-toggle").removeClass('remove-button');
                $("aside.sidebar-menu").removeClass('active');

                openSubMenu(this);

            });



            // Open Submenu Function to fire

            function openSubMenu(el) {

                var self = this;

                var $el = jQuery(el);

                if (!$el.hasClass('active')) {

                    closeActiveSubMenu();

                    $el.addClass('active').next().stop(true, true).addClass('active').slideDown('fast');

                    $el.parent().find('.submenu-list > li.submenu__item').hover(function() {

                        if ($(this).hasClass('active')) {

                            //$(this).removeClass('active');

                        } else {

                            $el.parent().find('.submenu-items .submenu-items-content').hide().html($(this).attr('data-menu')).fadeIn('slow');

                            $el.parent().find('.submenu-list > li.submenu__item.active').removeClass('active');

                            $(this).addClass('active');

                        }

                    }, function() {

                        //$el.parent().find('.submenu-items .submenu-items-content').html($(this).attr('data-menu'));

                    });

                    //TweenMax.fromTo($el.parent().find('.submenu-list'), .9, {autoAlpha:0, width:0, immediateRender:true}, {autoAlpha:1, visibility: 'visible', width:'100%', ease:Expo.easeOut, delay:0.5});

                    //TweenMax.fromTo($el.parent().find('.submenu-image'), .9, {autoAlpha:0, width:0, immediateRender:true}, {autoAlpha:1, visibility: 'visible', width:'auto', ease:Expo.easeOut, delay:0.5});



                } else {

                    $el.removeClass('active').next().stop(true, true).removeClass('active').slideUp('fast');

                }

            }



            // Close Active Submenu

            function closeActiveSubMenu() {

                var self = this;

                var $opened = navigationMenu.find('li.menu__item.dropdown a.active');

                if ($opened.length) {

                    $opened.removeClass('active').next().stop(true, true).removeClass('active').slideUp('fast');

                }

            }

        });

        // Get the modal
        var modal = document.getElementById('LoginModal');

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        $("#LoginButton").click(function() {
            $("#LoginModal").css('display', 'block');
        });

        $(document).on('click', '[name="newsletter_submit"]', function() {
            $('#SubscribeModal').modal('show');
        });

        $(document).on('click', '.modal .close', function() {
            $('.modal').modal('hide');
        });

        $(document).on('click', '.ButtonLogin', function(e) {
            e.preventDefault();
            var $this = $(this);
            if (!$this.hasClass('loading')) {
                $this.button('loading');
                $this.addClass('loading');
                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    data: {
                        'email': $('[name="login_username"]').val(),
                        'password': $('[name="login_password"]').val()
                    },
                    url: url + "/check_user",
                    success: function(data) {
                        $this.button('reset');
                        $this.removeClass('loading');
                        if (data.code == 0) {
                            sweetAlert({
                                title: data.title,
                                text: data.text,
                                type: "error"
                            });
                        }
                        if (data.code == 1) {
                            sweetAlert({
                                    title: data.title,
                                    text: data.text,
                                    type: "error",
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    cancelButtonText: data.close,
                                    confirmButtonText: data.register,
                                    closeOnConfirm: false
                                },
                                function(isConfirm) {
                                    if (isConfirm) {
                                        window.location.href = data.register_url;
                                    }
                                });
                        }
                        if (data.code == 2) {
                            sweetAlert({
                                    title: data.title,
                                    text: data.text,
                                    type: "error",
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    cancelButtonText: data.close,
                                    confirmButtonText: data.recover,
                                    closeOnConfirm: false
                                },
                                function(isConfirm) {
                                    if (isConfirm) {
                                        window.location.href = data.recover_url;
                                    }
                                });
                        }
                        if (data.code == 3) {
                            $("#loginForm").submit();
                        }
                    }
                });
            }
        });

        $(document).on('click', '.addSubscribe', function() {
            var $this = $(this);
            if (!$this.hasClass('loading')) {
                $this.addClass('loading');
                $this.button('loading');
                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    data: {
                        'email': $('[name="newsletter_email"]').val(),
                        'products': $('[name="subscribeproductcat"]:checked').serialize(),
                        'news': $('[name="subscribenewsfirst"]:checked').serialize(),
                    },
                    url: url + "/api/addsubscriber",
                    success: function(data) {
                        $this.button('reset');
                        $this.removeClass('loading');
                        if (data.code == 0) {
                            sweetAlert({
                                title: data.title,
                                text: data.text,
                                type: "error"
                            });
                        } else {
                            sweetAlert({
                                title: data.title,
                                text: data.text,
                                type: "success"
                            });
                            $('.modal').modal('hide');
                            $('[name="newsletter_email"]').val('');
                            $('[name="subscribeproductcat"]:checked').each(function() {
                                $(this).prop('checked', False);
                            });
                            $('[name="subscribenewsfirst"]:checked').each(function() {
                                $(this).prop('checked', False);
                            });

                        }


                    }
                });
            }
        });

        $(document).on('click', '.mobileFilters', function() {
            if ($('.products-filters').is(':visible')) {
                $(this).removeClass('mobileClose');
                $('.products-filters').stop().fadeOut();
            } else {
                $(this).addClass('mobileClose');
                $('.products-filters').stop().fadeIn();
            }
        });

        $(document).on('click', 'h3.filter-title', function() {
            var dropped = $(this).find('.mobileDropDown');
            if (dropped.is(':visible')) {
                if (dropped.hasClass('DropUp')) {
                    dropped.removeClass('DropUp');
                    $(this).next('.mobileHide').stop().slideUp();
                } else {
                    dropped.addClass('DropUp');
                    $(this).next('.mobileHide').stop().slideDown();
                }
            }
        });

        $(document).on('click', '.discard_subscribe', function() {
            var $this = $(this);
            if (!$this.hasClass('loading')) {
                $this.addClass('loading');
                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    data: {
                        'un': 1
                    },
                    url: url + "/profile/unsubscribe",
                    success: function(data) {
                        $this.remove();
                        sweetAlert({
                            title: data.title,
                            text: data.text,
                            type: "success"
                        });



                    }
                });
            }
        });

        $(document).on('click', '.cvDownload', function() {
            var $this = $(this);
            if (!$this.hasClass('loading')) {
                $this.button('loading');
                $this.addClass('loading');
                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    data: {
                        'html': $('.inner-content').html()
                    },
                    url: url + "/api/downloadcv",
                    success: function(data) {
                        $this.button('reset');
                        sweetAlert({
                            title: data.title,
                            text: data.text,
                            type: "success"
                        });



                    }
                });
            }
        });

        /*
          $('#ButtonLogin').click(function(event) {
            event.preventDefault();

            var username = document.querySelector('[name="login_username"]').value;
            var password = document.querySelector('[name="login_password"]').value;
            if($("#remember").is(":checked")) {
              var remember = "1";
            } else {
              var remember = "0";
            }

            if(username != '' && password != '') {
              $.ajax({
                type:"POST",
                data: {_token: $('[name="csrf_token"]').attr('content')},
                url: url+"/api/login",
                data: { username:username, password:password, remember:remember },
                success: function (data) {
                  if(data === 'success') {
                    sweetAlert({
                      title: "გილოცავთ",
                      text:  "თქვენ წარმატებით გაიარეთ ავტორიზაცია",
                      type:  "success"
                    },
                    function(){
                      window.location.href = url+'/profile';
                    });
                  } else {
                    sweetAlert("შეცდომაა", "გთხოვთ შეამოწმოთ თქვენს მიერ შეყვანილი მონაცემები.", "error");
                  }
                }
              });
            } else {
              sweetAlert("შეცდომაა", "გთხოვთ შეამოწმოთ თქვენს მიერ შეყვანილი მონაცემები.", "error");
            }

            return false;

          });*/

        // if($('#PSWDIndicator').length > 0) {
        //  $('#PSWDIndicator').pwstrength();
        // }
        $(document).on('click', '[name="newsletter_submit"]', function() {


        });

    });