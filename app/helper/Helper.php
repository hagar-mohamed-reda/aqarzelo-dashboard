<?php

namespace App\helper;

use Illuminate\Support\Facades\Mail;
use App\Option;

class Helper {

    //// function for return response in json format ///////
    public static function responseJson($status, $message, $data = null) {
        $response = [
            'status' => $status,
            'message' => $message,
            'data' => $data
        ];
        return response()->json($response);
    }

    public static function removeFile($filename) {
        try {
            unlink($filename);
            return true;
        } catch (\Exception $exc) {
            return false;
        }
    }

    public static function validateExtension($extension) {
        $exts = [
            "jpeg",
            "png",
            "jpg",
            "gif",
            "bmp",
        ];

        if (in_array($exts, $extension))
            return true;

        return false;
    }


     /**
     *  function to send  mobile sms to user
     * @param type $phone
     * @param type $message
     * @return type
     */
    public static function sendSms($phone, $message)
    {
        $url = 'https://smsmisr.com/api/webapi/?';
        $push_payload = array(
            "username" => "ppgA3OqD",
            "password" => "OeoODDmbuc",
            "language" => "2",
            "sender" => "MandoBee",
            "mobile" => '2' . $phone,
            "message" => $message,
        );

        $rest = curl_init();
        curl_setopt($rest, CURLOPT_URL, $url . http_build_query($push_payload));
        curl_setopt($rest, CURLOPT_POST, 1);
        curl_setopt($rest, CURLOPT_POSTFIELDS, $push_payload);
        curl_setopt($rest, CURLOPT_SSL_VERIFYPEER, true);  //disable ssl .. never do it online
        curl_setopt($rest, CURLOPT_HTTPHEADER,
            array(
                "Content-Type" => "application/x-www-form-urlencoded"
            ));
        curl_setopt($rest, CURLOPT_RETURNTRANSFER, 1); //by ibnfarouk to stop outputting result.
        $response = curl_exec($rest);
        curl_close($rest);
        return $response;
    }

    public static function randColor() {
        $colors = [
            "w3-red",
            "w3-pink",
            "w3-green",
            "w3-blue",
            "w3-purple",
            "w3-deep-purple",
            "w3-indigo",
            "w3-light-blue",
            "w3-cyan",
            "w3-aqua",
            "w3-teal",
            "w3-lime",
            "w3-light-green",
            "w3-orange",
            "w3-blue-gray",
            "w3-brown",
        ];

        return $colors[array_rand($colors)];
    }

    public static function uploadImg($file, $folder = '/', $action) {
        $path = "/home3/sphinxa1/public_html/aqarzelo/public/images";
        $filename = "";
        if ($file) {

            $extension = $file->getClientOriginalExtension();
            $filename = time() . '' . rand(11111, 99999) . '.' . $extension; // renameing image
            $dest =  $path . $folder;
            $file->move($dest, $filename);

            $action($filename);
        }
        return $filename;
    }

    public static function uploadFile($file, $folder = '/', $action) {
        $path = "/home3/sphinxa1/public_html/aqarzelo/public/images";
        $filename = "";
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '' . rand(11111, 99999) . '.' . $extension; // renameing image
            $dest =  $path . $folder;
            $file->move($dest, $filename);

            $action($filename);
        }

        return $filename;
    }

    public static function sendMail($to, $message, $subject) {
        $from = Option::find(1)->value;
        $title = Option::find(2)->value;
        $message = str_replace("\n", "\r", $message);
        $subject = str_replace("\n", "\r", $subject);

        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => "supermsoft@gmail.com",
                        'Name' => $title
                    ],
                    'To' => [
                        [
                            'Email' => $to,
                            'Name' => "user"
                        ]
                    ],
                    'Subject' => $subject,
                    'HTMLPart' => $message//htmlspecialchars($message)
                ]
            ]
        ];

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, "https://api.mailjet.com/v3.1/send");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json')
        );
        curl_setopt($ch, CURLOPT_USERPWD, "5491f615ff3aeb9cc78e00956fd61fea:3c0891d0ed55f4969c9849c91a3718c9");
        $server_output = curl_exec($ch);
        curl_close($ch);

        $response = json_decode($server_output);
        //if ($response->Messages[0]->Status == 'success') {
        return $response;
        //}

        /* $from = Option::find(1)->value;

          ini_set("SMTP", "aspmx.l.google.com");
          ini_set("sendmail_from", "admin@gmail.com");


          $headers = array (
          'From' => $from,
          'To' => $to,
          'Subject' => $subject,
          'MIME-Version' => '1.0',
          'Content-Type' => "text/html; charset=ISO-8859-1"
          );

          mail($to, $subject, $message, $headers); */
        return $response;
    }

    /* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
    /* ::                                                                         : */
    /* ::  This routine calculates the distance between two points (given the     : */
    /* ::  latitude/longitude of those points). It is being used to calculate     : */
    /* ::  the distance between two locations using GeoDataSource(TM) Products    : */
    /* ::                                                                         : */
    /* ::  Definitions:                                                           : */
    /* ::    South latitudes are negative, east longitudes are positive           : */
    /* ::                                                                         : */
    /* ::  Passed to function:                                                    : */
    /* ::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  : */
    /* ::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  : */
    /* ::    unit = the unit you desire for results                               : */
    /* ::           where: 'M' is statute miles (default)                         : */
    /* ::                  'K' is kilometers                                      : */
    /* ::                  'N' is nautical miles                                  : */
    /* ::  Worldwide cities and other features databases with latitude longitude  : */
    /* ::  are available at https://www.geodatasource.com                          : */
    /* ::                                                                         : */
    /* ::  For enquiries, please contact sales@geodatasource.com                  : */
    /* ::                                                                         : */
    /* ::  Official Web site: https://www.geodatasource.com                        : */
    /* ::                                                                         : */
    /* ::         GeoDataSource.com (C) All Rights Reserved 2018                  : */
    /* ::                                                                         : */
    /* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

    public static function latLangDistance($lat1, $lon1, $lat2, $lon2, $unit = "K") {
        if (($lat1 == $lat2) && ($lon1 == $lon2)) {
            return 0;
        } else {
            $theta = $lon1 - $lon2;
            $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
            $dist = acos($dist);
            $dist = rad2deg($dist);
            $miles = $dist * 60 * 1.1515;
            $unit = strtoupper($unit);

            if ($unit == "K") {
                return ($miles * 1.609344);
            } else if ($unit == "N") {
                return ($miles * 0.8684);
            } else {
                return $miles;
            }
        }
    }

    /**
     * random token every milisecond encrypted
     * @return type String
     */
    function randamToken() {
        // time in mili seconds
        $timeInMiliSeconds = (int) round(microtime(true) * 1000);

        // random number with 8 digit
        $randKey1 = rand(11111111, 99999999);

        // token
        $token = $timeInMiliSeconds + $randKey1;

        // convert token to array
        $tokenToArray = str_split($token);

        // shif array
        array_shift($tokenToArray);

        // array to string
        $token = implode("", $tokenToArray);

        // encrypt token
        $cryptedToken = encrypt($token);

        // return token in small size
        $b = json_decode(base64_decode($cryptedToken));

        // return mac attribute
        return $b->mac;
    }

}
