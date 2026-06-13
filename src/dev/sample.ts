import type { SheetData } from '../types';

// Dev-only sample data. Loaded by fetchAllSheets() only when running in dev
// with no real CSV URLs configured (the dynamic import is dead-code-eliminated
// from production builds). Lets us verify rendering before the Google Sheets
// URLs exist (Spec §17).

export const SAMPLE: SheetData = {
  members: [
    {
      name_en: 'CHING-HAN CHANG', name_zh: '張靖涵', group: 'ai', status: 'current',
      degree_type: 'ms', year_joined: 2024, year_grad: null, domain: 'Medical Image',
      research_title_en: 'Deep Learning for CT Segmentation', research_title_zh: '深度學習應用於CT影像分割',
      thesis_url: '', email: 'r14631006@ntu.edu.tw', photo_filename: '',
    },
    {
      name_en: 'WEI-LUN HSU', name_zh: '許瑋倫', group: 'statistics', status: 'current',
      degree_type: 'ms', year_joined: 2025, year_grad: null, domain: 'Medical Data',
      research_title_en: 'Risk Stratification from EHR Time-series', research_title_zh: '電子病歷時序之風險分層',
      thesis_url: '', email: '', photo_filename: '',
    },
    {
      name_en: 'YU-TING LIN', name_zh: '林宇庭', group: 'ai', status: 'current',
      degree_type: 'phd', year_joined: 2022, year_grad: null, domain: 'Smart Agriculture',
      research_title_en: 'Vision-guided Robotic Pest Monitoring', research_title_zh: '視覺導引機器人蟲害監測',
      thesis_url: '', email: 'd11631001@ntu.edu.tw', photo_filename: '',
    },
    {
      name_en: 'JUN WENG', name_zh: '翁俊', group: 'ai', status: 'alumni',
      degree_type: 'ms', year_joined: 2021, year_grad: 2023, domain: 'Medical Image',
      research_title_en: 'X-ray Phase-Contrast Image Reconstruction', research_title_zh: 'X光相位對比影像重建',
      thesis_url: 'https://tdr.lib.ntu.edu.tw/example-1', email: '', photo_filename: '',
    },
    {
      name_en: 'MEI-LING KAO', name_zh: '高美玲', group: 'statistics', status: 'alumni',
      degree_type: 'phd', year_joined: 2018, year_grad: 2024, domain: 'Biosensing',
      research_title_en: 'Aptamer-Protein Binding Prediction', research_title_zh: '適體與蛋白質結合預測',
      thesis_url: 'NA', email: '', photo_filename: '',
    },
    {
      name_en: 'PEI-CHI WANG', name_zh: '王佩琪', group: 'ra', status: 'current',
      degree_type: 'ra', year_joined: 2025, year_grad: null, domain: 'NA',
      research_title_en: 'Lab Data Infrastructure', research_title_zh: '實驗室資料基礎建設',
      thesis_url: '', email: '', photo_filename: '',
    },
  ],
  publications: [
    {
      year: 2025, pub_type: 'journal', domain: 'Medical Image',
      citation: 'C.-Y. Chou, J. Weng, et al., "Phase-contrast CT reconstruction via implicit neural representation," IEEE Trans. Medical Imaging, vol. 44, no. 3, pp. 1102–1115, 2025.',
      doi: 'https://doi.org/10.1109/TMI.2025.000001',
    },
    {
      year: 2025, pub_type: 'conference', domain: 'Smart Agriculture',
      citation: 'Y.-T. Lin and C.-Y. Chou, "Real-time pest detection on edge devices for greenhouse robotics," in Proc. CVPR Workshops, 2025.',
      doi: '',
    },
    {
      year: 2024, pub_type: 'journal', domain: 'Medical Data',
      citation: 'W.-L. Hsu et al., "Early sepsis prediction from multimodal EHR using temporal attention," Nature Digital Medicine, 2024.',
      doi: 'https://doi.org/10.1038/s41746-024-00000-0',
    },
    {
      year: 2024, pub_type: 'journal', domain: 'Biosensing',
      citation: 'M.-L. Kao, C.-Y. Chou, "Aptamer screening with graph neural networks for rapid diagnostics," Biosensors and Bioelectronics, 2024.',
      doi: '',
    },
    {
      year: 2023, pub_type: 'conference', domain: 'Medical Image',
      citation: 'J. Weng, C.-Y. Chou, "Self-supervised denoising for low-dose CT," in Proc. MICCAI, 2023.',
      doi: 'https://doi.org/10.1007/978-3-031-00000-0_42',
    },
  ],
  gallery: [
    {
      date: '2026-01-15', type: 'academic', title_en: '2026 Lab Kickoff Seminar', title_zh: '2026 實驗室開春研討',
      remark: 'NA', photo_filename: '',
    },
    {
      date: '2025-12-24', type: 'extracurricular', title_en: '2025 Christmas Gathering', title_zh: '2025 聖誕聚會',
      remark: '感謝全體成員一年的努力。', photo_filename: '',
    },
    {
      date: '2025-06-10', type: 'academic', title_en: 'MICCAI Paper Celebration', title_zh: 'MICCAI 論文慶祝',
      remark: 'NA', photo_filename: '',
    },
    {
      date: '2024-09-01', type: 'academic', title_en: 'New Members Orientation', title_zh: '新生迎新',
      remark: '歡迎三位新成員加入。', photo_filename: '',
    },
  ],
};
