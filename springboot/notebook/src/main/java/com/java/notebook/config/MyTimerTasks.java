package com.java.notebook.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;


@Slf4j
@Configuration      //1.主要用于标记配置类，兼备Component的效果。
@EnableScheduling   // 2.开启定时任务
public class MyTimerTasks {


    //3.添加定时任务  0点执行
    @Scheduled(cron = "0 0 0 * * ?")
    private void configureTasks() {
        //方便扩展

        log.info("每天0点开始定时任务");

    }

}
