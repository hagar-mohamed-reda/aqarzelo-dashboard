<?php

namespace App\Http\Controllers\admin;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\helper\Helper;
use App\helper\Message;
use App\Role;
use DB;
use DataTables;

class UserController extends Controller {

    /**
     * Display a listing of the resource.
     */
    public function index() {
        return view("admin.user.index");
    }

    /**
     * Display a listing of the resource.
     */
    public function profile() {
        return view("admin.user.profile");
    }

    /**
     * return json data
     */
    public function getData() {
        return DataTables::eloquent(User::query()->latest())
                        ->addColumn('action', function(User $user) {
                            return view("admin.user.action", compact("user"));
                        })
//                        ->addColumn('role_id', function(User $user) {
//                            return optional($user->role)->name;
//                        })
                        ->editColumn('photo', function(User $user) {
                            return "<img onclick='viewImage(this)' src='" . $user->photo_url . "' height='30px' class='w3-round' >";
                        })
                        ->rawColumns(['action', 'photo'])
                        ->toJson();
    }

    /**
     * return view of edit modal
     *
     * @param User $user
     * @return type
     */
    public function edit(User $user) {
        return $user->getViewBuilder()->loadEditView();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        try {
            if (User::where("email", $request->email)->count() > 0)
                return Message::error(__('email already exist'));

            if (User::where("phone", $request->phone)->count() > 0)
                return Message::error(__('phone already exist'));

            $data = $request->all();
            if ($request->password)
                $data['password'] = Hash::make($request->password);
            $user = User::create($data);

            // upload attachment
            Helper::uploadFile($request->file("photo"), "/users", function($filename) use ($user){
                $user->update([
                    "photo" => $filename
                ]);
            });

            notify(__('add user'), __('add user') . " " . $user->name, "fa fa-users");
            return Message::success(Message::$DONE);
        } catch (Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user) {
        try {
            if (User::where("email", $request->email)->count() > 0 && $user->email != $request->email)
                return Message::error(__('email already exist'));

            if (User::where("phone", $request->phone)->count() > 0 && $user->phone != $request->phone)
                return Message::error(__('phone already exist'));

            $data = $request->all();
            unset($data['photo']);
            $data['user_id'] = Auth::user()->id;
            if ($request->password)
                $data['password'] = Hash::make($request->password);

            $user->update($data);

            // upload attachment
            Helper::uploadFile($request->file("photo"), "/users", function($filename) use ($user){
                Helper::removeFile(AQARZELO_PUBLIC_PATH . "/images/users/" . $user->photo);
                $user->update([
                    "photo" => $filename
                ]);
            });

            notify(__('edit user'), __('edit user') . " " . $user->name, "fa fa-users");
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
    public function destroy(User $user) {
        try {
            notify(__('remove user'), __('remove user') . " " . $user->name, "fa fa-users");
            $user->delete();
            return Message::success(Message::$REMOVE);
        } catch (\Exception $exc) {
            return Message::error(Message::$ERROR);
        }
    }

}
