$(function() {

    // Alert the user they have been assigned a random username
    print('Logging in...');
    
//    function createOrJoinGeneralChannel() {
        // Get the general chat channel, which is where all the messages are
        // sent in this simple application
 //       print('Attempting to join "general" chat channel...');
   //     var promise = chatClient.getChannelByUniqueName('general');
//        promise.then(function(channel) {
//            generalChannel = channel;
//            console.log('Found general channel:');
//            console.log(generalChannel);
//            setupChannel();
//        }).catch(function() {
//            // If it doesn't exist, let's create it
//            console.log('Creating general channel');
//            chatClient.createChannel({
//                uniqueName: 'general',
//                friendlyName: 'General Chat Channel'
//            }).then(function(channel) {
//                console.log('Created general channel:');
//                console.log(channel);
 //               generalChannel = channel;
  //              setupChannel();
  //          });
  //      });
  //  }

    // Set up channel after it has been found
//    function setupChannel() {
//        // Join the general channel
//        generalChannel.join().then(function(channel) {
 //           print('Joined channel as ' 
  //              + '<span class="me">' + username + '</span>.', true);
  //      });

        // Listen for new messages sent to the channel
//        generalChannel.on('messageAdded', function(message) {
//            printMessage(message.author, message.body);
//        });
//    }

    
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzgyYTVmMjRkNTJlYTM3NWI5NGNkMzJlYmJlMGY1NzViLTE1MzU3MzAyNzUiLCJpc3MiOiJTSzgyYTVmMjRkNTJlYTM3NWI5NGNkMzJlYmJlMGY1NzViIiwic3ViIjoiQUMzY2ZlZTIxMzJiODAyNmFiMjhjNDQ3MWFjM2VjMTE1YSIsImV4cCI6MTUzNTczMzg3NSwiZ3JhbnRzIjp7ImlkZW50aXR5Ijoiam9obl9kb2UiLCJjaGF0Ijp7InNlcnZpY2Vfc2lkIjoiSVMxMTU2NzdkNWUzZGI0YTE0ODJkYzYzMzdlYmQwNWNlOSJ9fX0.Pr9bErMQKbKa2tFeReRe7V2LF4LW-ZT1w2IJBJV38nU";
    chatClient = new Twilio.Chat.Client.create(token);
    console.log('Creating general channel');
    chatClient.createChannel({
        uniqueName: 'general',
        friendlyName: 'General Chat Channel'
    }).then(function(channel) {
        console.log('Created general channel:');
        console.log(channel);
        generalChannel = channel;
        //setupChannel();
    });

});
