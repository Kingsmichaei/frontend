import React, { useState, useEffect } from 'react';
import logo from './assets/logogreen.png';
import motto2 from './assets/textgreen.png';
import motto from './assets/textwhite.png';
import { useGoogleLogin } from '@react-oauth/google';

const fetchGoogleProfile = async (accessToken) => {
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch Google profile');
  }
  return res.json();
};

// ─── Icons ──────────────────────────────────────────────────────────────────
const Icons = {
  GradCap: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
  ),
  Parent: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Wallet: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Teacher: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  ChevronLeft: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"/></svg>
  ),
  ChevronRight: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"/></svg>
  ),
  CheckCircle: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" clipRule="evenodd"/></svg>
  ),
  Home: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Briefcase: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  ),
  BookOpen: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  BarChart: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  ),
  User: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Bell: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  ),
  Share: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
  ),
  Lock: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  HelpCircle: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  ),
  LogOut: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  ),
  Target: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  Award: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
  ),
  Play: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="5 3 19 12 5 21 5 3"/></svg>
  ),
  Edit: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
  ),
  Shield: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  Sun: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
  ),
  Moon: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
  ),
  Trash: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1  1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  ),
  Google: ({ size = 20, className = "" }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const SUBJECTS = [
  { id: 'math', label: 'Mathematics' }, { id: 'eng', label: 'English' },
  { id: 'com', label: 'Commerce' }, { id: 'phy', label: 'Physics' },
  { id: 'lit', label: 'Literature' }, { id: 'cs', label: 'Computer Studies' },
  { id: 'art', label: 'Fine Art' }, { id: 'geo', label: 'Geography' },
  { id: 'chem', label: 'Chemistry' }, { id: 'bio', label: 'Biology' },
  { id: 'econ', label: 'Economics' }, { id: 'music', label: 'Music' },
  { id: 'cve', label: 'Civic Education' }, { id: 'Lan', label: 'Languages' },
  { id: 'fin', label: 'Financial accounting' },
  { id: 'hist', label: 'History' }, { id: 'govt', label: 'Government' },
  { id: 'fmath', label: 'Further Mathematics' }, { id: 'agric', label: 'Agricultural Science' }
];
const GRADES = ['SS1','SS2','SS3','Other'];
const HOBBIES = ['Gaming','Reading','Drawing','Coding','Sports','Cooking','Dancing','Singing','Photography','Writing','Traveling'];

const CAREER_DETAILS = {
  se: { icon:'💻',title:'Software Engineer', description:'Software engineers design, build, and maintain systems that power everything from mobile apps to enterprise platforms. They solve complex problems through code.', skills:['Problem Solving','Coding (Python/JS)','System Design','Teamwork','Algorithms'], subjects:[{id:'cs',icon:'💻',label:'Computer Sci'},{id:'math',icon:'📐',label:'Mathematics'},{id:'science',icon:'🔬',label:'Science'}], education:[{step:1,label:'Secondary School',detail:'Mathematics, Physics, Computer Science'},{step:2,label:'University Degree',detail:'B.Sc Computer Science / Software Engineering'},{step:3,label:'Certifications (Optional)',detail:'AWS, Google Cloud, Microsoft Azure'}], salaryEntry:'₦80k – ₦150k', salaryMid:'₦250k – ₦500k', salarySenior:'₦600k – ₦2M+', salaryBarEntry:20, salaryBarMid:55, salaryBarSenior:100, universities:['UNILAG','University of Ibadan','OAU Ile-Ife','NOUN','Covenant University','ABU Zaria'] },
  ds: {icon:'📊',title:'Data Scientist', description:'Data scientists analyze large datasets to uncover patterns, build predictive models, and help organizations make smarter data-driven decisions.', skills:['Statistics','Python / R','Machine Learning','Data Visualization','Critical Thinking'], subjects:[{id:'math',icon:'📐',label:'Mathematics'},{id:'cs',icon:'💻',label:'Computer Sci'},{id:'econ',icon:'📊',label:'Economics'}], education:[{step:1,label:'Secondary School',detail:'Mathematics, Statistics, Computer Science'},{step:2,label:'University Degree',detail:'B.Sc Statistics / Computer Science / Mathematics'},{step:3,label:'Certifications',detail:'Google Data Analytics, IBM Data Science'}], salaryEntry:'₦100k – ₦200k', salaryMid:'₦300k – ₦600k', salarySenior:'₦800k – ₦3M+', salaryBarEntry:28, salaryBarMid:62, salaryBarSenior:100, universities:['UNILAG','University of Ibadan','OAU','NOUN','Covenant','UNN'] },
  gd: { icon:'🎨',title:'UI/UX Designer', description:'UI/UX designers create the look, feel, and usability of digital products. They bridge the gap between technology and human experience through thoughtful design.', skills:['Visual Design','User Research','Figma / Adobe XD','Prototyping','Empathy'], subjects:[{id:'art',icon:'🎨',label:'Fine Art'},{id:'cs',icon:'💻',label:'Computer Sci'},{id:'lit',icon:'📖',label:'Literature'}], education:[{step:1,label:'Secondary School',detail:'Fine Art, Computer Science, English'},{step:2,label:'University Degree',detail:'B.Sc Computer Science / Fine & Applied Arts'},{step:3,label:'Certifications',detail:'Google UX Design, Interaction Design Foundation'}], salaryEntry:'₦80k – ₦150k', salaryMid:'₦200k – ₦450k', salarySenior:'₦500k – ₦1.5M', salaryBarEntry:22, salaryBarMid:50, salaryBarSenior:88, universities:['UNILAG','Covenant University','NOUN','LASU','Yabatech'] },
  md: {icon:'🏥',title:'Medical Doctor', description:'Medical doctors diagnose and treat illnesses and diseases. They play a critical and deeply impactful role in improving and saving lives across communities.', skills:['Clinical Diagnosis','Patient Care','Biology & Chemistry','Communication','Attention to Detail'], subjects:[{id:'bio',icon:'🧬',label:'Biology'},{id:'chem',icon:'⚗️',label:'Chemistry'},{id:'science',icon:'🔬',label:'Science'}], education:[{step:1,label:'Secondary School',detail:'Biology, Chemistry, Physics, Mathematics'},{step:2,label:'University (MBBS)',detail:'6-year Medicine & Surgery programme'},{step:3,label:'Residency / Specialization',detail:'NYSC + Hospital Residency (2–5 years)'}], salaryEntry:'₦150k – ₦300k', salaryMid:'₦400k – ₦800k', salarySenior:'₦1M – ₦5M+', salaryBarEntry:32, salaryBarMid:68, salaryBarSenior:100, universities:['UNILAG','University of Ibadan','ABU Zaria','UNIMAID','University of Benin','UNICAL'] },
  ent: { icon:'💼',title:'Entrepreneur', description:'Entrepreneurs identify market gaps and build businesses that solve real problems. They take calculated risks to create lasting value and generate employment.', skills:['Business Strategy','Leadership','Financial Planning','Networking','Resilience'], subjects:[{id:'econ',icon:'📊',label:'Economics'},{id:'math',icon:'📐',label:'Mathematics'},{id:'lit',icon:'📖',label:'Literature'}], education:[{step:1,label:'Secondary School',detail:'Economics, Mathematics, Commerce'},{step:2,label:'University Degree',detail:'B.Sc Business Admin / Economics / Any field'},{step:3,label:'Accelerators & Programs',detail:'Tony Elumelu Foundation, Co-Creation Hub'}], salaryEntry:'Variable', salaryMid:'₦200k – ₦1M+', salarySenior:'Unlimited 🚀', salaryBarEntry:18, salaryBarMid:55, salaryBarSenior:100, universities:['UNILAG','Covenant','Lagos Business School','Pan-Atlantic University','NOUN'] },
  arc: {  icon:'🏛️',title:'Architect', description:'Architects design buildings and spaces that are functional, safe, and beautiful. They blend creativity with engineering principles to shape the built environment.', skills:['Spatial Design','AutoCAD / Revit','Mathematics','Creativity','Project Management'], subjects:[{id:'math',icon:'📐',label:'Mathematics'},{id:'art',icon:'🎨',label:'Fine Art'},{id:'science',icon:'🔬',label:'Science'}], education:[{step:1,label:'Secondary School',detail:'Mathematics, Fine Art, Physics'},{step:2,label:'University (B.Arch)',detail:'5-year Architecture programme'},{step:3,label:'Professional Certification',detail:'ARCON registration + 2-year pupillage'}], salaryEntry:'₦80k – ₦150k', salaryMid:'₦250k – ₦500k', salarySenior:'₦600k – ₦2M+', salaryBarEntry:22, salaryBarMid:52, salaryBarSenior:90, universities:['UNILAG','ABU Zaria','OAU Ile-Ife','FUTA','Covenant University'] },
  teach: { icon:'📚',title:'Educator', description:'Educators inspire and guide learners at all levels — from classroom teachers to professors and online instructors — shaping the future through knowledge.', skills:['Communication','Patience','Curriculum Design','Public Speaking','Subject Mastery'], subjects:[{id:'lit',icon:'📖',label:'Literature'},{id:'science',icon:'🔬',label:'Science'},{id:'math',icon:'📐',label:'Mathematics'}], education:[{step:1,label:'Secondary School',detail:'English Language, chosen subject areas'},{step:2,label:'University Degree',detail:'B.Ed Education / B.Sc + PGDE'},{step:3,label:'Professional Registration',detail:"Teachers' Registration Council of Nigeria (TRCN)"}], salaryEntry:'₦60k – ₦120k', salaryMid:'₦150k – ₦300k', salarySenior:'₦400k – ₦1M+ (Professors)', salaryBarEntry:16, salaryBarMid:40, salaryBarSenior:78, universities:['All Nigerian Universities','NOUN (Distance Learning)','Colleges of Education'] },
  pharma: { icon:'💊',title:'Pharmacist', description:'Pharmacists are healthcare professionals who specialize in the right way to use, store, preserve, and provide medicine to improve patient health.', skills:['Attention to Detail','Chemistry','Communication','Memory','Analytical Skills'], subjects:[{id:'chem',icon:'⚗️',label:'Chemistry'},{id:'bio',icon:'🧬',label:'Biology'},{id:'math',icon:'📐',label:'Mathematics'}], education:[{step:1,label:'Secondary School',detail:'Chemistry, Biology, Physics, Mathematics'},{step:2,label:'University (B.Pharm/Pharm.D)',detail:'5-6 year Pharmacy programme'},{step:3,label:'Internship & Registration',detail:'1-year internship + PCN Registration'}], salaryEntry:'₦100k – ₦250k', salaryMid:'₦300k – ₦600k', salarySenior:'₦700k – ₦2M+', salaryBarEntry:25, salaryBarMid:60, salaryBarSenior:95, universities:['OAU Ile-Ife','UNILAG','University of Ibadan','UNIBEN','UNN'] },
  fin: { icon:'🏦',title:'Financial Analyst', description:'Financial analysts guide businesses and individuals in making investment decisions by assessing the performance of stocks, bonds, and other types of investments.', skills:['Data Analysis','Mathematics','Excel / Modeling','Financial Literacy','Problem Solving'], subjects:[{id:'fin',icon:'📒',label:'Accounting'},{id:'econ',icon:'📊',label:'Economics'},{id:'math',icon:'📐',label:'Mathematics'}], education:[{step:1,label:'Secondary School',detail:'Accounting, Economics, Mathematics'},{step:2,label:'University Degree',detail:'B.Sc Accounting / Finance / Economics'},{step:3,label:'Professional Certifications',detail:'ICAN, ACCA, CFA'}], salaryEntry:'₦100k – ₦250k', salaryMid:'₦350k – ₦800k', salarySenior:'₦1M – ₦5M+', salaryBarEntry:25, salaryBarMid:65, salaryBarSenior:100, universities:['UNILAG','Covenant University','OAU Ile-Ife','University of Ibadan','Babcock University'] },
  game: { icon:'🎮',title:'Game Developer', description:'Game developers take the vision of game designers and turn it into a playable reality through coding, audio, and visual programming.', skills:['C++ / C#','Problem Solving','Creativity','Math & Physics','Teamwork'], subjects:[{id:'cs',icon:'💻',label:'Computer Sci'},{id:'math',icon:'📐',label:'Mathematics'},{id:'phy',icon:'🔭',label:'Physics'}], education:[{step:1,label:'Secondary School',detail:'Computer Science, Mathematics, Physics'},{step:2,label:'University Degree',detail:'B.Sc Computer Science / Software Engineering'},{step:3,label:'Portfolio Building',detail:'Publishing indie games, Unity/Unreal Engine certs'}], salaryEntry:'₦80k – ₦150k', salaryMid:'₦250k – ₦600k', salarySenior:'₦800k – ₦3M+', salaryBarEntry:20, salaryBarMid:55, salaryBarSenior:100, universities:['UNILAG','FUTA','Covenant University','Babcock University','OAU Ile-Ife'] },
  nurse: { icon:'🩺',title:'Nurse', description:'Nurses provide medical and nursing care to patients in hospitals, at home, or in other settings who are suffering from chronic or acute physical or mental ill health.', skills:['Compassion','Stamina','Communication','Observation','Clinical Skills'], subjects:[{id:'bio',icon:'🧬',label:'Biology'},{id:'chem',icon:'⚗️',label:'Chemistry'},{id:'eng',icon:'📝',label:'English'}], education:[{step:1,label:'Secondary School',detail:'Biology, Chemistry, Physics, English'},{step:2,label:'Nursing School / University',detail:'B.NSc or RN certification (3-5 years)'},{step:3,label:'Professional Registration',detail:'NMCN Registration'}], salaryEntry:'₦80k – ₦200k', salaryMid:'₦250k – ₦500k', salarySenior:'₦600k – ₦1.5M+', salaryBarEntry:22, salaryBarMid:52, salaryBarSenior:85, universities:['University of Ibadan','OAU Ile-Ife','UNILAG','UNN','ABU Zaria'] },
  law: { icon:'⚖️',title:'Lawyer', description:'Lawyers advise and represent individuals, businesses, and government agencies on legal issues and disputes.', skills:['Critical Thinking','Public Speaking','Research','Writing','Negotiation'], subjects:[{id:'lit',icon:'📖',label:'Literature'},{id:'govt',icon:'🏛️',label:'Government'},{id:'eng',icon:'📝',label:'English'}], education:[{step:1,label:'Secondary School',detail:'Literature in English, Government, CRK/IRK'},{step:2,label:'University Degree (LL.B)',detail:'5-year Law programme'},{step:3,label:'Law School',detail:'1-year Nigerian Law School (B.L) + Call to Bar'}], salaryEntry:'₦70k – ₦200k', salaryMid:'₦300k – ₦800k', salarySenior:'₦1M – ₦10M+', salaryBarEntry:18, salaryBarMid:60, salaryBarSenior:100, universities:['UNILAG','University of Ibadan','OAU Ile-Ife','UNN','ABU Zaria'] },
  ce: { icon:'🏗️',title:'Civil Engineer', description:'Civil engineers design, build, and supervise infrastructure projects and systems, including roads, buildings, airports, tunnels, dams, and bridges.', skills:['Mathematics','AutoCAD / Civil 3D','Project Management','Physics','Problem Solving'], subjects:[{id:'phy',icon:'🔭',label:'Physics'},{id:'math',icon:'📐',label:'Mathematics'},{id:'fmath',icon:'➗',label:'Further Math'}], education:[{step:1,label:'Secondary School',detail:'Physics, Mathematics, Chemistry'},{step:2,label:'University Degree',detail:'B.Sc / B.Eng Civil Engineering (5 years)'},{step:3,label:'Professional Registration',detail:'COREN Registration'}], salaryEntry:'₦100k – ₦200k', salaryMid:'₦300k – ₦700k', salarySenior:'₦800k – ₦3M+', salaryBarEntry:25, salaryBarMid:58, salaryBarSenior:95, universities:['UNILAG','FUTA','ABU Zaria','OAU Ile-Ife','University of Benin'] },
  mkt: { icon:'📱',title:'Digital Marketer', description:'Digital marketers use online platforms and tools to promote products, services, or brands. They analyze data to understand consumer behavior and run targeted campaigns.', skills:['SEO / SEM','Content Creation','Data Analysis','Social Media','Communication'], subjects:[{id:'eng',icon:'📝',label:'English'},{id:'com',icon:'📉',label:'Commerce'},{id:'cs',icon:'💻',label:'Computer Sci'}], education:[{step:1,label:'Secondary School',detail:'English, Commerce, Computer Science'},{step:2,label:'University Degree',detail:'B.Sc Mass Communication / Marketing / Business'},{step:3,label:'Certifications',detail:'Google Digital Garage, HubSpot, Meta Blueprint'}], salaryEntry:'₦80k – ₦150k', salaryMid:'₦250k – ₦600k', salarySenior:'₦800k – ₦2M+', salaryBarEntry:22, salaryBarMid:55, salaryBarSenior:90, universities:['UNILAG','Covenant University','Pan-Atlantic University','NOUN','LASU'] },
};

const ALL_CAREERS = [
  {id:'se',icon:'💻',title:'Software Engineer',desc:'Build the future of technology.',tags:['tech','a'],category:'Technology'},
  {id:'ds',icon:'📊',title:'Data Scientist',desc:'Find patterns in complex data.',tags:['tech','a'],category:'Technology'},
  {id:'gd',icon:'🎨',title:'UI/UX Designer',desc:'Blend creativity with functionality.',tags:['arts','b'],category:'Design'},
  {id:'md',icon:'🏥',title:'Medical Doctor',desc:'Save lives and improve health.',tags:['health','sci'],category:'Healthcare'},
  {id:'ent',icon:'💼',title:'Entrepreneur',desc:'Build and lead your own business.',tags:['bus','a'],category:'Business'},
  {id:'arc',icon:'🏛️',title:'Architect',desc:'Design incredible physical spaces.',tags:['arts','math'],category:'Design'},
  {id:'teach',icon:'👩‍🏫',title:'Educator',desc:'Inspire the next generation.',tags:['f','c'],category:'Education'},
  {id:'pharma',icon:'💊',title:'Pharmacist',desc:'Expert in medicines and health.',tags:['health','sci'],category:'Healthcare'},
  {id:'fin',icon:'🏦',title:'Financial Analyst',desc:'Manage and grow wealth.',tags:['bus','a'],category:'Business'},
  {id:'game',icon:'🎮',title:'Game Developer',desc:'Create immersive digital worlds.',tags:['tech','arts'],category:'Technology'},
  {id:'nurse',icon:'🩺',title:'Nurse',desc:'Care for patients every day.',tags:['health','d'],category:'Healthcare'},
  {id:'law',icon:'⚖️',title:'Lawyer',desc:'Defend rights and justice.',tags:['law','c'],category:'Law'},
  {id:'ce',icon:'🏗️',title:'Civil Engineer',desc:'Build modern infrastructure.',tags:['tech','math','sci'],category:'Technology'},
  {id:'mkt',icon:'📱',title:'Digital Marketer',desc:'Grow brands online.',tags:['bus','tech','c'],category:'Business'},
];
const CAREER_CATEGORIES = ['All','Technology','Healthcare','Business','Design','Education','Law'];

const STUDY_TIPS = [
  {icon:'🧠',title:'Spaced Repetition',desc:'Review material at increasing intervals to lock it into long-term memory permanently.'},
  {icon:'⏱️',title:'Pomodoro Technique',desc:'Study for 25 minutes, then take a 5-minute break. Repeat 4 cycles, then rest longer.'},
  {icon:'📝',title:'Active Recall',desc:'Test yourself instead of re-reading. Close the book and write what you remember.'},
  {icon:'🎯',title:'Set Micro-Goals',desc:'Break big topics into tiny tasks. Completing small goals builds daily momentum.'},
  {icon:'👥',title:'Teach to Learn',desc:'Explain concepts out loud to yourself or a friend — it reveals gaps in understanding.'},
  {icon:'📱',title:'Limit Distractions',desc:'Use app blockers during study sessions to maintain deep, distraction-free focus.'},
];
const QUIZZES = [
  {subject:'Mathematics',questions:10,time:'15 mins'},
  {subject:'Computer Sci',questions:8,time:'12 mins'},
  {subject:'Biology',questions:10,time:'15 mins'},
  {subject:'Economics',questions:8,time:'10 mins'},
];
const VIDEO_LESSONS = [
  {title:'Introduction to Programming',subject:'Computer Sci',duration:'12:30'},
  {title:'Algebraic Equations Simplified',subject:'Mathematics',duration:'08:45'},
  {title:'Human Body Systems',subject:'Biology',duration:'15:20'},
  {title:'Understanding Markets',subject:'Economics',duration:'10:15'},
];
const WEEKLY_DATA = [
  {day:'Mon',score:65},{day:'Tue',score:80},{day:'Wed',score:45},
  {day:'Thu',score:90},{day:'Fri',score:70},{day:'Sat',score:85},{day:'Sun',score:55},
];
const BADGES = [
  {icon:'🔥',label:'First Step',earned:true,date:'Today'},
  {icon:'🎯',label:'Goal Setter',earned:true,date:'Today'},
  {icon:'⭐',label:'Star Student',earned:false},
  {icon:'🏆',label:'Top Performer',earned:false},
  {icon:'💡',label:'Quick Learner',earned:false},
  {icon:'🚀',label:'High Achiever',earned:false},
];

const ASSESSMENT_QUESTIONS = [
  {id:'q1',part:'PART A — STRENGTH',text:'Which activity do you enjoy most?',type:'single',options:[{id:'a',label:'Solving math problems'},{id:'b',label:'Writing stories'},{id:'c',label:'Drawing or designing'},{id:'d',label:'Helping others'}]},
  {id:'q2',part:'PART A — STRENGTH',text:'When given a project, you prefer to...',type:'single',options:[{id:'a',label:'Plan and organize it'},{id:'b',label:'Build or create something'},{id:'c',label:'Research and analyze'},{id:'d',label:'Present and explain it'}]},
  {id:'q3',part:'PART A — STRENGTH',text:'What comes naturally to you?',type:'single',options:[{id:'a',label:'Numbers and logic'},{id:'b',label:'Creative thinking'},{id:'c',label:'Communication'},{id:'d',label:'Physical coordination'}]},
  {id:'q4',part:'PART A — STRENGTH',text:'In a group, you usually...',type:'single',options:[{id:'a',label:'Lead the team'},{id:'b',label:'Come up with ideas'},{id:'c',label:'Keep things organized'},{id:'d',label:'Support teammates'}]},
  {id:'q5',part:'PART A — STRENGTH',text:'Which subject feels easiest?',type:'subjects_single'},
  {id:'q6',part:'PART B — WEAKNESS',text:'Which subjects feel most difficult?',type:'subjects_multi'},
  {id:'q7',part:'PART B — WEAKNESS',text:'What challenges do you face while studying?',type:'multi',options:[{id:'a',label:'Concentration'},{id:'b',label:'Understanding concepts'},{id:'c',label:'Remembering things'},{id:'d',label:'Time management'},{id:'e',label:'Motivation'}]},
  {id:'q8',part:'PART B — WEAKNESS',text:'How do you feel about exams?',type:'single',options:[{id:'a',label:'Very confident'},{id:'b',label:'Somewhat nervous'},{id:'c',label:'Very anxious'},{id:'d',label:'Depends on subject'}]},
  {id:'q9',part:'PART B — WEAKNESS',text:'What would help you most?',type:'single',options:[{id:'a',label:'More practice'},{id:'b',label:'Better explanations'},{id:'c',label:'Study schedule'},{id:'d',label:'Study group'}]},
  {id:'q10',part:'PART C — PASSION',text:'Which field excites you most?',type:'multi',options:[{id:'tech',label:'Technology'},{id:'arts',label:'Arts & Design'},{id:'sci',label:'Science'},{id:'sports',label:'Sports'},{id:'bus',label:'Business'},{id:'music',label:'Music'},{id:'health',label:'Healthcare'},{id:'av',label:'Aviation'},{id:'agri',label:'Agriculture'},{id:'law',label:'Law'}]},
  {id:'q11',part:'PART C — PASSION',text:'Where do you see yourself in 10 years?',type:'single',options:[{id:'a',label:'Running a company'},{id:'b',label:'Doing research'},{id:'c',label:'Creating art/music'},{id:'d',label:'Helping sick people'},{id:'e',label:'Building software'},{id:'f',label:'Teaching others'}]},
  {id:'q12',part:'PART C — PASSION',text:'What motivates you most?',type:'single',options:[{id:'a',label:'Making money'},{id:'b',label:'Helping people'},{id:'c',label:'Creating things'},{id:'d',label:'Discovering new things'}]},
];

const generateAnalysis = (answers, profileData) => {
  let strengths = [];
  if (answers.q3==='a') strengths.push('Logical Thinking');
  if (answers.q3==='b') strengths.push('Creativity');
  if (answers.q3==='c') strengths.push('Communication');
  if (answers.q4==='a') strengths.push('Leadership');
  if (answers.q4==='c') strengths.push('Organization');
  if (answers.q2==='c') strengths.push('Analytical Skills');
  if (answers.q2==='b') strengths.push('Hands-On Builder');
  if (strengths.length < 3) strengths.push('Adaptability','Team Player');
  strengths = [...new Set(strengths)].slice(0,4);

  let weaknesses = [];
  const ch = answers.q7 || [];
  if (ch.includes('a')) weaknesses.push('Focus & Concentration');
  if (ch.includes('d')) weaknesses.push('Time Management');
  if (ch.includes('b')) weaknesses.push('Grasping Deep Concepts');
  if (ch.includes('c')) weaknesses.push('Memory Retention');
  if (answers.q8==='c') weaknesses.push('Test Anxiety');
  if (weaknesses.length===0) weaknesses = ['Public Speaking','Consistency'];
  weaknesses = [...new Set(weaknesses)].slice(0,3);

  const recSubjects = SUBJECTS.filter(s =>
    answers.q5===s.id ||
    (profileData.favSubjects && profileData.favSubjects.includes(s.id)) ||
    (answers.q10 && answers.q10.includes('tech') && s.id==='cs') ||
    (answers.q10 && answers.q10.includes('sci') && (s.id==='bio'||s.id==='chem'))
  );
  if (recSubjects.length===0) recSubjects.push(SUBJECTS,SUBJECTS,SUBJECTS);

  let recommended = ALL_CAREERS.filter(c => {
    const im = answers.q10 && c.tags.some(t => answers.q10.includes(t));
    const tm = c.tags.includes(answers.q3)||c.tags.includes(answers.q11);
    return im||tm;
  });
  if (recommended.length<4) recommended = [...recommended,...ALL_CAREERS].filter((v,i,a)=>a.findIndex(t=>t.id===v.id)===i);
  return {strengths, weaknesses, subjects:recSubjects.slice(0,4), careers:recommended.slice(0,4)};
};

const restoreAnalysis = (user) => {
  if (user.ai_analysis) {
    const aiData = user.ai_analysis;
    const mappedSubjects = (aiData.subjects || [])
      .map(id => SUBJECTS.find(s => s.id === id))
      .filter(Boolean);
    const mappedCareers = (aiData.careers || [])
      .map(id => ALL_CAREERS.find(c => c.id === id))
      .filter(Boolean);
    return {
      strengths: aiData.strengths || [],
      weaknesses: aiData.weaknesses || [],
      subjects: mappedSubjects.length > 0 ? mappedSubjects : SUBJECTS.slice(0,4),
      careers: mappedCareers.length > 0 ? mappedCareers : ALL_CAREERS.slice(0,4)
    };
  }
  return generateAnalysis(user.answers || {}, user.profileData || {});
};

// Theme helper maps style tokens
const getThemeStyles = (isDark) => ({
  bg: isDark ? 'bg-[#0A1628]' : 'bg-[#F8FAFC]',
  bgCard: isDark ? 'bg-[#112240]' : 'bg-white shadow-sm border border-slate-100',
  bgCardHover: isDark ? 'hover:bg-[#1b2f54]' : 'hover:bg-slate-50 border border-slate-100',
  bgInput: isDark ? 'bg-[#0D1F3C]' : 'bg-white border border-slate-300',
  textMain: isDark ? 'text-white' : 'text-slate-900',
  textSub: isDark ? 'text-[#A8B2D8]' : 'text-slate-500',
  border: isDark ? 'border-[#112240]' : 'border-slate-200',
  divider: isDark ? 'bg-[#112240]' : 'bg-slate-200',
  tagBg: isDark ? 'bg-[#0D1F3C]' : 'bg-slate-100',
  navBg: isDark ? 'bg-[#0D1F3C]/95' : 'bg-white/95 shadow-lg border-t border-slate-100',
  modalOverlay: isDark ? 'bg-black/60' : 'bg-slate-900/40',
});

// ─── Components ───────────────────────────────────────────────────────────────
const NavItem = ({icon,label,active,onClick,themeStyles}) => (
  <button onClick={onClick} style={{color:active?'#00A651':''}} className={`flex flex-col items-center justify-center p-2 transition-colors ${active ? '' : themeStyles.textSub}`}>
    <div className={`mb-1 transition-transform ${active?'-translate-y-0.5':''}`}>{icon}</div>
    <span className="text-[10px] font-semibold">{label}</span>
    {active && <div style={{backgroundColor:'#00A651',boxShadow:'0 0 8px #00A651'}} className="w-1.5 h-1.5 rounded-full mt-0.5"/>}
  </button>
);

const SplashScreen = ({onNavigate, themeStyles, isDark}) => {
    const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

return (
  <div className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-12 pb-0 w-full max-w-md mx-auto fade-in">
   <div style={{boxShadow:'0 0 20px rgba(0,166,81,0.4)'}} className="w-28 h-28 rounded-full flex items-center justify-center logo-pulse mb-8">
    <img src= {logo} style={{width: '300px',height: 'auto'}} className=" flex-col items-center justify-center">
    </img>
    </div>
    <img src= {isDark ? motto : motto2} style={{width: '250px',height: 'auto', marginBottom: '70px'}} className=" flex-col items-center justify-center">
    </img>

      <div className="w-full h-14">
        <button onClick={onNavigate} 
        style={{backgroundColor:'#00A651', opacity: showButton ? 1 : 0, transition: 'opacity 0.8s ease'}} 
        className="bottom-28 w-full h-14 text-white font-semibold text-lg rounded-xl btn-green-hover shadow-lg">Get Started</button>
      </div>
    
  </div>
);
};

// Unified Authentication System
const AuthScreen = ({ userData, setUserData, onNavigate, onBack, themeStyles, users, setUsers, onNavigateAfterAuth, onForgot }) => {
  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('Student');
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const resetFields = () => {
    setEmail('');
    setPassword('');
    setName('');
    setSchool('');
    setAge('');
    setError('');
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill out all required credentials.');
      return;
    }

    try {
      if (authMode === 'signup') {
        if (!name || !school) {
          setError('Please fill in your name and school.');
          return;
        }

        // 1. Send data to FastAPI Signup endpoint
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password, name, school })
        });

        const data = await response.json();

        // 2. Handle errors from the backend
        if (!response.ok) {
          throw new Error(data.detail || 'Signup failed');
        }

        // 3. Update frontend state
        const newUser = {
          ...data.user,
          hasCompletedOnboarding: false,
          profileData: null,
          answers: null
        };
        
        setUserData(newUser);
        onNavigateAfterAuth(newUser);

    } else {
        // Login Flow
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || 'Login failed');
        }
        // THE FIX: We remove the hardcoded "true" and trust the backend data
        const existingUser = data.user; 
        
        setUserData(existingUser);
        onNavigateAfterAuth(existingUser);
      }
        } catch (err) {
      setError(err?.message || 'Authentication failed');
    }
  };


  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      setError('');
      try {
        // 1. Get the profile data from Google
        const googleProfile = await fetchGoogleProfile(tokenResponse.access_token);
        
        // 2. Send this data to your FastAPI backend!
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/google-auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: googleProfile.email,
            name: googleProfile.name || googleProfile.given_name || 'Google User'
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || 'Backend Google authentication failed.');
        }

        // 3. Set the REAL database user in React state
        setUserData(data.user);
        onNavigateAfterAuth(data.user);

      } catch (err) {
        setError(err?.message || 'Google sign-in profile fetch failed.');
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: (errorResponse) => {
      setError(errorResponse?.error_description || 'Google sign-in failed.');
      setIsGoogleLoading(false);
    }
  });

    return (
  <div className="flex flex-col md:flex-row min-h-screen fade-in">

    {/* Left branding panel — desktop only */}
    <div className="hidden md:flex flex-col justify-center items-center w-5/12 p-16 flex-shrink-0"
      style={{background:'linear-gradient(145deg, #0A1628 0%, #112240 60%, #0A1628 100%)'}}>
      <div style={{boxShadow:'0 0 32px rgba(0,166,81,0.3)'}} className="w-24 h-24 rounded-full flex items-center justify-center logo-pulse mb-8">
        <img src={logo} style={{width:'300px',height:'auto'}}/>
      </div>
      <img src={motto} style={{width:'300px',height:'auto',marginBottom:'32px'}}/>
    </div>

    {/* Right form panel */}
    <div className={`flex flex-col min-h-screen md:h-screen md:overflow-y-auto md:flex-1 px-5 md:px-12 py-10 ${themeStyles.bg}`}>
  
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button onClick={onBack} className={`p-2 -ml-2 rounded-full ${themeStyles.textSub}`}>
          <Icons.ChevronLeft size={24}/>
        </button>
        <span className="text-xs font-semibold tracking-wider uppercase" style={{color:'#00A651'}}>
          {authMode === 'signup' ? 'Step 1: Join Us' : 'Welcome Back'}
        </span>
        <div className="w-8"/>
      </div>

      <div className="mb-6">
        <h2 className={`text-3xl font-extrabold mb-2 tracking-tight ${themeStyles.textMain}`}>
          {authMode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className={`text-sm ${themeStyles.textSub}`}>
          {authMode === 'signup' ? 'Explore opportunities tailored just for you' : 'Sign in to access your dashboard reports'}
        </p>
      </div>

      {/* Main Authentication Card */}
      <div className={`p-6 rounded-2xl ${themeStyles.bgCard} border ${themeStyles.border} shadow-md flex-1 flex flex-col justify-between`}>
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          
          {authMode === 'signup' && (
            <>

              {/* Name Input */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${themeStyles.textSub}`}>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tunde Alao"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full h-11 px-3 text-sm rounded-xl focus:border-[#00A651] outline-none transition-colors ${themeStyles.bgInput} ${themeStyles.textMain}`}
                  required
                />
              </div>

              {/* School Input */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${themeStyles.textSub}`}>School / College</label>
                <input
                  type="text"
                  placeholder="e.g. Queens College Lagos"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className={`w-full h-11 px-3 text-sm rounded-xl focus:border-[#00A651] outline-none transition-colors ${themeStyles.bgInput} ${themeStyles.textMain}`}
                  required
                />
              </div>
            </>
          )}

          {/* Email Input */}
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${themeStyles.textSub}`}>Email Address</label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-11 px-3 text-sm rounded-xl focus:border-[#00A651] outline-none transition-colors ${themeStyles.bgInput} ${themeStyles.textMain}`}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${themeStyles.textSub}`}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-11 px-3 text-sm rounded-xl focus:border-[#00A651] outline-none transition-colors ${themeStyles.bgInput} ${themeStyles.textMain}`}
              required
            />
            {authMode === 'login' && (
              <div className="flex justify-end mt-2">
                <button type="button" onClick={onForgot} className={`text-xs font-bold text-[#00A651] hover:underline`}>
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

          <button
            type="submit"
            style={{ backgroundColor: '#00A651' }}
            className="w-full h-12 text-white font-semibold text-sm rounded-xl btn-green-hover shadow-md transition-colors mt-2"
          >
            {authMode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center justify-center space-x-3">
          <div className={`h-[1px] flex-1 ${themeStyles.divider}`} />
          <span className={`text-[11px] font-semibold tracking-wider uppercase ${themeStyles.textSub}`}>or</span>
          <div className={`h-[1px] flex-1 ${themeStyles.divider}`} />
        </div>

        {/* OAuth Integrations */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading}
            className={`w-full h-12 rounded-xl flex items-center justify-center border border-slate-300 font-semibold text-sm hover:bg-slate-50 transition-all ${themeStyles.textMain} ${themeStyles.bgInput}`}
          >
            {isGoogleLoading ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Connecting to Google...</span>
              </span>
            ) : (
              <>
                <Icons.Google className="mr-2" />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Toggle Login vs Signup Link */}
          <div className="text-center pt-2">
            <button
               onClick={() => {
                setAuthMode(authMode === 'signup' ? 'login' : 'signup');
                resetFields();
              }}
              style={{ color: '#00A651' }}
              className="text-xs font-semibold hover:underline"
            >
              {authMode === 'signup' ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

const ForgotPasswordScreen = ({ onBack, themeStyles }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      setMessage(data.message || "Request sent.");
    } catch (err) {
      setMessage("A network error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center px-6 ${themeStyles.bgMain}`}>
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
          <h2 className={`text-3xl font-extrabold ${themeStyles.textMain}`}>Reset Password</h2>
          <p className={`mt-2 text-sm ${themeStyles.textSub}`}>Enter your email to receive a recovery link.</p>
        </div>
        <form onSubmit={handleSubmit} className={`p-8 rounded-2xl shadow-xl space-y-6 ${themeStyles.bgCard}`}>
          <div>
            <label className={`block text-sm font-medium ${themeStyles.textMain} mb-1`}>Email Address</label>
            <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#00A651] outline-none transition-all ${themeStyles.inputBg} ${themeStyles.border} ${themeStyles.textMain}`} placeholder="student@school.com" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-[#00A651] hover:bg-[#009040] text-white rounded-xl font-bold transition-colors disabled:opacity-50">
            {loading ? 'Sending...' : 'Send Recovery Link'}
          </button>
          {message && <p className="text-center text-sm font-medium text-[#00A651] mt-4">{message}</p>}
        </form>
        <div className="text-center">
          <button onClick={onBack} className={`text-sm font-bold ${themeStyles.textSub} hover:text-[#00A651]`}>← Back to Login</button>
        </div>
      </div>
    </div>
  );
};

const ResetPasswordScreen = ({ resetToken, onLoginRedirect, themeStyles }) => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, new_password: newPassword })
      });
      
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setMessage("Password successfully reset! You can now log in.");
      } else {
        setMessage(data.detail || "Failed to reset password.");
      }
    } catch (err) {
      setMessage("A network error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center px-6 ${themeStyles.bgMain}`}>
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
          <h2 className={`text-3xl font-extrabold ${themeStyles.textMain}`}>Set New Password</h2>
          <p className={`mt-2 text-sm ${themeStyles.textSub}`}>Enter a strong new password for your account.</p>
        </div>
        <form onSubmit={handleSubmit} className={`p-8 rounded-2xl shadow-xl space-y-6 ${themeStyles.bgCard}`}>
          <div>
            <label className={`block text-sm font-medium ${themeStyles.textMain} mb-1`}>New Password</label>
            <input type="password" required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} minLength="6" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#00A651] outline-none transition-all ${themeStyles.inputBg} ${themeStyles.border} ${themeStyles.textMain}`} placeholder="••••••••" />
          </div>
          {!success ? (
            <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-[#00A651] hover:bg-[#009040] text-white rounded-xl font-bold transition-colors disabled:opacity-50">
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          ) : (
            <button type="button" onClick={onLoginRedirect} className="w-full py-3.5 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-colors">
              Go to Login
            </button>
          )}
          {message && <p className={`text-center text-sm font-medium mt-4 ${success ? 'text-[#00A651]' : 'text-red-500'}`}>{message}</p>}
        </form>
      </div>
    </div>
  );
};



const OnboardingScreen = ({onNavigate, themeStyles}) => {
  const [slide,setSlide] = useState(0);
  const slides = [{icon:'🔍',title:'Discover Your Strengths',desc:'Identify what you are naturally good at and build on it.'},{icon:'📚',title:'Learn Better Every Day',desc:'Find study techniques tailored specifically to how your mind works.'},{icon:'🎯',title:'Find Your Career Path',desc:'Map your unique skills and passions to the perfect career.'}];
  return (
    <div className="flex flex-col min-h-screen px-6 py-10 w-full max-w-md md:max-w-2xl mx-auto fade-in">
      <div className="h-12 flex items-center">{slide>0&&<button onClick={()=>setSlide(p=>p-1)} className={`p-2 -ml-2 ${themeStyles.textSub}`}><Icons.ChevronLeft size={28}/></button>}</div>
      <div className="flex-1 flex flex-col items-center justify-center text-center -mt-10">
        <div key={slide} className="fade-in flex flex-col items-center">
          <div style={{borderColor:'rgba(0,166,81,0.2)'}} className={`w-32 h-32 rounded-3xl flex items-center justify-center text-6xl mb-10 border ${themeStyles.bgCard}`}>{slides[slide].icon}</div>
          <h2 className={`text-2xl font-bold mb-4 ${themeStyles.textMain}`}>{slides[slide].title}</h2>
          <p className={`text-sm max-w-xs leading-relaxed ${themeStyles.textSub}`}>{slides[slide].desc}</p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-auto">
        <div className="flex space-x-2 mb-8">{slides.map((_,i)=><div key={i} style={{backgroundColor:slide===i?'#00A651':''}} className={`h-2.5 rounded-full transition-all duration-300 ${slide===i?'w-8 bg-[#00A651]':'w-2.5 bg-[#112240]'}`}/>)}</div>
        <button onClick={()=>slide<slides.length-1?setSlide(p=>p+1):onNavigate()} style={{backgroundColor:'#00A651'}} className="w-full h-14 text-white font-semibold rounded-xl btn-green-hover">{slide===slides.length-1?'Start Assessment':'Next'}</button>
      </div>
    </div>
  );
};

const ProfileSetupScreen = ({profileData,setProfileData,onNavigate, themeStyles}) => {
  const toggle = (cat,item)=>setProfileData(p=>{const l=p[cat]||[];return{...p,[cat]:l.includes(item)?l.filter(i=>i!==item):[...l,item]};});
  return (
    <div className="flex flex-col min-h-screen px-6 py-10 w-full max-w-md md:max-w-2xl mx-auto fade-in">
      <div className="mb-6">
        <div className={`inline-block px-3 py-1 mb-4 rounded-full border ${themeStyles.bgCard}`}>
          <span className={`text-xs font-semibold ${themeStyles.textSub}`}>Step 2 of 3 — Profile Setup</span>
        </div>
        <h2 className={`text-3xl font-extrabold mb-2 leading-tight ${themeStyles.textMain}`}>Tell us about yourself 👋</h2>
        <p className={`text-sm ${themeStyles.textSub}`}>Help us personalise your experience</p>
      </div>
      <div className="flex-1 space-y-8 pb-8">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className={`font-semibold flex items-center ${themeStyles.textMain}`}>
            <span style={{backgroundColor:'rgba(0,166,81,0.1)',color:'#00A651'}} className="w-6 h-6 rounded flex items-center justify-center text-xs mr-2 font-bold">A</span> Basic Info
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs uppercase font-bold mb-1.5 ml-1 ${themeStyles.textSub}`}>Age</label>
              <input type="number" value={profileData.age||''} onChange={e=>setProfileData({...profileData,age:e.target.value})} placeholder="16" className={`w-full h-12 px-4 rounded-xl outline-none focus:border-[#00A651] border border-transparent ${themeStyles.bgInput} ${themeStyles.textMain}`}/>
            </div>
            <div>
              <label className={`block text-xs uppercase font-bold mb-1.5 ml-1 ${themeStyles.textSub}`}>Grade</label>
              <select value={profileData.grade||''} onChange={e=>setProfileData({...profileData,grade:e.target.value})} className={`w-full h-12 px-4 rounded-xl outline-none focus:border-[#00A651] border border-transparent appearance-none cursor-pointer ${themeStyles.bgInput} ${themeStyles.textMain}`}>
                <option value="" disabled>Select</option>
                {GRADES.map(g=><option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        </div>
        {/* Fav subjects */}
        <div className="space-y-3">
          <h3 className={`font-semibold flex items-center ${themeStyles.textMain}`}>
            <span style={{backgroundColor:'rgba(0,166,81,0.1)',color:'#00A651'}} className="w-6 h-6 rounded flex items-center justify-center text-xs mr-2 font-bold">B</span> Favourite Subjects
          </h3>
          <p className={`text-xs ml-8 ${themeStyles.textSub}`}>Select subjects you enjoy</p>
          <div className="grid grid-cols-3 gap-2.5">
            {SUBJECTS.map(s=>{const sel=(profileData.favSubjects||[]).includes(s.id);return(
              <div key={s.id} onClick={()=>toggle('favSubjects',s.id)} style={{backgroundColor:sel?'rgba(0,166,81,0.15)':'',borderColor:sel?'#00A651':'transparent'}} className={`relative flex flex-col items-center p-3 rounded-2xl border-2 cursor-pointer transition-all ${themeStyles.bgCard}`}>
                {sel&&<Icons.CheckCircle size={14} style={{color:'#00A651'}} className="absolute top-1.5 right-1.5"/>}
                <span className="text-2xl mb-1">{s.icon}</span>
                <span className={`text-[10px] text-center font-medium ${sel?'text-[#00A651] font-semibold':themeStyles.textSub}`}>{s.label}</span>
              </div>
            );})}
          </div>
        </div>
        {/* Difficult subjects */}
        <div className="space-y-3">
          <h3 className={`font-semibold flex items-center ${themeStyles.textMain}`}>
            <span style={{backgroundColor:'rgba(245,158,11,0.1)',color:'#F59E0B'}} className="w-6 h-6 rounded flex items-center justify-center text-xs mr-2 font-bold">C</span> Difficult Subjects
          </h3>
          <p className={`text-xs ml-8 ${themeStyles.textSub}`}>Select subjects you find challenging</p>
          <div className="grid grid-cols-3 gap-2.5">
            {SUBJECTS.map(s=>{const sel=(profileData.difficultSubjects||[]).includes(s.id);return(
              <div key={s.id} onClick={()=>toggle('difficultSubjects',s.id)} style={{backgroundColor:sel?'rgba(245,158,11,0.15)':'',borderColor:sel?'#F59E0B':'transparent'}} className={`relative flex flex-col items-center p-3 rounded-2xl border-2 cursor-pointer transition-all ${themeStyles.bgCard}`}>
                {sel&&<Icons.CheckCircle size={14} style={{color:'#F59E0B'}} className="absolute top-1.5 right-1.5"/>}
                <span className="text-2xl mb-1">{s.icon}</span>
                <span className={`text-[10px] text-center font-medium ${sel?'text-[#F59E0B] font-semibold':themeStyles.textSub}`}>{s.label}</span>
              </div>
            );})}
          </div>
        </div>
        {/* Hobbies */}
        <div className="space-y-3">
          <h3 className={`font-semibold flex items-center ${themeStyles.textMain}`}>
            <span style={{backgroundColor:'rgba(0,166,81,0.1)',color:'#00A651'}} className="w-6 h-6 rounded flex items-center justify-center text-xs mr-2 font-bold">D</span> Hobbies
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {HOBBIES.map(h=>{const sel=(profileData.hobbies||[]).includes(h);return(
              <div key={h} onClick={()=>toggle('hobbies',h)} style={{backgroundColor:sel?'#00A651':'',color:sel?'white':''}} className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${themeStyles.bgCard} ${sel?'':themeStyles.textSub}`}>{h}</div>
            );})}
          </div>
        </div>
        {/* Dream */}
        <div className="space-y-3">
          <h3 className={`font-semibold flex items-center ${themeStyles.textMain}`}>
            <span style={{backgroundColor:'rgba(0,166,81,0.1)',color:'#00A651'}} className="w-6 h-6 rounded flex items-center justify-center text-xs mr-2 font-bold">E</span> Dream Career
          </h3>
          <input value={profileData.dreamCareer||''} onChange={e=>setProfileData({...profileData,dreamCareer:e.target.value})} placeholder="e.g. Doctor, Software Engineer..." className={`w-full h-12 px-4 rounded-xl outline-none focus:border-[#00A651] border border-transparent ${themeStyles.bgInput} ${themeStyles.textMain}`}/>
        </div>
      </div>
      <div className={`w-full mt-4 pt-4 border-t ${themeStyles.border}`}>
        <button onClick={onNavigate} style={{backgroundColor:'#00A651'}} className="w-full h-14 text-white font-semibold rounded-xl btn-green-hover shadow-md">Continue to Assessment</button>
      </div>
    </div>
  );
};

const AssessmentScreen = ({answers,setAnswers,onComplete, themeStyles}) => {
  const [step,setStep] = useState(0);
  const q = ASSESSMENT_QUESTIONS[step];
  const handleSingle = v=>setAnswers(p=>({...p,[q.id]:v}));
  const handleMulti = v=>setAnswers(p=>{const c=p[q.id]||[];return{...p,[q.id]:c.includes(v)?c.filter(i=>i!==v):[...c,v]};});
  const ans = answers[q.id];
  const isValid = Array.isArray(ans)?ans.length>0:(ans!==undefined&&ans!=='');
  return (
    <div className="flex flex-col min-h-screen px-6 py-8 w-full max-w-md md:max-w-2xl mx-auto fade-in">
      <div className="w-full mb-8">
        <div className="flex justify-between items-center mb-4">
          <button onClick={()=>step>0?setStep(p=>p-1):null} className={`p-2 -ml-2 ${themeStyles.textSub} ${step===0?'opacity-0 cursor-default':''}`} disabled={step===0}><Icons.ChevronLeft size={28}/></button>
          <span style={{color:'#00A651'}} className="text-xs font-bold tracking-wider uppercase">{q.part}</span>
          <div className="w-8"/>
        </div>
        <div className={`w-full h-2 rounded-full overflow-hidden ${themeStyles.tagBg}`}>
          <div style={{width:`${((step+1)/ASSESSMENT_QUESTIONS.length)*100}%`,backgroundColor:'#00A651'}} className="h-full rounded-full transition-all duration-500"/>
        </div>
        <div className={`text-right mt-2 text-xs font-semibold ${themeStyles.textSub}`}>{step+1} of {ASSESSMENT_QUESTIONS.length}</div>
      </div>
      <h2 className={`text-3xl font-extrabold mb-8 leading-tight animate-slide-up ${themeStyles.textMain}`} key={`t-${step}`}>
        {q.text}{q.type.includes('multi')&&<span className={`block text-sm font-normal mt-2 ${themeStyles.textSub}`}>Select all that apply</span>}
      </h2>
      <div className="flex-1 overflow-y-auto pb-4 scrollbar-hide animate-slide-up" key={`g-${step}`}>
        {q.type.includes('subjects')?(
          <div className="grid grid-cols-3 gap-3">
            {SUBJECTS.map(sub=>{const isSel=q.type==='subjects_multi'?(ans||[]).includes(sub.id):ans===sub.id;return(
              <div key={sub.id} onClick={()=>q.type.includes('multi')?handleMulti(sub.id):handleSingle(sub.id)}
                style={{backgroundColor:isSel?'rgba(0,166,81,0.15)':'',borderColor:isSel?'#00A651':'transparent'}}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${themeStyles.bgCard}`}>
                {isSel&&<Icons.CheckCircle size={16} style={{color:'#00A651'}} className="absolute top-2 right-2"/>}
                <span className="text-3xl mb-2">{sub.icon}</span>
                <span className={`text-xs text-center font-medium ${isSel?'text-green-500':themeStyles.textSub}`}>{sub.label}</span>
              </div>
            );})}
          </div>
        ):(
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {q.options?.map(opt=>{const isSel=q.type==='multi'?(ans||[]).includes(opt.id):ans===opt.id;return(
              <div key={opt.id} onClick={()=>q.type==='multi'?handleMulti(opt.id):handleSingle(opt.id)}
                style={{backgroundColor:isSel?'rgba(0,166,81,0.15)':'',borderColor:isSel?'#00A651':'transparent'}}
                className={`relative flex items-center p-4 min-h-20 rounded-2xl border-2 cursor-pointer transition-all ${themeStyles.bgCard}`}>
                {opt.icon&&<span className="text-2xl mr-3">{opt.icon}</span>}
                <span className={`text-sm font-bold leading-snug ${isSel?'text-green-500':themeStyles.textMain}`}>{opt.label}</span>
                <div style={{borderColor:isSel?'#00A651':'',backgroundColor:isSel?'#00A651':'transparent'}} className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSel?'':'border-slate-300'}`}>
                  {isSel&&<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              </div>
            );})}
          </div>
        )}
      </div>
      <div className={`w-full mt-4 pt-4 border-t ${themeStyles.border}`}>
        <button disabled={!isValid} onClick={()=>step<ASSESSMENT_QUESTIONS.length-1?setStep(p=>p+1):onComplete()}
          style={{backgroundColor:isValid?'#00A651':''}}
          className={`w-full h-14 font-semibold text-lg rounded-xl flex items-center justify-center transition-all ${isValid ? 'text-white' : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed'}`}>
          {step===ASSESSMENT_QUESTIONS.length-1?'Finish Assessment ✓':'Next Question ➔'}
        </button>
      </div>
    </div>
  );
};

const ProcessingScreen = ({ themeStyles }) => {
  const [ti,setTi] = useState(0);
  const texts = ['Analyzing your strengths...','Identifying your interests...','Mapping career paths...','Building your profile...'];
  useEffect(()=>{
    const iv = setInterval(()=>setTi(p=>p<texts.length-1?p+1:p),1500);
    return()=>{clearInterval(iv);};
  },[]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 w-full max-w-md mx-auto">
      <div className="relative w-28 h-28 mb-10 flex items-center justify-center">
        <div style={{backgroundColor:'rgba(0,166,81,0.2)', animationDuration:'2s'}} className="absolute inset-0 rounded-full animate-ping"/>
        <div style={{backgroundColor:'rgba(0,166,81,0.3)', animationDuration:'2.5s', animationDelay:'0.5s'}} className="absolute inset-2 rounded-full animate-ping"/>
        <div className={`absolute inset-4 border-4 rounded-full ${themeStyles.border}`}/>
        <div style={{borderColor:'#00A651', borderTopColor:'transparent', animationDuration:'1s'}} className="absolute inset-4 border-4 rounded-full animate-spin"/>
        <div className="absolute inset-0 flex items-center justify-center text-4xl">🧠</div>
      </div>
      <div className="h-8 relative w-full overflow-hidden flex justify-center">
        {texts.map((text,idx)=>(
          <h2 key={idx} className={`absolute text-xl font-semibold transition-all duration-500 ease-in-out text-center w-full ${themeStyles.textMain} ${idx===ti?'opacity-100 translate-y-0':idx<ti?'opacity-0 -translate-y-full':'opacity-0 translate-y-full'}`}>{text}</h2>
        ))}
      </div>
    </div>
  );
};

const CareerDetailsScreen = ({career,onBack, themeStyles}) => {
  const [goalAdded,setGoalAdded] = useState(false);
  const d = CAREER_DETAILS[career.id] || {icon:career.icon,title:career.title,description:`${career.title} is a rewarding career path combining skill, passion, and purpose.`,skills:['Communication','Critical Thinking','Dedication','Problem Solving'],subjects:SUBJECTS.slice(0,3),education:[{step:1,label:'Secondary School',detail:'Core relevant subjects'},{step:2,label:'University Degree',detail:"Related Bachelor's programme"},{step:3,label:'Professional Development',detail:'Certifications and specializations'}],salaryEntry:'₦60k – ₦120k',salaryMid:'₦200k – ₦400k',salarySenior:'₦500k+',salaryBarEntry:20,salaryBarMid:50,salaryBarSenior:90,universities:['UNILAG','University of Ibadan','OAU','NOUN','Covenant University']};
  return (
    
    <div className="flex flex-col h-screen w-full max-w-md md:max-w-3xl mx-auto fade-in">
      <div className={`pt-10 pb-4 px-6 sticky top-0 z-10 border-b flex items-center justify-between ${themeStyles.bg} ${themeStyles.border}`}>
        <button onClick={onBack} className={`p-2 -ml-2 rounded-full ${themeStyles.textSub}`}><Icons.ChevronLeft size={28}/></button>
        <span className={`font-semibold ${themeStyles.textMain}`}>Career Details</span>
        <div className="w-8"/>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-6">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center space-x-4 mb-4">
            <div style={{backgroundColor:'rgba(0,166,81,0.15)',border:'2px solid rgba(0,166,81,0.3)'}} className="w-16 h-16 rounded-full flex items-center justify-center text-3xl">{d.icon}</div>
            <div>
              <h1 className={`text-2xl font-bold leading-tight ${themeStyles.textMain}`}>{d.title}</h1>
              <span style={{backgroundColor:'rgba(0,166,81,0.15)',color:'#00A651'}} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mt-1">✓ Recommended for you</span>
            </div>
          </div>
        </div>
      </div>

        <div className="md:grid md:grid-cols-2 md:gap-6 md:p-6">
        <div className="px-6 space-y-4 md:px-0 animate-slide-up">
          <div className={`rounded-2xl p-5 ${themeStyles.bgCard}`}>
            <h3 className={`font-bold text-sm uppercase tracking-wider mb-3 ${themeStyles.textMain}`}>ℹ️ About This Career</h3>
            <p className={`text-sm leading-relaxed ${themeStyles.textSub}`}>{d.description}</p>
          </div>
          <div className={`rounded-2xl p-5 ${themeStyles.bgCard}`}>
            <h3 className={`font-bold text-sm uppercase tracking-wider mb-3 ${themeStyles.textMain}`}>⚡ Skills You'll Need</h3>
            <div className="flex flex-wrap gap-2">
              {d.skills.map(s=><span key={s} style={{backgroundColor:'rgba(0,166,81,0.1)',color:'#00A651',borderColor:'rgba(0,166,81,0.2)'}} className="px-3 py-1.5 rounded-full text-xs font-medium border">{s}</span>)}
            </div>
          </div>
          <div className={`rounded-2xl p-5 ${themeStyles.bgCard}`}>
            <h3 className={`font-bold text-sm uppercase tracking-wider mb-3 ${themeStyles.textMain}`}>📚 Recommended Subjects</h3>
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-1">
              {d.subjects.map(s=>(
                <div key={s.id||s.label} className={`min-w-20 flex flex-col items-center p-3 rounded-xl flex-shrink-0 ${themeStyles.tagBg}`}>
                  <span className="text-2xl mb-1.5">{s.icon}</span>
                  <span className={`text-[10px] text-center font-medium ${themeStyles.textSub}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`rounded-2xl p-5 ${themeStyles.bgCard}`}>
            <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 ${themeStyles.textMain}`}>🎓 Education Path</h3>
            {d.education.map((edu,i)=>(
              <div key={i} className="flex items-start">
                <div className="flex flex-col items-center mr-4 flex-shrink-0">
                  <div style={{backgroundColor:'#00A651'}} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold">{edu.step}</div>
                  {i<d.education.length-1&&<div style={{backgroundColor:'rgba(0,166,81,0.3)'}} className="w-0.5 h-7 my-1"/>}
                </div>
                <div className="pb-2 flex-1 pt-1">
                  <p className={`font-semibold text-sm ${themeStyles.textMain}`}>{edu.label}</p>
                  <p className={`text-xs mt-0.5 leading-relaxed ${themeStyles.textSub}`}>{edu.detail}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
          <div className="space-y-4 px-6 md:px-0 animate-slide-up">
          <div className={`rounded-2xl p-5 ${themeStyles.bgCard}`}>
            <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 ${themeStyles.textMain}`}>💰 Average Salary (Nigeria)</h3>
            <div className="space-y-4">
              {[{label:'Entry Level',value:d.salaryEntry,bar:d.salaryBarEntry,color:'#00A651'},{label:'Mid Level',value:d.salaryMid,bar:d.salaryBarMid,color:'#3B82F6'},{label:'Senior Level',value:d.salarySenior,bar:d.salaryBarSenior,color:'#F59E0B'}].map(item=>(
                <div key={item.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className={`text-xs font-medium ${themeStyles.textSub}`}>{item.label}</span>
                    <span className={`text-xs font-bold ${themeStyles.textMain}`}>{item.value}</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${themeStyles.tagBg}`}>
                    <div style={{width:`${item.bar}%`,backgroundColor:item.color}} className="h-full rounded-full transition-all duration-700"/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`rounded-2xl p-5 ${themeStyles.bgCard}`}>
            <h3 className={`font-bold text-sm uppercase tracking-wider mb-3 ${themeStyles.textMain}`}>🏫 Top Institutions in Nigeria</h3>
            <div className="space-y-2">
              {d.universities.map((uni,i)=>(
                <div key={i} className="flex items-center space-x-3 py-1.5">
                  <div style={{backgroundColor:'rgba(0,166,81,0.2)',color:'#00A651'}} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{i+1}</div>
                  <span className={`text-sm font-medium ${themeStyles.textSub}`}>{uni}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={()=>setGoalAdded(true)}
            style={{backgroundColor:goalAdded?'transparent':'#00A651',borderColor:goalAdded?'#00A651':'transparent',color:goalAdded?'#00A651':'white',border:goalAdded?'2px solid #00A651':'none'}}
            className="w-full h-14 font-semibold rounded-xl flex items-center justify-center space-x-2">
            {goalAdded?<>✓ <span>Added to My Goals</span></>:<><Icons.Target size={20}/><span>Add to My Goals</span></>}
          </button>

        </div>
      </div>
      </div>
  );
};

// ─── Dashboard Tabs ───────────────────────────────────────────────────────────
const OverviewTab = ({recommendations,onCareerSelect, themeStyles}) => (
  <div className="md:grid md:grid-cols-5 md:gap-8 space-y-6 md:space-y-0">
  <div className="md:col-span-2 space-y-6">
    <div classNamestyle={{borderColor:'#00A651'}} className={`rounded-r-2xl rounded-l-sm border-l-4 p-5 ${themeStyles.bgCard}`}>
      <h3 className={`font-bold text-sm uppercase tracking-wider mb-3 ${themeStyles.textMain}`}>Your Strengths 💪</h3>
      <div className="flex flex-wrap gap-2">
        {recommendations.strengths.map(s=><span key={s} style={{backgroundColor:'rgba(0,166,81,0.1)',color:'#00A651',borderColor:'rgba(0,166,81,0.2)'}} className="border px-3 py-1.5 rounded-full text-xs font-medium">{s}</span>)}
      </div>
    </div>
    <div style={{borderColor:'#F59E0B'}} className={`rounded-r-2xl rounded-l-sm border-l-4 p-5 ${themeStyles.bgCard}`}>
      <h3 className={`font-bold text-sm uppercase tracking-wider mb-3 ${themeStyles.textMain}`}>Areas to Grow 📈</h3>
      <div className="flex flex-wrap gap-2">
        {recommendations.weaknesses.map(w=><span key={w} style={{backgroundColor:'rgba(245,158,11,0.1)',color:'#F59E0B',borderColor:'rgba(245,158,11,0.2)'}} className="border px-3 py-1.5 rounded-full text-xs font-medium">{w}</span>)}
      </div>
    </div>
    <div>
      <h3 className={`font-bold text-sm uppercase tracking-wider mb-3 ${themeStyles.textMain}`}>Recommended Subjects 📚</h3>
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-2">
        {recommendations.subjects.map(sub=>(
          <div key={sub.id} className={`min-w-28 p-4 rounded-2xl flex flex-col items-center flex-shrink-0 ${themeStyles.bgCard}`}>
            <span className="text-3xl mb-2">{sub.icon}</span>
            <span className={`text-xs font-bold text-center ${themeStyles.textSub}`}>{sub.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
     <div className="md:col-span-3">
      <h3 className={`font-bold text-sm uppercase tracking-wider mb-3 flex items-center justify-between ${themeStyles.textMain}`}>
        Career Paths for You 🎯
        <span style={{color:'#00A651'}} className="text-xs font-normal cursor-pointer">View All</span>
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {recommendations.careers.map(career=>(
          <div key={career.id} onClick={()=>onCareerSelect(career)} className={`p-4 rounded-2xl flex flex-col cursor-pointer hover:border-[#00A651] border-2 border-transparent transition-all ${themeStyles.bgCard}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-3 ${themeStyles.tagBg}`}>{career.icon}</div>
            <h4 className={`font-bold text-sm leading-tight mb-1 ${themeStyles.textMain}`}>{career.title}</h4>
            <p className={`text-[11px] leading-snug mb-3 flex-1 ${themeStyles.textSub}`}>{career.desc}</p>
            <span style={{color:'#00A651'}} className="text-xs font-semibold">Explore →</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CareersTab = ({recommendations,onCareerSelect, themeStyles}) => {
  const [cat,setCat] = useState('All');
  const filtered = cat==='All'?ALL_CAREERS:ALL_CAREERS.filter(c=>c.category===cat);
  const isRec = id=>recommendations.careers.some(c=>c.id===id);
  return (
    <div className="space-y-5">
      <div style={{background:'linear-gradient(to right, rgba(0,166,81,0.1), transparent)',borderColor:'rgba(0,166,81,0.2)'}} className={`rounded-2xl p-4 border flex flex-col ${themeStyles.bgCard}`}>
        <p style={{color:'#00A651'}} className="text-xs font-bold mb-1 uppercase tracking-wider">✨ PERSONALISED FOR YOU</p>
        <p className={`text-sm font-medium ${themeStyles.textMain}`}>Based on your assessment, we've highlighted your best career matches below.</p>
      </div>
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-1">
        {CAREER_CATEGORIES.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{backgroundColor:cat===c?'#00A651':''}} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold flex-shrink-0 transition-colors ${cat===c?'text-white':`${themeStyles.bgCard} ${themeStyles.textSub}`}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(career=>{const rec=isRec(career.id);return(
          <div key={career.id} onClick={()=>onCareerSelect(career)} style={{borderColor:rec?'rgba(0,166,81,0.4)':'transparent'}} className={`p-4 rounded-2xl border-2 flex flex-col cursor-pointer transition-all ${themeStyles.bgCard}`}>
            {rec&&<span style={{color:'#00A651'}} className="text-[9px] font-extrabold uppercase mb-2 tracking-wider">⭐ Recommended Match</span>}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-3 ${themeStyles.tagBg}`}>{career.icon}</div>
            <h4 className={`font-bold text-sm leading-tight mb-1 ${themeStyles.textMain}`}>{career.title}</h4>
            <p className={`text-[11px] leading-snug mb-3 flex-1 ${themeStyles.textSub}`}>{career.desc}</p>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold w-fit ${themeStyles.tagBg} ${themeStyles.textSub}`}>{career.category}</span>
          </div>
        );})}
      </div>
    </div>
  );
};

const LearningTab = ({themeStyles, progressData, setProgressData}) => {
  // Find today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  const todayData = progressData.find(p => p.date === today);

  useEffect(() => {
    if (todayData && todayData.completed_tasks) {
      setChecked(todayData.completed_tasks);
    }
  }, [todayData]);
  const [checked,setChecked] = useState([]);
  const [toast,setToast] = useState(null);
  
  const tasks = ['Review today\'s difficult topic','Complete 1 practice quiz','Read for 20 minutes','Watch 1 lesson video','Write key concept summaries'];
  
  const showToast = msg=>{setToast(msg);setTimeout(()=>setToast(null),2500);};

  const toggle = async (i) => {
    // 1. Calculate the new checked state
    const newChecked = checked.includes(i) ? checked.filter(x=>x!==i) : [...checked,i];
    setChecked(newChecked);

    // 2. Calculate the score (out of 100)
    const newScore = Math.round((newChecked.length / tasks.length) * 100);

    // 3. Update React state immediately so the UI feels fast
    const updatedProgress = progressData.filter(p => p.date !== today);
    updatedProgress.push({ date: today, completed_tasks: newChecked, score: newScore });
    setProgressData(updatedProgress);

    // 4. Save quietly to the FastAPI database in the background
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      await fetch(`${API_URL}/api/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ date: today, completed_tasks: newChecked, score: newScore })
      });
    } catch (e) {
      console.error("Failed to save task to database", e);
    }
  };

  const pct = Math.round((checked.length/tasks.length)*100);
  const circ = 2*Math.PI*32;

  return (
    <div className="md:grid md:grid-cols-2 md:gap-8 space-y-6">
      {toast&&<div style={{backgroundColor:'#00A651',left:'50%',transform:'translateX(-50%)'}} className="fixed top-6 z-50 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-xl animate-slide-up">{toast}</div>}
      <div className= "space-y-6">
      <div className={`rounded-2xl p-5 ${themeStyles.bgCard}`}>
        <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 ${themeStyles.textMain}`}>🎯 Today's Study Goal</h3>
        <div className="flex items-center space-x-5">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="8"/>
              <circle cx="40" cy="40" r="32" fill="none" stroke="#00A651" strokeWidth="8" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)} style={{transition:'stroke-dashoffset 0.5s ease'}}/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center"><span className={`font-extrabold text-base ${themeStyles.textMain}`}>{pct}%</span></div>
          </div>
          <div className="flex-1">
            <p className={`font-bold text-sm ${themeStyles.textMain}`}>{checked.length} of {tasks.length} tasks done</p>
            <p className={`text-xs mt-1 leading-snug ${themeStyles.textSub}`}>Step-by-step progress ensures top school performance.</p>
          </div>
        </div>
      </div>
      <div className={`rounded-2xl p-5 ${themeStyles.bgCard}`}>
        <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 ${themeStyles.textMain}`}>✅ Daily Checklist</h3>
        <div className="space-y-3">
          {tasks.map((task,i)=>{const done=checked.includes(i);return(
            <div key={i} onClick={()=>toggle(i)} className="flex items-center space-x-3 cursor-pointer select-none">
              <div style={{backgroundColor:done?'#00A651':'',borderColor:done?'#00A651':''}} className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${done?'border-[#00A651]':'border-slate-300 dark:border-slate-600'}`}>
                {done&&<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span className={`text-sm transition-all ${done?'line-through text-slate-400 dark:text-slate-600 font-medium':`${themeStyles.textMain} font-semibold`}`}>{task}</span>
            </div>
          );})}
        </div>
      </div>
      <div>
        <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 ${themeStyles.textSub}`}>💡 Study Tips</h3>
        <div className="space-y-3">
          {STUDY_TIPS.map((tip,i)=>(
            <div key={i} className={`rounded-2xl p-4 flex items-start space-x-3 ${themeStyles.bgCard}`}>
              <span className="text-2xl flex-shrink-0">{tip.icon}</span>
              <div><p className={`font-bold text-sm mb-0.5 ${themeStyles.textMain}`}>{tip.title}</p><p className={`text-xs leading-relaxed ${themeStyles.textSub}`}>{tip.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
      </div>
      <div className="space-y-6">
      <div>
        <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 ${themeStyles.textSub}`}>📝 Practice Quizzes</h3>
        <div className="space-y-3">
          {QUIZZES.map((q,i)=>(
            <div key={i} className={`rounded-2xl p-4 flex items-center justify-between ${themeStyles.bgCard}`}>
              <div className="flex items-center space-x-3">
                <div style={{backgroundColor:'rgba(0,166,81,0.1)'}} className="w-10 h-10 rounded-xl flex items-center justify-center text-xl">{q.icon}</div>
                <div><p className={`font-bold text-sm ${themeStyles.textMain}`}>{q.subject}</p><p className={`text-xs ${themeStyles.textSub}`}>{q.questions} questions • {q.time}</p></div>
              </div>
              <button onClick={()=>showToast('Coming soon! 🚀')} style={{color:'#00A651',borderColor:'rgba(0,166,81,0.4)'}} className="px-4 py-2 rounded-full text-xs font-semibold border hover:bg-[#00A651]/5 transition-colors">Start →</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 ${themeStyles.textSub}`}>🎬 Video Lessons</h3>
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-2">
          {VIDEO_LESSONS.map((v,i)=>(
             <div key={i} onClick={()=>showToast('Videos coming soon! 🎬')} className={`min-w-40 rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 ${themeStyles.bgCard}`}>
              <div className={`h-20 flex items-center justify-center text-4xl ${themeStyles.tagBg}`}>{v.icon}</div>
              <div className="p-3"><p className={`text-xs font-bold leading-snug mb-1 ${themeStyles.textMain}`}>{v.title}</p><p className={`text-[10px] ${themeStyles.textSub}`}>{v.duration} • {v.subject}</p></div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

const ProgressTab = ({recommendations, themeStyles, progressData}) => {
  const [animateBars, setAnimateBars] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimateBars(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Generate dynamic chart data covering exactly the last 7 days ending on today
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayDate = new Date();
  const dynamicWeeklyData = [];
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date(todayDate);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Check if the user completed tasks on this date in the database
    const record = progressData.find(p => p.date === dateStr);
    
    dynamicWeeklyData.push({
      day: days[d.getDay()],
      score: record ? record.score : 0,
      isToday: i === 0 // The very last item in the loop is today
    });
  }

  // Set the max chart height (minimum 10 so it doesn't break if all scores are 0)
  const max = Math.max(...dynamicWeeklyData.map(d=>d.score), 10); 
  const improvements = recommendations.weaknesses.map((w,i)=>({label:w,value:(i*15)+45}));

  return (
    <div className="md:grid md:grid-cols-2 md:gap-8 space-y-6 md:space-y-0">
     <div className="space-y-6">
      <div style={{background:'linear-gradient(to right, rgba(245,158,11,0.1), transparent)',borderColor:'rgba(245,158,11,0.2)'}} className={`rounded-2xl p-5 border flex items-center justify-between ${themeStyles.bgCard}`}>
        <div>
          <p style={{color:'#F59E0B'}} className="text-xs font-bold uppercase tracking-wider mb-1">🔥 Study Streak</p>
          <p className={`text-2xl font-bold ${themeStyles.textMain}`}>3-day streak!</p>
          <p className={`text-xs mt-1 ${themeStyles.textSub}`}>Keep going to unlock the 🏆 badge</p>
        </div>
        <div className="text-5xl animate-bounce">🔥</div>
      </div>

      <div className={`rounded-2xl p-5 ${themeStyles.bgCard}`}>
        <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 ${themeStyles.textMain}`}>📊 Weekly Activity</h3>
        <div className="flex items-end justify-between space-x-1.5 h-28">
          {dynamicWeeklyData.map((d, i)=>{
            const h = Math.round((d.score/max)*100);
            return(
            <div key={`${d.day}-${i}`} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center" style={{height:'80px'}}>
                <div style={{
                  height: animateBars ? `${h}%` : '0%', 
                  backgroundColor: d.isToday ? '#00A651' : 'rgba(0,166,81,0.3)',
                  minHeight: animateBars ? '8px' : '0px',
                  boxShadow: d.isToday && animateBars ? '0 0 12px rgba(0,166,81,0.4)' : 'none'
                }} className="w-full rounded-t-md transition-all duration-1000 ease-out"/>
              </div>
              <span style={{color:d.isToday?'#00A651':''}} className={`text-[10px] mt-1.5 font-bold ${d.isToday?'':themeStyles.textSub}`}>{d.day}</span>
            </div>
          );})}
        </div>
      </div>

      <div className={`rounded-2xl p-5 ${themeStyles.bgCard}`}>
        <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 ${themeStyles.textMain}`}>📋 Assessment History</h3>
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <p className={`text-xs ${themeStyles.textSub}`}>Last completed</p>
            <p className={`font-semibold text-sm mt-0.5 ${themeStyles.textMain}`}>Today</p>
            <p style={{color:'#00A651'}} className="text-xs mt-1 font-medium leading-snug">
              Top strength: {recommendations.strengths.join(', ')}
            </p>
          </div>
          <button style={{color:'#00A651',borderColor:'rgba(0,166,81,0.4)'}} className="px-4 py-2 rounded-full text-xs font-semibold border hover:bg-[#00A651]/5 transition-colors">Retake →</button>
        </div>
      </div>
    </div>
    
    <div className="space-y-6">
      <div className={`rounded-2xl p-5 ${themeStyles.bgCard}`}>
        <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 ${themeStyles.textMain}`}>📈 Improvement Progress</h3>
        <div className="space-y-4">
          {improvements.map((item,i)=>(
            <div key={i}>
              <div className="flex justify-between mb-1.5">
                <span className={`text-xs font-semibold truncate mr-2 ${themeStyles.textSub}`}>{item.label}</span>
                <span className={`text-xs font-bold ${themeStyles.textMain}`}>{item.value}%</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${themeStyles.tagBg}`}>
                <div style={{
                  width: animateBars ? `${item.value}%` : '0%', 
                  background:'linear-gradient(to right, #00A651, #3B82F6)'
                }} className="h-full rounded-full transition-all duration-1000 ease-out delay-300"/>
              </div>
            </div>
          ))}
        </div>
       </div>
        <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 ${themeStyles.textSub}`}>🏅 Achievement Badges</h3>
        <div className="grid grid-cols-3 gap-3">
          {BADGES.map((b,i)=>(
            <div key={i} style={{borderColor:b.earned?'rgba(0,166,81,0.3)':'transparent'}} className={`flex flex-col items-center p-3 rounded-2xl border-2 ${themeStyles.bgCard} ${b.earned?'opacity-100':'opacity-40'}`}>
              <span className="text-3xl mb-1.5">{b.earned?b.icon:'🔒'}</span>
              <span className={`text-[10px] font-bold text-center leading-tight ${themeStyles.textMain}`}>{b.label}</span>
              {b.earned&&<span style={{color:'#00A651'}} className="text-[8px] mt-1 font-semibold">{b.date}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const ProfileTab = ({userData,profileData, onRetakeAssessment, themeStyles, toggleTheme, isDark, onEditProfile, onLogOut, onDeleteAccount}) => {
  const rawName = (userData&&userData.name)?userData.name.trim().split(' ')[0]:'Student';
  const initial = rawName.charAt(0).toUpperCase();
  const [notifs,setNotifs] = useState(true);

  return (
    <div className="space-y-5 pb-4">
      {/* User Info Card */}
      <div className={`rounded-2xl p-5 flex items-center space-x-4 ${themeStyles.bgCard}`}>
        <div style={{backgroundColor:'#00A651',boxShadow:'0 0 16px rgba(0,166,81,0.3)'}} className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">{initial}</div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-extrabold text-lg truncate ${themeStyles.textMain}`}>{rawName}</h3>
          <p className={`text-sm truncate font-medium ${themeStyles.textSub}`}>{userData.school||'Not Set'}</p>
          <div className="flex items-center space-x-2 mt-1.5">
            <span style={{backgroundColor:'rgba(0,166,81,0.15)',color:'#00A651'}} className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold">{userData.role||'Student'}</span>
            {profileData.grade&&<span className={`inline-block px-2.5 py-0.5 rounded-full text-xs border font-medium ${themeStyles.border} ${themeStyles.textSub}`}>{profileData.grade}</span>}
          </div>
        </div>
      </div>

      {/* Grid Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[{icon:'🎯',label:'Careers',val:'4'},{icon:'📚',label:'Subjects',val:String((profileData.favSubjects||[]).length||0)},{icon:'🏅',label:'Badges',val:'2'}].map(s=>(
          <div key={s.label} className={`rounded-2xl p-3 flex flex-col items-center ${themeStyles.bgCard}`}>
            <span className="text-2xl mb-1">{s.icon}</span>
            <span className={`font-extrabold text-lg leading-none ${themeStyles.textMain}`}>{s.val}</span>
            <span className={`text-[10px] mt-1 font-semibold ${themeStyles.textSub}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Action Banners */}
      <div style={{background:'linear-gradient(to right, rgba(0,166,81,0.1), transparent)',borderColor:'rgba(0,166,81,0.15)'}} className={`rounded-2xl p-4 border flex items-center justify-between ${themeStyles.bgCard}`}>
        <div>
          <p className={`font-bold text-sm ${themeStyles.textMain}`}>Retake Assessment</p>
          <p className={`text-xs mt-0.5 ${themeStyles.textSub}`}>Refresh your career recommendations</p>
        </div>
        <button onClick={onRetakeAssessment} style={{backgroundColor:'#00A651'}} className="px-4 py-2 rounded-full text-xs font-semibold text-white flex-shrink-0 shadow-sm hover:brightness-110">Retake →</button>
      </div>

      {/* System Settings List */}
      <div className={`rounded-2xl overflow-hidden border ${themeStyles.border} ${themeStyles.bgCard}`}>
        {/* Theme Changer in List */}
        <div onClick={toggleTheme} className={`flex items-center justify-between px-5 py-4 cursor-pointer border-b ${themeStyles.border} transition-colors ${themeStyles.bgCardHover}`}>
          <div className="flex items-center space-x-3">
            <span className={themeStyles.textSub}>
              {isDark ? <Icons.Sun size={18}/> : <Icons.Moon size={18}/>}
            </span>
            <span className={`text-sm font-bold ${themeStyles.textMain}`}>
              {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </span>
          </div>
          <span className={`text-xs font-semibold ${themeStyles.textSub}`}>{isDark ? 'Light' : 'Dark'}</span>
        </div>

        {/* Edit Profile option */}
        <div onClick={onEditProfile} className={`flex items-center justify-between px-5 py-4 cursor-pointer border-b ${themeStyles.border} transition-colors ${themeStyles.bgCardHover}`}>
          <div className="flex items-center space-x-3">
            <span className={themeStyles.textSub}><Icons.Edit size={18}/></span>
            <span className={`text-sm font-bold ${themeStyles.textMain}`}>Edit Profile</span>
          </div>
          <Icons.ChevronRight size={16} className={themeStyles.textSub}/>
        </div>

        {/* Notifications toggle */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${themeStyles.border}`}>
          <div className="flex items-center space-x-3">
            <span className={themeStyles.textSub}><Icons.Bell size={18}/></span>
            <span className={`text-sm font-bold ${themeStyles.textMain}`}>Notifications</span>
          </div>
          <div onClick={() => setNotifs(!notifs)} style={{backgroundColor:notifs?'#00A651':''}} className={`w-11 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${notifs ? '' : 'bg-slate-300 dark:bg-slate-800'}`}>
            <div style={{transform:notifs?'translateX(20px)':'translateX(0)'}} className="w-5 h-5 rounded-full bg-white shadow transition-transform"/>
          </div>
        </div>

        {/* Share option */}
        <div className={`flex items-center justify-between px-5 py-4 cursor-pointer border-b ${themeStyles.border} transition-colors ${themeStyles.bgCardHover}`}>
          <div className="flex items-center space-x-3">
            <span className={themeStyles.textSub}><Icons.Share size={18}/></span>
            <span className={`text-sm font-bold ${themeStyles.textMain}`}>Share My Report</span>
          </div>
          <Icons.ChevronRight size={16} className={themeStyles.textSub}/>
        </div>

        {/* Privacy option */}
        <div className={`flex items-center justify-between px-5 py-4 cursor-pointer border-b ${themeStyles.border} transition-colors ${themeStyles.bgCardHover}`}>
          <div className="flex items-center space-x-3">
            <span className={themeStyles.textSub}><Icons.Shield size={18}/></span>
            <span className={`text-sm font-bold ${themeStyles.textMain}`}>Privacy & Security</span>
          </div>
          <Icons.ChevronRight size={16} className={themeStyles.textSub}/>
        </div>

        {/* FAQ option */}
        <div className={`flex items-center justify-between px-5 py-4 cursor-pointer border-b ${themeStyles.border} transition-colors ${themeStyles.bgCardHover}`}>
          <div className="flex items-center space-x-3">
            <span className={themeStyles.textSub}><Icons.HelpCircle size={18}/></span>
            <span className={`text-sm font-bold ${themeStyles.textMain}`}>Help & FAQ</span>
          </div>
          <Icons.ChevronRight size={16} className={themeStyles.textSub}/>
        </div>

        {/* Real working Log Out option */}
        <div onClick={onLogOut} className={`flex items-center justify-between px-5 py-4 cursor-pointer transition-colors ${themeStyles.bgCardHover}`}>
          <div className="flex items-center space-x-3">
            <span className="text-red-500"><Icons.LogOut size={18}/></span>
            <span className="text-sm font-bold text-red-500">Log Out</span>
          </div>
          <Icons.ChevronRight size={16} className="text-red-300"/>
        </div>
        {/* Danger Zone: Delete Account */}
        <div onClick={onDeleteAccount} className={`flex items-center justify-between px-5 py-4 cursor-pointer transition-colors ${themeStyles.bgCardHover}`}>
          <div className="flex items-center space-x-3">
            <span className="text-red-500"><Icons.Trash size={18}/></span>
            <span className="text-sm font-bold text-red-500">Delete Account</span>
          </div>
        </div>
      </div>
    </div>
  );
};


const DashboardScreen = ({userData,profileData,recommendations,onCareerSelect,onRetakeAssessment, themeStyles, toggleTheme, isDark, onEditProfile, onLogOut, onDeleteAccount}) => {
  // 1. Check local storage for the last visited tab, default to 'Overview'
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('pathfinder_active_tab') || 'Overview';
  });
  // 2. Save the tab to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('pathfinder_active_tab', activeTab);
  }, [activeTab]);

  const fetchCareerPath = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      
      // We only need the POST method and credentials; no body required!
      const response = await fetch(`${API_URL}/api/generate-career-path`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include" 
      });

      if (!response.ok) throw new Error("Failed to generate advanced path");
      
      const data = await response.json();
      console.log("Subsidy Unlocked:", data.analysis.opay_subsidy_unlocked);
      
      // Save data.analysis to your React state here
      
    } catch (error) {
      console.error(error);
    }
  };


  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        const response = await fetch(`${API_URL}/api/progress`, {
          method: "GET",
          credentials: "include"
        });
        if (response.ok) {
          const data = await response.json();
          setProgressData(data.progress);
        }
      } catch (err) {
        console.error("Failed to fetch progress", err);
      }
    };
    fetchProgress();
  }, []);
  const tabs = [
    {id:'Overview',label:'Home',Icon:Icons.Home},
    {id:'Careers',label:'Careers',Icon:Icons.Briefcase},
    {id:'Learning',label:'Learn',Icon:Icons.BookOpen},
    {id:'Progress',label:'Progress',Icon:Icons.BarChart},
    {id:'Profile',label:'Profile',Icon:Icons.User},
  ];
  const rawName = (userData&&userData.name)?userData.name.trim().split(' ')[0]:'Student';
  const initial = rawName.charAt(0).toUpperCase();
  const headers = {
    Overview:{g:`Hi ${rawName}! 👋`,s:"Here's your personalised PathFinder report"},
    Careers:{g:'Career Paths 💼',s:'Explore and find your perfect fit'},
    Learning:{g:'Learning Hub 📚',s:'Study smarter, not harder'},
    Progress:{g:'Your Progress 📊',s:'Track your growth over time'},
    Profile:{g:'My Profile',s:'Manage your account and settings'}
  };
  const hdr = headers[activeTab];

  return (
    <div className="flex h-screen w-full fade-in">

      {/* ── Desktop Sidebar (hidden on mobile) ── */}
      <aside className={`hidden md:flex flex-col w-60 flex-shrink-0 h-screen sticky top-0 border-r ${themeStyles.bg} ${themeStyles.border}`}>
        {/* Logo / User */}
        <div className="p-5 pb-4 border-b" style={{borderColor:'inherit'}}>
          <div className="flex items-center space-x-3">
            <div style={{backgroundColor:'#00A651',boxShadow:'0 0 10px rgba(0,166,81,0.3)'}} className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold text-white flex-shrink-0">{initial}</div>
            <div className="min-w-0">
              <p className={`font-bold text-sm truncate ${themeStyles.textMain}`}>{userData?.name || 'Student'}</p>
              <p className={`text-[11px] truncate ${themeStyles.textSub}`}>{userData?.school || 'PathFinder'}</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                backgroundColor: activeTab===t.id ? 'rgba(0,166,81,0.1)' : 'transparent',
                color: activeTab===t.id ? '#00A651' : '',
                borderLeft: activeTab===t.id ? '3px solid #00A651' : '3px solid transparent',
              }}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all hover-row-card ${activeTab===t.id ? '' : themeStyles.textSub}`}
            >
              <t.Icon size={18}/>
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar bottom */}
        <div className={`p-3 space-y-1 border-t ${themeStyles.border}`}>
          <button onClick={toggleTheme} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold hover-row-card ${themeStyles.textSub}`}>
            {isDark ? <Icons.Sun size={16}/> : <Icons.Moon size={16}/>}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button onClick={onLogOut} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-500 hover-row-card">
            <Icons.LogOut size={16}/><span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">

        {/* Header */}
        <div className={`pt-10 md:pt-5 pb-4 px-6 sticky top-0 z-10 border-b flex justify-between items-center ${themeStyles.bg} ${themeStyles.border}`}>
          <div>
            <h1 className={`text-xl font-bold leading-tight ${themeStyles.textMain}`}>{hdr.g}</h1>
            <p className={`text-xs mt-0.5 font-medium ${themeStyles.textSub}`}>{hdr.s}</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Theme toggle — only show in header on mobile (desktop has it in sidebar) */}
            <button onClick={toggleTheme} className={`md:hidden p-2 rounded-full border ${themeStyles.border} ${themeStyles.textSub}`}>
              {isDark ? <Icons.Sun size={18}/> : <Icons.Moon size={18}/>}
            </button>
            <div style={{backgroundColor:'#00A651',boxShadow:'0 0 12px rgba(0,166,81,0.3)'}} className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0">{initial}</div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pt-5 pb-28 md:pb-8 md:px-8 scrollbar-hide">
          {/* max-w-5xl keeps content readable on ultra-wide screens */}
          <div className="max-w-5xl mx-auto">
            {activeTab==='Overview'&&<OverviewTab recommendations={recommendations} onCareerSelect={onCareerSelect} themeStyles={themeStyles}/>}
            {activeTab==='Careers'&&<CareersTab recommendations={recommendations} onCareerSelect={onCareerSelect} themeStyles={themeStyles}/>}
            {activeTab==='Learning'&&<LearningTab themeStyles={themeStyles} progressData={progressData} setProgressData={setProgressData}/>}
            {activeTab==='Progress'&&<ProgressTab recommendations={recommendations} themeStyles={themeStyles} progressData={progressData}/>}
            {activeTab==='Profile'&&<ProfileTab userData={userData} profileData={profileData} onRetakeAssessment={onRetakeAssessment} themeStyles={themeStyles} toggleTheme={toggleTheme} isDark={isDark} onEditProfile={onEditProfile} onLogOut={onLogOut} onDeleteAccount={onDeleteAccount}/>}
          </div>
        </div>

        {/* Mobile bottom nav — hidden on desktop */}
        <div className={`md:hidden absolute bottom-0 w-full pt-2 px-4 pb-6 rounded-t-3xl ${themeStyles.navBg}`}>
          <div className="flex justify-between items-center">
            {tabs.map(t=>(
              <NavItem key={t.id} icon={<t.Icon size={22}/>} label={t.label} active={activeTab===t.id} onClick={()=>setActiveTab(t.id)} themeStyles={themeStyles}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
// Edit Profile Modal Component
const EditProfileModal = ({ isOpen, onClose, userData, setUserData, profileData, setProfileData, themeStyles }) => {
  const [name, setName] = useState(userData?.name || '');
  const [school, setSchool] = useState(userData?.school || '');
  const [age, setAge] = useState(profileData?.age || userData?.age || '');
  const [grade, setGrade] = useState(profileData?.grade || '');

  // Keep internal state in sync with props changes
  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setSchool(userData.school || '');
      setAge(profileData.age || userData.age || '');
      setGrade(profileData.grade || '');
    }
  }, [isOpen, userData, profileData]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      name,
      school,
      age
    });
    setProfileData({
      ...profileData,
      age,
      grade
    });
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-end justify-center ${themeStyles.modalOverlay} p-4 transition-opacity duration-300`}>
      <div className={`w-full max-w-md rounded-t-3xl p-6 space-y-4 animate-slide-up ${themeStyles.bgCard} border-t ${themeStyles.border} shadow-2xl pb-10`}>
        <div className="flex items-center justify-between border-b pb-3" style={{borderColor: themeStyles.border}}>
          <h3 className={`text-lg font-bold ${themeStyles.textMain}`}>Edit Profile</h3>
          <button onClick={onClose} className={`text-xs font-bold px-3 py-1.5 rounded-full ${themeStyles.tagBg} ${themeStyles.textSub}`}>Close</button>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className={`block text-xs uppercase font-bold mb-1.5 ${themeStyles.textSub}`}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className={`w-full h-12 px-4 rounded-xl outline-none focus:border-[#00A651] border border-transparent ${themeStyles.bgInput} ${themeStyles.textMain}`}
              required
            />
          </div>
          <div>
            <label className={`block text-xs uppercase font-bold mb-1.5 ${themeStyles.textSub}`}>School / Institution</label>
            <input
              type="text"
              value={school}
              onChange={e => setSchool(e.target.value)}
              className={`w-full h-12 px-4 rounded-xl outline-none focus:border-[#00A651] border border-transparent ${themeStyles.bgInput} ${themeStyles.textMain}`}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs uppercase font-bold mb-1.5 ${themeStyles.textSub}`}>Age</label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                className={`w-full h-12 px-4 rounded-xl outline-none focus:border-[#00A651] border border-transparent ${themeStyles.bgInput} ${themeStyles.textMain}`}
              />
            </div>
            <div>
              <label className={`block text-xs uppercase font-bold mb-1.5 ${themeStyles.textSub}`}>Grade / Class</label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value)}
                className={`w-full h-12 px-4 rounded-xl outline-none focus:border-[#00A651] border border-transparent cursor-pointer ${themeStyles.bgInput} ${themeStyles.textMain}`}
              >
                <option value="" disabled>Select</option>
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <button
            type="submit"
            style={{ backgroundColor: '#00A651' }}
            className="w-full h-14 text-white font-semibold rounded-xl btn-green-hover shadow-lg transition-colors mt-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Main Application ────────────────────────────────────────────────────────
 export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [screen,setScreen] = useState('splash');
  const [userData,setUserData] = useState(null);
  const [profileData,setProfileData] = useState({age:'',grade:'',favSubjects:[],difficultSubjects:[],hobbies:[],dreamCareer:''});
  const [answers,setAnswers] = useState({});
  const [recs,setRecs] = useState(null);
  const [career,setCareer] = useState(null);
  const [resetToken,setResetToken] = useState(null);
  
  // Theme state: default to dark (true) as in original design
  const [isDark, setIsDark] = useState(true);
  
  // Edit Profile modal trigger
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // In-Memory user credentials store (pre-populating some mock accounts to let user easily test "already have an account" login option)
  const [users, setUsers] = useState({
    'tunde@gmail.com': {
      email: 'tunde@gmail.com',
      password: 'password123',
      name: 'Tunde Alao',
      school: 'Queens College Lagos',
      age: '16',
      role: 'Student',
      hasCompletedOnboarding: true,
      profileData: {age:'16',grade:'SS2',favSubjects:['math','cs'],difficultSubjects:['bio'],hobbies:['Coding','Gaming'],dreamCareer:'Software Engineer'},
      answers: {q1:'a',q2:'a',q3:'a'}
    }
  });


  // NEW: Check the URL for a reset token on page load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("reset_token");
    
    if (token) {
      setResetToken(token);
      setScreen('resetPassword'); // Immediately jump to the reset screen
      
      // Clean up the URL so the ugly token disappears from the browser bar
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);


  useEffect(() => {
    if (screen === 'processing') {
      const processAssessment = async () => {
        let finalRecs = null;

        try {
          // 1. Get the AI Analysis
          const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
          const response = await fetch(`${API_URL}/api/analyze-assessment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ answers, profileData })
          });

          if (!response.ok) throw new Error("AI request failed");
          
          const aiData = await response.json();

          const mappedSubjects = aiData.subjects.map(id => SUBJECTS.find(s => s.id === id)).filter(Boolean);
          const mappedCareers = aiData.careers.map(id => ALL_CAREERS.find(c => c.id === id)).filter(Boolean);

          finalRecs = {
            strengths: aiData.strengths,
            weaknesses: aiData.weaknesses,
            subjects: mappedSubjects.length > 0 ? mappedSubjects : SUBJECTS.slice(0,4),
            careers: mappedCareers.length > 0 ? mappedCareers : ALL_CAREERS.slice(0,4)
          };

        } catch (error) {
          console.error("AI Analysis failed, falling back to local algorithm:", error);
          finalRecs = generateAnalysis(answers, profileData);
        }

        // 2. Set the Recommendations into React memory
        setRecs(finalRecs);

        // 3. Save the results to your SQLite Database
        if (userData) {
          try {
            const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
            await fetch(`${API_URL}/api/save-assessment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                email: userData.email,
                profileData: profileData,
                answers: answers
              })
            });

            // Update user state so the app knows they finished onboarding
            setUserData({
              ...userData,
              hasCompletedOnboarding: true,
              profileData: profileData,
              answers: answers
            });
          } catch (dbErr) {
            console.error("Failed to save to database:", dbErr);
          }
        }

        // 4. Move to the Dashboard ONLY when everything is 100% finished
        setScreen('dashboard');
      };

      processAssessment();
    }
  }, [screen, answers, profileData, userData]);

  const toggleTheme = () => setIsDark(!isDark);
  const themeStyles = getThemeStyles(isDark);

  // Handle navigation after authentication - check if user has completed onboarding
  const handleNavigateAfterAuth = (user) => {
    if (user.hasCompletedOnboarding) {
      // User has already completed onboarding, restore their data
      if (user.profileData) setProfileData(user.profileData);
      if (user.answers) setAnswers(user.answers);
      setRecs(restoreAnalysis(user));
      // Go directly to dashboard
      setScreen('dashboard');
    } else {
      // New user, proceed through onboarding flow
      setScreen('onboarding');
    }
  };

  // 1. Check for saved user session on initial load
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/me`, {
          method: "GET",
          credentials: "include" // Include cookies for session-based auth
        });
        if (response.ok) {
          const data = await response.json();
          const user = data.user;
          setUserData(user);
      // If they already finished the assessment, restore their data and jump to dashboard
      if (user.hasCompletedOnboarding) {
        if (user.profileData) setProfileData(user.profileData);
        if (user.answers) setAnswers(user.answers);
        setRecs(restoreAnalysis(user));
        setScreen('dashboard');
      } else {
        // If they haven't finished, pick up where they left off
        setScreen('onboarding');
      }
    }
    }  catch (err) {
      console.log("No active session found");
    } finally {
      setIsAppLoading(false);
    }
  };
    fetchSession();
}, []); // Empty dependency array means this only runs once when the app starts


  // Reset completely on logout
  const handleLogOut = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      // Inform backend about logout if necessary (e.g., to invalidate tokens)
      await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        credentials: "include", // Include cookies if using session-based auth
      });
    } catch (err) {
      console.error("Error occurred while logging out:", err);
    }
    setUserData(null);
    setProfileData({age:'',grade:'',favSubjects:[],difficultSubjects:[],hobbies:[],dreamCareer:''});
    setAnswers({});
    setRecs(null);
    setCareer(null);
    localStorage.removeItem('pathfinder_active_tab'); 
    setScreen('splash');
  };

const handleDeleteAccount = async () => {
    // 1. Force the user to confirm their choice
    const isConfirmed = window.confirm(
      "Are you sure you want to permanently delete your account? All your assessment data and saved careers will be lost. This cannot be undone."
    );

    if (!isConfirmed) return;

    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      
      // 2. Tell FastAPI to delete the database record
      const response = await fetch(`${API_URL}/api/delete-account`, {
        method: "DELETE",
        credentials: "include" // Must include the cookie to prove identity!
      });

      if (response.ok) {
        // 3. Wipe the React memory clean and boot them to the splash screen
        setUserData(null);
        setProfileData({age:'',grade:'',favSubjects:[],difficultSubjects:[],hobbies:[],dreamCareer:''});
        setAnswers({});
        setRecs(null);
        setCareer(null);
        localStorage.removeItem('pathfinder_active_tab'); 
        setScreen('splash');
      } else {
        const errorData = await response.json();
        alert(errorData.detail || "Failed to delete account");
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("A network error occurred while deleting your account.");
    }
  }; 

  // Add this right before your main return statement
  if (isAppLoading) {
    return <div className={`min-h-screen ${themeStyles.bg}`} />;
  }
  return (
    <div className={`min-h-screen font-poppins overflow-x-hidden transition-colors duration-300 ${themeStyles.bg}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        .font-poppins{font-family:'Poppins',sans-serif;}
        *{box-sizing:border-box;}
        @keyframes logoPulse{0%{transform:scale(1);box-shadow:0 0 0 0 rgba(0,166,81,0.4);}70%{transform:scale(1.03);box-shadow:0 0 0 16px rgba(0,166,81,0);}100%{transform:scale(1);box-shadow:0 0 0 0 rgba(0,166,81,0);}}
        .logo-pulse{animation:logoPulse 2.5s infinite ease-in-out;}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        .fade-in{animation:fadeIn 0.35s ease-out forwards;}
        @keyframes slideUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        .animate-slide-up{animation:slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;}
        .scrollbar-hide::-webkit-scrollbar{display:none;}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none;}
        .btn-green-hover:hover{background-color:#008f45 !important;}
        select option{background-color:#112240;color:white;}
        .hover-row-card:hover{background-color:rgba(0,166,81,0.05) !important;}
      `}</style>

      {screen==='splash'&&<SplashScreen onNavigate={()=>setScreen('auth')} themeStyles={themeStyles} isDark={isDark}/>}
      
      {screen==='auth'&&<AuthScreen userData={userData} setUserData={setUserData} onNavigate={()=>setScreen('onboarding')} onNavigateAfterAuth={handleNavigateAfterAuth} onBack={()=>setScreen('splash')} themeStyles={themeStyles} users={users} setUsers={setUsers} onForgot={() => setScreen('forgotPassword')}/>}
      
      {screen==='onboarding'&&<OnboardingScreen onNavigate={()=>setScreen('profile')} themeStyles={themeStyles}/>}
      
      {screen==='profile'&&<ProfileSetupScreen profileData={profileData} setProfileData={setProfileData} onNavigate={()=>setScreen('assessment')} themeStyles={themeStyles}/>}
      
      {screen==='assessment'&&<AssessmentScreen answers={answers} setAnswers={setAnswers} onComplete={()=>setScreen('processing')} themeStyles={themeStyles}/>}
      
      {screen==='processing'&&<ProcessingScreen themeStyles={themeStyles}/>}
      
      {screen==='dashboard'&&!career&&<DashboardScreen userData={userData} profileData={profileData} recommendations={recs} onCareerSelect={c=>setCareer(c)} onRetakeAssessment={()=>{setAnswers({});setRecs(null);setScreen('assessment');}} themeStyles={themeStyles} toggleTheme={toggleTheme} isDark={isDark} onEditProfile={() => setIsEditProfileOpen(true)} onLogOut={handleLogOut} onDeleteAccount={handleDeleteAccount} />}
      
      {screen==='dashboard'&&career&&<CareerDetailsScreen career={career} onBack={()=>setCareer(null)} themeStyles={themeStyles}/>}
        {screen==='forgotPassword'&&<ForgotPasswordScreen 
        themeStyles={themeStyles} 
        onBack={() => setScreen('auth')} 
      />}
      
      {screen==='resetPassword'&&<ResetPasswordScreen 
        themeStyles={themeStyles} 
        resetToken={resetToken} 
        onLoginRedirect={() => {
          setResetToken(null);
          setScreen('auth');
        }} 
      />}

      {/* Edit Profile Modal overlay */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        userData={userData}
        setUserData={setUserData}
        profileData={profileData}
        setProfileData={setProfileData}
        themeStyles={themeStyles}
      />
    </div>
  );
}