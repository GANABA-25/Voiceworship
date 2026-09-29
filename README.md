# VoiceWorship

VoiceWorship is a modern, voice-controlled church presentation and projection system designed to make live worship services faster, simpler, and more interactive.

The platform is inspired by traditional church presentation software, but introduces a voice-first approach that allows Scripture and presentation content to be accessed through natural voice commands.

For example, during a sermon, a pastor can say:

> "Open Genesis chapter 1 verse 1"

VoiceWorship is designed to recognize the Scripture reference, locate the corresponding passage, and make it available for projection.

## ✨ Features

### 🎙️ Voice-Controlled Scripture Projection

VoiceWorship is designed to recognize spoken Bible references such as:

- "Genesis chapter 1 verse 1"
- "John 3:16"
- "Psalm 23"
- "Romans chapter 8 verse 28"

The system converts the spoken command into a Bible reference and prepares the corresponding content for projection.

### 📖 Bible Presentation

Browse and search Bible books, chapters, and verses from the application.

Users will be able to:

- Search Scripture
- Select books and chapters
- Select individual verses
- Preview verses
- Add verses to a presentation
- Project selected Scripture

### 🎵 Worship Lyrics

Manage worship songs and display lyrics during church services.

Songs can be organized into:

- Verses
- Choruses
- Bridges
- Other sections

### 🖥️ Live Projection

A dedicated projection interface allows church operators to control what is currently displayed on the projector or external screen.

Operators can:

- Preview content
- Go live
- Move between slides
- Clear the screen
- Display a black screen
- Control upcoming content

### 🎞️ Media Management

Manage presentation media such as:

- Images
- Videos
- Backgrounds
- Other presentation assets

### 📋 Presentation Queue

Prepare upcoming content before displaying it.

A service can contain:

- Bible verses
- Worship lyrics
- Announcements
- Images
- Videos
- Presentation slides

### 📡 Real-Time Control

The application is designed around real-time communication between the operator interface and the projection display.

Changes made by the operator can be reflected immediately on the live output.

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- PostgreSQL

### Authentication

- JSON Web Tokens
- bcryptjs
- Express Validator

### Planned Technologies

- WebSockets / Socket.IO
- Speech-to-Text
- Voice command processing
- Bible reference parsing
- Electron for desktop distribution

## 🏗️ Architecture

```text
                    VoiceWorship
                         │
          ┌──────────────┴──────────────┐
          │                             │
      Frontend                       Backend
      Next.js                        Node.js
          │                             │
          │                     ┌───────┴───────┐
          │                     │               │
          │                  API Layer     Voice Processing
          │                     │               │
          │                     └───────┬───────┘
          │                             │
          └──────────────┬──────────────┘
                         │
                    PostgreSQL
                         │
                  Presentation Data
                         │
                         ▼
                 Projection Display
```
