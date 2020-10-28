<?php

namespace App\Http\Controllers\admin;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Company;
use App\helper\Helper;
use App\helper\Message;
use App\Role;
use DB;
use DataTables;

class CompanyController extends Controller {

    /**
     * Display a listing of the resource.
     */
    public function index() {
        return view("admin.company.index");
    }

    /**
     * Display a listing of the resource.
     */
    public function profile() {
        return view("admin.company.profile");
    }

    /**
     * return json data
     */
    public function getData() {
        return DataTables::eloquent(Company::query()->latest())
                        ->addColumn('action', function(Company $company) {
                            return view("admin.company.action", compact("company"));
                        })
                        ->addColumn('service_id', function(Company $company) {
                            return optional($company->service)->name;
                       })
                        ->editColumn('photo', function(Company $company) {
                            return "<img onclick='viewImage(this)' src='" . $company->photo_url . "' height='30px' class='w3-round' >";
                        })
                        ->rawColumns(['action', 'photo'])
                        ->toJson();
    }

    /**
     * return view of edit modal
     *
     * @param Company $company
     * @return type
     */
    public function edit(Company $company) {
        return $company->getViewBuilder()->loadEditView();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        try {
            if (Company::where("email", $request->email)->count() > 0)
                return Message::error(__('email already exist'));

            if (Company::where("phone", $request->phone)->count() > 0)
                return Message::error(__('phone already exist'));

            $data = $request->all();
            if ($request->password)
                $data['password'] = bcrypt($request->password);
            $company = Company::create($data);

            // upload attachment
            Helper::uploadFile($request->file("photo"), "/company", function($filename) use ($company){
                $company->update([
                    "photo" => $filename
                ]);
            });

            notify(__('add company'), __('add company') . " " . $company->name, "fa fa-bank");
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
    public function update(Request $request, Company $company) {
        try {
            if (Company::where("email", $request->email)->count() > 0 && $company->email != $request->email)
                return Message::error(__('email already exist'));

            if (Company::where("phone", $request->phone)->count() > 0 && $company->phone != $request->phone)
                return Message::error(__('phone already exist'));

            $data = $request->all();
            unset($data['photo']);
            if ($request->password != $company->password)
                $data['password'] = bcrypt($request->password);

            $data['company_id'] = Auth::user()->id;

            $company->update($data);

            // upload attachment
            Helper::uploadFile($request->file("photo"), "/company", function($filename) use ($company){
                Helper::removeFile(AQARZELO_PUBLIC_PATH . "/images/company/" . $company->photo);
                $company->update([
                    "photo" => $filename
                ]);
            });

            notify(__('edit company'), __('edit company') . " " . $company->name, "fa fa-bank");
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
    public function destroy(Company $company) {
        try {
            notify(__('remove company'), __('remove company') . " " . $company->name, "fa fa-bank");
            $company->delete();
            return Message::success(Message::$REMOVE);
        } catch (\Exception $exc) {
            return Message::error(Message::$ERROR);
        }
    }

}
