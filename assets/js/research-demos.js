/* Self-contained teaching illustrations. No research data or simulator calls. */
(() => {
  "use strict";
  const zh = document.documentElement.lang === "zh-CN";
  const translations = {
    "Parent geometries": "亲本几何",
    "Select a rectangle": "选择交叉矩形",
    "Exchange the block": "交换子矩阵",
    "Apply a small mutation": "施加少量变异",
    "Parent A": "亲本 A",
    "Parent B": "亲本 B",
    Child: "子代",
    "Filled = metal": "填充 = 金属",
    "Empty = no metal": "空白 = 无金属",
    "Dashed box = crossover region": "虚线框 = 交叉区域",
    Previous: "上一步",
    "Next step": "下一步",
    "New rectangle": "更换矩形",
    Reset: "重置",
    "Play steps": "播放步骤",
    Pause: "暂停",
    "The child starts with Parent A.": "子代从亲本 A 开始。",
    "A 4 × 4 region is selected in both parents.": "在两个亲本中选择同一块 4 × 4 的区域。",
    "The child inherits the selected region from Parent B, preserving the block's spatial pattern.":
      "子代继承亲本 B 的选定区域，保留该子矩阵的空间模式。",
    "One cell is flipped. The new geometry still needs an EM evaluation.": "翻转一个像素，新几何仍需电磁仿真验证。",
    "two binary parents and their child": "两个二进制亲本及其子代",
    "Normalized design parameter": "归一化设计参数",
    "Normalized cost (lower is better)": "归一化成本（越低越好）",
    "Prediction · ±1.96σ band · Evaluations": "预测曲线 · ±1.96σ 阴影 · 评估点",
    "Gaussian-process prediction and uncertainty after": "高斯过程预测与不确定性，已完成",
    "synthetic evaluations": "次合成评估",
    Evaluations: "评估次数",
    "Evaluate next": "评估下一点",
    "Reveal synthetic landscape": "显示合成目标函数",
    "evaluations · best observed cost": "次评估 · 当前最佳成本",
    "The next candidate minimizes a lower confidence bound, combining predicted cost and uncertainty.":
      "下一候选点通过最小化下置信界，将预测成本与不确定性结合起来。",
    "Sequence complete. Replay to see how each evaluation updates the model.": "采样完成，可重放以观察每次评估如何更新模型。",
    "This teaching surrogate is a Gaussian process, not the paper's BNN.": "教学示例使用高斯过程；论文使用的是贝叶斯神经网络。",
    "Synthetic day": "合成数据天数",
    "Predicted anomaly count": "预测异常数量",
    "Alarm at count ≥": "告警条件：计数 ≥",
    "Background λ": "背景率 λ",
    "False-alarm level α": "误报水平 α",
    "Background rate λ": "背景率 λ",
    "one-sided α": "单侧 α",
    "Alarm when count ≥": "计数达到以下阈值时告警：",
    "First crossing: synthetic day": "首次越过阈值：合成数据第",
    "No alarm in these 28 synthetic days.": "这 28 天合成数据中未触发告警。",
    "A lower α requires stronger evidence.": "较小的 α 需要更强的证据。",
    "The test assumes a fixed Poisson background rate.": "检验假设背景符合固定参数的泊松分布。",
    "Synthetic anomaly counts and a Poisson alarm threshold of": "合成异常计数与泊松告警阈值",
    Describe: "描述",
    Parameterize: "参数化",
    Build: "建模",
    Refine: "改进",
    "Next stage": "下一阶段",
    "Workflow stages": "工作流阶段",
    Input: "输入",
    Output: "输出",
    "Engineering check": "工程检查",
    "Text, figures, and a reference design": "文字、图片与参考设计",
    "A structured antenna description": "结构化天线描述",
    "Check topology, coordinate conventions, and missing dimensions.": "检查拓扑、坐标约定与缺失尺寸。",
    "Reviewed geometry and design intent": "已审查的几何与设计意图",
    "Dimensions, materials, and named parameters": "尺寸、材料与命名参数",
    "Check units, dependencies, and physical geometry constraints.": "检查单位、参数依赖与物理几何约束。",
    "Parameters and simulator-specific instructions": "参数与仿真器专用指令",
    "CST VBA or HFSS / PyAEDT modeling artifacts": "CST VBA 或 HFSS / PyAEDT 建模文件",
    "Inspect the script and validate geometry, excitations, boundaries, and mesh in the simulator.":
      "检查脚本，并在仿真器中验证几何、激励、边界条件与网格。",
    "Simulation feedback and engineer review": "仿真反馈与工程师审查",
    "Revised model or an optimization configuration": "改进后的模型或优化配置",
    "Check design ranges, objectives, constraints, and simulated performance. Optimization belongs to the wider LADS workflow.":
      "检查设计范围、目标、约束与仿真性能。优化属于完整的 LADS 工作流。",
    "Engineer review connects each stage to the next.": "工程师审查连接相邻阶段。",
    "Normalized frequency (illustrative)": "归一化频率（原理示意）",
    "Normalized transmission": "归一化传输",
    Tuning: "调谐参数",
    "Normalized tuning": "归一化调谐",
    "All three schematic passbands shift": "三个示意通带一起移动",
    "to the reference position": "至参考位置",
    "toward higher normalized frequency": "至更高的归一化频率",
    "toward lower normalized frequency": "至更低的归一化频率",
    "This illustration has no temperature or GHz calibration.": "本图没有温度或 GHz 标定。",
    "Three illustrative photonic passbands shifted by normalized tuning": "三个光子通带的归一化调谐示意，参数为",
  };
  const localize = (text) => {
    if (!zh) return text;
    let result = String(text)
      .replace(/Step (\d)\/4 — /g, "第 $1/4 步 — ")
      .replace(/Stage (\d)\/4: /g, "第 $1/4 阶段：");
    Object.entries(translations)
      .sort((a, b) => b[0].length - a[0].length)
      .forEach(([en, cn]) => {
        result = result.replaceAll(en, cn);
      });
    return result;
  };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let nextId = 0;
  const svg = (body, label, height = 280, width = 660) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${localize(label)}">${localize(body)}</svg>`;
  const button = (parent, label, action) => {
    const element = document.createElement("button");
    element.type = "button";
    element.textContent = localize(label);
    element.addEventListener("click", action);
    parent.append(element);
    return element;
  };
  const range = (parent, labelText, min, max, value, action, step = 1) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const output = document.createElement("output");
    input.id = `demo-control-${++nextId}`;
    input.type = "range";
    input.min = min;
    input.max = max;
    input.step = step;
    input.value = value;
    output.htmlFor = input.id;
    label.htmlFor = input.id;
    output.value = value;
    label.append(`${localize(labelText)} `, input, output);
    input.addEventListener("input", () => {
      output.value = input.value;
      action(Number(input.value));
    });
    parent.append(label);
    return input;
  };
  const playback = (root, controls, advance) => {
    let timer;
    const stop = () => {
      clearInterval(timer);
      timer = null;
      play.textContent = localize("Play steps");
      play.setAttribute("aria-pressed", "false");
    };
    const play = button(controls, "Play steps", () => {
      if (timer) {
        stop();
        return;
      }
      if (reducedMotion.matches) {
        advance();
        return;
      }
      play.textContent = localize("Pause");
      play.setAttribute("aria-pressed", "true");
      timer = setInterval(() => {
        if (!advance()) stop();
      }, 1200);
    });
    play.setAttribute("aria-pressed", "false");
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
    });
    reducedMotion.addEventListener("change", stop);
    if ("IntersectionObserver" in window)
      new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) stop();
      }).observe(root);
    return stop;
  };
  const plotFrame = (xLabel, yLabel) => {
    let body = "";
    for (let i = 0; i <= 4; i++) {
      const y = 35 + i * 45;
      body += `<line class="demo-grid" x1="52" y1="${y}" x2="635" y2="${y}"/>`;
    }
    return (
      body +
      `<line class="demo-grid" x1="52" y1="35" x2="52" y2="215"/><text x="52" y="20">${yLabel}</text><text x="330" y="264" text-anchor="middle">${xLabel}</text>`
    );
  };
  const path = (points) => points.map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  function pixels(root, view, controls, status) {
    let stage = 0,
      variant = 0;
    const names = ["Parent geometries", "Select a rectangle", "Exchange the block", "Apply a small mutation"];
    const parent = (which) =>
      Array.from({ length: 100 }, (_, index) => {
        const r = Math.floor(index / 10),
          c = index % 10;
        return which === 0
          ? c === 4 || c === 5 || ((r === 2 || r === 7) && c > 1 && c < 8)
          : r === 4 || r === 5 || ((c === 2 || c === 7) && r > 1 && r < 8);
      });
    const render = () => {
      const a = parent(0),
        b = parent(1),
        row = 1 + (variant % 3),
        col = 1 + ((variant * 2) % 4);
      const child = a.map((value, index) => {
        const r = Math.floor(index / 10),
          c = index % 10;
        return stage >= 2 && r >= row && r < row + 4 && c >= col && c < col + 4 ? b[index] : value;
      });
      const mutation = (variant * 17 + 86) % 100;
      if (stage === 3) child[mutation] = !child[mutation];
      const compact = view.clientWidth < 480;
      const cell = compact ? 12 : 15;
      let body = "";
      [a, b, child].forEach((grid, gridIndex) => {
        const ox = compact ? [30, 210, 120][gridIndex] : 35 + gridIndex * 217;
        const oy = compact && gridIndex === 2 ? 205 : 40;
        body += `<text x="${ox + cell * 5}" y="${oy - 18}" text-anchor="middle" style="font-size:${compact ? 16 : 12}px">${
          ["Parent A", "Parent B", "Child"][gridIndex]
        }</text>`;
        grid.forEach((metal, index) => {
          const x = ox + (index % 10) * cell,
            y = oy + Math.floor(index / 10) * cell;
          body += `<rect x="${x}" y="${y}" width="${cell - 2}" height="${cell - 2}" fill="${
            metal ? "var(--research-accent)" : "var(--global-bg-color)"
          }" stroke="var(--research-border)"/>`;
        });
        if (stage >= 1)
          body += `<rect class="demo-highlight" x="${ox + col * cell - 2}" y="${oy + row * cell - 2}" width="${cell * 4 + 2}" height="${
            cell * 4 + 2
          }"/>`;
        if (gridIndex === 2 && stage === 3)
          body += `<circle class="demo-highlight" cx="${ox + (mutation % 10) * cell + cell / 2 - 1}" cy="${
            oy + Math.floor(mutation / 10) * cell + cell / 2 - 1
          }" r="${cell / 2 + 2}"/>`;
      });
      body += compact
        ? '<text x="180" y="355" text-anchor="middle" style="font-size:14px">Filled = metal · Empty = no metal</text><text x="180" y="376" text-anchor="middle" style="font-size:14px">Dashed box = crossover region</text>'
        : '<text x="330" y="222" text-anchor="middle">Filled = metal · Empty = no metal · Dashed box = crossover region</text>';
      view.innerHTML = svg(body, `${names[stage]}: two binary parents and their child`, compact ? 395 : 245, compact ? 360 : 660);
      status.textContent = localize(
        `Step ${stage + 1}/4 — ${names[stage]}. ${
          [
            "The child starts with Parent A.",
            "A 4 × 4 region is selected in both parents.",
            "The child inherits the selected region from Parent B, preserving the block's spatial pattern.",
            "One cell is flipped. The new geometry still needs an EM evaluation.",
          ][stage]
        }`
      );
      previous.disabled = stage === 0;
      next.disabled = stage === 3;
    };
    window.addEventListener("resize", render);
    root.closest("details")?.addEventListener("toggle", render);
    const previous = button(controls, "Previous", () => {
      stop();
      stage = Math.max(0, stage - 1);
      render();
    });
    const next = button(controls, "Next step", () => {
      stop();
      stage = Math.min(3, stage + 1);
      render();
    });
    button(controls, "New rectangle", () => {
      stop();
      variant++;
      stage = 1;
      render();
    });
    button(controls, "Reset", () => {
      stop();
      stage = 0;
      variant = 0;
      render();
    });
    const stop = playback(root, controls, () => {
      if (stage === 3) return false;
      stage++;
      render();
      return stage < 3;
    });
    render();
  }
  // Gaussian-process teaching surrogate, not E-GASPAD's BNN.
  const objective = (x) => 0.5 + 0.23 * Math.sin(11 * x) + 0.17 * Math.cos(21 * x) + 0.12 * x;
  const kernel = (a, b) => 0.25 * Math.exp(-0.5 * ((a - b) / 0.14) ** 2);
  function solve(matrix, rhs) {
    const a = matrix.map((row, i) => [...row, rhs[i]]),
      n = rhs.length;
    for (let i = 0; i < n; i++) {
      let pivot = i;
      for (let j = i + 1; j < n; j++) if (Math.abs(a[j][i]) > Math.abs(a[pivot][i])) pivot = j;
      [a[i], a[pivot]] = [a[pivot], a[i]];
      const divisor = a[i][i];
      for (let k = i; k <= n; k++) a[i][k] /= divisor;
      for (let j = 0; j < n; j++) {
        if (j === i) continue;
        const factor = a[j][i];
        for (let k = i; k <= n; k++) a[j][k] -= factor * a[i][k];
      }
    }
    return a.map((row) => row[n]);
  }
  function model(samples) {
    const matrix = samples.map((a, i) => samples.map((b, j) => kernel(a, b) + (i === j ? 0.0001 : 0)));
    const weights = solve(
      matrix,
      samples.map((x) => objective(x) - 0.5)
    );
    return (x) => {
      const k = samples.map((s) => kernel(x, s)),
        varianceWeights = solve(matrix, k);
      const mean = 0.5 + k.reduce((sum, value, i) => sum + value * weights[i], 0);
      const sd = Math.sqrt(Math.max(0, kernel(x, x) - k.reduce((sum, value, i) => sum + value * varianceWeights[i], 0)));
      return { mean, sd };
    };
  }
  function surrogate(root, view, controls, status) {
    let count = 3;
    const samples = [0.08, 0.45, 0.88];
    while (samples.length < 12) {
      const predict = model(samples);
      let bestX = 0,
        bestScore = Infinity;
      for (let i = 0; i <= 120; i++) {
        const x = i / 120;
        if (samples.some((s) => Math.abs(s - x) < 0.015)) continue;
        const { mean, sd } = predict(x),
          score = mean - 1.6 * sd;
        if (score < bestScore) {
          bestScore = score;
          bestX = x;
        }
      }
      samples.push(bestX);
    }
    const xScale = (x) => 52 + x * 583;
    const yScale = (y) => 215 - ((Math.max(-0.6, Math.min(1.4, y)) + 0.6) / 2) * 180;
    const render = () => {
      slider.value = count;
      slider.nextElementSibling.value = count;
      const evaluated = samples.slice(0, count),
        predict = model(evaluated);
      const grid = Array.from({ length: 121 }, (_, i) => {
        const x = i / 120;
        return { x, ...predict(x) };
      });
      let body = plotFrame("Normalized design parameter", "Normalized cost (lower is better)");
      const upper = grid.map(({ x, mean, sd }) => [xScale(x), yScale(mean + 1.96 * sd)]);
      const lower = [...grid].reverse().map(({ x, mean, sd }) => [xScale(x), yScale(mean - 1.96 * sd)]);
      body += `<path class="demo-band" d="${path([...upper, ...lower])} Z"/><path class="demo-line" d="${path(
        grid.map(({ x, mean }) => [xScale(x), yScale(mean)])
      )}"/>`;
      if (truth.checked) body += `<path class="demo-truth" d="${path(grid.map(({ x }) => [xScale(x), yScale(objective(x))]))}"/>`;
      evaluated.forEach((x) => {
        body += `<circle class="demo-point" cx="${xScale(x)}" cy="${yScale(objective(x))}" r="4.5"/>`;
      });
      body += '<text x="52" y="237">0</text><text x="635" y="237" text-anchor="end">1</text>';
      body += '<text x="340" y="20">Prediction · ±1.96σ band · Evaluations</text>';
      view.innerHTML = svg(body, `Gaussian-process prediction and uncertainty after ${count} synthetic evaluations`);
      const best = Math.min(...evaluated.map(objective));
      status.textContent = localize(
        `${count} evaluations · best observed cost ${best.toFixed(3)}. ${
          count < 12
            ? "The next candidate minimizes a lower confidence bound, combining predicted cost and uncertainty."
            : "Sequence complete. Replay to see how each evaluation updates the model."
        } This teaching surrogate is a Gaussian process, not the paper's BNN.`
      );
      next.disabled = count === 12;
    };
    const slider = range(controls, "Evaluations", 3, 12, 3, (value) => {
      stop();
      count = value;
      render();
    });
    const next = button(controls, "Evaluate next", () => {
      stop();
      count = Math.min(12, count + 1);
      render();
    });
    button(controls, "Reset", () => {
      stop();
      count = 3;
      render();
    });
    const label = document.createElement("label"),
      truth = document.createElement("input");
    truth.type = "checkbox";
    truth.addEventListener("change", render);
    label.append(truth, localize("Reveal synthetic landscape"));
    controls.append(label);
    const stop = playback(root, controls, () => {
      if (count === 12) return false;
      count++;
      render();
      return count < 12;
    });
    render();
  }
  // Smallest integer k with P(Poisson(lambda) >= k) <= alpha.
  function poissonThreshold(lambda, alpha) {
    let probability = Math.exp(-lambda),
      cumulative = probability,
      k = 1;
    while (1 - cumulative > alpha && k < 200) {
      probability *= lambda / k;
      cumulative += probability;
      k++;
    }
    return k;
  }
  function alarm(root, view, controls, status) {
    let lambda = 3,
      alpha = 0.01;
    const counts = [2, 3, 1, 4, 2, 3, 2, 4, 1, 3, 4, 2, 3, 5, 4, 6, 5, 7, 9, 7, 10, 11, 8, 12, 13, 10, 15, 16];
    const render = () => {
      const threshold = poissonThreshold(lambda, alpha),
        max = Math.max(threshold + 2, 18),
        y = (value) => 215 - (value / max) * 180;
      let body = plotFrame("Synthetic day", "Predicted anomaly count");
      counts.forEach((count, index) => {
        body += `<rect class="${count >= threshold ? "demo-alert" : "demo-point"}" x="${58 + index * 20.6}" y="${y(count)}" width="13" height="${
          215 - y(count)
        }"/>`;
      });
      body += `<line class="demo-highlight" x1="52" y1="${y(threshold)}" x2="635" y2="${y(threshold)}"/><text x="630" y="${Math.max(
        30,
        y(threshold) - 8
      )}" text-anchor="end">Alarm at count ≥ ${threshold}</text>`;
      body += '<text x="52" y="237">1</text><text x="635" y="237" text-anchor="end">28</text>';
      view.innerHTML = svg(body, `Synthetic anomaly counts and a Poisson alarm threshold of ${threshold}`);
      const first = counts.findIndex((count) => count >= threshold);
      status.textContent = localize(
        `Background rate λ = ${lambda}; one-sided α = ${alpha}. Alarm when count ≥ ${threshold}. ${
          first < 0 ? "No alarm in these 28 synthetic days." : `First crossing: synthetic day ${first + 1}.`
        } A lower α requires stronger evidence. The test assumes a fixed Poisson background rate.`
      );
    };
    range(controls, "Background λ", 1, 12, lambda, (value) => {
      lambda = value;
      render();
    });
    const label = document.createElement("label"),
      select = document.createElement("select");
    label.append(localize("False-alarm level α") + " ");
    [0.05, 0.01, 0.001].forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      option.selected = value === alpha;
      select.append(option);
    });
    select.addEventListener("change", () => {
      alpha = Number(select.value);
      render();
    });
    label.append(select);
    controls.append(label);
    render();
  }
  function workflow(root, view, controls, status) {
    let current = 0;
    const stages = [
      {
        name: "Describe",
        input: "Text, figures, and a reference design",
        output: "A structured antenna description",
        check: "Check topology, coordinate conventions, and missing dimensions.",
      },
      {
        name: "Parameterize",
        input: "Reviewed geometry and design intent",
        output: "Dimensions, materials, and named parameters",
        check: "Check units, dependencies, and physical geometry constraints.",
      },
      {
        name: "Build",
        input: "Parameters and simulator-specific instructions",
        output: "CST VBA or HFSS / PyAEDT modeling artifacts",
        check: "Inspect the script and validate geometry, excitations, boundaries, and mesh in the simulator.",
      },
      {
        name: "Refine",
        input: "Simulation feedback and engineer review",
        output: "Revised model or an optimization configuration",
        check: "Check design ranges, objectives, constraints, and simulated performance. Optimization belongs to the wider LADS workflow.",
      },
    ];
    const stageList = document.createElement("div");
    stageList.className = "workflow-stages";
    const details = document.createElement("dl");
    details.className = "workflow-detail";
    const tabs = stages.map((stage, index) =>
      button(stageList, `${index + 1}. ${stage.name}`, () => {
        stop();
        current = index;
        render();
      })
    );
    stageList.setAttribute("role", "group");
    stageList.setAttribute("aria-label", localize("Workflow stages"));
    view.append(stageList, details);
    const render = () => {
      tabs.forEach((tab, index) => tab.setAttribute("aria-pressed", String(index === current)));
      details.replaceChildren();
      const stage = stages[current];
      [
        ["Input", stage.input],
        ["Output", stage.output],
        ["Engineering check", stage.check],
      ].forEach(([name, value]) => {
        const dt = document.createElement("dt"),
          dd = document.createElement("dd");
        dt.textContent = localize(name);
        dd.textContent = localize(value);
        details.append(dt, dd);
      });
      status.textContent = localize(`Stage ${current + 1}/4: ${stage.name}. Engineer review connects each stage to the next.`);
      next.disabled = current === 3;
    };
    const next = button(controls, "Next stage", () => {
      stop();
      current = Math.min(3, current + 1);
      render();
    });
    button(controls, "Reset", () => {
      stop();
      current = 0;
      render();
    });
    const stop = playback(root, controls, () => {
      if (current === 3) return false;
      current++;
      render();
      return current < 3;
    });
    render();
  }
  function filter(root, view, controls, status) {
    let tuning = 0;
    const render = () => {
      const shift = (tuning / 100) * 0.09;
      const response = (x) => [0.2, 0.48, 0.76].reduce((sum, center) => sum + 0.86 * Math.exp(-0.5 * ((x - center - shift) / 0.035) ** 2), 0.03);
      const points = Array.from({ length: 181 }, (_, i) => {
        const x = i / 180;
        return [52 + x * 583, 215 - response(x) * 180];
      });
      let body = plotFrame("Normalized frequency (illustrative)", "Normalized transmission");
      body += `<path class="demo-band" d="${path([[52, 215], ...points, [635, 215]])} Z"/><path class="demo-line" d="${path(points)}"/>`;
      [0.2, 0.48, 0.76].forEach((center) => {
        const x = 52 + (center + shift) * 583;
        body += `<line class="demo-truth" x1="${x}" y1="45" x2="${x}" y2="215"/>`;
      });
      body += '<text x="52" y="237">0</text><text x="635" y="237" text-anchor="end">1</text>';
      view.innerHTML = svg(body, `Three illustrative photonic passbands shifted by normalized tuning ${tuning}`);
      status.textContent = localize(
        `Normalized tuning: ${tuning}. All three schematic passbands shift ${
          tuning === 0 ? "to the reference position" : tuning > 0 ? "toward higher normalized frequency" : "toward lower normalized frequency"
        }. This illustration has no temperature or GHz calibration.`
      );
    };
    const slider = range(controls, "Tuning", -100, 100, 0, (value) => {
      tuning = value;
      render();
    });
    button(controls, "Reset", () => {
      tuning = 0;
      slider.value = 0;
      slider.nextElementSibling.value = 0;
      render();
    });
    render();
  }
  const demos = { pixels, surrogate, alarm, workflow, filter };
  document.querySelectorAll("[data-demo]").forEach((root) => {
    const init = demos[root.dataset.demo];
    if (init)
      init(root, root.querySelector("[data-demo-view]"), root.querySelector("[data-demo-controls]"), root.querySelector("[data-demo-status]"));
  });
})();
