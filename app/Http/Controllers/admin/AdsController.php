<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\helper\Message;
use App\helper\Helper;
use App\Ads;
use DB;
use DataTables;

class AdsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("admin.ads.index");
    }

    /**
     * return json data
     */
    public function getData() {
        $query = Ads::query()->latest();

        return DataTables::eloquent($query)
                        ->addColumn('action', function(Ads $ads) {
                            return view("admin.ads.action", compact("ads"));
                        })
                        ->editColumn('photo', function(Ads $ads) {
                            return "<img src='".$ads->image."' width='40px' onclick='viewImage(this)' >";
                        })
                        ->editColumn('logo', function(Ads $ads) {
                            return "<img src='".$ads->logo_url."' width='40px' onclick='viewImage(this)' >";
                        })
                        ->rawColumns(['action', 'logo', 'photo'])
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
            $ads = Ads::create($data);


            // upload attachment
            Helper::uploadFile($request->file("photo"), "/ads", function($filename) use ($ads){
                $ads->update([
                    "photo" => $filename
                ]);
            });

            // upload attachment
            Helper::uploadFile($request->file("logo"), "/ads", function($filename) use ($ads){
                $ads->update([
                    "logo" => $filename
                ]);
            });

            notify(__('add ads'), __('add ads') . " " . $ads->name, 'fa fa-image');

            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error($ex->getMessage());
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
    public function edit(Ads $ads)
    {
        return $ads->getViewBuilder()->loadEditView();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ads $ads)
    {
        try {
            $data = $request->all();
            $ads->update($data);


            // upload attachment
            Helper::uploadFile($request->file("photo"), "/ads", function($filename) use ($ads){
                $ads->update([
                    "photo" => $filename
                ]);
            });

            // upload attachment
            Helper::uploadFile($request->file("logo"), "/ads", function($filename) use ($ads){
                $ads->update([
                    "logo" => $filename
                ]);
            });
            notify(__('edit ads'), __('edit ads') . " " . $ads->name, "fa fa-image");
            return Message::success(Message::$EDIT);
        } catch (\Exception $ex) {
            return Message::error($ex->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ads $ads)
    {
        try {
            notify(__('remove ads'), __('remove ads') . " " . $ads->name, "fa fa-image");
            $ads->delete();
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }
}
