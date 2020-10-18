<?php

namespace App\Http\Controllers\dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\helper\Message;
use App\helper\Helper;
use App\Research;
use DB;
use DataTables;

class ResearchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("dashboard.research.index");
    }

    /**
     * return json data
     */
    public function getData() {
        $query = Research::where('doctor_id', Auth::user()->id);
        
        if (Auth::user()->type == 'admin')
            $query = Research::query();
            
            
        if (request()->course_id > 0)
            $query->where('course_id', request()->course_id);
        
        return DataTables::eloquent($query)
                        ->addColumn('action', function(Research $research) {
                            return view("dashboard.research.action", compact("research"));
                        })
                        ->editColumn('course_id', function(Research $research) {
                            return optional($research->course)->name;
                        })
                        ->editColumn('file', function(Research $research) {
                            return "<span class='btn label w3-blue'  data-src='".$research->file_url."' onclick='viewFile(this)' >" . $research->file . "</span>";
                        })
                        //->editColumn('requirements', function(Research $research) {
                        //    return "<span onclick='' >".substr(0, 10, $research->requirements)."</span>" . substr(10, $research->requirements);
                        //})
                        ->rawColumns(['action', 'course_id', 'file'])
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
        if ($request->course_id <= 0)
            return Message::error("please select course");
            
        try {
            $data = $request->all();
            $data['doctor_id'] = Auth::user()->id;
            $research = Research::create($data);

            
            // upload attachment
            Helper::uploadFile($request->file("file"), "/research", function($filename) use ($research){
                $research->update([
                    "file" => $filename
                ]);
            });
            
            notify(__('add research'), __('add research') . " " . $research->name, 'fa fa-newspaper-o');

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
    public function edit(Research $research)
    {
        return $research->getViewBuilder()->loadEditView();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Research $research)
    {
        try {
            $data = $request->all();
            $data['doctor_id'] = Auth::user()->id;
            $research->update($data);

            
            // upload attachment
            Helper::uploadFile($request->file("file"), "/research", function($filename) use ($research){
                $research->update([
                    "file" => $filename
                ]);
            });
            notify(__('edit research'), __('edit research') . " " . $research->name, "fa fa-newspaper-o");
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
    public function destroy(Research $research)
    {
        try {
            notify(__('remove research'), __('remove research') . " " . $research->name, "fa fa-newspaper-o");
            $research->delete();
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }
}
