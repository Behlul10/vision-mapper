# Agile Sprint Log 1 (Iteration Report)
**Procet Title:** Vision Mapper

**Sprint #:** 1

**Date Range:** 08/26/2025 - 08/31/2025

**Prepared by:**  Behlul Vardal

---

## Sprint Stage Checklist
Check only the stages you actively worked on this Sprint:

- [x] Speculate / Plan
- [x] Research
- [x] Design
- [ ] Make / Produce
- [ ] Publish / Present
- [ ] Assess

---
## 0. Review of Previous Sprint (CORE)
This is the first sprint, so there is no previous sprint.

---
## 1. Speculate / Plan (CORE)
- **Current Sprint Goal (based on last assessment):**
  - Start Git repo
  - Research more about MediaPipe Pipeline
- **Key Tasks (checklist):**
  - [ ] MedaPipe Pipelines research
  - [ ] Git Repo Setup
	- [ ] Documents Folder
	- [ ] Journal Folder
	- [ ] Demos
- **Planned Deliverables:**
  (Prototype, documentation, test, presentation, etc.)
  - MediaPipe Pipeline prototype outline

- **Research Needed:**
  (What questions must be answered or what knowledge must be gathered for this Sprint to succeed?)
  - How does MediaPipe work?
    - Why isn't it as simple as a function call?

---

## 2q. Active Areas (Complete only those you checked above)

### Research
- **Questions Investigated (from Speculate):**
  - How does MediaPipe work?
    - Why isn't it as simple as a function call?

- **Sources Consulted (Zotero, articles, tutorials, AI, etc.): GPT-4.1**
- **Findings / Insights:**
Since MediaPipe is meant to process images in real-time it would be inefficient to do a simple function call. It is a pipeline where you instantiate solutions and pass frames through it, where it is constantly generating landmarks.
### Design
- **New Diagrams / Documentation:**
Since I figured out the confusion I had with MediaPipe, I designed a new demo outline to build a demo that further explores the pipeline.The demo will act as a proof of concept, and if successful I will move onto applying the demo to a 3D model using three.js.
- **Key Design Decisions:**
MediaPipe Pipeline Test Demo will be kept simple. I will print the landmark data being processed in real-time to the terminal.
- **Success Criteria:**
---

## 3. Assess (CORE)
- **Successes This Sprint:**
  - Figured out the slump I had with MediaPipe
  - Started Designing my new demo which is part of the Proof of Concept
- **Current Bottlenecks (skills, tools, time, clarity, etc.):**
  - Current Bottlneck is a bit of skill gap in Web. I havent really used Javascript much or Typescript. I even forgot how to attach my JS Script to my html page.
- **Feedback Received (peer/faculty/AI):**
I have used GPT 4.1 for inital speculation and search about MediaPipe Pipeline. You can see my message history with GPT-4.1 here [sprint-1-GPT-4.1-pipelines](./journal-references/sprint-1-GPT-4.1-pipelines.md)
- **Adjustments for Next Sprint:**
  (How this assessment will guide the next Speculation/Plan.)

---

## 4. Reflection (Optional, Encouraged)
- **Personal / Team Reflection:**
- **AI Use (if applicable):**
  (Document any AI-assisted contributions and how you evaluated them.)
I have used GPT 4.1 for search on MediaPipe. Specifically asking how pipelines work. Google has limited information on the MediaPipe Library, so Idecided to ask AI on how it works instead. I didn't really know where to look for, or what my problem was to begin with, so a conversation with gpt-4.1 helped me identify it. This exposed a big stump in my development process. Though I've identified the problem, I need to dig deeper in researching piplines, I got the basic idea of instantiating.
---

**Sign-off:**
Behlul Vardal 09/01/2025
