import { notFound } from 'boom';

export const resourceNotFound = (resourceName: string, id: string) =>
  notFound(`The '${resourceName}' is not found (id:'${id}')`);
