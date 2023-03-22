import DiscoveryV1 from 'ibm-watson/discovery/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

const discoveryClient = new DiscoveryV1({
  authenticator: new IamAuthenticator({ apikey: process.env.WATSON_KEY}),
  version: '{version}',
});

// ...
