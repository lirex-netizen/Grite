import { useState, useEffect } from "react";
import { GameMapId, Position, QuestStep } from "./types";
import { GameCanvas } from "./components/GameCanvas";
import { DialogueBox } from "./components/DialogueBox";
import { GameUI } from "./components/GameUI";
import { audio } from "./utils/audio";
import { Heart, Moon, ShieldAlert, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

export default function App() {
  const [currentMap, setCurrentMap] = useState<GameMapId>("HOUSE_INT");
  const [questStep, setQuestStep] = useState<QuestStep>("WAKE_UP");
  const [playerPos, setPlayerPos] = useState<Position>({ x: 100, y: 155 });
  const [hasMedicine, setHasMedicine] = useState<boolean>(false);
  const [hasMoney, setHasMoney] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isHudOpen, setIsHudOpen] = useState<boolean>(false);

  const [dialogueActive, setDialogueActive] = useState<boolean>(false);
  const [speakerName, setSpeakerName] = useState<string>("");
  const [dialogueLines, setDialogueLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState<number>(0);
  const [dialoguePortrait, setDialoguePortrait] = useState<number>(0);
  const [activeNpcId, setActiveNpcId] = useState<string | null>(null);

  const [showIntro, setShowIntro] = useState<boolean>(true);

  const handleTransitionMap = (mapId: GameMapId, spawnPos: Position) => {
    setCurrentMap(mapId);
    setPlayerPos(spawnPos);
  };

  const handleStartDialogue = (
    name: string,
    lines: string[],
    faceIdx: number,
    npcId: string
  ) => {
    setSpeakerName(name);
    setDialogueLines(lines);
    setCurrentLineIdx(0);
    setDialoguePortrait(faceIdx);
    setActiveNpcId(npcId);
    setDialogueActive(true);
  };

  const handleNextDialogue = () => {
    if (currentLineIdx < dialogueLines.length - 1) {
      setCurrentLineIdx((prev) => prev + 1);
    } else {
      setDialogueActive(false);
      handleDialogueCloseTriggers(activeNpcId);
      setActiveNpcId(null);
    }
  };

  const handleCloseDialogueDirectly = () => {
    setDialogueActive(false);
    handleDialogueCloseTriggers(activeNpcId);
    setActiveNpcId(null);
  };

  const handleDialogueCloseTriggers = (npcId: string | null) => {
    if (!npcId) return;

    if (npcId === "MOM" && questStep === "TALK_MOM") {
      setHasMoney(true);
      setQuestStep("GET_MEDICINE");
      audio.playQuestSuccess();
    } else if (npcId === "PHARMACIST" && questStep === "GET_MEDICINE") {
      setHasMoney(false);
      setHasMedicine(true);
      setQuestStep("RETURN_HOME");
      audio.playQuestSuccess();
    } else if (npcId === "DAD" && questStep === "RETURN_HOME") {
      setQuestStep("READ_BOOK");
      audio.playQuestSuccess();
    } else if (npcId === "LORE_BOOK" && questStep === "READ_BOOK") {
      setQuestStep("CUTSCENE");
      audio.playDreadChord();
      
      setTimeout(() => {
        setQuestStep("SISTER_VISIT");
      }, 7500);
    } else if (npcId === "SISTER" && questStep === "SISTER_VISIT") {
      audio.playDreadChord();
      setQuestStep("LOCK_THE_DOORS");
    } else if (npcId === "FRONT_DOOR_LOCKED" && questStep === "LOCK_THE_DOORS") {
      audio.playDreadChord();
      setQuestStep("WINDOW_PEER");
    } else if (npcId === "WINDOW_PEERED" && questStep === "WINDOW_PEER") {
      audio.playDreadChord();
      setQuestStep("EPILOGUE");
    }
  };

  useEffect(() => {
    const handleDialogueKeys = (e: KeyboardEvent) => {
      if (!dialogueActive) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleNextDialogue();
      }
    };
    window.addEventListener("keydown", handleDialogueKeys);
    return () => window.removeEventListener("keydown", handleDialogueKeys);
  }, [dialogueActive, dialogueLines, currentLineIdx]);

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    audio.setEnabled(nextVal);
  };

  const handleResetGame = () => {
    setCurrentMap("HOUSE_INT");
    setQuestStep("WAKE_UP");
    setPlayerPos({ x: 100, y: 155 });
    setHasMedicine(false);
    setHasMoney(false);
    setDialogueActive(false);
    setActiveNpcId(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#d1d1d1] font-mono antialiased overflow-x-hidden selection:bg-red-950 selection:text-[#ff4444] select-none pb-12 relative">
      <div id="crt-overlay" className="crt-scanlines" />

      <header className="max-w-4xl mx-auto pt-10 px-4 text-center">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 border border-zinc-900/60 bg-[#0a0a0a] flex items-center justify-center text-[#ff4444] shadow-md relative">
            <Moon className="w-5 h-5 text-amber-500 animate-wiggle" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ff4444] rounded-full animate-ping" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-sans font-bold tracking-[0.25em] text-white text-center uppercase mb-2 drop-shadow">
          Carnival's Medicine
        </h1>
        <p className="text-[10px] text-zinc-500 font-mono max-w-md mx-auto leading-relaxed uppercase tracking-widest mb-10">
          CHRONICLE_04: A top-down grimy 2D pixel adventure on a stormy winter night.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4 relative flex flex-col gap-6">
        
        <div id="canvas-aspect-frame" className="relative w-full rounded-lg bg-black shadow-2xl overflow-hidden aspect-[3/2] max-h-[500px]">
          <div className="absolute inset-x-0 top-0 h-1 bg-[#ff4444]/20 z-10 animate-pulse" />
          
          <GameCanvas
            currentMap={currentMap}
            questStep={questStep}
            setQuestStep={setQuestStep}
            playerPos={playerPos}
            setPlayerPos={setPlayerPos}
            onTransitionMap={handleTransitionMap}
            onStartDialogue={handleStartDialogue}
            activeNpcId={activeNpcId}
            hasMedicine={hasMedicine}
            setHasMedicine={setHasMedicine}
            hasMoney={hasMoney}
            setHasMoney={setHasMoney}
          />

          {dialogueActive && (
            <DialogueBox
              speakerName={speakerName}
              lines={dialogueLines}
              currentLineIndex={currentLineIdx}
              faceIndex={dialoguePortrait}
              onNext={handleNextDialogue}
              onClose={handleCloseDialogueDirectly}
            />
          )}

          {isHudOpen && (
            <GameUI
              currentMap={currentMap}
              questStep={questStep}
              hasMedicine={hasMedicine}
              hasMoney={hasMoney}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
              onResetGame={handleResetGame}
              onClose={() => setIsHudOpen(false)}
            />
          )}

          <button
            id="hud-toggle-btn"
            onClick={() => setIsHudOpen((prev) => !prev)}
            className="absolute top-3 right-3 z-50 text-[#ff4444] hover:text-white bg-black/70 p-1.5 transition-all duration-150 cursor-pointer flex items-center justify-center rounded-sm shadow-md"
            style={{ opacity: 0.4 }}
            title={isHudOpen ? "Close Systems HUD" : "Open Systems HUD"}
          >
            {isHudOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {(questStep === "EPILOGUE" || questStep === "COMPLETED") && (
            <div id="cinematic-fade-overlay" className="absolute inset-0 bg-[#040406]/98 flex flex-col items-center justify-center p-6 z-50 text-center animate-fade-in transition-all">
              <div className="max-w-md p-6 bg-[#09090b] text-center rounded-md border border-zinc-800/80 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-red-800 via-[#ff4444] to-red-800 animate-pulse" />
                
                <span className="text-[9px] font-mono tracking-[0.3em] text-[#ff4444] block mb-2 uppercase font-bold animate-pulse">COBBLESTONE EPILOGUE</span>
                <h3 className="text-xl font-sans text-white font-bold mb-4 uppercase tracking-[0.15em] drop-shadow">THE COLD CAROUSEL</h3>
                
                <div className="text-[11px] text-[#b4b4b8] font-mono tracking-tight leading-relaxed mb-6 space-y-4 text-left border-y border-zinc-900 py-4 max-h-[220px] overflow-y-auto pr-1">
                  <p className="animate-fade-in">
                    * The oak timber bolt is slid forever, but the cold continues to seep through the wood grains. Father falls into a peaceful sleep, his chest finally quiet under the damp blankets.
                  </p>
                  <p className="animate-fade-in">
                    * Eleanor will not return. Her footsteps vanished into the mud and the wet pine needles, toward the crimson wheel turning rotators in the grove. She gave her sunshine to buy your breath.
                  </p>
                  <p className="animate-fade-in">
                    * Leo sits close to sister Clara next to the flickering hearth. In the silent house, the faint, haunting rattle of Calliope keys drifts down the slate roof.
                  </p>
                  <p className="text-[#a1a1aa] italic text-center animate-fade-in pt-2">
                    "Step right up... Step right up... thomas..."
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setQuestStep("COMPLETED")}
                    className="px-5 py-2.5 border border-zinc-850 hover:border-zinc-700 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white font-mono text-[9px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    [ RE-READ ]
                  </button>
                  <button
                    onClick={handleResetGame}
                    className="px-5 py-2.5 border border-zinc-905 hover:border-[#ff4444] hover:bg-[#111] text-[#ff4444] hover:text-white font-mono text-[9px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    [ REBOOT RECORD ]
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}