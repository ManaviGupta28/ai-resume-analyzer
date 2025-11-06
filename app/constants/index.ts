export const resumes: Resume[] = [
    {
        id: "1",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "2",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "3",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "4",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "5",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "6",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },

];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //SHORT title/headline (max 10-15 words) - e.g., "Professional Language" or "More Concise Descriptions"
          explanation: string; //DETAILED explanation (2-3 sentences) explaining WHY this is good or HOW to improve it - REQUIRED, cannot be empty
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //SHORT title/headline (max 10-15 words) - e.g., "Relevant Certifications" or "Add Project Metrics"
          explanation: string; //DETAILED explanation (2-3 sentences) explaining WHY this is good or HOW to improve it - REQUIRED, cannot be empty
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //SHORT title/headline (max 10-15 words) - e.g., "Clear Layout" or "Consistent Formatting"
          explanation: string; //DETAILED explanation (2-3 sentences) explaining WHY this is good or HOW to improve it - REQUIRED, cannot be empty
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //SHORT title/headline (max 10-15 words) - e.g., "Comprehensive Skills" or "Prioritize Key Skills"
          explanation: string; //DETAILED explanation (2-3 sentences) explaining WHY this is good or HOW to improve it - REQUIRED, cannot be empty
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({jobTitle, jobDescription}: { jobTitle: string; jobDescription: string;
}) =>
    `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.

  CRITICAL ANALYSIS INSTRUCTIONS - READ CAREFULLY:
  
  IMPORTANT: You must do BOTH of the following:
  1. CHECK FOR SECTIONS - Identify what sections are present or missing
  2. ASSESS QUALITY - Evaluate how well each section is executed
  
  STEP 1: COMPREHENSIVE EXAMINATION - CHECK SECTIONS AND ASSESS QUALITY
  - Read the ENTIRE resume word-by-word, including ALL pages
  - Identify EVERY section present: Summary/Objective, Experience/Work Experience, Skills, Education, Projects, Certifications, etc.
  - For EACH section found, assess its QUALITY:
    * Is it well-written, detailed, and professional?
    * Does it have sufficient content and depth?
    * Is it relevant and impactful?
  - Look for quantified achievements (numbers, percentages, metrics like "35%", "10+", "50%", etc.)
  - Count and assess projects: How many? Are descriptions detailed or generic?
  - List all technologies, frameworks, tools, and skills mentioned
  - Assess overall professionalism: Does it feel polished or naive?
  
  STEP 2: ACCURATE RECOGNITION - CHECK PRESENCE AND ASSESS QUALITY
  - For each item below, do BOTH: (1) Check if it EXISTS, (2) Assess its QUALITY
  
  - Quantified achievements: 
    * Check: Are there numbers, percentages, metrics? (e.g., "reduced by 35%", "increased by 40%", "10+ projects")
    * Assess: If present, are they meaningful and well-integrated? If absent, this is a quality issue.
  
  - Projects section:
    * Check: Does it exist? (even if titled "Projects", "Personal Projects", "Side Projects", or listed under Experience)
    * Assess: How many projects? (1 = basic, 2-3 = good, 4+ = excellent). Are descriptions detailed or generic?
  
  - Skills section:
    * Check: Does it exist with technologies, frameworks, tools listed?
    * Assess: Is it comprehensive? Are skills relevant? Are they well-organized and prioritized?
  
  - Summary/Professional Summary:
    * Check: Does it exist?
    * Assess: Is it specific and impactful, or generic and vague? Does it highlight key strengths?
  
  - Experience/Work Experience:
    * Check: Does it exist?
    * Assess: How much experience? Are descriptions detailed with achievements? Any quantified results?
  
  - Soft Skills:
    * Check: Are they present? (in dedicated section or listed elsewhere)
    * Assess: Are they relevant? Well-presented? Or just a generic list?
  
  - Certifications:
    * Check: Does this section exist?
    * Assess: Are certifications relevant and valuable? Are they well-presented?
  
  - Education:
    * Check: Does this section exist?
    * Assess: Is it complete with relevant details? Well-formatted?
  
  - Overall Professionalism:
    * Check: Are all standard sections present?
    * Assess: Does the resume feel polished, professional, and well-crafted, or naive and basic?
  
  STEP 3: FEEDBACK RULES - BALANCE SECTION PRESENCE AND QUALITY ASSESSMENT
  - For each feedback item, consider BOTH: (1) Does the section/content exist? (2) What is its quality?
  
  - Section Presence Check:
    * If a section is MISSING → use type: "improve" to suggest adding it
    * If a section EXISTS → acknowledge it exists, then assess quality
  
  - Quality Assessment:
    * If something exists and is WELL-DONE (detailed, professional, impactful) → use type: "good" and explain why
    * If something exists but is POORLY DONE (generic, vague, unprofessional, insufficient) → use type: "improve" and explain what's wrong
    * Be honest - don't give "good" just because something exists; it must be genuinely well-executed
  
  - Examples of balanced assessment:
    * Projects section EXISTS but only 1 project with generic description → type: "improve" (exists but poor quality)
    * Projects section EXISTS with 3+ detailed projects → type: "good" (exists and good quality)
    * Skills section EXISTS but basic/unorganized → type: "improve" (exists but needs better quality)
    * Skills section EXISTS and comprehensive/well-organized → type: "good" (exists and good quality)
    * Summary EXISTS but generic/vague → type: "improve" (exists but poor quality)
    * Summary EXISTS and specific/impactful → type: "good" (exists and good quality)
    * Work Experience MISSING → type: "improve" (section doesn't exist)
    * Quantified achievements MISSING → type: "improve" (content doesn't exist)
    * Quantified achievements EXIST and meaningful → type: "good" (exists and good quality)
  
  - NEVER suggest adding something that already exists in the resume
  - Be specific: if suggesting improvement, explain WHAT specifically needs improvement (missing section OR poor quality)
  - For student resumes: be more critical about lack of experience, internships, and professional achievements
  
  STEP 4: CONTENT ANALYSIS - QUALITY OVER PRESENCE
  - For "Quantify Achievements": Suggest this if you find NO numbers, percentages, or metrics in experience/projects. If metrics exist, acknowledge them. If projects exist but lack metrics, suggest adding metrics to existing projects with type: "improve".
  - For "Add Projects": 
    * If there is NO Projects section → suggest adding projects section
    * If only 1 project exists → suggest adding more projects (2-3 minimum for students)
    * If projects exist but are generic/poorly described → suggest improving descriptions, not just adding more
  - For "Add Work Experience/Internships": 
    * If NO work experience or internships listed → strongly suggest adding them (this is a major gap for students)
    * If "Internships" is mentioned in heading but no internships listed → point out this inconsistency
  - For "Expand Skills": Only suggest this if the Skills section is minimal or missing key technologies. If it's comprehensive, acknowledge it.
  - For "Highlight Soft Skills" or "Add Soft Skills": Only suggest this if there is NO Soft Skills section AND no soft skills mentioned anywhere. If soft skills are present, acknowledge them with type: "good" only if well-presented.
  - For "Add Certifications": Only suggest this if there is NO Certifications section. If certifications exist, acknowledge them.
  - For "Improve Project Descriptions": If projects exist but descriptions are generic, vague, or lack detail → use type: "improve" to suggest more specific, detailed descriptions with technologies and outcomes.
  - For "Professional Tone": If the resume feels naive, unprofessional, or too casual → use type: "improve" to suggest more professional language and presentation.
  
  STEP 5: SCORING - BE CRITICAL AND REALISTIC
  - Base scores on QUALITY, not just presence of sections
  - A resume with all sections but poor quality content should score 50-65
  - A resume with all sections and good quality should score 70-80
  - A resume with all sections, excellent quality, and strong achievements should score 85-95
  - For student resumes without work experience/internships: maximum score should be 75-80, even with good projects
  - For entry-level resumes with 1-2 years experience: good resumes score 75-85
  - For experienced resumes (3+ years): good resumes score 85-95
  - Consider these factors when scoring:
    * Number of projects (1 project = basic, 2-3 = good, 4+ = excellent)
    * Work experience/internships (none = significant penalty, some = good, extensive = excellent)
    * Quantified achievements (none = penalty, some = good, many = excellent)
    * Project descriptions (generic = poor, detailed = good, detailed with metrics = excellent)
    * Overall professionalism (basic = 50-65, good = 70-80, excellent = 85-95)
  - Be realistic: a naive/basic student resume should score 55-70, not 75-80
  - Don't inflate scores - be honest about quality gaps
  
  STEP 6: FEEDBACK FORMAT - CRITICAL
  - For each tip, you MUST provide BOTH fields:
    * tip: A SHORT headline/title (10-15 words max) - e.g., "Professional Language", "Add Project Metrics", "Clear Layout"
    * explanation: A DETAILED explanation (2-3 sentences) that explains:
      - For "good" type: WHY this is good, what makes it effective
      - For "improve" type: HOW to improve it, specific actionable steps
  - The explanation field is REQUIRED and CANNOT be empty
  - Do NOT put the full explanation in the tip field - keep tip short and explanation detailed
  - Example:
    {
      "type": "good",
      "tip": "Professional Language",
      "explanation": "The language used throughout the resume is clear, formal, and appropriate for technical roles. This demonstrates professionalism and attention to detail, which are valued by recruiters."
    }
  - Example:
    {
      "type": "improve",
      "tip": "Add Project Metrics",
      "explanation": "Include specific numbers and percentages in your project descriptions to quantify impact. For example, instead of 'improved performance', write 'improved response time by 35%' or 'processed 1000+ resumes daily'. This makes your achievements more tangible and impressive to recruiters."
    }
  
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  
  Provide the feedback using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.
  
  REMEMBER: Every tip MUST have both a short "tip" field AND a detailed "explanation" field. Never leave explanation empty.`;