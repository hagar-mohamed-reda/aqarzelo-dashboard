<?php

namespace App\Http\Controllers\company;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\UserCompany;
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
        return view("company.user.index");
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
        $query = UserCompany::query()
        ->where('company_id', Auth::user()->company_id)
        ->latest();
        return DataTables::eloquent($query)
                        ->addColumn('action', function(UserCompany $user) {
                            return view("company.user.action", compact("user"));
                        })
                        ->editColumn('photo', function(UserCompany $user) {
                            return "<img onclick='viewImage(this)' src='" . $user->photo_url . "' height='30px' class='w3-round' >";
                        })
                        ->rawColumns(['action', 'photo'])
                        ->toJson();
    }

    /**
     * return view of edit modal
     *
     * @param UserCompany $user
     * @return type
     */
    public function edit(UserCompany $user) {
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
            if (UserCompany::where("email", $request->email)->count() > 0)
                return Message::error(__('email already exist'));

            if (UserCompany::where("phone", $request->phone)->count() > 0)
                return Message::error(__('phone already exist'));

            $data = $request->all();
            if ($request->password)
                $data['password'] = Hash::make($request->password);
            $user = UserCompany::create($data);

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
    public function update(Request $request, UserCompany $user) {
        try {
            if (UserCompany::where("email", $request->email)->count() > 0 && $user->email != $request->email)
                return Message::error(__('email already exist'));

            if (UserCompany::where("phone", $request->phone)->count() > 0 && $user->phone != $request->phone)
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
    public function destroy(UserCompany $user) {
        try {
            notify(__('remove user'), __('remove user') . " " . $user->name, "fa fa-users");
            $user->delete();
            return Message::success(Message::$REMOVE);
        } catch (\Exception $exc) {
            return Message::error(Message::$ERROR);
        }
    }

}
