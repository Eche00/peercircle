
# PeerCircle

PeerCircle is a consent-based social engagement coordination platform. It allows users to participate in timed **engagement sessions** where they support each other’s social media growth through manual follows and likes, ensuring a fair and transparent reciprocal environment.

---

## Overview

PeerCircle serves as:

- A coordination tool for social media engagement groups  
- A time-locked system to ensure fairness and prevent "leeching"  
- A manual verification hub for community-driven growth  

The platform prioritizes transparency, timed reveals, and organic interaction.

---

## Features

### User Experience

- **Session Discovery**  
  View active Instagram or TikTok engagement rounds.

- **Global Search**  
  Use a unique Session ID to find specific private or public groups.

- **Timed Deadlines**  
  Strict cut-off times for joining and submitting links.

- **Locked Reveals**  
  Handles are hidden until the countdown hits zero to ensure everyone contributes.

- **Progress Tracking**  
  Checklist UI to track which peers you have engaged with.

### Admin Panel

- **Session Creation**  
  Set platform, deadline, reveal time, and visibility (Public / Private).

- **Access Control**  
  Set optional passwords for private circles.

- **Monitor Participation**  
  Real-time counts of submissions and completions.

- **User Moderation**  
  Basic tools to manage session health and user status.

---

## 🗂️ Site Structure

```

app
├── Home (Public Feed + ID Search Bar)
├── Session Details
│   ├── Password Gate (For private or protected sessions)
│   ├── Rules Modal
│   ├── Submission Form
│   └── Reveal / Engagement List
├── User Dashboard (History of Joined / Created Sessions)
└── Admin Dashboard

````

---

## Core Feature: Time-Locked Reveal

The **Reveal mechanic** is the heart of PeerCircle. It prevents users from seeing other people’s handles until they have committed their own and the deadline has passed.

### User Flow

1. **Find**  
   Discover a public session on the home feed or enter a Session ID for a private one.

2. **Access**  
   Enter a password if the session is protected.

3. **Join**  
   Review rules and agree to participate.

4. **Submit**  
   Provide your handle/link before the deadline.

5. **Wait**  
   System locks all entries; no handles are visible to anyone.

6. **Reveal**  
   At the fixed time, the list unlocks for all participants simultaneously.

7. **Engage**  
   Users click “Open,” perform the action, and return to check the box.

---

## Data Structure

### Session Object Example

```json
{
  "sessions": [
    {
      "id": "pc_7721",
      "creatorId": "user_88",
      "type": "Instagram Follow",
      "visibility": "private",
      "password": "hashed_password",
      "deadline": "2026-03-10T18:00:00",
      "revealTime": "2026-03-10T18:05:00",
      "participants": [
        { "uid": "user_1", "handle": "@creative_mind", "completed": true }
      ]
    }
  ]
}
````

---

## Engagement Progress View

| Participant Handle | Action | Link | Status    |
| ------------------ | ------ | ---- | --------- |
| @travel_guru       | Follow | Open | Done      |
| @tech_daily        | Follow | Open | ☐ Pending |

---

## Important Safety & Fairness Notes

* **No Automation**
  Actions are performed manually by real users.

* **Anti-Leech**
  You cannot see the list without submitting your own handle.

* **ID-Locked**
  Private sessions do not appear in public lists; they require the exact ID.

* **Format Validation**
  System checks for valid URL / handle structures.

* **No Privacy Risk**
  Only the submitted handle is shared with the specific session group.

---

## Development Plan (10 Days)

### Day 1 – Product Definition & UX

* Define session types (Follow / Like) and visibility logic (Public / Private).
* Map out the **Password Gate → Submission → Lock → Reveal** state machine.

### Day 2 – Project Setup & Base Layout

* Next.js / TypeScript setup with Tailwind CSS.
* Core layout (Navbar, Footer, Mobile-first container).

### Day 3 – Session Listing & Search Flow

* Display active public sessions with countdowns.
* Implement Session ID search logic and “Join Session” rules modal.

### Day 4 – Password Gates & Handle Submission

* Build the password entry UI for protected sessions.
* Build submission form with input validation and state management.

### Day 5 – Time-Locked Reveal Logic

* Implement server-side / client-side time comparison.
* Security logic to hide participants until `revealTime` is met.

### Day 6 – Handle Cards & Engagement UI

* Create handle cards with “Open” and “Copy” functionality.
* Optimize for external link triggers to Instagram / TikTok.

### Day 7 – Manual Confirmation & Progress

* Checkbox system for engagement tracking.
* Dynamic progress bar (e.g., “15 / 50 Completed”).

### Day 8 – User History & Completion

* Build the User Dashboard for history and success badges.
* Lock sessions once a user marks all items as done.

### Day 9 – Admin / Session Creation Suite

* Create new engagement rounds with visibility toggles (Public vs Private).
* Set password requirements and platform reveal triggers.

### Day 10 – Testing & Deployment

* Edge case testing (Invalid passwords, late submissions).
* Deployment to Vercel.

---

## Tech Stack

* **Frontend:** Next.js / TypeScript
* **Styling:** Tailwind CSS
* **Backend:** Firebase (Firestore & Auth)
* **Deployment:** Vercel

