import type { Domain } from '../types';

// Language-independent structured content (Spec §6, §8, §11).
// Each record carries both languages; components render the active one.
// PI bio is static here per README §10 (not in Google Sheets).

export interface BiPair {
  en: string;
  zh: string;
}

export interface EducationEntry {
  years: string;
  role: BiPair;
  institution: BiPair; // institution.en === '' -> omit line
}

export interface InterestTag {
  label: BiPair;
  domain: Exclude<Domain, 'NA'>;
}

export const PI = {
  photo: 'chou-cheng-ying.png',
  name: { en: 'Prof. Cheng-Ying Chou', zh: '周呈霙 教授' } as BiPair,
  dept: {
    en: 'Department of Biomechatronics Engineering, NTU',
    zh: '國立臺灣大學　生物機電工程學系',
  } as BiPair,
  jointAppointments: [
    {
      en: 'Master Program in Statistics',
      zh: '統計碩士學位學程',
    },
    {
      en: 'Medical Devices and Imaging System',
      zh: '醫療器材與醫學影像研究所',
    },
    {
      en: 'Global Undergraduate Program in Semiconductors',
      zh: '國際半導體學士學位學程',
    },
  ] as BiPair[],
  education: [
    {
      years: '2000–2005',
      role: { en: 'Ph.D., Chemical Engineering', zh: '化學工程博士' },
      institution: { en: 'Rice University', zh: '萊斯大學' },
    },
    {
      years: '2005–2007',
      role: { en: 'Senior Research Scientist', zh: '資深研究員' },
      institution: {
        en: 'Illinois Institute of Technology, Biomedical Engineering',
        zh: '伊黎諾理工學院，生物醫學工程系',
      },
    },
    {
      years: '2007–present',
      role: {
        en: 'Professor, NTU Biomechatronics Engineering',
        zh: '教授，國立臺灣大學生物機電工程學系',
      },
      institution: { en: '', zh: '' },
    },
  ] as EducationEntry[],
  interests: [
    {
      label: { en: 'Medical Imaging AI', zh: '醫療影像AI技術開發' },
      domain: 'Medical Image',
    },
    {
      label: { en: 'X-ray Phase Contrast Imaging', zh: 'X光相位對比成像' },
      domain: 'Medical Image',
    },
    {
      label: { en: 'CT Image Reconstruction', zh: '電腦斷層掃描影像重建' },
      domain: 'Medical Image',
    },
    {
      label: { en: 'Agricultural AI Applications', zh: '人工智慧之農業應用' },
      domain: 'Smart Agriculture',
    },
    {
      label: { en: 'Rapid Diagnostic Kit Development', zh: '快篩檢測試劑研發' },
      domain: 'Biosensing',
    },
  ] as InterestTag[],
  courses: [
    {
      en: 'Experimental Design and Analysis in Engineering',
      zh: '試驗設計之工程應用',
    },
    { en: 'Probability and Statistics', zh: '機率與統計' },
    {
      en: 'Exploratory Multivariate Data Analysis',
      zh: '探索式多變量資料分析',
    },
  ] as BiPair[],
  contact: {
    tel: '+886-2-3366-9689',
    fax: '+886-2-2362-7620',
    email: 'chengying@ntu.edu.tw',
  },
};

// Research page domain descriptions (Spec §8). ZH pending (Spec §17) — when
// zh is '', the render falls back to en.
export const DOMAIN_DESCRIPTIONS: Record<Exclude<Domain, 'NA'>, BiPair> = {
  'Medical Image': {
    en: 'We develop computational methods for CT reconstruction, X-ray phase-contrast imaging, PET, and AI-assisted diagnosis — fusing imaging data with clinical records for multimodal insight.',
    zh: '',
  },
  'Smart Agriculture': {
    en: 'AIoT systems integrating computer vision with robotic control for precision farming — pest monitoring, crop yield prediction, and honeybee behaviour analysis.',
    zh: '',
  },
  'Medical Data': {
    en: 'Statistical and machine learning methods applied to electronic health records, clinical time-series, and multimodal patient data for early disease prediction and risk stratification.',
    zh: '',
  },
  Biosensing: {
    en: 'Rapid diagnostic kit development, aptamer-protein binding prediction, and IoT-integrated biosensor design for clinical and environmental monitoring.',
    zh: '',
  },
};

// Footer contact (Spec §11).
export const SITE = {
  labName: { en: 'CIBI Lab', zh: '智慧演算生醫影像實驗室' } as BiPair,
  address: {
    en: 'Lab 103 & 105, Agriculture Machinery Building,\nDepartment of Biomechatronics Engineering, National Taiwan University,\nNo. 1, Sec. 4, Roosevelt Rd., Taipei 10617, Taiwan (R.O.C.)',
    zh: '10617 臺北市大安區羅斯福路四段一號\n國立臺灣大學生物機電工程學系　農機館 103、105 室',
  } as BiPair,
  tel: '+886-2-3366-9820',
};
