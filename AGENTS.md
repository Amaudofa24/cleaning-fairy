<!-- BEGIN:nextjs-agent-rules -->

# Cleaning Fairy Code Architecture & Guidelines

This document serves as an architectural guide for AI agents and developers working on the **Cleaning Fairy** codebase. It outlines the preferred architecture, patterns, and coding standards of the application.

---

## 1. Tech Stack

- **Framework**: Next.js 14.2.25 (App Router)
- **Language**: TypeScript & React 18
- **Styling**: Tailwind CSS v3.4.1 (Utility Classes) and PostCSS, augmented by component-level CSS Modules (`styles.module.css`) for localized style overrides.
- **State Management**:
  - **Global UI & Auth State**: Redux Toolkit (v2.5.0) persisted via `redux-persist` (v6.0.0) and encrypted via `redux-persist-transform-encrypt` (v5.1.1).
  - **Server State / API**: RTK Query (via `apiSlice`) and `@tanstack/react-query` (v5.64.1) for query client wrapper setup.
  - **Local Form / Wizard Flow**: React Context (under `src/store/context/`) combined with Formik.
- **Forms & Validation**: Formik (v2.4.6) and Yup (v1.6.1)
- **UI Components & Headless Primitives**: Headless UI (`@headlessui/react` v2.2.0)
- **Real-Time Notifications**: `@microsoft/signalr` (v8.0.7)
- **Utilities**:
  - `dayjs` (v1.11.13) for date manipulation (extended with `duration` and `utc` plugins)
  - `localforage` (v1.10.0) for local storage drivers
  - `papaparse` (v5.5.3) for CSV imports/exports
  - `jwt-decode` (v4.0.0) for token decoding
  - `axios` (v1.7.9) for authentication token refreshing

---

## 2. Project Structure

```
src/
├── app/            # Next.js App Router pages, layouts, and static assets
├── components/     # Reusable UI components
│   ├── shared/     # Global shared components (Button, Table, Input, Select, etc.)
│   └── views/      # Page-specific views and dashboard modules
├── constants/      # App constants (api endpoints, navigation paths, stages configs)
├── enums/          # TypeScript Enumerations
├── hooks/          # Global Custom React hooks (useOTP, useIndicator, etc.)
├── middlewares/    # Custom middlewares
├── seo/            # SEO configurations
├── services/       # API service definitions (RTK Query Endpoints splitting)
├── store/          # Redux store config, providers, and context APIs
│   ├── context/    # Context providers for multi-stage forms
│   ├── providers/  # React / Redux / Query providers
│   └── slices/     # Redux slices (api, auth, app, signalr)
├── styles/         # Global styles
├── types/          # Global TypeScript interfaces/types
├── utils/          # Utility functions (csv export, money formatting, cookies)
└── validations/    # Yup validation schemas
```

---

## 3. Architecture Patterns

### 3.1 API & Data Fetching (RTK Query)

The project leverages **RTK Query** for server requests and cache management.

- **Base API Slice**: Configured in [api.ts](file:///Users/macoos/Desktop/AlatProjects/WemaAgentPlatformUI/src/store/slices/api.ts).
- **Endpoint Injection**: Services inject endpoints via `apiSlice.injectEndpoints` inside service files in `src/services/`.
- **Token Injection**: Header authorization dynamically fetches the cookie `_tk` and includes the subscription key `Ocp-Apim-Subscription-Key` (from `APIM_SUB_KEY` constant).
- **Automatic Token Re-authentication (`baseQueryWithReauth`)**: If an API request encounters a `401 Unauthorized` response:
  1. The hook checks for a refresh token (`_rtk` cookie).
  2. If found, a shared refresh request calls `/auth/refresh` using `axios`.
  3. Race conditions between concurrent failing requests are prevented by caching the refresh call in a shared `refreshPromise` block.
  4. Upon success, the cookies `_tk` and `_rtk` are updated, and the original API request is retried.
  5. If refreshing fails or the refresh token is missing, the user session is expired using `handleLogoutRedirect()`.

**Example Service Definition ([src/services/auth.ts](file:///Users/macoos/Desktop/AlatProjects/WemaAgentPlatformUI/src/services/auth.ts)):**

```typescript
import { endpoints, REQUEST_METHODS } from "@/constants";
import { apiSlice } from "@/store/slices";
import { IResponseBody } from "@/types";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values: { userName: string; password: string }) => ({
        url: endpoints.auth.login,
        method: REQUEST_METHODS.POST,
        body: values,
        transformResponse: (
          response: IResponseBody<{
            responseCode: string;
            responseMessage: string;
            token: string;
          }>,
        ) => response?.data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authService;
```

---

### 3.2 Global State (Redux)

Use Redux for global client-side UI and session states (such as User Data, Role, SignalR connectivity status).

- Configured in [store.ts](file:///Users/macoos/Desktop/AlatProjects/WemaAgentPlatformUI/src/store/store.ts).
- Slices located in `src/store/slices/`.
- **Persistence**: Store persistence is enabled via `redux-persist` and is encrypted with `redux-persist-transform-encrypt`.

---

### 3.3 Component Architecture & Form Bindings

- **Shared Form Controls**: Controls like `Input`, `Select`, `TextArea`, `Checkbox`, and `Radio` accept a `formik` prop (type `FormikProps<any>`) and a `name` prop.
- **Dynamic Bindings**: Inside the shared component, these props bind directly to:
  - Value: `formik.values[name]`
  - Error check: `formik.touched[name] && formik.errors[name]`
  - On Change / Blur: Local handlers that wrap Formik's `setFieldValue` and `handleBlur`.

**Example Usage inside a Form View ([src/components/views/SignIn/index.tsx](file:///Users/macoos/Desktop/AlatProjects/WemaAgentPlatformUI/src/components/views/SignIn/index.tsx)):**

```tsx
import { Input, Button } from "@/components";
import { useFormik } from "formik";
import { signInValidation } from "@/validations";

const SignInForm = () => {
  const signInFormik = useFormik({
    initialValues: { userName: "", password: "" },
    validationSchema: signInValidation,
    onSubmit: async (values) => {
      // login logic...
    },
  });

  return (
    <form onSubmit={signInFormik.handleSubmit}>
      <Input
        formik={signInFormik}
        name="userName"
        label="Email or Phone Number"
      />
      <Input
        formik={signInFormik}
        name="password"
        type="password"
        label="Password"
      />
      <Button onClick={signInFormik.submitForm} text="Sign In" />
    </form>
  );
};
```

---

### 3.4 Multi-Stage Form Context Pattern

For complex wizard-style structures (such as password resets or onboarding flows), utilize a React Context provider coupled with Formik.

1. **Context Initialization**: The context provider (e.g., `ForgotPasswordContextProvider`) manages the overall state (`currentStage`, step index, etc.) and instantiates a single `useFormik` hook.
2. **Dynamic Schema Swapping**: The Formik validation schema is dynamically determined using a stage map configuration:
   ```typescript
   const validationSchema = useMemo(
     () => forgotPasswordStages[currentStage]?.validation,
     [currentStage],
   );
   ```
3. **Action Routing**: Form submissions validate the form values against the current stage schema. If valid, the submission handler calls the respective API mutation, updates context state fields (e.g., setting `correlationId`), increments the stage, and routes to the next view.

---

### 3.5 Reusable Table Component (TanStack Table)

The workspace features a high-performance wrapper component for lists and tables ([src/components/shared/Table/index.tsx](file:///Users/macoos/Desktop/AlatProjects/WemaAgentPlatformUI/src/components/shared/Table/index.tsx)) that integrates `@tanstack/react-table`.

- **Props**: Accepts `columns` (`ColumnDef<T>[]`), `data` (`T[]`), `pagination`, `setPagination`, and configuration flags like `manualPagination` or `showViewAll`.
- **Automatic Formatting**: The wrapper automatically formats cell outputs based on column names/types:
  - Column IDs containing `"name"` automatically capitalize text using `capitalizeStrings`.
  - Column IDs containing `"date"` automatically parse string timestamps to readable format using `new Date(value).toDateString()`.
  - Boolean cell values are automatically rendered as `"Yes"` or `"No"`.
  - Custom cells invoke the standard Column Def cell renderer.

---

### 3.6 Common Utilities & Helper Functions

All helper files are located in `src/utils/` and re-exported through the index file.

1. **`dayJs`**: Extended instance of `dayjs` with duration and UTC formatting plugins.
2. **`formatAsMoney`**: Formats numerical inputs into localized currency syntax (defaults to Nigerian Naira, `NGN`).
3. **`exportToCSV`**: Exports arrays of data objects into a CSV file by converting properties to sentence casing and calling PapaParse (`Papa.unparse`). Leading zeros on numbers (e.g., telephone numbers or serial numbers) are wrapped in `="value"` format to prevent Excel from removing them.
4. **Cookie Helpers (`getCookie`, `setCookie`, `expireCookie`)**: Pure client-side cookie reading and creation.
5. **`handleLogoutRedirect`**: Clears the session keys (`_tk`, `_rtk`, `_ar`), invalidates state, and performs a route-replace to sign-in.
6. **`getErrorMessage`**: Extracts nested error details from Axios response structures or RTK Query responses to produce a clean, user-facing error message.
7. **`getValidImageUrl`**: Validates whether image paths are hosted on safe, permitted domains (e.g., Azure Blob storage).

---

## 4. Coding Standards

### 4.1 TypeScript

- **No `any`**: Explicitly declare interfaces or type aliases. Use `unknown` or narrow generic parameters if needed.
- **Interfaces vs Types**: Use `interface` for entity declarations and object types that may be extended; use `type` for unions, intersections, and aliases.
- **Naming Conventions**:
  - React components / views / contexts: `PascalCase.tsx`
  - Normal utility files / hooks / functions: `camelCase.ts`
  - TypeScript types and interfaces: Prefix with capital `I` (e.g., `IUser`, `ILoginRequest`)
  - Enums: PascalCase names, with uppercase keys (e.g., `OtpPurposeEnum.ForgotPassword`)

---

## 5. Development Workflow

### 5.1 Adding a New API Endpoint

1. Locate or create a service module in `src/services/`.
2. Reference the route endpoint in the `endpoints` list configuration in `src/constants/api.ts`.
3. Use the builder mutation or query pattern:
   ```typescript
   myEndpoint: builder.mutation({
     query: (payload) => ({
       url: endpoints.myFeature.myAction,
       method: REQUEST_METHODS.POST,
       body: payload,
     }),
   });
   ```
4. Export the hook dynamically generated by RTK Query.

### 5.2 Creating a Form with Validation

1. Write the initial state types and schema interface in `src/types/`.
2. Define a validation schema using Yup in `src/validations/`.
3. Set up the `useFormik` block in the component or local page context.
4. Render using custom shared components:
   ```tsx
   <Input formik={formikInstance} name="myField" label="My Label" />
   ```

<!-- END:nextjs-agent-rules -->
