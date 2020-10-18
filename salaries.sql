-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 10, 2019 at 12:19 PM
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
-- Database: `salaries`
--

-- --------------------------------------------------------

--
-- Table structure for table `bonus`
--

CREATE TABLE `bonus` (
  `id` int(11) NOT NULL,
  `c1` double(8,2) NOT NULL,
  `c2` double(8,2) NOT NULL,
  `c3` double(8,2) NOT NULL,
  `c4` double(8,2) NOT NULL,
  `c5` double(8,2) NOT NULL,
  `c6` double(8,2) NOT NULL,
  `c7` double(8,2) NOT NULL,
  `c8` double(8,2) NOT NULL,
  `c9` double(8,2) NOT NULL,
  `c10` double(8,2) NOT NULL,
  `c11` double(8,2) NOT NULL,
  `c12` double(8,2) NOT NULL,
  `c13` double(8,2) NOT NULL,
  `c14` double(8,2) NOT NULL,
  `c15` double(8,2) NOT NULL,
  `c16` double(8,2) NOT NULL,
  `c17` double(8,2) NOT NULL,
  `c18` double(8,2) NOT NULL,
  `c19` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bonus`
--

INSERT INTO `bonus` (`id`, `c1`, `c2`, `c3`, `c4`, `c5`, `c6`, `c7`, `c8`, `c9`, `c10`, `c11`, `c12`, `c13`, `c14`, `c15`, `c16`, `c17`, `c18`, `c19`, `created_at`, `updated_at`) VALUES
(2, 5.00, 5.00, 5.00, 5.00, 5.00, 5.00, 5.00, 5.00, 5.00, 45.00, 3.50, 1.20, 4.70, 40.30, 2000.00, 2040.30, 6.50, 2.40, 8.90, '2019-08-09 09:08:31', '2019-08-09 09:08:31'),
(1, 5.00, 5.00, 5.00, 5.00, 5.00, 5.00, 5.00, 5.00, 5.00, 45.00, 3.50, 1.20, 4.70, 40.30, 2000.00, 2040.30, 6.50, 2.40, 8.90, '2019-08-09 09:08:32', '2019-08-09 09:08:32'),
(4, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 90.00, 7.00, 2.40, 9.40, 80.60, 2000.00, 2080.60, 13.00, 4.80, 17.80, '2019-08-10 08:00:10', '2019-08-10 08:00:10'),
(3, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 90.00, 7.00, 2.40, 9.40, 80.60, 2000.00, 2080.60, 13.00, 4.80, 17.80, '2019-08-10 08:00:11', '2019-08-10 08:00:11');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `holiday_start` date NOT NULL,
  `holiday_end` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `start`, `end`, `holiday_start`, `holiday_end`, `created_at`, `updated_at`) VALUES
(1, 'teacher', '9:00 AM', '2:00 PM', '2019-01-01', '2019-08-30', '2019-08-09 09:03:24', '2019-08-09 09:03:24'),
(2, 'workers', '12:00 AM', '2:00 PM', '2019-08-01', '2019-08-29', '2019-08-10 07:56:11', '2019-08-10 07:56:11'),
(3, 'manager', '12:00 PM', '12:00 PM', '2019-08-07', '2019-08-30', '2019-08-10 07:58:18', '2019-08-10 07:58:18');

-- --------------------------------------------------------

--
-- Table structure for table `daily`
--

CREATE TABLE `daily` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `emp_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `in_time` time NOT NULL,
  `out_time` time NOT NULL,
  `type` enum('1','2','3','4') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `daily`
--

INSERT INTO `daily` (`id`, `emp_id`, `date`, `in_time`, `out_time`, `type`, `created_at`, `updated_at`) VALUES
(1, 1, '2019-01-01', '09:00:00', '02:00:00', NULL, '2019-08-09 09:09:50', '2019-08-09 09:09:50'),
(2, 1, '2019-01-02', '09:00:00', '02:00:00', NULL, '2019-08-09 09:09:50', '2019-08-09 09:09:50'),
(3, 1, '2019-01-03', '09:00:00', '02:00:00', NULL, '2019-08-09 09:09:51', '2019-08-09 09:09:51'),
(4, 1, '2019-01-04', '09:00:00', '02:00:00', NULL, '2019-08-09 09:09:52', '2019-08-09 09:09:52'),
(5, 1, '2019-01-05', '09:00:00', '02:00:00', NULL, '2019-08-09 09:09:52', '2019-08-09 09:09:52'),
(6, 1, '2019-01-06', '09:10:00', '02:00:00', NULL, '2019-08-09 09:09:53', '2019-08-09 09:09:53'),
(7, 1, '2019-01-07', '09:20:00', '02:00:00', NULL, '2019-08-09 09:09:54', '2019-08-09 09:09:54'),
(8, 1, '2019-01-08', '09:15:00', '02:00:00', NULL, '2019-08-09 09:09:55', '2019-08-09 09:09:55'),
(9, 1, '2019-01-09', '09:01:00', '02:00:00', NULL, '2019-08-09 09:09:56', '2019-08-09 09:09:56'),
(10, 1, '2019-01-10', '09:04:00', '02:00:00', NULL, '2019-08-09 09:09:56', '2019-08-09 09:09:56'),
(11, 2, '2019-01-01', '09:00:00', '02:00:00', NULL, '2019-08-09 09:09:57', '2019-08-09 09:09:57'),
(12, 2, '2019-01-02', '09:00:00', '02:00:00', NULL, '2019-08-09 09:09:58', '2019-08-09 09:09:58'),
(13, 2, '2019-01-03', '09:00:00', '02:00:00', NULL, '2019-08-09 09:09:59', '2019-08-09 09:09:59'),
(14, 2, '2019-01-04', '09:00:00', '02:00:00', NULL, '2019-08-09 09:10:00', '2019-08-09 09:10:00'),
(15, 2, '2019-01-05', '09:00:00', '02:00:00', NULL, '2019-08-09 09:10:01', '2019-08-09 09:10:01'),
(16, 2, '2019-01-06', '09:10:00', '02:00:00', NULL, '2019-08-09 09:10:02', '2019-08-09 09:10:02'),
(17, 2, '2019-01-07', '09:02:00', '02:00:00', NULL, '2019-08-09 09:10:03', '2019-08-09 09:10:03'),
(18, 2, '2019-01-08', '09:15:00', '02:00:00', NULL, '2019-08-09 09:10:04', '2019-08-09 09:10:04'),
(19, 2, '2019-01-09', '09:00:00', '02:00:00', NULL, '2019-08-09 09:10:05', '2019-08-09 09:10:05'),
(20, 2, '2019-01-10', '09:00:00', '02:00:00', NULL, '2019-08-09 09:10:05', '2019-08-09 09:10:05'),
(21, 1, '2019-01-01', '09:00:00', '02:00:00', NULL, '2019-08-10 08:00:59', '2019-08-10 08:00:59'),
(22, 1, '2019-01-02', '09:00:00', '02:00:00', NULL, '2019-08-10 08:01:00', '2019-08-10 08:01:00'),
(23, 1, '2019-01-03', '09:00:00', '02:00:00', NULL, '2019-08-10 08:01:01', '2019-08-10 08:01:01'),
(24, 1, '2019-01-04', '09:00:00', '02:00:00', NULL, '2019-08-10 08:01:02', '2019-08-10 08:01:02'),
(25, 1, '2019-01-05', '09:00:00', '02:00:00', NULL, '2019-08-10 08:01:04', '2019-08-10 08:01:04');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'math', '2019-08-09 09:03:41', '2019-08-09 09:03:41'),
(2, 'sport', '2019-08-10 07:56:23', '2019-08-10 07:56:23'),
(3, 'depart', '2019-08-10 07:58:27', '2019-08-10 07:58:27');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bankNumber` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bankBranch` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `holidays` int(11) NOT NULL,
  `learning` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'image',
  `cardImage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cv` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `criminalPaper` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `salary` double(8,2) NOT NULL DEFAULT '0.00',
  `category` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `department` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `bankNumber`, `phone`, `bankName`, `bankBranch`, `holidays`, `learning`, `image`, `cardImage`, `cv`, `criminalPaper`, `startDate`, `endDate`, `salary`, `category`, `type`, `department`, `created_at`, `updated_at`) VALUES
(1, 'emp1', '43432', NULL, 'cairo', 'cairo', 8, NULL, '1565348805', NULL, NULL, NULL, '2019-08-01', '2019-08-30', 2040.30, 1, 1, 1, '2019-08-09 09:06:45', '2019-08-09 09:56:04'),
(2, 'emp2', '2132', NULL, 'alex', 'alex', 15, NULL, '1565348806', NULL, NULL, NULL, '2019-08-01', '2019-08-30', 2040.30, 1, 1, 1, '2019-08-09 09:06:46', '2019-08-09 09:08:31'),
(3, 'emp3', '432423', NULL, 'alex', 'alex', 4, NULL, '1565431165', NULL, NULL, NULL, '2019-08-01', '2019-08-28', 2080.60, 1, 1, 1, '2019-08-10 07:59:25', '2019-08-10 08:00:11'),
(4, 'emp4', '4324', NULL, 'cairo', 'cairo', 5, NULL, '1565431166', NULL, NULL, NULL, '2019-08-01', '2019-08-19', 2080.60, 1, 1, 1, '2019-08-10 07:59:26', '2019-08-10 08:00:09');

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `from` date NOT NULL,
  `to` date NOT NULL,
  `emp` int(11) NOT NULL,
  `holiday` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_07_05_160216_create_employee_table', 1),
(3, '2019_07_05_165751_create_category_table', 1),
(4, '2019_07_14_112713_create_department_table', 1),
(5, '2019_07_14_113303_create_bonus_table', 1),
(6, '2019_07_14_113311_create_nonbonus_table', 1),
(7, '2019_08_02_154250_create_table_daily', 1),
(8, '2019_08_09_105540_create_holidays_table', 1),
(9, '2019_08_09_130431_create_option_table', 2),
(10, '2019_08_10_085105_create_table_privilage', 3);

-- --------------------------------------------------------

--
-- Table structure for table `nonbonus`
--

CREATE TABLE `nonbonus` (
  `id` int(11) NOT NULL,
  `c1` double(8,2) NOT NULL,
  `c2` double(8,2) NOT NULL,
  `c3` double(8,2) NOT NULL,
  `c4` double(8,2) NOT NULL,
  `c5` double(8,2) NOT NULL,
  `c6` double(8,2) NOT NULL,
  `c7` double(8,2) NOT NULL,
  `c8` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `option`
--

CREATE TABLE `option` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `option`
--

INSERT INTO `option` (`id`, `name`, `value`, `description`, `created_at`, `updated_at`) VALUES
(1, 'company', 'اسم المؤسسه', '', NULL, '2019-08-09 12:36:18'),
(2, 'logo', 'logo', '', NULL, NULL),
(3, 'direction', '1', '', NULL, '2019-08-09 13:26:14');

-- --------------------------------------------------------

--
-- Table structure for table `table_privilage`
--

CREATE TABLE `table_privilage` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `table_privilage`
--

INSERT INTO `table_privilage` (`id`, `user`, `role`, `value`, `created_at`, `updated_at`) VALUES
(4, 1, 2, 1, '2019-08-10 07:24:38', '2019-08-10 07:25:48'),
(5, 1, 3, 1, '2019-08-10 07:25:54', '2019-08-10 07:25:54'),
(6, 1, 7, 1, '2019-08-10 07:48:31', '2019-08-10 07:48:31'),
(7, 1, 1, 1, '2019-08-10 07:52:55', '2019-08-10 07:52:55'),
(8, 1, 4, 1, '2019-08-10 07:52:56', '2019-08-10 07:52:56'),
(9, 1, 6, 1, '2019-08-10 07:52:56', '2019-08-10 07:52:56'),
(10, 1, 8, 1, '2019-08-10 07:52:57', '2019-08-10 07:52:57'),
(11, 1, 5, 1, '2019-08-10 07:52:59', '2019-08-10 07:52:59'),
(12, 2, 2, 1, '2019-08-10 08:02:15', '2019-08-10 08:02:15'),
(13, 2, 7, 0, '2019-08-10 08:02:16', '2019-08-10 08:02:20'),
(14, 2, 1, 1, '2019-08-10 08:02:21', '2019-08-10 08:02:21');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `image`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin', 'admin', NULL, '2019-08-09 08:58:55', '2019-08-09 08:58:55'),
(2, 'root', 'root', 'root', NULL, '2019-08-10 08:02:08', '2019-08-10 08:02:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `daily`
--
ALTER TABLE `daily`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `option`
--
ALTER TABLE `option`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `table_privilage`
--
ALTER TABLE `table_privilage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `daily`
--
ALTER TABLE `daily`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `option`
--
ALTER TABLE `option`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `table_privilage`
--
ALTER TABLE `table_privilage`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
