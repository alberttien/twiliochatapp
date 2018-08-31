<?php

/**
 * This code was generated by
 * \ / _    _  _|   _  _
 * | (_)\/(_)(_|\/| |(/_  v1.0.0
 * /       /
 */

namespace Twilio\Tests\Integration\IpMessaging\V1\Service\User;

use Twilio\Exceptions\DeserializeException;
use Twilio\Exceptions\TwilioException;
use Twilio\Http\Response;
use Twilio\Tests\HolodeckTestCase;
use Twilio\Tests\Request;

class UserChannelTest extends HolodeckTestCase {
    public function testReadRequest() {
        $this->holodeck->mock(new Response(500, ''));

        try {
            $this->twilio->ipMessaging->v1->services("ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                          ->users("USXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                          ->userChannels->read();
        } catch (DeserializeException $e) {}
          catch (TwilioException $e) {}

        $this->assertRequest(new Request(
            'get',
            'https://ip-messaging.twilio.com/v1/Services/ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Users/USXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels'
        ));
    }

    public function testReadFullResponse() {
        $this->holodeck->mock(new Response(
            200,
            '
            {
                "meta": {
                    "page": 0,
                    "page_size": 50,
                    "first_page_url": "https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels?PageSize=50&Page=0",
                    "previous_page_url": null,
                    "url": "https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels?PageSize=50&Page=0",
                    "next_page_url": null,
                    "key": "channels"
                },
                "channels": [
                    {
                        "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        "service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        "channel_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        "member_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        "status": "joined",
                        "last_consumed_message_index": 5,
                        "unread_messages_count": 5,
                        "links": {
                            "channel": "https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                            "member": "https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Members/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                        }
                    }
                ]
            }
            '
        ));

        $actual = $this->twilio->ipMessaging->v1->services("ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                                ->users("USXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                                ->userChannels->read();

        $this->assertGreaterThan(0, count($actual));
    }

    public function testReadEmptyResponse() {
        $this->holodeck->mock(new Response(
            200,
            '
            {
                "meta": {
                    "page": 0,
                    "page_size": 50,
                    "first_page_url": "https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels?PageSize=50&Page=0",
                    "previous_page_url": null,
                    "url": "https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels?PageSize=50&Page=0",
                    "next_page_url": null,
                    "key": "channels"
                },
                "channels": []
            }
            '
        ));

        $actual = $this->twilio->ipMessaging->v1->services("ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                                ->users("USXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                                ->userChannels->read();

        $this->assertNotNull($actual);
    }
}