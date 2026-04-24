// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock(
  'better-auth/react',
  () => ({
    createAuthClient: () => ({
      useSession: () => ({
        data: null,
        isPending: false,
        error: null,
        refetch: jest.fn(),
      }),
      signOut: jest.fn(),
      signIn: {
        email: jest.fn(),
        social: jest.fn(),
      },
      signUp: {
        email: jest.fn(),
      },
    }),
  }),
  { virtual: true },
);
