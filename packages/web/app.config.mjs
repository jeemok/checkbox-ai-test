export default {
  // App metadata
  metadata: {
    title: 'Task Management System',
    description: 'Serverless | Next.js | Mantine',
  },
  // Auth
  googleAuthorize: `${process.env.API_URL}/auth/google/authorize`,
  loginRedirect: '/home',
  logoutRedirect: '/',
};
