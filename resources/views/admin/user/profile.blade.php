
<!-- Content Header (Page header) -->
<br>
<br>
<section class="content-header font">
    <h1 class="font" >
        {{ __('profile') }}
    </h1>
    <ol class="breadcrumb font">
        <li><a href="#" onclick="showPage('admin/profile')" ><i class="fa fa-admin"></i> لوحة التحكم</a></li>
        <li class="active">{{ __('profile') }}</li>
    </ol>
</section>


<section class="content">

      <div class="row">
        <div class="col-md-3">

          <!-- Profile Image -->
          <div class="box box-primary">
            <div class="box-body box-profile">
              <img class="profile-user-img img-responsive img-circle" src="{{ Auth::user()->photo_url }}" alt="User profile picture">

              <h3 class="profile-username text-center">{{ Auth::user()->name }}</h3>


              <p class="text-muted text-center">{{ optional(Auth::user()->company)->name }}</p>

              <ul class="list-group list-group-unbordered">

                <li class="list-group-item">
                  <b>{{ __('mails') }}</b> <a class="pull-right">{{ number_format(Auth::user()->mails()->count()) }}</a>
                </li>

                <li class="list-group-item">
                  <b>{{ __('favourite_posts') }}</b> <a class="pull-right">{{ number_format(Auth::user()->favourites()->count()) }}</a>
                </li>

                <li class="list-group-item">
                  <b>{{ __('posts') }}</b> <a class="pull-right">{{ number_format(Auth::user()->posts()->count()) }}</a>
                </li>
              </ul>

              <a href="#" class="btn btn-primary btn-block hidden"><b>Follow</b></a>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
          <!-- About Me Box -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">{{ __('personal info') }}</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <strong><i class="fa fa-book margin-r-5"></i> {{ __('name') }}</strong>
              <p class="text-muted">
                {{ Auth::user()->name }}
              </p>
              <hr>
              <strong><i class="fa fa-envelope margin-r-5"></i> {{ __('email') }}</strong>
              <p class="text-muted">
                {{ Auth::user()->email }}
              </p>
              <hr>
              <strong><i class="fa fa-phone margin-r-5"></i> {{ __('phone') }}</strong>
              <p class="text-muted">
                {{ Auth::user()->phone }}
              </p>
              <hr>
              <strong><i class="fa fa-envelope margin-r-5"></i> {{ __('address') }}</strong>
              <p class="text-muted">
                {{ Auth::user()->address }}
              </p>
              <hr>

            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
        <div class="col-md-9">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="{{ !request()->tab? 'active' : '' }}"><a href="#activity" data-toggle="tab">{{ __('Activities') }}</a></li>

              <li><a href="#timeline" data-toggle="tab">{{ __('setting') }}</a></li>

              <li><a href="#password" data-toggle="tab">{{ __('change password') }}</a></li>

              <li><a href="#phone" data-toggle="tab">{{ __('change phone') }}</a></li>
            </ul>
            <div class="tab-content">

              <div class="active tab-pane" id="activity">
                   <!-- The timeline -->
                <ul class="timeline timeline-inverse">
                  <!-- timeline time label -->
                  <?php
                    $currentDate = '';
                  ?>
                  @foreach(Auth::user()->notifications()->orderBy('created_at', 'desc')->get() as $item)

                  @if (date('Y-m-d', strtotime($item->created_at)) != $currentDate)
                  <li class="time-label">
                        <span class="bg-red">
                          {{ date('Y-m-d', strtotime($item->created_at)) }}
                        </span>
                  </li>
                  @endif
                  <!-- timeline item -->
                  <li>
                    <i class="fa fa-bell {{ App\helper\Helper::randColor() }}"></i>

                    <div class="timeline-item">
                      <span class="time"><i class="fa fa-clock-o"></i> {{ date('H:i', strtotime($item->created_at)) }}</span>

                      <h3 class="timeline-header"><a href="#">{{ $item->title }}</a></h3>

                      <div class="timeline-body">
                       {{ $item->body }}
                      </div>
                    </div>
                  </li>


                  <?php
                    $currentDate = date('Y-m-d', strtotime($item->created_at));
                  ?>
                  @endforeach

                </ul>
              </div>
              <!-- /.tab-pane -->

              <div class="tab-pane" id="timeline">
                <!-- The timeline -->
                 <form action="{{ url('/') }}/admin/profile/update" autocomplete="off" class="form" method="post"  >
                    {{ csrf_field() }}
                    <div class="form-group has-feedback">
                        <label>{{ __('name') }}</label>
                        <input required="" type="text" name="name" class="form-control" value="{{ Auth::user()->name }}" placeholder="{{ __('name') }}">
                        <span class="fa fa-user form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                        <label>{{ __('photo') }}</label>
                        <input  type="file" name="photo" class="form-control" placeholder="{{ __('photo') }}">
                        <span class="fa fa-user form-control-feedback"></span>
                        <br>
                        <img src="{{ Auth::user()->photo_url }}" width="30px" alt="">
                    </div>

                    <br>
                    <div class="">
                        <!-- /.col -->
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block btn-flat">{{ __('submit') }}</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
              </div>
              <!-- /.tab-pane -->


              <div class="tab-pane" id="password">
                <!-- The timeline -->
                 <form action="{{ url('/') }}/admin/profile/update-password" autocomplete="off" class="form" method="post"  >
                    {{ csrf_field() }}
                    <div class="form-group has-feedback">
                        <label>{{ __('old password') }}</label>
                        <input required="" type="password" name="old_password" autocomplete="off" value=""  class="form-control" placeholder="{{ __('password') }}">
                        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                        <label>{{ __('new password') }}</label>
                        <input required="" type="password" name="new_password"  value="" autocomplete="off" class="form-control" placeholder="{{ __('confirm password') }}">
                        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                        <label>{{ __('confirm password') }}</label>
                        <input required="" type="password" name="confirm_password"  value="" autocomplete="off" class="form-control" placeholder="{{ __('confirm password') }}">
                        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <br>
                    <div class="">
                        <!-- /.col -->
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block btn-flat">{{ __('submit') }}</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
              </div>

              <div class="tab-pane" id="phone">
                <!-- The timeline -->
                 <form action="{{ url('/') }}/admin/profile/update-phone" autocomplete="off" class="form" method="post"  >
                    {{ csrf_field() }}
                    <div class="form-group has-feedback">
                        <label>{{ __('new phone') }}</label>
                        <input required="" type="text" name="phone" autocomplete="off"  class="form-control" placeholder="{{ __('phone') }}">
                        <span class="glyphicon glyphicon-phone form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                        <label>{{ __('confirm phone') }}</label>
                        <input required="" type="text" name="confirm_phone" autocomplete="off"  value=""  class="form-control" placeholder="{{ __('confirm phone') }}">
                        <span class="glyphicon glyphicon-phone form-control-feedback"></span>
                    </div>
                    <br>
                    <div class="">
                        <!-- /.col -->
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block btn-flat">{{ __('submit') }}</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
              </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- /.nav-tabs-custom -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->

    </section>

<script>
    formAjax(false, function(r){
        if (r.status == 1) {
            showPage('admin/profile');
        }
    });

$(document).ready(function() {
     $('#table').DataTable({
         "pageLength": 10,

     });


});
</script>
