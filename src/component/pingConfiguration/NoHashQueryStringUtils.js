import {BasicQueryStringUtils} from '@openid/appauth';

export default class NoHashQueryStringUtils extends BasicQueryStringUtils {
    parse(input, useHash) {
        return super.parse(input, false /* never use hash */);
    }
}