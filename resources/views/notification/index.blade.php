@extends("dashboard.layout.app")

@section("title")
{{ __('notifications') }}
@endsection 
@section("content")
<table class="table table-bordered" id="table" >
    <thead>
        <tr> 
            <th>{{ __('title') }}</th>   
            <th>{{ __('body') }}</th>   
            <th>{{ __('user_id') }}</th>   
            <th>{{ __('created_at') }}</th>   
            <th></th>
        </tr>
    </thead> 
    <tbody>
        
    </tbody>
</table>

@endsection
 

@section("js") 
<script>
$(document).ready(function() {
     $('#table').DataTable({
        "processing": true,
        "serverSide": true,
        "pageLength": 20,
        "ajax": "{{ url('/dashboard/notification/data') }}",
        "columns":[ 
            { "data": "title" },   
            { "data": "body" },   
            { "data": "user" },   
            { "data": "created_at" },   
            { "data": "action" }
        ]
     });
     
     formAjax(); 
        
}); 
</script>
@endsection
