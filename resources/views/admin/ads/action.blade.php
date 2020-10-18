<div style="width: 120px" >

    @if (Auth::user()->_can('edit ads'))
    <i class="fa fa-edit w3-text-orange w3-button" onclick="edit('{{ url('/admin/ads/edit') . '/' . $ads->id }}')" ></i>
    @endif

    @if (Auth::user()->_can('remove ads'))
    <i class="fa fa-trash w3-text-red w3-button" onclick="remove('', '{{ url('/admin/ads/remove/') .'/' . $ads->id }}')" ></i>
    @endif
</div>
