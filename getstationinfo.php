<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/12/12
 * Time: 13:06
 * �����ݿ��ж�ȡstation��ص����ݣ�������д��һ��js�ļ��У�
 * �����ַ�û����ʾ��������Ϊ�������ֱ���������ǰ�˵��ü���
 */
header("charset=utf-8");
$con = mysql_connect("localhost", "root");

if (!$con) {
    die('Could not connect: ' . mysql_error());
}
mysql_query("SET NAMES UTF8");
mysql_query("set character_set_client=utf8");
mysql_query("set character_set_results=utf8");
//ѡ��ĳ�����ݿ�
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
