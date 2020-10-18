<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\helper\Message;
use App\helper\Helper;
use App\Country;
use DB;
use DataTables;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("admin.country.index");
    }

    /**
     * return json data
     */
    public function getData() {
        $query = Country::query()->latest();

        return DataTables::eloquent($query)
                        ->addColumn('action', function(Country $country) {
                            return view("admin.country.action", compact("country"));
                        })
                        ->editColumn('icon', function(Country $country) {
                            return "<span class='btn label w3-blue'  data-src='".$country->icon."' onclick='viewFile(this)' >" . $country->icon . "</span>";
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
            $country = Country::create($data);
            notify(__('add country'), __('add country') . " " . $country->name, 'fa fa-building-o');


            // upload attachment
            Helper::uploadFile($request->file("icon"), "/country", function($filename) use ($country){
                $country->update([
                    "icon" => $filename
                ]);
            });
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
    public function edit(Country $country)
    {
        return $country->getViewBuilder()->loadEditView();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Country $country)
    {
        try {
            $data = $request->all();
            $country->update($data);


            // upload attachment
            Helper::uploadFile($request->file("icon"), "/country", function($filename) use ($country){
                $country->update([
                    "icon" => $filename
                ]);
            });

            notify(__('edit country'), __('edit country') . " " . $country->name, "fa fa-building-o");
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
    public function destroy(Country $country)
    {
        try {
            notify(__('remove country'), __('remove country') . " " . $country->name, "fa fa-building-o");
            $country->delete();
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }
}
