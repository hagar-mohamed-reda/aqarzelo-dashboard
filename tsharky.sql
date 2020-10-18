-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2019 at 09:42 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tsharky`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank_account`
--

CREATE TABLE `bank_account` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iban_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `account_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bank_account`
--

INSERT INTO `bank_account` (`id`, `name`, `bank_name`, `iban_id`, `created_at`, `updated_at`, `account_id`) VALUES
(2, 'dfgdfg', 'dgfdg', '43534534', '2019-10-30 04:14:30', '2019-10-30 04:14:30', '5435345'),
(3, 'rfdgd', 'vdff', '5345', '2019-10-30 04:14:35', '2019-10-30 04:14:35', '43543'),
(4, 'gdfg', 'gdfgdf', '43534534', '2019-10-30 04:14:39', '2019-10-30 04:14:39', '5435345'),
(5, 'dfgdf', 'vfgfdg', '435345', '2019-10-31 08:26:09', '2019-10-31 08:26:09', '5435345');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_ar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name_ar`, `name_en`, `created_at`, `updated_at`) VALUES
(2, 'category1', 'category1 cxc', '2019-10-29 15:51:11', '2019-10-29 15:51:11'),
(3, 'صنف 2', 'category1 cxc', '2019-10-29 15:51:15', '2019-10-29 15:51:15'),
(4, 'مجموعه 1', 'category1 cxc', '2019-10-29 15:51:18', '2019-10-29 15:51:18'),
(5, 'مجموعه 1', 'item1', '2019-10-29 15:51:20', '2019-10-29 15:51:20'),
(6, 'مجموعه 1', 'category2ddd', '2019-10-29 15:51:23', '2019-10-29 15:51:23'),
(7, 'صنف 1', 'category2ddd', '2019-10-29 15:51:29', '2019-10-29 15:51:29'),
(8, 'صنف 2', 'category2', '2019-10-29 15:51:32', '2019-10-29 15:51:32'),
(9, 'category2dd', 'item2', '2019-10-29 15:51:36', '2019-10-29 15:51:36');

-- --------------------------------------------------------

--
-- Table structure for table `dictionary`
--

CREATE TABLE `dictionary` (
  `id` int(11) NOT NULL,
  `word` varchar(191) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dictionary`
--

INSERT INTO `dictionary` (`id`, `word`, `created_at`, `updated_at`) VALUES
(1, 'logout', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(2, 'search', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(4, 'cart', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(6, 'payment total', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(7, 'show cart', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(8, 'pay', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(9, 'home', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(10, 'about', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(11, 'contact', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(12, 'bank account', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(13, 'place your', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(14, 'order', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(15, 'confirm your', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(16, 'payment', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(17, 'Enjoy your', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(19, 'support', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(20, 'all departments', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(21, 'add to cart', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(23, 'all products', '2019-11-04 19:17:15', '2019-11-04 19:17:15'),
(26, 'How To Buy Cards', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(27, 'From TSharky', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(28, 'watch Now', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(29, 'Karma Coin', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(30, 'account', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(31, 'dashboard', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(32, 'my orders', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(33, 'my reviews', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(34, 'profile', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(35, 'Information', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(36, 'terms & conditions', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(37, 'bank accounts', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(38, 'about us', '2019-11-04 19:17:16', '2019-11-04 19:17:16'),
(73, 'send a message for us', '2019-11-04 19:17:23', '2019-11-04 19:17:23'),
(74, 'email', '2019-11-04 19:17:23', '2019-11-04 19:17:23'),
(76, 'subject', '2019-11-04 19:17:23', '2019-11-04 19:17:23'),
(78, 'message', '2019-11-04 19:17:23', '2019-11-04 19:17:23'),
(80, 'send', '2019-11-04 19:17:23', '2019-11-04 19:17:23'),
(102, 'name', '2019-11-04 19:17:26', '2019-11-04 19:17:26'),
(103, 'bank name', '2019-11-04 19:17:26', '2019-11-04 19:17:26'),
(104, 'account id', '2019-11-04 19:17:26', '2019-11-04 19:17:26'),
(105, 'iban id', '2019-11-04 19:17:26', '2019-11-04 19:17:26'),
(128, 'cart total', '2019-11-04 19:17:32', '2019-11-04 19:17:32'),
(129, 'price total', '2019-11-04 19:17:32', '2019-11-04 19:17:32'),
(130, 'transport cost', '2019-11-04 19:17:32', '2019-11-04 19:17:32'),
(131, 'final total', '2019-11-04 19:17:32', '2019-11-04 19:17:32'),
(154, 'address', '2019-11-04 19:17:37', '2019-11-04 19:17:37'),
(156, 'confirm', '2019-11-04 19:17:37', '2019-11-04 19:17:37'),
(157, 'you are logined you can create order', '2019-11-04 19:17:37', '2019-11-04 19:17:37'),
(158, 'bill info', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(159, 'first name', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(160, 'last name', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(163, 'city', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(164, 'postal code', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(165, 'country', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(166, 'state', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(167, 'shipping to another address', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(168, 'shipping address', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(177, 'continue', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(178, 'payment method', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(179, 'bank transfer', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(180, 'please pay to any our bank accounts', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(182, 'back', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(183, 'your products', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(186, 'payment structures', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(188, '', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(189, 'click here for download', '2019-11-04 19:17:38', '2019-11-04 19:17:38'),
(194, 'send order', '2019-11-04 19:17:39', '2019-11-04 19:17:39'),
(207, 'orders', '2019-11-04 19:17:45', '2019-11-04 19:17:45'),
(208, 'rates', '2019-11-04 19:17:45', '2019-11-04 19:17:45'),
(209, 'personal information', '2019-11-04 19:17:45', '2019-11-04 19:17:45'),
(211, 'phone', '2019-11-04 19:17:45', '2019-11-04 19:17:45'),
(213, 'password', '2019-11-04 19:17:45', '2019-11-04 19:17:45'),
(214, 'description', '2019-11-04 19:17:45', '2019-11-04 19:17:45'),
(215, 'photo', '2019-11-04 19:17:45', '2019-11-04 19:17:45'),
(216, 'edit', '2019-11-04 19:17:45', '2019-11-04 19:17:45'),
(307, 'stock', '2019-11-04 19:18:05', '2019-11-04 19:18:05'),
(308, 'customer reviews', '2019-11-04 19:18:05', '2019-11-04 19:18:05'),
(309, 'in stock', '2019-11-04 19:18:05', '2019-11-04 19:18:05'),
(310, 'amount', '2019-11-04 19:18:05', '2019-11-04 19:18:05'),
(312, 'add comment', '2019-11-04 19:18:05', '2019-11-04 19:18:05'),
(313, 'add rate', '2019-11-04 19:18:05', '2019-11-04 19:18:05'),
(314, 'comment', '2019-11-04 19:18:05', '2019-11-04 19:18:05'),
(325, 'تمت العمليه بنجاح', '2019-11-04 19:18:08', '2019-11-04 19:18:08'),
(340, 'clear', '2019-11-04 19:19:20', '2019-11-04 19:19:20'),
(341, 'store', '2019-11-04 19:19:20', '2019-11-04 19:19:20'),
(342, 'products found', '2019-11-04 19:19:20', '2019-11-04 19:19:20'),
(414, 'login', '2019-11-04 19:19:51', '2019-11-04 19:19:51'),
(464, 'create account', '2019-11-04 19:19:55', '2019-11-04 19:19:55'),
(470, 'register', '2019-11-04 19:19:56', '2019-11-04 19:19:56'),
(641, 'you can\'t send more than 2 messages in day', '2019-11-04 19:21:34', '2019-11-04 19:21:34'),
(816, 'email or password error', '2019-11-04 19:27:39', '2019-11-04 19:27:39'),
(915, 'data has been added', '2019-11-04 19:29:30', '2019-11-04 19:29:30'),
(917, 'تم حذف البيانات', '2019-11-04 19:29:35', '2019-11-04 19:29:35'),
(1001, 'cart is empty', '2019-11-04 19:29:54', '2019-11-04 19:29:54'),
(1122, 'you are not login please fill you data and create first', '2019-11-04 19:30:22', '2019-11-04 19:30:22'),
(1123, 'personal info', '2019-11-04 19:30:22', '2019-11-04 19:30:22'),
(1127, 'create account first or login', '2019-11-04 19:30:22', '2019-11-04 19:30:22'),
(1169, 'please login first', '2019-11-04 19:30:32', '2019-11-04 19:30:32'),
(1366, 'order has been sent to your email', '2019-11-04 19:31:10', '2019-11-04 19:31:10'),
(1688, 'p1', '2019-11-04 19:44:10', '2019-11-04 19:44:10');

-- --------------------------------------------------------

--
-- Table structure for table `mail_box`
--

CREATE TABLE `mail_box` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `seen` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `favourite` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mail_box`
--

INSERT INTO `mail_box` (`id`, `email`, `title`, `message`, `date`, `seen`, `favourite`, `created_at`, `updated_at`, `ip`) VALUES
(1, 'ali@doctoraak.com', 'Bubble Chart Example', 'gdfgdf', '2019-10-31', '1', '0', '2019-10-31 08:11:08', '2019-10-31 15:09:23', NULL),
(2, 'ahmed@gmail.com', 'thank you', 'this is my message for you', '2019-10-31', '1', '0', '2019-10-31 04:00:00', '2019-10-31 15:09:23', NULL),
(3, 'ali@doctoraak.com', 'title', 'tahnk you', '2019-11-02', '1', '0', '2019-11-02 17:31:53', '2019-11-02 17:32:07', '::1'),
(4, 'taha@gmail.com', 'order 1232324', 'i have a problem in my order 322324 the order ceated\nbut there is no message sent for me\nplease contact with us', '2019-11-04', '1', '0', '2019-11-04 16:31:11', '2019-11-04 16:41:56', '::1'),
(5, 'root@doctoraak.com', 'title', 'gdf', '2019-11-04', '1', '0', '2019-11-04 17:21:32', '2019-11-04 17:21:41', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_10_27_054323_create_category_table', 1),
(3, '2019_10_27_054421_create_sub_category_table', 1),
(4, '2019_10_27_054604_create_product_table', 1),
(5, '2019_10_27_055246_create_order_table', 1),
(6, '2019_10_27_055517_create_order_details_table', 1),
(7, '2019_10_27_055747_create_user_role_table', 1),
(8, '2019_10_27_055856_create_user_review_table', 1),
(9, '2019_10_27_060022_create_product_view_table', 1),
(10, '2019_10_27_060118_create_mail_box_table', 1),
(11, '2019_10_27_060304_create_slide_table', 1),
(12, '2019_10_27_060451_create_option_table', 1),
(13, '2019_10_27_060554_create_notification_table', 1),
(14, '2019_10_30_042450_create_bank_account_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `seen` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `option`
--

CREATE TABLE `option` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `option` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `option`
--

INSERT INTO `option` (`id`, `option`, `value`, `created_at`, `updated_at`) VALUES
(1, 'domain', 'admin@admin.com', NULL, '2019-10-31 10:44:30'),
(2, 'title', 'tsharky', NULL, NULL),
(3, 'theme', 'skin-dark-light', NULL, '2019-11-04 18:42:13'),
(4, 'phone', '011122255468', NULL, '2019-10-31 11:50:50'),
(5, 'about_ar', 'مجموعة التراث الشرقي للتجارة عن طريق الانترنت. متخصصون في بيع جميع البطاقات مسبقة الدفع مميزون في الأمان السرعة الشفافيه\r\n\r\nلشراء بطاقه يرجي التواصل واتساب 0580161054\r\n\r\nللاستفسار يرجى التواصل عن طريق مكالمه 0580161062', NULL, NULL),
(6, 'about_en', 'El Torath El Sharky Group for trade is specialized in selling all type of pre-paid cards online over the internet \r\n \r\n0580161062 send us now on whats app to get your card\r\n \r\n0580161054 For any enquiry please call us', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `seen` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `confirm` enum('0','1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_to_another_address` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `shipping_cost` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `date`, `seen`, `confirm`, `user_id`, `currency`, `created_at`, `updated_at`, `firstname`, `lastname`, `address1`, `address2`, `city`, `postal_code`, `state`, `country`, `shipping_to_another_address`, `shipping_cost`) VALUES
(1572848242, '2019-11-04', '0', '0', 10, 'ر.س', '2019-11-04 04:17:22', '2019-11-04 04:17:22', NULL, 'farag', 'ad', 'ad2', 'ct', '1234', 'state', 'SA', '1', 3),
(1572894854, '2019-11-04', '0', '0', 4, 'ر.س', '2019-11-04 17:14:14', '2019-11-04 17:14:14', 'ali', 'farag', 'ad', 'ad2', 'ct', '1234', 'state', 'SA', '0', 2),
(1572895868, '2019-11-04', '0', '0', 12, 'ر.س', '2019-11-04 17:31:08', '2019-11-04 17:31:08', 'ali', 'farag', 'ad', 'ad2', 'ct', '1234', 'state', 'SA', '0', 3),
(1572897955, '2019-11-04', '0', '0', 4, 'ر.س', '2019-11-04 18:05:55', '2019-11-04 18:05:55', 'ali', 'farag', 'ad', 'ad2', 'ct', '1234', 'state', 'SA', '0', 2);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `product_id`, `order_id`, `amount`, `price`, `created_at`, `updated_at`) VALUES
(1, 2, 1572848242, 3, 43.00, '2019-11-04 04:17:22', '2019-11-04 04:17:22'),
(2, 1, 1572848242, 1, 5.00, '2019-11-04 04:17:22', '2019-11-04 04:17:22'),
(3, 2, 1572894854, 1, 43.00, '2019-11-04 17:14:14', '2019-11-04 17:14:14'),
(4, 2, 1572895868, 1, 43.00, '2019-11-04 17:31:08', '2019-11-04 17:31:08'),
(5, 1, 1572895868, 1, 5.00, '2019-11-04 17:31:09', '2019-11-04 17:31:09'),
(6, 2, 1572897955, 1, 43.00, '2019-11-04 18:05:55', '2019-11-04 18:05:55');

-- --------------------------------------------------------

--
-- Table structure for table `order_shipping_address`
--

CREATE TABLE `order_shipping_address` (
  `id` int(11) NOT NULL,
  `firstname` varchar(191) DEFAULT NULL,
  `lastname` varchar(191) DEFAULT NULL,
  `address1` varchar(191) DEFAULT NULL,
  `address2` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `postal_code` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `state` varchar(191) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_shipping_address`
--

INSERT INTO `order_shipping_address` (`id`, `firstname`, `lastname`, `address1`, `address2`, `city`, `postal_code`, `country`, `state`, `created_at`, `updated_at`, `order_id`) VALUES
(1, 'ali', 'farag', 'ad', 'ad2', 'ct', '1234', 'SA', 'state', '2019-11-04 06:17:22', '2019-11-04 06:17:22', 1572848242);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_ar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `description_ar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_en` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` int(11) NOT NULL DEFAULT '0',
  `price_en` double(8,2) NOT NULL DEFAULT '0.00',
  `price_ar` double(8,2) NOT NULL DEFAULT '0.00',
  `transport_cost` double(8,2) NOT NULL DEFAULT '0.00',
  `in_home` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name_ar`, `name_en`, `photo`, `sub_category_id`, `category_id`, `description_ar`, `description_en`, `tags`, `amount`, `price_en`, `price_ar`, `transport_cost`, `in_home`, `active`, `created_at`, `updated_at`) VALUES
(1, 'fffffffffffffff', 'fsdfsd', '157252083419005.jpg', 1, 2, NULL, NULL, NULL, 545, 54.00, 5.00, 1.00, '1', '1', '2019-10-29 16:00:12', '2019-10-31 09:20:34'),
(2, 'ربيليبل', 'بليبل', '157254350231538.jpg', 1, 2, 'ليب', 'ليب', 'ليبل', 43, 43.00, 43.00, 2.00, '1', '1', '2019-10-31 15:38:22', '2019-10-31 15:38:22');

-- --------------------------------------------------------

--
-- Table structure for table `product_view`
--

CREATE TABLE `product_view` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_view`
--

INSERT INTO `product_view` (`id`, `ip`, `product`, `created_at`, `updated_at`) VALUES
(1, '::1', 2, '2019-11-01 15:15:23', '2019-11-01 15:15:23'),
(2, '::1', 1, '2019-11-01 15:17:53', '2019-11-01 15:17:53');

-- --------------------------------------------------------

--
-- Table structure for table `slide`
--

CREATE TABLE `slide` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title_ar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_en` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_ar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_en` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `slide`
--

INSERT INTO `slide` (`id`, `title_ar`, `title_en`, `description_ar`, `description_en`, `photo`, `active`, `created_at`, `updated_at`) VALUES
(1, 'fdgdf', 'gfdg', 'fgdf', 'gdf', '157237205264747.jpg', '1', '2019-10-29 16:00:52', '2019-10-29 16:00:52'),
(2, 'fdggfggggggggggggggggg', 'fdgffffffffffffffffffffff', 'dfghghghghghghghg', 'dfgdfg', '157252054167188.png', '1', '2019-10-29 16:00:59', '2019-10-31 09:15:41'),
(3, 'بسيب', 'title', 'sdfsd', 'fds', '157241628666551.png', '1', '2019-10-30 04:18:06', '2019-10-30 04:18:06'),
(4, 'بسيب', 'title', 'sdfsd', 'fds', '157251654252430.jpg', '1', '2019-10-31 08:09:02', '2019-10-31 08:09:02');

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_ar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`id`, `name_ar`, `name_en`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'fds', 'fsdf', 3, '2019-10-29 15:59:50', '2019-10-29 15:59:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'user.png',
  `role` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `description`, `phone`, `photo`, `role`, `active`, `created_at`, `updated_at`, `address`) VALUES
(1, 'ali', 'ali@gmail.com', 'ali', 'afldjs', '011233213', 'user.png', '0', '1', NULL, NULL, NULL),
(2, 'ahmed', 'ahmed@gmail.com', 'ali', 'afldjs', '011233213', 'user.png', '0', '1', NULL, NULL, NULL),
(3, 'dsfds', 'fd@admin.com', 'admin', 'dsfds', 'fds', '157251963689944.png', '1', '0', '2019-10-31 09:00:36', '2019-10-31 09:30:19', 'fdsfsd'),
(4, 'dsfsdf', 'admin@admin.com', 'admin', 'sdfds', 'fsd', '157252097736300.png', '0', '1', '2019-10-31 09:01:30', '2019-10-31 09:27:08', 'fsd'),
(8, 'ali farag mahmmed', 'ali@doctoraak.com', '12345', 'i\'m programmer , web developper', '01123904214', '157252178132348.jpg', '0', '1', '2019-10-31 09:36:21', '2019-10-31 09:48:49', 'eygpt, benisuef, nasr'),
(9, 'ali farag', 'ali_farag_mahmed@yahoo.com', '$2y$10$gSYP2memMmD.LYg86mLN/.d58UWdCDrEB4.EAwAYEiA9iHGegYWsq', NULL, NULL, 'user.png', '1', '1', '2019-11-03 18:26:14', '2019-11-03 18:26:15', NULL),
(10, 'ali farag', 'ali_farag@yahoo.com', '12345', NULL, '01123904214', '157289141423141.jpg', '1', '1', '2019-11-03 18:28:43', '2019-11-04 16:16:54', 'ali_farag@yahoo.com'),
(12, 'taha', 'taha@gmail.com', '$2y$10$picJPH5faRqmkggqBewHLuOzPEZYrRTmpcYvl/mwdCNSGmqV286q2', NULL, '0032334334`', 'user.png', '1', '1', '2019-11-04 16:29:39', '2019-11-04 16:29:39', 'benisuef');

-- --------------------------------------------------------

--
-- Table structure for table `user_review`
--

CREATE TABLE `user_review` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rate` enum('1','2','3','4','5') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_review`
--

INSERT INTO `user_review` (`id`, `product_id`, `user_id`, `rate`, `comment`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '3', 'thank you', NULL, NULL),
(2, 1, 1, '4', 'thank you', NULL, NULL),
(3, 1, 2, '5', 'thank you', NULL, NULL),
(4, 2, 10, '4', 'thank you', '2019-11-04 15:18:35', '2019-11-04 15:18:35'),
(5, 2, 12, '4', 'gdfgdf', '2019-11-04 17:31:53', '2019-11-04 17:31:53'),
(6, 2, 12, '3', 'fsdfs', '2019-11-04 17:32:46', '2019-11-04 17:32:46');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank_account`
--
ALTER TABLE `bank_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dictionary`
--
ALTER TABLE `dictionary`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `word` (`word`);

--
-- Indexes for table `mail_box`
--
ALTER TABLE `mail_box`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `option`
--
ALTER TABLE `option`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_shipping_address`
--
ALTER TABLE `order_shipping_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_view`
--
ALTER TABLE `product_view`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slide`
--
ALTER TABLE `slide`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_review`
--
ALTER TABLE `user_review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank_account`
--
ALTER TABLE `bank_account`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `dictionary`
--
ALTER TABLE `dictionary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1801;

--
-- AUTO_INCREMENT for table `mail_box`
--
ALTER TABLE `mail_box`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `option`
--
ALTER TABLE `option`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1572848246;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order_shipping_address`
--
ALTER TABLE `order_shipping_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_view`
--
ALTER TABLE `product_view`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `slide`
--
ALTER TABLE `slide`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_review`
--
ALTER TABLE `user_review`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
