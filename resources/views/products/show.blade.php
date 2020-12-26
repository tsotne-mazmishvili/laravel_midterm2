@extends('layouts.app')

@section('content')
    <div class="dataPageWrapper asyncWrapper productWrapper">

	<div class="dataPageContent asyncContent productPage" data-page="productPage">
			<div id="dataPageContainer" class="site-container">

                <div id="productPageSocialSide">

                    <ul class="social">

                        <li><a href="https://www.facebook.com/sharer/sharer.php?u=http://www.roniko.ge/ka/product/278" target="_blank"><i class="socicon facebook"></i></a></li>

                        <li><a href="http://twitter.com/" target="_blank"><i class="socicon twitter"></i></a></li>

                        <li><a href="http://linkedin.com/" target="_blank"><i class="socicon linkedin"></i></a></li>

                        <li><a href="http://instagram.com/" target="_blank"><i class="socicon instagram"></i></a></li>

                        <li><a href="http://google.com/" target="_blank"><i class="socicon google"></i></a></li>

                        <li><a href="http://youtube.com/" target="_blank"><i class="socicon youtube"></i></a></li>

                    </ul>

                </div>
                <div id="productPageContent">

                    <ul class="breadcrumb">

                        <li><a href="http://www.roniko.ge/ka"><i class="siteicon home2"></i></a></li>

                        <li><a class="color-grey" href="http://www.roniko.ge/ka/products">პროდუქტი</a></li>

                        <li><a class="color-grey" href="http://www.roniko.ge/ka/products?category=1">მზის სათვალეები</a></li>

                        <li><a class="color-bold" href="http://www.roniko.ge/ka/products?brand=23">George Piralli</a></li>

                    </ul>
<div id="productFull">
 	<div id="ProductGallery" class="col-md-5 col-sm-12 col-xs-12">
		<div class="product-gallery wow fadeIn" data-wow-duration="2s" data-wow-delay="0s">

		    <div class="clearfix">

		        <ul class="bxslider">

		        </ul>

		        <div id="bx-pager">
		            <a data-slide-index="0" href=""><span class="helper"></span><img src="{{ $product->image }}" alt="" /></a>
		        </div>

		    </div>

		    <div id="product-tryon">

		        <!--<a class="tryon-product" href=""><i class="siteicon eyeglasses-new"></i> <span>მოირგე სათვალე</span></a>-->

		    </div>
		    <div id="gifts" class="col-md-12 col-sm-12 col-xs-12 productPageGift">
		    </div>
		</div>
	</div>

	<div id="ProductInfo" class="col-md-5 col-sm-12 col-xs-12">
		<div class="product-info">
				<input type="hidden" name="product_type" value="1">
	            <div class="info-item">
	                <span class="info-item-title"><b>ბრენდი:</b></span>
	                <div class="info-item-content">
	                    <a href="http://www.roniko.ge/ka/products?brand=23"><img src="{{ $product->brand->image }}" width="133px"></a>
	                </div>
	            </div>


	         	<div class="info-item">
	                <span class="info-item-title"><b>დასახელება:</b></span>
	                <div class="info-item-content">
	                    {{ $product->name }}
	                </div>
	            </div>




				<div class="info-item myColoring">

				<div class="info-item">
	                    <span class="info-item-title"><b>ღირებულება:</b></span>
	                    <div class="info-item-content">
	                        <div class="MainPrice">
	                            <font>{{ $product->price}}</font>
	                            <span><i ></i>
								<div>
									<span><i>₾</i></span>
	                        	</div>
	                        </span>
	                    </div>
	                </div>
	            </div>

	        </div>

		        <div class="info-item product-description">
		            <span class="info-item-title"><b>პროდუქტის აღწერა:</b></span>
		            <div class="info-item-content product-description">
		                <p>{{ $product->description}}<br></p>
		            </div>
		        </div>
		    </div>
		</div>
		<div class="col-md-2 col-sm-12 col-xs-12 myBasket">

			<div id="RightInfo">
			<p id="quantity_wanted_p">
			<label>რაოდენობა:</label>
			<a data-field-qty="qty" data-field-product-qty="product-qty" class="btn btn-default button-minus product_quantity_down">
			<span><i class="siteicon minus"></i></span>
			</a>
			<input type="text" name="qty" id="quantity_wanted" class="text" value="1" readonly='1' style="border: 1px solid rgb(189, 194, 201);">
			<a data-field-qty="qty" data-field-product-qty="product-qty" class="btn btn-default button-plus product_quantity_up">

			<span><i class="siteicon plus"></i></span>
			</a>
			<span class="clearfix"></span>
			<span id="COUNT_PRODUCTS_IN_STOCK" class="countable">ნაშთი ( <font class="countable_num">1</font> )</span>

			</p>
			<form action="{{ route('storeuserproducts', ["id"=>$product->id]) }}" method="POST" >
				@csrf
				<input type="hidden" name="product_id" value="{{ $product->id }}">
				<div id="buttons">
				<button type="submit" class="btn btn-default">
					<a id="AddToCart" data-item='278' data-type='1' class="add-to-cart" data-serviceurl="http://www.roniko.ge/ka/cart/payments?item=278&servicetoken="><i class="siteicon cart-new2"></i> კალათაში დამატება</a>
	            </button>
					
			</form>

					<a class="add-to-wishlist" data-serviceurl='http://www.roniko.ge/ka/wishlist/add?item=278'><i class="siteicon wishlist-new2"></i> სასურველში დამატება</a>
				</div>

			</div>
		</div>
	</div>
</div>
</div>

        <div id="RonikoCarousel">

            <div class="site-container">
            	<h1 class="RonikoCarousel-title">მსგავსი პროდუქცია</h1>
            </div>
            <div class="RonikoCarousel-inner white">
            	 <div class="site-container">
					<div class="RonikoCarousel-slider wow fadeIn" data-wow-duration="2s" data-wow-delay="0s">
						 <div>

                            <div class="product-item">
                            	@foreach ($morealikeproducts as $morealikeproduct)
                                <a href="http://www.roniko.ge/ka/product/277" target="_blank" style="width: 100%; display: inline-block;" class="product-image"><img src="{{ $morealikeproduct->image }}"></a>
                                <div class="product-information">
                                    <h3 class="product-title">{{ $morealikeproduct->name }}</h3>
                                    <div class="product-price">
                                        <div class="MainPrice">
                                            <font>{{ $morealikeproduct->price }}</font><span><i class="lari lari-bold"></i> 
                                        </span>
                                    </div>

                                </div>
                            </div>
                            <div class="product-buttons">
                                <a href="http://www.roniko.ge/ka/product/277?cart=yes" class="siteicon cart-new"></a>
                                <a href="http://www.roniko.ge/ka/product/277?wish=yes" class="siteicon wishlist-new"></a>
                                <!--<a href="" class="siteicon eyeglasses-new"></a>-->
                            </div>
                            @endforeach
                        </div>
                    </div>


				</div>	

            	 </div>
             </div>
            
         </div>
@endsection