package com.java.notebook.service;

import com.java.notebook.common.utils.MyUtils;
import com.java.notebook.common.utils.R;
import com.java.notebook.properties.EmailProperties;
import com.java.notebook.properties.MyRedisProperties;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class EmailService {

    @Autowired
    JavaMailSenderImpl sender;
    @Autowired
    private EmailProperties emailProperties;
    @Autowired
    private RedisTemplate redisTemplate;
    @Autowired
    private MyRedisProperties myRedisProperties;


    //发送邮件
    public boolean send(String address,String num){
        MimeMessage mimeMessage = sender.createMimeMessage();

        String email = emailProperties.getMessageprefix()+
                "<span style='color:red'>"+ num+"</span>"+
                emailProperties.getMessagesuffix();


        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,true);
            mimeMessageHelper.setText(email,true);
            mimeMessageHelper.setSubject(emailProperties.getTitle());
            mimeMessageHelper.setTo(address);
            mimeMessageHelper.setFrom(emailProperties.getFrom());
        } catch (MessagingException e) {
            e.printStackTrace();
            log.error("邮件发送失败 "+e);
            return false;
        }

        sender.send(mimeMessage);

        return true;
    }
    //发送邮件验证码
    public R sendEmailValidateNum(String email) {
        //校验邮箱
        boolean judgeemail = MyUtils.judgeemail(email);
        if(!judgeemail||StringUtils.isEmpty(email)){
            return R.error(444,"email校验失败");
        }
        //检查是否发送过
        Object redisObject = redisTemplate.opsForValue().get(email);
        if(redisObject!=null){
            return R.error(444,"验证码未过期，请稍后再试");
        }
        //发送验证码
        String num = MyUtils.getNum()+"";
        redisTemplate.opsForValue().set(email,num,myRedisProperties.getSendemailminute(), TimeUnit.MINUTES);
        send(email,num);


        return R.ok();
    }
}
