package com.java.notebook.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


@Data
@Component
@ConfigurationProperties("myredis")
public class MyRedisProperties {

    private Integer savetokendays;

    private Integer sendemailminute;
}
