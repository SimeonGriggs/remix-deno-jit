import SanityClient from "@sanity/client";

export const config = {
  projectId: `az8av6xl`,
  dataset: `production`,
  apiVersion: `2022-09-23`,
  useCdn: true
};

export const client = new SanityClient(config);
