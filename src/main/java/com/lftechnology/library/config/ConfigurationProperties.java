
package com.lftechnology.library.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigurationProperties {

    private static ConfigurationProperties configurationProperties;
    private String salt;

    private String configFile = "/config.properties";
    private Properties properties;

    public ConfigurationProperties() {
        InputStream inputStream = getClass().getResourceAsStream(configFile);
        properties = new Properties();
        try {
            properties.load(inputStream);
            this.setSalt(properties.getProperty("HASH-SALT"));
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

}
