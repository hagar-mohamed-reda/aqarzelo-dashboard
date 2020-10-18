<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\helper\Message;
use App\helper\Helper;
use App\Service;
use DB;
use DataTables;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("admin.service.index");
    }

    /**
     * return json data
     */
    public function getData() {
        $query = Service::query()->latest();

        return DataTables::eloquent($query)
                        ->addColumn('action', function(Service $service) {
                            return view("admin.service.action", compact("service"));
                        })
                        ->editColumn('icon', function(Service $service) {
                            return "<span class='btn label w3-blue'  data-src='".$service->icon."' onclick='viewFile(this)' >" . $service->icon . "</span>";
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
            $service = Service::create($data);


            // upload attachment
            Helper::uploadFile($request->file("icon"), "/service", function($filename) use ($service){
                $service->update([
                    "icon" => $filename
                ]);
            });

            notify(__('add service'), __('add service') . " " . $service->name, 'fa fa-trophy');

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
    public function edit(Service $service)
    {
        return $service->getViewBuilder()->loadEditView();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service)
    {
        try {
            $data = $request->all();
            $service->update($data);


            // upload attachment
            Helper::uploadFile($request->file("icon"), "/service", function($filename) use ($service){
                $service->update([
                    "icon" => $filename
                ]);
            });
            notify(__('edit service'), __('edit service') . " " . $service->name, "fa fa-trophy");
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
    public function destroy(Service $service)
    {
        try {
            notify(__('remove service'), __('remove service') . " " . $service->name, "fa fa-trophy");
            $service->delete();
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }
}
