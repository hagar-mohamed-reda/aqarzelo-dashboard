<!doctype html>
<html lang="">
    <head>
        <!-- load css files -->
        {!! view("dashboard.layout.css") !!}

        <style>
            body, html {
                overflow: auto!important;
            }
            body {
                background-image: url('{{ url("/website/image/home-slide-image.jpg")  }}')!important;
                background-size: cover!important;
                /*background-repeat: no-repeat!important;*/
            }



        </style>
    </head>
    <body class="hold-transition login-page w3-light-gray" style="overflow: auto!important">

        <div id="root" style="overflow: auto!important" >

            <!-- Content Wrapper. Contains page content -->
            <div class="login-box w3-animate-top " style="margin-top: 30px" >
                <div class="login-logo">
                    <img src="https://aqarzelo.com/backend/logopng.ico" class="w3-center w3-round animate__animated animate__bounce animate__slow animate__infinite	infinite"  width="90px" >
                    <br>
                    <a href="#"   style="color: #02A2A7!important" ><b class="  animate__animated animate__pulse animate__slow animate__infinite	infinite" > AQARZELO  </b></a>
                </div>
                <!-- /.login-logo -->
                <div class="login-box-body w3-card">
                    <p class="login-box-msg" style="color: #02A2A7!important">{{ __('login to your dashboard control') }}</p>

                    <br>

                    <div class="auth-container admin-container"  >
                        <div>
                        </div>
                        <form action="{{ url('/') }}/admin/login" class="auth-card admin-login-card" method="post">
                            {{ csrf_field() }}
                            <input type="hidden" name="type" value="admin" >
                            <div class="form-group has-feedback">
                                <input required="" type="text" name="phone" class="form-control" placeholder="{{ __('phone or email') }}">
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
                                    <button type="submit" style="background: #02A2A7!important" class="btn btn-primary btn-block btn-flat">{{ __('login') }}</button>

                                </div>
                                <!-- /.col -->
                            </div>
                        </form>

                        <br>
                    </div>





                </div>
                <!-- /.login-box-body -->
            </div>

        </div>

        <!-- load js files -->
        {!! view("dashboard.layout.js") !!}

        <!-- message scripts -->
        {!! view("dashboard.layout.msg") !!}
    </body>
</html>


