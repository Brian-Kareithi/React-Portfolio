"use client";
import { useEffect, useRef } from "react";

export interface LineWavesOptions {
  speed?: number;
  innerLineCount?: number;
  outerLineCount?: number;
  warpIntensity?: number;
  rotation?: number;
  edgeFadeWidth?: number;
  colorCycleSpeed?: number;
  brightness?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
}

const vertexShaderSrc = `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fragmentShaderSrc = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uSpeed;
  uniform float uInnerLines;
  uniform float uOuterLines;
  uniform float uWarpIntensity;
  uniform float uRotation;
  uniform float uEdgeFadeWidth;
  uniform float uColorCycleSpeed;
  uniform float uBrightness;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  uniform bool uEnableMouse;

  #define HALF_PI 1.5707963

  float hashF(float n) {
    return fract(sin(n * 127.1) * 43758.5453123);
  }

  float smoothNoise(float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(hashF(i), hashF(i + 1.0), u);
  }

  float displaceA(float coord, float t) {
    float result = sin(coord * 2.123) * 0.2;
    result += sin(coord * 3.234 + t * 4.345) * 0.1;
    result += sin(coord * 0.589 + t * 0.934) * 0.5;
    return result;
  }

  float displaceB(float coord, float t) {
    float result = sin(coord * 1.345) * 0.3;
    result += sin(coord * 2.734 + t * 3.345) * 0.2;
    result += sin(coord * 0.189 + t * 0.934) * 0.3;
    return result;
  }

  vec2 rotate2D(vec2 p, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
  }

  void main() {
    vec2 coords = gl_FragCoord.xy / uResolution;
    coords = coords * 2.0 - 1.0;
    coords.x *= uResolution.x / uResolution.y;
    coords = rotate2D(coords, uRotation);

    float halfT = uTime * uSpeed * 0.5;
    float fullT = uTime * uSpeed;

    float mouseWarp = 0.0;
    if (uEnableMouse) {
      vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, uRotation);
      mPos.x *= uResolution.x / uResolution.y;
      float mDist = length(coords - mPos);
      mouseWarp = uMouseInfluence * exp(-mDist * mDist * 4.0);
    }

    float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
    float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
    float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
    float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

    vec2 fieldA = vec2(warpAx, warpAy);
    vec2 fieldB = vec2(warpBx, warpBy);
    vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));

    float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
    float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
    float vMask = 1.0 - max(fadeTop, fadeBottom);

    float tileCount = mix(uOuterLines, uInnerLines, vMask);
    float scaledY = blended.y * tileCount;
    float nY = smoothNoise(abs(scaledY));

    float ridge = pow(
      step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)),
      5.0
    );

    float lines = 0.0;
    for (float i = 1.0; i < 3.0; i += 1.0) {
      lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
    }

    float pattern = vMask * lines;

    float cycleT = fullT * uColorCycleSpeed;
    float rChannel = (pattern + lines * ridge) * (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
    float gChannel = (pattern + vMask * ridge) * (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
    float bChannel = (pattern + lines * ridge) * (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);

    vec3 col = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;
    float alpha = clamp(length(col), 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
  }
`;

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

export default function LineWaves(options: LineWavesOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const {
      speed = 0.3,
      innerLineCount = 32.0,
      outerLineCount = 36.0,
      warpIntensity = 1.0,
      rotation = -45,
      edgeFadeWidth = 0.0,
      colorCycleSpeed = 1.0,
      brightness = 0.8,
      color1 = "#005a32",
      color2 = "#005a32",
      color3 = "#005a32",
      enableMouseInteraction = true,
      mouseInfluence = 2.0,
    } = options;

    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:100%;display:block;";
    container.appendChild(canvas);

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) {
      container.removeChild(canvas);
      return;
    }

    function createShader(
      ctx: WebGLRenderingContext,
      type: number,
      source: string
    ) {
      const shader = ctx.createShader(type);
      if (!shader) return null;
      ctx.shaderSource(shader, source);
      ctx.compileShader(shader);
      if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
        console.error("Shader compile error:", ctx.getShaderInfoLog(shader));
        ctx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
    if (!vs || !fs) {
      container.removeChild(canvas);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      container.removeChild(canvas);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      container.removeChild(canvas);
      return;
    }
    gl.useProgram(program);

    const quadVerts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uResLoc = gl.getUniformLocation(program, "uResolution");
    const uSpeedLoc = gl.getUniformLocation(program, "uSpeed");
    const uInnerLoc = gl.getUniformLocation(program, "uInnerLines");
    const uOuterLoc = gl.getUniformLocation(program, "uOuterLines");
    const uWarpLoc = gl.getUniformLocation(program, "uWarpIntensity");
    const uRotLoc = gl.getUniformLocation(program, "uRotation");
    const uFadeLoc = gl.getUniformLocation(program, "uEdgeFadeWidth");
    const uCycleLoc = gl.getUniformLocation(program, "uColorCycleSpeed");
    const uBrightLoc = gl.getUniformLocation(program, "uBrightness");
    const uC1Loc = gl.getUniformLocation(program, "uColor1");
    const uC2Loc = gl.getUniformLocation(program, "uColor2");
    const uC3Loc = gl.getUniformLocation(program, "uColor3");
    const uMouseLoc = gl.getUniformLocation(program, "uMouse");
    const uMouseInfLoc = gl.getUniformLocation(program, "uMouseInfluence");
    const uEnableMouseLoc = gl.getUniformLocation(program, "uEnableMouse");

    const rotRad = (rotation * Math.PI) / 180;
    gl.uniform1f(uSpeedLoc, speed);
    gl.uniform1f(uInnerLoc, innerLineCount);
    gl.uniform1f(uOuterLoc, outerLineCount);
    gl.uniform1f(uWarpLoc, warpIntensity);
    gl.uniform1f(uRotLoc, rotRad);
    gl.uniform1f(uFadeLoc, edgeFadeWidth);
    gl.uniform1f(uCycleLoc, colorCycleSpeed);
    gl.uniform1f(uBrightLoc, brightness);
    gl.uniform3fv(uC1Loc, hexToVec3(color1));
    gl.uniform3fv(uC2Loc, hexToVec3(color2));
    gl.uniform3fv(uC3Loc, hexToVec3(color3));
    gl.uniform1f(uMouseInfLoc, mouseInfluence);
    gl.uniform1i(uEnableMouseLoc, enableMouseInteraction ? 1 : 0);

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse = [
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height,
      ];
    };

    const handleMouseLeave = () => {
      targetMouse = [0.5, 0.5];
    };

    if (enableMouseInteraction) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    const resize = () => {
      const w = container.clientWidth || container.offsetWidth || window.innerWidth;
      const h = container.clientHeight || container.offsetHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uResLoc, w, h);
    };

    window.addEventListener("resize", resize);

    let animationFrameId: number;

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      gl.uniform1f(uTimeLoc, time * 0.001);

      if (enableMouseInteraction) {
        currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
        gl.uniform2f(uMouseLoc, currentMouse[0], currentMouse[1]);
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    requestAnimationFrame(() => {
      resize();
      animationFrameId = requestAnimationFrame(render);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (enableMouseInteraction) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
    // Options are intentionally read once at mount; the canvas is rebuilt on
    // unmount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="line-waves-container" aria-hidden="true" />;
}
