
package com.lftechnology.library.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import org.apache.logging.log4j.Logger;

import com.auth0.jwt.internal.org.apache.commons.codec.digest.DigestUtils;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lftechnology.library.config.ConfigurationProperties;
import com.lftechnology.library.dao.UserDAO;
import com.lftechnology.library.dao.UserTokenDAO;
import com.lftechnology.library.exception.InvalidAccessTokenException;
import com.lftechnology.library.exception.InvalidUserNameOrPasswordException;
import com.lftechnology.library.exception.RefreshTokenExpiredException;
import com.lftechnology.library.exception.TokenExpiredExcpetion;
import com.lftechnology.library.exception.TokenExtractionException;
import com.lftechnology.library.exception.TokenGenerationException;
import com.lftechnology.library.model.User;
import com.lftechnology.library.model.UserToken;
import com.lftechnology.library.pojo.LoginPOJO;
import com.lftechnology.library.pojo.Token;
import com.lftechnology.library.util.DateUtil;
import com.lftechnology.library.util.ObjectMapperFactory;
import com.lftechnology.library.util.WebTokenUtils;

@Transactional
@Stateless
public class AuthenticationServiceImpl implements AuthenticationService {

    @Inject
    private Logger logger;

    @Inject
    private UserDAO userDao;

    @Inject
    private UserTokenDAO userTokenDao;

    private String salt = ConfigurationProperties.instance().getSalt();

    @Override
    public Token authenticate(LoginPOJO loginPojo)
        throws InvalidUserNameOrPasswordException, TokenGenerationException {

        logger.debug("Inside AuthenticationServiceImpl#authenticate method. Login pojo is: {}", loginPojo);
        String saltedPassword = salt + loginPojo.getPassword();
        User user = this.userDao.findByemailAndPassword(loginPojo.getEmail(), DigestUtils.shaHex(saltedPassword.getBytes()));
        if (user == null) {
            throw new InvalidUserNameOrPasswordException();
        }
        Token token = this.generateToken(user);
        return token;
    }

    private Token generateToken(User user)
        throws TokenGenerationException {

        logger.debug("Inside AuthenticationServiceImpl#generateToken method. Generating token for user: {}", user);
        try {
            ObjectMapper mapper = new ObjectMapper();
            String userString = mapper.writeValueAsString(user);
            Map<String, Object> accessPayload = WebTokenUtils.makePayload(userString, TOKEN_EXPIRY_MINUTES);
            Map<String, Object> refreshPayload = WebTokenUtils.makePayload(userString, TOKEN_DESTROY_MINUTES);
            String accessToken = WebTokenUtils.payLoadToTokenString(accessPayload);
            String refreshToken = WebTokenUtils.payLoadToTokenString(refreshPayload);

            Token token = new Token(accessToken, refreshToken, user);
            Long exp = Long.valueOf(refreshPayload.get(WebTokenUtils.EXP).toString());
            LocalDateTime expiresAt = DateUtil.getLocalDateTimeFromMilliSeconds(exp);

            UserToken userToken = new UserToken(refreshToken, user, expiresAt, accessToken);
            this.userTokenDao.save(userToken);
            return token;
        }
        catch (JsonProcessingException e) {
            throw new TokenGenerationException();
        }
    }

    @Override
    public Token refreshAccessToken(String refreshToken)
        throws TokenExtractionException, JsonProcessingException, RefreshTokenExpiredException {
        logger.debug("Inside AuthenticationServiceImpl#refreshAccessToken method. Refresh token is: {}", refreshToken);
        UserToken userToken = this.userTokenDao.findByRefreshToken(refreshToken);
        if (userToken == null) {
            throw new TokenExtractionException();
        }
        LocalDateTime now = LocalDateTime.now();
        if (userToken.getExpiresAt().isAfter(now)) {
            User user = userToken.getUser();
            ObjectMapper mapper = new ObjectMapper();
            String userJson = mapper.writeValueAsString(user);
            Map<String, Object> accessPayload = WebTokenUtils.makePayload(userJson, TOKEN_EXPIRY_MINUTES);
            String accessToken = WebTokenUtils.payLoadToTokenString(accessPayload);
            userToken.setAccessToken(accessToken);
            this.userTokenDao.save(userToken);
            Token token = new Token(accessToken, refreshToken, user);
            return token;
        }
        else {
            this.userTokenDao.delete(userToken.getId());
            throw new RefreshTokenExpiredException();
        }
    }

    @Override
    public Map<String, Object> validateToken(String accessToken)
        throws TokenExpiredExcpetion, TokenExtractionException, InvalidAccessTokenException, RefreshTokenExpiredException {
        Map<String, Object> payload = WebTokenUtils.verifyToken(accessToken);
        UserToken userToken = this.userTokenDao.findByAccessToken(accessToken);
        if (userToken == null) {
            throw new InvalidAccessTokenException();
        }
        Long exp = Long.valueOf(payload.get(WebTokenUtils.EXP).toString());
        LocalDateTime localDateTime = DateUtil.getLocalDateTimeFromMilliSeconds(exp);
        if (LocalDateTime.now().isAfter(localDateTime)) {
            throw new RefreshTokenExpiredException();
        }
        return payload;
    }

    @Override
    public User getUserFromToken(String token)
        throws TokenExpiredExcpetion, TokenExtractionException, JsonParseException, JsonMappingException, IOException {
        String userString = WebTokenUtils.getUserJson(token);
        ObjectMapper mapper = ObjectMapperFactory.objectMapper();
        return mapper.readValue(userString.getBytes(), User.class);
    }

}
