<div style="width: 120px" >

    @if (Auth::user()->_can('edit mailbox'))
    <!--
    <i class="fa fa-edit w3-text-orange w3-button" onclick="edit('{{ url('/admin/mailbox/edit') . '/' . $mailbox->id }}')" ></i>
    -->
    @endif

    @if (Auth::user()->_can('remove mailbox'))
    <i class="fa fa-trash w3-text-red w3-button" onclick="remove('', '{{ url('/admin/mailbox/remove/') .'/' . $mailbox->id }}')" ></i>
    @endif
</div>
