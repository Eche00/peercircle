# PeerCircle

**PeerCircle** is a consent-based social engagement coordination platform. It allows users to participate in timed "engagement sessions" where they support each other’s social media growth through manual follows and likes, ensuring a fair and transparent reciprocal environment.

---

## 📋 Overview
PeerCircle serves as:
* **A coordination tool** for social media engagement groups
* **A time-locked system** to ensure fairness and prevent "leeching"
* **A manual verification hub** for community-driven growth

The platform prioritizes transparency, timed reveals, and organic interaction.

---

## ✨ Features

### User Experience
* **Session Discovery**: View active Instagram or TikTok engagement rounds.
* **Global Search**: Use a unique Session ID to find specific private or public groups.
* **Timed Deadlines**: Strict cut-off times for joining and submitting links.
* **Locked Reveals**: Handles are hidden until the countdown hits zero to ensure everyone contributes.
* **Progress Tracking**: Checklist UI to track which peers you have engaged with. ⭐

### Admin/User (creator) Panel
* **Session Creation**: Set platform, deadline, reveal time, and Visibility (Public/Private).
* **Access Control**: Set optional passwords for private circles.
* **Monitor Participation**: Real-time counts of submissions and completions.
* **User Moderation**: Basic tools to manage session health and user status.

---

## 🗂️ Site Structure

```plaintext
app
 ├── Home (Public Feed + ID Search Bar)
 ├── Session Details
 │    ├── Password Gate (For private or protected sessions)
 │    ├── Rules Modal
 │    ├── Submission Form
 │    └── Reveal/Engagement List
 ├── User Dashboard (History of Joined/Created Sessions)
 └── Admin Dashboard
