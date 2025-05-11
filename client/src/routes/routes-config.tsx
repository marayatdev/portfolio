import admin from "@/pages/admin/admin";
import auth from "@/pages/auth/auth";
import user from "@/pages/user/user";


export default [
  {
    index: true,
    element: auth,
  },
  {
    path: '/user',
    element: user,
    requireRoles: [1],
  },
  {
    path: '/admin',
    element: admin,
    requireRoles: [2],
  }
];
