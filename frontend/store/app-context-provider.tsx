import { AuthProvider } from "./auth-context";
import { VoiceProvider } from "./voice-recognition-context";
import { BibleProvider } from "./bible-context";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <VoiceProvider>
        <BibleProvider>{children}</BibleProvider>
      </VoiceProvider>
    </AuthProvider>
  );
}
