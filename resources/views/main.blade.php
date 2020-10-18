
<!-- Content Header (Page header) -->
<section class="content-header">
    <h1 class="font w3-xxlarge" >
        {{ __('dashboard') }} 
        <small></small>
    </h1>
    <ol class="breadcrumb">
        <li class="active">{{ __('dashboard') }}</li>
    </ol>
</section>

<!-- Main content -->
<section class="content" style="overflow: auto!important" >
    <!-- Info boxes -->
    <div class="row">
        @if (Auth::user()->type == 'student')
        <div class="col-lg-3 col-md-3 col-sm-12  col-xs-12">
            <a class="info-box" href="#" onclick='showPage("dashboard/profile")'  >
                <span class="info-box-icon w3-indigo"><i class="fa fa-user"></i></span>

                <div class="info-box-content">
                    <span class="info-box-text">{{ __('profile') }}</span>
                </div>
                <!-- /.info-box-content -->
            </a>
            <!-- /.info-box -->
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12  col-xs-12">
            <a class="info-box" href="#"  onclick='showPage("dashboard/myresearch")'   >
                <span class="info-box-icon bg-aqua"><i class="fa fa-newspaper-o"></i></span>

                <div class="info-box-content">
                    <span class="info-box-text">{{ __('my researchs') }}</span>
                    <span class="info-box-number">{{ Auth::user()->toStudent()->researchs()->count() }}<small></small></span>
                </div>
                <!-- /.info-box-content -->
            </a>
            <!-- /.info-box -->
        </div>
        <!-- /.col -->
            <div class="col-lg-3 col-md-3 col-sm-12  col-xs-12">
            <a class="info-box"  href="#"   onclick='showPage("dashboard/course")'    >
                <span class="info-box-icon bg-red"><i class="fa fa-graduation-cap"></i></span>

                <div class="info-box-content">
                    <span class="info-box-text">{{ __('courses') }}</span>
                    <span class="info-box-number">{{ Auth::user()->toStudent()->courses()->count() }}</span>
                </div>
                <!-- /.info-box-content -->
            </a>
            <!-- /.info-box -->
        </div>
        <!-- /.col -->
        
        <!-- /.col -->
        <div class="col-lg-3 col-md-3 col-sm-12  col-xs-12">
            <a class="info-box"  href="#"   onclick='showPage("dashboard/profile?tab=login_history")'    >
                <span class="info-box-icon w3-purple"><i class="fa fa-list-alt"></i></span>

                <div class="info-box-content">
                    <span class="info-box-text">{{ __('login history') }}</span>
                    <span class="info-box-number">{{ Auth::user()->loginHistories()->count() }}</span>
                </div>
                <!-- /.info-box-content -->
            </a>
            <!-- /.info-box -->
        </div>
        <!-- /.col -->
        @endif
 

        <!-- /.col -->
    </div>
    <!-- /.row -->
 
    <br>
    <br>
    <br>
    <!-- /.row -->
    
</section>
<script src="{{ url('/') }}/js/Chart.min.js"></script> 