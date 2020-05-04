-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2020 at 07:10 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `price` int(20) NOT NULL,
  `status` int(3) NOT NULL,
  `type_of_book` varchar(100) NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `phone_number` int(10) NOT NULL,
  `position` varchar(255) NOT NULL,
  `describle` text NOT NULL,
  `time_update` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `selling_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `user_id`, `title`, `price`, `status`, `type_of_book`, `author`, `phone_number`, `position`, `describle`, `time_update`, `selling_status`) VALUES
(1, 1, 'Tuổi trẻ đáng giá bao nhiêu', 50000, 100, 'Kỹ năng sống', 'Nguyen', 965923824, 'Quận Nam Từ Liêm, Hà Nội', 'Cuốn sách cực kỳ ý nghĩa và cực hay của một nhà văn trẻ mà bẹn nên đọc', '2020-05-04 23:01:02', 'Đang bán'),
(2, 2, 'Nhà giả kim', 40000, 90, 'Tiểu thuyết', '', 965923824, 'Thái Bình', 'Sách cực hay và ý nghĩa cho anh em thư giãn ngày nghỉ dịch.', '2020-05-04 23:11:17', 'Đang bán');

-- --------------------------------------------------------

--
-- Table structure for table `books_watching`
--

CREATE TABLE `books_watching` (
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `book_images`
--

CREATE TABLE `book_images` (
  `image_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `image_path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book_images`
--

INSERT INTO `book_images` (`image_id`, `book_id`, `image_path`) VALUES
(1, 1, '/images/books/upload_c5e6655ab28b27c0804612dc39a2cddc.jpg'),
(2, 1, '/images/books/upload_78a2c2737da2adfd3e830c8b0696f450.jpg'),
(3, 2, '/images/books/upload_c2c16a6e8d3befe974877d998adc0b72.jpg'),
(4, 2, '/images/books/upload_5aec3230745b02984a306793b0e4be03.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `time_update` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comment_reply`
--

CREATE TABLE `comment_reply` (
  `comment_reply_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `time_update` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `follower_id` int(11) NOT NULL,
  `followed_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`follower_id`, `followed_id`) VALUES
(1, 2),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sending_id` int(11) NOT NULL,
  `receiving_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `time_update` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `link_screen` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` text NOT NULL,
  `type_of_user` varchar(255) NOT NULL,
  `phone_number` text DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `avatar`, `type_of_user`, `phone_number`, `username`, `password`) VALUES
(1, 'Nguyễn Duy Tín', '/images/avatars/upload_7a36820800860aba327c746e9d9cb604.jpg', 'Cá nhân', '332726752', 'Ndt', 'ndt'),
(2, 'Ndt17021009', '/images/avatars/upload_f41995d6257eff4bb0859e8892c1e046.jpg', 'Cá nhân', '', 'Ndt17021009', 'ndt'),
(3, 'Landscape', '/images/avatars/upload_f3ef55375f0f9773c67ed1d565a286a0.jpg', 'Doanh nghiệp', '965923824', '17021009', 'ndt');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `book_images`
--
ALTER TABLE `book_images`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `comment_reply`
--
ALTER TABLE `comment_reply`
  ADD PRIMARY KEY (`comment_reply_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `book_images`
--
ALTER TABLE `book_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comment_reply`
--
ALTER TABLE `comment_reply`
  MODIFY `comment_reply_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
