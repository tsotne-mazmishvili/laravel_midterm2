@extends('layouts.home')

@section('filterproduct')

<div id="filter-search">
	<form action="{{ route('searchproducts') }}" method="POST" role="search">
	    {{ csrf_field() }}
	    <div class="input-group">
	        <input id="filter-search-term" type="text" class="form-control" name="filter_search" placeholder="საძიებო სიტყვა ..."> <span class="input-group-btn">
	            <button type="submit" class="btn btn-default">
	                <span class="glyphicon glyphicon-search"></span>
	            </button>
	        </span>
	    </div>
	</form>
    {{-- <input id="filter-search-term" type="text" name="filter_search" value="" placeholder="საძიებო სიტყვა ..."> --}}
    <form action="{{ route('sortproducts') }}" method="POST">
    	{{ csrf_field() }}
		<div id="sorting">
    	  <select name="sorting" class="cs-select cs-skin-slide" data-init-plugin="cs-select">
	      <option value="0">სორტირება</option>
	      <option value="1" >ფასი ზრდადი</option>
	      <option value="2" >ფასი კლებადი</option>
	      </select>
	    </div>
		<button type="submit" class="btn btn-default">
			<span class="glyphicon glyphicon-search"></span>
		</button>
    </form>

</div>
@endsection


@section('listproduct')
	@foreach ($products as $product)
	   <div class="product-item">
	            <a href="{{ route("productshow",["id"=>$product->id]) }}" target="_blank" style="width: 100%; display: inline-block;" class="product-image"><img src="{{ $product->image}}"></a>
	            <div class="product-information">
	                <h3 class="product-title">{{ $product->name }}</h3>
	                <div class="product-price">
	                    <div class="MainPrice">
	                        <font>{{ $product->price }}</font><span><i class="lari lari-bold"></i> </span>
	                    </div>

	                </div>
	            </div>
	            <div class="product-buttons">
	                <a href="http://www.roniko.ge/ka/product/333?cart=yes" class="siteicon cart-new"></a>
	                <a href="http://www.roniko.ge/ka/product/333?wish=yes" class="siteicon wishlist-new"></a>
	            </div>
	        </div>
	@endforeach
@endsection
