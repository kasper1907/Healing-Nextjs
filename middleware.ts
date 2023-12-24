import { stackMiddlewares } from "./middlewares/stackMiddlewares";
import { withAuthorization } from "./middlewares/withAuthorization";
import { withRolesAndPermissions } from "./middlewares/withRolesAndPermissions";
export default stackMiddlewares([
  // withRolesAndPermissions,
  withAuthorization,
  //   withHeaderParams,
]);
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|locales).*)"],
};
