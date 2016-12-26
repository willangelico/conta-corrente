/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306_2
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : s2it

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2016-06-27 07:15:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `count`
-- ----------------------------
DROP TABLE IF EXISTS `count`;
CREATE TABLE `count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(1) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of count
-- ----------------------------
INSERT INTO `count` VALUES ('19', '1', '432', '2016-06-26 19:55:00');
INSERT INTO `count` VALUES ('20', '2', '1000', '2016-06-26 19:56:41');
INSERT INTO `count` VALUES ('23', '2', '100', '2016-06-26 20:03:22');
INSERT INTO `count` VALUES ('36', '2', '300', '2016-06-26 20:12:06');
INSERT INTO `count` VALUES ('44', '1', '200', '2016-06-26 20:19:01');
INSERT INTO `count` VALUES ('46', '2', '100', '2016-06-26 20:19:20');
INSERT INTO `count` VALUES ('48', '2', '100', '2016-06-26 20:23:39');
INSERT INTO `count` VALUES ('50', '2', '100', '2016-06-26 20:25:32');
INSERT INTO `count` VALUES ('52', '1', '100', '2016-06-26 20:25:49');
