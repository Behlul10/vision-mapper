# Agile Sprint Report Template (Extended)

**Week #:** 3
**Name:** Behlul Vardal
**Repository Link:** https://github.com/Behlul10/vision-mapper


## 1. Retrospective (reflecting on last week)
- What went well?: My understanding went really well. I think things are slowly getting peiced together. I got my dev environment to work by working on my terminal commands and learning more about the build tool vite. I learned more about the development process. Then I got typescript to work. Eventually I deepened my Javascript fundamentals by practicing Javascript and doing research about specific syntax the language. The langauge itself feels a bit more readable now.

- What didn’t go well?: I didn't progress in the project much, even though I did finally understand the code demo from MediaPipe. I didnt get to write my demo yet. I also lost some progress, I got the demo working on my local machine using vite but now some of my files went missing, even my file structure. The code is still there but the configuartions got erased. It's not too difficult to rebuild it but it does set me back a bit.

- What can I improve next week?: I can finally focus on developing in web. I've pretty much cleared the two walls I've been facing. I'm hoping to finally create a simple demo using MediaPipe. Looking at googles demos I have realised that most of the work is in the set up, so once I get over the setup and initilization the Library takes care of the rest. They even do the 3D drawing overlay.


## 2. Current State (Context)
Summarize where the project stands right now (2–3 bullet points).
- The working dev environment was recently lost due to missing configuration files and file structure, however I do still have the source code available.

- I fully understand the MediaPipe demo, but I don't have a customized or rebuilt my own demo.

- Learning on Vite, TypeScript, and Javascript fundamentals has advanced me to focus on the core project development.


## 3. User Story (Next Sprint Focus)
User Story 1:
As a developer, I want to rebuild my local development environment and core project structure so that I can test and demo MediaPipe functionality efficiently.

User Story 2:
As an experimenter, I want to create a minimal demo using MediaPipe so that I can validate that the pipeline works end-to-end on my machine.

## 4. Acceptance Criteria (Given–When–Then)
Define 1–3 testable conditions that prove your User Story is satisfied.
-

- Given a fresh Vite project setup, When I run npm run dev, Then the local development server starts and loads the index page without errors.



- Given the MediaPipe code, When I open the demo in my browser, Then I see a basic but functional visualization/overlay from MediaPipe (pose detection working).

## 5. Definition of Done (DoD)
Describe what it means for this sprint’s User Story to be considered complete.

- The local development environment can reliably start and serve the project via Vite (npm run dev).

- The project has a working src directory and index.html, with TypeScript compiling successfully.

- A MediaPipe demo runs in the browser, performing detection and rendering a simple overlay as proof-of-concept.

- All configs and code needed to reproduce are committed/backed up.


---
## 6. Blockers (as Help Requests)
Identify problems slowing or stopping your progress, framed as help requests.
- Blocker: Not sure yet
- Help Request: Not sure yet

## 7. Goals (Steps Toward the DoD)
List the specific outcomes you aim to complete this week that will move you toward fulfilling your Definition of Done. These can be partial achievements or incremental tasks.
- Re-initialize a new Vite project and restore folder/file structure.

- Re-add TypeScript support and all necessary dependencies (@mediapipe/tasks-vision).

- Copy/paste or re-implement the working demo code, adjusting to the new structure.

- Validate that the minimal MediaPipe demo works in the browser.

- Commit or save a backup of the working configuration and code.

## 8. Next Steps
List the concrete, actionable tasks you will complete before the next class/report.
- Use npm create vite@latest to start a new project.

- Set up TypeScript by selecting it as a template or adding it after initialization.

- Reinstall all necessary packages with npm install.

- Restore or write minimal MediaPipe demo code into src/main.ts.

- Test project via npm run dev to confirm it starts and renders the demo.

- Commit all files and optionally push to the project repository in github.
