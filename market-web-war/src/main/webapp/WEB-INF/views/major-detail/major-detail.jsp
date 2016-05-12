<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <%@ include file="../common/meta.jsp"%>
  <link rel="stylesheet" href="<%=ctx%>/static/dist/css/major-detail/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
</div>
<script type="text/x-handlebars-template" id="detile">
  <div class="container-header">
    <div class="title">
      {{majorName}}
    </div>
    <div>授予学位：{{degreeOffered}}</div>
    <div>修学年限：{{schoolingDuration}}</div>
    <div>专业代码：{{majorCode}}</div>
  </div>
  <div class="container-content">
    <div class="content">
      <div class="title">开设课程</div>
      <div class="description">{{offerCourses}}</div>
    </div>
    <div class="content">
      <div class="title">专业解读</div>
      <div class="description" id="majorIntroduce">
      </div>
    </div>
  </div>
</script>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/majorDetail.js?V=11"></script>
</body>
</html>
