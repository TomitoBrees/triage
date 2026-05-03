# Frontend Architecture

The workspace contains two Angular applications:

- `apps/patient-ui`
- `apps/ioa-dashboard`

Both applications share the same backend API but keep their frontend code isolated. When code becomes genuinely reusable across both apps, promote it deliberately into a future workspace library instead of reaching across app folders.

## App Shape

Each app follows this structure:

```text
src/app/
  app.config.ts
  app.routes.ts
  core/
    auth/
    http/
  layout/
    app-shell/
  features/
    feature-name/
      pages/
      components/
      data-access/
      models/
  shared/
    ui/
    utils/
```

## Where Code Goes

- `core`: App-wide infrastructure such as auth session state, HTTP interceptors, route guards, injection tokens, logging, and global error handling.
- `layout`: Shell components that frame routed pages, such as sidebars, headers, and app navigation.
- `features`: Routeable business areas. Put feature-specific pages, child components, services, stores, and models here.
- `shared/ui`: Reusable presentational components used by multiple features in the same app.
- `shared/utils`: Small pure helpers used by multiple features in the same app.

## Conventions

- Prefer standalone components and route-level lazy loading.
- Organize by feature area before organizing by file type.
- Keep components focused on UI. Put API calls and storage concerns in services.
- Prefer `inject()` for dependencies in components, guards, interceptors, and services.
- Use signals for small local/client state. Add a state library only when shared state becomes complex enough to justify it.
- Treat route guards as UX helpers only. Backend authorization remains the source of truth.
- Keep shared cross-app code out of app folders until it is clearly reused by both frontends.
