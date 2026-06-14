import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ArrowLeft,
  Video,
  ExternalLink,
  Phone,
  MapPin,
  Calendar,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Tạm thay thế bằng link ảnh online để Canvas có thể biên dịch thành công.
// Khi đưa code về CodeSandbox của bạn, hãy bỏ comment dòng import bên dưới và xóa dòng const đi nhé.
// import portraitImage from "./_ANA9050-Edit resize.png";
const portraitImage =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80";

// --- MOCK DATA ---
const WORK_HISTORY = [
  {
    id: 1,
    timelineId: "editor",
    year: "2022 - Present",
    role: "Media MICE",
    company: "Senior Video Editor",
    description: "",
    skills: ["Video Editing", "Post-production", "Premiere Pro"],
    hasDetails: true,
  },
  {
    id: 2,
    timelineId: "founder",
    year: "2021 - Present",
    role: "43MM",
    company: "Founder",
    description: "",
    skills: ["Team Leadership", "Project Management", "Creative Direction"],
    hasDetails: true,
  },
  {
    id: 3,
    timelineId: "fpt",
    year: "2018 - 2022",
    role: "FPT University",
    company: "Information Technology (IT)",
    description: "",
    skills: ["IT", "Logic Thinking", "Problem Solving"],
    hasDetails: false,
  },
  {
    id: 4,
    timelineId: "robot",
    year: "From 2018",
    role: "Da Nang Robonic Competition",
    company: "Participant",
    description: "",
    skills: ["Robotics", "Teamwork", "Hardware"],
    hasDetails: false,
  },
];

const PROJECT_DETAILS = {
  1: {
    title: "Media MICE",
    company: "Senior Video Editor",
    duration: "2022 - Present",
    overview:
      "With a mindset of continuous innovation, I have built significant milestones on my journey from Junior to Senior Video Editor. I am proud to be the pioneer of the 'Sizzle Reel' product line, standardizing the workflow between the Video and Animation departments, and successfully applying 3D and AI into practical production. As a result, I frequently take on the role of Art Director to lead the visual aspect of groundbreaking creative campaigns. More than just a professional, I also carry the mission of 'passing the torch' – organizing training programs and directly guiding new personnel, contributing to building a strong team.",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Audition"],
    projectSectionTitle: "Featured Projects",
    projects: [
      {
        name: null,
        link: "https://www.youtube.com/shorts/BM0qG2HGcqw",
        roles: ["Video Editor"],
        type: "vertical",
      },
      {
        name: null,
        link: "https://www.youtube.com/shorts/6FOmw30Xl-s",
        roles: ["Video Editor"],
        type: "vertical",
      },
      {
        name: null,
        link: "https://www.youtube.com/watch?v=ymfaJw6wvDo",
        roles: ["Videographer", "Video Editor"],
      },
      {
        name: null,
        link: "https://www.youtube.com/watch?v=9UUIvl_iVLw",
        roles: ["Video Editor"],
      },
      {
        name: null,
        link: "https://www.youtube.com/watch?v=rl1BqzEJgWE",
        roles: ["Video Editor"],
      },
      {
        name: null,
        link: "https://youtu.be/krzZfpxVreM?si=hmFk0ys8CaryL6tK",
        roles: ["Art Director", "Animator", "Video Editor"],
      },
      {
        name: null,
        link: "https://www.youtube.com/watch?v=O-08UGUZBVc",
        roles: ["Art Director", "Video Editor"],
      },
      {
        name: null,
        link: "https://youtu.be/Jcv7nyTPg7Q?si=kAiUqVV7HOkz87pW",
        roles: ["Art Director"],
      },
      {
        name: null,
        link: "https://youtu.be/Ri3SmIU4V5Q?si=uXhiSMgIPZ7aMXqn",
        roles: ["Art Director"],
      },
    ],
  },
  2: {
    title: "43MM",
    company: "Founder",
    duration: "2021 - Present",
    tools: ["Notion", "Google Workspace", "Final Cut Pro", "Trello"],
    projects: [
      {
        name: "Trò chuyện với thời gian",
        link: "https://www.youtube.com/watch?v=ALzSOSLiAXs&list=LL&index=20",
        roles: ["Director", "Camera Operator", "Editor", "Color Grading"],
      },
      {
        name: "Mary, I'm Wasted",
        link: "https://youtu.be/ES1lhPsrxNY",
        roles: ["Director", "Camera Operator", "Editor", "Color Grading"],
      },
      {
        name: "STEINS;GATE",
        link: "https://www.youtube.com/watch?v=A7FjdAnaibo&list=RDA7FjdAnaibo&start_radio=1",
        roles: ["Color Grading"],
      },
      {
        name: "Album KIếp Phù Vân",
        link: "https://www.youtube.com/watch?v=vvtqUUjus7Q",
        roles: ["Art Director", "3D", "Video Editor"],
      },
      {
        name: "Album LIMBO",
        link: "https://www.youtube.com/watch?v=BBat_6b3fLM&list=PL-k61x6pBZ2VGQXV7LRs7ZynVn1izm7B6&index=3",
        roles: ["Support"],
      },
      {
        name: "Album STORMY LAND",
        link: "https://www.youtube.com/watch?v=EnSpDFjqwDM",
        roles: ["Art Director", "Animator"],
      },
    ],
  },
  5: {
    title: "Freelance Director & Editor",
    company: "Independent Projects",
    duration: "2020 - Present",
    tools: ["Premiere Pro", "After Effects", "Camera Systems", "Lighting"],
    projects: [
      {
        name: "Hustle Crew - One w1sh",
        link: "https://www.youtube.com/watch?v=2re8znEXbKs",
        roles: ["Camera Operator", "Color Grading"],
      },
    ],
  },
};

const getMediaEmbedUrl = (url) => {
  if (!url) return null;
  let videoId = null;
  let playlistId = null;
  try {
    if (url.includes("youtube.com/watch")) {
      videoId = new URL(url).searchParams.get("v");
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/playlist")) {
      playlistId = new URL(url).searchParams.get("list");
    } else if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0];
    } else if (url.includes("facebook.com")) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url
      )}&show_text=false`;
    }
    if (playlistId)
      return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  } catch (e) {
    console.error("Invalid URL", e);
  }
  return null;
};

const getActiveYears = (hoveredId) => {
  if (hoveredId === "founder") return ["Now", "2021"];
  if (hoveredId === "editor") return ["Now", "2022"];
  if (hoveredId === "fpt") return ["2022", "2018"];
  if (hoveredId === "robot") return ["2018"];
  return [];
};

const getLineStyles = (hoveredId) => {
  const defaultLine = "border-white/20 border-solid z-0 opacity-40";
  const activeLine =
    "border-orange-500 border-solid z-20 opacity-100 drop-shadow-[0_0_15px_rgba(249,115,22,0.9)]";
  return {
    founder: hoveredId === "founder" ? activeLine : defaultLine,
    editor: hoveredId === "editor" ? activeLine : defaultLine,
    fpt: hoveredId === "fpt" ? activeLine : defaultLine,
  };
};

const TIMELINE_ROWS = [
  {
    id: "row1",
    year: "Now",
    contentId: "founder",
    renderLines: (styles) => (
      <>
        <div
          className={`absolute top-[32px] bottom-0 left-[50%] border-l ${styles.founder} transition-all duration-300`}
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 25%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 25%)",
          }}
        ></div>
        <div
          className={`absolute top-[32px] bottom-0 left-[50%] border-l ${styles.editor} transition-all duration-300`}
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 25%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 25%)",
          }}
        ></div>
      </>
    ),
  },
  {
    id: "row2",
    year: "",
    contentId: "editor",
    renderLines: (styles) => (
      <>
        <div
          className={`absolute top-0 bottom-0 left-[50%] border-l ${styles.founder} transition-all duration-300`}
        ></div>
        <div
          className={`absolute top-0 bottom-0 left-[50%] border-l ${styles.editor} transition-all duration-300`}
        ></div>
      </>
    ),
  },
  {
    id: "row3",
    year: "2022",
    contentId: "fpt",
    renderLines: (styles) => (
      <>
        <div
          className={`absolute top-0 bottom-0 left-[50%] border-l ${styles.founder} transition-all duration-300`}
        ></div>
        <div
          className={`absolute top-0 h-[32px] left-[50%] border-l ${styles.editor} transition-all duration-300`}
        ></div>
        <div
          className={`absolute top-[32px] bottom-0 left-[50%] border-l ${styles.fpt} transition-all duration-300`}
        ></div>
      </>
    ),
  },
  {
    id: "row4",
    year: "2021",
    contentId: null,
    renderLines: (styles) => (
      <>
        <div
          className={`absolute top-0 h-[32px] left-[50%] border-l ${styles.founder} transition-all duration-300`}
        ></div>
        <div
          className={`absolute top-0 bottom-0 left-[50%] border-l ${styles.fpt} transition-all duration-300`}
        ></div>
      </>
    ),
  },
  {
    id: "row6",
    year: "2018",
    contentId: "robot",
    renderLines: (styles) => (
      <>
        <div
          className={`absolute top-0 h-[100px] left-[50%] border-l ${styles.fpt} transition-all duration-300`}
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 20%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 20%, transparent 100%)",
          }}
        ></div>
      </>
    ),
  },
];

const AtmosphericBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none bg-[#050505] z-0">
    <div className="absolute top-[30%] left-[20%] w-[1200px] h-[1200px] border-[1px] border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-[10%] right-[10%] w-[800px] h-[800px] border-[1px] border-white/5 rounded-full translate-x-1/4 translate-y-1/4"></div>
    <div className="absolute top-[25%] right-[15%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#fff]"></div>
    <div className="absolute bottom-[30%] left-[10%] w-1 h-1 bg-white/40 rounded-full"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[120px] bg-gradient-to-r from-red-600/0 via-orange-500/40 to-orange-600/0 blur-[70px] -rotate-[35deg] mix-blend-screen"></div>
    <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-orange-600/30 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"></div>
    <div className="absolute top-[40%] left-[30%] w-[250px] h-[250px] bg-amber-500/20 rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"></div>
    <div
      className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    ></div>
  </div>
);

// --- COMPONENT: QUẢN LÝ DANH MỤC DỰ ÁN (CÓ SCROLL NGANG & XỔ XUỐNG DẠNG LƯỚI) ---
// Dùng cho Trang Chủ
const ProjectCategoryScrollable = ({ categoryTitle, projects }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 450;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!projects || projects.length === 0) return null;

  return (
    <div className="w-full animate-in fade-in duration-500 mb-10 md:mb-14 relative">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8 px-4 md:px-0">
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white flex items-center gap-3 drop-shadow-md">
          <span className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
          {categoryTitle}
        </h3>

        {/* Nút điều hướng & See All */}
        {projects.length > 2 && (
          <div className="flex items-center gap-3 md:gap-4">
            {!isExpanded && (
              <div className="hidden md:flex items-center gap-2 z-40 relative">
                <button
                  onClick={() => scroll("left")}
                  className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all text-gray-400 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                  title="Scroll Left"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all text-gray-400 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                  title="Scroll Right"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500 hover:text-white text-orange-400 whitespace-nowrap z-40 relative"
            >
              {isExpanded ? "Show Less" : "See All"}
            </button>
          </div>
        )}
      </div>

      <div className="relative group w-full">
        {/* Scroll Buttons cho màn hình nhỏ */}
        {projects.length > 2 && !isExpanded && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 z-40 md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#050505]/90 backdrop-blur-md border border-white/10 hover:bg-orange-500 hover:text-white transition-all text-gray-400 shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute -right-5 md:-right-8 top-1/2 -translate-y-1/2 z-40 md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#050505]/90 backdrop-blur-md border border-white/10 hover:bg-orange-500 hover:text-white transition-all text-gray-400 shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        <div
          ref={!isExpanded ? scrollRef : null}
          className={
            isExpanded
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-8 w-full transition-all duration-500 items-start"
              : "flex overflow-x-auto gap-6 md:gap-8 pb-8 snap-x snap-mandatory hide-scrollbar items-start w-full transition-all duration-500"
          }
          style={
            !isExpanded
              ? {
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                }
              : {}
          }
        >
          {projects.map((proj, idx) => {
            const embedUrl = getMediaEmbedUrl(proj.link);
            const isVertical = proj.type === "vertical";

            return (
              <div
                key={idx}
                className={`p-6 md:p-8 border border-white/10 rounded-[2rem] bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(249,115,22,0.08)] transition-all duration-500 group flex flex-col backdrop-blur-sm overflow-hidden ${
                  isExpanded
                    ? "w-full"
                    : isVertical
                    ? "w-[75vw] sm:w-[260px] md:w-[280px] xl:w-[320px] flex-shrink-0 snap-center sm:snap-start"
                    : "w-[85vw] sm:w-[350px] md:w-[400px] xl:w-[450px] flex-shrink-0 snap-center sm:snap-start"
                }`}
              >
                {embedUrl && (
                  <div
                    className={`w-full rounded-2xl overflow-hidden bg-black mb-6 md:mb-8 shadow-2xl border border-white/5 relative flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-500 ${
                      isVertical ? "aspect-[9/16] mx-auto" : "aspect-video"
                    }`}
                  >
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={embedUrl}
                      title={proj.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                <div className="mb-6 flex-1 w-full">
                  {proj.link ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xl md:text-2xl font-bold flex items-start justify-between gap-4 group-hover:text-orange-400 transition-colors w-full text-white break-words"
                    >
                      <span className="line-clamp-2">{proj.name}</span>
                      <ExternalLink
                        size={24}
                        className="text-gray-500 group-hover:text-orange-500 transition-colors flex-shrink-0 mt-1"
                      />
                    </a>
                  ) : (
                    <h4 className="text-xl md:text-2xl font-bold text-white line-clamp-2 break-words">
                      {proj.name}
                    </h4>
                  )}
                </div>

                {proj.roles && proj.roles.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center mt-auto pt-6 border-t border-white/10 w-full">
                    <span className="text-xs text-gray-500 uppercase tracking-widest mr-2 font-bold flex-shrink-0">
                      Role
                    </span>
                    {proj.roles.map((role, roleIdx) => (
                      <span
                        key={roleIdx}
                        className="px-2 md:px-3 py-1 md:py-1.5 bg-orange-500/10 text-orange-400 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-md border border-orange-500/20 whitespace-nowrap"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT MỚI: QUẢN LÝ DANH MỤC DỰ ÁN (HIỂN THỊ DẠNG LƯỚI - CUỘN DỌC) ---
// Dùng riêng cho trang chi tiết
const ProjectCategoryGrid = ({ categoryTitle, projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="w-full animate-in fade-in duration-500 mb-10 md:mb-14">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white flex items-center gap-3 drop-shadow-md">
          <span className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
          {categoryTitle}
        </h3>
      </div>

      <div className="flex flex-col gap-6 md:gap-8 w-full transition-all duration-500 items-start">
        {projects.map((proj, idx) => {
          const embedUrl = getMediaEmbedUrl(proj.link);
          const isVertical = proj.type === "vertical";

          return (
            <div
              key={idx}
              className={`p-6 md:p-8 border border-white/10 rounded-[2rem] bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(249,115,22,0.08)] transition-all duration-500 group flex flex-col backdrop-blur-sm overflow-hidden w-full`}
            >
              {embedUrl && (
                <div
                  className={`w-full rounded-2xl overflow-hidden bg-black mb-6 md:mb-8 shadow-2xl border border-white/5 relative flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-500 ${
                    isVertical
                      ? "aspect-[9/16] mx-auto max-w-[280px]"
                      : "aspect-video"
                  }`}
                >
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={embedUrl}
                    title={proj.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div className="mb-6 flex-1 w-full">
                {proj.link ? (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl md:text-2xl font-bold flex items-start justify-between gap-4 group-hover:text-orange-400 transition-colors w-full text-white break-words"
                  >
                    <span className="line-clamp-2">{proj.name}</span>
                    <ExternalLink
                      size={24}
                      className="text-gray-500 group-hover:text-orange-500 transition-colors flex-shrink-0 mt-1"
                    />
                  </a>
                ) : (
                  <h4 className="text-xl md:text-2xl font-bold text-white line-clamp-2 break-words">
                    {proj.name}
                  </h4>
                )}
              </div>

              {proj.roles && proj.roles.length > 0 && (
                <div className="flex flex-wrap gap-2 items-center mt-auto pt-6 border-t border-white/10 w-full">
                  <span className="text-xs text-gray-500 uppercase tracking-widest mr-2 font-bold flex-shrink-0">
                    Role
                  </span>
                  {proj.roles.map((role, roleIdx) => (
                    <span
                      key={roleIdx}
                      className="px-2 md:px-3 py-1 md:py-1.5 bg-orange-500/10 text-orange-400 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-md border border-orange-500/20 whitespace-nowrap"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeTab, setActiveTab] = useState("experience");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("All");

  useEffect(() => {
    if (activePage !== "home" || activeTab === "projects") {
      setIsSidebarCollapsed(true);
    } else {
      setIsSidebarCollapsed(false);
    }
  }, [activePage, activeTab]);

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    if (pageId === "home") {
      setActiveTab("experience");
      setSelectedRoleFilter("All");
    }
  };

  // NẾU ĐANG Ở TRANG CHI TIẾT DỰ ÁN
  if (activePage !== "home" && PROJECT_DETAILS[activePage]) {
    const details = PROJECT_DETAILS[activePage];
    return (
      <div className="relative flex flex-col lg:flex-row min-h-screen font-sans text-white selection:bg-orange-500/30 selection:text-orange-200 bg-[#050505] overflow-x-hidden">
        <AtmosphericBackground />

        {/* --- CỘT TRÁI (SIDEBAR) TRONG TRANG CHI TIẾT --- */}
        <div
          className={`relative z-50 p-6 md:p-10 lg:p-12 xl:p-20 lg:fixed lg:top-0 lg:left-0 lg:h-screen flex flex-col justify-between transition-all duration-500 ease-in-out
                        ${
                          isSidebarCollapsed
                            ? "w-full lg:w-[100px] px-4 md:px-4 lg:px-4 items-center"
                            : "w-full lg:w-[40%]"
                        } `}
        >
          {isSidebarCollapsed && (
            <button
              onClick={() => handlePageChange("home")}
              className="fixed top-1/2 left-[85px] transform -translate-y-1/2 bg-orange-500 text-white p-2.5 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] z-[100] hover:bg-orange-400 transition-colors hidden lg:block"
              title="Expand Profile"
            >
              <ChevronsRight size={20} />
            </button>
          )}

          <div
            className={`transition-opacity duration-300 w-full max-w-full ${
              isSidebarCollapsed
                ? "opacity-0 hidden lg:block lg:opacity-0 lg:w-0 lg:h-0 overflow-hidden"
                : "opacity-100"
            }`}
          >
            {/* Ảnh Responsive: Kích thước được phóng to gấp 2 lần, sử dụng object-[center_15%] để khuôn mặt được tập trung lấy từ đỉnh đầu */}
            <img
              src={portraitImage}
              alt="Phạm Tấn Thịnh"
              className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[260px] xl:w-[340px] aspect-square rounded-full object-cover object-[center_15%] flex-shrink-0 border-[4px] border-white/10 mb-6 xl:mb-10 shadow-[0_0_40px_rgba(249,115,22,0.2)] mx-auto lg:mx-0 max-w-full h-auto transition-all duration-500"
            />

            {/* Đảm bảo break-words và max-w-full để chống tràn trên màn hình nhỏ */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold mb-3 tracking-tight text-white break-words text-center lg:text-left max-w-full">
              Phạm Tấn Thịnh
            </h1>
            <h2 className="text-sm md:text-base uppercase tracking-[0.2em] text-orange-400 mb-6 xl:mb-8 font-semibold text-center lg:text-left break-words">
              Senior Video Editor & Founder 43MM
            </h2>
            <p className="text-gray-400/90 mb-8 xl:mb-10 leading-relaxed font-light text-center lg:text-left max-w-full break-words">
              Coming from an IT background at FPT University with a strong
              passion for visual arts and video editing. From a Junior position
              to a Senior Video Editor, I continually strive to create
              high-quality content alongside the independent team at 43MM.
            </p>

            <div className="flex flex-col gap-4 xl:gap-5 items-center lg:items-start w-full">
              <div className="flex items-center gap-4 text-gray-400 w-full justify-center lg:justify-start">
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl flex-shrink-0 backdrop-blur-sm">
                  <Calendar size={18} className="text-orange-400" />
                </div>
                <span className="font-medium text-base tracking-wide break-words">
                  Nov 26, 2000
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 w-full justify-center lg:justify-start">
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl flex-shrink-0 backdrop-blur-sm">
                  <MapPin size={18} className="text-orange-400" />
                </div>
                <span className="font-medium text-base tracking-wide break-words">
                  Da Nang, VN
                </span>
              </div>
              <a
                href="tel:0932444284"
                className="group flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-max max-w-full mx-auto lg:mx-0"
              >
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-colors flex-shrink-0 backdrop-blur-sm">
                  <Phone
                    size={18}
                    className="text-orange-400 group-hover:text-orange-300 transition-colors"
                  />
                </div>
                <span className="font-medium text-base tracking-wide transition-colors break-words">
                  0932 444 284
                </span>
              </a>
              <a
                href="mailto:thinhtri.2611@gmail.com"
                className="group flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-max max-w-full mx-auto lg:mx-0"
              >
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-colors flex-shrink-0 backdrop-blur-sm">
                  <Mail
                    size={18}
                    className="text-orange-400 group-hover:text-orange-300 transition-colors"
                  />
                </div>
                <span className="font-medium text-base tracking-wide transition-colors pb-0.5 truncate border-b border-transparent group-hover:border-white break-words max-w-[200px] sm:max-w-none">
                  thinhtri.2611@gmail.com
                </span>
              </a>
            </div>
          </div>

          {isSidebarCollapsed && (
            <div
              className="fixed bottom-8 left-[22px] z-10 hidden lg:block transition-all duration-500 cursor-pointer"
              onClick={() => handlePageChange("home")}
            >
              <img
                src={portraitImage}
                alt="Phạm Tấn Thịnh"
                className="w-14 h-14 rounded-full object-cover object-[center_15%] border-2 border-white/10 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all"
              />
            </div>
          )}
        </div>

        {/* --- CỘT PHẢI (NỘI DUNG CHI TIẾT - GLASSMORPHISM) --- */}
        <div
          className={`relative z-10 transition-all duration-500 ease-in-out bg-white/[0.02] backdrop-blur-[80px] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] border-l border-white/5 p-6 md:p-12 lg:p-20 
                        ${
                          isSidebarCollapsed
                            ? "lg:ml-[100px] w-full lg:w-[calc(100%-100px)]"
                            : "lg:ml-[40%] w-full lg:w-[60%]"
                        } `}
        >
          <button
            onClick={() => handlePageChange("home")}
            className="group flex items-center gap-2 text-gray-400 hover:text-orange-400 font-bold mb-12 transition-colors uppercase tracking-widest text-xs"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            Back to Home
          </button>

          <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white drop-shadow-md break-words max-w-full">
              {details.title}
            </h1>
            {details.company && (
              <h2 className="text-lg md:text-xl text-orange-400 font-semibold mb-6 uppercase tracking-widest break-words">
                {details.company}
              </h2>
            )}

            <div className="border-t border-white/10 pt-12 mt-12 grid gap-8 w-full">
              {details.overview && (
                <section className="mb-8 w-full">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-6 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                    Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg font-light break-words">
                    {details.overview}
                  </p>
                </section>
              )}

              {details.projects && details.projects.length > 0 && (
                <div className="w-full">
                  {/* Ở trang chi tiết, gọi Component dạng Lưới (Grid) */}
                  <ProjectCategoryGrid
                    categoryTitle={details.projectSectionTitle || "Projects"}
                    projects={details.projects}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- TRANG CHỦ (HOME) ---
  const lineStyles = getLineStyles(hoveredItem);
  const activeYears = getActiveYears(hoveredItem);

  const uniqueRoles = ["All"];
  Object.values(PROJECT_DETAILS).forEach((cat) => {
    cat.projects?.forEach((proj) => {
      proj.roles?.forEach((role) => {
        if (!uniqueRoles.includes(role)) uniqueRoles.push(role);
      });
    });
  });

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen font-sans text-white selection:bg-orange-500/30 selection:text-orange-200 bg-[#050505] overflow-x-hidden">
      <AtmosphericBackground />

      {/* --- CỘT TRÁI (SIDEBAR) TRONG TRANG CHỦ --- */}
      <div
        className={`relative z-50 p-6 md:p-10 lg:p-12 xl:p-20 lg:fixed lg:top-0 lg:left-0 lg:h-screen flex flex-col justify-between transition-all duration-500 ease-in-out
                      ${
                        isSidebarCollapsed
                          ? "w-full lg:w-[100px] px-4 md:px-4 lg:px-4 items-center"
                          : "w-full lg:w-[40%]"
                      } `}
      >
        {isSidebarCollapsed && (
          <button
            onClick={() => handlePageChange("home")}
            className="fixed top-1/2 left-[85px] transform -translate-y-1/2 bg-orange-500 text-white p-2.5 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] z-[100] hover:bg-orange-400 transition-colors hidden lg:block"
            title="Expand Profile"
          >
            <ChevronsRight size={20} />
          </button>
        )}

        <div
          className={`transition-opacity duration-300 w-full max-w-full ${
            isSidebarCollapsed
              ? "opacity-0 hidden lg:block lg:opacity-0 lg:w-0 lg:h-0 overflow-hidden"
              : "opacity-100"
          }`}
        >
          {/* Ảnh Responsive giống hệt trang chi tiết */}
          <img
            src={portraitImage}
            alt="Phạm Tấn Thịnh"
            className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[260px] xl:w-[340px] aspect-square rounded-full object-cover object-[center_15%] flex-shrink-0 border-[4px] border-white/10 mb-6 xl:mb-10 shadow-[0_0_40px_rgba(249,115,22,0.2)] mx-auto lg:mx-0 max-w-full h-auto transition-all duration-500"
          />

          <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold mb-3 tracking-tight text-white break-words text-center lg:text-left max-w-full">
            Phạm Tấn Thịnh
          </h1>
          <h2 className="text-sm md:text-base uppercase tracking-[0.2em] text-orange-400 mb-6 xl:mb-8 font-semibold text-center lg:text-left break-words">
            Senior Video Editor & Founder 43MM
          </h2>
          <p className="text-gray-400/90 mb-8 xl:mb-10 leading-relaxed font-light text-center lg:text-left max-w-full break-words">
            Coming from an IT background at FPT University with a strong passion
            for visual arts and video editing. From a Junior position to a
            Senior Video Editor, I continually strive to create high-quality
            content alongside the independent team at 43MM.
          </p>

          <div className="flex flex-col gap-4 xl:gap-5 items-center lg:items-start w-full">
            <div className="flex items-center gap-4 text-gray-400 w-full justify-center lg:justify-start">
              <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl flex-shrink-0 backdrop-blur-sm">
                <Calendar size={18} className="text-orange-400" />
              </div>
              <span className="font-medium text-base tracking-wide break-words">
                Nov 26, 2000
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 w-full justify-center lg:justify-start">
              <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl flex-shrink-0 backdrop-blur-sm">
                <MapPin size={18} className="text-orange-400" />
              </div>
              <span className="font-medium text-base tracking-wide break-words">
                Da Nang, VN
              </span>
            </div>
            <a
              href="tel:0932444284"
              className="group flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-max max-w-full mx-auto lg:mx-0"
            >
              <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-colors flex-shrink-0 backdrop-blur-sm">
                <Phone
                  size={18}
                  className="text-orange-400 group-hover:text-orange-300 transition-colors"
                />
              </div>
              <span className="font-medium text-base tracking-wide transition-colors break-words">
                0932 444 284
              </span>
            </a>
            <a
              href="mailto:thinhtri.2611@gmail.com"
              className="group flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-max max-w-full mx-auto lg:mx-0"
            >
              <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-colors flex-shrink-0 backdrop-blur-sm">
                <Mail
                  size={18}
                  className="text-orange-400 group-hover:text-orange-300 transition-colors"
                />
              </div>
              <span className="font-medium text-base tracking-wide transition-colors pb-0.5 truncate border-b border-transparent group-hover:border-white break-words max-w-[200px] sm:max-w-none">
                thinhtri.2611@gmail.com
              </span>
            </a>
          </div>
        </div>

        {isSidebarCollapsed && (
          <div
            className="fixed bottom-8 left-[22px] z-10 hidden lg:block transition-all duration-500 cursor-pointer"
            onClick={() => handlePageChange("home")}
          >
            <img
              src={portraitImage}
              alt="Phạm Tấn Thịnh"
              className="w-14 h-14 rounded-full object-cover object-[center_15%] border-2 border-white/10 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all"
            />
          </div>
        )}
      </div>

      {/* --- CỘT PHẢI (NỘI DUNG - DARK GLASS) --- */}
      <div
        className={`relative z-10 transition-all duration-500 ease-in-out bg-white/[0.02] backdrop-blur-[80px] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] border-l border-white/5 min-h-screen
                      ${
                        isSidebarCollapsed
                          ? "lg:ml-[100px] w-full lg:w-[calc(100%-100px)]"
                          : "lg:ml-[40%] w-full lg:w-[60%]"
                      } `}
      >
        {/* HEADER TABS - KÍNH MỜ GẮT */}
        <div className="flex justify-between px-6 md:px-10 py-6 md:py-8 border-b border-white/10 sticky top-0 bg-white/[0.02] backdrop-blur-[1000px] z-[60]">
          <button
            onClick={() => setActiveTab("experience")}
            className={`text-lg md:text-2xl font-bold transition-colors ${
              activeTab === "experience"
                ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                : "text-white/30 hover:text-orange-400"
            }`}
          >
            Work Experience
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`text-lg md:text-2xl font-bold transition-colors ${
              activeTab === "projects"
                ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                : "text-white/30 hover:text-orange-400"
            }`}
          >
            Projects
          </button>
        </div>

        {/* CONTENT */}
        <div
          className={`py-12 transition-all duration-500 w-full ${
            isSidebarCollapsed ? "px-6 md:px-12 lg:px-20" : "px-6 md:px-10"
          }`}
        >
          {activeTab === "experience" ? (
            TIMELINE_ROWS.map((row) => {
              const job = WORK_HISTORY.find(
                (j) => j.timelineId === row.contentId
              );
              const isActiveYear = activeYears.includes(row.year);

              return (
                <div key={row.id} className="flex min-h-[140px] w-full">
                  <div
                    className={`w-16 md:w-24 text-right pr-4 md:pr-6 pt-[24px] font-bold tracking-widest transition-colors duration-500 drop-shadow-sm text-sm md:text-base flex-shrink-0 ${
                      isActiveYear
                        ? "text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                        : "text-white/20"
                    }`}
                  >
                    {row.year}
                  </div>

                  <div className="w-8 md:w-16 lg:w-24 relative flex-shrink-0">
                    {row.renderLines(lineStyles)}
                  </div>

                  <div
                    className="flex-1 pl-4 md:pl-6 pt-[20px] pb-10 min-w-0"
                    onMouseEnter={() => setHoveredItem(row.contentId)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {job ? (
                      <div
                        className="cursor-pointer group"
                        onClick={() => {
                          if (job.hasDetails) handlePageChange(job.id);
                        }}
                      >
                        <h4
                          className={`text-xl md:text-2xl font-bold flex items-center gap-2 transition-all duration-300 break-words max-w-full ${
                            hoveredItem === job.timelineId
                              ? "text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                              : "text-white/90"
                          }`}
                        >
                          {job.role}
                          {job.hasDetails && (
                            <ArrowUpRight
                              size={20}
                              className={`opacity-0 -translate-x-2 transition-all duration-300 flex-shrink-0 ${
                                hoveredItem === job.timelineId
                                  ? "opacity-100 translate-x-0 text-orange-500"
                                  : ""
                              }`}
                            />
                          )}
                        </h4>
                        {job.company && (
                          <span className="text-base md:text-lg text-gray-500 font-medium block mt-1 break-words">
                            {job.company}
                          </span>
                        )}

                        {job.hasDetails && (
                          <div
                            className={`mt-4 text-xs tracking-widest uppercase font-bold text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ${
                              hoveredItem === job.timelineId
                                ? "opacity-100"
                                : ""
                            }`}
                          >
                            Click to view details
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-4"></div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col gap-12 md:gap-16 w-full max-w-full overflow-hidden">
              <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
              `}</style>

              <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar snap-x w-full">
                {uniqueRoles.map((role, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRoleFilter(role)}
                    className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 flex-shrink-0 snap-start backdrop-blur-md ${
                      selectedRoleFilter === role
                        ? "bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.6)] border border-orange-400"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {[
                { title: "Personal Projects", id: 5 },
                { title: "43MM", id: 2 },
                { title: "Media MICE", id: 1 },
              ].map((category) => {
                const categoryData = PROJECT_DETAILS[category.id];
                if (
                  !categoryData ||
                  !categoryData.projects ||
                  categoryData.projects.length === 0
                )
                  return null;

                const filteredProjects =
                  selectedRoleFilter === "All"
                    ? categoryData.projects
                    : categoryData.projects.filter((proj) =>
                        proj.roles?.includes(selectedRoleFilter)
                      );

                if (filteredProjects.length === 0) return null;

                return (
                  // Ở trang chủ, gọi Component dạng cuộn ngang (Scroll)
                  <ProjectCategoryScrollable
                    key={category.id}
                    categoryTitle={
                      categoryData.projectSectionTitle || category.title
                    }
                    projects={filteredProjects}
                  />
                );
              })}
            </div>
          )}

          {activeTab === "experience" && (
            <div className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-white/10 flex flex-col items-center text-center w-full">
              <p className="text-gray-400 font-medium mb-6 md:mb-8 break-words max-w-full">
                Want to know more about my skills?
              </p>
              <button className="px-8 md:px-10 py-4 md:py-5 bg-white/10 text-white border border-white/10 backdrop-blur-md uppercase tracking-widest text-xs md:text-sm rounded-full font-bold hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:-translate-y-1">
                Download CV (PDF)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
