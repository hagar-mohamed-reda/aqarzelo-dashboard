@extends("dashboard.layout")
@php

if (session("locale"))
    App()->setLocale(session("locale"));
else
    App()->setLocale("ar");

@endphp

@section("css")
<link rel="stylesheet" href="{{ url('/website') }}/css/post.css">
<link rel="stylesheet" href="https://rawgit.com/enyo/dropzone/master/dist/dropzone.css">
<style>
    * {
        direction: ltr!important;
        text-transform: capitalize!important;
    }
    .circle {
        width: 15px!important;
        height: 15px!important;
        border-radius: 5em!important;
        background-color: white;
        color: #02a2a7!important;
        /*border: 1px solid #02a2a7!important;*/
    }

    .post-data-step {
        display: none;
    }

    .post-data-step-1 {
        display: block;
    }

    .radios .radio-label:before  {
        border-radius: 0px!important;
    }
</style>

<script>
    var fill_required_data_msg = '{{ __("words.fill_required_data_msg") }}';
</script>
@endsection

@section("content")
<div id="container" class="w3-modal light-gray show" style="padding: 0px!important;padding-top: 70px!important" >

    @include("website.post.create.loader")

    <div class="w3-row" v-bind:style="'height: '+(height - 70) +'px'" >
        <!-- sidebar  -->
        <div class="w3-col l3  w3-hide-small w3-hide-medium" style="padding: 0px;padding-right: 5px" v-bind:style="'height: '+(height - 70) +'px'"  >
            <div class="shadow w3-white" style="height: 100%" >
                <br>
                <br>
                <center>
                    <b class="text-uppercase w3-xlarge w3-text-gray" >{{ __('words.create_post') }}</b>
                </center>
                <br>
                <center class="text-uppercase" >
                    <button class="w3-  step-post-button step-btn-1" >1</button>
                    <button class="w3-  step-post-button step-btn-2" >2</button>
                    <button class="w3-  step-post-button step-btn-3" >3</button>
                </center>
                <br>
                <center>
                    <div style="width: 40%;height: 2px" class="w3-border-bottom w3-border-gray" ></div>
                </center>
                <br>
                <br>
                <center>
                    <img src="{{ url('/website/image/create_post_sidebar.png') }}" width="80%" >
                </center>
                <div class="w3-large text-center" >
                    <b class="sidbar-title w3-text-gray" >{{ __('words.add_master_photo') }}</b>
                </div>
                <div class="text-gray text-center w3-padding" >
                    {{ __('words.please_add_one_photo') }}
                </div>
                <center>
                    <br>
                    <br>
                    <div style="width: 40%;height: 2px" class="w3-border-bottom w3-border-gray" ></div>
                    <div><a href="#" class="w3-text-gray" >{{ __('words.for_help_click_here') }}</a></div>
                </center>
            </div>
        </div>

        <div class="w3-col l9 nicescroll" >
            <!-- step 1  -->
            <div class="w3-padding step step-1" >
                <div class="w3-xxlarge w3-text-gray" >
                    {{ __("words.upload_master_photo") }}
                    <br>
                    <div style="width: 95%;height: 3px;margin-top: 5px" class="w3-border-bottom w3-border-gray" ></div>
                    <div style="padding: 30px"  >
                        <div
                        id="masterDrop"
                        v-bind:style="post.images[0]? 'background-image: url(' + post.images[0].src + ')' : ''"
                        class="drop w3-light-gray w3-round" id="uploadMasterInput"
                        style="cursor: pointer;min-height: 400px;margin: auto;width: 80%;border: 2px dashed gray;padding: 30px;background-size: 100% 100%" >

                            <center onclick="$('#masterImageInput').click()">
                                <img id="uploadedImage1"   class="w3-round" src="{{ url('/website/icons/upload-cloud.png') }}" width="120px" >
                                <br>
                                <div class="w3-large text-gray" id="masterStatus" >{{ __("words.upload_photo_or_just_drag_and_drop") }}</div>
                            </center>
                            <input type="file" id="masterImageInput"  class="hidden" onchange="uploadMasterImage($('#uploadedImage')[0], event, null)" >
                        </div>

                        <div id="list" ></div>
                    </div>

                    <center>
                        <button
                            class="w3-btn w3-padding w3-round-xxlarge w3-large  animated fadeInRight fa fa-angle-right"
                            style="width: 200px;border: 1px solid #02A2A7;"
                            onclick="gotoStep(2)" > {{ __("words.next") }} </button>
                    </center>
                </div>
            </div>

            <!-- step 2  -->
            <div class="w3-padding step step-2" style="display: none" >
                <div class="w3-xxlarge w3-text-gray" >
                    {{ __("words.master_photo") }}
                    <br>
                    <div style="width: 95%;height: 3px;margin-top: 5px" class="w3-border-bottom w3-border-gray" ></div>

                </div>
                <br>
                <div class="w3-padding" >
                    <center>
                        <img  id="masterImage" class="w3-round" v-bind:src="(post.images[0])? post.images[0].src: ''" onclick="viewImage(this)" height="300px" >
                    </center>
                </div>

                <center>
                    <button
                        class="w3-btn w3-padding w3-round-xxlarge w3-large  animated fadeInLeft fa fa-angle-left"
                        style="width: 200px;border: 1px solid #02A2A7;"
                        onclick="gotoStep(1)" > {{ __("words.back") }} </button>
                    <button
                        class="w3-btn w3-padding w3-round-xxlarge w3-large  animated fadeInRight fa fa-angle-right"
                        style="width: 200px;border: 1px solid #02A2A7;"
                        onclick="gotoStep(3)" > {{ __("words.next") }} </button>
                </center>
            </div>

            <!-- step 3  -->
            <div class="w3-padding step step-3" style="display: none" >
                <div class="w3-xxlarge w3-text-gray" >
                    {{ __("words.upload_other_photos") }}
                    <br>
                    <div style="width: 95%;height: 3px;margin-top: 5px" class="w3-border-bottom w3-border-gray" ></div>
                    <br>
                    <br>
                    <div class="w3-row" >
                        <div class="w3-col l6 m6 s6" >
                            <div id="otherDrop360" class="drop w3-light-gray w3-round w3-block" style="cursor: pointer;height: 220px;border: 2px dashed gray;padding: 30px" >

                                <center onclick="$('#otherImageInput360').click()">
                                    <img id="otherImage360"   class="w3-round" src="{{ url('/website/icons/upload-cloud.png') }}" width="120px" >
                                    <br>
                                    <div class="w3-large text-gray" id="status" >
                                        <i class="fa fa-street-view dark-theme-color" ></i><br>
                                        {{ __("words.upload_360_photo_or_just_drag_and_drop") }}
                                    </div>
                                </center>
                                <input type="file" id="otherImageInput360"  class="hidden" onchange="uploadImage($('#otherImage360')[0], event, null, null, true)" >
                            </div>
                        </div>

                        <div class="w3-col l6 m6 s6" >
                            <div id="otherDrop" class="drop w3-light-gray w3-round w3-block" style="cursor: pointer;height: 220px;border: 2px dashed gray;padding: 30px" >

                                <center onclick="$('#otherImageInput').click()">
                                    <img id="otherImage"   class="w3-round" src="{{ url('/website/icons/upload-cloud.png') }}" width="120px" >
                                    <br>
                                    <div class="w3-large text-gray" id="status" >{{ __("words.upload_photo_or_just_drag_and_drop") }}</div>
                                </center>
                                <input type="file" id="otherImageInput"  class="hidden" onchange="uploadImage($('#otherImage')[0], event, null)" >
                            </div>
                        </div>

                    </div>

                    <center>
                        <button
                            class="w3-btn w3-padding w3-round-xxlarge w3-large  animated fadeInLeft fa fa-angle-left"
                            style="width: 200px;border: 1px solid #02A2A7;"
                            onclick="gotoStep(2)" > {{ __("words.back") }} </button>
                        <button
                            class="w3-btn w3-padding w3-round-xxlarge w3-large  animated fadeInRight fa fa-angle-right"
                            style="width: 200px;border: 1px solid #02A2A7;"
                            onclick="gotoStep(4)" > {{ __("words.next") }} </button>
                    </center>
                </div>
            </div>

            <!-- step 4  -->
            <div class="w3-padding step step-4" id="postImageview" style="display: none" >
                <div class="w3-xxlarge w3-text-gray" >
                    {{ __("words.upload_other_photos") }}
                    <br>
                    <div style="width: 95%;height: 3px;margin-top: 5px" class="w3-border-bottom w3-border-gray" ></div>
                    <div style="margin-top: 7px" id="otherDrop2"  >
                        <div class="drop w3-light-gray w3-round" style="cursor: pointer;min-height: 20px;border: 2px dashed gray;padding: 5px" >

                            <div onclick="$('#otherImageInput').click()">
                                <img id="otherImage2"   class="w3-round w3-margin-left" src="{{ url('/website/icons/upload-cloud.png') }}" height="40px" >

                                <span class="w3-margin-left w3-large text-gray" id="status" >{{ __("words.upload_photo_or_just_drag_and_drop") }}</span>
                            </div>
                            <input type="file" id="otherImageInput"  class="hidden" onchange="uploadImage($('#otherImage2')[0], event, null)" >
                        </div>
                    </div>
                    <div class="w3-block" style="height: 350px;margin-top: 7px;overflow: auto" >

                        <ul class="w3-ul w3-row"  id="sortable" >
                            <li
                            v-for="(item, index) in post.images"
                            v-bind:data-index="index"
                            v-bind:class="index == 0? '' : 'ui-state-default'"
                            class=" w3-col l3 m4 s6 w3-display-container"
                            style="border: none!important;padding: 7px!important" >
                                <div class="w3-padding w3-display-topleft" v-if="index == 0" >
                                    <span class="fa fa-trophy light-theme-color w3-tiny w3-button w3-round w3-white shadow" ></span>
                                </div>
                                <div class="w3-padding w3-display-topleft" v-if="item.is_360" >
                                    <span class="fa fa-street-view light-theme-color w3-tiny w3-button w3-round w3-white shadow" > 360</span>
                                </div>
                                <div class="w3-padding w3-display-topright" v-if="index != 0" >
                                    <span class="fa fa-trash w3-text-red w3-tiny w3-button w3-round w3-white shadow" v-on:click="removeImage(index)" ></span>
                                </div>
                                <img v-bind:src="item.src" class="w3-block shadow animated zoomI " onclick="viewImage(this)" height="150px"   >
                            </li>
                        </ul>
                    </div>

                    <center>
                        <button
                            class="w3-btn w3-padding w3-round-xxlarge w3-large  animated fadeInLeft fa fa-angle-left"
                            style="width: 200px;border: 1px solid #02A2A7;"
                            onclick="gotoStep(3)" > {{ __("words.back") }} </button>
                        <button
                            class="w3-btn w3-padding w3-round-xxlarge w3-large  animated fadeInRight fa fa-angle-right"
                            style="width: 200px;border: 1px solid #02A2A7;"
                            onclick="gotoStep(5)" > {{ __("words.next") }} </button>
                    </center>
                </div>
            </div>

            <!-- step 5  -->
            <div class="w3-padding step step-5" id="postImageview" style="display: none" >
                <div class="w3-text-gray" >
                    <span class="w3-xxlarge" >{{ __("words.real_estate_details") }}</span>
                    <br>
                    <div style="width: 95%;height: 3px;margin-top: 5px" class="w3-border-bottom w3-border-gray" ></div>
                    <br>
                    <ul class="progressbar">
                        <li class="active post-data-step-circle post-data-step-circle-1" > </li>
                        <li class="post-data-step-circle post-data-step-circle-2" > </li>
                        <li class="post-data-step-circle post-data-step-circle-3" > </li>
                    </ul>

                    <div class="w3-block w3-white shadow w3-round w3-padding" style="margin-top: 7px;overflow: auto" >
                        <center class="w3-padding hidden" >

                            <span class="circle post-data-step-circle post-data-step-circle-1 fa fa-circle-o" > </span>
                            <span class="circle post-data-step-circle post-data-step-circle-2 fa fa-circle-o" > </span>
                            <span class="circle post-data-step-circle post-data-step-circle-3 fa fa-circle-o" > </span>
                        </center>

                        <div class="post-data-step post-data-step-1" >
                            <table class="w3-table w3-padding " >
                                <tr>
                                    <td>
                                        {{ __('words.title') }} *
                                    </td>
                                    <td>
                                        <input type="text" class="form-control input-sm" v-model="post.title"  placeholder="{{ __('words.title') }}">
                                    </td>
                                    <td>
                                        {{ __('words.title_ar') }} *
                                    </td>
                                    <td>
                                        <input type="text" class="form-control input-sm" v-model="post.title_ar"  placeholder="{{ __('words.title_ar') }}">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {{ __('words.sell_or_rent') }} *
                                    </td>
                                    <td>
                                        <select class="form-control w3-round input-sm" v-model="post.type"  onchange="setType(this.value)"  >
                                            <option value="sale" >{{ __('words.sell') }}</option>
                                            <option value="rent" >{{ __('words.rent') }}</option>
                                        </select>
                                    </td>
                                    <td>{{ __('words.space') }} *</td>
                                    <td>
                                         <input type="number" min="1"  class="form-control input-sm" v-model="post.space"  placeholder="{{ __('words.space') }}">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="category_hidden_2">{{ __('words.bedroom_number') }} *</td>
                                    <td class="category_hidden_2">
                                         <input type="number" min="0"  class="form-control input-sm" v-model="post.bedroom_number"  placeholder="{{ __('words.bedroom_number') }}">
                                    </td>
                                    <td class="category_hidden_2">{{ __('words.bathroom_number') }} *</td>
                                    <td class="category_hidden_2">
                                         <input type="number" min="0"  class="form-control input-sm" v-model="post.bathroom_number"  placeholder="{{ __('words.bathroom_number') }}">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="sale_type" >{{ __('words.price_per_meter') }} *</td>
                                    <td class="sale_type">
                                         <input type="number" min="1"  class="form-control input-sm" v-model="post.price_per_meter"  placeholder="{{ __('words.price_per_meter') }}">
                                    </td>
                                    <td>
                                        <span class='sale_type' >{{ __('words.price') }} *</span>
                                        <span class='rent_type' style="display: none" >{{ __('words.price_per_month') }}</span>
                                    </td>
                                    <td>
                                         <input type="number" min="0"  class="form-control input-sm" v-model="post.price"  placeholder="{{ __('words.price') }}">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {{ __('words.category') }} *
                                    </td>
                                    <td>
                                        <select class="form-control w3-round  input-sm" v-model="post.category_id" onchange="setCategory(this.value)"   >
                                            @foreach(App\Category::all() as $category)
                                            <option value="{{ $category->id }}" >{{ session("locale") == "ar"? $category->name_ar : $category->name_en }}</option>
                                            @endforeach
                                        </select>
                                    </td>
                                    <td>{{ __('words.build_date') }}</td>
                                    <td>
                                         <input type="date"  class="form-control input-sm" v-model="post.build_date"  placeholder="{{ __('words.build_date') }}">
                                    </td>
                                </tr>
                            </table>
                            <center>
                                <button
                                    class="w3-btn w3-padding w3-round-xxlarge w3-large  animated fadeInLeft fa fa-angle-left"
                                    style="width: 200px;border: 1px solid #02A2A7;"
                                    onclick="gotoStep(4)" > {{ __("words.back") }} </button>
                                <button
                                    class="w3-btn w3-padding w3-round-xxlarge w3-large  animated fadeInRight fa fa-angle-right"
                                    style="width: 200px;border: 1px solid #02A2A7;"
                                    onclick="gotoStep2(2)" > {{ __("words.next") }} </button>
                            </center>
                        </div>

                        <div class="post-data-step post-data-step-2" >

                            <div class="w3-padding" >
                                <div id="map" class="w3-block w3-round" style="height: 350px" ></div>
                                <input type="hidden" id="lng" name="lng" v-model="post.lng" >
                                <input type="hidden" id="lat" name="lat" v-model="post.lat" >
                            </div>
                            <center>
                                <button
                                    class="w3-btn w3-padding w3-round-xxlarge w3-large  animated fadeInLeft fa fa-angle-left"
                                    style="width: 200px;border: 1px solid #02A2A7;"
                                    onclick="gotoStep2(1)" > {{ __("words.back") }} </button>
                                <button
                                    class="w3-btn w3-padding w3-round-xxlarge w3-large  animated fadeInRight fa fa-angle-right"
                                    style="width: 200px;border: 1px solid #02A2A7;"
                                    onclick="gotoStep2(3)" > {{ __("words.next") }} </button>
                            </center>

                        </div>

                        <div class="post-data-step post-data-step-3" >

                        <table class="w3-table w3-padding " >
                            <tr>
                                <td>
                                    {{ __('words.city') }} *
                                </td>
                                <td>
                                    <select class="form-control w3-round input-sm city-select" v-model="post.city_id" onchange="changeArea(this.value)" >
                                        @foreach(App\City::all() as $city)
                                        <option value="{{ $city->id }}" >{{ session("locale") == "ar"? $city->name_ar : $city->name_en }}</option>
                                        @endforeach
                                    </select>
                                </td>
                                <td>
                                    {{ __('words.owner_type') }} *
                                </td>
                                <td>
                                  <div class="radio w3-cell" onclick="app.post.owner_type='owner'" >
                                    <input  id="owner" name="owner_type" type="radio">
                                    <label  for="owner" class="radio-label">{{ __('words.owner') }}</label>
                                  </div>
                                  <div class="radio w3-cell" onclick="app.post.owner_type='developer'" >
                                    <input  id="developer" name="owner_type" type="radio">
                                    <label  for="developer" class="radio-label">{{ __('words.developer') }}</label>
                                  </div>
                                  <div class="radio w3-cell" onclick="app.post.owner_type='mediator'" >
                                    <input  id="mediator" name="owner_type" type="radio">
                                    <label  for="mediator" class="radio-label">{{ __('words.mediator') }}</label>
                                  </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {{ __('words.area') }} *
                                </td>
                                <td>
                                    <select class="form-control w3-round  input-sm area-select" v-model="post.area_id"   >
                                        @foreach(App\Area::all() as $area)
                                        <option
                                        class="area-option"
                                        value="{{ $area->id }}"
                                        v-bind:city="{{ $area->city->id }}"  >{{ session("locale") == "ar"? $area->name_ar : $area->name_en }}</option>
                                        @endforeach
                                    </select>
                                </td>
                                <td>{{ __('words.payment_method') }} *</td>
                                <td>
                                    <div class="radio w3-cell" onclick="app.post.payment_method='cash'" >
                                        <input  id="cash" name="payment_method" type="radio">
                                        <label  for="cash" class="radio-label">{{ __('words.cash') }}</label>
                                    </div>
                                    <div class="radio w3-cell" onclick="app.post.payment_method='installment'" >
                                        <input  id="installment" name="payment_method" type="radio">
                                        <label  for="installment" class="radio-label">{{ __('words.installment') }}</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="category_hidden_1" >{{ __('words.floor_number') }}</td>
                                <td class="category_hidden_1">
                                     <input type="number" class="form-control input-sm" v-model="post.floor_number" min="0"  placeholder="{{ __('words.floor_number') }}">
                                </td>
                                <td class="category_hidden_2">
                                    {{ __('words.more_details') }}
                                </td>
                                <td class="category_hidden_2">
                                    <div style="" >

                                        <div class="radio w3-cell radios"  >
                                            <input  id="furnished" name="furnished" v-model="post.furnished" type="checkbox">
                                            <label  for="furnished" class="radio-label">{{ __('words.furnished') }}</label>
                                        </div>

                                        <div class="radio w3-cell radios"  >
                                            <input  id="has_parking" name="has_parking" v-model="post.has_parking" type="checkbox">
                                            <label  for="has_parking" class="radio-label">{{ __('words.has_parking') }}</label>
                                        </div>

                                        <div class="radio w3-cell radios"  >
                                            <input  id="has_garden" name="has_garden" v-model="post.has_garden" type="checkbox">
                                            <label  for="has_garden" class="radio-label">{{ __('words.has_garden') }}</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td >{{ __('words.description') }}</td>
                                <td colspan="3" >
                                    <textarea class="form-control input-sm" style="resize: vertical;" v-model="post.description"  placeholder="{{ __('words.description') }}"></textarea>
                                </td>
                            </tr>

                            <tr>
                                <td class="category_hidden_2">
                                    {{ __('words.finishing') }} *
                                </td>
                                <td colspan="3" class="category_hidden_2" >
                                    <div style="" >
                                      <div class="radio w3-cell" onclick="app.post.finishing_type='extra_super_lux'" >
                                        <input  id="extra_super_lux" name="finishing_type" type="radio">
                                        <label  for="extra_super_lux" class="radio-label">{{ __('words.extra_super_lux') }}</label>
                                      </div>
                                       <div class="radio w3-cell" onclick="app.post.finishing_type='super_lux'" >
                                        <input  id="super_lux" name="finishing_type" type="radio">
                                        <label  for="super_lux" class="radio-label">{{ __('words.super_lux') }}</label>
                                      </div>
                                        <div class="radio w3-cell" onclick="app.post.finishing_type='lux'" >
                                        <input  id="lux" name="finishing_type" type="radio">
                                        <label  for="lux" class="radio-label">{{ __('words.lux') }}</label>
                                      </div>
                                        <div class="radio w3-cell" onclick="app.post.finishing_type='semi_finished'" >
                                        <input  id="semi_finished" name="finishing_type" type="radio">
                                        <label  for="semi_finished" class="radio-label">{{ __('words.semi_finished') }}</label>
                                      </div>
                                        <div class="radio w3-cell" onclick="app.post.finishing_type='core&chel'" >
                                        <input  id="core&chel" name="finishing_type" type="radio">
                                        <label  for="core&chel" class="radio-label">{{ __('words.core&chel') }}</label>
                                      </div>
                                        <div class="radio w3-cell" onclick="app.post.finishing_type='without_finished'" >
                                        <input  id="without_finished" name="finishing_type" type="radio">
                                        <label  for="without_finished" class="radio-label">{{ __('words.without_finished') }}</label>
                                      </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                            <center>
                                <button
                                    class="w3-btn w3-padding w3-round-xxlarge w3-large  animated fadeInLeft fa fa-angle-left"
                                    style="width: 200px;border: 1px solid #02A2A7;"
                                    onclick="gotoStep2(2)" > {{ __("words.back") }} </button>
                                <button
                                    class="w3-btn w3-padding w3-round-xxlarge w3-large light-theme-background  animated fadeInRight w3-text-white"
                                    style="width: 200px;border: 1px solid #02A2A7;"
                                    onclick="savePost()" >
                                        @if(isset($_GET['post_id']))
                                        {{ __('words.edit') }}
                                        @else
                                        {{ __('words.publish') }}
                                        @endif
                                 </button>
                            </center>
                        </div>
                    </div>
                    <br>
                </div>
            </div>
        </div>

    </div>

</div>
@endsection

@section("js")
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://rawgit.com/enyo/dropzone/master/dist/dropzone.js"></script>
<script src="{{ url('/website') }}/js/drop.js"></script>
<script src="{{ url('/website') }}/js/createPost.js"></script>

<script>
    var map;
    function initMap() {
        var marker = null;
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 30.0455965, lng: 31.2387195},
            zoom: 12.25,
            maxZoom: 16.25,
            styles: [
                      {
                        "featureType": "poi.attraction",
                        "stylers": [
                          {
                            "visibility": "off"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.business",
                        "stylers": [
                          {
                            "visibility": "off"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.government",
                        "stylers": [
                          {
                            "visibility": "off"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.medical",
                        "stylers": [
                          {
                            "visibility": "off"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.place_of_worship",
                        "stylers": [
                          {
                            "visibility": "off"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.sports_complex",
                        "stylers": [
                          {
                            "visibility": "off"
                          }
                        ]
                      }
                    ]
        });

        google.maps.event.addListener(map, 'click', function (e) {
            console.log(e);
            placeMarker(e.latLng, map);
        });

        if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

                var pos = new google.maps.LatLng(lat, lng);
                placeMarker(pos, map);

            console.log(marker);
            // set current location
            map.setCenter({lat: lat, lng: lng});
        });

        function placeMarker(position, map) {
            try {
                marker.setMap(null);
            } catch (e) {
            }
            marker = new google.maps.Marker({
                position: position,
                map: map
            });
            app.post.lng = position.lng();
            app.post.lat = position.lat();

            document.getElementById("lng").value = position.lng();
            document.getElementById("lat").value = position.lat();

            $(".lnglat").html(position.lat() + ", " + position.lng());
            map.panTo(position);
        }

    }
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4ow5PXyqH-gJwe2rzihxG71prgt4NRFQ&libraries=places&callback=initMap"
async defer></script>
<script>
var login_first = '{{ __("words.login_first") }}';
var masterImageError = '{{ __("words.upload_master_photo") }}';
var image_error = '{{ __("words.upload_some_images") }}';
var choose_location = '{{ __("words.choose_location") }}';
var fill_all_data = '{{ __("words.fill_all_data") }}';
var imageAdded = '{{ __("words.image_add_to_list") }}';
var app = {};
var step = 1;
var apiToken = "{{ App\Profile::auth()? App\Profile::auth()->api_token : '' }}";

var options = [];
app = new Vue({
    el: '#container',
    data: {
        uploadedImageCount: 0,
        post: {
            images: []
        }
    },
    methods: {
        removeImage: function(index) {
            var imgs = [];
            for(var i = 0; i < this.post.images.length; i ++) {
                var image = this.post.images[i];
                if (i != index) {
                    imgs.push(image);
                }
            }
            this.post.images = imgs;
        }
    },
    computed: {
        height: function () {
            return window.innerHeight;
        }
    },
    watch: {
    },
});

gotoStep(1);
@if(isset($_GET['post_id']))
$(".loader").show();
@endif

    function setType(type) {
        if (type == 'rent') {
            $('.rent_type').show();
            $('.sale_type').hide();
        } else {
            $('.rent_type').hide();
            $('.sale_type').show();
        }
    }

    function setCategory(category) {
        if (category == 6) {
            $('.category_hidden_1').hide();
        }else if (category == 4) {
            $('.category_hidden_2').hide();
            app.post.finishing_type='without_finished';
        } else {
            $('.category_hidden_1').show();
            $('.category_hidden_2').show();
        }
    }

$(document).ready(function () {
    setNicescroll();

    @if(isset($_GET['post_id']))
    $.get("{{ url('/api/post/get') }}?post_id={{ $_GET['post_id'] }}", function(r){
        app.post = r.data;
        app.post.post_id = r.data.id;
        app.post.is_edit_from_website = true;
        //
        $(".loader").hide();
        gotoStep(4);
        //
        $("#" + app.post.finishing_type).attr("checked", "");
        $("#" + app.post.owner_type).attr("checked", "");
        $("#" + app.post.payment_method).attr("checked", "");
        if (app.post.has_garden)
            $("#has_garden")[0].checked = true;
        if (app.post.has_parking)
            $("#has_parking")[0].checked = true;
        if (app.post.furnished)
            $("#furnished")[0].checked = true;
    });
    @endif
});

    // set drop zone for master image
    new Droper($('#masterDrop')[0], function (bin, file) {
        uploadMasterImage($('#uploadedImage')[0], null, bin, file);
    });

    // set drop zone for other image
    new Droper($('#otherDrop')[0], function (bin, file) {
        uploadImage($('#otherImage')[0], null, bin, file);
    });

    // set drop zone for other image
    new Droper($('#otherDrop2')[0], function (bin, file) {
        uploadImage($('#otherImage2')[0], null, bin, file);
    });

    // set drop zone for other image
    new Droper($('#postImageview')[0], function (bin, file) {
        uploadImage($('#otherImage2')[0], null, bin, file);
    });

    // set drop zone for 360  images
    new Droper($('#otherDrop360')[0], function (bin, file) {
        uploadImage($('#otherImage360')[0], null, bin, file, true);
    });

    // prevent redirect of browser
    new Droper($('#container')[0], function (bin, file) {});
</script>
@endsection


