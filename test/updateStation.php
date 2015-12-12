<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/12/12
 * Time: 22:36
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