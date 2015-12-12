<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/12/12
 * Time: 22:36

 * 由于原始的公交站点数据不精确，所以添加到百度地图上时，与百度本身的数据偏移较大，
 * 所以在getBusInfo.html文件中截取获得的公交站点信息，并把这些信息提交给后台的本文件，
 * 本文件连接数据库，并进行查询匹配，如果匹配成功则更新数据库。
 * 此时只更新了81路公交路线的站点精确坐标信息
 */
$stationsArr=$_POST["info"];
//echo $stationsOrr[0][0];

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

foreach ($stationsArr as $value) {
    echo $value[0]+" "+$value[1]+" "+$value[2];
    $updatedb = "UPDATE stationin SET SOURCE_LON='$value[1]',SOURCE_LAT='$value[2]' WHERE ZDMC='$value[0]'";
    //更新数据到选中数据库中的某个表
    if (!mysql_query($updatedb, $con)) {
        die('Error: ' . mysql_error());
    }
}
mysql_close($con);
echo "well done";