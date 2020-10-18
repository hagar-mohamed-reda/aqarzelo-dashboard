@extends("dashboard.layout.app")

@section("title")
{{ __('mailbox') }}
@endsection
@php
    $builder = (new App\Mailbox)->getViewBuilder();
@endphp

@section("content")
<table class="table table-bordered" id="table" >
    <thead>
        <tr>
            @foreach($builder->cols as $col)
            <th>{{ $col['label'] }}</th>
            @endforeach
            <th></th>
        </tr>
    </thead>
    <tbody>

    </tbody>
</table>

@endsection


@section("js")

<script>
    $('.app-add-button').remove();
</script>
<script>

$(document).ready(function() {
    $('#table').DataTable({
        "processing": true,
        "serverSide": true,
        "pageLength": 5,
        "sorting": [0, 'DESC'],
        "ajax": "{{ url('/admin/mailbox/data') }}",
        "columns":[
            @foreach($builder->cols as $col)
            { "data": "{{ $col['name'] }}" },
            @endforeach
            { "data": "action" }
        ]
     });

     formAjax();

});
</script>
@endsection
