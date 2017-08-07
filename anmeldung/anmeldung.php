<?php


$email_registration = 'J.Eggert@landhaus-flottbek.de';

$anmeldung_eingegangen_url = 'http://www.landhaus-flottbek-lauf.de/anmeldung_eingegangen/';

$name = $email = $gender = $comment = $website = "";

$date = date('d.m.Y H:i:s', time());

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if(isset($_POST['submit'])){
        // Form Data
        if (empty($_POST["name"])) {
            $error['name'] = "Name is required";
        } else {
            $data['name'] = test_input($_POST["name"]);
        }

        if (empty($_POST["email"])) {
            $error['email'] = "Email is required";
        } else {
            $data['email'] = test_input($_POST["email"]);
        }

        if (empty($_POST["phone"])) {
//            $error['phone'] = "phone is required";
        } else {
            $data['phone'] = test_input($_POST["phone"]);
        }

        if (empty($_POST["distance"])) {
            $error['distance'] = "distance is required";
        } else {
            $data['distance'] = test_input($_POST["distance"]);
        }

        if (empty($_POST["tshirt-wanted"])) {
            $error['tshirt-wanted'] = "tshirt-wanted is required";
        } else {
            $data['tshirt-wanted'] = test_input($_POST["tshirt-wanted"]);
        }

        if (empty($_POST["tshirt-selected"])) {
            $error['tshirt-selected'] = "tshirt-selected is required";
        } else {
            $data['tshirt-selected'] = test_input($_POST["tshirt-selected"]);
        }

        if (empty($_POST["toc-accepted"])) {
            $error['toc-accepted'] = "toc-accepted is required";
        } else {
            $data['toc-accepted'] = test_input($_POST["toc-accepted"]);
        }


        $data['date'] = $date;

        if ( send_mail($data) ) {

            if (confirmation_mail($data['email'])) {
                header('Location: '.$anmeldung_eingegangen_url);
                die;
            }

        } else {
            // show error
        }
    } else {
        // show form
    }



}




function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


function print_data($data) {
    $message =
'<!doctype html>
<html>
<head>
    <title>Anmeldung zum Landhaus Flottbek Lauf 2017</title>
</head>
<body>
<table cellspacing="0" style="border: 2px dashed #FB4314; width: 300px; height: 200px;">';

    foreach ($data as $key => $value) {
        $message .= sprintf("<tr><th>%s:</th><td>%s</td></tr>\n", $key, $value);
    }


    $message .= '</table></body></html>';

    return $message;
}


function send_mail($data) {
    global $email_registration;

    $nachricht = print_data($data);

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: Landhaus Flottbek Lauf <noreply@landhaus-flottbek-lauf.de>' . "\r\n";
    $headers .= 'Bcc: lars@mapetersen.de' . "\r\n";

    $subject = 'Anmeldung LFL2017 von '.$data['name'];

    if (mail($email_registration, $subject, $nachricht, $headers)) {
        return true;
    } else{
        return false;
    }


}




function confirmation_mail($email) {
    global $email_registration;

    if (empty($email)) {
        return false;
    }

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: Landhaus Flottbek Lauf <'.$email_registration.'>' . "\r\n";
    $headers .= 'Bcc: lars@mapetersen.de' . "\r\n";

    $to = $email;

    $subject = 'Anmeldung zum Landhaus Flottbek Lauf 2017';

    $mail_text = file_get_contents('confirmation_mail.txt');

    if (mail($to, $subject, $mail_text, $headers)) {
        return true;
    } else{
        return false;
    }
}
