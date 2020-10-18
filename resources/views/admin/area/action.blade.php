<div style="width: 120px" >

    @if (Auth::user()->_can('edit area'))
    <i class="fa fa-edit w3-text-orange w3-button" onclick="edit('{{ url('/admin/area/edit') . '/' . $area->id }}')" ></i>
    @endif

    @if (Auth::user()->_can('remove area'))
    <i class="fa fa-trash w3-text-red w3-button" onclick="remove('', '{{ url('/admin/area/remove/') .'/' . $area->id }}')" ></i>
    @endif
</div>
