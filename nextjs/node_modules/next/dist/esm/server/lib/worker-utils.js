import * as Log from "../../build/output/log";
export const genRenderExecArgv = ()=>{
    var ref4, ref1;
    const isDebugging = process.execArgv.some((localArg)=>localArg.startsWith("--inspect")) || ((ref4 = process.env.NODE_OPTIONS) == null ? void 0 : ref4.match == null ? void 0 : ref4.match(/--inspect(=\S+)?( |$)/));
    const isDebuggingWithBrk = process.execArgv.some((localArg)=>localArg.startsWith("--inspect-brk")) || ((ref1 = process.env.NODE_OPTIONS) == null ? void 0 : ref1.match == null ? void 0 : ref1.match(/--inspect-brk(=\S+)?( |$)/));
    const debugPort = (()=>{
        var ref, ref2, ref3;
        const debugPortStr = ((ref = process.execArgv.find((localArg)=>localArg.startsWith("--inspect") || localArg.startsWith("--inspect-brk"))) == null ? void 0 : ref.split("=")[1]) ?? ((ref2 = process.env.NODE_OPTIONS) == null ? void 0 : ref2.match == null ? void 0 : (ref3 = ref2.match(/--inspect(-brk)?(=(\S+))?( |$)/)) == null ? void 0 : ref3[3]);
        return debugPortStr ? parseInt(debugPortStr, 10) : 9229;
    })();
    if (isDebugging || isDebuggingWithBrk) {
        Log.warn(`the --inspect${isDebuggingWithBrk ? "-brk" : ""} option was detected, the Next.js server should be inspected at port ${debugPort + 1}.`);
    }
    const execArgv = process.execArgv.filter((localArg)=>{
        return !localArg.startsWith("--inspect") && !localArg.startsWith("--inspect-brk");
    });
    if (isDebugging || isDebuggingWithBrk) {
        execArgv.push(`--inspect${isDebuggingWithBrk ? "-brk" : ""}=${debugPort + 1}`);
    }
    return execArgv;
};

//# sourceMappingURL=worker-utils.js.map