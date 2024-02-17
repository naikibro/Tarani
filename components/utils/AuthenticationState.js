import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthenticationState = () => {
  const [user, setUser] = useState(null);
  // Authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Cleanup on component unmount
  }, []);
};

export default AuthenticationState;
