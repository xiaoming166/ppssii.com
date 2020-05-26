package com.java.notebook.controlleradvice;


import com.java.notebook.common.utils.R;
import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class MyExceptionHandler {


    //所有异常处理
    //@ExceptionHandler(value = Exception.class)
    public R handlerException(Exception e){
        log.info(e.toString());
        return R.error(500, "fail").put("data",e);
    }
    //数据校验异常处理
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public R handlerException(MethodArgumentNotValidException e) {

        BindingResult result = e.getBindingResult();

        Map<String, String> map = new HashMap<>();

        result.getFieldErrors().forEach(item -> {
            String field = item.getField();
            String defaultMessage = item.getDefaultMessage();
            map.put(field, defaultMessage);
        });
        log.info(e.toString());
        return R.error(444, "fail").put("data", map);

    }
    //空指针异常处理
    //@ExceptionHandler(value = NullPointerException.class)
    public R handlerNullpointerException(Exception e){
        log.info(e.toString());
        return R.error(445, "空指针异常").put("data",e);
    }
    //外键异常处理
    @ExceptionHandler(value = MySQLIntegrityConstraintViolationException.class)
    public R handlerMySQLIntegrityConstraintViolationException(MySQLIntegrityConstraintViolationException e){
        log.info(e.toString());
        return R.error(444, "外键不存在");
    }
    //JSON格式异常处理
    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    public R handlerHttpMessageNotReadableException(Exception e){
        log.info(e.toString());
        return R.error(402, "fail").put("data","JSON格式异常");
    }
    //格式转换异常处理，参数非法
    @ExceptionHandler(value = IllegalArgumentException.class)
    public R handlerIllegalArgumentException(IllegalArgumentException e){

        log.info(e.toString());
        return R.error(403, "fail").put("data","格式转换异常处理，参数非法");
    }
    //请求方式不对
    @ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
    public R handlerHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e){
        log.info(e.toString());
        return R.error(405, "fail").put("data","请求方式不支持");
    }
}
