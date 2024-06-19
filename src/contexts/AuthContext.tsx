import { createContext, useReducer, ReactNode, useEffect } from 'react';

// 전역 타입 선언을 확장
declare global {
  interface Window {
    logoutFunction?: () => void;
  }
}

// reducer에 사용할 로그인 현재 상태
interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

// reducer에서 업데이트를 위한 액션 객체
export interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  accessToken: string | null;
  refreshToken: string | null;
}

// 초기 상태 설정
const getInitialState = (): AuthState => {
  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    isAuthenticated: !!token,
    accessToken: token,
    refreshToken: refreshToken,
  };
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: getInitialState(),
  dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':{
      localStorage.setItem('accessToken', action.accessToken!);
      localStorage.setItem('refreshToken', action.refreshToken!);
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }
    case 'LOGOUT':
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode })  => {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  useEffect(() => {
    // window 객체에 로그아웃 함수를 설정
    window.logoutFunction = () => {
      dispatch({ type: 'LOGOUT', accessToken: null, refreshToken: null });
    };

    // 컴포넌트 언마운트 시 로그아웃 함수 제거
    return () => {
      delete window.logoutFunction;
    };
  }, []); // 의존성 배열을 비워서 컴포넌트 마운트/언마운트 시에만 실행되도록 함

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
