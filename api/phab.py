import hashlib
import json
import requests
import time

# Constants to be filled in by the reader
# cert comes from https://PHAB_URL/settings/panel/conduit/

CERT = ''
USER = ''
PHAB = 'https://phabricator.freelancer.com'

# Format parameters for conduit.connect
token = int(time.time())
signature = hashlib.sha1(str(token) + CERT).hexdigest()
connect_params = {
    'client': 'Python demo',
    'clientVersion': 0,
    'clientDescription': 'A script for demonstrating conduit',
    'user': USER,
    'host': PHAB,
    'authToken': token,
    'authSignature': signature,
}

# Make the request to conduit.connect
req = requests.post('%s/api/conduit.connect' % PHAB, data={
    'params': json.dumps(connect_params),
    'output': 'json',
    '__conduit__': True,
})

# Parse out the response (error handling ommitted)
result = json.loads(req.content)['result']
user_id = result['userPHID']

conduit = {
    'sessionKey': result['sessionKey'],
    'connectionID': result['connectionID'],
}

# Make the call to load tasks
req = requests.post('%s/api/maniphest.query' % PHAB, data={
    'params': json.dumps({
        'ownerPHIDs': [user_id],
        'status': "status-open",
        '__conduit__': conduit,
    }),
    'output': 'json',
})

result = json.loads(req.content)['result']

for i in result.keys():
    print '<li><a href="'+result[i]['uri'] + '">' +result[i]['objectName']+'</a>: '+result[i]['title']+'</li>'
