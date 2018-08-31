$(function() {
    // Get handle to the chat div 
    var $chatWindow = $('#messages');
 
    // Our interface to the Chat service
    var chatClient;

    // A handle to the "general" chat channel - the one and only channel we
    // will have in this sample app
    var generalChannel;

    // The server will assign the client a random username - store that value
    // here
    var username;

    // Helper function to print info messages to the chat window
    function print(infoMessage, asHtml) {
        var $msg = $('<div class="info">');
        if (asHtml) {
            $msg.html(infoMessage);
        } else {
            $msg.text(infoMessage);
        }
        $chatWindow.append($msg);
    }

    // Helper function to print chat message to the chat window
    function printMessage(fromUser, message) {
        var $user = $('<span class="username">').text(fromUser + ':');
        if (fromUser === username) {
            $user.addClass('me');
        }
        var $message = $('<span class="message">').text(message);
        var $container = $('<div class="message-container">');
        $container.append($user).append($message);
        $chatWindow.append($container);
        $chatWindow.scrollTop($chatWindow[0].scrollHeight);
    }

    // Alert the user they have been assigned a random username
    print('Logging in...');

    // Get an access token for the current user, passing a username (identity)
    // and a device ID - for browser-based apps, we'll always just use the 
    // value "browser"
    
    //$.getJSON('createChatAccessToken.php', {
    //    device: 'browser'
    //}, function(data) {
    //    // Alert the user they have been assigned a random username
    //    alert(data);
    //    username = data.identity;
    //    print('You have been assigned a random username of: ' 
    //        + '<span class="me">' + username + '</span>', true);

        // Initialize the Chat client
    //    chatClient = new Twilio.Chat.Client(data.token);
    //    chatClient.getSubscribedChannels().then(createOrJoinGeneralChannel);        
    //}).fail(function() {
    //console.log( "error" )});

    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzgyYTVmMjRkNTJlYTM3NWI5NGNkMzJlYmJlMGY1NzViLTE1MzU3MjY5NTIiLCJpc3MiOiJTSzgyYTVmMjRkNTJlYTM3NWI5NGNkMzJlYmJlMGY1NzViIiwic3ViIjoiQUMzY2ZlZTIxMzJiODAyNmFiMjhjNDQ3MWFjM2VjMTE1YSIsImV4cCI6MTUzNTczMDU1MiwiZ3JhbnRzIjp7ImlkZW50aXR5Ijoiam9obl9kb2UiLCJjaGF0Ijp7InNlcnZpY2Vfc2lkIjoiSVMxMTU2NzdkNWUzZGI0YTE0ODJkYzYzMzdlYmQwNWNlOSJ9fX0.eq_D0UjtwsL6b0BsID2aPn3BUQaRacI1YKZgS_f2lHI";
	chatClient = new Twilio.Chat.Client.create(token);
    chatClient.getSubscribedChannels().then(createOrJoinGeneralChannel); 
    
    function createOrJoinGeneralChannel() {
        // Get the general chat channel, which is where all the messages are
        // sent in this simple application
        print('Attempting to join "general" chat channel...');
        var promise = chatClient.getChannelByUniqueName('general');
        promise.then(function(channel) {
            generalChannel = channel;
            console.log('Found general channel:');
            console.log(generalChannel);
            setupChannel();
        }).catch(function() {
            // If it doesn't exist, let's create it
            console.log('Creating general channel');
            chatClient.createChannel({
                uniqueName: 'general',
                friendlyName: 'General Chat Channel'
            }).then(function(channel) {
                console.log('Created general channel:');
                console.log(channel);
                generalChannel = channel;
                setupChannel();
            });
        });
    }

    // Set up channel after it has been found
    function setupChannel() {
        // Join the general channel
        generalChannel.join().then(function(channel) {
            print('Joined channel as ' 
                + '<span class="me">' + username + '</span>.', true);
        });

        // Listen for new messages sent to the channel
        generalChannel.on('messageAdded', function(message) {
            printMessage(message.author, message.body);
        });
    }

    // Send a new message to the general channel
    var $input = $('#chat-input');
    $input.on('keydown', function(e) {
        if (e.keyCode == 13) {
            generalChannel.sendMessage($input.val())
            $input.val('');
        }
    });
});
