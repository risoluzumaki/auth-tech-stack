<div align="center">
  <h1 style="font-size: 2.5rem;">Multi-Stack Authentication Showcase</h1>
  <p>
    This repository is a <b>work-in-progress</b> project to demonstrate authentication (login & registration) implemented across various frontend and backend tech stacks.
  </p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelte" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" alt="Kubernetes" />
</div>

---

## Technologies

This project aims to implement the same frontend and backend functionalities using different technologies for comparison.

| Category | Technology |
| :--- | :--- |
| **Frontend** | <img src="https://cdn.simpleicons.org/react/61DAFB" width="16"/> React |
| | <img src="https://cdn.simpleicons.org/vuedotjs/4FC08D" width="16"/> Vue.js |
| | <img src="https://cdn.simpleicons.org/nextdotjs/000000" width="16"/> Next.js |
| | <img src="https://cdn.simpleicons.org/svelte/FF3E00" width="16"/> Svelte |
| **Backend** | <img src="https://cdn.simpleicons.org/express/000000" width="16"/> Express.js (Node.js) |
| | <img src="https://cdn.simpleicons.org/go/00ADD8" width="16"/> Fiber (Go) |
| | <img src="https://cdn.simpleicons.org/fastapi/009688" width="16"/> FastAPI (Python) |
| | <img src="https://cdn.simpleicons.org/javalin/007396" width="16"/> Javalin (Java) |
| **Database** | <img src="https://cdn.simpleicons.org/postgresql/4169E1" width="16"/> PostgreSQL |
| **Infrastructure**| <img src="https://cdn.simpleicons.org/docker/2496ED" width="16"/> Docker |
| | <img src="https://cdn.simpleicons.org/kubernetes/326CE5" width="16"/> Kubernetes |

---

## 📂 Project Structure

```
.
├── client/         # Source code for frontend applications
│   └── react/
├── server/         # Source code for backend applications
│   ├── express/
│   └── gofiber/
├── docker/         # Docker Compose configurations
├── k8s/            # Kubernetes configurations
├── migration/      # Database migration scripts
└── docs/           # Documentation (OpenAPI, etc.)
```

---

## Roadmap

Here are some features and technologies planned for future development:

-   [ ] Frontend implementation with Vue.js, Next.js, and Svelte.
-   [ ] Backend implementation with FastAPI (Python) and Javalin (Java).
-   [ ] Complete the authentication flow (e.g., forgot password, email verification).
-   [ ] Add unit and integration tests for each service.
-   [ ] Refine the Kubernetes configuration.