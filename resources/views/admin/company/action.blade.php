<div style="width: 120px" >

    @if (Auth::user()->_can('edit company'))
    <i class="fa fa-edit w3-text-orange w3-button" onclick="edit('{{ url('/admin/company/edit') . '/' . $company->id }}')" ></i>
    @endif

    @if (Auth::user()->_can('remove company'))
    <i class="fa fa-trash w3-text-red w3-button" onclick="remove('', '{{ url('/admin/company/remove/') .'/' . $company->id }}')" ></i>
    @endif
</div>
