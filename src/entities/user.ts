export enum RoleNames {
  Admin = 'admin',
  Teacher = 'teacher',
  Student = 'student',
}

export enum RoleLabels {
  admin = 'Админ',
  teacher = 'Учитель',
  student = 'Студент',
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  middleName?: string;
  fullName: string;
  role: RoleNames;
  email: string;
}

export type UserData = Pick<User, 'role' | 'fullName' | 'email'>

export interface UserProfile {
  id: number;
  name: string;
  lastName: string;
  middleName: string;
  email: string;
}
