<div style="width: 220px" >
    @if (Auth::user()->_can('edit role'))
    <i class="fa fa-edit w3-text-orange w3-button" onclick="edit('{{ url('/dashboard/role/edit') . '/' . $role->id }}')" ></i>
    @endif
    
    @if (Auth::user()->_can('add permission'))
    <i class="fa fa-cogs w3-text-green w3-button"  
       onclick="edit('{{ url('/dashboard/role/permission') . '/' . $role->id }}', 'permissionModal',  'permissionModalPlace')" ></i>
    @endif
    
    @if (Auth::user()->_can('remove role'))
    <i class="fa fa-trash w3-text-red w3-button" onclick="remove('', '{{ url('/dashboard/role/remove/') .'/' . $role->id }}')" ></i>
    @endif
</div>