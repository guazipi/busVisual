<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/12/12
 * Time: 13:06
 * 从数据库中读取station相关的数据，并将其写入一个js文件中，
 * 中文字符没有显示中文是因为编码过，直接在浏览器前端调用即可
 */
header("charset=utf-8");
$con = mysql_connect("localhost", "root");

if (!$con) {
    die('Could not connect: ' . mysql_error());
}
mysql_query("SET NAMES UTF8");
mysql_query("set character_set_client=utf8");
mysql_query("set character_set_results=utf8");
//选中某个数据库
mysql_select_db("stations", $con);

mysql_query('set names utf8', $con);
$queryString="select * from stationin";

$queryResult = mysql_query($queryString, $con);
if (!$queryResult) {
    die('Error: ' . mysql_error());
}
$allinfo=[];
while($row=mysql_fetch_row($queryResult))
{
    array_push($allinfo,$row);
}
mysql_close($con);

$kkk=json_encode($allinfo);
$file=fopen("stationinfo.js","w+");
$info0="var stationinfo=".$kkk;

$content = iconv('','utf-8',$info0);

fwrite($file,$content);
fclose($file);
