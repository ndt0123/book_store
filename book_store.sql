-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2020 at 05:49 PM
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
(2, 2, 'Nhà giả kim', 60000, 90, 'Tiểu thuyết', '', 965923824, 'Thái Bình', 'Sách cực hay và ý nghĩa cho anh em thư giãn ngày nghỉ dịch nha', '2020-05-07 23:18:39', 'Đang bán'),
(3, 1, 'Nhà giả kim', 50000, 90, 'Tiểu thuyết', '', 337941869, 'Thái Bình', 'Một cuốn sách cực kỳ ý nghĩa', '2020-05-19 11:04:10', 'Đang bán'),
(4, 2, 'Cha giàu cha nghèo', 40000, 90, 'Kỹ năng sống', '', 123456789, 'Quận Nam Từ Liêm, Hà Nội', 'Sách hay', '2020-05-07 23:11:18', 'Đang bán');

-- --------------------------------------------------------

--
-- Table structure for table `books_watching`
--

CREATE TABLE `books_watching` (
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books_watching`
--

INSERT INTO `books_watching` (`book_id`, `user_id`) VALUES
(1, 3),
(2, 3),
(3, 2);

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
(4, 2, '/images/books/upload_5aec3230745b02984a306793b0e4be03.jpg'),
(5, 3, '/images/books/upload_99a4b493d02880b58bf68285d172c063.jpg'),
(6, 3, '/images/books/upload_3e279da455d6e47153e31933dc2f2d95.jpg'),
(7, 4, '/images/books/upload_7f1c10be8af64d4b4cebd76b0a03cd5f.jpg'),
(8, 4, '/images/books/upload_4fdb4ea6d24bf5589914432c21036501.jpg'),
(9, 4, '/images/books/upload_1530b353d9cfaa642823229a209492fd.jpg');

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

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `book_id`, `user_id`, `content`, `time_update`) VALUES
(1, 4, 1, 'Sách bạn mua lâu chưa vậy?', '2020-05-15 12:19:28'),
(2, 4, 1, 'Sách hay không bạn?', '2020-05-15 16:22:02'),
(3, 4, 1, 'Sách thú vị?', '2020-05-15 16:28:29'),
(4, 2, 1, 'Sách còn bán không bạn ơi?', '2020-05-15 16:30:04'),
(5, 2, 1, 'Sách hay không bạn', '2020-05-15 16:38:40'),
(6, 2, 1, 'Bạn mua sách ở đâu vậy ạ?', '2020-05-15 16:40:41'),
(7, 3, 1, 'Sách hay k bạn', '2020-05-19 10:58:07');

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

--
-- Dumping data for table `comment_reply`
--

INSERT INTO `comment_reply` (`comment_reply_id`, `comment_id`, `user_id`, `content`, `time_update`) VALUES
(1, 4, 1, 'Còn bạn nha', '2020-05-15 17:02:13'),
(2, 5, 1, 'Hay lắm bạn ơi!', '2020-05-15 17:05:45'),
(3, 6, 1, 'Mình mua bên nhà sách trí tuệ', '2020-05-15 17:04:42'),
(4, 1, 2, 'Mình mua cũng được vài năm rồi. Nhưng giữ cẩn thận nên vẫn mới lắm. Bạn yên tâm', '2020-05-15 17:18:57'),
(5, 1, 1, 'Nhưng sao mình thấy hình ảnh sách cũ quá', '2020-05-15 17:19:36'),
(6, 1, 2, 'Sách', '2020-05-19 10:51:40'),
(7, 7, 1, 'Sách hay', '2020-05-19 10:58:15');

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `conversation_id` int(11) NOT NULL,
  `user_id_1` int(11) NOT NULL,
  `user_id_2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`conversation_id`, `user_id_1`, `user_id_2`) VALUES
(1, 2, 1),
(2, 2, 3);

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
(3, 2),
(1, 3),
(1, 4),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `message_id` int(11) NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `sending_id` int(11) NOT NULL,
  `receiving_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `type_of_message` varchar(20) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`message_id`, `conversation_id`, `sending_id`, `receiving_id`, `content`, `type_of_message`, `time`) VALUES
(1, 1, 1, 2, 'Chào bạn!!', 'text', '2020-05-15 22:53:54'),
(2, 1, 2, 1, 'Chào!!!', 'text', '2020-05-15 22:54:01'),
(3, 2, 2, 3, 'Hi!!!', 'text', '2020-05-15 23:04:00'),
(4, 2, 3, 2, 'Hi there!!', 'text', '2020-05-15 23:05:56'),
(5, 1, 2, 1, 'Có chuyện gì không bạn?', 'text', '2020-05-21 00:14:06'),
(6, 2, 3, 2, 'What can i help you?', 'text', '2020-05-25 15:26:36'),
(7, 2, 2, 3, 'Show me your talent!', 'text', '2020-05-25 15:28:25'),
(8, 2, 2, 3, 'So i can help you achive success????', 'text', '2020-05-25 15:29:02'),
(9, 2, 3, 2, 'Ok', 'text', '2020-05-25 15:31:24'),
(10, 2, 3, 2, 'But I don’t  have any talent', 'text', '2020-05-25 15:31:35'),
(11, 2, 2, 3, 'Don’t be shy!', 'text', '2020-05-25 15:32:18'),
(12, 2, 3, 2, 'No', 'text', '2020-05-25 15:32:28'),
(13, 2, 2, 3, 'I know you are very good at speaking english', 'text', '2020-05-25 15:32:52'),
(14, 2, 2, 3, 'Hi', 'text', '2020-05-25 15:33:09'),
(15, 2, 3, 2, 'I’m not', 'text', '2020-05-25 15:33:49'),
(16, 2, 2, 3, 'Yes you are', 'text', '2020-05-25 15:34:19'),
(17, 2, 3, 2, 'Sorry', 'text', '2020-05-25 15:34:45');

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
(1, 'Nguyễn Duy Tâm', '/images/avatars/upload_3bfa29f0969b8e5c02c0fa957593e1d1.jpg', 'Doanh nghiệp', '0332726752', 'Ndt', 'ndt'),
(2, 'Nguyễn Thị Duyên', '/images/avatars/upload_f41995d6257eff4bb0859e8892c1e046.jpg', 'Cá nhân', '0985243180', 'Ndt17021009', 'ndt'),
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
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`conversation_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
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
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `book_images`
--
ALTER TABLE `book_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `comment_reply`
--
ALTER TABLE `comment_reply`
  MODIFY `comment_reply_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `conversation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
