import { AuthProvider } from "./auth-context";
import { VoiceProvider } from "./voice-recognition-context";
import { BibleProvider } from "./bible-context";
import { PresentationProvider } from "./presentation-context";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <VoiceProvider>
        <BibleProvider>
          <PresentationProvider>{children}</PresentationProvider>
        </BibleProvider>
      </VoiceProvider>
    </AuthProvider>
  );
}
