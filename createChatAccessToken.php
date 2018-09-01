<?php

require_once 'Twilio/autoload.php'; // Loads the library
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\ChatGrant;

// Required for all Twilio access tokens
$twilioAccountSid = 'AC3cfee2132b8026ab28c4471ac3ec115a';
$twilioApiKey = 'SK82a5f24d52ea375b94cd32ebbe0f575b';
$twilioApiSecret = 'CvZK0lOALDeyU3PkxTu2nvOESDXqcUee';

// Required for Chat grant
$serviceSid = 'IS115677d5e3db4a1482dc6337ebd05ce9';
// choose a random username for the connecting user
$identity = "john_doe";

// Create access token, which we will serialize and send to the client
$token = new AccessToken(
    $twilioAccountSid,
    $twilioApiKey,
    $twilioApiSecret,
    3600,
    $identity
);

// Create Chat grant
$chatGrant = new ChatGrant();
$chatGrant->setServiceSid($serviceSid);

// Add grant to token
$token->addGrant($chatGrant);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// render token to string
echo $token->toJWT();

?>
