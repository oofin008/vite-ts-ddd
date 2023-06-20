# Project technologies
- Vite framework
- Antd UI
- React-router-dom Routing management
- Typescript language

# Environment
- Node v.14.20.0
- NPM v.6.14.17

# Project structure
- Src
  - public --> static asset here
  - routes --> define all routes and page view here
  - templates --> define layout here
  - utils
  - views --> for page view content
  - components --> shared component such as card, shelf etc.
  - core --> define high-level (business logic) code here.

# Test Admin for firebase login (temp gonna delete)
santi@admin.com P@ssw0rd

# How to add new route
- create new view in `src/views`
- add `path` and `Component` in `src/routes`
- Note: add path before '*' path

# How to add route on Nav bar
- go to `src/templates/antd/Default.tsx`
- in `<Menu />` Component, add new item

# ENV File
Env Loading Priorities
An env file for a specific mode (e.g. .env.production) will take higher priority than a generic one (e.g. .env).
In addition, environment variables that already exist when Vite is executed have the highest priority and will not be overwritten by .env files. For example, when running VITE_SOME_KEY=123 vite build.
.env files are loaded at the start of Vite. Restart the server after making changes.