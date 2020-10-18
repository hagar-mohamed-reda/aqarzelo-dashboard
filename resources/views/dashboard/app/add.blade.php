 
<!-- Modal -->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" style="background: rgba(0,0,0,.2)" >
    <div class="modal-dialog" role="document">
        <form action="{{ $config['add_route'] }}" method="post" id="form" >
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="addModalLabel">{{ $config["add_title"] }}</h4>
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
                            {{ $field["required"] ? "required" : "" }}
                            placeholder="{{ $field['label'] }}">
                    </div> 
                    @endif


                    @endforeach

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">close</button>
                    <button type="submit" class="btn btn-primary">save</button>
                </div>
            </div>
        </form>
    </div>
</div>  