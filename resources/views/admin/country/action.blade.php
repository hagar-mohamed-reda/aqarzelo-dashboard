<div style="width: 120px" >

    @if (Auth::user()->_can('edit country'))
    <i class="fa fa-edit w3-text-orange w3-button" onclick="edit('{{ url('/admin/country/edit') . '/' . $country->id }}')" ></i>
    @endif

    @if (Auth::user()->_can('remove country'))
    <i class="fa fa-trash w3-text-red w3-button" onclick="remove('', '{{ url('/admin/country/remove/') .'/' . $country->id }}')" ></i>
    @endif
</div>
