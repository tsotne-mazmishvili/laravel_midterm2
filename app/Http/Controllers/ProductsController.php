<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\products;
use App\User;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("products.index",["products"=>Products::get()]);
    }

    public function sortProducts(Request $request)
    {
        if($request->input('sorting') == 2)
        {
            $data = Products::orderBy('price', 'desc')->get();  
        }
        elseif($request->input('sorting') == 1){
            $data = Products::orderBy('price', 'asc')->get();
        }


        return view("products.index",["products"=>$data]);
    }


    public function searchProducts(Request $request)
    {
        $data = Products::where('name', $request->input('filter_search'))->get();
        return view("products.index",["products"=>$data]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       
        $data = Products::with('brand')->where("id",$id)->firstOrFail();
        $alikeproducts = Products::with('brand')->whereBetween("price", [$data->price, $data->price+20])->get();

        return view("products.show",[
            "product"=>$data,
            "morealikeproducts"=>$alikeproducts
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }




    public function test()
    {
       $user = User::find(1);
       return Products::with('user')->get();
    }
}
