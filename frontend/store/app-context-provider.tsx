import { AuthProvider } from "./auth-context";
import { VoiceProvider } from "./voice-recognition-context";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <VoiceProvider>{children}</VoiceProvider>
    </AuthProvider>
  );
}
