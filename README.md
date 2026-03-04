# CV-Maker

A small single-page Vue 3 application to create, edit and print one-page resumes (CVs). The app uses Vite + TypeScript and stores user data in localStorage so you can manage multiple CVs, edit sections with modal editors and generate a printable PDF via the browser print dialog.

## Docker Deploy (Recommended)

You can find the Docker image here: [cv-maker](https://hub.docker.com/r/brunopoiano/cv-maker)

Build and run using Docker:

```sh
docker run -d -p 2622:80 --name cv-maker docker.io/brunopoiano/cv-maker
```

## Features

- Create, copy, delete and save multiple curriculum entries
- Edit header, contact, summary, core skills and experience using modal editors
- Toggle summary/experience descriptions between plain text and list formats
- Highlight (bold) user-provided keywords throughout the CV
- Persist data in localStorage
- Generate a printable PDF with a sanitized filename based on the header
- Light / Dark color scheme toggle

## Tech stack

- Vue 3 (script setup + Composition API)
- TypeScript
- Vite
- No backend — data is stored in browser localStorage

## Prerequisites

- Node.js 20.x or newer (package.json engines require Node >= 20.19.0 or >= 22.12.0)
- A modern browser with print support

## How to use

- Use the menu to create, copy, delete and save CV entries.
- Open modal editors (Header, Contact, Summary, Core Skills, Experience) to edit each section.
- Use the "Bolder Words" modal to provide a comma-separated list of keywords to highlight in the CV preview.
- Use "Generate PDF" button in the header to open the browser print dialog. The app sets a sanitized document.title to create a file-friendly name.
- Use "Generate Prompt" to compose an LLM prompt to rewrite the resume to match a job description.
