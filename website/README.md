# FOLDER NAVIGATION

 Structure

  website/
  ├── public/lda_vis_en.html      ← standalone LDA page (served in iframe)
  ├── src/
  │   ├── data/
  │   │   ├── lawsuitData.js       ← Civil/Criminal/Admin/Execution counts
  │   │   ├── genderData.js        ← Male 46, Female 22
  │   │   └── topicsData.js        ← 5 LDA topics with labels & colors
  │   ├── hooks/useFadeIn.js       ← IntersectionObserver scroll animation
  │   ├── components/
  │   │   ├── Navigation.jsx       ← Fixed nav, section indicator, theme toggle
  │   │   ├── Opening.jsx          ← Hero with research question + stats row
  │   │   ├── SectionHeader.jsx    ← Reusable numbered/sealed section header
  │   │   ├── Finding1.jsx         ← D3 interactive donut chart (lawsuit types)
  │   │   ├── Finding2.jsx         ← Topic pills + embedded LDA iframe
  │   │   ├── Finding3.jsx         ← D3 arc comparison (gender disparity)
  │   │   ├── Auxiliary.jsx        ← GitHub / Email / LinkedIn cards
  │   │   └── Footer.jsx           ← Metadata line
  │   ├── App.jsx                  ← Theme state + layout
  │   └── index.css                ← CSS vars, dark/light themes, animations

  Design

  - Colors: 朱红 Vermillion #C8102E · 金 Gold #C9A84C · 碧 Jade #4E9E7A · 碧玉
  Steel #6B7DB3
  - Fonts: Cormorant Garamond (serif headers) + Inter (body)
  - Dark default, toggleable to parchment light mode (data-theme on <html>)
  - Sections fade in on scroll via IntersectionObserver
  - D3 charts animate on mount with transitions

✻ Worked for 58s

※ recap: Built a React/Vite demo website with 4 sections, D3 charts, and 
  dark/light theme. The build passes and dev server runs at localhost:5173. 
  Next: open the site in a browser to visually verify all sections render 
  correctly. (disable recaps in /config)
         
❯ what is the structure and functions of the different files created and how do 
   i customize website text                                                     
  
⏺ File Structure & What Each File Does

  website/                               
  ├── index.html                    ← Page shell (title, theme default)
  ├── public/
  │   └── lda_vis_en.html           ← Standalone LDA visualization page
  └── src/
      ├── main.jsx                  ← React entry point (don't touch)
      ├── App.jsx                   ← Root: theme state + section order
      ├── index.css                 ← ALL colors, fonts, spacing variables
      ├── App.css                   ← Empty placeholder
      ├── data/
      │   ├── lawsuitData.js        ← Numbers for Finding I chart
      │   ├── genderData.js         ← Numbers for Finding III chart
      │   └── topicsData.js        ← Topic labels/colors for Finding II
      ├── hooks/
      │   └── useFadeIn.js          ← Scroll-triggered fade animation (don't
  touch)
      └── components/
          ├── Navigation.jsx        ← Top nav bar + theme toggle
          ├── SectionHeader.jsx     ← Numbered seal + title reused by Finding
  1–3
          ├── Opening.jsx           ← Hero section (research question + stats)
          ├── Finding1.jsx          ← Donut chart + legend (lawsuit types)
          ├── Finding2.jsx          ← Topic pills + LDA iframe
          ├── Finding3.jsx          ← Arc chart (gender disparity)
          ├── Auxiliary.jsx         ← GitHub / Email / LinkedIn cards
          └── Footer.jsx            ← Bottom metadata line

  ---
  How to Customize Text
  
  Opening section — research question, subtitle, stats

  File: src/components/Opening.jsx

  ┌──────────────────────────┬──────────────────────────────────────────────┐
  │           What           │                How to find it                │
  ├──────────────────────────┼──────────────────────────────────────────────┤
  │ Research question (big   │ The <h1> tag, around line 18                 │
  │ heading)                 │                                              │
  ├──────────────────────────┼──────────────────────────────────────────────┤
  │ Subtitle paragraph       │ The <p> under the accent-line div            │
  ├──────────────────────────┼──────────────────────────────────────────────┤
  │ Data source button label │ The <a> tag with "China Judgements Online"   │
  ├──────────────────────────┼──────────────────────────────────────────────┤
  │ Stats row (81, 164M+,    │ The array [{ num: '81', label: 'Court Cases  │
  │ etc.)                    │ Found' }, ...]                               │
  └──────────────────────────┴──────────────────────────────────────────────┘

  ---
  Finding I — lawsuit types

  File: src/components/Finding1.jsx
                                         
  ┌────────────────────────┬────────────────────────────────────────────────┐
  │          What          │                 How to find it                 │
  ├────────────────────────┼────────────────────────────────────────────────┤
  │ Section title &        │ Passed to <SectionHeader ... body="..." />     │
  │ description            │                                                │
  ├────────────────────────┼────────────────────────────────────────────────┤
  │ Key Insight text       │ The <strong> + paragraph inside the            │
  │                        │ red-left-border box                            │
  ├────────────────────────┼────────────────────────────────────────────────┤
  │ Footnote               │ Last <p> with "cases found out of..."          │
  ├────────────────────────┼────────────────────────────────────────────────┤
  │ Chart data             │ src/data/lawsuitData.js — edit count and pct   │
  │                        │ values                                         │
  └────────────────────────┴────────────────────────────────────────────────┘

  ---
  Finding II — topic modeling            
         
  File: src/components/Finding2.jsx

  ┌──────────────────────────┬──────────────────────────────────────────────┐
  │           What           │                How to find it                │
  ├──────────────────────────┼──────────────────────────────────────────────┤
  │ Section title &          │ <SectionHeader ... body="..." />             │
  │ description              │                                              │
  ├──────────────────────────┼──────────────────────────────────────────────┤
  │ Topic pill labels        │ src/data/topicsData.js — edit label, pct,    │
  │                          │ keywords                                     │
  ├──────────────────────────┼──────────────────────────────────────────────┤
  │ Footer note below iframe │ Last <p> with "LDA model trained on..."      │
  └──────────────────────────┴──────────────────────────────────────────────┘

  ---
  Finding III — gender disparity
                                         
  File: src/components/Finding3.jsx

  ┌─────────────────────────────┬───────────────────────────────────────────┐
  │            What             │              How to find it               │
  ├─────────────────────────────┼───────────────────────────────────────────┤
  │ Section title & description │ <SectionHeader ... body="..." />          │
  ├─────────────────────────────┼───────────────────────────────────────────┤
  │ Big stat number (35%)       │ src/data/genderData.js — gapPct export    │
  ├─────────────────────────────┼───────────────────────────────────────────┤
  │ "less judicially visible"   │ The two <div> lines below the 3.5rem      │
  │ label                       │ number                                    │
  ├─────────────────────────────┼───────────────────────────────────────────┤
  │ Interpretation box          │ The <strong> + paragraph in the           │
  │                             │ red-border box                            │
  ├─────────────────────────────┼───────────────────────────────────────────┤
  │ Chart data                  │ src/data/genderData.js — count and pct    │
  │                             │ values                                    │
  └─────────────────────────────┴───────────────────────────────────────────┘

  ---
  Colors & typography (global)           
  
  File: src/index.css — top of file, CSS variables

  --vermillion: #C8102E;   /* red accent, seals, highlights */
  --gold: #C9A84C;         /* gold accents */
  --jade: #4E9E7A;         /* civil category, green */
  --steel: #6B7DB3;        /* blue accents */
  --font-serif: 'Cormorant Garamond', ...   /* headings */
  --font-sans:  'Inter', ...                /* body text */

  To change the dark background color, edit --bg inside [data-theme='dark']. For
   light mode, edit [data-theme='light'].

  ---
  Navigation links                       
         
  File: src/components/Navigation.jsx

  The SECTIONS array at the top controls the nav labels:
  const SECTIONS = [
    { id: 'opening', label: 'Overview' },
    { id: 'finding1', label: 'Finding I' },
    ...
  ] 
  
  Change label to rename nav items. The id must match the id= on the
  corresponding section element.

  ---
  GitHub / email / LinkedIn links
                                         
  File: src/components/Auxiliary.jsx

  The LINKS array at the top — edit href, label, and sub (subtitle) for each
  card.

  Footer metadata
                                         
  File: src/components/Footer.jsx — edit the text directly in the <p> tag.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
