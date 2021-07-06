import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

const PREFIX = environment.prefix;
const ACCESS_TOKEN = `${PREFIX}_access_token`;
const PROFILE = `${PREFIX}_profile`;
const LOCALEID = `${PREFIX}_locale_id`;
const REFRESH_TOKEN = `${PREFIX}_refresh_token`;

@Injectable({
    providedIn: 'root'
})

/**
 * Represents the token management service
 */
export class AccessTokenService {
    constructor() { }

    /**
     * Returns the access token from the local storage
     * @returns {string} the access token
     */
    private accessTokenGetter(): string {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    /**
     * Clears the access and refresh tokens from local storage
     * @returns {void}
     */
    private accessTokenRemover(): void {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(PROFILE);
        localStorage.removeItem(LOCALEID);
    }

    /**
     * Returns the access token options
     * @returns {Object}
     */
    getAccessTokenOpts(): {} {
        return {
            tokenGetter: this.accessTokenGetter,
            tokenRemover: this.accessTokenRemover
        };
    }
}
