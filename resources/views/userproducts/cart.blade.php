@extends('layouts.app')

@section('content')

    <div class="dataPageWrapper asyncWrapper">
        <div class="dataPageContent" style="background-color: #FFF;" data-page="newsPage">
            <div id="dataPageContainer" class="site-container">
                <ul class="breadcrumb">
                    <li><a href="http://www.roniko.ge/ka"><i class="siteicon home2"></i></a></li>
                    <li><a href="http://www.roniko.ge/ka/cart">კალათა</a></li>
                </ul>
            </div>
            <div id="CartPage" class="pageData">
                <div id="newsPage" style="padding-bottom: 100px;">
                    <div class="site-container">
                        <div class="inner-content">
                            <div class="col-sm-12">
                                <div class="col-md-9">
                                    <table class="shop_table shop_table_responsive cart cart-cart-form__contents" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th class="product-thumbnail">&nbsp;</th>
                                                <th class="product-name">პროდუქტი</th>
                                                <th class="product-subtotal">ფასი</th>
                                                <th class="product-remove">&nbsp;</th>
                                            </tr>
                                        </thead>
                                        @foreach ($products as $product)
                                        <tbody>


                                            <tr class="cart-cart-form__cart-item cart_item">
                                                <td class="product-thumbnail">
                                                    <a href="http://127.0.0.1:8000/products/show/{{$product->id}}"><img width="180" height="180" src="{{ $product->image }}" alt=""></a>
                                                    <a href="" class="remove" aria-label="Remove this item" data-product_id="1241" data-product_sku="">
                                                        <font>×</font> წაშლა</a>
                                                </td>
                                                <td class="product-name" data-title="Product">
                                                    <a href="http://127.0.0.1:8000/products/show/{{$product->id}}">{{$product->name}}</a>

                                                    <br>
                                                    <br>

                                                </td>


                                                <td class="product-subtotal" data-title="TotalSum">
                                                    <span class="cart-Price-amountTotal amountTotal"><font>224.1</font><span class="cart-Price-currencySymbol"><i class="lari lari-bold"></i></span></span>
                                                </td>

                                                <td class="product-remove">
                                                    <a href="http://www.roniko.ge/webapps/payonline/transaction?itemId=da17f2ea0d76e096b49d59b522b08501&servicetoken=p4NJ17EEESSZZ0V0A5ntqD8QK9ztSVz5QO9LxcZk" class="buy-button" data-item='da17f2ea0d76e096b49d59b522b08501' aria-label="Buy only this">ყიდვა</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                        @endforeach
                                    </table>
                                    <table class="shop_table shop_table_responsive cart cart-cart-form__contents" cellspacing="0">
                                        <tbody>
                                            <th><a href="http://www.roniko.ge/ka" class="shop-button blue">მთავარზე დაბრუნება</a>

                                                <p class="product-summary floatRightshipping">ტრანსპორტირება: <span class="summary-price"><font>0</font> <i class="lari lari-bold"></i></span></p>
                                            </th>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="CartSide" class="col-md-3">

                                    <div id="RightInfo">

                                        <p class="product-summary">(<span class="summary-num">1</span> პროდუქტი) <span class="summary-price"><font class='productSum'>224.10</font> <i class="lari lari-bold"></i></span></p>

                                        <p class="product-summary" style='display:none;'>
                                            <div class="dziritadi_info" style='display:none;'>
                                                <input type="checkbox" value="1" id="dz1" name="dziritadi" />
                                                <label for="dz1"><span>ძირითადი მისამართი</span></label>
                                            </div>

                                        </p>

                                        <p class="product-summary chooseCity" style='display:block;'>
                                            <select name='city' class='cart_city'>
						<option value= ''>აირჩიეთ ქალაქი</option>
												<option value='1' data-json='1'>თბილისი</option>
											<option value='18' data-json='50'>მცხეთა</option>
											<option value='28' data-json='0'>ახალციხე</option>
											<option value='29' data-json='0'>ბათუმი</option>
											<option value='30' data-json='0'>ბაკურიანი</option>
											<option value='31' data-json='0'>ბოლნისი</option>
											<option value='32' data-json='0'>ბორჯომი</option>
											<option value='33' data-json='0'>გორი</option>
											<option value='34' data-json='0'>გურჯაანი</option>
											<option value='35' data-json='0'>დუშეთი</option>
											<option value='36' data-json='0'>ზესტაფონი</option>
											<option value='37' data-json='0'>ზუგდიდი</option>
											<option value='38' data-json='0'>თეთრიწყარო</option>
											<option value='39' data-json='0'>თელავი</option>
											<option value='40' data-json='0'>კასპი</option>
											<option value='41' data-json='0'>ლოპოტა</option>
											<option value='42' data-json='0'>მარნეული</option>
											<option value='43' data-json='0'>მარტვილი</option>
											<option value='44' data-json='0'>მესტია</option>
											<option value='45' data-json='0'>ოზურგეთი</option>
											<option value='46' data-json='0'>რუსთავი</option>
											<option value='48' data-json='0'>საგარეჯო</option>
											<option value='49' data-json='0'>სამტრედია</option>
											<option value='50' data-json='0'>საჩხერე</option>
											<option value='51' data-json='0'>სენაკი</option>
											<option value='52' data-json='0'>სიღნაღი</option>
											<option value='53' data-json='0'>სურამი</option>
											<option value='54' data-json='0'>ტაბახმელა </option>
											<option value='55' data-json='0'>ტყიბული</option>
											<option value='56' data-json='0'>ურეკი</option>
											<option value='57' data-json='0'>ფონიჭალა</option>
											<option value='58' data-json='0'>ფოთი</option>
											<option value='59' data-json='0'>ქობულეთი</option>
											<option value='60' data-json='0'>ქუთაისი</option>
											<option value='61' data-json='0'>ყვარელი</option>
											<option value='62' data-json='0'>ყულევი</option>
											<option value='63' data-json='0'>ჩაქვი</option>
											<option value='64' data-json='0'>ჩოხატაური</option>
											<option value='65' data-json='0'>ცაგერი</option>
											<option value='66' data-json='0'>წალკა</option>
											<option value='67' data-json='0'>წყალტუბო</option>
											<option value='68' data-json='0'>ჭიათურა</option>
											<option value='69' data-json='0'>ხაშური</option>
											<option value='70' data-json='0'>ლაგოდეხი</option>
											<option value='71' data-json='0'>ახმეტა</option>
											<option value='72' data-json='0'>ბაღდათი</option>
											<option value='73' data-json='0'>ქარელი</option>
											<option value='74' data-json='0'>ხარაგაული</option>
											<option value='75' data-json='0'>ლანჩხუთი</option>
											<option value='76' data-json='0'>თერჯოლა</option>
											<option value='77' data-json='0'>სტეფანწმინდა</option>
											<option value='78' data-json='0'>ნატახტარი</option>
											<option value='79' data-json='0'>ჩხოროწყუ</option>
											<option value='80' data-json='0'>წინანდალი</option>
											<option value='81' data-json='0'>დმანისი</option>
											<option value='82' data-json='0'>აგარა</option>
											<option value='83' data-json='0'>ნინოწმინდა </option>
											<option value='84' data-json='0'>წყნეთი</option>
											<option value='85' data-json='0'>საგურამო</option>
											<option value='86' data-json='0'>კოჯორი</option>
											<option value='87' data-json='0'>კიკეთი</option>
										</select>
                                        </p>
                                        <p class="product-summary chooseAddress" style='display:block;'>
                                            <input type="text" class='form-control' name="address" placeholder="მისამართი, ქუჩის ნომერი, სართული, ბინა:">

                                        </p>


                                        <p class="product-summary">
                                            <select name='shipping_service'>
															<option value='4' selected data-price='4'>მიწოდება მოხდება მე-2 ან მე-3 სამუშაო დღეს!</option>										</select>
                                        </p>
                                        <p class="product-summary">ტრანსპორტირება: <span class="summary-price"><font class='shippingPrice'>0</font> <i class="lari lari-bold"></i></span></p>

                                        <p class="product-summary">ჯამი: <span class="summary-price"><font class='shippingPlussum'>224.1</font> <i class="lari lari-bold"></i></span></p>
                                        <div id="buttons">
                                            <a id="BuyProduct" data-item='' class="add-to-cart" href="http://www.roniko.ge/webapps/payonline/transaction?servicetoken=p4NJ17EEESSZZ0V0A5ntqD8QK9ztSVz5QO9LxcZk"><i class="siteicon cart-new2"></i> პროდუქციის ყიდვა</a>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
