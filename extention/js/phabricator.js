
function displayPhabTickets()
{

    var CERT = ''
    var USER = ''
    var PHAB = ''

    token = new Date().getTime() / 1000;
    signature = hex_sha1(""+token + CERT)

    console.log(signature)

    connect_params = {
        "client": "Ponder",
        'clientVersion': 0,
        'clientDescription': 'The Ponder New Tab Extention',
        'user': USER,
        'host': PHAB,
        'authToken': token,
        'authSignature': signature,
    }

    $.post(PHAB+'/api/conduit.connect', {
        'params': JSON.stringify(connect_params),
        'output': 'json',
        '__conduit__': true
    }, function(data){
        console.log(data);
        var result = data['result']
        var user_id = result['userPHID']

        var j = JSON.stringify({ 'ownerPHIDs': [user_id],
                        'status': "status-open",
                        '__conduit__': {
                            'sessionKey': result['sessionKey'],
                            'connectionID': result['connectionID']
                        },
                    });
        console.log(j)
        $.post(PHAB+'/api/maniphest.query', {
            'params': j,
            'output': 'json',
            '__conduit__': true
        }, function (data){

            console.log(data)
            // var result = data['result'];

            // for (var i = result.length - 1; i >= 0; i--) {
            //     console.log(result[i]['uri'] + ' ' +result[i]['objectName']+': '+result[i]['title']);
            // }

        });



    });
}

