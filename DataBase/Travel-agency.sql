-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 11, 2022 at 11:28 AM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Travel-agency`
--
CREATE DATABASE IF NOT EXISTS `Travel-agency` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `Travel-agency`;

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `RoleName` varchar(11) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Roles`
--

INSERT INTO `Roles` (`RoleName`, `roleId`) VALUES
('Admin', 1),
('User', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `userName` varchar(35) NOT NULL,
  `password` varchar(128) NOT NULL,
  `roleId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `userName`, `password`, `roleId`) VALUES
(1, 'Ben', 'Spector', 'Beniyey', '405f5ff1ffd8e73d95c24c6e04ed9507d1e2ed65864920b04e149c9d443883495e8c95ccacc4493546a25b89a612d1d811653692003d4c2c0049d749dbe76777', 1),
(2, 'Maayan', 'Vigder', 'Vigder1234', '405f5ff1ffd8e73d95c24c6e04ed9507d1e2ed65864920b04e149c9d443883495e8c95ccacc4493546a25b89a612d1d811653692003d4c2c0049d749dbe76777', 2),
(6, 'limor', 'vigder', 'limor1234', '405f5ff1ffd8e73d95c24c6e04ed9507d1e2ed65864920b04e149c9d443883495e8c95ccacc4493546a25b89a612d1d811653692003d4c2c0049d749dbe76777', 2),
(7, 'Naama', 'Sason', 'sason1234', '405f5ff1ffd8e73d95c24c6e04ed9507d1e2ed65864920b04e149c9d443883495e8c95ccacc4493546a25b89a612d1d811653692003d4c2c0049d749dbe76777', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Vacations`
--

CREATE TABLE `Vacations` (
  `VacationId` int(11) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `Destination` varchar(50) NOT NULL,
  `Departure` datetime NOT NULL,
  `DepartureBack` datetime NOT NULL,
  `Price` int(11) NOT NULL,
  `ImageName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Vacations`
--

INSERT INTO `Vacations` (`VacationId`, `Description`, `Destination`, `Departure`, `DepartureBack`, `Price`, `ImageName`) VALUES
(1, 'Immerse yourself in the natural beauty of the Merzouga desert on this two-day small-group camel-trekking tour. Enjoy a delicious dinner at camp.', 'Flatrock', '2022-07-01 00:00:00', '2022-07-07 00:00:00', 1000, '99e37a25-fcf0-4159-b6af-fe7c39478f04.jpg'),
(2, 'Immerse yourself in the natural beauty of the Merzouga desert on this two-day small-group camel-trekking tour. Enjoy a delicious dinner at camp.', 'merzouga', '2022-07-01 00:00:00', '2022-07-07 00:00:00', 3020, '3dafcdaf-1ab5-40bc-bb76-1b3f45119ae2.jpg'),
(3, 'Immerse yourself in the natural beauty of the Merzouga desert on this two-day small-group camel-trekking tour. Enjoy a delicious dinner at camp.', 'Paphos city', '2022-07-05 03:03:00', '2022-07-22 00:00:00', 500, '3527e39b-06bb-4007-97de-462f652165e9.jpg'),
(4, 'Immerse yourself in the natural beauty of the Merzouga desert on this two-day small-group camel-trekking tour. Enjoy a delicious dinner at camp.', 'wadi musa', '2022-07-11 04:04:00', '2022-07-28 03:04:00', 2000, '1d75766a-047a-40b6-b1a5-fe88bb4f8283.jpg'),
(5, 'Immerse yourself in the natural beauty of the Merzouga desert on this two-day small-group camel-trekking tour. Enjoy a delicious dinner at camp.', 'tongatapu', '2022-07-04 11:01:00', '2022-07-21 19:01:00', 4000, '3c22bc79-fc16-4da2-9204-b93484409b51.jpg'),
(6, 'Immerse yourself in the natural beauty of the Merzouga desert on this two-day small-group camel-trekking tour. Enjoy a delicious dinner at camp.', 'riva garda', '2022-07-04 00:00:00', '2022-07-21 00:00:00', 2500, '996f37a6-f0c7-4bc2-a7f1-4f541189d292.jpg'),
(7, 'Immerse yourself in the natural beauty of the Merzouga desert on this two-day small-group camel-trekking tour. Enjoy a delicious dinner at camp.', 'krung thep', '2022-07-04 00:00:00', '2022-08-06 00:00:00', 550, 'f2df0949-fe61-42fb-8af3-80c93eb729fe.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `VacationUsers`
--

CREATE TABLE `VacationUsers` (
  `UserId` int(11) NOT NULL,
  `VacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `VacationUsers`
--

INSERT INTO `VacationUsers` (`UserId`, `VacationId`) VALUES
(2, 1),
(6, 1),
(2, 2),
(2, 5),
(6, 5),
(2, 6),
(2, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`roleId`),
  ADD KEY `roleName` (`RoleName`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `role` (`roleId`);

--
-- Indexes for table `Vacations`
--
ALTER TABLE `Vacations`
  ADD PRIMARY KEY (`VacationId`);

--
-- Indexes for table `VacationUsers`
--
ALTER TABLE `VacationUsers`
  ADD PRIMARY KEY (`UserId`,`VacationId`),
  ADD KEY `VacationId` (`VacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Vacations`
--
ALTER TABLE `Vacations`
  MODIFY `VacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`roleId`);

--
-- Constraints for table `VacationUsers`
--
ALTER TABLE `VacationUsers`
  ADD CONSTRAINT `vacationusers_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vacationusers_ibfk_2` FOREIGN KEY (`VacationId`) REFERENCES `Vacations` (`VacationId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
