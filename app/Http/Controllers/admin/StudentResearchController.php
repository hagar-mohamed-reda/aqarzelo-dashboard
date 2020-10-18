<?php

namespace App\Http\Controllers\dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\helper\Message;
use App\helper\Helper;
use App\StudentResearch;
use App\Research;
use DB;
use DataTables;

class StudentResearchController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return view("dashboard.studentresearch.index");
    }

    /**
     * return json data
     */
    public function getData() {
        $researchIds = Research::where("doctor_id", Auth::user()->id)->pluck("id")->toArray();

        //$query = StudentResearch::whereIn("research_id", $researchIds);

        if (Auth::user()->type == 'admin') {
            $query = StudentResearch::query(); //where('result_id', '!=', null)
        } else {
            $query = StudentResearch::whereIn("research_id", $researchIds);
        }

        if (request()->student_id > 0)
            $query->where("student_id", request()->student_id);

        if (request()->research_id > 0)
            $query->where("research_id", request()->research_id);

        if (request()->result_id > 0)
            $query->where("result_id", request()->result_id);

        return DataTables::eloquent($query)
                        ->addColumn('action', function(StudentResearch $studentresearch) {
                            return view("dashboard.studentresearch.action", compact("studentresearch"));
                        })
                        ->editColumn('result_id', function(StudentResearch $studentresearch) {
                            return optional($studentresearch->result)->name;
                        })
                        ->editColumn('research_id', function(StudentResearch $studentresearch) {
                            return optional($studentresearch->research)->title;
                        })
                        ->editColumn('upload_date', function(StudentResearch $studentresearch) {
                            $color = (strtotime($studentresearch->upload_date) > strtotime(optional($studentresearch->research)->max_date)) ? 'red' : 'green';
                            return '<span class="w3-text-' . $color . '" >' . $studentresearch->upload_date . '</span>';
                        })
                        ->editColumn('student_id', function(StudentResearch $studentresearch) {
                            return optional($studentresearch->student)->name;
                        })
                        ->editColumn('file', function(StudentResearch $studentresearch) {
                            return "<b class='btn label w3-blue student-research-span' data-open='off' data-student='".optional($studentresearch->student)->name . "-". optional(optional($studentresearch->student)->department)->name . "-" . optional(optional($studentresearch->student)->level)->name ."'  data-src='" . $studentresearch->file_url . "' onclick='viewFile(this)' >" . $studentresearch->file . "</b>";
                        })
                        ->rawColumns(['action', 'file', 'upload_date'])
                        ->toJson();
    }

    function updateStatus(StudentResearch $studentresearch, Request $request) {
        try {
            if ($request->status) {
                $studentresearch->update([
                    "result_id" => $request->status
                ]);
            }
            notify(__('update result of student'), __('update result of student ') . " " . optional($studentresearch->student)->name, "fa fa-circle");
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(__('please choose the result') . $ex->getMessage());
        }
    }

    function publishResult(StudentResearch $studentresearch, Request $request) {
        try {
            $studentresearch->update([
                "publish" => 1
            ]);
            notify(__('publish result'), __('publish result of student ') . " " . optional($studentresearch->student)->name, "fa fa-circle");
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(__('please choose the result') . $ex->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        /*
          try {
          $studentresearch = StudentResearch::create($request->all());

          notify(__('add studentresearch'), __('add studentresearch') . " " . $studentresearch->name, 'fa fa-bank');

          return Message::success(Message::$DONE);
          } catch (\Exception $ex) {
          return Message::error(Message::$ERROR);
          } */
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(StudentResearch $studentresearch) {
        //return $studentresearch->getViewBuilder()->loadEditView();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StudentResearch $studentresearch) {
        /*
          try {
          $studentresearch->update($request->all());

          notify(__('edit studentresearch'), __('edit studentresearch') . " " . $studentresearch->name, "fa fa-bank");
          return Message::success(Message::$EDIT);
          } catch (\Exception $ex) {
          return Message::error(Message::$ERROR);
          } */
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(StudentResearch $studentresearch) {
        /*
          if ($studentresearch->courses()->count() > 0)
          return Message::success(__("can't remove studentresearch has courses"));

          try {
          notify(__('remove studentresearch'), __('remove studentresearch') . " " . $studentresearch->name, "fa fa-bank");
          $studentresearch->delete();
          return Message::success(Message::$REMOVE);
          } catch (\Exception $ex) {
          return Message::error(Message::$ERROR);
          } */
    }
}
