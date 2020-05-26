package com.java.notebook.common.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;

import java.io.*;
import java.math.BigInteger;
import java.net.*;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
public class MyUtils {


    public static String getUsername(){

        return "游客"+UUID.randomUUID().toString().replace("-","");
    }

    public static boolean judgeemail(String email) {
        boolean tag = true;
        if (!email.matches("[\\w\\.\\-]+@([\\w\\-]+\\.)+[\\w\\-]+")) {
            tag = false;
        }
        return tag;
    }

    public static String  getToken(){

        String uuid = UUID.randomUUID().toString().replace("-", "");

        long currentTimeMillis = System.currentTimeMillis();

        String currtimeStr = String.valueOf(currentTimeMillis);

        return currtimeStr+uuid;
    }



    public static  int getNum(){
        int max=9999;

        int min=1000;

        Random random = new Random();
        int s = random.nextInt(max)%(max-min+1) + min;


        return s;
    }






    public static boolean judgepassword(String password) {

        if (password == null) {
            return false;
        }

        password = password.trim();

        if (password.length() >= 255) {
            return false;
        }
        return true;


    }

    public static String getDate() {

        String date = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()).toString();

        return date;
    }




    public static boolean judgevalidatenum(String validatenum) {
        if (validatenum == null) {
            return false;
        }
        if (validatenum.length() < 4 || validatenum.length() > 4) {
            return false;
        }

        try {
            int parseInt = Integer.parseInt(validatenum);
            if (parseInt > 9999) {
                return false;
            }
        } catch (Exception e) {
            return false;
        }


        return true;
    }

    public static boolean judgephonenum(String phonenum) {
        if (phonenum == null) {
            return false;
        }


        if (phonenum.length() != 11) {

            return false;
        } else {
            Pattern pattern = Pattern.compile("^[1]\\d{10}$");
            Matcher m = pattern.matcher(phonenum);
            boolean isMatch = m.matches();
            if (isMatch) {
                return true;
            } else {
                return false;
            }
        }

    }



    public static String getMD5String(String str) {
        try {
            // 生成一个MD5加密计算摘要
            MessageDigest md = MessageDigest.getInstance("MD5");
            // 计算md5函数byte[] btInput = s.getBytes("utf-8");
            md.update(str.getBytes("UTF-8"));
            // digest()最后确定返回md5 hash值，返回值为8位字符串。因为md5 hash值是16位的hex值，实际上就是8位的字符
            // BigInteger函数则将8位的字符串转换成16位hex值，用字符串来表示；得到字符串形式的hash值
            //一个byte是八位二进制，也就是2位十六进制字符（2的8次方等于16的2次方）
            return new BigInteger(1, md.digest()).toString(16);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String getFileMD5(String path) throws IOException {

        String md5Hex = DigestUtils.md5Hex(new FileInputStream(path));
        return md5Hex;
    }

    /**
     * 将JSON数据格式化并保存到文件中
     * @param jsonData 需要输出的json数
     * @param filePath 输出的文件地址
     * @return
     */
    public static boolean createJsonFile(Object jsonData, String filePath) {
//        String content = JSON.toJSONString(jsonData, SerializerFeature.PrettyFormat,
//
//                SerializerFeature.WriteDateUseDateFormat);
        String content = JSONObject.toJSONString(jsonData, SerializerFeature.EMPTY);
        // 标记文件生成是否成功
        boolean flag = true;
        // 生成json格式文件
        try {
            // 保证创建一个新文件
            File file = new File(filePath);
            if (!file.getParentFile().exists()) { // 如果父目录不存在，创建父目录
                file.getParentFile().mkdirs();
            }
            if (file.exists()) { // 如果已存在,删除旧文件
                file.delete();
            }
            file.createNewFile();
            // 将格式化后的字符串写入文件
            Writer write = new OutputStreamWriter(new FileOutputStream(file), "UTF-8");
            write.write(content);
            write.flush();
            write.close();
        } catch (Exception e) {
            flag = false;
            e.printStackTrace();
        }
        return flag;
    }

    /**
     * 说明：根据指定URL将文件下载到指定目标位置
     *
     * @param urlPath
     *            下载路径
     * @param downloadDir
     *            文件存放目录
     * @return 返回下载文件
     */
    @SuppressWarnings("finally")
    public static File downloadFile(String urlPath, String downloadDir,String fileName) {
        long start = System.currentTimeMillis();
        File file = null;
        try {
            // 统一资源
            URL url = new URL(urlPath);
            // 连接类的父类，抽象类
            URLConnection urlConnection = url.openConnection();
            // http的连接类
            HttpURLConnection httpURLConnection = (HttpURLConnection) urlConnection;
            //设置超时
            httpURLConnection.setConnectTimeout(1000*5);
            //设置请求方式，默认是GET
            httpURLConnection.setRequestMethod("GET");
            // 设置字符编码
            httpURLConnection.setRequestProperty("Charset", "UTF-8");
            // 打开到此 URL引用的资源的通信链接（如果尚未建立这样的连接）。
            httpURLConnection.connect();
            // 文件大小
            int fileLength = httpURLConnection.getContentLength();

            // 控制台打印文件大小
            log.info("您要下载的文件大小为:" + fileLength / (1024) + "KB");

            // 建立链接从请求中获取数据
            URLConnection con = url.openConnection();
            BufferedInputStream bin = new BufferedInputStream(httpURLConnection.getInputStream());
            // 指定文件名称(有需求可以自定义)
            //String fileFullName = "aaa.apk";
            // 指定存放位置(有需求可以自定义)
            String path = downloadDir + File.separatorChar + fileName;
            file = new File(path);
            // 校验文件夹目录是否存在，不存在就创建一个目录
            if (!file.getParentFile().exists()) {
                file.getParentFile().mkdirs();
            }

            OutputStream out = new FileOutputStream(file);
            int size = 0;
            int len = 0;
            byte[] buf = new byte[2048];
            while ((size = bin.read(buf)) != -1) {
                len += size;
                out.write(buf, 0, size);
                // 控制台打印文件下载的百分比情况
                //System.out.println("下载了-------> " + len * 100 / fileLength + "%\n");
            }
            // 关闭资源
            bin.close();
            out.close();
            long end = System.currentTimeMillis();
            log.info("文件下载成功！ 耗时 ："+(end-start)+" ms");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("文件下载失败！");
        } finally {
            return file;
        }

    }


    public static String getDayTime() {


        String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date()).toString();

        return date;
    }

    /**
     * MD5加密
     * @param s
     * @return
     */
    public static String getMD5(String s) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] bytes = md.digest(s.getBytes("utf-8"));
            return toHex(bytes);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String toHex(byte[] bytes) {
        final char[] HEX_DIGITS = "0123456789abcdef".toCharArray();
        StringBuilder ret = new StringBuilder(bytes.length * 2);
        for (int i=0; i<bytes.length; i++) {
            ret.append(HEX_DIGITS[(bytes[i] >> 4) & 0x0f]);
            ret.append(HEX_DIGITS[bytes[i] & 0x0f]);
        }
        return ret.toString();
    }

    /**
     * http请求
     * @param httpUrl
     * @param param
     * @return
     */
    public static String doPost(String httpUrl, Map<String, Object> param) {
        try {
            // 创建连接
            URL url = new URL(httpUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestProperty("Content-type", "application/x-www-form-urlencoded");
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("POST");
            connection.setUseCaches(false);
            connection.setInstanceFollowRedirects(true);
            connection.connect();
            // POST请求
            DataOutputStream out = new DataOutputStream(connection.getOutputStream());
            out.write(getDataStr(param).getBytes());
            out.flush();
            out.close();
            // 读取响应
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String lines;
            StringBuffer strBuffer = new StringBuffer("");
            while ((lines = reader.readLine()) != null) {
                lines = new String(lines.getBytes(), "utf-8");
                strBuffer.append(lines);
            }
            reader.close();
            connection.disconnect();
            return strBuffer.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    /**
     * 拼接post参数
     * @param map
     * @return
     * @throws UnsupportedEncodingException
     */
    private static String getDataStr(Map<String, Object> map) throws UnsupportedEncodingException {
        StringBuilder params = new StringBuilder();
        for(Map.Entry<String, Object> data : map.entrySet()) {
            if(null != data.getKey() && !"".equals(data.getKey()) && null != data.getValue() && !"".equals(data.getValue())) {
                if(data.getKey().equals("ms")) {
                    params.append("&").append(data.getKey()).append("=").append(URLEncoder.encode((String) data.getValue(), "utf-8"));
                } else {
                    params.append("&").append(data.getKey()).append("=").append(data.getValue());
                }
            }
        }
        return params.toString().substring(1, params.length());
    }
}
