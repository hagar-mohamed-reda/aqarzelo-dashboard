
<!-- Left side column. contains the sidebar -->
<aside class="main-sidebar shadow"  >
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar  ">
        <!-- Sidebar user panel -->
        <div class="user-panel" style="background: url({{ url('/dist/img/patterns/user-panel-bg_green.jpg') }});background-size: cover;bakcground-repeat: no-repeat!important;height: 150px;padding-top: 50px;" >
            <div class="pull-left image">
                @if (Auth::user()->photo)
                <img src="{{ url('/') }}/image/users/{{ Auth::user()->photo }}" class="img-circle" alt="User Image">
                @else
                <img src="{{ url('/') }}/image/user.png" class="img-circle" alt="User Image">
                @endif
            </div>
            <div class="pull-left info w3-padding">
                <a href="#"  onclick="showPage('dashboard/profile')" class="w3-text-white w3-large"  ><b>{{ Auth::user()->name }}</b></a>
            </div>
        </div>

        <ul class="sidebar-menu font" data-widget="tree">
            <li class="header text-uppercase">{{ __('main navigation') }}</li>

            <li class="treeview font w3-text-pink" onclick="showPage('admin/profile')" >
                <a href="#">
                    <i class="fa fa-user"></i> <span>{{ __('profile') }}</span>
                </a>
            </li>

            @if (Auth::user()->type == 'admin')

            @if (Auth::user()->_can('category'))
            <li class="treeview font w3-text-pink" onclick="showPage('admin/category')" >
                <a href="#">
                    <i class="fa fa-cubes"></i> <span>{{ __('categories') }}</span>
                </a>
            </li>
            @endif

            @if (Auth::user()->_can('post'))
            <li class="treeview font w3-text-pink" onclick="showPage('admin/post')" >
                <a href="#">
                    <i class="fa fa-image"></i> <span>{{ __('posts') }}</span>
                </a>
            </li>
            @endif

            @if (Auth::user()->_can('user'))
            <li class="treeview font w3-text-pink" onclick="showPage('admin/user')" >
                <a href="#">
                    <i class="fa fa-users"></i> <span>{{ __('users') }}</span>
                </a>
            </li>
            @endif

            @if (Auth::user()->_can('company'))
            <li class="treeview font w3-text-pink" onclick="showPage('admin/company')" >
                <a href="#">
                    <i class="fa fa-bank"></i> <span>{{ __('companies') }}</span>
                </a>
            </li>
            @endif

            @if (Auth::user()->_can('ads'))
            <li class="treeview font w3-text-pink" onclick="showPage('admin/ads')" >
                <a href="#">
                    <i class="fa fa-image"></i> <span>{{ __('ads') }}</span>
                </a>
            </li>
            @endif

            @if (Auth::user()->_can('service'))
            <li class="treeview font w3-text-pink" onclick="showPage('admin/service')" >
                <a href="#">
                    <i class="fa fa-trophy"></i> <span>{{ __('service') }}</span>
                </a>
            </li>
            @endif

            @if (Auth::user()->_can('city'))
            <li class="treeview font w3-text-pink" onclick="showPage('admin/city')" >
                <a href="#">
                    <i class="fa fa-building-o"></i> <span>{{ __('cities') }}</span>
                </a>
            </li>
            @endif

            @if (Auth::user()->_can('area'))
            <li class="treeview font w3-text-pink" onclick="showPage('admin/area')" >
                <a href="#">
                    <i class="fa fa-map-marker"></i> <span>{{ __('areas') }}</span>
                </a>
            </li>
            @endif

            @if (Auth::user()->_can('setting'))
            <li class="treeview font w3-text-pink" onclick="showPage('admin/mailbox')" >
                <a href="#">
                    <i class="fa fa-envelope"></i> <span>{{ __('mailbox') }}</span>
                </a>
            </li>
            @endif

            @if (Auth::user()->_can('setting'))
            <li class="treeview font w3-text-pink" onclick="showPage('admin/option')" >
                <a href="#">
                    <i class="fa fa-cogs"></i> <span>{{ __('settings') }}</span>
                </a>
            </li>
            @endif



            @endif



            <li class="treeview font w3-text-brown" >
                <a href="#">
                    <i class="fa fa-bar-chart"></i> <span>{{ __('reports') }}</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">

                    @if (Auth::user()->_can('student_course_report'))
                    <li  onclick="showPage('dashboard/report/studentcourse')" ><a href="#"><i class="fa fa-circle-o"></i>{{ __('student courses') }}</a></li>
                    @endif

                </ul>
            </li>
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>
