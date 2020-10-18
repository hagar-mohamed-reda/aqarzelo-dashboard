@extends("dashboard.layout.app")

@section("title")
{{ __('posts') }}
@endsection
@php
    $builder = (new App\Service)->getViewBuilder();
@endphp

@section("content")
<table class="table table-bordered" id="table" >
    <thead>
            <th>{{ __('id') }}</th>
            <th>{{ __('title_ar') }}</th>
            <th>{{ __('title_en') }}</th>
            <th>{{ __('category') }}</th>
            <th>{{ __('status') }}</th>
            <th></th>
        </tr>
    </thead>
    <tbody>

    </tbody>
</table>

@endsection

@section("additional")
<!-- add modal -->
<div class="modal fade"  role="dialog" id="addModal" style="width: 100%!important;height: 100%!important" >
    <div class="modal-dialog modal-" role="document" >
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <center class="modal-title w3-xlarge">{{ __('add post') }}</center>
      </div>
      <div class="modal-body">
        {!! $builder->loadAddView() !!}
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<!-- edit modal -->
<div class="modal fade"  role="dialog" id="editModal" style="width: 100%!important;height: 100%!important" >
    <div class="modal-dialog modal-" role="document" >
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <center class="modal-title w3-xlarge">{{ __('edit post') }}</center>
      </div>
      <div class="modal-body editModalPlace">

      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
@endsection

@section("js")

@if (!Auth::user()->_can('add post'))
<script>
    $('.app-add-button').remove();
</script>
@endif
<script>
    $('.app-add-button').click(function(){
        showPage('admin/post/create');
    });

$(document).ready(function() {
    $('#table').DataTable({
        "processing": true,
        "serverSide": true,
        "pageLength": 5,
        "sorting": [0, 'DESC'],
        "ajax": "{{ url('/admin/post/data') }}",
        "columns":[
            { "data": "id" },
            { "data": "title_ar" },
            { "data": "title" },
            { "data": "category_id" },
            { "data": "status" },
            { "data": "action" }
        ]
     });

     formAjax();

});
</script>
@endsection
