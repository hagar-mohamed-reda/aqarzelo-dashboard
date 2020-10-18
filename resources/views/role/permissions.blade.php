<form action="{{ url('dashboard/role/permission/update/') }}/{{ $role->id }}" method="post" class="form" >  
    {{ csrf_field() }}
    <table class="table table-bordered text-right w3-block" id="Permissiontable" >
        <thead>
            <tr>
                <th class="text-right" >{{ __('permission name') }}</th>
                <th>-</th>
            </tr>
            <tr>
                <th class="text-right" >{{ __('select all') }}</th>
                <th> 
                    <input type="checkbox"  
                           onclick="$('.permission-check').click()"
                           style="visibility: visible!important;width:auto;height: auto" >
                </th>
            </tr>
        </thead>

        <tbody>
            @foreach(App\Permission::all() as $item)
            <tr>
                <td>
                    {{ __($item->name) }}
                    <input type="hidden" name="permission[]" value="{{ $item->id }}" >
                </td>
                <td> 
                    <input 
                        type="checkbox" 
                        class="permission-check" 
                        name="can[]" 
                        onclick="this.checked? this.value = 1 : this.value = 0"
                        value="{{ App\RoleHasPermission::where('role_id', $role->id)->where("permission_id", $item->id)->first()? 1 : 0}}"
                        {{ App\RoleHasPermission::where('role_id', $role->id)->where("permission_id", $item->id)->first()? 'checked' : '' }}
                        style="visibility: visible!important;width:auto;height: auto" >
                </td>
            </tr>
        @endforeach
        </tbody>

    </table>
    <br>
    <center>
        <button class="btn btn-primary shadow" >{{ __('save') }}</button>
    </center>
</form>

<script>
$(document).ready(function() {
     $('#Permissiontable').DataTable({ 
        "pageLength": 10, 
     });
     
     formAjax(); 
        
}); 
</script>