import { FC, useContext, useState } from "react";
import { User } from "../models/User";
import { AuthContext } from "../contexts/AuthContext";

const Login: FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const authContext = useContext(AuthContext);

  // Ensure authContext is not undefined before accessing its properties
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }

  const { signIn } = authContext;

  const handleLogin = async () => {
    // console.log(user);
    const loggedUser = await signIn(user!);

    console.log(loggedUser?.status);
    console.log(loggedUser?.message);
  };

  return (
    <>
      <div>This is the login</div>

      <div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default Login;
