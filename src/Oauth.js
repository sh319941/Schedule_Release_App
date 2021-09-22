import {
    RedirectRequestHandler,
    LocalStorageBackend, DefaultCrypto
} from '@openid/appauth';
import { NoHashQueryStringUtils } from './noHashQueryStringUtils';

const authorizationHandler = 
    new RedirectRequestHandler(
       new LocalStorageBackend(), 
       new NoHashQueryStringUtils(), 
       window.location, 
       new DefaultCrypto()
);