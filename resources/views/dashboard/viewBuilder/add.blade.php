 
<style>
    .form-group {
        height: 80px
    }
    
    label {
        color: black!important;
    }
    
    .form {
        direction: rtl;
    }
</style>
<form method="post" class="form" action="{{ $builder['add_route'] }}" id="form"   >   
    <div class="box-body row">
        {{ csrf_field() }}
        @foreach($builder["cols"] as $col)

        @if ($col["editable"])

        @if ($col["type"] == "select")
        <div class="form-group w3-padding {{ $col['col'] == null? 'col-lg-4 col-md-4 col-sm-6 col-xs-12' : $col['col'] }} ">
            <label for="{{ $col['id'] }}">{{ $col['label'] }}</label>
            <select
                {{ $col["required"]? "required" : '' }} 
                class="form-control {{ $col['class'] }} select2" 
                name="{{ $col['name'] }}" 
                id="{{ $col['id'] }}"  >
                <option disabled="" >select {{ $col["label"] }}</option>
                @foreach($col["data"] as $data)
                <option 
                    value="{{ $data[0] }}"
                    data-id="{{ isset($data[2])? $data[2] : ''  }}" >{{ $data[1] }}</option>
                @endforeach
            </select> 
        </div>
        @elseif ($col["type"] == "enum")
        <div class="form-group w3-padding {{ $col['col'] == null? 'col-lg-4 col-md-4 col-sm-6 col-xs-12' : $col['col'] }} " style="border: 1px solid lightgray;" >

            <label for="{{ $col['id'] }}">{{ $col['label'] }}</label>  
            <br>
            <input type="hidden" id="{{ $col['id'] }}" name="{{ $col['name'] }}" value="" >
            @foreach($col["data"] as $data)
            <div 
                class="w3-round w3-col btn w3-white btn-sm btn-flat" 
                onclick="$(this).find('input[type=radio]')[0].click()"
                style="border: 1px solid lightgray;cursor: pointer;width: {{ (strlen($data[1]) * 6) + 15 }}px;margin: 5px;float:{{ ($builder['direction']=='rtl')? 'right' : 'left'  }}" >
                <span>{{ $data[1] }}</span>
                <input 
                    type="radio" 
                    onchange="$('#{{ $col['id'] }}').val(this.value)"
                    name="input-{{ $col['name'] }}" 
                    value="{{ $data[0] }}">
            </div>
            @endforeach 

        </div>
        @elseif ($col["type"] == "map")
        <div class="form-group w3-padding {{ $col['col'] == null? 'col-lg-4 col-md-4 col-sm-6 col-xs-12' : $col['col'] }} "   >

            <label for="{{ $col['id'] }}">{{ $col['label'] }}</label>  
            <br>
            <input type="hidden" id="lat" name="lat"  >
            <input type="hidden" id="lng" name="lng"  >
            <div class="form-control cursor" onclick="$('.map-modal').show()" >
                <span class="fa fa-map-marker w3-large" ></span>
                <span> {{ $col['label'] }} </span>
            </div>
            <br>

            <div class="modal map-modal" style="z-index: 999999999999999" >
                <div class="w3-modal-content modal-content" >
                    <div class="modal-header" >
                        <center>{{ __('choose the location from the map') }}</center>
                    </div>
                    <div class="modal-body" >
                        <div id="map" class="w3-block"  style="height: 300px" ></div>
                    </div>
                    <div  class="modal-footer" >
                        <center>
                            <button type="button" class="btn btn-primary shadow" onclick="$('.map-modal').hide()" >{{ __('ok') }}</button>
                            <button type="button" class="btn btn-primary shadow" onclick="getLocation()" >{{ __('current location') }}</button>
                        </center>
                    </div>
                </div>
            </div>
             
            <script>
                var map;
                var marker = null;
                var placeMarker = null;
                function getLocation() {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(updatePosition);
                    } else { 
                       //
                    }
                  }

                  function updatePosition(position) {
                      placeMarker(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), map);
                      /*
                    x.innerHTML = "Latitude: " + position.coords.latitude + 
                    "<br>Longitude: " + position.coords.longitude;*/
                  }

                function initMap() {
                    map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: 30.0455965, lng: 31.2387195},
                        zoom: 12
                    });

                    google.maps.event.addListener(map, 'click', function (e) {
                        placeMarker(e.latLng, map);
                    });

                    placeMarker = function (position, map) {
                        try {
                            marker.setMap(null);
                        } catch (e) {
                        }
                        marker = new google.maps.Marker({
                            position: position,
                            map: map
                        });
                        document.getElementById("lng").value = position.lng();
                        document.getElementById("lat").value = position.lat();

                        $(".lnglat").html(position.lat() + ", " + position.lng());
                        map.panTo(position);
                    }

                }
            </script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4ow5PXyqH-gJwe2rzihxG71prgt4NRFQ&callback=initMap"
async defer></script>

        </div>
        @elseif ($col["type"] == "rate")
        <div class="form-group w3-padding {{ $col['col'] == null? 'col-lg-4 col-md-4 col-sm-6 col-xs-12' : $col['col'] }} "> 
            <label for="{{ $col['id'] }}">{{ $col['label'] }}</label>  
            <input type="hidden" name="{{ $col['name'] }}" id='{{ $col["id"] }}' >
            <div class="{{ $col['class'] }}" id='rate-{{ $col["id"] }}'  >

            </div>
        </div>
        <script>
                    $(document).ready(function(){
            var r{{ $col['id'] }} = new Ratebar(document.getElementById('rate-{{ $col["id"] }}'));
                    r{{ $col['id'] }}.setOnRate(function(){
            document.getElementById('{{ $col["id"] }}').value = r{{ $col['id'] }}.value;
            });
            });</script> 
        @elseif ($col["type"] == "image")
        <div class="form-group w3-padding {{ $col['col'] == null? 'col-lg-4 col-md-4 col-sm-6 col-xs-12' : $col['col'] }} ">
            <label for="">{{ $col['label'] }} *</label>
            <div class="form-control cursor" onclick="$('.image-{{ $col['id'] }}').click()" >
                <span class="fa fa-image w3-large" ></span>
                <span> 90&times;90 </span>
            </div> 
            <img class="imageView w3-round" width="30px" height="30px" onclick="viewImage(this)"  style="cursor: pointer" >
            <input 
                type="file" 
                onchange="loadImage(this, event)" 
                class="hidden image-{{ $col['id'] }} {{ $col['class'] }}" 
                {{ $col["required"]? "required" : '' }}
                name="{{ $col['name'] }}" 
                accept="image/x-png,image/gif,image/jpeg" >
        </div>  
        @elseif ($col["type"] == "pdf")
        <div class="form-group w3-padding {{ $col['col'] == null? 'col-lg-4 col-md-4 col-sm-6 col-xs-12' : $col['col'] }} ">
            <label for="">{{ $col['label'] }} *</label>
            <div class="form-control cursor" onclick="$('.file-{{ $col['id'] }}').click()" >
                <span class="fa fa-image w3-large" ></span>
                <span> max file size 5M </span>
            </div>
            <br>
            <span class="fileView label label-primary" onclick="viewFile(this)" style="cursor: pointer" ></span>
            <input 
                type="file" 
                onchange="loadFile(this, event)" 
                class="hidden file-{{ $col['id'] }} {{ $col['class'] }}" 
                {{ $col["required"]? "required" : '' }}
                name="{{ $col['name'] }}" 
                accept="application/pdf" >
        </div>  
        @elseif ($col["type"] == "checkbox")
        <div class="form-group w3-padding {{ $col['col'] == null? 'col-lg-4 col-md-4 col-sm-6 col-xs-12' : $col['col'] }}">
            <label for="">{{ $col['label'] }}</label>
            <br>
            <input type="hidden" name="{{ $col['name'] }}" id="input-{{ $col['id'] }}" value="1" >
            <div class="material-switch pull-right">
                <input id="{{ $col['id'] }}"   
                       type="checkbox" 
                       onchange="this.checked? $('#input-{{ $col['id'] }}').val(1) : $('#input-{{ $col['id'] }}').val(0)"
                    checked=""/>
                <label for="{{ $col['id'] }}" class="label-primary {{ $col['class'] }}"></label>
            </div> 
        </div>  
        @elseif ($col["type"] == "textarea")
        <div class="form-group w3-padding {{ $col['col'] == null? 'col-lg-4 col-md-4 col-sm-6 col-xs-12' : $col['col'] }} ">
            <label for="{{ $col['id'] }}">{{ $col['label'] }}</label>
            <textarea
                {{ $col["required"]? "required" : '' }} 
                class="form-control {{ $col['class'] }}" 
                id="{{ $col['id'] }}" 
                name="{{ $col['name'] }}" 
                placeholder="{{ $col['placeholder'] }}"></textarea> 
        </div> 
        @elseif ($col["type"] == "phone")
        <div class="form-group w3-padding {{ $col['col'] == null? 'col-lg-4 col-md-4 col-sm-6 col-xs-12' : $col['col'] }} ">
            <label for="{{ $col['id'] }}">{{ $col['label'] }}</label>
            <input 
                {{ $col["required"]? "required" : '' }}
                type="tel" 
                class="form-control {{ $col['class'] }}" 
                id="{{ $col['id'] }}" 
                name="{{ $col['name'] }}" 
                placeholder="{{ $col['placeholder'] }}">
        </div> 
        @else 
        <div class="input-append date form-group w3-padding {{ $col['col'] == null? 'col-lg-4 col-md-4 col-sm-6 col-xs-12' : $col['col'] }} ">
            <label for="{{ $col['id'] }}">{{ $col['label'] }}</label>
            <input 
                {{ $col["required"]? "required" : '' }}
                type="{{ $col['type'] }}" 
                class="form-control {{ $col['class'] }}" 
                id="{{ $col['id'] }}" 
                name="{{ $col['name'] }}" 
                value="{{ $col['value']? $col['value'] : '' }}"
                placeholder="{{ $col['placeholder'] }}">
        </div> 
        @endif


        @endif

        @endforeach
    </div>
    <br>
    <br>
    <div class="box-footer">
        <button type="button" class="btn btn-default btn-flat margin" data-dismiss="modal">اغلاق</button>
        <button type="submit" class="btn btn-primary btn-flat margin" onclick="$(this).parent().parent().find('input[type=file]').attr('required')? error('{{ __("upload file") }}') : ''" >حفظ</button>
    </div>  
</form> 

<script>
//Date picker
    $('input[type=datetime]').attr("data-date-format", "yyyy-mm-dd hh:ii:ss");
    $('input[type=datetime]').datetimepicker({
      autoclose: true
    })
</script>