export function BlurBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-[40vh] left-[20vw] w-[500px] h-[500px] rounded-full bg-purple-400/30 blur-[100px]" />
      <div className="absolute top-[20vh] -right-[20vw] w-[600px] h-[600px] rounded-full bg-blue-400/30 blur-[100px]" />
      <div className="absolute bottom-[10vh] left-[15vw] w-[400px] h-[400px] rounded-full bg-pink-400/20 blur-[100px]" />
    </div>
  );
}
