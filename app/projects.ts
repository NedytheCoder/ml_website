export type Project = {
  slug: string;
  title: string;
  summary: string;
  finding?: string;
  methods: string[];
  repo: string;
};

// Hand-picked, in the order they should be read. Each slug has a case study in
// content/work/<slug>.mdx.
export const projects: Project[] = [
  {
    slug: "frequency-nadir",
    title: "Predicting frequency nadir in low-inertia grids",
    summary:
      "When a generator trips, grid frequency falls before reserves catch it. I simulated 38,412 trips on the IEEE 39-bus system and trained a transformer to predict how low frequency will go from the first milliseconds of PMU data, against LSTM, CNN, BPNN, ridge and an analytical baseline.",
    finding:
      "With 500 ms of data the transformer reached 38 mHz mean error, level with an LSTM that trained 18× faster. Its real edge was noise: at 0.01 Hz measurement noise its error was less than half the LSTM’s.",
    methods: ["PyTorch", "ANDES power system simulation", "Transformers", "Ablation studies"],
    repo: "https://github.com/NedytheCoder/transformer-early-nadir-frequency-prediction",
  },
  {
    slug: "irish-transmission-losses",
    title: "Transmission losses in Ireland’s electricity market",
    summary:
      "Transmission Loss Adjustment Factors decide how much of a generator’s output counts in Ireland’s Single Electricity Market. I mapped Irish generators, clustered their loss factors four ways, and used SHAP to explain what separates high-loss plants from low-loss ones.",
    methods: ["K-Means, DBSCAN, hierarchical, GMM", "SHAP", "Geospatial mapping"],
    repo: "https://github.com/NedytheCoder/irish-sem-unsupervised-analysis",
  },
  {
    slug: "contract-costs-materials",
    title: "Contract costs and cheaper materials",
    summary:
      "Two parts: predicting public contract costs from EU procurement (TED) records, then a decision-support pipeline that groups technically similar materials, matches World Bank commodity prices to them, and surfaces cheaper alternatives for real tenders.",
    methods: ["Model comparison", "Clustering", "Price-proxy matching"],
    repo: "https://github.com/NedytheCoder/material_cost_optimization_analysis",
  },
];
