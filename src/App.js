import React, { useState, useEffect } from "react";
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
} from "lucide-react";

import portraitImage from "./_ANA9050-Edit resize.png";

// --- MOCK DATA ---
const WORK_HISTORY = [
  {
    id: 1,
    timelineId: "editor",
    year: "2022 - Present",
    role: "Senior Video Editor",
    company: "Media MICE",
    description: "",
    skills: ["Video Editing", "Post-production", "Premiere Pro"],
    hasDetails: true,
  },
  {
    id: 2,
    timelineId: "founder",
    year: "2021 - Present",
    role: "Founder 43MM",
    company: "",
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
    role: "Participant",
    company: "Da Nang Robonic Competition",
    description: "",
    skills: ["Robotics", "Teamwork", "Hardware"],
    hasDetails: false,
  },
];

const PROJECT_DETAILS = {
  1: {
    title: "Senior Video Editor",
    company: "Media MICE",
    duration: "2022 - Present",
    overview:
      "With a mindset of continuous innovation, I have built significant milestones on my journey from Junior to Senior Video Editor. I am proud to be the pioneer of the 'Sizzle Reel' product line, standardizing the workflow between the Video and Animation departments, and successfully applying 3D and AI into practical production. As a result, I frequently take on the role of Art Director to lead the visual aspect of groundbreaking creative campaigns. More than just a professional, I also carry the mission of 'passing the torch' – organizing training programs and directly guiding new personnel, contributing to building a strong team.",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Audition"],
    projects: [
      {
        name: null,
        link: "https://youtu.be/krzZfpxVreM?si=hmFk0ys8CaryL6tK",
        roles: ["Art Director", "Animator", "Video Editor"],
      },
      {
        name: null,
        link: "https://youtu.be/krzZfpxVreM?si=hmFk0ys8CaryL6tK",
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
    title: "Founder 43MM",
    company: "",
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

// ĐỔI GIAO DIỆN TIMELINE SANG DARK MODE VỚI HIỆU ỨNG GLOW VÀ NÉT MỎNG LIỀN
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
        {/* Điểm đầu: Fade in từ mờ sang rõ */}
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
        {/* Điểm cuối: Kéo dài thêm height (100px) và dùng mask để tạo đuôi vệt sáng fade out */}
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
    {/* Orbital Rings - Căn chỉnh giữa màn hình để tạo chiều sâu */}
    <div className="absolute top-[30%] left-[20%] w-[1200px] h-[1200px] border-[1px] border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-[10%] right-[10%] w-[800px] h-[800px] border-[1px] border-white/5 rounded-full translate-x-1/4 translate-y-1/4"></div>

    {/* Stars/Satellites */}
    <div className="absolute top-[25%] right-[15%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#fff]"></div>
    <div className="absolute bottom-[30%] left-[10%] w-1 h-1 bg-white/40 rounded-full"></div>

    {/* Vầng hào quang chéo màu cam (Diagonal Fiery Flare) - Làm đậm và rực rỡ hơn */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[120px] bg-gradient-to-r from-red-600/0 via-orange-500/40 to-orange-600/0 blur-[70px] -rotate-[35deg] mix-blend-screen"></div>

    {/* Lõi sáng (Core Glow) - Kép để tạo chiều sâu và độ gắt rực rỡ */}
    <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-orange-600/30 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"></div>
    <div className="absolute top-[40%] left-[30%] w-[250px] h-[250px] bg-amber-500/20 rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"></div>

    {/* Noise Overlay - Tăng opacity và chỉnh frequency để tạo hiệu ứng Film Grain chân thực, đặt ở cuối để phủ lên ánh sáng */}
    <div
      className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    ></div>
  </div>
);

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

  if (activePage !== "home" && PROJECT_DETAILS[activePage]) {
    const details = PROJECT_DETAILS[activePage];
    return (
      <div className="relative flex flex-col lg:flex-row min-h-screen font-sans text-white selection:bg-orange-500/30 selection:text-orange-200 bg-[#050505]">
        <AtmosphericBackground />

        {/* --- CỘT TRÁI (SIDEBAR) --- */}
        <div
          className={`relative z-10 p-10 md:p-20 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between transition-all duration-500 ease-in-out
                        ${
                          isSidebarCollapsed
                            ? "w-full lg:w-[80px] px-2 md:px-2 lg:px-2 items-center"
                            : "w-full lg:w-[40%]"
                        } `}
        >
          {isSidebarCollapsed && (
            <button
              onClick={() => handlePageChange("home")}
              className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] z-50 hover:bg-orange-400 transition-colors hidden lg:block"
              title="Expand Profile"
            >
              <ChevronsRight size={20} />
            </button>
          )}

          <div
            className={`transition-opacity duration-300 ${
              isSidebarCollapsed
                ? "opacity-0 hidden lg:block lg:opacity-0 lg:w-0 lg:h-0 overflow-hidden"
                : "opacity-100 w-full"
            }`}
          >
            <img
              src={portraitImage}
              alt="Phạm Tấn Thịnh"
              className="w-32 h-32 rounded-full object-cover border-[3px] border-white/10 mb-8 shadow-[0_0_30px_rgba(249,115,22,0.15)]"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-2 whitespace-nowrap tracking-tight text-white">
              Phạm Thịnh
            </h1>
            <h2 className="text-sm uppercase tracking-[0.2em] text-orange-400 mb-8 font-semibold">
              Senior Video Editor & Founder 43MM
            </h2>
            <p className="text-gray-400/90 mb-10 leading-relaxed font-light">
              Coming from an IT background at FPT University with a strong
              passion for visual arts and video editing. From a Junior position
              to a Senior Video Editor, I continually strive to create
              high-quality content alongside the independent team at 43MM.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4 text-gray-400">
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl flex-shrink-0 backdrop-blur-sm">
                  <Calendar size={18} className="text-orange-400" />
                </div>
                <span className="font-medium text-base tracking-wide">
                  Nov 26, 2000
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl flex-shrink-0 backdrop-blur-sm">
                  <MapPin size={18} className="text-orange-400" />
                </div>
                <span className="font-medium text-base tracking-wide">
                  Da Nang, VN
                </span>
              </div>
              <a
                href="tel:0932444284"
                className="group flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-max max-w-full"
              >
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-colors flex-shrink-0 backdrop-blur-sm">
                  <Phone
                    size={18}
                    className="text-orange-400 group-hover:text-orange-300 transition-colors"
                  />
                </div>
                <span className="font-medium text-base tracking-wide transition-colors">
                  0932 444 284
                </span>
              </a>
              <a
                href="mailto:thinhtri.2611@gmail.com"
                className="group flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-max max-w-full"
              >
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-colors flex-shrink-0 backdrop-blur-sm">
                  <Mail
                    size={18}
                    className="text-orange-400 group-hover:text-orange-300 transition-colors"
                  />
                </div>
                <span className="font-medium text-base tracking-wide transition-colors pb-0.5 truncate border-b border-transparent group-hover:border-white">
                  thinhtri.2611@gmail.com
                </span>
              </a>
            </div>
          </div>

          {isSidebarCollapsed && (
            <div
              className="mt-8 relative z-10 hidden lg:block transition-all duration-500 cursor-pointer"
              onClick={() => handlePageChange("home")}
            >
              <img
                src={portraitImage}
                alt="Phạm Tấn Thịnh"
                className="w-12 h-12 rounded-full object-cover border-2 border-white/10 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all"
              />
            </div>
          )}
        </div>

        {/* --- CỘT PHẢI (NỘI DUNG CHI TIẾT - GLASSMORPHISM) --- */}
        <div
          className={`relative z-10 transition-all duration-500 ease-in-out bg-white/[0.02] backdrop-blur-2xl shadow-[-20px_0_40px_rgba(0,0,0,0.5)] border-l border-white/5 p-6 md:p-12 lg:p-20 
                        ${
                          isSidebarCollapsed
                            ? "w-full lg:w-[calc(100%-80px)]"
                            : "w-full lg:w-[60%]"
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

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-white drop-shadow-md">
              {details.title}
            </h1>
            <div className="border-t border-white/10 pt-12 mt-12 grid gap-8">
              {details.overview && (
                <section className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-6 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                    Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg font-light">
                    {details.overview}
                  </p>
                </section>
              )}

              {details.projects?.map((proj, idx) => {
                const embedUrl = getMediaEmbedUrl(proj.link);
                return (
                  <div
                    key={idx}
                    className="p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(249,115,22,0.05)] transition-all duration-500"
                  >
                    {embedUrl && (
                      <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black mb-8 relative shadow-2xl border border-white/5">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={embedUrl}
                          title={proj.name}
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                    <h4 className="text-2xl font-bold text-white">
                      {proj.name}
                    </h4>

                    {proj.roles && proj.roles.length > 0 && (
                      <div className="flex flex-wrap gap-2 items-center mt-6 pt-6 border-t border-white/10">
                        <span className="text-xs text-gray-500 uppercase tracking-widest mr-2 font-bold">
                          Role
                        </span>
                        {proj.roles.map((role, roleIdx) => (
                          <span
                            key={roleIdx}
                            className="px-3 py-1.5 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest rounded-md border border-orange-500/20 backdrop-blur-md"
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
      </div>
    );
  }

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
    <div className="relative flex flex-col lg:flex-row min-h-screen font-sans text-white selection:bg-orange-500/30 selection:text-orange-200 bg-[#050505]">
      <AtmosphericBackground />

      {/* CỘT TRÁI (SIDEBAR) */}
      <div
        className={`relative z-50 p-10 md:p-20 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between transition-all duration-500 ease-in-out
                      ${
                        isSidebarCollapsed
                          ? "w-full lg:w-[80px] px-2 md:px-2 lg:px-2 items-center"
                          : "w-full lg:w-[40%]"
                      } `}
      >
        {isSidebarCollapsed && (
          <button
            onClick={() => handlePageChange("home")}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] z-[100] hover:bg-orange-400 transition-colors hidden lg:block"
            title="Expand Profile"
          >
            <ChevronsRight size={20} />
          </button>
        )}

        <div
          className={`transition-opacity duration-300 ${
            isSidebarCollapsed
              ? "opacity-0 hidden lg:block lg:opacity-0 lg:w-0 lg:h-0 overflow-hidden"
              : "opacity-100 w-full"
          }`}
        >
          <img
            src={portraitImage}
            alt="Phạm Tấn Thịnh"
            className="w-32 h-32 rounded-full object-cover border-[3px] border-white/10 mb-8 shadow-[0_0_30px_rgba(249,115,22,0.15)]"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-2 whitespace-nowrap tracking-tight text-white">
            Thịnh.
          </h1>
          <h2 className="text-sm uppercase tracking-[0.2em] text-orange-400 mb-8 font-semibold">
            Senior Video Editor & Founder 43MM
          </h2>
          <p className="text-gray-400/90 mb-10 leading-relaxed font-light">
            Coming from an IT background at FPT University with a strong passion
            for visual arts and video editing. From a Junior position to a
            Senior Video Editor, I continually strive to create high-quality
            content alongside the independent team at 43MM.
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl flex-shrink-0 backdrop-blur-sm">
                <Calendar size={18} className="text-orange-400" />
              </div>
              <span className="font-medium text-base tracking-wide">
                Nov 26, 2000
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl flex-shrink-0 backdrop-blur-sm">
                <MapPin size={18} className="text-orange-400" />
              </div>
              <span className="font-medium text-base tracking-wide">
                Da Nang, VN
              </span>
            </div>
            <a
              href="tel:0932444284"
              className="group flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-max max-w-full"
            >
              <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-colors flex-shrink-0 backdrop-blur-sm">
                <Phone
                  size={18}
                  className="text-orange-400 group-hover:text-orange-300 transition-colors"
                />
              </div>
              <span className="font-medium text-base tracking-wide transition-colors">
                0932 444 284
              </span>
            </a>
            <a
              href="mailto:thinhtri.2611@gmail.com"
              className="group flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-max max-w-full"
            >
              <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-colors flex-shrink-0 backdrop-blur-sm">
                <Mail
                  size={18}
                  className="text-orange-400 group-hover:text-orange-300 transition-colors"
                />
              </div>
              <span className="font-medium text-base tracking-wide transition-colors pb-0.5 truncate border-b border-transparent group-hover:border-white">
                thinhtri.2611@gmail.com
              </span>
            </a>
          </div>
        </div>

        {isSidebarCollapsed && (
          <div
            className="mt-8 relative z-10 hidden lg:block transition-all duration-500 cursor-pointer"
            onClick={() => handlePageChange("home")}
          >
            <img
              src={portraitImage}
              alt="Phạm Tấn Thịnh"
              className="w-12 h-12 rounded-full object-cover border-2 border-white/10 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all"
            />
          </div>
        )}
      </div>

      {/* CỘT PHẢI (NỘI DUNG - DARK GLASS) */}
      <div
        className={`relative z-10 transition-all duration-500 ease-in-out bg-white/[0.02] backdrop-blur-3xl shadow-[-20px_0_40px_rgba(0,0,0,0.5)] border-l border-white/5 min-h-screen
                      ${
                        isSidebarCollapsed
                          ? "w-full lg:w-[calc(100%-80px)]"
                          : "w-full lg:w-[60%]"
                      } `}
      >
        {/* HEADER TABS */}
        <div className="flex justify-between px-10 py-8 border-b border-white/10 sticky top-0 bg-white/[0.01] backdrop-blur-2xl z-50">
          <button
            onClick={() => setActiveTab("experience")}
            className={`text-xl md:text-2xl font-bold transition-colors ${
              activeTab === "experience"
                ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                : "text-white/30 hover:text-orange-400"
            }`}
          >
            Work Experience
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`text-xl md:text-2xl font-bold transition-colors ${
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
          className={`py-12 transition-all duration-500 ${
            isSidebarCollapsed ? "px-6 md:px-12 lg:px-20" : "px-10"
          }`}
        >
          {activeTab === "experience" ? (
            TIMELINE_ROWS.map((row) => {
              const job = WORK_HISTORY.find(
                (j) => j.timelineId === row.contentId
              );
              const isActiveYear = activeYears.includes(row.year);

              return (
                <div key={row.id} className="flex min-h-[140px]">
                  <div
                    className={`w-24 text-right pr-6 pt-[24px] font-bold tracking-widest transition-colors duration-500 drop-shadow-sm ${
                      isActiveYear
                        ? "text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                        : "text-white/20"
                    }`}
                  >
                    {row.year}
                  </div>

                  <div className="w-24 relative">
                    {row.renderLines(lineStyles)}
                  </div>

                  <div
                    className="flex-1 pl-6 pt-[20px] pb-10"
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
                          className={`text-2xl font-bold flex items-center gap-2 transition-all duration-300 ${
                            hoveredItem === job.timelineId
                              ? "text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                              : "text-white/90"
                          }`}
                        >
                          {job.role}
                          {job.hasDetails && (
                            <ArrowUpRight
                              size={20}
                              className={`opacity-0 -translate-x-2 transition-all duration-300 ${
                                hoveredItem === job.timelineId
                                  ? "opacity-100 translate-x-0 text-orange-500"
                                  : ""
                              }`}
                            />
                          )}
                        </h4>
                        {job.company && (
                          <span className="text-lg text-gray-500 font-medium block mt-1">
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
            <div className="flex flex-col gap-16 w-full max-w-full overflow-hidden">
              <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
              `}</style>

              {/* BỘ LỌC ROLES (PILLS) */}
              <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar snap-x w-full">
                {uniqueRoles.map((role, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRoleFilter(role)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 flex-shrink-0 snap-start backdrop-blur-md ${
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
                  <div
                    key={category.id}
                    className="w-full animate-in fade-in duration-500"
                  >
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-8 text-white flex items-center gap-3 drop-shadow-md">
                      <span className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
                      {category.title}
                    </h3>

                    <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar items-stretch pr-10">
                      {filteredProjects.map((proj, idx) => {
                        const embedUrl = getMediaEmbedUrl(proj.link);
                        return (
                          <div
                            key={idx}
                            className="w-[85vw] md:w-[450px] flex-shrink-0 snap-start p-8 border border-white/10 rounded-[2rem] bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(249,115,22,0.08)] transition-all duration-500 group flex flex-col backdrop-blur-sm"
                          >
                            {embedUrl && (
                              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black mb-8 shadow-2xl border border-white/5 relative flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-500">
                                <iframe
                                  className="absolute top-0 left-0 w-full h-full"
                                  src={embedUrl}
                                  title={proj.name}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            )}

                            <div className="mb-6 flex-1">
                              {proj.link ? (
                                <a
                                  href={proj.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-2xl font-bold flex items-start justify-between gap-4 group-hover:text-orange-400 transition-colors w-full text-white"
                                >
                                  <span className="line-clamp-2">
                                    {proj.name}
                                  </span>
                                  <ExternalLink
                                    size={24}
                                    className="text-gray-500 group-hover:text-orange-500 transition-colors flex-shrink-0 mt-1"
                                  />
                                </a>
                              ) : (
                                <h4 className="text-2xl font-bold text-white line-clamp-2">
                                  {proj.name}
                                </h4>
                              )}
                            </div>

                            {proj.roles && proj.roles.length > 0 && (
                              <div className="flex flex-wrap gap-2 items-center mt-auto pt-6 border-t border-white/10">
                                <span className="text-xs text-gray-500 uppercase tracking-widest mr-2 font-bold">
                                  Role
                                </span>
                                {proj.roles.map((role, roleIdx) => (
                                  <span
                                    key={roleIdx}
                                    className="px-3 py-1.5 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest rounded-md border border-orange-500/20"
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
              })}
            </div>
          )}

          {activeTab === "experience" && (
            <div className="mt-16 pt-16 border-t border-white/10 flex flex-col items-center text-center">
              <p className="text-gray-400 font-medium mb-8">
                Want to know more about my skills?
              </p>
              <button className="px-10 py-5 bg-white/10 text-white border border-white/10 backdrop-blur-md uppercase tracking-widest text-sm rounded-full font-bold hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:-translate-y-1">
                Download CV (PDF)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
