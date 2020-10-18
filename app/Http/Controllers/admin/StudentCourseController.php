<?php

namespace App\Http\Controllers\dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\helper\Message;
use App\StudentCourse;
use App\imports\CourseAssignImporter;
use App\imports\CourseAssignWithRemoveImporter;
use App\Course;
use App\DoctorStudentCourse;
use App\StudentCourseDepartment;
use DataTables;
use Excel;


class StudentCourseController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return view("dashboard.studentcourse.index");
    }

    /**
     * return json data
     */
    public function getData() {
        $query = StudentCourse::query();
        
        if (request()->student_id)
            $query->where("student_id", request()->student_id);
        
        if (request()->course_id)
            $query->where("course_id", request()->course_id);
         
        return DataTables::eloquent($query)
                        ->addColumn('action', function(StudentCourse $studentcourse) {
                            return view("dashboard.studentcourse.action", compact("studentcourse"));
                        })
                        ->editColumn('student_id', function(StudentCourse $studentcourse) {
                            return optional($studentcourse->student)->name;
                        })
                        ->editColumn('course_id', function(StudentCourse $studentcourse) {
                            return optional($studentcourse->course)->name;
                        })
                        ->rawColumns(['action'])
                        ->toJson();
    }

    /**
     * Show the form for assign doctors to studentcourse.
     *
     * @return \Illuminate\Http\Response
     */
    public function assign(Course $course) {
        return view("dashboard.studentcourse.assign", compact("course"));
    }

    /**
     * update doctor coures
     *
     * @return \Illuminate\Http\Response
     */
    public function updateDoctors(Course $course, Request $request) {
         
        // delete old and add new
        //$course->studentCourses()->delete();
         
        for($index = 0; $index < count($request->student_id); $index ++) {
            
            $studentCourse = StudentCourse::where('student_id', $request->student_id[$index])->where('course_id', $course->id)->first();
            
            if ($request->assign[$index] == 1) {
                if (!$studentCourse) {
                    StudentCourse::create([
                        "student_id" => $request->student_id[$index],
                        "times" => $request->times[$index],
                        "course_id" => $course->id
                    ]);
                } else {
                    $studentCourse->update([
                        "times" => $request->times[$index],
                    ]);
                }
            } else {
                if ($studentCourse)
                    $studentCourse->delete();
            }
        }
        
        notify(__('assign course to students'), __('assign course to students => ') . " " . $course->name, "fa fa-th-list");
        return Message::success(Message::$DONE);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        try {
            $studentcourse = StudentCourse::create($request->all());
            
            for($index = 0; $index < count($request->department_id); $index ++) {
                if ($request->assign[$index] == 1) {
                    StudentCourseDepartment::create([
                        "studentcourse_id" => $studentcourse->id,
                        "department_id" => $request->department_id[$index]
                    ]);
                }
            }

            notify(__('add studentcourse'), __('add studentcourse') . " " . $studentcourse->name, "fa fa-graduation-cap");
            return Message::success(Message::$DONE);
        } catch (Exception $ex) {
            return Message::error(Message::$ERROR);
        }
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
    public function edit(StudentCourse $studentcourse) {
        return view("dashboard.studentcourse.edit", compact("studentcourse"));//$studentcourse->getViewBuilder()->loadEditView();
    }

    /**
     * import products from excel file
     * 
     * @param Request $request
     * @return type
     */
    public function import(Request $request) {
        if ($request->type == 'edit') {
            StudentCourse::where('course_id', $request->course_id)->delete();
        }
        
        //if ($request->type == 'new')
            Excel::import(new CourseAssignImporter, $request->file('courses'));
        //else if ($request->type == 'edit')
         //   Excel::import(new CourseAssignWithRemoveImporter, $request->file('courses'));
        
        return Message::success(Message::$DONE);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StudentCourse $studentcourse) {
        try {
            $studentcourse->update($request->all());

            $studentcourse->studentcourseDepartments()->delete();
            for($index = 0; $index < count($request->department_id); $index ++) {
                if ($request->assign[$index] == 1) {
                    StudentCourseDepartment::create([
                        "studentcourse_id" => $studentcourse->id,
                        "department_id" => $request->department_id[$index]
                    ]);
                }
            }
            notify(__('edit studentcourse'), __('edit studentcourse') . " " . $studentcourse->name, "fa fa-graduation-cap");
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
    public function destroy(StudentCourse $studentcourse) {
        try {
            notify(__('remove studentcourse'), __('remove studentcourse') . " " . $studentcourse->name, "fa fa-graduation-cap");
            $studentcourse->delete();
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }
}
