// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about-me",
    title: "About me",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Journal articles, conference papers, and earlier work, with links to papers, code, and research notes.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-论文发表",
          title: "论文发表",
          description: "期刊论文与会议论文。引用数同步自 Google Scholar。",
          section: "Navigation",
          handler: () => {
            window.location.href = "/zh/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Research in AI-assisted RF design, engineering workflows, and industrial machine learning.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-研究项目",
          title: "研究项目",
          description: "研究问题、方法与验证结果。",
          section: "Navigation",
          handler: () => {
            window.location.href = "/zh/projects/";
          },
        },{id: "nav-research-notes",
          title: "Research notes",
          description: "Notes on optimization, industrial machine learning, game theory and reinforcement learning.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-研究笔记",
          title: "研究笔记",
          description: "优化方法、工业机器学习，以及博弈与强化学习的应用思考。",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Final-year PhD in Electronic Engineering, University of Glasgow.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-简历",
          title: "简历",
          description: "格拉斯哥大学电子工程博士生，研究方向为人工智能辅助射频设计。",
          section: "Navigation",
          handler: () => {
            window.location.href = "/zh/cv/";
          },
        },{id: "post-inside-a-surrogate-assisted-optimization-loop",
        
          title: "Inside a surrogate-assisted optimization loop",
        
        description: "A visual introduction to sampling, prediction, and validation when simulations are expensive.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/plotly/";
          
        },
      },{id: "news-personal-homepage-launch",
          title: 'Personal homepage launch',
          description: "",
          section: "News",},{id: "news-i-officially-graduated-from-uestc-amp-amp-uog",
          title: 'I officially graduated from UESTC &amp;amp;amp; UoG :)',
          description: "",
          section: "News",},{id: "news-i-have-started-my-study-of-ms-in-cs-gatech-shenzhen",
          title: 'I have started my study of MS in CS @ GaTech Shenzhen!',
          description: "",
          section: "News",},{id: "news-our-paper-fair-food-delivery-trading-system-based-on-edge-computing-and-stackelberg-game-has-been-accepted-by-edge-2022",
          title: 'Our paper, Fair Food Delivery Trading System Based on Edge Computing and Stackelberg...',
          description: "",
          section: "News",},{id: "news-our-paper-comparative-genomics-provides-new-insights-into-the-evolution-of-colletotrichum-is-now-online-in-mycosphere-this-is-an-interesting-study-exploring-ml-s-application-in-taxonomy",
          title: 'Our paper, Comparative genomics provides new insights into the evolution of Colletotrichum, is...',
          description: "",
          section: "News",},{id: "news-i-m-happy-to-share-that-i-will-return-to-the-university-of-glasgow-for-a-phd-in-autumn-2023",
          title: 'I’m happy to share that I will return to the University of Glasgow...',
          description: "",
          section: "News",},{id: "news-our-paper-integrated-multi-band-photonic-filter-based-on-mrr-ssg-for-tunable-frequency-hopping-has-been-accepted-for-an-oral-presentation-at-the-european-conference-on-optical-communication-2025-this-paper-tells-a-story-about-optimization-based-photonic-design",
          title: 'Our paper, Integrated Multi-Band Photonic Filter Based on MRR–SSG for Tunable Frequency Hopping,...',
          description: "",
          section: "News",},{id: "news-i-m-happy-to-share-that-i-have-graduated-from-georgia-tech-with-gpa-of-4-0-4-0",
          title: 'I’m happy to share that I have graduated from Georgia Tech with GPA...',
          description: "",
          section: "News",},{id: "news-our-paper-fair-food-delivery-trading-system-based-on-edge-computing-and-stackelberg-game-has-been-selected-as-the-best-paper-in-edge-2022",
          title: 'Our paper, Fair Food Delivery Trading System Based on Edge Computing and Stackelberg...',
          description: "",
          section: "News",},{id: "news-i-have-started-my-phd-in-electronic-engineering-at-university-of-glasgow-uk",
          title: 'I have started my PhD in Electronic Engineering at University of Glasgow, UK....',
          description: "",
          section: "News",},{id: "news-our-paper-an-efficient-and-general-automated-power-amplifier-design-method-based-on-surrogate-model-assisted-hybrid-optimization-technique-has-been-accepted-by-ieee-transactions-on-microwave-theory-and-techniques",
          title: 'Our paper, An efficient and general automated power amplifier design method based on...',
          description: "",
          section: "News",},{id: "news-our-paper-an-efficient-method-for-complex-digitally-coded-antenna-design-based-on-evolutionary-computation-and-machine-learning-techniques-has-been-accepted-by-ieee-transactions-on-antennas-and-propagation",
          title: 'Our paper, An efficient method for complex digitally coded antenna design based on...',
          description: "",
          section: "News",},{id: "news-we-have-released-the-large-language-model-enabled-antenna-modeling-leam-open-source-tool-on-github-and-arxiv",
          title: 'We have released the large language model enabled antenna modeling (LEAM) open-source tool...',
          description: "",
          section: "News",},{id: "news-i-have-started-working-with-mathworks-as-a-research-intern-till-september",
          title: 'I have started working with MathWorks as a research intern till September.',
          description: "",
          section: "News",},{id: "news-for-ecoc-2025-i-went-to-copenhagen-and-our-paper-integrated-multi-band-photonic-filter-based-on-mrr-ssg-for-tunable-frequency-hopping-was-presented",
          title: 'For ECOC 2025, I went to Copenhagen and our paper, Integrated Multi-Band Photonic...',
          description: "",
          section: "News",},{id: "news-our-paper-an-efficient-method-for-complex-digitally-coded-antenna-design-based-on-evolutionary-computation-and-machine-learning-techniques-is-now-online-this-paper-demonstrates-an-advancement-of-pixelated-antenna-design-in-resolution-i-e-more-than-2000-and-specifications-i-e-more-than-10",
          title: 'Our paper, An Efficient Method for Complex Digitally Coded Antenna Design Based on...',
          description: "",
          section: "News",},{id: "news-our-paper-large-language-model-based-intelligent-antenna-design-system-an-updated-version-for-leam-has-been-accepted-by-eucap-2026-let-s-goooo-dublin",
          title: 'Our paper, Large Language Model-Based Intelligent Antenna Design System (an updated version for...',
          description: "",
          section: "News",},{id: "news-this-summer-i-will-return-to-mathworks-for-an-internship-happy-to-be-a-mathworker-again",
          title: 'This summer, I will return to MathWorks for an internship. Happy to be...',
          description: "",
          section: "News",},{id: "news-our-large-language-model-based-intelligent-antenna-design-system-paper-is-now-published-in-eucap-2026-explore-the-leam-toolkit-and-workflow-walkthrough",
          title: 'Our Large Language Model-Based Intelligent Antenna Design System paper is now published in...',
          description: "",
          section: "News",},{id: "projects-equipment-anomaly-detection-and-statistical-alarms",
          title: 'Equipment anomaly detection and statistical alarms',
          description: "A Roots blower blockage-detection case study.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/fault_detection/";
            },},{id: "projects-from-intent-to-an-antenna-model",
          title: 'From intent to an antenna model',
          description: "Literature-based antenna reconstruction and parameter optimization.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/leam/";
            },},{id: "projects-power-amplifier-design",
          title: 'Power amplifier design',
          description: "BNN-assisted layout optimization with EM and harmonic-balance validation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/pa_project/";
            },},{id: "projects-tunable-photonic-filters",
          title: 'Tunable photonic filters',
          description: "Memetic optimization of superstructure-grating phase shifts for multi-band photonic filtering.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/photonic_filter/";
            },},{id: "projects-pixelated-antenna-design",
          title: 'Pixelated Antenna Design',
          description: "Spatially aware evolutionary optimization of high-dimensional binary antenna layouts.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/pixel_antenna/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%54%61%6F.%57%75@%67%6C%61%73%67%6F%77.%61%63.%75%6B", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/TaoWu974", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/tao-wu-glasgow", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0003-4459-2696", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/Tao_Wu129/", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=maF2KooAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
