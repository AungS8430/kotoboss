import { defineMiddleware } from "astro:middleware";
import { getActionContext } from "astro:actions";

export const onRequest = defineMiddleware(async (context, next) => {
  const { action } = getActionContext(context);

  if (action?.calledFrom === "form") {
    await action.handler();
    return context.redirect(context.url.pathname, 303);
  }

  return next();
})