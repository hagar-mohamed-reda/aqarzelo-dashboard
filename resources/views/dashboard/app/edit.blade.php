 
<!-- Modal -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" style="background: rgba(0,0,0,.2)" >
    <div class="modal-dialog" role="document">
        <form action="{{ $config['edit_route'] }}" method="post" id="form" >
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" data-target="#editModal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="editModalLabel">{{ $config["edit_title"] }}</h4>
                </div>
                <div class="modal-body">
                    {{ csrf_field() }}

                    @foreach($config["fields"] as $key => $field)

                    @if ($field["type"] == ("text" || "password" || "email" ))
                    <div class="form-group">
                        <label for="{{ $key }}">{{ $field["label"] }}</label>
                        <input 
                            type="{{ $field['type'] }}" 
                            class="form-control {{ $key }}" 
                            id="{{ $key }}" 
                            name="{{ $key }}"
                            value="{{ $object[$key] }}"
                            {{ $field["required"] ? "required" : "" }}
                            placeholder="{{ $field['label'] }}">
                    </div> 
                    @endif


                    @endforeach

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" data-target="#editModal">close</button>
                    <button type="submit" class="btn btn-primary">save</button>
                </div>
            </div>
        </form>
    </div>
</div>  