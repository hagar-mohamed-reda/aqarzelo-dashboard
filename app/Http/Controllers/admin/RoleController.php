<?php

namespace App\Http\Controllers\dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
 
use App\helper\Message;
use App\helper\Helper;
use App\Role; 
use App\Permission; 
use App\RoleHasPermission; 
use DB;
use DataTables;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("dashboard.role.index");
    }

    /**
     * return json data
     */
    public function getData() {
        return DataTables::eloquent(Role::query())
                        ->addColumn('action', function(Role $role) {
                            return view("dashboard.role.action", compact("role"));
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
            $role = Role::create($request->all());
            
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
    public function permissions(Role $role)
    {
        return view("dashboard.role.permissions", compact("role"));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    { 
        return $role->getViewBuilder()->loadEditView();
    }
    
    
    public function updatePermissions(Role $role, Request $request) { 
        try {
            for($index = 0; $index < count($request->permission); $index ++) {
                $permission = $request->permission[$index];
                $p = RoleHasPermission::where("role_id", $role->id)->where("permission_id", $permission)->first();
                if ($request->can[$index]) { 
                    if (!$p) {
                        $p = RoleHasPermission::create([
                            "role_id" => $role->id,
                            "permission_id" => $permission
                        ]);
                    }  
                } else {
                    if ($p)
                        $p->delete();
                }
            } 
            
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
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
    public function update(Request $request, Role $role)
    { 
        try {
            $role->update($request->all());
             
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
    public function destroy(Role $role)
    { 
        try { 
            $role->delete();
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }
}
