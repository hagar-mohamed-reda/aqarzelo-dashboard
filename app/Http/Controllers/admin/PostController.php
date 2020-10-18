<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\helper\Message;
use App\helper\Helper;
use App\Post;
use DB;
use DataTables;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("admin.post.index");
    }

    /**
     * return json data
     */
    public function getData() {
        $query = Post::query();

        return DataTables::eloquent($query)
                        ->addColumn('action', function(Post $post) {
                            return view("admin.post.action", compact("post"));
                        })
                        ->editColumn('category_id', function(Post $post) {
                            return optional($post->category)->name_ar;
                        })
                        ->editColumn('category_id', function(Post $post) {
                            return __($post->status);
                        })
                        ->rawColumns(['action'])
                        ->toJson();
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view("admin.post.add");
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
            $post = Post::create($data);


            // upload attachment
            Helper::uploadFile($request->file("icon"), "/post", function($filename) use ($post){
                $post->update([
                    "icon" => $filename
                ]);
            });

            notify(__('add post'), __('add post') . " " . $post->name, 'fa fa-cubes');

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
        return view("admin.post.add");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {

        //return $post->getViewBuilder()->loadEditView();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        try {
            $data = $request->all();
            $post->update($data);


            // upload attachment
            Helper::uploadFile($request->file("icon"), "/post", function($filename) use ($post){
                $post->update([
                    "icon" => $filename
                ]);
            });
            notify(__('edit post'), __('edit post') . " " . $post->name, "fa fa-cubes");
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
    public function destroy(Post $post)
    {
        $post->status = 'user_trash';
        try {
            notify(__('remove post'), __('remove post') . " " . $post->name, "fa fa-cubes");
            $post->update();
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }
}
