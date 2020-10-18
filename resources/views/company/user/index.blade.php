@extends("dashboard.layout.app")

<style>
    .project-group {
        display: none;
    }
</style>

@section("title")
{{ __('users') }}
@endsection
@php
    $builder = (new App\UserCompany)->getViewBuilder();
@endphp

@section("content")
<table class="table table-bordered" id="table" >
    <thead>
        <tr>
            @foreach($builder->cols as $col)
            @if ($col['name'] != "password")
            <th>{{ $col['label'] }}</th>
            @endif
            @endforeach
            <th></th>
        </tr>
    </thead>
    <tbody>

    </tbody>
</table>

@endsection

@section("additional")
<!-- add modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="addModal" style="width: 100%!important;height: 100%!important" >
    <div class="modal-dialog modal-lg" role="document" >
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{ __('add user') }}</h4>
      </div>
      <div class="modal-body">
        {!! $builder->loadAddView() !!}
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<!-- edit modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="editModal" style="width: 100%!important;height: 100%!important" >
    <div class="modal-dialog modal-lg" role="document" >
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{ __('edit user') }}</h4>
      </div>
      <div class="modal-body editModalPlace">

      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
@endsection

@section("js")
@if (!Auth::user()->_can('add user'))
<script>
    $('.floatbtn-place').remove();
</script>
@endif
<script>

$(document).ready(function() {
     $('#table').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "{{ url('/company/user/data') }}",
        "columns":[
            @foreach($builder->cols as $col)
            @if ($col['name'] != "password")
            { "data": "{{ $col['name'] }}" },
            @endif
            @endforeach
            { "data": "action" }
        ]
     });

     formAjax();

});
</script>
@endsection
