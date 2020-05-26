package com.java.notebook;

import com.java.notebook.common.utils.MyUtils;
import com.java.notebook.properties.EmailProperties;
import com.java.notebook.service.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@SpringBootTest
class NotebookApplicationTests {

	@Autowired
	EmailService emailService;
	@Test
	public void send() throws MessagingException {
		String to  = "1663178254@qq.com";
		emailService.send(to,1234+"");
	}

	@Test
	void contextLoads() {
	}

}
