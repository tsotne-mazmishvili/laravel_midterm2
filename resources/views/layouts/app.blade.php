<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">



    <meta http-equiv="Cache-control" content="public">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf_token" content="WnJUIiAgrg34knCePRXsfizFPVvA84OVDZ0KIWYl">
    <link rel="icon" href="http://www.roniko.ge/favicon.ico" type="image/x-icon" sizes="16x16">
    <link rel="shortcut icon" href="http://www.roniko.ge/favicon.ico" type="image/x-icon" sizes="16x16">
    <title> რეგისტრაცია </title>
    <!-- Meta Tags & Additional Information -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Roniko.ge">
    <meta property="og:url" content="http://www.roniko.ge/register" />
    <meta property="og:image" content="" />
    <link rel="image_src" type="image/jpeg" href="" />
    <meta property="og:description" content="" />
    <meta property="og:title" content="  რეგისტრაცია  " />
    <meta name="title" content="  რეგისტრაცია  " />
    <meta name="description" content="" />
    <meta name="robots" content="index, follow" />

    <!-- CSS Stylesheets -->
    <link rel="stylesheet" href="{{ asset('register_assets/css/bootstrap.css')}}" type="text/css">
    <link rel="stylesheet" href="{{ asset('register_assets/css/font-awesome.css')}}" type="text/css">
    <link rel="stylesheet" href="{{ asset('register_assets/revolution-slider.css')}}" type="text/css">
    <link rel="stylesheet" href="{{ asset('register_assets/css/style.css')}}" type="text/css">
    <link rel="stylesheet" href="{{ asset('register_assets/css/max.css')}}" type="text/css">
    <link rel="stylesheet" href="{{ asset('register_assets/css/animate.css')}}" type="text/css">
    <link rel="stylesheet" href="{{ asset('register_assets/css/slick.css')}}" type="text/css">
    <link rel="stylesheet" href="{{ asset('register_assets/css/responsive.css')}}" type="text/css">
    <style>
        #site-header {
            box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
        }

        .breadcrumb>li>a {
            color: #263453;
        }

        #newsPage {
            background-image: url('http://www.roniko.ge/Uploads/images/background-news.png');
            background-repeat: no-repeat;
            background-size: 100%;
            min-height: 2400px;
        }

        .products-listing {
            margin-bottom: 50px;
        }

        #site-header {
            box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
        }

        .breadcrumb>li>a {
            color: #263453;
        }

        #newsPage {
            background-image: url('http://www.roniko.ge/Uploads/images/background-news.png');
            background-repeat: no-repeat;
            background-size: 100%;
            min-height: 2400px;
        }

        .product-item .product-image {
            height: 250px;
        }

        #ProductsListing .product-item {
            width: calc(33.33333% - 20px);
            margin-right: 0px;
            margin-left: 20px;
            margin-bottom: 20px;
            border: 15px solid rgba(38, 52, 83, 0.02);
        }

        .product-item:hover {
            box-shadow: 0px 0px 13px 5px rgba(0, 0, 0, 0.09);
        }

        #not-found {
            width: 100%;
            height: 100%;
            display: inline-block;
            background: #FFF;
            padding: 40px;
        }

        #not-found h1 {
            font-family: 'BPG Nino Mtavruli';
            font-weight: bold;
            font-size: 32px;
            text-align: center;
            color: #263453;
        }

        #not-found img {
            width: 750px;
            display: block;
            margin: 0px auto;
        }

        #end_of_page {
            display: inline-block;
            height: 50px;
            width: 100%;
        }

        .close {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 50px;
            overflow: hidden;
            zoom: 0.35;
            margin-top: 15px;
            margin-left: 15px;
        }

        .close::before,
        .close::after {
            content: '';
            position: absolute;
            height: 2px;
            width: 100%;
            top: 50%;
            left: 0;
            margin-top: -1px;
            background: #000;
        }

        .close::before {
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
        }

        .close::after {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }

        .close.thick::before,
        .close.thick::after {
            height: 4px;
            margin-top: -2px;
        }

        .close.blades::before,
        .close.blades::after {
            border-radius: 5px 0;
        }

        @media(max-width: 1400px) {
            #ProductsListing .product-item {
                width: calc(50% - 20px);
            }
        }

                #site-header {
            box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
        }

        .breadcrumb>li>a {
            color: #263453;
            text-transform: uppercase;
        }

        .inner-content h1 {
            font-family: 'BPG Nino Mtavruli';
            text-transform: uppercase;
            text-align: center;
            font-size: 28px;
            color: #263453;
        }

        .description {
            font-family: 'BPG Arial 2010';
            font-size: 16px;
            color: #263453;
        }

        footer#site-footer {
            visibility: visible !important;
        }
    </style>
    <script>
        var tday = "<span>დღე</span>";
        var thour = "<span>საათი</span>";
        var tminute = "<span>წუთი</span>";
    </script>

    <script type="text/javascript" src="{{ asset('register_assets/js/countdown.js')}}"></script>    

</head>
<body>


<!-- Header -->
    <header id="site-header">
        <div class="top-menu">
            <div class="site-container">
                <div class="social-link"><i class="siteicon share"></i></div>
                <ul class="social">
                    <li><a href="https://www.facebook.com/ronikooptics" target="_blank"><i class="socicon facebook"></i></a></li>
                    <li><a href="https://www.instagram.com/roniko_optics/" target="_blank"><i class="socicon instagram"></i></a></li>
                    <li><a href="https://plus.google.com/u/2/" target="_blank"><i class="socicon google"></i></a></li>
                    <li><a href="https://www.youtube.com/user/ronikooptics/videos" target="_blank"><i class="socicon youtube"></i></a></li>
                </ul>

                <div class="top-menu-settings">
                    <div class="settings-register">
                        @guest
                            <a id="LoginButton" href="{{ route('login') }}"><i class="siteicon auth"></i><span>შესვლა</span></a>
                            @if (Route::has('register'))
                            @csrf
                                <a class='forRegister' href="{{ route('register') }}">რეგისტრაცია</a>
                            @endif
                        @else
                            <a id="ProfileLink" href="http://www.roniko.ge/ka/profile">
                                <font>გამარჯობა&nbsp; {{ Auth::user()->name }} <span class="caret"></span></font>
                                <div class="profile-image"><img src="http://www.roniko.ge/Uploads/users/icon-profile.png"></div>
                            </a>
                            <ul class="profile-dropdown">
                                <li><a href="http://www.roniko.ge/ka/profile"><i class="icon icon-user"></i> პროფილი</a></li>
                                <li><a href="{{ route('logout') }}" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();"><i class="icon icon-logout"></i> გამოსვლა</a></li>
{{--                                     <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a> --}}
                            </ul>                            
{{--                                 <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a> --}}

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">


                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                        @endguest
                    </div>
                </div>
            </div>
        </div>
        <div class="header">
            <div class="site-container">
                <div class="btns-left">
                    <div id="menu-toggle" class="btn-menu">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <!--
          <div class="btn-search">
            <i class="siteicon search"></i>
          </div>
--></div>
                <a href="{{ route("indexproducts")}}" class="site-logo"><img src="http://www.roniko.ge/Templates/default/assets/images/1497467000-რონიკო.png"></a>
                <div class="btns-right">
                    <div class="btn-wishlist">
                        <a href='http://www.roniko.ge/ka/wishlist'>
            <i class="siteicon wishlist"></i>
            <span>0</span>
            </a>
                    </div>
                    <a href="{{ route('userproducts')}}" class="btn-cart">
            <i class="siteicon cart"></i>
            <span>0</span>
          </a>
                    <div id="side-cart">
                        <div id="cart-inner">
                            <span class="cart-notification">კალათა ცარიელია</span>
                        </div>
                        <div class="subtotal item" style="display: none;">
                            კალათის ჯამი <span><span class="Price-amount amount">0.00 <i class="lari lari-bold"></i></span></span>
                        </div>
                        <div class="buttons item">
                            <a href="{{ route('userproducts')}}" class="btn large full accent">კალათის ნახვა</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </header>
    <!-- End of Header -->


    <div id="app">
        {{-- <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Regisasdasfter') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav> --}}

        <main class="py-4">
            @yield('content')
        </main>
    </div>



            <!-- Footer -->
            <footer id="site-footer" class="wow fadeIn" data-wow-duration="3s" style="">
                <div id="footer-elements-1">
                    <div class="site-container">
                        <a href="http://www.roniko.ge/ka" class="footer-logo"><img src="http://www.roniko.ge/Templates/default/assets/images/1497485856-რონიკო თეთრი.png"></a>
                        <div class="footer-text">
                            <p>რონიკოსთან ერთად უკეთესად ხედავთ და შესანიშნავად გამოიყურებით..</p>
                        </div>
                        <ul class="social">
                            <li><a href="https://www.facebook.com/ronikooptics" target="_blank"><i class="socicon facebook"></i></a></li>
                            <li><a href="https://www.instagram.com/roniko_optics/" target="_blank"><i class="socicon instagram"></i></a></li>
                            <li><a href="https://plus.google.com/u/2/" target="_blank"><i class="socicon google"></i></a></li>
                            <li><a href="https://www.youtube.com/user/ronikooptics/videos" target="_blank"><i class="socicon youtube"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div id="footer-elements-2">
                    <div class="site-container">
                        <div id="newsletter" class="col-md-12">
                            <div class="col-md-5">
                                <h1>გამოიწერეთ სიახლეები და გაიგეთ ყველაფერი ჩვენ შესახებ</h1>
                            </div>
                            <div class="col-md-7">
                                <input type="text" name="newsletter_email" spellcheck="false" placeholder="ჩაწერეთ ელ.ფოსტა" value="">
                                <input type="submit" name="newsletter_submit" value="გაგზავნა">
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer-elements-3">
                    <div class="site-container">
                        <div class="row">

                            <div class="col-xs-6 col-sm-2">
                                <div class="footer_box">
                                    <a href="#">
                                        <h5>ჩვენ შესახებ</h5>
                                    </a>
                                    <ul class="list-unstyled">
                                        <li><a href="/page/history">ისტორია</a></li>
                                        <li><a href="/blog/category/3">რჩევები</a></li>
                                        <li><a href="http://www.roniko.ge/admin/pages/edit/18">მისამართები და ტელეფონის ნომრები</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-2">
                                <div class="footer_box">
                                    <a href="#">
                                        <h5>მომსახურება</h5>
                                    </a>
                                    <ul class="list-unstyled">
                                        <li><a href="/page/ophthalmologist-office">ოფთალმოლოგიური კაბინეტი </a></li>
                                        <li><a href="/page/eye-clinic">ოფთალმოლოგიური ცენტრი</a></li>
                                        <li><a href="/page/create-eyeglasses">სათვალის დამზადება</a></li>
                                        <li><a href="/page/საკურიერო-მომსახურება">საკურიერო მომსახურება</a></li>
                                        <li><a href="/page/საკურიერო-მომსახურება-რეგიონებში">საკურიერო მომსახურება რეგიონებში</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-2">
                                <div class="footer_box">
                                    <a href="/blog">
                                        <h5>ბლოგი</h5>
                                    </a>
                                    <ul class="list-unstyled">
                                        <li><a href="/blog/category/1">მედია</a></li>
                                        <li><a href="/blog/category/2">ანონსი</a></li>
                                        <li><a href="/blog/category/5">ტენდენციები</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-2">
                                <div class="footer_box">
                                    <a href="/products?sorting=0&price_from=0&price_to=1290&sale=1&discount=2">
                                        <h5>აქციები</h5>
                                    </a>
                                    <ul class="list-unstyled">
                                    </ul>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-2">
                                <div class="footer_box">
                                    <a href="/faq">
                                        <h5>F.A.Q</h5>
                                    </a>
                                    <ul class="list-unstyled">
                                        <li><a href="/page/terms-and-rules">წესები და პირობები</a></li>
                                        <li><a href="/page/privacy-policy">უსაფრთხოება</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-2">
                                <div class="footer_box">
                                    <a href="/contact">
                                        <h5>კონტაქტი</h5>
                                    </a>
                                    <ul class="list-unstyled">
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div id="footer-elements-4">
                    <div class="site-container">
                        <div class="col-md-12">
                            <div class="col-md-6">
                                <span class="copyright">© 2017 | Privacy Policy</span>
                            </div>
                            <div class="col-md-6">
                                <span class="developedby">CREATED BY - <a href="http://www.lemons.ge/" target='_BLANK' class="lemons"><span class="lemons-title">LEMONS</span></a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->


    <script type="text/javascript" src="{{ asset('register_assets/js/compiled/chat_popup.js')}}"></script>
            <script type="text/javascript">
                Mibew.ChatPopup.init({
                    "id": "59523dadd3de9c77",
                    "url": "\/mibew\/chat?locale=ka",
                    "preferIFrame": true,
                    "modSecurity": false,
                    "width": 640,
                    "height": 540,
                    "resizable": true,
                    "styleLoader": "\/mibew\/chat\/style\/popup"
                });
            </script>
            <!-- / mibew button -->


            <!-- Footer Scripts -->
            <!-- Placed at the end of the document so the pages load faster -->
            <script>
                window.fbAsyncInit = function() {
                    FB.init({
                        appId: '1899931160222509',
                        cookie: true,
                        xfbml: true,
                        version: 'v2.8'
                    });
                    FB.AppEvents.logPageView();
                };

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            </script>

            <!-- Facebook Pixel Code -->

            <script>
                ! function(f, b, e, v, n, t, s) {
                    if (f.fbq) return;
                    n = f.fbq = function() {
                        n.callMethod ?

                            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                    };
                    if (!f._fbq) f._fbq = n;

                    n.push = n;
                    n.loaded = !0;
                    n.version = '2.0';
                    n.queue = [];
                    t = b.createElement(e);
                    t.async = !0;

                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s)
                }(window,

                    document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

                fbq('init', '1581987225431734'); // Insert your pixel ID here.

                fbq('track', 'PageView');
            </script>

            <noscript><img height="1" width="1" style="display:none"

src="https://www.facebook.com/tr?id=1581987225431734&ev=PageView&noscript=1"

/></noscript>


            <script type="text/javascript">
                /* <![CDATA[ */
                var google_conversion_id = 853036389;
                var google_conversion_language = "en";
                var google_conversion_format = "3";
                var google_conversion_color = "ffffff";
                var google_conversion_label = "E3VqCJ71_HIQ5ZrhlgM";
                var google_remarketing_only = false;
                /* ]]> */
            </script>
            <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
            </script>
            <noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/853036389/?label=E3VqCJ71_HIQ5ZrhlgM&amp;guid=ON&amp;script=0"/>
</div>
</noscript>

            <!-- DO NOT MODIFY -->

            <!-- End Facebook Pixel Code -->

            <script>
                (function(i, s, o, g, r, a, m) {
                    i['GoogleAnalyticsObject'] = r;
                    i[r] = i[r] || function() {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date();
                    a = s.createElement(o),
                        m = s.getElementsByTagName(o)[0];
                    a.async = 1;
                    a.src = g;
                    m.parentNode.insertBefore(a, m)
                })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
                ga('create', 'UA-98136392-1', 'auto');
                ga('send', 'pageview');
            </script>
            <script src="{{ asset('register_assets/js/vendor/jssor.slider.min.js')}}"></script>
            <script src="{{ asset('register_assets/register_assets/register_assets/js/vendor/jquery.js')}}"></script>
            <script src="{{ asset('register_assets/register_assets/js/vendor/vendor/jqueryui.js')}}"></script>
            <script src="{{ asset('register_assets/js/vendor/require.js')}}"></script>
            <script type="text/javascript">
                require.config({
                    baseUrl: ' {{ asset('register_assets/') }}'
                });
                require(['js/common'], function(common) {
                    require.config({
                        baseUrl: ' {{ asset('register_assets/js/') }}'
                    });
                    require(['app/auth'], function() {

                    });
                });
            </script>

</body>
</html>
