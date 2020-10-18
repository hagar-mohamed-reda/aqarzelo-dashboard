<div style="width: 120px" >

    @if (Auth::user()->_can('edit service'))
    <i class="fa fa-edit w3-text-orange w3-button" onclick="edit('{{ url('/admin/service/edit') . '/' . $service->id }}')" ></i>
    @endif

    @if (Auth::user()->_can('remove service'))
    <i class="fa fa-trash w3-text-red w3-button" onclick="remove('', '{{ url('/admin/service/remove/') .'/' . $service->id }}')" ></i>
    @endif
</div>
