@extends('layouts.app')

@section('content')

<!-- Slider -->
<section id="site-slider" class="main2-slider">
    <div class="tp-banner-container">
        <div class="tp-banner">
            <ul>
                <li data-transition="fade" data-slotamount="1" data-masterspeed="1000" data-thumb="http://www.roniko.ge/media/pictures/2500/1600091048-KjMJZYQN.jpg" data-saveperformance="off" data-title="Roniko">
                    <img src="http://www.roniko.ge/media/pictures/2500/1600091048-KjMJZYQN.jpg" alt="" data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat">
                    <div class="site-container">
                        <div class="tp-caption sfl sfb tp-resizeme" data-x="center" data-hoffset="none" data-y="center" data-voffset="-50" data-speed="1500" data-start="1000" data-splitin="none" data-splitout="none" data-elementdelay="0.01" data-endelementdelay="0.3" data-endspeed="1200"
                            data-endeasing="Power3.easeInOut" data-width="['600']" data-height="none" data-whitespace="nowrap" style="z-index: 4; max-width: auto; max-height: auto; white-space: nowrap;top: 50px;">
                            <h1 class="slider-title"></h1>
                        </div>
                        <div class="tp-caption sfl sfb tp-resizeme" data-x="center" data-hoffset="none" data-y="center" data-voffset="50" data-speed="1500" data-start="1500" data-splitin="none" data-splitout="none" data-elementdelay="0.01" data-endelementdelay="0.3" data-endspeed="1200"
                            data-endeasing="Power4.easeIn" data-width="['600']" data-height="none" data-whitespace="nowrap" style="z-index: 4; max-width: auto; max-height: auto; white-space: nowrap;top: 50px;">
                            <h2 class="slider-small-title">
                                <p><br></p>
                            </h2>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="tp-bannertimer"></div>
        </div>
    </div>
</section>

<div id="ProductsListing" class="dataPageWrapper asyncWrapper">
    <div class="dataPageContent" style="background-color: #FFF;" data-page="newsPage">
        <div id="dataPageContainer" class="site-container">
            <ul class="breadcrumb">
                <li><a href="http://www.roniko.ge/ka"><i class="siteicon home2"></i></a></li>
                <li><a href="http://www.roniko.ge/ka/products">ონლაინ მაღაზია</a></li>
            </ul>

            <span class='mobileFilters'></span>
        </div>
        <div class="pageData">
            <div id="container-fluid" class="site-container">
                <div class="row">
                    <div class="col-md-12">
                        <input type="hidden" name="pagination" value="1">
                        <input type="hidden" name="max_page" value="10000000">
                        <div class="products-filters">
                            @yield('filterproduct')
                        </div>
                        <div id="products-listing" class="products-listing">
                            @yield('listproduct')
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection