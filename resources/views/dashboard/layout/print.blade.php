<!doctype html>
<html lang="">
    <head>
        <!-- load css files -->
        {!! view("dashboard.layout.css") !!}


        <style> 
            .report-content {
                padding: 20px;
                margin: auto;
                width: 80%;
            }

            .report-margin, .line {
                margin-left: 2%;
            }

            .report-title {
                color: #367fa9;
                font-family: consolas;
            }

            .consolas {
                font-family: consolas;
            }

            .line {
                border: 1px solid #367fa9;
                width: 90%;
                border-radius: 16px;
            }

            .report-title {
                letter-spacing: 3px; 
                margin-left: 0;
                margin-bottom: 20px;
            }

        </style>
    </head>
    <body class="hold-transition fixed sidebar-mini {{ App\Option::find(3)->value }}"  >

         {!!   !!}


    </body>

    <!-- load js files -->
    {!! view("dashboard.layout.js") !!} 

    <!-- datatable files -->
    {!! view("dashboard.layout.datatable-plugins") !!} 

    <!-- message scripts -->
    {!! view("dashboard.layout.msg") !!}  
</html>
