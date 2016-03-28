package cn.thinkjoy.zgk.market.util;

import com.alibaba.fastjson.JSON;
import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by clei on 15/4/23.
 */
public class HttpRequestUtil {

    //���ӳ�ʱʱ��(��λ����)
    private static Integer HTTP_TIME_OUT=4000;
    //�����ݳ�ʱʱ��(��λ����)
    private static Integer HTTP_SO_TIME_OUT=20000;

    /**
     * ִ��һ��HTTP GET����
     * @param url
     * @return HTTP״̬
     */
    public static void doHttpGet(String url) throws Exception {
        DefaultHttpClient client = new DefaultHttpClient();
        HttpGet httpGet = new HttpGet(url);
        httpGet.addHeader("Content-type", "text/html;charset=utf-8");
        HttpConnectionParams.setConnectionTimeout(client.getParams(), HTTP_TIME_OUT);
        HttpConnectionParams.setSoTimeout(client.getParams(),HTTP_SO_TIME_OUT);
        client.execute(httpGet);
    }

    /**
     * post����
     * @param url         url��ַ
     * @param jsonParam     ����
     * @param noNeedResponse    ����Ҫ���ؽ��
     * @return
     */
    public static String httpPost(String url,String jsonParam, boolean noNeedResponse) throws Exception{
        //post���󷵻ؽ��
        DefaultHttpClient httpClient = new DefaultHttpClient();
        String jsonResult = null;
        HttpPost method = new HttpPost(url);
        try {
            if (null != jsonParam) {
                //���������������
                StringEntity entity = new StringEntity(jsonParam, "utf-8");
                entity.setContentEncoding("UTF-8");
                entity.setContentType("application/json");
                method.setEntity(entity);
            }
            HttpResponse result = httpClient.execute(method);
            url = URLDecoder.decode(url, "UTF-8");
            /**�����ͳɹ������õ���Ӧ**/
            if (result.getStatusLine().getStatusCode() == 200) {
                try {
                    /**��ȡ���������ع�����json�ַ�������**/
                    jsonResult = EntityUtils.toString(result.getEntity());
                    if (noNeedResponse) {
                        return null;
                    }
                    /**��json�ַ���ת����json����**/
//                    jsonResult = JSONObject.fromObject(str);
                } catch (Exception e) {
                    throw e;
                }
            }
        } catch (IOException e) {
            throw e;
        }
        return jsonResult;
    }

    /**
     * ִ��һ��HTTP GET���󣬷���������Ӧ��HTML
     *
     * @param url
     *            �����URL��ַ
     * @param queryString
     *            ����Ĳ�ѯ����,����Ϊnull
     * @return ����������Ӧ��HTML
     */
    @SuppressWarnings("deprecation")
    public static String doHttpGet(String url,String queryString) throws Exception {
        String strResult = "";
        /*try {//ת��
            queryString = URLEncoder.encode(queryString, "UTF-8");
        } catch (UnsupportedEncodingException e){
            e.printStackTrace();
        } */
        String uriAPI = url+"?"+queryString;
        DefaultHttpClient client = new DefaultHttpClient();
        HttpGet httpGet = new HttpGet(uriAPI);
        httpGet.addHeader("Content-type" , "text/html;charset=utf-8");
        HttpResponse httpResponse = client.execute(httpGet);
        if (httpResponse.getStatusLine().getStatusCode() == 200) {
            strResult = EntityUtils.toString(httpResponse.getEntity(),HTTP.UTF_8);
        }
        return strResult;
    }

    /**
     * ִ��һ��HTTP GET���󣬷���������Ӧ��HTML
     *
     * @param url
     *            �����URL��ַ
     *            ����Ĳ�ѯ����,����Ϊnull
     * @return ����������Ӧ��HTML
     */
    @SuppressWarnings("deprecation")
    public static String doGet(String url) throws Exception {
        String strResult = "";
        /*try {//ת��
            queryString = URLEncoder.encode(queryString, "UTF-8");
        } catch (UnsupportedEncodingException e){
            e.printStackTrace();
        } */
        DefaultHttpClient client = new DefaultHttpClient();
        HttpGet httpGet = new HttpGet(url);
        httpGet.addHeader("Content-type" , "text/html;charset=utf-8");
        HttpResponse httpResponse = client.execute(httpGet);
        if (httpResponse.getStatusLine().getStatusCode() == 200) {
            strResult = EntityUtils.toString(httpResponse.getEntity(),HTTP.UTF_8);
        }
        return strResult;
    }


    /**
     * ִ��һ��HTTP POST���󣬷���������Ӧ��HTML
     *
     * @param url
     *            �����URL��ַ
     * @param params
     *            ����Ĳ�ѯ����,����Ϊnull
     * @return ����������Ӧ��HTML
     * @throws IOException
     * @throws IllegalStateException
     */
    public static String doHttpPost(String url, Map<String, Object> params)
            throws Exception {
        String strResult = "";
        DefaultHttpClient httpClient = new DefaultHttpClient();
        HttpPost post = new HttpPost(url);
        List<BasicNameValuePair> postData = new ArrayList<BasicNameValuePair>();
        Map<String,String> maps = flattenParams(params);
        for (Map.Entry<String, String> entry : maps.entrySet()) {
            postData.add(new BasicNameValuePair(entry.getKey(), entry
                    .getValue()));
        }
        UrlEncodedFormEntity entity = new UrlEncodedFormEntity(postData, HTTP.UTF_8);
        post.setEntity(entity);
        HttpResponse response = httpClient.execute(post);
        // ��״̬��Ϊ200 ok
        if (response.getStatusLine().getStatusCode() == 200) {
            // ȡ����Ӧ�ִ�
            strResult = EntityUtils.toString(response.getEntity(), HTTP.UTF_8);
        }
        return strResult;
    }
    /** post */
    public static String doHttpPost(String url, String body) throws IOException {
        DefaultHttpClient client = new DefaultHttpClient();
        HttpConnectionParams.setConnectionTimeout(client.getParams(), HTTP_TIME_OUT);
        HttpConnectionParams.setSoTimeout(client.getParams(),HTTP_SO_TIME_OUT);
        HttpPost httpPost = new HttpPost(url);
        httpPost.addHeader("Content-type", "application/json;charset=utf-8");
        StringEntity entity = new StringEntity(body, ContentType.create("application/json", Consts.UTF_8));
        httpPost.setEntity(entity);
        HttpResponse response = client.execute(httpPost);
        HttpEntity entity1 = response.getEntity();
        String result = EntityUtils.toString(entity1, "utf-8");
        return result;
    }

//    /** post */
//    public static String doHttpAsyncPost(String url, String body) throws IOException {
//        CloseableHttpAsyncClient httpclient = HttpAsyncClients.createDefault();
//
//        HttpPost httpPost = new HttpPost(url);
//        httpPost.addHeader("Content-type", "application/json;charset=utf-8");
//
//        StringEntity entity = new StringEntity(body, ContentType.create("application/json", Consts.UTF_8));
//        httpPost.setEntity(entity);
//        HttpResponse response = httpclient.execute(httpPost);
//        HttpEntity entity1 = response.getEntity();
//        String result = EntityUtils.toString(entity1, "utf-8");
//        return result;
//    }




    private static Map<String, String> flattenParams(Map<String, Object> params)
            throws Exception {
        if (params == null) {
            return new HashMap<String, String>();
        }
        Map<String, String> flatParams = new HashMap<String, String>();
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            if (value instanceof Map<?, ?>) {
                Map<?, ?> nestedMap = (Map<?, ?>) value;
                flatParams.put(key,JSON.toJSONString(nestedMap));
            } else if (value instanceof ArrayList<?>) {
                ArrayList<?> ar = (ArrayList<?>) value;
                flatParams.put(key,JSON.toJSONString(ar));
            } else if ("".equals(value)) {
                throw new Exception("You cannot set '"+key+"' to an empty string. "+
                        "We interpret empty strings as null in requests. "+
                        "You may set '"+key+"' to null to delete the property.");
            } else if (value == null) {
                flatParams.put(key, "");
            } else {
                flatParams.put(key, value.toString());
            }
        }
        return flatParams;
    }

    public static String doHttpGet(String url,Map<String, String> params) throws Exception {
        /*try {//ת��
            queryString = URLEncoder.encode(queryString, "UTF-8");
        } catch (UnsupportedEncodingException e){
            e.printStackTrace();
        } */
        StringBuffer urlApi = new StringBuffer(url);

        int i=0;
        for (Map.Entry<String, String> entry : params.entrySet()) {
            if(i==0){
                urlApi.append("?");
            }else{
                urlApi.append("&");
            }
            urlApi.append(entry.getKey()+"="+entry.getValue());
            i++;
        }
        DefaultHttpClient client = new DefaultHttpClient();
        HttpGet httpGet = new HttpGet(urlApi.toString().replace(" ","%20"));
        httpGet.addHeader("Content-type" , "text/html;charset=utf-8");
        HttpResponse httpResponse = client.execute(httpGet);
//        if (httpResponse.getStatusLine().getStatusCode() == 200) {
        String strResult = EntityUtils.toString(httpResponse.getEntity(), HTTP.UTF_8);
//        }
        return strResult;
    }
    /**
     * ���в��������ַ��Ѿ�����
     */
    public static String doGet(String linkUrl,Map<String, String> params) throws Exception{
        HttpURLConnection connection = null;
        StringBuffer urlApi = new StringBuffer(linkUrl);

        int i=0;
        for (Map.Entry<String, String> entry : params.entrySet()) {
            if(i==0){
                urlApi.append("?");
            }else{
                urlApi.append("&");
            }
            urlApi.append(entry.getKey()+"="+entry.getValue());
            i++;
        }
        try {
            URL url = new URL(urlApi.toString());
            connection = (HttpURLConnection) url.openConnection();
            connection.setConnectTimeout(HTTP_TIME_OUT);// �������ӳ�ʱʱ�䣬��λ����
            connection.setReadTimeout(HTTP_SO_TIME_OUT);// ���ö�ȡ���ݳ�ʱʱ�䣬��λ����
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
            StringBuffer buffer = new StringBuffer();
            String line = "";
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
            reader.close();
            return buffer.toString();
        }catch (Exception e) {
            throw e;
        }finally{
            connection.disconnect();
        }
    }
}
