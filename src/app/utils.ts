import { taskProp } from "./types";

export const projectData: {
    new: taskProp[];
    ongoing: taskProp[];
    done: taskProp[];
} = {
    new: [
        {
            id: "1",
            title: "Implement User Authentication Module",
            status: "new",
            description: "Develop secure user login, registration, and password reset functionalities. This includes integrating with existing OAuth providers (Google, GitHub) and setting up JWT token generation and validation.",
            dueDate: "2025-07-20",
            selected: false
        },
        {
            id: "2",
            title: "Refactor Legacy API Endpoints",
            status: "new",
            description: "Rewrite outdated REST API endpoints for the `/products` and `/orders` services. Focus on improving performance, ensuring consistent error handling, and adhering to OpenAPI specifications. Deprecate old endpoints.",
            dueDate: "2025-07-25", // Future date
            selected: false
        },
        {
            id: "3",
            title: "Set up CI/CD Pipeline for Frontend",
            status: "new",
            description: "Configure Jenkins/GitLab CI for automated testing (unit, integration), building, and deployment of the React frontend application to the staging environment. Include linting and code quality checks.",
            dueDate: "2025-08-05",
            selected: false
        }
    ],
    ongoing: [
        {
            id: "4",
            title: "Develop Admin Dashboard Features",
            status: "ongoing",
            description: "Currently working on adding user management (CRUD operations) and real-time analytics widgets to the new admin dashboard. Progress is approximately 60% complete, focusing on the user table UI and data fetching.",
            dueDate: "2025-07-15",
            selected: false
        },
        {
            id: "5",
            title: "Investigate Database Performance Bottleneck",
            status: "ongoing",
            description: "Analyzing slow query logs on the production database, specifically for the `customer_transactions` table. Initial findings suggest a missing index on the `transaction_date` column, which is being investigated for implementation.",
            dueDate: "2025-07-13",
            selected: false
        },
        {
            id: "6",
            title: "Integrate Third-Party Payment Gateway",
            status: "ongoing",
            description: "Implementing the Stripe API for processing credit card payments. This involves setting up payment intents, handling webhook events for transaction status updates, and integrating with the checkout flow. Currently testing sandbox transactions.",
            dueDate: "2025-07-18",
            selected: false
        }
    ],
    done: [
        {
            id: "7",
            title: "Deploy Hotfix for Critical Bug",
            status: "done",
            description: "Successfully deployed a hotfix to production addressing the critical bug in the shopping cart total calculation, which was affecting discount application. Monitored logs for 24 hours post-deployment; no regressions observed.",
            dueDate: "2025-07-01",
            selected: false
        },
        {
            id: "8",
            title: "Complete Code Review for Sprint 5",
            status: "done",
            description: "Finished reviewing all pull requests for Sprint 5 features, including the new user profile page and notification service. Provided detailed feedback and ensured all code quality and security standards were met before merging to `main`.",
            dueDate: "2025-06-28",
            selected: false
        }
    ]
};

export const state = {
    new: 0,
    ongoing: 1,
    done: 2
}

const allowedStatuses = ["new", "ongoing", "done"] as const;
export type Status = typeof allowedStatuses[number];

function parseTasks(data: string | null, fallback: taskProp[]): taskProp[] {
    if (!data) return fallback;
    try {
        const parsed = JSON.parse(data);
        if (!Array.isArray(parsed)) return fallback;
        return parsed.map((task: any) => ({
            ...task,
            status: allowedStatuses.includes(task.status) ? task.status as Status : "new"
        }));
    } catch {
        return fallback;
    }
}

export const populateData = () => {
    const localNew = localStorage.getItem("newTask");
    const localOngoing = localStorage.getItem("ongoing");
    const localDone = localStorage.getItem("done");

    let initialObjectsOfArray = {
        new: parseTasks(localNew, projectData.new),
        ongoing: parseTasks(localOngoing, projectData.ongoing),
        done: parseTasks(localDone, projectData.done)
    };
    return initialObjectsOfArray;
}

export const demoTasks = [...projectData.new, ...projectData.ongoing, ...projectData.done];


// export const populateData =  () => projectData;