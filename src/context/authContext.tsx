import { useNavigation } from "@react-navigation/native";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PREFIX_AUTH } from "../utils/variables";

type AuthContextType = {
  data: SignInType;
  setData: (_: SignInType) => void;
  loading: boolean;
  setLoading: (_: boolean) => void;
  signIn: ({ email }: { email: string }) => void;
  signOut: () => void;
};

type User = {
  name: string;
  email: string;
};

type SignInType = {
  user: User;
  token: string;
};

type SignInCredentials = {
  email: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<SignInType>({} as SignInType);

  const [loading, setLoading] = useState(false);
  const navigate: any = useNavigation();

  const signIn = useCallback(async ({ email }: SignInCredentials) => {
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", { email });

      const { token, user } = data;

      if (token && user) {
        await AsyncStorage.setItem(
          `${PREFIX_AUTH}:token`,
          JSON.stringify(token)
        );
        await AsyncStorage.setItem(`${PREFIX_AUTH}:user`, JSON.stringify(user));

        setData({ token, user });
        setLoading(false);

        navigate.navigate("Home");
      } else {
        navigate.navigate("SignIn");
      }
    } catch (error) {
      console.log(error);
      navigate.navigate("SignIn");
      setLoading(false);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 405) {
          return;
        }

        return;
      } else {
        console.log("unexpected error: ", error);
        return;
      }
    }
  }, []);

  // const signUp = useCallback(
  //   async ({ email, name, indicator_code }: RegisterCredentials) => {
  //     setLoading(true);

  //     try {
  //       const response = await api.post("/auth/register", {
  //         email,
  //         name,
  //         indicator_code,
  //       });

  //       const { token, user, extraProducts } = response.data;

  //       if (token && user) {
  //         localStorage.setItem(`${PREFIX_AUTH}:token`, JSON.stringify(token));
  //         localStorage.setItem(`${PREFIX_AUTH}:user`, JSON.stringify(user));

  //         setData({ token, user, extraProducts });
  //         setLoading(false);

  //         navigate("/inventory", { replace: true });
  //       } else {
  //         return toast.error("Desculpe. Não foi possível realizar o registro.");
  //       }
  //     } catch (error) {
  //       setLoading(false);

  //       if (axios.isAxiosError(error)) {
  //         if (error.response?.status === 405) {
  //           return toast.error(error?.response?.data?.message);
  //         }

  //         return toast.error("Valores incorretos.");
  //       } else {
  //         console.log("unexpected error: ", error);
  //         return toast.error("Erro ao realizar registro, tente novamente");
  //       }
  //     }
  //   },
  //   []
  // );

  const resetUser = async () => {
    await AsyncStorage.clear();
    setData({} as SignInType);
    navigate.navigate("Welcome");
  };

  const signOut = useCallback(async () => {
    resetUser();
  }, []);

  const handleGetDataFromAsyncStorage = async () => {
    setData({
      user: JSON.parse(
        (await AsyncStorage.getItem(`${PREFIX_AUTH}:user`)) || "null"
      ),
      token: JSON.parse(
        (await AsyncStorage.getItem(`${PREFIX_AUTH}:token`)) || "null"
      ),
    });

    return;
  };

  useEffect(() => {
    handleGetDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    const authUser = async () => {
      try {
        const response = await api.get("/auth/get-authenticated-user", {
          headers: {
            Authorization: `BEARER ${data.token?.replace("#Auth:", "")} `,
          },
        });

        if (response.status !== 200 || !response.data) {
          if (location.pathname !== "/register") {
            signOut();
            navigate("/login", { replace: true });
          }
        }

        setData({
          ...data,
          user: response.data.user,
        });
      } catch (error) {
        console.log({ error });
        if (location.pathname !== "/register") {
          signOut();
          navigate("/login", { replace: true });
        }
      }
    };

    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ data, loading, setData, setLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
