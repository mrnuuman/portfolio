export const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const homeHref = `${import.meta.env.BASE_URL}#`;
