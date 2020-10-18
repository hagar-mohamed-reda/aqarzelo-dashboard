<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\helper\Message;
use App\helper\Helper;
use App\Category;
use DB;
use DataTables;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("admin.category.index");
    }

    /**
     * return json data
     */
    public function getData() {
        $query = Category::query();

        return DataTables::eloquent($query)
                        ->addColumn('action', function(Category $category) {
                            return view("admin.category.action", compact("category"));
                        })
                        ->editColumn('icon', function(Category $category) {
                            return "<img src='".$category->icon_url."' width='40px' onclick='viewImage(this)' >";
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
            $category = Category::create($data);


            // upload attachment
            Helper::uploadFile($request->file("icon"), "/category", function($filename) use ($category){
                $category->update([
                    "icon" => $filename
                ]);
            });

            notify(__('add category'), __('add category') . " " . $category->name, 'fa fa-cubes');

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
    public function edit(Category $category)
    {
        return $category->getViewBuilder()->loadEditView();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        try {
            $data = $request->all();
            unset($data['icon']);

            $category->update($data);


            // upload attachment
            Helper::uploadFile($request->file("icon"), "/category", function($filename) use ($category){
                Helper::removeFile(AQARZELO_PUBLIC_PATH . "/images/category/" . $category->icon);
                $category->update([
                    "icon" => $filename
                ]);
            });
            notify(__('edit category'), __('edit category') . " " . $category->name, "fa fa-cubes");
            return Message::success(Message::$EDIT);
        } catch (Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        if ($category->posts()->count() > 0)
            return Message::error(__('cant remove category exist in posts'));

        try {
            notify(__('remove category'), __('remove category') . " " . $category->name, "fa fa-cubes");
            $category->delete();
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }
}
