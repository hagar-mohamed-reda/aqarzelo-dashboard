<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Message;
use App\Helper;
use App\City;
use App\Area;
use App\Ads;
use App\Chat;
use App\User;

class ChatController extends Controller {

    /**
     * send message from user to another user.
     * 
     * @param Request $request
     * @return Array $response
     */
    public function sendMessage(Request $request) { 

        $userFrom = User::auth($request);

        if (!$userFrom)
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));

        // validate the data
        $validator = validator()->make($request->all(), [ 
            'message' => 'required',
        ]);

        if ($validator->fails()) {
            $key = $validator->errors()->first();
            return Message::error($key, $key);
        }

        
        $userTo = User::find($request->user_to);

        $message = $request->message;

        $chat = ($userFrom && $userTo && strlen($message) > 0) ? $userFrom->sendMessage($userTo, $message) : null;
        
        
        return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $chat);
    }

    
    /**
     * get all chat messages
     * 
     * @param Request $request
     * @return Array $response
     */
    public function getMessages(Request $request) {
        $user = User::auth($request);
        
        
        // validate the data
        $validator = validator()->make($request->all(), [ 
            'user_to' => 'required',
        ]);

        if ($validator->fails()) {
            $key = $validator->errors()->first();
            return Message::error($key, $key);
        }
        
        $userTo = User::find($request->user_to);
        
        
        

        if (!$user)
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
            
         $messages = Chat::where(function($q) use ($user, $userTo){
             $q->where('user_from',$user->id)->
             where("user_to", $userTo->id);
             
         })->orWhere(function($q) use ($user, $userTo){
             $q->where('user_from',$userTo->id)->
             where("user_to", $user->id);
             
         })->get();
         
         return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $messages);
    }

    
    /**
     * get all chat users
     * 
     * @param Request $request
     * @return Array $response
     */
    public function getUsers(Request $request) {
        $user = User::auth($request);

        if (!$user)
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
        
        $resources = [];
        
       $userIds = Chat::where("user_from", $user->id)
        ->orWhere("user_to", $user->id)
        ->distinct()
        ->get(["user_to"])
        ->pluck("user_to");
        
        $userIdsFrom = Chat::where("user_from", $user->id)
        ->orWhere("user_to", $user->id)
        ->distinct()
        ->get(["user_from"])
        ->pluck("user_from");
        
        foreach($userIdsFrom as $item) {
            $userIds[] = $item;
        }
        
        /*$userIds = Chat::where("user_from", $user->id)
        ->orWhere("user_to", $user->id)->get();
        */
        // get all chat users
        $users = User::whereIn("id", $userIds)->get(['id', 'name', 'photo']);
        
        // apend last message
        foreach($users as $item) {
            $lastMessage = Chat::where(function($query) use ($item, $user) {
                $query->where("user_to", $item->id)
                    ->where("user_from", $user->id);
            })->orWhere(function($query) use ($item, $user) {
                $query->where("user_to", $user->id)
                    ->where("user_from", $item->id);
            })->latest()->first();
            
            $item->last_message = $lastMessage? $lastMessage->message : '';
            
            if ($item->id != $user->id)
                $resources[] = $item;
        }
        
        return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $resources);
    }

}
