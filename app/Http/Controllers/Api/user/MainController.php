<?php

namespace App\Http\Controllers\Api\user;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Message;
use App\Helper;
use App\Dictionary;
use App\Company;
use App\User;
use App\Favourite;
use App\PostReview;
use App\Post;

class MainController extends Controller {

    
    /**
     * add post to favourite
     *
     * @param Request $request
     * @return array $response 
     */
    public function toggleFavourite(Request $request) {
        $user = User::auth($request);

        if (!$user)
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));

        $validator = validator()->make($request->all(), [
            'post_id' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->first();
            return Message::error($errors);
        }

        try {
            $favourite = Favourite::where("post_id", $request->post_id)->where("user_id", $user->id)->first();

            if ($favourite) {
                $favourite->delete();
                return Message::success(trans("messages_en.done"), trans("messages_ar.done"), 0);
            }

            // if not crreate one
            $data = $request->all();
            $data['user_id'] = $user->id;
            $favourite = Favourite::create($data);

            // return favourite 
            return Message::success(trans("messages_en.done"), trans("messages_ar.done"), 1);
        } catch (\Exception $e) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
    }

    
    /**
     * get favourite posts
     *
     * @param Request $request
     * @return array $response 
     */
    public function getFavourites(Request $request) {
        $user = User::auth($request);
        if (!$user) {
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
        } 
        $favourites = $user->favourites()->get(); 
        // return favourites 
        return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $favourites);
    }
    
    
    /**
     * add comment or rate to the post
     *
     * @param Request $request
     * @return array $response 
     */
    public function addReview(Request $request) {
        $user = User::auth($request);

        if (!$user)
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));

        $validator = validator()->make($request->all(), [
            'post_id' => 'required',
            'comment' => 'nullable||max:191',
            'rate' => 'nullable|max:5:min:1',
        ]); 
        
        if ($validator->fails()) {
            $errors = $validator->errors()->first();
            return Message::error($errors);
        }

        try { 
            $review = PostReview::where("post_id", $request->post_id)->where("user_id", $user->id)->first();
            if ($review) { 
                $review->update($request->all());
                return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $review);
            }

            // if not create one
            $data = $request->all();
            $data['user_id'] = $user->id;
            $review = PostReview::create($data);
            
            

            // return review 
            return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $review);
        } catch (\Exception $e) {
            return Message::error(trans("messages_en.error"), trans("messages_ar.error"));
        }
    }
    
    
    /**
     * get all the comments and rates for one post
     *
     * @param Request $request
     * @return array $response 
     */
    public function getReviews(Request $request) {  
        $validator = validator()->make($request->all(), [
            'post_id' => 'required', 
        ]); 
        
        if ($validator->fails()) { 
            return Message::error($validator->errors()->first());
        }
        
        $post = Post::find($request->post_id); 
        
        $reviews = ($post)? $post->reviews()->get(['comment', 'rate', 'created_at']) : [];
        
        // return reviews of the post 
        return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $reviews);
    }
    

    /**
     * get notifications for all posts
     *
     * @param Request $request
     * @return array $response 
     */
    public function getNotifications(Request $request) {
        $user = User::auth($request);
        if (!$user) {
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
        } 
        $notifications = $user->notifications()->latest()->take(10)->get(); 
        // return notifications 
        return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $notifications);
    }
     
    
    /**
     * get all post for user
     *
     * @param Request $request
     * @return array $response 
     */
    public function getPosts(Request $request) {
        $user = User::auth($request);
        if (!$user) {
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
        } 
        $posts = $user->posts()->latest()->get(); 
        // return notifications 
        return Message::success(trans("messages_en.done"), trans("messages_ar.done"), $posts);
    }

    /**
     * remove post change it's status to user_trash
     *
     * @param Request $request
     * @return array $response 
     */
    public function removePost(Request $request) {
        $user = User::auth($request);
        if (!$user) {
            return Message::error(trans("messages_en.login_first"), trans("messages_ar.login_first"));
        } 
        
        $validator = validator()->make($request->all(), [
            'post_id' => 'required', 
        ]); 
        
        if ($validator->fails()) { 
            return Message::error($validator->errors()->first());
        }
        
        // get post
        $post = Post::query()
                ->where("id", $request->post_id)
                ->where("user_id", $user->id)
                ->where("status", '!=', 'user_trash')
                ->first();
        
        // remove
        ($post)? $post->update(['status' => 'user_trash']) : null;
        
        // return error if post is null
        if (!$post)
            return Message::error(trans("messages_en.forbidden"), trans("messages_ar.forbidden"));
         
        return Message::success(trans("messages_en.post_removed"), trans("messages_ar.post_removed"));
    }
    
}
