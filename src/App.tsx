import { Satellite } from "lucide-react";
import { Globe } from "@/components/Globe/Globe";
import { CameraHotkeys } from "@/components/Globe/CameraHotkeys";
import { MaxZoomImagery } from "@/components/Globe/MaxZoomImagery";
import { ImageryModal } from "@/components/Modal/ImageryModal";
import { formatGibsCaptureTime, formatSentinelCaptureTime } from "@/lib/captureTime";
import { getImageryProvider } from "@/providers/registry";
import { useAppStore } from "@/store/useAppStore";

export default function App() {
  const date = useAppStore((state) => state.date);
  const layerId = useAppStore((state) => state.layerId);
  const globeView = useAppStore((state) => state.globeView);
  const provider = getImageryProvider(layerId);
  const captureLabel = provider.sentinelVariantId
    ? formatSentinelCaptureTime(date, provider.sentinelVariantId, globeView?.lon)
    : formatGibsCaptureTime(date, provider.id, globeView?.lon);

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-space">
      <Globe />
      <MaxZoomImagery />
      <CameraHotkeys />

      <header
        data-testid="app-chrome"
        className="pointer-events-none absolute left-4 top-4 z-10 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-lg border border-white/10 bg-background/55 px-4 py-3 shadow-2xl backdrop-blur md:left-6 md:top-6"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Satellite className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold tracking-normal">Earth View</h1>
          <p className="truncate text-sm text-muted-foreground">
            {provider.name} · {captureLabel}
          </p>
        </div>
      </header>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-background/75 to-transparent" />

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-2">
        <p className="pointer-events-auto max-w-[calc(100vw-2rem)] rounded-md bg-background/40 px-2 py-1 text-center text-[10px] leading-tight text-muted-foreground backdrop-blur">
          Imagery{" "}
          <a
            href="https://www.earthdata.nasa.gov/technology/gibs"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:text-foreground hover:underline"
          >
            NASA GIBS
          </a>{" "}
          ·{" "}
          <a
            href="https://dataspace.copernicus.eu/"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:text-foreground hover:underline"
          >
            Copernicus/ESA
          </a>{" "}
          · activity{" "}
          <a
            href="https://earthquake.usgs.gov/"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:text-foreground hover:underline"
          >
            USGS
          </a>
          ,{" "}
          <a
            href="https://eonet.gsfc.nasa.gov/"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:text-foreground hover:underline"
          >
            NASA EONET
          </a>{" "}
          · borders{" "}
          <a
            href="https://www.naturalearthdata.com/"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:text-foreground hover:underline"
          >
            Natural Earth
          </a>
        </p>
      </footer>

      <ImageryModal />
    </main>
  );
}
