// Routing
export function getRoutesForStack(routes) {
  return Object.values(routes).reduce((result, route) => {
    result[route.name] = route;
    return result;
  }, {});
}
