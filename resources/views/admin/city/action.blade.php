<div style="width: 120px" >

    @if (Auth::user()->_can('edit city'))
    <i class="fa fa-edit w3-text-orange w3-button" onclick="edit('{{ url('/admin/city/edit') . '/' . $city->id }}')" ></i>
    @endif

    @if (Auth::user()->_can('remove city'))
    <i class="fa fa-trash w3-text-red w3-button" onclick="remove('', '{{ url('/admin/city/remove/') .'/' . $city->id }}')" ></i>
    @endif
</div>
