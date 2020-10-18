<div style="width: 120px" >

    @if (Auth::user()->_can('edit category'))
    <i class="fa fa-edit w3-text-orange w3-button" onclick="edit('{{ url('/admin/category/edit') . '/' . $category->id }}')" ></i>
    @endif

    @if (Auth::user()->_can('remove category'))
    <i class="fa fa-trash w3-text-red w3-button" onclick="remove('', '{{ url('/admin/category/remove/') .'/' . $category->id }}')" ></i>
    @endif
</div>
