package cn.thinkjoy.zgk.market.controller.score;

import cn.thinkjoy.common.exception.BizException;
import cn.thinkjoy.zgk.market.constant.SpringMVCConst;
import cn.thinkjoy.zgk.market.dao.IScoreAnalysisDAO;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * Created by yangyongping on 16/7/26.
 */
@Controller
@Scope(SpringMVCConst.SCOPE)
@RequestMapping(value = "/score")
public class ScoreController {


    @Autowired
    private IScoreAnalysisDAO scoreAnalysisDAO;

    /**
     * 根据用户Id和用户来源查询用户最新的提交记录
     * @return
     */
    @RequestMapping(value = "/queryScoreRecordByUserId",method = RequestMethod.GET)
    @ResponseBody
    public Object queryScoreRecordByUserId(@RequestParam long userId){
        Map<String,Object> map = scoreAnalysisDAO.queryScoreRecordByUserId(userId);

        Map<String,Object> resultMap = new HashedMap();
        resultMap.put("areaName",map.get("areaName"));
        Integer majorType=(Integer) map.get("majorType");
        resultMap.put("majorType",majorType);
        Map<String,Object> scores = getScores(map,majorType);

        resultMap.put("scores",scores);
        return resultMap;
    }

    /**
     * 用保存用户信息
     * @return
     */
    @RequestMapping(value = "/insertUserInfo",method = RequestMethod.POST)
    @ResponseBody
    public Object insertUserInfo(@RequestParam long userId,
                                    @RequestParam long provinceId,
                                    @RequestParam long cityId,
                                    @RequestParam long countyId,
                                    @RequestParam long schoolCode,
                                    @RequestParam String schoolName,
                                    @RequestParam String gradeInfo,
                                    @RequestParam String classInfo){
        //保存用户信息

        Map<String,Object> insertMap = new HashedMap();
        insertMap.put("userId",userId);
        insertMap.put("provinceId",provinceId);
        insertMap.put("cityId",cityId);
        insertMap.put("countyId",countyId);
        insertMap.put("schoolCode",schoolCode);
        insertMap.put("schoolName",schoolName);
        insertMap.put("gradeInfo",gradeInfo);
        insertMap.put("classInfo",classInfo);
        try {
            scoreAnalysisDAO.setUserInfo(insertMap);
        }catch (Exception e){
            throw new BizException("error","添加失败,用户异常!");
        }
        return true;
    }

    /**
     * 根据区Id获取当前区高中
     * @return
     */
    @RequestMapping(value = "/queryHighSchoolByCountyId",method = RequestMethod.GET)
    @ResponseBody
    public Object queryHighSchoolByCountyId(@RequestParam long countyId,@RequestParam String schoolName){
        if("".equals(schoolName)){
            schoolName=null;
        }
        return scoreAnalysisDAO.queryHighSchoolByCountyId(countyId,schoolName);
    }

    /**
     * 查询用户信息
     * @return
     */
    @RequestMapping(value = "/queryUserInfo",method = RequestMethod.GET)
    @ResponseBody
    public Object queryUserInfo(@RequestParam long userId){
        return scoreAnalysisDAO.queryUserInfo(userId);
    }

    /**
     * 用户填写完分数信息后，提交成绩信息
     * @return
     */
    @RequestMapping(value = "/insertScoreRecord",method = RequestMethod.POST)
    @ResponseBody
    public Object insertScoreRecord(@RequestParam long userId,
                                    @RequestParam long areaId,
                                    @RequestParam Integer majorType,
                                    @RequestParam Map<String,Object> scores){

        Map<String,Object> insertMap = new HashedMap();
        insertMap.put("userId",userId);
        insertMap.put("areaId",areaId);
        insertMap.put("majorType",majorType);
        insertMap.put("cdate",System.currentTimeMillis());
        Map<String,Object> insertScores = new HashedMap();

        Iterator iterator=scores.entrySet().iterator();
        Float totalScore=0f;
        while (iterator.hasNext()){
            String key = (String) iterator.next();
            String value = (String) scores.get(key);
            String[] values = value.split("-");
            totalScore+=Float.valueOf(values[0]);
            insertScores.put(key+"Score",values[0]);
            insertScores.put(key+"ScoreTotal",values[1]);
        }

        insertMap.put("scores",insertScores);
        insertMap.put("totalScore",totalScore);
        insertMap=scoreAnalysisDAO.insertScoreRecord(insertMap);
        Map<String,Object> resultMap=new HashedMap();
        resultMap.put("recordId",insertMap.get("recordId"));
        return resultMap;
    }


    /**
     * 用户根据记录ID查询分数的信息和排名信息
     * @return
     */
    @RequestMapping(value = "/queryInfoByRecordId",method = RequestMethod.GET)
    @ResponseBody
    public Object queryInfoByRecordId(@RequestParam long recordId){

        Map<String,Object> map = scoreAnalysisDAO.queryInfoByRecordId(recordId);




        Map<String,Object> resultMap = new HashedMap();
        Float totalScore = (Float) map.get("totalScore");
        Long areaId = Long.valueOf(map.get("areaId").toString()) ;
        resultMap.put("totalScore",totalScore);
        resultMap.put("areaName",map.get("areaName"));
        Integer majorType=(Integer) map.get("majorType");
        resultMap.put("majorType",majorType);
        //需要超过多少人
        String areaTableName = getAreaTableName(areaId,majorType);
        int stuNum = scoreAnalysisDAO.queryStuNum(totalScore,areaTableName);
        int allStuNum = scoreAnalysisDAO.queryAllAreaStuNum(areaTableName);
        int proviceRank = scoreAnalysisDAO.queryProviceRank(totalScore,areaTableName);
        resultMap.put("stuNum",stuNum);
        String[] nums=String.valueOf(100-((Float.valueOf(proviceRank)/Float.valueOf(allStuNum))*100)).split("\\.");
        String proviceRankPro=nums[0]+"."+nums[1].substring(0,2)+"%";
        resultMap.put("proviceRankPro",proviceRankPro);
        resultMap.put("proviceRank",proviceRank);
        resultMap.put("scores",getScores(map,majorType));

//        Map<String,Object> resultMap=new HashedMap();
//        resultMap.put("totalScore",600);
//        resultMap.put("majorType",1);
//        resultMap.put("proviceRank",1000);
//        resultMap.put("stuNum",50);
//        Map<String,Object> scores = new HashedMap();
//        scores.put("语文","90-100");
//        scores.put("数学","90-100");
//        scores.put("外语","90-100");
//        scores.put("物理","90-100");
//        scores.put("化学","90-100");
//        scores.put("生物","90-100");
//        resultMap.put("scores",scores);

        return resultMap;
    }

    /**
     * 根据用户Id和用户来源查询用户所有的提交记录
     * @return
     */
    @RequestMapping(value = "/queryAllRecordByUserId",method = RequestMethod.GET)
    @ResponseBody
    public Object queryAllRecordByUserId(@RequestParam long userId){


        List<Map<String,Object>> list = new ArrayList<>();

        List<Map<String,Object>> queryList = scoreAnalysisDAO.queryAllRecordByUserId(userId);
        if(queryList!=null && (!queryList.isEmpty())) {
            for (Map<String, Object> map : queryList) {
                Map<String, Object> resultMap = new HashedMap();
                Float totalScore = (Float) map.get("totalScore");
                Long areaId = Long.valueOf(map.get("areaId").toString()) ;
                resultMap.put("recordId", map.get("recordId"));
                resultMap.put("totalScore", totalScore);
                resultMap.put("areaName", map.get("areaName"));
                Integer majorType = (Integer) map.get("majorType");
                resultMap.put("majorType", majorType);
                resultMap.put("cdate", map.get("cdate"));
                //需要超过多少人
                String areaTableName = getAreaTableName(areaId,majorType);
                int stuNum = scoreAnalysisDAO.queryStuNum(totalScore, areaTableName);
                int proviceRank = scoreAnalysisDAO.queryProviceRank(totalScore,areaTableName);
                resultMap.put("stuNum", stuNum);
                resultMap.put("proviceRank", proviceRank);


                resultMap.put("scores", getScores(map,majorType));

                list.add(resultMap);
            }
        }


//        List<Map<String,Object>> list = new ArrayList<>();
//
//        for(int i=0;i<5;i++) {
//            Map<String, Object> resultMap = new HashedMap();
//            resultMap.put("recordId", 1);
//            resultMap.put("totalScore", 600);
//            resultMap.put("majorType", 1);
//            resultMap.put("proviceRank", 1000);
//            resultMap.put("cdate", 146951915700l);
//            Map<String, Object> scores = new HashedMap();
//            scores.put("语文", "90-100");
//            scores.put("数学", "90-100");
//            scores.put("外语", "90-100");
//            scores.put("物理", "90-100");
//            scores.put("化学", "90-100");
//            scores.put("生物", "90-100");
//            resultMap.put("scores", scores);
//            list.add(resultMap);
//        }
        return list;
    }

    /**
     * 根据省份ID和用户总成绩查询该省份的相应批次线
     * @return
     */
    @RequestMapping(value = "/queryBatchLineByAreaId",method = RequestMethod.GET)
    @ResponseBody
    public Object queryBatchLineByAreaId(@RequestParam float totalScore,
                                         @RequestParam long areaId,
                                         @RequestParam int majorType){

        String scoreLine = scoreAnalysisDAO.queryScoreLine(areaId,majorType,getYear());

        String [] scoreStrs = scoreLine.split("-");
        Float topScore = null;
        Float bottomScore = null;
        int i=1;
        for(String scoreStr:scoreStrs){
            float score=Float.parseFloat(scoreStr.split("\\|")[0]);
            if(totalScore-score<0){
                topScore=score;
            }else {
                bottomScore=score;
                break;
            }
            i++;
        }
        String batch1=null;
        String batch2=null;
        switch (i){
            case 1:
                batch2="一批本科";
                break;
            case 2:
                batch1="一批本科";
                batch2="二批本科";
                break;
            case 3:
                batch1="二批本科";
                batch2="三批本科";
                break;
            case 4:
                batch1="三批本科";
                batch2="高职高专";
                break;
            case 5:
                batch1="高职高专";
                break;
        }

        Map<String, Object> resultMap = new HashedMap();
        Map<String, Object> topLine = new HashedMap();
        Map<String, Object> bottomLine = new HashedMap();

        topLine.put("batch",batch1);
        topLine.put("score",topScore);
        bottomLine.put("batch",batch2);
        bottomLine.put("score",bottomScore);
        resultMap.put("topLine", topLine);
        resultMap.put("bottomLine", bottomLine);




//        Map<String, Object> resultMap = new HashedMap();
//        Map<String, Object> topLine = new HashedMap();
//        Map<String, Object> bottomLine = new HashedMap();
//
//        topLine.put("batch","一批本科");
//        topLine.put("score",430);
//        bottomLine.put("batch","二批本科");
//        bottomLine.put("score",380);
//        resultMap.put("topLine", topLine);
//        resultMap.put("bottomLine", bottomLine);
        return resultMap;
    }

    /**
     * 根据用户总分为用户推荐院校
     * @return
     */
    @RequestMapping(value = "/recommendSchool",method = RequestMethod.GET)
    @ResponseBody
    public Object recommendSchool(float totalScore,long areaId,int majorType){

        //确定当前分数对应当年批次分数
//        long areaId,int majorType,Float totalScore,String year
        Object[] line1s = getBatchAndScore(areaId,majorType,totalScore,getYear());
        int batch= (int)line1s[2];
        //获得分差1  考生分-16年分数线
        float difference = totalScore-(Float) line1s[0];
        //确定点钱分数对应次年批次分数

        Integer lastYear = Integer.valueOf(getYear())-1;
        Float line2 = getLastBatchAndScore(areaId,majorType,batch,lastYear.toString());

        //获得分差2  院校15年分-15年分数线 (15年分数线)



        //计算公式为 lowestScore - line -  difference > = bc  || lowestScore - line -  difference > = -bc

        int count =0;
        int bc = 0;
        do {
            count = scoreAnalysisDAO.countUniversity(areaId,(Integer)line1s[2],majorType,lastYear.toString(),difference,line2,bc);
            //增加步长
            bc+=5;
        }while (count<20);

        bc-=5;
        //返回前20个院校
        List<Map<String,Object>> resultList = scoreAnalysisDAO.queryUniversityByScore(areaId,(Integer)line1s[2],majorType,lastYear.toString(),difference,line2,totalScore,bc);

//        List<Map<String,Object>> list = new ArrayList<>();
//        Map<String,Object> resultMap=new HashedMap();
//        resultMap.put("schoolName","北京大学");
//        resultMap.put("batch","一批本科");
//        resultMap.put("stuNum",100);
//        resultMap.put("averageScore",600.0);
//        resultMap.put("gapSchool",-20);
//        list.add(resultMap);
        return resultList;
    }

    /**
     * 根据大学ID和省份ID查询相应的录取批次
     * @return
     */
    @RequestMapping(value = "/queryBatchsBySchoolIdAndAreaId",method = RequestMethod.GET)
    @ResponseBody

    public Object queryBatchsBySchoolIdAndAreaId(long areaId,long schoolId){


        List<Map<String,Object>> list = null;
        list=scoreAnalysisDAO.queryUnivsersityBatch(areaId,schoolId,getYear());
//        List<Map<String,Object>> list = new ArrayList<>();
//        Map<String,Object> resultMap1=new HashedMap();
//        resultMap1.put("batchId",1);
//        resultMap1.put("batchName","一批本科");
//        Map<String,Object> resultMap2=new HashedMap();
//        resultMap2.put("batchId",2);
//        resultMap2.put("batchName","二批本科");
//        Map<String,Object> resultMap3=new HashedMap();
//        resultMap3.put("batchId",4);
//        resultMap3.put("batchName","三批本科");
//        Map<String,Object> resultMap4=new HashedMap();
//        resultMap4.put("batchId",8);
//        resultMap4.put("batchName","高职专科");
//        list.add(resultMap1);
//        list.add(resultMap2);
//        list.add(resultMap3);
//        list.add(resultMap4);
//
        return list;
    }

    /**
     * 根据用户总分、学校ID、批次信息查询用户与目标院校距离
     * @return
     */
    @RequestMapping(value = "/queryGapBySchoolIdAndBatch",method = RequestMethod.POST)
    @ResponseBody
    public Object queryGapBySchoolIdAndBatch(@RequestParam long recordId,
                                             Long schoolId,
                                             Integer batch,
                                             @RequestParam long userId){

        Map<String,Object> targetMap = null;
        Map<String,Object> map = scoreAnalysisDAO.queryInfoByRecordId(recordId);
        if(schoolId!=null && batch!=null){
            Map<String,Object> insertMap = new HashedMap();
            insertMap.put("userId",userId);
            insertMap.put("areaId",map.get("areaId"));
            insertMap.put("universityId",schoolId);
            insertMap.put("batch",batch);
            insertMap.put("cdate",System.currentTimeMillis());
            scoreAnalysisDAO.insertTarget(insertMap);
            targetMap=insertMap;
        }else {

            targetMap = scoreAnalysisDAO.queryLastTarget(userId);

        }

        long areaId = Long.valueOf(map.get("areaId").toString());
        int majorType = (int)map.get("majorType");
        Float totalScore=(Float) map.get("totalScore");
        String areaTableName = getAreaTableName(areaId,majorType);
        float schoolLine = scoreAnalysisDAO.queryUnivsersityLowestScore(schoolId,areaId,batch,majorType,getYear());
        int stuNum = scoreAnalysisDAO.queryStuNumToLine(totalScore,schoolLine,areaTableName);

        Map<String,Object> resultMap=new HashedMap();
        resultMap.put("stuNum",stuNum);
        resultMap.put("addScore",totalScore-schoolLine);
        resultMap.put("batchLine",getBatchScore(batch,areaId,majorType));
        resultMap.put("schoolLine",schoolLine);
        return resultMap;
    }

    private String getYear(){
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH)+1;
        if(month>=7){
            return year+"";
        }else {
            return year-1+"";
        }
    }

    /**
     * 生成一分一段表表名
     * @param areaId
     * @param majorType
     * @return
     */
    private String getAreaTableName(long areaId,int majorType){
        String areaKey = scoreAnalysisDAO.queryAreaKey(areaId);
        return "zgk_data." + areaKey + "_" + majorType + "_y";
    }


    /**
     * 生成分数明细
     * @param map
     * @param majorType
     * @return
     */
    private Map<String,Object> getScores(Map<String,Object> map,int majorType){
        Map<String, Object> scores = new HashedMap();
        scores.put("语文", (float) map.get("ywScore") + "-" + (float) map.get("ywScoreTotal"));
        scores.put("数学", (float) map.get("sxScore") + "-" + (float) map.get("sxScoreTotal"));
        scores.put("外语", (float) map.get("wyScore") + "-" + (float) map.get("wyScoreTotal"));
        if (majorType == 2) {
            scores.put("物理", (float) map.get("wlScore") + "-" + (float) map.get("wlScoreTotal"));
            scores.put("化学", (float) map.get("hxScore") + "-" + (float) map.get("hxScoreTotal"));
            scores.put("生物", (float) map.get("swScore") + "-" + (float) map.get("swScoreTotal"));
        } else if ((majorType == 1)) {
            scores.put("历史", (float) map.get("lsScore") + "-" + (float) map.get("lsScoreTotal"));
            scores.put("政治", (float) map.get("zzScore") + "-" + (float) map.get("zzScoreTotal"));
            scores.put("地理", (float) map.get("dlScore") + "-" + (float) map.get("dlScoreTotal"));
        } else {

            scores.put("物理", (float) map.get("wlScore") + "-" + (float) map.get("wlScoreTotal"));
            scores.put("化学", (float) map.get("hxScore") + "-" + (float) map.get("hxScoreTotal"));
            scores.put("生物", (float) map.get("swScore") + "-" + (float) map.get("swScoreTotal"));
            scores.put("历史", (float) map.get("lsScore") + "-" + (float) map.get("lsScoreTotal"));
            scores.put("思想政治", (float) map.get("zzScore") + "-" + (float) map.get("zzScoreTotal"));
            scores.put("地理", (float) map.get("dlScore") + "-" + (float) map.get("dlScoreTotal"));
            scores.put("通用技术", (float) map.get("tyScore") + "-" + (float) map.get("tyScoreTotal"));
        }
        return scores;
    }

    /**
     * 获取批次线
     * @param batch
     * @param areaId
     * @param majorType
     * @return
     */
    private String getBatchScore(Integer batch,long areaId,int majorType){

        String scoreLine = scoreAnalysisDAO.queryScoreLine(areaId,majorType,getYear());


        String [] scoreStrs = scoreLine.split("-");

        String batchStr = batch.toString().substring(0,1);

        switch (Integer.parseInt(batchStr)){
            case 1:
                return scoreStrs[0].split("\\|")[0];
            case 2:
                return scoreStrs[1].split("\\|")[0];
            case 4:
                return scoreStrs[3].split("\\|")[0];
            case 8:
                return scoreStrs[4].split("\\|")[0];

        }

       return null;
    }

    private Object[] getBatchAndScore(long areaId,int majorType,Float totalScore,String year){

        String scoreLine = scoreAnalysisDAO.queryScoreLine(areaId,majorType,year);

        String [] scoreStrs = scoreLine.split("-");
        Float bottomScore = null;
        int i=1;
        for(String scoreStr:scoreStrs){
            float score=Float.parseFloat(scoreStr.split("\\|")[0]);
            if(totalScore-score>0){
                bottomScore=score;
                break;
            }
            i++;
        }
        String batch2=null;
        switch (i){
            case 1:
                batch2="一批本科";
                break;
            case 2:
                batch2="二批本科";
                break;
            case 3:
                batch2="三批本科";
                break;
            case 4:
                batch2="高职高专";
                break;
            case 5:
                batch2="不足高职高专";
                break;
        }

        Object[] objects = new Object[3];
        objects[0]=bottomScore;
        objects[1]=batch2;
        objects[2]=i;
        return objects;
    }

    private Float getLastBatchAndScore(long areaId,int majorType,int batch,String year){

        String scoreLine = scoreAnalysisDAO.queryScoreLine(areaId,majorType,year);

        String [] scoreStrs = scoreLine.split("-");
        Float bottomScore = null;
        String batch2=null;
        Float score=null;
        switch (batch){
            case 1:
                score=Float.parseFloat(scoreStrs[batch-1].split("\\|")[0]);
                break;
            case 2:
                score=Float.parseFloat(scoreStrs[batch-1].split("\\|")[0]);
                break;
            case 3:
                score=Float.parseFloat(scoreStrs[batch-1].split("\\|")[0]);

                break;
            case 4:
                score=Float.parseFloat(scoreStrs[batch-1].split("\\|")[0]);

                break;
            case 5:
                break;
        }

        return score;
    }
}
