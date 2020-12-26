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
        'sweetAlert',
        'jQueryForm'

    ],

    function($, model, Imager, revolution, jqueryui) {
        'use strict';

        var TimeOutOfSlider = 50; // Start Slider after 500ms

        $(function() {
            var $ = jQuery.noConflict();
            var url = $("input[name='site_url']").val();

            // Translate
            function Translate(name = '') {
                var json = JSON.parse($("input[name='translate']").val());
                return json[name];
            }

            var register_switcher = $("#register_switcher label input[name='type']");

            // Switcher Register User Types
            register_switcher.on('change', function() {
                if ($(this).val() === '2') {
                    // Physical Person Register
                    $(".physical_person_section").css('display', 'none');
                    $(".legal_entity_section").css('display', 'block');
                } else if ($(this).val() === '1') {
                    // Legal Entity Register
                    $(".physical_person_section").css('display', 'block');
                    $(".legal_entity_section").css('display', 'none');
                }
                //ButtonRegister();
            });

            function ButtonRegister() {
                $("#Auth #content #AuthForm #ButtonRegister").each(function() {
                    $(this).click(function(event) {
                        event.preventDefault();

                        if ($('.physical_person_section').is(':visible')) {
                            var type_switcher = '1';
                        } else {
                            var type_switcher = '2';
                        }

                        if (type_switcher == '1') {
                            var name = document.querySelector('.physical_person_section [name="name"]').value;
                            var lastname = document.querySelector('.physical_person_section [name="lastname"]').value;
                            var password = document.querySelector('.physical_person_section [name="password"]').value;
                            var phone = document.querySelector('.physical_person_section [name="phone"]').value;
                            var pin = document.querySelector('.physical_person_section [name="pin"]').value;
                            var email = document.querySelector('.physical_person_section [name="email"]').value;
                            var address = document.querySelector('.physical_person_section [name="address"]').value;
                            var company = '';
                            var code = '';

                            if (name != '' && lastname != '' && password != '' && phone != '' && email != '' && address != '' && pin != '') {
                                $.ajax({
                                    type: "POST",
                                    url: url + "/register",
                                    data: {
                                        _token: @json(csrf_token()),
                                        type_switcher: type_switcher,
                                        name: name,
                                        lastname: lastname,
                                        password: password,
                                        company: company,
                                        code: code,
                                        phone: phone,
                                        email: email,
                                        address: address,
                                        pin: pin
                                    },
                                    success: function(data) {
                                        if (data === 'success') {
                                            sweetAlert({
                                                    title: Translate('gilocavt'),
                                                    text: Translate('tqven_warmatebit_daregistrirdit'),
                                                    type: "success"
                                                },
                                                function() {
                                                    window.location.href = url + '/profile';
                                                });
                                        } else {
                                            if (data == 'id_error') {
                                                sweetAlert(Translate('error'), Translate('correct_id'), "error");
                                            } else {
                                                if (data == 'name_error') {
                                                    sweetAlert(Translate('error'), Translate('name_error'), "error");
                                                } else {
                                                    sweetAlert(Translate('error'), Translate('am_elfostit_ukve_daregistrirebulia_moxmarebeli'), "error");
                                                }

                                            }


                                        }
                                    }
                                });
                            } else {
                                if ($('.physical_person_section [name="name"]').val() == '') {
                                    $('.physical_person_section [name="name"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.physical_person_section [name="name"]').css('border-bottom', '1px solid #263453');
                                }
                                if ($('.physical_person_section [name="lastname"]').val() == '') {
                                    $('.physical_person_section [name="lastname"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.physical_person_section [name="lastname"]').css('border-bottom', '1px solid #263453');
                                }
                                if ($('.physical_person_section [name="password"]').val() == '') {
                                    $('.physical_person_section [name="password"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.physical_person_section [name="password"]').css('border-bottom', '1px solid #263453');
                                }
                                if ($('.physical_person_section [name="phone"]').val() == '') {
                                    $('.physical_person_section [name="phone"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.physical_person_section [name="phone"]').css('border-bottom', '1px solid #263453');
                                }
                                if ($('.physical_person_section [name="pin"]').val() == '' || !$.isNumeric($('.physical_person_section [name="pin"]').val()) || $('.physical_person_section [name="pin"]').val().length !== 11) {
                                    $('.physical_person_section [name="pin"]').css('border-bottom', '1px solid #bb0606');

                                } else {
                                    $('.physical_person_section [name="pin"]').css('border-bottom', '1px solid #263453');
                                }
                                if ($('.physical_person_section [name="email"]').val() == '') {
                                    $('.physical_person_section [name="email"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.physical_person_section [name="email"]').css('border-bottom', '1px solid #263453');
                                }
                                if ($('.physical_person_section [name="address"]').val() == '') {
                                    $('.physical_person_section [name="address"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.physical_person_section [name="address"]').css('border-bottom', '1px solid #263453');
                                }
                                sweetAlert(Translate('error'), Translate('gtxovt_sheavsot_aucilebeli_velebi'), "error");
                            }

                        } else {
                            var name = '';
                            var lastname = '';
                            var password = document.querySelector('.legal_entity_section [name="password"]').value;
                            var company = document.querySelector('.legal_entity_section [name="company"]').value;
                            var code = document.querySelector('.legal_entity_section [name="code"]').value;
                            var phone = document.querySelector('.legal_entity_section [name="phone"]').value;
                            var email = document.querySelector('.legal_entity_section [name="email"]').value;
                            var address = document.querySelector('.legal_entity_section [name="address"]').value;
                            var contact_person = document.querySelector('.legal_entity_section [name="contact_person"]').value;
                            var pin = '';

                            if (company != '' && code != '' && password != '' && phone != '' && email != '' && address != '') {
                                $.ajax({
                                    type: "POST",
                                    url: url + "/register",
                                    data: {
                                        _token: @json(csrf_token()),
                                        type_switcher: type_switcher,
                                        name: name,
                                        lastname: lastname,
                                        password: password,
                                        company: company,
                                        code: code,
                                        phone: phone,
                                        email: email,
                                        address: address,
                                        pin: pin  
                                    },
                                    success: function(data) {
                                        if (data === 'success') {
                                            sweetAlert({
                                                    title: Translate('gilocavt'),
                                                    text: Translate('tqven_warmatebit_daregistrirdit'),
                                                    type: "success"
                                                },
                                                function() {
                                                    window.location.href = url + '/profile';
                                                });
                                        } else {
                                            sweetAlert(Translate('error'), Translate('am_elfostit_ukve_daregistrirebulia_moxmarebeli'), "error");
                                        }
                                    }
                                });
                            } else {
                                if ($('.legal_entity_section [name="company"]').val() == '') {
                                    $('.legal_entity_section [name="company"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.legal_entity_section [name="company"]').css('border-bottom', '1px solid #263453');
                                }
                                if ($('.legal_entity_section [name="code"]').val() == '') {
                                    $('.legal_entity_section [name="code"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.legal_entity_section [name="code"]').css('border-bottom', '1px solid #263453');
                                }
                                if ($('.legal_entity_section [name="password"]').val() == '') {
                                    $('.legal_entity_section [name="password"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.legal_entity_section [name="password"]').css('border-bottom', '1px solid #263453');
                                }
                                if ($('.legal_entity_section [name="phone"]').val() == '') {
                                    $('.legal_entity_section [name="phone"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.legal_entity_section [name="phone"]').css('border-bottom', '1px solid #263453');
                                }
                                if ($('.legal_entity_section [name="email"]').val() == '') {
                                    $('.legal_entity_section [name="email"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.legal_entity_section [name="email"]').css('border-bottom', '1px solid #263453');
                                }
                                if ($('.legal_entity_section [name="address"]').val() == '') {
                                    $('.legal_entity_section [name="address"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.legal_entity_section [name="address"]').css('border-bottom', '1px solid #263453');
                                }
                                if ($('.legal_entity_section [name="contact_person"]').val() == '') {
                                    $('.legal_entity_section [name="contact_person"]').css('border-bottom', '1px solid #bb0606');
                                } else {
                                    $('.legal_entity_section [name="contact_person"]').css('border-bottom', '1px solid #263453');
                                }
                                sweetAlert(Translate('error'), Translate('gtxovt_sheavsot_aucilebeli_velebi'), "error");
                            }
                        }

                        return false;
                    });
                });
            }
            ButtonRegister();

            // fairly standard configuration, importantly containing beforeShowDay and onChangeMonthYear custom methods
            $("#datepicker").datepicker({
                beforeShow: function(input, inst) {
                    inst.dpDiv.css({
                        marginTop: -input.offsetHeight + 'px',
                        marginLeft: input.offsetWidth + 50 + 'px'
                    });
                },
                changeMonth: true,
                changeYear: true,
                showOtherMonths: true,
                selectOtherMonths: true,
                altField: '#date_due',
                altFormat: 'yy-mm-dd',
                firstDay: 1,
                showOn: "button",
                buttonImage: "/Public/images/calendar.png",
                buttonImageOnly: true,
                buttonText: "Select date"
            });

            $.datepicker.regional.ka = {
                closeText: "დახურვა",
                prevText: "&#x3c; წინა",
                nextText: "შემდეგი &#x3e;",
                currentText: "დღეს",
                monthNames: [
                    "იანვარი",
                    "თებერვალი",
                    "მარტი",
                    "აპრილი",
                    "მაისი",
                    "ივნისი",
                    "ივლისი",
                    "აგვისტო",
                    "სექტემბერი",
                    "ოქტომბერი",
                    "ნოემბერი",
                    "დეკემბერი"
                ],
                monthNamesShort: [
                    "იანვარი",
                    "თებერვალი",
                    "მარტი",
                    "აპრილი",
                    "მაისი",
                    "ივნისი",
                    "ივლისი",
                    "აგვისტო",
                    "სექტემბერი",
                    "ოქტომბერი",
                    "ნოემბერი",
                    "დეკემბერი"
                ],
                yearRange: "-100:+0",
                //monthNamesShort: [ "იან","თებ","მარ","აპრ","მაი","ივნ", "ივლ","აგვ","სექ","ოქტ","ნოე","დეკ" ],
                dayNames: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"],
                dayNamesShort: ["კვ", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"],
                dayNamesMin: ["კვ", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"],
                weekHeader: "კვირა",
                dateFormat: "dd-mm-yy",
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ""
            };
            $.datepicker.setDefaults($.datepicker.regional.ka);


            $('#photoimg').on('change', function() {
                $("#cropimage").ajaxForm({
                    target: '#cropimagecontainer'
                }).submit();

            });


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

        });
    });