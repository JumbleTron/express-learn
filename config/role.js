export const ROLE_USER = 1;
export const ROLE_TUTOR = (1 << 1) | ROLE_USER;
export const ROLE_ADMIN = (1 << 2) | ROLE_TUTOR;

export const ALLOWED_ROLES = [ROLE_USER, ROLE_ADMIN, ROLE_TUTOR];
