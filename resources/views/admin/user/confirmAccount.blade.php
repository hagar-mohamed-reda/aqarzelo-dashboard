
<!-- edit modal -->
<div class="modal fade confirm_account_modal"  role="dialog"  style="width: 100%!important;height: 100%!important;z-index: 9999999" >
    <div class="modal-dialog modal-" role="document" >
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <center class="modal-title w3-xlarge text-capitalize">{{ __('confirm account') }}</center>
      </div>
      <div class="modal-body editModalPlace">
          <center>
              <p class="w3-large" >{{ __('are you sure from your account information') }}</p>
          </center> 
          <form class="form" method="post" action="{{ url('dashboard/profile/update') }}"   >
              {{ csrf_field() }}
                <center class="form-group w3-padding"> 
                  <img src="{{ url('image/form.png') }}" width="100px" >
                  <input type="hidden" name="account_confirm" id="input_confirm_account" value="1">
                  
                  <br>
                  <button type="submit" class="btn btn-success btn-flat margin">{{ __('yes') }}</button>
                    <button type="button" class="btn btn-default btn-flat margin close_confirm_account_modal" data-dismiss="modal">{{ __('cancel') }}</button>
                </center>
              
          </form>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->