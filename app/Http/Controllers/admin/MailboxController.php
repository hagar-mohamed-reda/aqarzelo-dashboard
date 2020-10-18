<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\helper\Message;
use App\helper\Helper;
use App\Mailbox;
use DB;
use DataTables;

class MailboxController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("admin.mailbox.index");
    }

    /**
     * return json data
     */
    public function getData() {
        $query = Mailbox::query()->where('user_id', Auth::user()->id)->latest();

        return DataTables::eloquent($query)
                        ->addColumn('action', function(Mailbox $mailbox) {
                            return view("admin.mailbox.action", compact("mailbox"));
                        })
                        ->editColumn('user_id', function(Mailbox $mailbox) {
                            return optional($mailbox->user)->name;
                        })
                        ->rawColumns(['action', 'user_id'])
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
            $mailbox = Mailbox::create($data);
            notify(__('add mailbox'), __('add mailbox') . " " . $mailbox->name, 'fa fa-building-o');

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
    public function edit(Mailbox $mailbox)
    {
        return $mailbox->getViewBuilder()->loadEditView();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Mailbox $mailbox)
    {
        try {
            $data = $request->all();
            $mailbox->update($data);
            notify(__('edit mailbox'), __('edit mailbox') . " " . $mailbox->name, "fa fa-building-o");
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
    public function destroy(Mailbox $mailbox)
    {
        try {
            notify(__('remove mailbox'), __('remove mailbox') . " " . $mailbox->name, "fa fa-building-o");
            $mailbox->delete();
            return Message::success(Message::$DONE);
        } catch (\Exception $ex) {
            return Message::error(Message::$ERROR);
        }
    }
}
