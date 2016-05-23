
package com.lftechnology.library.util;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

import com.auth0.jwt.JWTSigner;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.JWTVerifyException;
import com.auth0.jwt.internal.org.apache.commons.codec.binary.Base64;
import com.lftechnology.library.config.ConfigurationProperties;
import com.lftechnology.library.exception.TokenExpiredExcpetion;
import com.lftechnology.library.exception.TokenExtractionException;

public class WebTokenUtils {

    private static final String APP_SECRET_KEY = ConfigurationProperties.instance().getAppSecretKey();
    private static final String AUDIENCE = "1";

    public static final String ISS = "iss";
    public static final String SUB = "sub";
    public static final String AUD = "aud";
    public static final String EXP = "exp";
    public static final String IAT = "iat";

    private static final String ISSUER = ConfigurationProperties.instance().getTokenIssuer();

    public static Map<String, Object> makePayload(String userString, Integer expiryTime) {

        Base64 base64 = new Base64(true);
        String encodedUserString = base64.encodeToString(userString.getBytes());
        LocalDateTime now = LocalDateTime.now();
        Map<String, Object> claims = new HashMap<>();
        claims.put(ISS, ISSUER);
        claims.put(SUB, encodedUserString);
        claims.put(AUD, AUDIENCE);
        claims.put(EXP, now.plusMinutes(expiryTime).atZone(ZoneId.systemDefault()).toEpochSecond());
        claims.put(IAT, now.atZone(ZoneId.systemDefault()).toEpochSecond());
        return claims;
    }

    public static String payLoadToTokenString(Map<String, Object> payload) {

        return new JWTSigner(APP_SECRET_KEY).sign(payload);
    }

    public static Map<String, Object> verifyToken(String token)
        throws TokenExpiredExcpetion, TokenExtractionException {
        try {
            Map<String, Object> payload = new JWTVerifier(APP_SECRET_KEY, AUDIENCE).verify(token);
            Long exp = Long.valueOf(payload.get(EXP).toString());
            LocalDateTime expiry = DateUtil.getLocalDateTimeFromSeconds(exp);
            if (expiry.isBefore(LocalDateTime.now())) {
                throw new TokenExpiredExcpetion();
            }
            return payload;
        }
        catch (InvalidKeyException | NoSuchAlgorithmException | IllegalStateException | SignatureException | IOException
                        | JWTVerifyException e) {
            throw new TokenExtractionException();
        }
    }

    public static String getUserJson(String token)
        throws TokenExpiredExcpetion, TokenExtractionException {
        Map<String, Object> payload = verifyToken(token);
        String sub = payload.get(SUB).toString();
        return new String(Base64.decodeBase64(sub));
    }

}
