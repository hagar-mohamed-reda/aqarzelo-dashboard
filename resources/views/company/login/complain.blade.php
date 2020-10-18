<div class="auth-container complain-container"  >
    <div>
        <p class="login-box-msg text-center">{{ __('are you have a complaint') }}</p>
    </div>
    <form action="{{ url('/') }}/dashboard/complain/store" class="" method="post">
        {{ csrf_field() }}
        <div class="form-group has-feedback">
            <label>{{ __("i'm a ") }}</label>
            <select name="type" class="form-control" required  onchange="this.value == 'student'? $('.complaint-code-student').show(300).find('input').attr('required', 'required') : $('.complaint-code-student').hide(300).find('input').removeAttr('required')" >
                <option value="student">{{ __('student') }}</option>
                <option value="doctor">{{ __('doctor') }}</option>
            </select>
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback complaint-code-student">
            <label>{{ __('code') }}</label>
            <input required=""  type="text" name="code" class="form-control" placeholder="{{ __('code') }}">
            <span class="fa fa-barcode form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
            <label>{{ __('name') }}</label>
            <input required="" type="text" name="name" class="form-control" placeholder="{{ __('name') }}">
            <span class="fa fa-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
            <label>{{ __('phone') }}</label>
            <input required="" type="text" name="phone" class="form-control" placeholder="{{ __('phone') }}">
            <span class="glyphicon glyphicon-phone form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
            <label>{{ __('your complaint') }}</label>
            <textarea required class="form-control" name="notes" ></textarea>
            <span class="fa fa-edit form-control-feedback"></span>
        </div>
        <br>
        <div class="">
            <!-- /.col -->
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block btn-flat">{{ __('submit') }}</button>

                <button
                type="button"
                onclick="$('.auth-container').slideUp(500);$('.student-container').slideDown(500)"
                class="btn btn-success btn-block btn-flat">{{ __('back') }}</button>
            </div>
            <!-- /.col -->
        </div>
    </form>
</div>
