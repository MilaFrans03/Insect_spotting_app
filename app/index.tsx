export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState<string | null>(null); // nieuwe state
  const { trigger: loginUser, isMutating } = useUserLogin();

  useEffect(() => {
      const checkLogin = async () => {
          const storedUserId = await AsyncStorage.getItem('userId');
          if (storedUserId) {
              setUserId(storedUserId); // id in state zetten
              router.replace('/(tabs)/(home)');
          }
      };
  
      checkLogin();
  }, []); 

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please enter both email and password');
      return;
    }
    try {
      const data = await loginUser({ email, password });
      const id =
        data?._id ??
        data?.id ??
        data?.user?._id ??
        data?.user?.id;

      if (!id) {
        Alert.alert('User not found', 'Server did not return a user id');
        return;
      }

      await AsyncStorage.setItem('userId', id);
      setUserId(id); // id in state zetten zodat hij op de pagina verschijnt
      router.replace('/(tabs)/(home)');
    } catch (err: any) {
      console.log(err);
      Alert.alert('Error', err?.message ?? 'Failed to log in');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          marginTop: 20,
          borderRadius: 5,
        }}
        value={email}
        onChangeText={setEmail}
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          marginTop: 20,
          borderRadius: 5,
        }}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={handleEmailLogin}
        disabled={isMutating}
        style={[styles.button, isMutating && styles.buttonDisabled]}
      >
        <Text>{isMutating ? 'Logging in...' : 'LOGIN'}</Text>     
      </TouchableOpacity>

      {/* Hier tonen we de userId */}
      {userId && (
        <Text style={{ marginTop: 20, fontSize: 16 }}>
          Logged in as ID: {userId}
        </Text>
      )}
    </View>
  );
}
