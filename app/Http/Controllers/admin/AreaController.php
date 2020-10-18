<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\helper\Message;
use App\helper\Helper;
use App\Area;
use DB;
use DataTables;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("admin.area.index");
    }

    /**
     * return json data
     */
    public function getData() {
        $query = Area::query()->latest();

        return DataTables::eloquent($query)
                        ->addColumn('action', function(Area $area) {
                            return view("admin.area.action", compact("area"));
                        })
                        ->editColumn('city_id', function(Area $area) {
                            return optional($area->city)->name_ar;
                        })
                        ->rawColumns(['action', 'city_id'])
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
            $area = Area::create($data);
            notify(__('add area'), __('add area') . " " . $area->name, 'fa fa-building-o');

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
    public function edit(Area $area)
    {
        return $area->getViewBuilder()->loadEditView();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Area $area)
    {
        try {
            $data = $request->all();
            $area->update($data);
            notify(__('edit area'), __('edit area') . " " . $area->name, "fa fa-building-o");
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
    public function destroy(Area $area)
    {
        try {
            notify(__('remove area'), __('remove area') . " " . $area->name, "fa fa-building-o");
            $area->delete();
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }
}
