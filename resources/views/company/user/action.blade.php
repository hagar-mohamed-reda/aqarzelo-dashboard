<div style="width: 120px" >
    @if (Auth::user()->_can('edit user'))
    <i class="fa fa-edit w3-text-orange w3-button" onclick="edit('{{ url('/company/user/edit') . '/' . $user->id }}')" ></i>
    @endif

    @if (Auth::user()->_can('remove user'))
    <i class="fa fa-trash w3-text-red w3-button" onclick="remove('', '{{ url('/company/user/remove/') .'/' . $user->id }}')" ></i>
    @endif
</div>
