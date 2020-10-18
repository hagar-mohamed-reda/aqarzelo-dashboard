<div class="auth-container {{ $type }}-container"  >
    <div>
    </div>
    <form action="{{ url('/') }}/company/login" class="auth-card {{ $type }}-login-card" method="post">
        {{ csrf_field() }}
        <input type="hidden" name="type" value="{{ $type }}" >
        <div class="form-group has-feedback">
            <input required="" type="text" name="phone" class="form-control" placeholder="{{ __('phone') }}">
            <span class="glyphicon glyphicon-phone form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
            <input required="" type="password" name="password" class="form-control" placeholder="{{ __('password') }}">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <br>
        <div class="">
            <!-- /.col -->
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block btn-flat">{{ __('login') }}</button>

            </div>
            <!-- /.col -->
        </div>
    </form>

    <br>
</div>
