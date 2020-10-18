<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\helper\Message;
use App\helper\Helper;
use App\City;
use DB;
use DataTables;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("admin.city.index");
    }

    /**
     * return json data
     */
    public function getData() {
        $query = City::query()->latest();

        return DataTables::eloquent($query)
                        ->addColumn('action', function(City $city) {
                            return view("admin.city.action", compact("city"));
                        })
                        ->editColumn('country_id', function(City $city) {
                            return optional($city->country)->name_ar;
                        })
                        ->editColumn('icon', function(City $city) {
                            return "<span class='btn label w3-blue'  data-src='".$city->icon."' onclick='viewFile(this)' >" . $city->icon . "</span>";
                        })
                        ->rawColumns(['action', 'icon'])
                        ->toJson();
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
        try {
            $data = $request->all();
            $city = City::create($data);
            notify(__('add city'), __('add city') . " " . $city->name, 'fa fa-building-o');

            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(City $city)
    {
        return $city->getViewBuilder()->loadEditView();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, City $city)
    {
        try {
            $data = $request->all();
            $city->update($data);
            notify(__('edit city'), __('edit city') . " " . $city->name, "fa fa-building-o");
            return Message::success(Message::$EDIT);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(City $city)
    {
        try {
            notify(__('remove city'), __('remove city') . " " . $city->name, "fa fa-building-o");
            $city->delete();
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }
}
