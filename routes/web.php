<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/products', 'ProductsController@index')->name('indexproducts');
Route::post('/products/sort', 'ProductsController@sortProducts')->name('sortproducts');
Route::post('/products/search', 'ProductsController@searchProducts')->name('searchproducts');
Route::get("products/show/{id}", "ProductsController@show")->name("productshow");
Route::post('/user/products/store', 'UserProductsController@store')->name('storeuserproducts');
Route::get('/user/products', 'UserProductsController@index')->name('userproducts');







Route::get("/test", "ProductsController@test")->name("test");