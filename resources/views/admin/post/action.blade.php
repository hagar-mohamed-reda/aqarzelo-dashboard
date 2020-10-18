<div style="width: 120px" >

    @if (Auth::user()->_can('edit post'))
<i class="fa fa-edit w3-text-orange w3-button" onclick="showPage('admin/post/create?post_id={{ $post->id }}')" ></i>
    @endif

    @if (Auth::user()->_can('remove post'))
    <i class="fa fa-trash w3-text-red w3-button" onclick="remove('', '{{ url('/admin/post/remove/') .'/' . $post->id }}')" ></i>
    @endif
</div>
