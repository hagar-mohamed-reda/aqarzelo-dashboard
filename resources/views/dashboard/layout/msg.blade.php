@if(request()->msg)
    @if(request()->status == 1)
        <script>
            success('{{ request()->msg }}');
        </script>
    @else
        <script>
            error('{{ request()->msg }}');
        </script>
    @endif
@endif
