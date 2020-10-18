<?php

namespace App;

use Illuminate\Support\Facades\Mail;
use App\Option;

use Illuminate\Http\Request;

final class Helper { 
    
    
    /**
     * remove file 
     * 
     * @param String $filename the path or the file
     * @return boolean
     */
    public static function removeFile($filename) {
        try {
            unlink($filename);
            return true;
        } catch (\Exception $exc) {
            return false;
        }
    }

    
    /**
     * upload the image on the server
     * upload file to image folder.
     * 
     * @param Image $file
     * @param String $folder
     * @return string  the name of uploaded image
     */
    public static function uploadImg($file, $folder = '/') {
        $extension = $file->getClientOriginalExtension();
        $filename = time() . '' . rand(11111, 99999) . '.' . $extension; // renameing image
        $dest = public_path('/images' . $folder);
        $file->move($dest, $filename);
        return $filename;
    }

    
    /**
     * upload the file on the server
     * upload file to file folder.
     * 
     * @param File $file
     * @param String $folder
     * @return string  the name of uploaded image
     */
    public static function uploadFile($file, $folder = '/') {
        $extension = $file->getClientOriginalExtension();
        $filename = time() . '' . rand(11111, 99999) . '.' . $extension; // renameing image
        $dest = public_path('/file' . $folder);
        $file->move($dest, $filename);
        return $filename;
    }

    
    /**
     * send email api
     * 
     * @param String $to       destination email 
     * @param String $message  the message of the email
     * @param String $subject  the subject of the email
     * @param String $from     the emai will send the message 
     * @return boolean         true if sent, false if not
     */
    public static function sendMail($to, $message, $subject, $from = "admin@admin.com") {
        $response = null;
        try {
            $message = str_replace("\n", "\r", $message);
            $subject = str_replace("\n", "\r", $subject);


            ini_set("SMTP", "aspmx.l.google.com");
            ini_set("sendmail_from", "admin@gmail.com");


            $headers = array(
                'From' => $from,
                'To' => $to,
                'Subject' => $subject,
                'MIME-Version' => '1.0',
                'Content-Type' => "text/html; charset=ISO-8859-1"
            );

            $response = mail($to, $subject, $message, $headers);
        } catch (\Exception $exc) {
            
        }

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
     * send  mobile sms to user 
     * 
     * @param type $message 
     * @param type $phone
     * @return type
     */
    public static function sendSms($message, $phone) {
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
        curl_setopt($rest, CURLOPT_HTTPHEADER, array(
            "Content-Type" => "application/x-www-form-urlencoded"
        ));
        curl_setopt($rest, CURLOPT_RETURNTRANSFER, 1); //by ibnfarouk to stop outputting result.
        $response = curl_exec($rest);
        curl_close($rest);
        return $response;
    }

    
    /**
     * firebase api notification
     * 
     * @param type $tokens  the tokens of the firebase
     * @param type $data    the data of notification contain title, body
     * @return Array        the response from firebase api
     */
    public static function firebaseNotification($tokens, $data = []) {

        $registrationIDs = $tokens;

        $fcmMsg = array(
            "title" => $data['title_ar'],   
            "title_en" => $data['title_en'] ,
            "body" =>   $data['body_ar'],
            "body_en" => $data['body_en'], 
            'click_action' => "",
            'sound' => "default",
            'color' => "#203E78"
        );
        $fcmFields = array(
            'registration_ids' => $registrationIDs,
            'priority' => 'high',
            'notification' => $fcmMsg,
            'data' => $data
        );

        $headers = array(
            'Authorization: key=AAAAPAI8dSw:APA91bE5WlPwZc3nJ6r5l4pZVmnwlOpF9tbSsnuRTWXg_qH6eya-P-pbHPeg-jc-qDJoR7Gb0Wurv83leG6TTIKZXlkUp366fVlXRFN0pOJkQev6gN_feeGu8q99Iqdhw6IDpgNRkn6m',
            'Content-Type: application/json'
        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fcmFields));
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    
    /**
     * random token every milisecond encrypted
     * 
     * @return String  the token
     */
    public static function randamToken() {
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
    
    
    /**
     * create session for notification
     * 
     * @param type $response
     */
    public static function notify($response) {
        session(["response" => $response]);
    }

}
