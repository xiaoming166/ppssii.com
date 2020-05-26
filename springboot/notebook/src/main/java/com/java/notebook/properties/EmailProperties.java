package com.java.notebook.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "myemail")
public class EmailProperties {

    private String messageprefix;

    private String messagesuffix;

    private String title;

    private String from;

}
