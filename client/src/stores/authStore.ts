// src/store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';



interface User {
  email: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (token: string) => void;
  logout: () => void;
  setUser: (userData: User) => void;
  initialize: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: (token) => {
        try {
          set({ isLoading: true, error: null });
          const decoded = jwtDecode<{ 
            email: string; 
            role: 'admin' | 'user';
            firstName?: string;
            lastName?: string;
            company?: string;
            phone?: string;
            exp: number;
          }>(token);
          
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            throw new Error('Token expired');
          }

          set({ 
            token,
            user: {
              email: decoded.email,
              role: decoded.role,
              firstName: decoded.firstName,
              lastName: decoded.lastName,
              company: decoded.company,
              phone: decoded.phone
            },
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          });
          get().logout();
        }
      },

      logout: () => {
        set({ 
          token: null, 
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      },
      
setUser: (userData) => set({ 
  user: { 
    ...userData 
  }
}),
      initialize: async () => {
        const { token } = get();
        if (!token) {
          set({ isLoading: false });
          return;
        }

        try {
          set({ isLoading: true });
          const decoded = jwtDecode<{ 
            email: string; 
            role: string;
            firstName?: string;
            lastName?: string;
            company?: string;
            phone?: string;
            exp: number;
          }>(token);

          // Validate token expiration
          if (decoded.exp * 1000 < Date.now()) {
            throw new Error('Token expired');
          }

          set({
            user: {
              email: decoded.email,
              role: decoded.role as 'admin' | 'user',
              firstName: decoded.firstName,
              lastName: decoded.lastName,
              company: decoded.company,
              phone: decoded.phone
            },
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ 
            isLoading: false,
            error: error instanceof Error ? error.message : 'Session invalid'
          });
          get().logout();
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
      version: 1
    }
  )
);

// Optional: Add a hook for easy access to auth state
export const useAuth = () => {
  const { 
    token, 
    user, 
    isAuthenticated, 
    isLoading, 
    error,
    login, 
    logout, 
    setUser,
    initialize,
    clearError
  } = useAuthStore();

  return {
    token,
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    setUser,
    initialize,
    clearError,
    // Derived state
    isAdmin: user?.role === 'admin'
  };
};

// interface User {
//   email: string;
//   role: 'admin' | 'user';
// }

// interface AuthState {
//   token: string | null;
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
//   login: (token: string) => void;
//   logout: () => void;
//   initialize: () => Promise<void>;
//   clearError: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       token: null,
//       user: null,
//       isAuthenticated: false,
//       isLoading: false,
//       error: null,
      
//       login: (token) => {
//         try {
//           set({ isLoading: true, error: null });
//           const decoded = jwtDecode<{ 
//             email: string; 
//             role: 'admin' | 'user';
//             exp: number;
//           }>(token);
          
//           // Check if token is expired
//           if (decoded.exp * 1000 < Date.now()) {
//             throw new Error('Token expired');
//           }

//           set({ 
//             token,
//             user: {
//               email: decoded.email,
//               role: decoded.role
//             },
//             isAuthenticated: true,
//             isLoading: false
//           });
//         } catch (error) {
//           set({ 
//             error: error instanceof Error ? error.message : 'Login failed',
//             isLoading: false 
//           });
//           get().logout();
//         }
//       },

      
//       logout: () => {
//         set({ 
//           token: null, 
//           user: null,
//           isAuthenticated: false,
//           isLoading: false,
//           error: null
//         });
//       },
      
//       setUser: (userData) => set({ user: userData }),

//       initialize: async () => {
//         const { token } = get();
//         if (!token) {
//           set({ isLoading: false });
//           return;
//         }

//         try {
//           set({ isLoading: true });
//           const decoded = jwtDecode<{ 
//             email: string; 
//             role: string;
//             exp: number;
//           }>(token);

//           // Validate token expiration
//           if (decoded.exp * 1000 < Date.now()) {
//             throw new Error('Token expired');
//           }

//           set({
//             user: {
//               email: decoded.email,
//               role: decoded.role as 'admin' | 'user'
//             },
//             isAuthenticated: true,
//             isLoading: false
//           });
//         } catch (error) {
//           console.error('Auth initialization error:', error);
//           set({ 
//             isLoading: false,
//             error: error instanceof Error ? error.message : 'Session invalid'
//           });
//           get().logout();
//         }
//       },

//       clearError: () => set({ error: null })
//     }),
//     {
//       name: 'auth-storage',
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({ token: state.token }),
//       version: 1 // Useful for future migrations
//     }
//   )
// );

// // Optional: Add a hook for easy access to auth state
// export const useAuth = () => {
//   const { 
//     token, 
//     user, 
//     isAuthenticated, 
//     isLoading, 
//     error,
//     login, 
//     logout, 
//     initialize,
//     clearError
//   } = useAuthStore();

//   return {
//     token,
//     user,
//     isAuthenticated,
//     isLoading,
//     error,
//     login,
//     logout,
//     initialize,
//     clearError,
//     // Derived state
//     isAdmin: user?.role === 'admin'
//   };
// };