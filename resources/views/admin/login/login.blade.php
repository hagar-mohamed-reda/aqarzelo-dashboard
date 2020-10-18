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
                background-image: url('{{ url("/website/image/back1.jpg")  }}')!important;
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
                    <img src="{{ url('/website/image/zelo.png') }}" class="w3-center w3-round animate__animated animate__bounce animate__slow animate__infinite	infinite"  width="90px" >
                    <br>
                    <a href="#"  class="w3-text-gray" ><b class="  animate__animated animate__pulse animate__slow animate__infinite	infinite" > AQAR ZELO  </b></a>
                </div>
                <!-- /.login-logo -->
                <div class="login-box-body w3-card">
                    <p class="login-box-msg">{{ __('login to your dashboard control') }}</p>

                    <br>

                    @include('admin.login.admin')




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


