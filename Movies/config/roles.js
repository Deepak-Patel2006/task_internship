import { permissions } from "../constant/permission.js";

export const role_permission = {
  user: [
    permissions.MOVIE_CREATE,
  ],

  admin: [
    permissions.MOVIE_CREATE,
    permissions.MOVIE_UPDATE,
    permissions.MOVIE_DELETE,

    permissions.USER_READ,
    permissions.USER_UPDATE,
    permissions.USER_DELETE
  ]
};
