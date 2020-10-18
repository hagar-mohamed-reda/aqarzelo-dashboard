<div style="width: 120px" >

    @if (Auth::user()->_can('edit controlmanager'))
    <i class="fa fa-edit w3-text-orange w3-button" onclick="edit('{{ url('/dashboard/controlmanager/edit') . '/' . $controlmanager->id }}')" ></i>
    @endif

    @if (Auth::user()->_can('remove controlmanager'))
    <i class="fa fa-trash w3-text-red w3-button" onclick="remove('', '{{ url('/dashboard/controlmanager/remove/') .'/' . $controlmanager->id }}')" ></i>
    @endif
</div>
