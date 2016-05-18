
package com.lftechnology.library.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigurationProperties {

    private static ConfigurationProperties configurationProperties;
    private String salt;
    private String appSecretKey;
    private String tokenIssuer;

    private final String CONFIG_FILE = "/config.properties";
    private Properties properties;

    private ConfigurationProperties() {
        InputStream inputStream = getClass().getResourceAsStream(CONFIG_FILE);
        properties = new Properties();
        try {
            properties.load(inputStream);
            this.setSalt(properties.getProperty("HASH_SALT"));
            this.setAppSecretKey(properties.getProperty("APP_SECRET_KEY"));
            this.setTokenIssuer(properties.getProperty("TOKEN_ISSUER"));
        }
        catch (IOException e) {
            throw new RuntimeException();
        }
    }

    public static ConfigurationProperties instance() {
        if (configurationProperties == null) {
            configurationProperties = new ConfigurationProperties();
        }
        return configurationProperties;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getAppSecretKey() {
        return appSecretKey;
    }

    public void setAppSecretKey(String appSecretKey) {
        this.appSecretKey = appSecretKey;
    }

    public String getTokenIssuer() {
        return tokenIssuer;
    }

    public void setTokenIssuer(String tokenIssuer) {
        this.tokenIssuer = tokenIssuer;
    }

}
